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
  locationColinasDeMoro,
  whatsappColinasDeMoro,
} from "../data";

import styles from "./ColinasDeMoroLocation.module.css";

const SOURCE_ID = 4 as const;

const PROJECT_NAME =
  "Las Colinas de Moro";

const GOOGLE_MAPS_EMBED =
  `https://www.google.com/maps?q=${encodeURIComponent(
    locationColinasDeMoro.googleMapsQuery
  )}&output=embed`;

const GOOGLE_MAPS_LINK =
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    locationColinasDeMoro.googleMapsQuery
  )}`;

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

const SUCCESS_TOAST: FeedbackToastData = {
  variant: "success",
  title:
    "¡Datos enviados correctamente!",
  message:
    "Un asesor de ANCOSUR se comunicará contigo pronto.",
};

const ERROR_TOAST: FeedbackToastData = {
  variant: "error",
  title:
    "No pudimos enviar tus datos",
  message:
    "Verifica tu conexión e inténtalo nuevamente.",
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
        : `Error HTTP ${response.status}.`,
    };
  }

  try {
    const parsed: unknown =
      JSON.parse(responseText);

    if (
      typeof parsed === "object" &&
      parsed !== null &&
      !Array.isArray(parsed)
    ) {
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
        formData.get("fullName") ?? ""
      ).trim();

    const phone =
      String(
        formData.get("phone") ?? ""
      ).replace(/\D/g, "");

    const email =
      String(
        formData.get("email") ?? ""
      )
        .trim()
        .toLowerCase();

    const interest =
      String(
        formData.get("interest") ?? ""
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

    if (
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

    if (!interest) {
      showToast({
        variant: "error",
        title:
          "Selecciona un metraje",
        message:
          "Selecciona el metraje o tipo de asesoría que necesitas.",
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

    const defaultMessage =
      `Solicitud de información sobre ${PROJECT_NAME}. Metraje de interés: ${interest}.`;

    const leadData = {
      fuente_id:
        SOURCE_ID,

      telefono:
        phone,

      nombre:
        fullName,

      email,

      dni: "",

      campaña:
        `Proyecto ${PROJECT_NAME}`,

      anuncio:
        `Formulario ubicación - ${PROJECT_NAME}`,

      msj_client:
        JSON.stringify({
          proyecto:
            PROJECT_NAME,

          categoria_interes:
            "Lotes",

          metraje_interes:
            interest,

          nombre:
            fullName,

          telefono:
            phone,

          correo:
            email,

          mensaje:
            defaultMessage,

          direccion_proyecto:
            locationColinasDeMoro
              .projectAddress,

          referencia_proyecto:
            locationColinasDeMoro
              .projectReference,

          origen_ruta:
            window.location.pathname,

          origen_componente:
            `ColinasDeMoroLocation - ${PROJECT_NAME}`,

          consentimiento:
            consent,

          fuente_id:
            SOURCE_ID,
        }),

      comentario:
        defaultMessage,
    };

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
          }
        );

      const result =
        await readApiResponse(
          response
        );

      if (
        !response.ok ||
        result.success === false
      ) {
        console.error(
          "Error API Las Colinas de Moro:",
          {
            status:
              response.status,

            result,

            leadData,
          }
        );

        const nestedData =
          typeof result.data ===
            "object" &&
          result.data !== null &&
          !Array.isArray(
            result.data
          )
            ? result.data as Record<
                string,
                unknown
              >
            : null;

        const nestedError =
          typeof nestedData?.error ===
          "string"
            ? nestedData.error
            : "";

        const apiMessage =
          result.message ||
          result.error ||
          nestedError ||
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

      showToast(
        SUCCESS_TOAST
      );
    } catch (error) {
      console.error(
        "Error enviando formulario de Las Colinas de Moro:",
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
                Correo electrónico

                <input
                  id="colinas-location-email"
                  type="email"
                  name="email"
                  placeholder="correo@gmail.com"
                  autoComplete="email"
                  maxLength={120}
                  title="Ingresa un correo electrónico válido."
                  disabled={
                    isSending
                  }
                  required
                />
              </label>

              <label htmlFor="colinas-location-interest">
                Metraje de interés

                <select
                  id="colinas-location-interest"
                  name="interest"
                  defaultValue=""
                  disabled={
                    isSending
                  }
                  required
                >
                  <option
                    value=""
                    disabled
                  >
                    Selecciona una opción
                  </option>

                  <option value="Lote desde 90 m²">
                    Lote desde 90 m²
                  </option>

                  <option value="Lote de metraje intermedio">
                    Lote de metraje
                    intermedio
                  </option>

                  <option value="Lote hasta 285 m²">
                    Lote hasta 285 m²
                  </option>

                  <option value="Asesoría personalizada">
                    Necesito asesoría
                    personalizada
                  </option>
                </select>
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
                  y autorizo a ANCOSUR a
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