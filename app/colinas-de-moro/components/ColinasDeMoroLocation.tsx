"use client";

import {
  ArrowRightIcon,
  ClockIcon,
  MapPinIcon,
  MountainsIcon,
  SunIcon,
  WhatsappLogoIcon,
} from "@phosphor-icons/react";
import Link from "next/link";
import { useCallback, useState } from "react";
import type { FormEvent } from "react";

import FeedbackToast, {
  type FeedbackToastData,
} from "@/components/ui/FeedbackToast/FeedbackToast";

import {
  locationColinasDeMoro,
  whatsappColinasDeMoro,
} from "../data";

import styles from "./ColinasDeMoroLocation.module.css";

/* =========================================================
   CONFIGURACIÓN
========================================================= */

const SOURCE_ID = 4 as const;
const CAMPAIGN_CODE = "Colinas de Moro";
const AD_NAME = "Web";
const LEAD_TYPE = "WEB Ancosur";
const COMPONENT_NAME = "ColinasDeMoroLocation";
const REQUEST_TIMEOUT = 20_000;

const GOOGLE_MAPS_EMBED =
  `https://www.google.com/maps?q=${encodeURIComponent(
    locationColinasDeMoro.googleMapsQuery
  )}&output=embed`;

const GOOGLE_MAPS_LINK =
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    locationColinasDeMoro.googleMapsQuery
  )}`;

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
   TOASTS
========================================================= */

const SUCCESS_TOAST: FeedbackToastData = {
  variant: "success",
  title: "¡Datos enviados correctamente!",
  message:
    "Un asesor de Ancosur se comunicará contigo pronto.",
};

const ERROR_TOAST: FeedbackToastData = {
  variant: "error",
  title: "No pudimos enviar tus datos",
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
  const responseText = await response.text();

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

/*
 * Detecta errores aunque la API responda:
 *
 * {
 *   success: true,
 *   data: {
 *     success: false
 *   }
 * }
 */
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
        "El historial de campañas de este contacto superó el límite permitido. El administrador del CRM debe revisar este registro.",
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
        "Este contacto ya se encuentra registrado en el CRM.",
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
        "Revisa el nombre, celular, correo electrónico y DNI.",
    };
  }

  if (status === 401) {
    return {
      title:
        "API no autenticada",

      message:
        "El servidor no pudo autenticarse con el servicio de leads.",
    };
  }

  if (status === 403) {
    return {
      title:
        "Acceso denegado",

      message:
        "El servidor no tiene permisos para registrar el lead.",
    };
  }

  if (status === 404) {
    return {
      title:
        "Ruta no encontrada",

      message:
        "No se encontró la ruta /api/leads.",
    };
  }

  if (
    status === 408 ||
    status === 504
  ) {
    return {
      title:
        "El servidor tardó demasiado",

      message:
        "La solicitud superó el tiempo máximo permitido.",
    };
  }

  if (status === 413) {
    return {
      title:
        "Información demasiado extensa",

      message:
        "El contenido enviado supera el tamaño permitido por el servidor.",
    };
  }

  if (status === 415) {
    return {
      title:
        "Formato no permitido",

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
        "El servidor de leads no pudo procesar la solicitud.",
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

export default function ColinasDeMoroLocation() {
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

      showToast({
        variant: "error",
        title:
          "Revisa tus datos",
        message:
          "Completa correctamente los campos obligatorios.",
      });

      return;
    }

    const formData =
      new FormData(form);

    const fullName =
      String(
        formData.get(
          "fullName"
        ) ?? ""
      )
        .replace(/\s+/g, " ")
        .trim();

    const phone =
      String(
        formData.get(
          "phone"
        ) ?? ""
      )
        .replace(/\D/g, "")
        .slice(0, 9);

    /*
     * Correo electrónico opcional.
     */
    const email =
      String(
        formData.get(
          "email"
        ) ?? ""
      )
        .trim()
        .toLowerCase();

    /*
     * DNI opcional.
     */
    const dni =
      String(
        formData.get(
          "dni"
        ) ?? ""
      )
        .replace(/\D/g, "")
        .slice(0, 8);

    /*
     * Mensaje opcional.
     * No se genera ningún mensaje automático.
     */
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

    const nameRegex =
      /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s.'’-]{3,80}$/;

    const phoneRegex =
      /^9\d{8}$/;

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    const dniRegex =
      /^\d{8}$/;

    /* =====================================================
       VALIDACIONES
    ===================================================== */

    if (
      !nameRegex.test(
        fullName
      )
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
      !phoneRegex.test(
        phone
      )
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
     * El correo se valida solamente
     * cuando el usuario escribe un valor.
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
          "Ingresa un correo electrónico válido o deja el campo vacío.",
      });

      return;
    }

    /*
     * El DNI se valida solamente
     * cuando el usuario escribe un valor.
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
          "El DNI debe contener exactamente 8 dígitos o dejarse vacío.",
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

    /*
     * msj_client contiene únicamente:
     *
     * - Ruta actual.
     * - Componente que envía el formulario.
     * - Tipo de lead.
     *
     * No contiene:
     *
     * - Nombre.
     * - Celular.
     * - Correo.
     * - DNI.
     * - Mensaje.
     * - Dirección.
     * - Referencia.
     * - Precio.
     * - Metraje.
     */
    const clientMetadata = {
      origenRuta:
        window.location.pathname,

      origenComponente:
        COMPONENT_NAME,

      tipoLead:
        LEAD_TYPE,
    };


    const leadData = {
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
        JSON.stringify(
          clientMetadata
        ),

      fuente_id:
        SOURCE_ID,
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

      const requestFailed =
        !response.ok ||
        hasApiFailure(result);

      if (requestFailed) {
        const serverMessage =
          extractApiMessage(
            result
          );

        console.error(
          "Error API Las Colinas de Moro:",
          {
            status:
              response.status,

            result,

            serverMessage,

            payload: {
              telefono:
                phone,

              nombre:
                fullName,

              email:
                email || "",

              dni:
                dni || "",

              campaña:
                CAMPAIGN_CODE,

              anuncio:
                AD_NAME,

              msj_client:
                clientMetadata,

              comentario:
                message || "",

              fuente_id:
                SOURCE_ID,
            },
          }
        );

        const friendlyError =
          getFriendlyServerError(
            response.status,
            result
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

      showToast({
        ...SUCCESS_TOAST,

        message:
          result.message ||
          SUCCESS_TOAST.message,
      });
    } catch (error) {
      console.error(
        "Error enviando formulario de Las Colinas de Moro:",
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

  /* =======================================================
     INTERFAZ
  ======================================================= */

  return (
    <>
      <section
        className={
          styles.section
        }
        id="ubicacion-colinas-de-moro"
        aria-labelledby="colinas-location-title"
      >
        <div
          className={
            styles.header
          }
        >
          <span>
            {
              locationColinasDeMoro
                .eyebrow
            }
          </span>

          <h2 id="colinas-location-title">
            {
              locationColinasDeMoro
                .title
            }
          </h2>

          <p>
            {
              locationColinasDeMoro
                .description
            }
          </p>
        </div>

        <div
          className={
            styles.locationFeatures
          }
        >
          <article>
            <div
              className={
                styles.featureIcon
              }
            >
              <MountainsIcon
                size={25}
                weight="fill"
                aria-hidden={true}
              />
            </div>

            <div>
              <span>
                {
                  locationColinasDeMoro
                    .altitude
                    .label
                }
              </span>

              <strong>
                {
                  locationColinasDeMoro
                    .altitude
                    .value
                }
              </strong>
            </div>
          </article>

          <article>
            <div
              className={
                styles.featureIcon
              }
            >
              <SunIcon
                size={25}
                weight="fill"
                aria-hidden={true}
              />
            </div>

            <div>
              <span>
                {
                  locationColinasDeMoro
                    .climate
                    .label
                }
              </span>

              <strong>
                {
                  locationColinasDeMoro
                    .climate
                    .value
                }
              </strong>
            </div>
          </article>
        </div>

        <div
          className={
            styles.grid
          }
        >
          <article
            className={
              styles.mapCard
            }
          >
            <div
              className={
                styles.map
              }
            >
              <iframe
                src={
                  GOOGLE_MAPS_EMBED
                }
                title="Ubicación de Las Colinas de Moro en Concepción"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>

            <div
              className={
                styles.mapInformation
              }
            >
              <div
                className={
                  styles.projectAddress
                }
              >
                <div
                  className={
                    styles.addressIcon
                  }
                >
                  <MapPinIcon
                    size={22}
                    weight="fill"
                    aria-hidden={true}
                  />
                </div>

                <div>
                  <span>
                    Ubicación del proyecto
                  </span>

                  <strong>
                    {
                      locationColinasDeMoro
                        .projectAddress
                    }
                  </strong>

                  <p>
                    {
                      locationColinasDeMoro
                        .projectReference
                    }
                  </p>
                </div>
              </div>

              <a
                href={
                  GOOGLE_MAPS_LINK
                }
                target="_blank"
                rel="noopener noreferrer"
                className={
                  styles.mapButton
                }
              >
                Abrir en Google Maps

                <ArrowRightIcon
                  size={17}
                  weight="bold"
                  aria-hidden={true}
                />
              </a>
            </div>
          </article>

          <aside
            className={
              styles.contactCard
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

              <h3>
                Encuentra el lote ideal
                para ti
              </h3>

              <p>
                Déjanos tus datos y un
                asesor te brindará
                información sobre
                disponibilidad, metrajes,
                precios y formas de pago.
              </p>
            </div>

            <form
              className={
                styles.form
              }
              onSubmit={
                handleSubmit
              }
            >
              <label htmlFor="colinas-location-name">
                Nombre completo

                <input
                  id="colinas-location-name"
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

              <label htmlFor="colinas-location-phone">
                Número de celular

                <input
                  id="colinas-location-phone"
                  type="tel"
                  name="phone"
                  placeholder="987654321"
                  autoComplete="tel"
                  inputMode="numeric"
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

              <label htmlFor="colinas-location-email">
                Correo electrónico opcional

                <input
                  id="colinas-location-email"
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

              <label htmlFor="colinas-location-dni">
                DNI opcional

                <input
                  id="colinas-location-dni"
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
                  sobre Las Colinas de Moro.
                </span>
              </label>

              <button
                type="submit"
                className={
                  styles.submitButton
                }
                disabled={
                  isSending
                }
                aria-busy={
                  isSending
                }
              >
                {isSending
                  ? "Enviando solicitud..."
                  : "Solicitar información"}

                <ArrowRightIcon
                  size={18}
                  weight="bold"
                  aria-hidden={true}
                />
              </button>
            </form>

            <div
              className={
                styles.divider
              }
            >
              <span>
                o comunícate directamente
              </span>
            </div>

            <a
              href={
                whatsappColinasDeMoro
              }
              target="_blank"
              rel="noopener noreferrer"
              className={
                styles.whatsappButton
              }
            >
              <WhatsappLogoIcon
                size={20}
                weight="fill"
                aria-hidden={true}
              />

              Escribir por WhatsApp
            </a>

            <div
              className={
                styles.officeInformation
              }
            >
              <div
                className={
                  styles.officeItem
                }
              >
                <MapPinIcon
                  size={19}
                  weight="fill"
                  aria-hidden={true}
                />

                <div>
                  <span>
                    Oficina de ventas
                  </span>

                  <strong>
                    {
                      locationColinasDeMoro
                        .officeAddress
                    }
                  </strong>
                </div>
              </div>

              <div
                className={
                  styles.officeItem
                }
              >
                <ClockIcon
                  size={19}
                  weight="fill"
                  aria-hidden={true}
                />

                <div>
                  <span>
                    Horario de atención
                  </span>

                  <strong>
                    {
                      locationColinasDeMoro
                        .schedule
                    }
                  </strong>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <FeedbackToast
        key={
          toast?.id
        }
        open={
          toast !== null
        }
        variant={
          toast?.variant ??
          "info"
        }
        title={
          toast?.title ??
          ""
        }
        message={
          toast?.message ??
          ""
        }
        onClose={
          closeToast
        }
      />
    </>
  );
}