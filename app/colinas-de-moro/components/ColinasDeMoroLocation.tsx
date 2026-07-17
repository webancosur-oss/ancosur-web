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
  locationColinasDeMoro,
  whatsappColinasDeMoro,
} from "../data";

import styles from "./ColinasDeMoroLocation.module.css";

const PROJECT_NAME = "Las Colinas de Moro";

const GOOGLE_MAPS_EMBED = `https://www.google.com/maps?q=${encodeURIComponent(
  locationColinasDeMoro.googleMapsQuery
)}&output=embed`;

const GOOGLE_MAPS_LINK = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  locationColinasDeMoro.googleMapsQuery
)}`;

type ToastState = FeedbackToastData & {
  id: number;
};

const SUCCESS_TOAST: FeedbackToastData = {
  variant: "success",
  title: "¡Datos enviados correctamente!",
  message: "Un asesor de ANCOSUR se comunicará contigo pronto.",
};

const ERROR_TOAST: FeedbackToastData = {
  variant: "error",
  title: "No pudimos enviar tus datos",
  message: "Verifica tu conexión e inténtalo nuevamente.",
};

export default function ColinasDeMoroLocation() {
  const [isSending, setIsSending] = useState(false);

  const [toast, setToast] = useState<ToastState | null>(null);

  const closeToast = useCallback(() => {
    setToast(null);
  }, []);

  const showToast = (toastData: FeedbackToastData) => {
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

    const consent =
      formData.get("consent") === "accepted";

    const leadData = {
      fullName,
      phone,
      email: "",

      /*
       * Se registra en:
       * leads.proyecto_interes
       */
      project: PROJECT_NAME,

      /*
       * Se registra en:
       * leads.categoria_interes
       */
      interest,

      message: `Solicitud de información sobre ${PROJECT_NAME}. Metraje de interés: ${interest}.`,

      campaign: "colinas-de-moro-web",

      source: "ubicacion-colinas-de-moro",

      consent,

      origen_ruta: window.location.pathname,

      origen_componente: "ColinasDeMoroLocation",
    };

    try {
      setIsSending(true);
      setToast(null);

      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(leadData),
      });

      if (!response.ok) {
        throw new Error(
          `Error HTTP ${response.status}`
        );
      }

      form.reset();

      showToast(SUCCESS_TOAST);
    } catch (error) {
      console.error(
        "Error enviando formulario de Las Colinas de Moro:",
        error
      );

      showToast(ERROR_TOAST);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <>
      <section
        className={styles.section}
        id="ubicacion-colinas-de-moro"
        aria-labelledby="colinas-location-title"
      >
        <div className={styles.header}>
          <span>
            {locationColinasDeMoro.eyebrow}
          </span>

          <h2 id="colinas-location-title">
            {locationColinasDeMoro.title}
          </h2>

          <p>
            {locationColinasDeMoro.description}
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
                {locationColinasDeMoro.altitude.label}
              </span>

              <strong>
                {locationColinasDeMoro.altitude.value}
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
                {locationColinasDeMoro.climate.label}
              </span>

              <strong>
                {locationColinasDeMoro.climate.value}
              </strong>
            </div>
          </article>
        </div>

        <div className={styles.grid}>
          <article className={styles.mapCard}>
            <div className={styles.map}>
              <iframe
                src={GOOGLE_MAPS_EMBED}
                title="Ubicación de Las Colinas de Moro en Concepción"
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
                      locationColinasDeMoro.projectAddress
                    }
                  </strong>

                  <p>
                    {
                      locationColinasDeMoro.projectReference
                    }
                  </p>
                </div>
              </div>

              <a
                href={GOOGLE_MAPS_LINK}
                target="_blank"
                rel="noopener noreferrer"
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

          <aside className={styles.contactCard}>
            <div className={styles.formHeader}>
              <span>
                Solicita información
              </span>

              <h3>
                Encuentra el lote ideal para ti
              </h3>

              <p>
                Déjanos tus datos y un asesor te
                brindará información sobre
                disponibilidad, metrajes, precios y
                formas de pago.
              </p>
            </div>

            <form
              className={styles.form}
              onSubmit={handleSubmit}
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
                Metraje de interés

                <select
                  name="interest"
                  defaultValue=""
                  disabled={isSending}
                  required
                >
                  <option value="" disabled>
                    Selecciona una opción
                  </option>

                  <option value="Lote desde 90 m²">
                    Lote desde 90 m²
                  </option>

                  <option value="Lote de metraje intermedio">
                    Lote de metraje intermedio
                  </option>

                  <option value="Lote hasta 285 m²">
                    Lote hasta 285 m²
                  </option>

                  <option value="Asesoría personalizada">
                    Necesito asesoría personalizada
                  </option>
                </select>
              </label>

              <label className={styles.checkbox}>
                <input
                  type="checkbox"
                  name="consent"
                  value="accepted"
                  disabled={isSending}
                  required
                />

                <span>
                  Acepto ser contactado por ANCOSUR
                  para recibir información comercial
                  sobre Las Colinas de Moro.
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
              href={whatsappColinasDeMoro}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.whatsappButton}
            >
              <WhatsappLogoIcon
                size={20}
                weight="fill"
                aria-hidden={true}
              />

              Escribir por WhatsApp
            </a>

            <div
              className={styles.officeInformation}
            >
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
                      locationColinasDeMoro.officeAddress
                    }
                  </strong>
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
                      locationColinasDeMoro.schedule
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