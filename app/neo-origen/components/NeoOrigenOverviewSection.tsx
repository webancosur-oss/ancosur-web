"use client";

import {
  ArrowRightIcon,
  DownloadSimpleIcon,
} from "@phosphor-icons/react";
import Link from "next/link";
import {
  useCallback,
  useRef,
  useState,
} from "react";
import type { FormEvent } from "react";

import FeedbackToast, {
  type FeedbackToastData,
} from "@/components/ui/FeedbackToast/FeedbackToast";

import {
  brochureNeoOrigen,
  details,
  facts,
} from "../data";

import styles from "../NeoOrigenPage.module.css";

/* =========================================================
   CONFIGURACIÓN
========================================================= */

const SOURCE_ID = 4 as const;
const CAMPAIGN_NAME = "Neo Origen";
const AD_NAME = "Web";
const LEAD_TYPE = "WEB ANCOSUR";
const COMPONENT_NAME =
  "NeoOrigenOverviewSection";
const REQUEST_TIMEOUT = 20_000;

/* =========================================================
   TIPOS
========================================================= */

type ToastState = FeedbackToastData & {
  id: number;
};

type JsonObject = Record<string, unknown>;

type ApiResponse = {
  success?: boolean;
  accion?: string;
  id?: number;
  code?: string;
  message?: string;
  error?: string;
  data?: unknown;
  response?: unknown;
  errors?: unknown;
  [key: string]: unknown;
};

/* =========================================================
   MENSAJES
========================================================= */

const SUCCESS_TOAST: FeedbackToastData = {
  variant: "success",
  title: "¡Solicitud enviada correctamente!",
  message:
    "Gracias por tu interés en Neo Origen. Un asesor de ANCOSUR se comunicará contigo muy pronto para brindarte precios, disponibilidad, planos, tipologías y formas de pago.",
};

const ERROR_TOAST: FeedbackToastData = {
  variant: "error",
  title: "No pudimos enviar tus datos",
  message:
    "Verifica tu conexión e inténtalo nuevamente.",
};

const LEGAL_ROUTE =
  "/portal-de-transparencia/neo-origen";

/* =========================================================
   UTILIDADES DE RESPUESTA
========================================================= */

const isJsonObject = (
  value: unknown
): value is JsonObject => {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value)
  );
};

const readApiResponse = async (
  response: Response
): Promise<ApiResponse> => {
  const responseText =
    await response.text();

  if (!responseText.trim()) {
    return {
      success: response.ok,
      message: response.ok
        ? "Solicitud procesada correctamente."
        : `El servidor respondió con el código ${response.status}.`,
    };
  }

  try {
    const parsed: unknown =
      JSON.parse(responseText);

    if (isJsonObject(parsed)) {
      return parsed as ApiResponse;
    }

    return {
      success: response.ok,
      data: parsed,
    };
  } catch {
    return {
      success: response.ok,
      message: responseText,
    };
  }
};

const hasApiFailure = (
  value: unknown
): boolean => {
  if (!isJsonObject(value)) {
    return false;
  }

  if (value.success === false) {
    return true;
  }

  return (
    hasApiFailure(value.data) ||
    hasApiFailure(value.response)
  );
};

const extractApiMessage = (
  value: unknown
): string => {
  if (typeof value === "string") {
    return value.trim();
  }

  if (!isJsonObject(value)) {
    return "";
  }

  if (
    typeof value.error === "string" &&
    value.error.trim()
  ) {
    return value.error.trim();
  }

  const dataMessage =
    extractApiMessage(value.data);

  if (dataMessage) {
    return dataMessage;
  }

  const responseMessage =
    extractApiMessage(value.response);

  if (responseMessage) {
    return responseMessage;
  }

  if (
    typeof value.message === "string" &&
    value.message.trim()
  ) {
    return value.message.trim();
  }

  return "";
};

const extractApiCode = (
  value: unknown
): string => {
  if (!isJsonObject(value)) {
    return "";
  }

  if (
    typeof value.code === "string" &&
    value.code.trim()
  ) {
    return value.code.trim();
  }

  return (
    extractApiCode(value.data) ||
    extractApiCode(value.response)
  );
};

const isCampaignLengthError = (
  message: string
): boolean => {
  const normalized =
    message.toLowerCase();

  return (
    normalized.includes(
      "sqlstate[22001]"
    ) ||
    normalized.includes(
      "data too long for column 'campaña'"
    ) ||
    normalized.includes(
      'data too long for column "campaña"'
    ) ||
    (
      normalized.includes("1406") &&
      normalized.includes("campaña")
    )
  );
};

const getFriendlyServerError = (
  status: number,
  result: ApiResponse
): {
  title: string;
  message: string;
} => {
  const serverMessage =
    extractApiMessage(result);

  const serverCode =
    extractApiCode(result);

  if (
    serverCode ===
      "CAMPAIGN_HISTORY_TOO_LONG" ||
    isCampaignLengthError(
      serverMessage
    )
  ) {
    return {
      title:
        "El CRM no pudo actualizar el contacto",
      message:
        "Este contacto tiene un historial de campañas demasiado extenso. Solicita al administrador del CRM que revise el contacto.",
    };
  }

  if (serverCode === "VALIDATION_ERROR") {
    return {
      title: "Revisa los datos ingresados",
      message:
        serverMessage ||
        "Uno o más campos tienen un formato incorrecto.",
    };
  }

  if (status === 400) {
    return {
      title: "Datos no válidos",
      message:
        serverMessage ||
        "Revisa el nombre, celular, correo electrónico y número de documento.",
    };
  }

  if (status === 401 || status === 403) {
    return {
      title: "API no autorizada",
      message:
        "El servidor no tiene autorización para registrar el lead.",
    };
  }

  if (status === 404) {
    return {
      title: "Ruta de leads no encontrada",
      message:
        "No se encontró la ruta /api/leads.",
    };
  }

  if (
    status === 408 ||
    status === 504
  ) {
    return {
      title: "El servidor tardó demasiado",
      message:
        "La solicitud superó el tiempo máximo permitido.",
    };
  }

  if (status === 413) {
    return {
      title: "Información demasiado extensa",
      message:
        "La información enviada supera el tamaño permitido.",
    };
  }

  if (status === 415) {
    return {
      title: "Formato no permitido",
      message:
        "El servidor requiere que la solicitud se envíe como JSON.",
    };
  }

  if (status === 422) {
    return {
      title:
        "No se pudieron procesar los datos",
      message:
        serverMessage ||
        "El servidor rechazó uno o más campos.",
    };
  }

  if (status === 429) {
    return {
      title: "Demasiadas solicitudes",
      message:
        "Espera unos minutos antes de volver a enviar el formulario.",
    };
  }

  if (status >= 500) {
    return {
      title: "Error del servidor",
      message:
        serverMessage ||
        "El servidor de leads no pudo procesar la solicitud.",
    };
  }

  return {
    title: "No pudimos enviar tus datos",
    message:
      serverMessage ||
      result.message ||
      `La solicitud no pudo procesarse. Código ${status}.`,
  };
};

/* =========================================================
   COMPONENTE
========================================================= */

export default function NeoOrigenOverviewSection() {
  const [isSending, setIsSending] =
    useState(false);

  const submitLockRef =
    useRef(false);

  const [toast, setToast] =
    useState<ToastState | null>(null);

  const closeToast = useCallback(() => {
    setToast(null);
  }, []);

  const showToast = (
    toastData: FeedbackToastData
  ) => {
    setToast({
      ...toastData,
      id: Date.now(),
    });
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (
      isSending ||
      submitLockRef.current
    ) {
      return;
    }

    submitLockRef.current = true;

    const form =
      event.currentTarget;

    if (!form.checkValidity()) {
      form.reportValidity();

      showToast({
        variant: "error",
        title: "Revisa tus datos",
        message:
          "Completa correctamente los campos requeridos.",
      });

      submitLockRef.current = false;
      return;
    }

    const formData =
      new FormData(form);

    const fullName =
      String(
        formData.get("fullName") ?? ""
      )
        .replace(/\s+/g, " ")
        .trim();

    const phone =
      String(
        formData.get("phone") ?? ""
      )
        .replace(/\D/g, "")
        .slice(0, 9);

    const email =
      String(
        formData.get("email") ?? ""
      )
        .trim()
        .toLowerCase();

    const dni =
      String(
        formData.get("dni") ?? ""
      )
        .replace(/\D/g, "")
        .slice(0, 8);

    const message =
      String(
        formData.get("message") ?? ""
      ).trim();

    const consent =
      formData.get("consent") ===
      "accepted";

    const nameRegex =
      /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s.'’-]{3,80}$/;

    const phoneRegex =
      /^9\d{8}$/;

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    const dniRegex =
      /^\d{8}$/;

    if (!nameRegex.test(fullName)) {
      showToast({
        variant: "error",
        title: "Nombre no válido",
        message:
          "Ingresa tu nombre completo usando letras y espacios.",
      });

      submitLockRef.current = false;
      return;
    }

    if (!phoneRegex.test(phone)) {
      showToast({
        variant: "error",
        title: "Celular no válido",
        message:
          "El celular debe tener 9 dígitos y comenzar con 9.",
      });

      submitLockRef.current = false;
      return;
    }

    if (
      email &&
      !emailRegex.test(email)
    ) {
      showToast({
        variant: "error",
        title: "Correo no válido",
        message:
          "Ingresa un correo válido o deja el campo vacío.",
      });

      submitLockRef.current = false;
      return;
    }

    if (
      dni &&
      !dniRegex.test(dni)
    ) {
      showToast({
        variant: "error",
        title:
          "Número de documento no válido",
        message:
          "El número de documento debe contener exactamente 8 dígitos o dejarse vacío.",
      });

      submitLockRef.current = false;
      return;
    }

    if (message.length > 250) {
      showToast({
        variant: "error",
        title: "Mensaje demasiado largo",
        message:
          "El mensaje no debe superar los 250 caracteres.",
      });

      submitLockRef.current = false;
      return;
    }

    if (!consent) {
      showToast({
        variant: "error",
        title:
          "Consentimiento requerido",
        message:
          "Debes aceptar la autorización de contacto.",
      });

      submitLockRef.current = false;
      return;
    }

    /*
     * msj_client contiene únicamente:
     *
     * - Ruta de origen.
     * - Componente de origen.
     * - Tipo de lead.
     * - Mensaje, solo cuando existe.
     *
     * No se envía comentario para evitar
     * duplicar información dentro del CRM.
     */
    const clientMetadata:
      Record<string, string> = {
        origenRuta:
          window.location.pathname,

        origenComponente:
          COMPONENT_NAME,

        tipoLead:
          LEAD_TYPE,
      };

    if (message) {
      clientMetadata.mensaje =
        message;
    }

    const leadData = {
      fuente_id:
        SOURCE_ID,

      telefono:
        phone,

      nombre:
        fullName,

      email,

      dni,

      campaña:
        CAMPAIGN_NAME,

      anuncio:
        AD_NAME,

      msj_client:
        JSON.stringify(
          clientMetadata
        ),
    };

    const controller =
      new AbortController();

    const timeoutId =
      window.setTimeout(() => {
        controller.abort();
      }, REQUEST_TIMEOUT);

    try {
      setIsSending(true);
      setToast(null);

      const response =
        await fetch(
          "/api/leads",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",

              Accept:
                "application/json",
            },

            body:
              JSON.stringify(
                leadData
              ),

            cache:
              "no-store",

            signal:
              controller.signal,
          }
        );

      const result =
        await readApiResponse(
          response
        );

      const requestFailed =
        !response.ok ||
        hasApiFailure(result);

      if (requestFailed) {
        const friendlyError =
          getFriendlyServerError(
            response.status,
            result
          );

        console.error(
          "Error API Neo Origen:",
          {
            status:
              response.status,

            result,

            payload: {
              ...leadData,

              msj_client:
                clientMetadata,
            },
          }
        );

        showToast({
          variant: "error",
          title:
            friendlyError.title,
          message:
            friendlyError.message,
        });

        return;
      }

      form.reset();

      showToast(
        SUCCESS_TOAST
      );
    } catch (error) {
      console.error(
        "Error enviando formulario de Neo Origen:",
        error
      );

      if (
        error instanceof Error &&
        error.name === "AbortError"
      ) {
        showToast({
          variant: "error",
          title:
            "El servidor tardó demasiado",
          message:
            "La solicitud superó los 20 segundos de espera.",
        });

        return;
      }

      showToast(ERROR_TOAST);
    } finally {
      window.clearTimeout(
        timeoutId
      );

      submitLockRef.current = false;
      setIsSending(false);
    }
  };

  return (
    <>
      <section
        className={
          styles.overviewSection
        }
        id="informacion-neo-origen"
        aria-labelledby="neo-origen-overview-title"
      >
        <div
          className={
            styles.overviewInner
          }
        >
          {/* INFORMACIÓN */}

          <div
            className={
              styles.overviewContent
            }
          >
            <span
              className={
                styles.eyebrow
              }
            >
              Innovación y conectividad
            </span>

            <h2 id="neo-origen-overview-title">
              Tu espacio en el universo,
              en el corazón de El Tambo
            </h2>

            <p
              className={
                styles.overviewDescription
              }
            >
              Neo Origen es una propuesta
              inmobiliaria inspirada en el
              universo, diseñada para
              ofrecer una experiencia de
              vida moderna, funcional y
              diferente en El Tambo.
            </p>

            <p
              className={
                styles.overviewDescription
              }
            >
              Su ubicación en Jr. Libertad
              1187 permite vivir cerca de
              Plaza Vea, comercios,
              servicios y principales vías
              de acceso, combinando
              conectividad, comodidad y
              potencial de inversión.
            </p>

            {/* DATOS PRINCIPALES */}

            {!!facts.length && (
              <div
                className={
                  styles.overviewFacts
                }
              >
                {facts.map(
                  (item) => (
                    <div
                      key={`${item.label}-${item.value}`}
                      className={
                        styles.overviewFact
                      }
                    >
                      <span>
                        {item.label}
                      </span>

                      <strong>
                        {item.value}
                      </strong>
                    </div>
                  ),
                )}
              </div>
            )}

            {/* DETALLES */}

            {!!details.length && (
              <ul
                className={
                  styles.detailsList
                }
              >
                {details.map(
                  (item) => (
                    <li
                      key={`${item.label}-${item.value}`}
                    >
                      <strong>
                        {item.label}
                      </strong>

                      <span>
                        {item.value}
                      </span>
                    </li>
                  ),
                )}
              </ul>
            )}

            {/* ACCIONES */}

            <div
              className={
                styles.overviewActions
              }
            >
              <a
                href={
                  brochureNeoOrigen
                }
                download
                aria-label="Descargar brochure de Neo Origen"
              >
                <DownloadSimpleIcon
                  size={18}
                  weight="bold"
                  aria-hidden={true}
                />

                Descargar brochure
              </a>

              <Link
                href={
                  LEGAL_ROUTE
                }
              >
                Respaldo legal

                <ArrowRightIcon
                  size={18}
                  weight="bold"
                  aria-hidden={true}
                />
              </Link>
            </div>
          </div>

          {/* FORMULARIO */}

          <form
            className={
              styles.overviewForm
            }
            onSubmit={
              handleSubmit
            }
          >
            <div
              className={
                styles.formHeader
              }
            >
              <span>
                Solicita información
              </span>

              <strong>
                Conoce Neo Origen
              </strong>

              <p>
                Completa tus datos y un
                asesor se comunicará
                contigo para brindarte
                precios, disponibilidad,
                planos, tipologías y formas
                de pago.
              </p>
            </div>

            {/* NOMBRE */}

            <label>
              Nombre completo

              <input
                type="text"
                name="fullName"
                placeholder="Ej. Carlos Mendoza"
                autoComplete="name"
                minLength={3}
                maxLength={80}
                pattern="[A-Za-zÁÉÍÓÚáéíóúÑñÜü.'’ -]{3,80}"
                title="Ingresa tu nombre usando letras y espacios."
                disabled={
                  isSending
                }
                required
              />
            </label>

            {/* CELULAR Y CORREO */}

            <div
              className={
                styles.formTwoColumns
              }
            >
              <label>
                Celular

                <input
                  type="tel"
                  name="phone"
                  placeholder="987654321"
                  inputMode="numeric"
                  autoComplete="tel"
                  pattern="9[0-9]{8}"
                  minLength={9}
                  maxLength={9}
                  title="Ingresa un celular peruano de 9 dígitos que empiece con 9."
                  disabled={
                    isSending
                  }
                  onInput={(event) => {
                    event.currentTarget.value =
                      event.currentTarget.value
                        .replace(/\D/g, "")
                        .slice(0, 9);
                  }}
                  required
                />
              </label>

              <label>
                Correo opcional

                <input
                  type="email"
                  name="email"
                  placeholder="correo@gmail.com"
                  autoComplete="email"
                  maxLength={120}
                  title="Ingresa un correo válido o deja el campo vacío."
                  disabled={
                    isSending
                  }
                />
              </label>
            </div>

            {/* NÚMERO DE DOCUMENTO */}

            <label>
              Número de documento opcional

              <input
                type="text"
                name="dni"
                placeholder="12345678"
                autoComplete="off"
                inputMode="numeric"
                pattern="[0-9]{8}"
                minLength={8}
                maxLength={8}
                title="Ingresa un número de documento de 8 dígitos o deja el campo vacío."
                disabled={
                  isSending
                }
                onInput={(event) => {
                  event.currentTarget.value =
                    event.currentTarget.value
                      .replace(/\D/g, "")
                      .slice(0, 8);
                }}
              />
            </label>

            {/* MENSAJE */}

            <label>
              Mensaje opcional

              <textarea
                name="message"
                placeholder="Cuéntanos qué departamento buscas o cuándo deseas que te contactemos."
                rows={4}
                maxLength={250}
                disabled={
                  isSending
                }
              />
            </label>

            {/* CONSENTIMIENTO */}

            <label
              className={
                styles.checkbox
              }
            >
              <input
                type="checkbox"
                name="consent"
                value="accepted"
                defaultChecked
                disabled={
                  isSending
                }
                required
              />

              <span>
                Acepto ser contactado por
                ANCOSUR para recibir
                información comercial
                sobre Neo Origen y acepto
                la Política de Privacidad.
              </span>
            </label>

            {/* BOTÓN */}

            <button
              type="submit"
              disabled={
                isSending
              }
              aria-busy={
                isSending
              }
            >
              {isSending
                ? "Enviando datos..."
                : "Solicitar información"}

              <ArrowRightIcon
                size={18}
                weight="bold"
                aria-hidden={true}
              />
            </button>
          </form>
        </div>
      </section>

      <FeedbackToast
        key={toast?.id}
        open={toast !== null}
        variant={
          toast?.variant ??
          "info"
        }
        title={
          toast?.title ?? ""
        }
        message={
          toast?.message ?? ""
        }
        onClose={
          closeToast
        }
      />
    </>
  );
}