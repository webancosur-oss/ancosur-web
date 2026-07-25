"use client";

import {
  ArrowRightIcon,
  ClockIcon,
  MapPinIcon,
  WhatsappLogoIcon,
} from "@phosphor-icons/react";
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
  locationMoro416,
  whatsappMoro416,
} from "../data";

import styles from "./Moro416Location.module.css";

/* =========================================================
   CONFIGURACIÓN
========================================================= */

const PROJECT_NAME = "Moro 416";

const PROJECT_CATEGORY =
  "Proyecto mixto de inversión, rentas cortas y oficinas";

const GOOGLE_MAPS_EMBED =
  `https://www.google.com/maps?q=${encodeURIComponent(
    locationMoro416.googleMapsQuery,
  )}&output=embed`;

const GOOGLE_MAPS_LINK =
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    locationMoro416.googleMapsQuery,
  )}`;

/* =========================================================
   TIPOS
========================================================= */

type ToastState = FeedbackToastData & {
  id: number;
};

type ApiResponse = {
  success?: boolean;
  response?: string;
  message?: string;
  data?: unknown;
};

/* =========================================================
   MENSAJES DEL FORMULARIO
========================================================= */

const SUCCESS_TOAST: FeedbackToastData = {
  variant: "success",
  title: "¡Datos enviados correctamente!",
  message:
    "Un asesor de ANCOSUR se comunicará contigo pronto para brindarte información sobre Moro 416.",
};

const ERROR_TOAST: FeedbackToastData = {
  variant: "error",
  title: "No pudimos enviar tus datos",
  message:
    "Verifica tu conexión e inténtalo nuevamente.",
};

/* =========================================================
   LECTURA DE RESPUESTA DE LA API
========================================================= */

const readApiResponse = async (
  response: Response,
): Promise<ApiResponse> => {
  const contentType =
    response.headers.get("content-type");

  if (
    contentType?.includes(
      "application/json",
    )
  ) {
    try {
      return await response.json();
    } catch {
      return {
        success: false,
        message:
          "La API devolvió una respuesta no válida.",
      };
    }
  }

  const responseText =
    await response.text();

  return {
    success: response.ok,
    message:
      responseText ||
      "No se recibió una respuesta de la API.",
  };
};

const getApiErrorMessage = (
  result: ApiResponse | null,
  status: number,
) => {
  const dataError =
    result?.data &&
    typeof result.data === "object" &&
    "error" in result.data
      ? String(
          (
            result.data as {
              error?: unknown;
            }
          ).error ?? "",
        )
      : "";

  return (
    result?.message ||
    dataError ||
    `No se pudo enviar la solicitud. Código ${status}.`
  );
};

/* =========================================================
   COMPONENTE
========================================================= */

export default function Moro416Location() {
  const [isSending, setIsSending] =
    useState(false);

  const [toast, setToast] =
    useState<ToastState | null>(null);

  const closeToast = useCallback(() => {
    setToast(null);
  }, []);

  const showToast = (
    toastData: FeedbackToastData,
  ) => {
    setToast({
      ...toastData,
      id: Date.now(),
    });
  };

  /* =========================================================
     ENVÍO DEL FORMULARIO
  ========================================================= */

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (isSending) return;

    const form = event.currentTarget;

    if (!form.checkValidity()) {
      form.reportValidity();

      showToast({
        variant: "error",
        title: "Revisa tus datos",
        message:
          "Completa correctamente los campos requeridos.",
      });

      return;
    }

    const formData =
      new FormData(form);

    const fullName = String(
      formData.get("fullName") ?? "",
    ).trim();

    const phone = String(
      formData.get("phone") ?? "",
    ).replace(/\D/g, "");

    const interest = String(
      formData.get("interest") ?? "",
    ).trim();

    const leadData = {
      nombres_completos: fullName,
      telefono: phone,
      email: "",

      proyecto_interes:
        PROJECT_NAME,

      categoria_interes:
        interest ||
        PROJECT_CATEGORY,

      fuente_prospeccion: "Web",

      mensaje:
        `Solicitud de información enviada desde la sección de ubicación de ${PROJECT_NAME}. Interés: ${
          interest || PROJECT_CATEGORY
        }.`,

      origen_ruta:
        window.location.pathname,

      origen_componente:
        `Moro416Location - ${PROJECT_NAME}`,
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
            Accept: "application/json",
          },

          body:
            JSON.stringify(leadData),

          cache: "no-store",
        },
      );

      const result =
        await readApiResponse(response);

      if (
        !response.ok ||
        result?.success === false
      ) {
        showToast({
          variant: "error",
          title:
            "No pudimos enviar tus datos",
          message:
            getApiErrorMessage(
              result,
              response.status,
            ),
        });

        return;
      }

      form.reset();

      showToast(SUCCESS_TOAST);
    } catch {
      showToast(ERROR_TOAST);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <>
      <section
        className={styles.section}
        id="ubicacion-moro-416"
        aria-labelledby="moro-416-location-title"
      >
        {/* CABECERA */}

        <div className={styles.header}>
          <span>
            Ubicación estratégica
          </span>

          <h2 id="moro-416-location-title">
            Invierte en el centro de
            Huancayo
          </h2>

          <p>
            Moro 416 se encuentra en la
            intersección de la avenida
            Giráldez y Ferrocarril, frente
            a Real Plaza Huancayo. Una
            ubicación estratégica con
            movimiento comercial,
            empresarial y turístico durante
            todo el año.
          </p>
        </div>

        <div className={styles.grid}>
          {/* MAPA */}

          <div className={styles.mapCard}>
            <div className={styles.map}>
              <iframe
                src={GOOGLE_MAPS_EMBED}
                title="Ubicación de Moro 416 en la avenida Giráldez y Ferrocarril, Huancayo"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>

            <div
              className={
                styles.locationInfo
              }
            >
              <div
                className={
                  styles.locationMain
                }
              >
                <div
                  className={
                    styles.locationIcon
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
                      locationMoro416.projectAddress
                    }
                  </strong>

                  <p>
                    {
                      locationMoro416.projectReference
                    }
                  </p>
                </div>
              </div>

              <a
                href={GOOGLE_MAPS_LINK}
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
          </div>

          {/* PANEL DE CONTACTO */}

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
                Invierte en Moro 416
              </h3>

              <p>
                Déjanos tus datos y un
                asesor te brindará
                información sobre precios,
                disponibilidad, tipologías,
                departamentos para rentas
                cortas, oficinas corporativas
                y formas de pago.
              </p>
            </div>

            <form
              className={styles.form}
              onSubmit={handleSubmit}
              noValidate
            >
              {/* NOMBRE */}

              <label>
                Nombre completo

                <input
                  type="text"
                  name="fullName"
                  placeholder="Ingresa tu nombre"
                  autoComplete="name"
                  minLength={3}
                  maxLength={80}
                  disabled={isSending}
                  required
                />
              </label>

              {/* CELULAR */}

              <label>
                Número de celular

                <input
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
                  required
                />
              </label>

              {/* INTERÉS */}

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
                  required
                />

                <span>
                  Acepto ser contactado por
                  ANCOSUR para recibir
                  información comercial sobre
                  Moro 416 y acepto la Política
                  de Privacidad.
                </span>
              </label>

              {/* BOTÓN */}

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

            {/* DIVISOR */}

            <div
              className={styles.divider}
            >
              <span>
                o comunícate directamente
              </span>
            </div>

            {/* WHATSAPP */}

            <a
              href={whatsappMoro416}
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

              Consultar Moro 416 por
              WhatsApp
            </a>

            {/* OFICINA DE VENTAS */}

            <div
              className={styles.schedule}
            >
              <ClockIcon
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
                    locationMoro416.officeAddress
                  }
                </strong>

                <p>
                  {
                    locationMoro416.schedule
                  }
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <FeedbackToast
        key={toast?.id}
        open={toast !== null}
        variant={
          toast?.variant ?? "info"
        }
        title={toast?.title ?? ""}
        message={toast?.message ?? ""}
        onClose={closeToast}
      />
    </>
  );
}