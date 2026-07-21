"use client";

import {
  ArrowRightIcon,
  BuildingsIcon,
  ClockIcon,
  MapPinIcon,
  ShieldCheckIcon,
  WhatsappLogoIcon,
} from "@phosphor-icons/react";
import { useCallback, useState } from "react";
import type { FormEvent } from "react";

import FeedbackToast, {
  type FeedbackToastData,
} from "@/components/ui/FeedbackToast/FeedbackToast";

import {
  locationCaminoReal,
  whatsappCaminoReal,
} from "../data";

import styles from "./CaminoRealLocation.module.css";

const PROJECT_NAME = "Camino Real";

const GOOGLE_MAPS_EMBED = `https://www.google.com/maps?q=${encodeURIComponent(
  locationCaminoReal.googleMapsQuery
)}&output=embed`;

const GOOGLE_MAPS_LINK = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  locationCaminoReal.googleMapsQuery
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

export default function CaminoRealLocation() {
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

  const leadData = {
    nombres_completos: fullName,
    telefono: phone,
    email: "",
    proyecto_interes: PROJECT_NAME,
    categoria_interes: interest,
    fuente_prospeccion: "Web",
    mensaje: `Solicitud de información sobre ${PROJECT_NAME}. Interés: ${interest}.`,
    origen_ruta: window.location.pathname,
    origen_componente: `CaminoRealLocation - ${PROJECT_NAME}`,
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

    const result = await response
      .json()
      .catch(() => null);

    if (!response.ok || result?.success === false) {
      const apiMessage =
        result?.message ||
        result?.data?.error ||
        `No se pudo enviar la solicitud. Código ${response.status}.`;

      showToast({
        variant: "error",
        title: "No pudimos enviar tus datos",
        message: String(apiMessage),
      });

      return;
    }

    form.reset();

    showToast({
      variant: "success",
      title: "¡Datos enviados correctamente!",
      message:
        "Un asesor de ANCOSUR se comunicará contigo pronto.",
    });
  } catch {
    showToast({
      variant: "error",
      title: "No pudimos conectar con la API",
      message:
        "Revisa tu conexión o intenta nuevamente en unos minutos.",
    });
  } finally {
    setIsSending(false);
  }
};
  return (
    <>
      <section
        className={styles.section}
        id="ubicacion-camino-real"
        aria-labelledby="camino-real-location-title"
      >
        <div className={styles.header}>
          <span>{locationCaminoReal.eyebrow}</span>

          <h2 id="camino-real-location-title">
            {locationCaminoReal.title}
          </h2>

          <p>{locationCaminoReal.description}</p>
        </div>

        <div className={styles.locationFeatures}>
          <article>
            <div className={styles.featureIcon}>
              <ShieldCheckIcon
                size={25}
                weight="fill"
                aria-hidden={true}
              />
            </div>

            <div>
              <span>
                {locationCaminoReal.legalStatus.label}
              </span>

              <strong>
                {locationCaminoReal.legalStatus.value}
              </strong>
            </div>
          </article>

          <article>
            <div className={styles.featureIcon}>
              <BuildingsIcon
                size={25}
                weight="fill"
                aria-hidden={true}
              />
            </div>

            <div>
              <span>
                {locationCaminoReal.development.label}
              </span>

              <strong>
                {locationCaminoReal.development.value}
              </strong>
            </div>
          </article>
        </div>

        <div className={styles.grid}>
          <article className={styles.mapCard}>
            <div className={styles.map}>
              <iframe
                src={GOOGLE_MAPS_EMBED}
                title="Ubicación de Camino Real Residencial en El Tambo"
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
                  <span>Ubicación del proyecto</span>

                  <strong>
                    {locationCaminoReal.projectAddress}
                  </strong>

                  <p>
                    {locationCaminoReal.projectReference}
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
              <span>Solicita información</span>

              <h3>Encuentra el lote ideal para ti</h3>

              <p>
                Déjanos tus datos y un asesor te brindará
                información sobre disponibilidad, metrajes,
                precios y formas de pago.
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
                Metraje o interés

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

                  <option value="Lote hasta 178 m²">
                    Lote hasta 178 m²
                  </option>

                  <option value="Formas de pago">
                    Conocer formas de pago
                  </option>

                  <option value="Agendar una visita">
                    Agendar una visita
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
              checked
              onChange={() => {}}
            />

            <span>
              Acepto ser contactado por ANCOSUR para recibir información comercial
              sobre Camino Real.
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
              <span>o comunícate directamente</span>
            </div>

            <a
              href={whatsappCaminoReal}
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

            <div className={styles.officeInformation}>
              <div className={styles.officeItem}>
                <MapPinIcon
                  size={19}
                  weight="fill"
                  aria-hidden={true}
                />

                <div>
                  <span>Oficina de ventas</span>

                  <strong>
                    {locationCaminoReal.officeAddress}
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
                  <span>Horario de atención</span>

                  <strong>
                    {locationCaminoReal.schedule}
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