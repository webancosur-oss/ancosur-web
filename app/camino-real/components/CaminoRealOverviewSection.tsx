"use client";

import {
  ArrowRightIcon,
  DownloadSimpleIcon,
} from "@phosphor-icons/react";
import Link from "next/link";
import {
  useCallback,
  useState,
} from "react";
import type {
  FormEvent,
} from "react";

import FeedbackToast, {
  type FeedbackToastData,
} from "@/components/ui/FeedbackToast/FeedbackToast";

import {
  brochureCaminoReal,
  details,
  facts,
  projectDescription,
  projectFormData,
} from "../data";

import styles from "./CaminoRealOverviewSection.module.css";

/* =========================================================
   CONFIGURACIÓN
========================================================= */

const SOURCE_ID = 4 as const;

/*
 * Código corto para evitar incrementar demasiado
 * el historial acumulado en la columna campaña.
 */
const CAMPAIGN_CODE = "CR";
const AD_NAME = "Web";
const LEAD_TYPE = "WEB Ancosur";
const COMPONENT_NAME = "CaminoRealOverviewSection";
const REQUEST_TIMEOUT = 20_000;

/* =========================================================
   TIPOS
========================================================= */

type ToastState =
  FeedbackToastData & {
    id: number;
  };

type JsonObject =
  Record<string, unknown>;

type ApiResponse = {
  success?: boolean;
  accion?: string;
  id?: number;
  code?: string;
  message?: string;
  error?: string;
  response?: unknown;
  data?: unknown;
  [key: string]: unknown;
};

/* =========================================================
   TOASTS
========================================================= */

const SUCCESS_TOAST: FeedbackToastData = {
  variant: "success",
  title:
    "¡Datos enviados correctamente!",
  message:
    "Un asesor de Ancosur se comunicará contigo pronto.",
};

const ERROR_TOAST: FeedbackToastData = {
  variant: "error",
  title:
    "No pudimos enviar tus datos",
  message:
    "Verifica tu conexión e inténtalo nuevamente.",
};

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

/*
 * Busca mensajes o errores dentro
 * de cualquier nivel de la respuesta.
 */
const extractApiMessage = (
  value: unknown
): string => {
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
    extractApiMessage(
      value.response
    );

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

/* =========================================================
   DETECCIÓN DE ERRORES DEL CRM
========================================================= */

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

const isDuplicateError = (
  message: string
): boolean => {
  const normalized =
    message.toLowerCase();

  return (
    normalized.includes(
      "duplicate entry"
    ) ||
    normalized.includes(
      "already exists"
    ) ||
    normalized.includes(
      "ya existe"
    ) ||
    normalized.includes(
      "duplicado"
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

  if (
    status === 409 ||
    isDuplicateError(
      serverMessage
    )
  ) {
    return {
      title:
        "El contacto ya está registrado",

      message:
        serverMessage ||
        "El contacto ya existe y no pudo actualizarse.",
    };
  }

  if (
    serverCode ===
    "VALIDATION_ERROR"
  ) {
    return {
      title:
        "Revisa los datos ingresados",

      message:
        serverMessage ||
        "Uno o más campos tienen un formato incorrecto.",
    };
  }

  if (status === 400) {
    return {
      title:
        "Datos no válidos",

      message:
        serverMessage ||
        "Revisa la información ingresada en el formulario.",
    };
  }

  if (
    status === 401 ||
    status === 403
  ) {
    return {
      title:
        "API no autorizada",

      message:
        "El servidor no tiene autorización para registrar el lead.",
    };
  }

  if (status === 404) {
    return {
      title:
        "Ruta de leads no encontrada",

      message:
        "No se encontró la ruta",
    };
  }

  if (status === 413) {
    return {
      title:
        "Información demasiado extensa",

      message:
        "La información enviada supera el tamaño permitido por el servidor.",
    };
  }

  if (status === 415) {
    return {
      title:
        "Formato no permitido",

      message:
        "Error en el servidor",
    };
  }

  if (status === 422) {
    return {
      title:
        "No se pudieron procesar los datos",

      message:
        serverMessage ||
        "El servidor recibió la solicitud, pero rechazó uno o más campos.",
    };
  }

  if (status === 429) {
    return {
      title:
        "Demasiadas solicitudes",

      message:
        "Espera unos minutos antes de volver a enviar el formulario.",
    };
  }

  if (status >= 500) {
    return {
      title:
        "Error del servidor",

      message:
        serverMessage ||
        "El servidor de leads no pudo procesar la solicitud. Inténtalo nuevamente en unos minutos.",
    };
  }

  return {
    title:
      "No pudimos enviar tus datos",

    message:
      serverMessage ||
      result.message ||
      `La solicitud no pudo procesarse. Código ${status}.`,
  };
};

/* =========================================================
   COMPONENTE
========================================================= */

export default function CaminoRealOverviewSection() {
  const [
    isSending,
    setIsSending,
  ] = useState(false);

  const [
    toast,
    setToast,
  ] = useState<ToastState | null>(
    null
  );

  const closeToast =
    useCallback(() => {
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

  /* =======================================================
     ENVÍO DEL FORMULARIO
  ======================================================= */

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (isSending) {
      return;
    }

    const form =
      event.currentTarget;

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const formData =
      new FormData(form);

    const fullName =
      String(
        formData.get(
          "fullName"
        ) ?? ""
      ).trim();

    const phone =
      String(
        formData.get(
          "phone"
        ) ?? ""
      ).replace(/\D/g, "");

    const email =
      String(
        formData.get(
          "email"
        ) ?? ""
      )
        .trim()
        .toLowerCase();

    /*
     * El DNI es opcional.
     * Solo permite números.
     */
    const dni =
      String(
        formData.get(
          "dni"
        ) ?? ""
      )
        .replace(/\D/g, "")
        .slice(0, 8);

    const message =
      String(
        formData.get(
          "message"
        ) ?? ""
      ).trim();

    const consent =
      formData.get(
        "consent"
      ) === "accepted";

    /* =====================================================
       VALIDACIONES
    ===================================================== */

    const nameRegex =
      /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s.'’-]{3,80}$/;

    const phoneRegex =
      /^9\d{8}$/;

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    const dniRegex =
      /^\d{8}$/;

    if (
      !nameRegex.test(fullName)
    ) {
      showToast({
        variant: "error",
        title:
          "Nombre no válido",
        message:
          "Ingresa tu nombre completo usando letras y espacios.",
      });

      return;
    }

    if (
      !phoneRegex.test(phone)
    ) {
      showToast({
        variant: "error",
        title:
          "Celular no válido",
        message:
          "El celular debe tener 9 dígitos y comenzar con 9.",
      });

      return;
    }

    /*
     * El correo es opcional.
     * Solo se valida cuando se completa.
     */
    if (
      email &&
      !emailRegex.test(email)
    ) {
      showToast({
        variant: "error",
        title:
          "Correo no válido",
        message:
          "Ingresa un correo electrónico válido.",
      });

      return;
    }

    /*
     * El DNI es opcional.
     * Solo se valida cuando se completa.
     */
    if (
      dni &&
      !dniRegex.test(dni)
    ) {
      showToast({
        variant: "error",
        title:
          "DNI no válido",
        message:
          "El DNI debe contener exactamente 8 dígitos.",
      });

      return;
    }

    if (
      message.length > 250
    ) {
      showToast({
        variant: "error",
        title:
          "Mensaje demasiado largo",
        message:
          "El mensaje no debe superar los 250 caracteres.",
      });

      return;
    }

    if (!consent) {
      showToast({
        variant: "error",
        title:
          "Consentimiento requerido",
        message:
          "Debes aceptar la política de privacidad para enviar tus datos.",
      });

      return;
    }

    const clientMetadata: Record<string, string> = {
      origenRuta:
        window.location.pathname,
      origenComponente:
        COMPONENT_NAME,
      tipoLead:
        LEAD_TYPE,
    };

    /*
     * El textarea se agrega dentro de msj_client
     * únicamente cuando el usuario escribe un mensaje.
     * Si está vacío, la propiedad mensaje no se envía.
     */
    if (message) {
      clientMetadata.mensaje = message;
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
        CAMPAIGN_CODE,
      anuncio:
        AD_NAME,
      msj_client:
        JSON.stringify(clientMetadata),
      comentario:
        message,
    };

    const controller =
      new AbortController();

    const timeoutId =
      window.setTimeout(
        () => {
          controller.abort();
        },
        REQUEST_TIMEOUT
      );

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

            signal:
              controller.signal,
          }
        );

      const result =
        await readApiResponse(
          response
        );

      /*
       * Detecta errores HTTP y también
       * errores internos anidados.
       */
      const requestFailed =
        !response.ok ||
        hasApiFailure(result);

      if (requestFailed) {
  console.error(
    "Error API Camino Real:",
    {
      status: response.status,
      result,
      serverMessage:
        extractApiMessage(result),
    }
  );

  const friendlyError =
    getFriendlyServerError(
      response.status,
      result
    );

  showToast({
    variant: "error",
    title: friendlyError.title,
    message: friendlyError.message,
  });

  return;
          }

          /* =========================================
            GOOGLE TAG MANAGER - LEAD EXITOSO
          ========================================= */

          window.dataLayer =
            window.dataLayer || [];

          window.dataLayer.push({
            event: "lead_form_submit",
            form_name: "Camino Real",
            lead_type: LEAD_TYPE,
            campaign: CAMPAIGN_CODE,
            source_id: SOURCE_ID,
            page_path:
              window.location.pathname,
          });

          /* =========================================
            FIN GOOGLE TAG MANAGER
          ========================================= */

          form.reset();

          showToast({
            ...SUCCESS_TOAST,
            message:
              result.message ||
              SUCCESS_TOAST.message,
          });
                /*
                * La respuesta de éxito puede ser:
                *
                * {
                *   success: true,
                *   accion: "creado",
                *   id: 39906,
                *   message: "Lead creado exitosamente..."
                * }
                */
                form.reset();

                showToast({
                  ...SUCCESS_TOAST,

                  message:
                    result.message ||
                    SUCCESS_TOAST.message,
                });
              } catch (error) {
                console.error(
                  "Error enviando formulario de Camino Real:",
                  error
                );

                if (
                  error instanceof DOMException &&
                  error.name === "AbortError"
                ) {
                  showToast({
                    variant: "error",

                    title:
                      "El servidor tardó demasiado",

                    message:
                      "La solicitud superó los 20 segundos de espera. Inténtalo nuevamente.",
                  });

                  return;
                }

                showToast({
                  ...ERROR_TOAST,

                  title:
                    "No pudimos conectar con el servidor",

                  message:
                    "Comprueba tu conexión a Internet e inténtalo nuevamente.",
                });
              } finally {
                window.clearTimeout(
                  timeoutId
                );

                setIsSending(false);
              }
            };

  return (
    <>
      <section
        className={
          styles.overviewSection
        }
        id="informacion-camino-real"
        aria-labelledby="camino-real-overview-title"
      >
        <div
          className={
            styles.overviewInner
          }
        >
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
              {
                projectDescription
                  .eyebrow
              }
            </span>

            <h2 id="camino-real-overview-title">
              {
                projectDescription
                  .title
              }
            </h2>

            <p
              className={
                styles.overviewDescription
              }
            >
              {
                projectDescription
                  .introduction
              }
            </p>

            <div
              className={
                styles.overviewFacts
              }
            >
              {facts.map((item) => (
                <div
                  key={item.label}
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
              ))}
            </div>

            <div
              className={
                styles.projectText
              }
            >
              {
                projectDescription
                  .paragraphs
                  .map(
                    (paragraph) => (
                      <p
                        key={
                          paragraph
                        }
                      >
                        {paragraph}
                      </p>
                    )
                  )
              }
            </div>

            <ul
              className={
                styles.detailsList
              }
            >
              {details.map((item) => (
                <li key={item.label}>
                  <strong>
                    {item.label}
                  </strong>

                  <span>
                    {item.value}
                  </span>
                </li>
              ))}
            </ul>

            <div
              className={
                styles.overviewActions
              }
            >
              <a
                href={
                  brochureCaminoReal
                }
                download
                aria-label="Descargar brochure de Camino Real"
              >
                <DownloadSimpleIcon
                  size={18}
                  weight="bold"
                  aria-hidden={true}
                />

                Descargar brochure
              </a>

              <Link href="/portal-de-transparencia/camino-real">
                Respaldo legal

                <ArrowRightIcon
                  size={18}
                  weight="bold"
                  aria-hidden={true}
                />
              </Link>
            </div>
          </div>

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
                {
                  projectFormData
                    .title
                }
              </strong>

              <p>
                {
                  projectFormData
                    .description
                }
              </p>
            </div>

            <label htmlFor="camino-real-full-name">
              Nombre completo

              <input
                id="camino-real-full-name"
                type="text"
                name="fullName"
                placeholder="Ingresa tu nombre"
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

            <div
              className={
                styles.formTwoColumns
              }
            >
              <label htmlFor="camino-real-phone">
                Celular

                <input
                  id="camino-real-phone"
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
                  onInput={(
                    event
                  ) => {
                    event.currentTarget.value =
                      event.currentTarget.value
                        .replace(
                          /\D/g,
                          ""
                        )
                        .slice(
                          0,
                          9
                        );
                  }}
                  required
                />
              </label>

              <label htmlFor="camino-real-email">
                Correo electrónico opcional

                <input
                  id="camino-real-email"
                  type="email"
                  name="email"
                  placeholder="correo@gmail.com"
                  autoComplete="email"
                  maxLength={120}
                  disabled={
                    isSending
                  }
                />
              </label>
            </div>

            <label htmlFor="camino-real-dni">
              DNI opcional

              <input
                id="camino-real-dni"
                type="text"
                name="dni"
                placeholder="12345678"
                autoComplete="off"
                inputMode="numeric"
                pattern="[0-9]{8}"
                minLength={8}
                maxLength={8}
                title="Ingresa un DNI de 8 dígitos o deja el campo vacío."
                disabled={
                  isSending
                }
                onInput={(
                  event
                ) => {
                  event.currentTarget.value =
                    event.currentTarget.value
                      .replace(
                        /\D/g,
                        ""
                      )
                      .slice(
                        0,
                        8
                      );
                }}
              />
            </label>

            <label htmlFor="camino-real-message">
              Mensaje opcional

              <textarea
                id="camino-real-message"
                name="message"
                placeholder="Escribe aquí tu consulta o la información que necesitas."
                rows={4}
                maxLength={250}
                disabled={
                  isSending
                }
              />
            </label>

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
                Acepto los{" "}
                <Link
                  href="/politicas/politica-de-privacidad"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  términos y la política
                  de privacidad
                </Link>{" "}
                y autorizo a Ancosur a
                contactarme para recibir
                información comercial
                sobre Camino Real.
              </span>
            </label>

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
                : "Enviar datos"}

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
        open={
          toast !== null
        }
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