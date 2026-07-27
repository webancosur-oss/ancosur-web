"use client";

import {
  ArrowRightIcon,
  BuildingsIcon,
  ClockIcon,
  MapPinIcon,
  ShieldCheckIcon,
  WhatsappLogoIcon,
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
  locationCaminoReal,
  whatsappCaminoReal,
} from "../data";

import styles from "./CaminoRealLocation.module.css";

/* =========================================================
   CONFIGURACIÓN
========================================================= */

const SOURCE_ID = 4 as const;

const PROJECT_NAME =
  "Camino Real";

const GOOGLE_MAPS_EMBED =
  `https://www.google.com/maps?q=${encodeURIComponent(
    locationCaminoReal.googleMapsQuery
  )}&output=embed`;

const GOOGLE_MAPS_LINK =
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    locationCaminoReal.googleMapsQuery
  )}`;

/* =========================================================
   TIPOS
========================================================= */

type ToastState =
  FeedbackToastData & {
    id: number;
  };

type ApiResponse = {
  success?: boolean;
  response?: string;
  message?: string;
  error?: string;
  data?: unknown;
  [key: string]: unknown;
};

/* =========================================================
   NOTIFICACIONES
========================================================= */

const SUCCESS_TOAST:
  FeedbackToastData = {
    variant: "success",

    title:
      "¡Datos enviados correctamente!",

    message:
      "Un asesor de ANCOSUR se comunicará contigo pronto.",
  };

const ERROR_TOAST:
  FeedbackToastData = {
    variant: "error",

    title:
      "No pudimos enviar tus datos",

    message:
      "Verifica tu conexión e inténtalo nuevamente.",
  };

/* =========================================================
   LEER RESPUESTA DE LA API
========================================================= */

const readApiResponse = async (
  response: Response
): Promise<ApiResponse> => {
  const contentType =
    response.headers.get(
      "content-type"
    );

  if (
    contentType?.includes(
      "application/json"
    )
  ) {
    try {
      const result: unknown =
        await response.json();

      if (
        typeof result ===
          "object" &&
        result !== null &&
        !Array.isArray(result)
      ) {
        return result as ApiResponse;
      }

      return {
        success: response.ok,
        data: result,
      };
    } catch {
      return {
        success: false,

        message:
          "La API devolvió una respuesta JSON no válida.",
      };
    }
  }

  const responseText =
    await response.text();

  return {
    success: response.ok,

    message:
      responseText ||
      (response.ok
        ? "Solicitud procesada correctamente."
        : "No se recibió una respuesta válida de la API."),
  };
};

/* =========================================================
   COMPONENTE
========================================================= */

export default function CaminoRealLocation() {
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

  const form = event.currentTarget;

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const formData = new FormData(form);

  const phone = String(
    formData.get("phone") ?? ""
  ).replace(/\D/g, "");

  const email = String(
    formData.get("email") ?? ""
  )
    .trim()
    .toLowerCase();

  const consent =
    formData.get("consent") ===
    "accepted";

  const phoneRegex = /^9\d{8}$/;

  const emailRegex =
    /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  if (!phoneRegex.test(phone)) {
    showToast({
      variant: "error",
      title: "Celular no válido",
      message:
        "El celular debe tener 9 dígitos y comenzar con 9.",
    });

    return;
  }

  if (!emailRegex.test(email)) {
    showToast({
      variant: "error",
      title: "Correo no válido",
      message:
        "Ingresa un correo electrónico válido.",
    });

    return;
  }

  if (!consent) {
    showToast({
      variant: "error",
      title: "Consentimiento requerido",
      message:
        "Debes aceptar la política de privacidad para enviar tus datos.",
    });

    return;
  }

  /*
   * El usuario solamente ingresa
   * teléfono y correo.
   *
   * Los demás campos se generan
   * automáticamente para la API.
   */
  const leadData = {
    fuente_id: 4,

    telefono: phone,

    email,

    /*
     * Se genera automáticamente porque
     * el formulario ya no solicita nombre.
     */
    nombre:
      `Lead web ${PROJECT_NAME}`,

    dni: "",

    campaña:
      `Proyecto ${PROJECT_NAME}`,

    anuncio:
      `Formulario ubicación - ${PROJECT_NAME}`,

    msj_client: JSON.stringify({
      proyecto: PROJECT_NAME,

      telefono: phone,

      correo: email,

      direccion_proyecto:
        locationCaminoReal.projectAddress,

      referencia_proyecto:
        locationCaminoReal.projectReference,

      origen_ruta:
        window.location.pathname,

      origen_componente:
        `CaminoRealLocation - ${PROJECT_NAME}`,

      consentimiento: consent,

      fuente_id: 4,
    }),

    comentario:
      `Cliente interesado en ${PROJECT_NAME}. Teléfono: ${phone}. Correo: ${email}.`,
  };

  try {
    setIsSending(true);
    setToast(null);

    const response = await fetch(
      "/api/leads",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",

          Accept:
            "application/json",
        },

        body: JSON.stringify(
          leadData
        ),
      }
    );

    const result =
      await readApiResponse(response);

    if (
      !response.ok ||
      result.success === false
    ) {
      console.error(
        "Error API Camino Real:",
        {
          status: response.status,
          result,
          leadData,
        }
      );

      const nestedData =
        typeof result.data ===
          "object" &&
        result.data !== null
          ? result.data as Record<
              string,
              unknown
            >
          : null;

      const apiMessage =
        result.message ||
        result.error ||
        (
          typeof nestedData?.error ===
          "string"
            ? nestedData.error
            : ""
        ) ||
        `No se pudo enviar la solicitud. Código ${response.status}.`;

      showToast({
        variant: "error",

        title:
          "No pudimos enviar tus datos",

        message:
          String(apiMessage),
      });

      return;
    }

    form.reset();

    showToast(SUCCESS_TOAST);
  } catch (error) {
    console.error(
      "Error enviando formulario de Camino Real:",
      error
    );

    showToast({
      ...ERROR_TOAST,

      message:
        error instanceof Error
          ? error.message
          : ERROR_TOAST.message,
    });
  } finally {
    setIsSending(false);
  }
};

  return (
    <>
      <section
        className={
          styles.section
        }
        id="ubicacion-camino-real"
        aria-labelledby="camino-real-location-title"
      >
        {/* =================================================
            ENCABEZADO
        ================================================== */}

        <div
          className={
            styles.header
          }
        >
          <span>
            {
              locationCaminoReal.eyebrow
            }
          </span>

          <h2 id="camino-real-location-title">
            {
              locationCaminoReal.title
            }
          </h2>

          <p>
            {
              locationCaminoReal.description
            }
          </p>
        </div>

        {/* =================================================
            CARACTERÍSTICAS
        ================================================== */}

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
              <ShieldCheckIcon
                size={25}
                weight="fill"
                aria-hidden={true}
              />
            </div>

            <div>
              <span>
                {
                  locationCaminoReal
                    .legalStatus
                    .label
                }
              </span>

              <strong>
                {
                  locationCaminoReal
                    .legalStatus
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
              <BuildingsIcon
                size={25}
                weight="fill"
                aria-hidden={true}
              />
            </div>

            <div>
              <span>
                {
                  locationCaminoReal
                    .development
                    .label
                }
              </span>

              <strong>
                {
                  locationCaminoReal
                    .development
                    .value
                }
              </strong>
            </div>
          </article>
        </div>

        {/* =================================================
            MAPA Y FORMULARIO
        ================================================== */}

        <div
          className={
            styles.grid
          }
        >
          {/* ===============================================
              MAPA
          ================================================ */}

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
                title="Ubicación de Camino Real Residencial en El Tambo"
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
                      locationCaminoReal
                        .projectAddress
                    }
                  </strong>

                  <p>
                    {
                      locationCaminoReal
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

          {/* ===============================================
              FORMULARIO
          ================================================ */}

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
              className={styles.form}
              onSubmit={handleSubmit}
            >
              <label htmlFor="camino-real-phone">
                Número de celular

                <input
                  id="camino-real-phone"
                  type="tel"
                  name="phone"
                  placeholder="987654321"
                  autoComplete="tel"
                  inputMode="numeric"
                  pattern="9[0-9]{8}"
                  minLength={9}
                  maxLength={9}
                  title="Ingresa un celular peruano de 9 dígitos que empiece con 9."
                  disabled={isSending}
                  onInput={(event) => {
                    event.currentTarget.value =
                      event.currentTarget.value
                        .replace(/\D/g, "")
                        .slice(0, 9);
                  }}
                  required
                />
              </label>

              <label htmlFor="camino-real-email">
                Correo electrónico

                <input
                  id="camino-real-email"
                  type="email"
                  name="email"
                  placeholder="correo@gmail.com"
                  autoComplete="email"
                  maxLength={120}
                  disabled={isSending}
                  required
                />
              </label>

              <label
                className={styles.checkbox}
              >
                <input
                  type="checkbox"
                  name="consent"
                  value="accepted"
                  defaultChecked
                  disabled={isSending}
                  required
                />

                <span>
                  Acepto los{" "}
                  <Link
                    href="/politicas/politica-de-privacidad"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    términos y la política de
                    privacidad
                  </Link>{" "}
                  y autorizo a ANCOSUR a
                  contactarme para recibir
                  información comercial sobre
                  Camino Real.
                </span>
              </label>

              <button
                type="submit"
                className={
                  styles.submitButton
                }
                disabled={isSending}
                aria-busy={isSending}
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

            {/* =============================================
                CONTACTO DIRECTO
            ============================================== */}

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
                whatsappCaminoReal
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
                      locationCaminoReal
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
                      locationCaminoReal
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