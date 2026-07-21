"use client";

import {
  ArrowRightIcon,
  ClockIcon,
  MapPinIcon,
  MountainsIcon,
  SunIcon,
  WhatsappLogoIcon,
} from "@phosphor-icons/react";
import { useCallback, useState } from "react";
import type { FormEvent } from "react";

import FeedbackToast, {
  type FeedbackToastData,
} from "@/components/ui/FeedbackToast/FeedbackToast";

import {
  locationTerrazasConcepcion,
  projectFormData,
  whatsappTerrazasConcepcion,
} from "../data";

import styles from "./TerrazasConcepcionLocation.module.css";

const PROJECT_NAME =
  projectFormData.projectName ||
  "Las Terrazas de Concepción";

const GOOGLE_MAPS_EMBED = `https://www.google.com/maps?q=${encodeURIComponent(
  locationTerrazasConcepcion.googleMapsQuery
)}&output=embed`;

const GOOGLE_MAPS_LINK = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  locationTerrazasConcepcion.googleMapsQuery
)}`;

const OFFICE_GOOGLE_MAPS_LINK = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  locationTerrazasConcepcion.officeGoogleMapsQuery
)}`;

type ToastState = FeedbackToastData & {
  id: number;
};

type ApiResponse = {
  success?: boolean;
  response?: string;
  message?: string;
  data?: unknown;
};

const SUCCESS_TOAST: FeedbackToastData = {
  variant: "success",
  title: "¡Datos enviados correctamente!",
  message:
    "Un asesor de ANCOSUR se comunicará contigo pronto.",
};

const ERROR_TOAST: FeedbackToastData = {
  variant: "error",
  title: "No pudimos enviar tus datos",
  message:
    "Verifica tu conexión e inténtalo nuevamente.",
};

const readApiResponse = async (
  response: Response
): Promise<ApiResponse> => {
  const contentType =
    response.headers.get("content-type");

  if (contentType?.includes("application/json")) {
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

  const responseText = await response.text();

  return {
    success: response.ok,
    message:
      responseText ||
      "No se recibió una respuesta de la API.",
  };
};

const getApiErrorMessage = (
  result: ApiResponse | null,
  status: number
) => {
  const dataError =
    result?.data &&
    typeof result.data === "object" &&
    "error" in result.data
      ? String(
          (result.data as { error?: unknown }).error ?? ""
        )
      : "";

  return (
    result?.message ||
    dataError ||
    `No se pudo enviar la solicitud. Código ${status}.`
  );
};

export default function TerrazasConcepcionLocation() {
  const [isSending, setIsSending] =
    useState(false);

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

    const formData = new FormData(form);

    const fullName = String(
      formData.get("fullName") ?? ""
    ).trim();

    const phone = String(
      formData.get("phone") ?? ""
    ).replace(/\D/g, "");

    const interest = String(
      formData.get("interest") ?? ""
    ).trim();

    const leadData = {
      nombres_completos: fullName,
      telefono: phone,
      email: "",
      proyecto_interes: PROJECT_NAME,
      categoria_interes: interest || "Lotes",
      fuente_prospeccion: "Web",
      mensaje:
        `Solicitud de información sobre ${PROJECT_NAME}. Interés: ${interest}. Enviada desde la sección de ubicación.`,
      origen_ruta: window.location.pathname,
      origen_componente:
        `TerrazasConcepcionLocation - ${PROJECT_NAME}`,
    };

    try {
      setIsSending(true);
      setToast(null);

      const response = await fetch(
        "/api/leads",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(leadData),
          cache: "no-store",
        }
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
          message: getApiErrorMessage(
            result,
            response.status
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
        id="ubicacion-terrazas-concepcion"
        aria-labelledby="terrazas-concepcion-location-title"
      >
        <div className={styles.header}>
          <span>
            {locationTerrazasConcepcion.eyebrow}
          </span>

          <h2 id="terrazas-concepcion-location-title">
            {locationTerrazasConcepcion.title}
          </h2>

          <p>
            {locationTerrazasConcepcion.description}
          </p>
        </div>

        <div className={styles.locationFeatures}>
          <article>
            <div className={styles.featureIcon}>
              <MountainsIcon
                size={25}
                weight="fill"
                aria-hidden={true}
              />
            </div>

            <div>
              <span>
                {
                  locationTerrazasConcepcion.altitude
                    .label
                }
              </span>

              <strong>
                {
                  locationTerrazasConcepcion.altitude
                    .value
                }
              </strong>
            </div>
          </article>

          <article>
            <div className={styles.featureIcon}>
              <SunIcon
                size={25}
                weight="fill"
                aria-hidden={true}
              />
            </div>

            <div>
              <span>
                {
                  locationTerrazasConcepcion.climate
                    .label
                }
              </span>

              <strong>
                {
                  locationTerrazasConcepcion.climate
                    .value
                }
              </strong>
            </div>
          </article>
        </div>

        <div className={styles.grid}>
          <article className={styles.mapCard}>
            <div className={styles.map}>
              <iframe
                src={GOOGLE_MAPS_EMBED}
                title="Ubicación de Las Terrazas de Concepción"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>

            <div className={styles.mapInformation}>
              <div className={styles.projectAddress}>
                <div className={styles.addressIcon}>
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
                      locationTerrazasConcepcion.projectAddress
                    }
                  </strong>

                  <p>
                    {
                      locationTerrazasConcepcion.projectReference
                    }
                  </p>
                </div>
              </div>

              <a
                href={GOOGLE_MAPS_LINK}
                target="_blank"
                rel="noreferrer"
                className={styles.mapButton}
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
            className={styles.contactCard}
            id="informacion-terrazas-concepcion"
          >
            <div className={styles.formHeader}>
              <span>
                Solicita información
              </span>

              <h3>
                {projectFormData.title}
              </h3>

              <p>
                {projectFormData.description}
              </p>
            </div>

            <form
              className={styles.form}
              onSubmit={handleSubmit}
              noValidate
            >
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

              <label>
                ¿Qué información necesitas?

                <select
                  name="interest"
                  defaultValue=""
                  disabled={isSending}
                  required
                >
                  <option value="" disabled>
                    Selecciona una opción
                  </option>

                  {projectFormData.interestOptions.map(
                    (option) => (
                      <option
                        key={option.value}
                        value={option.value}
                      >
                        {option.label}
                      </option>
                    )
                  )}
                </select>
              </label>

              <label className={styles.checkbox}>
                <input
                  type="checkbox"
                  name="consent"
                  value="accepted"
                  checked
                  readOnly
                />

                <span>
                  Acepto ser contactado por
                  ANCOSUR para recibir
                  información comercial sobre
                  Las Terrazas de Concepción.
                </span>
              </label>

              <button
                type="submit"
                className={styles.submitButton}
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

            <div className={styles.divider}>
              <span>
                o comunícate directamente
              </span>
            </div>

            <a
              href={whatsappTerrazasConcepcion}
              target="_blank"
              rel="noreferrer"
              className={styles.whatsappButton}
            >
              <WhatsappLogoIcon
                size={20}
                weight="fill"
                aria-hidden={true}
              />

              Escribir por WhatsApp
            </a>

            <div className={styles.officeInformation}>
              <div className={styles.officeItem}>
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
                      locationTerrazasConcepcion.officeAddress
                    }
                  </strong>

                  <a
                    href={OFFICE_GOOGLE_MAPS_LINK}
                    target="_blank"
                    rel="noreferrer"
                    className={styles.officeLink}
                  >
                    Ver ubicación

                    <ArrowRightIcon
                      size={14}
                      weight="bold"
                      aria-hidden={true}
                    />
                  </a>
                </div>
              </div>

              <div className={styles.officeItem}>
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
                      locationTerrazasConcepcion.schedule
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
        open={toast !== null}
        variant={toast?.variant ?? "info"}
        title={toast?.title ?? ""}
        message={toast?.message ?? ""}
        onClose={closeToast}
      />
    </>
  );
}