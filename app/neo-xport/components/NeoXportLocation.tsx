"use client";

import {
  ArrowRightIcon,
  ClockIcon,
  MapPinIcon,
  WhatsappLogoIcon,
} from "@phosphor-icons/react";
import { useCallback, useState } from "react";
import type { FormEvent } from "react";

import FeedbackToast, {
  type FeedbackToastData,
} from "@/components/ui/FeedbackToast/FeedbackToast";

import { whatsappNeoXport } from "../data";
import styles from "./NeoXportLocation.module.css";

const PROJECT_NAME = "Neo Xport";

const GOOGLE_MAPS_QUERY =
  "Avenida Chorrillos, frente al Polideportivo Wanka, Huancayo, Junín, Perú";

const GOOGLE_MAPS_EMBED = `https://www.google.com/maps?q=${encodeURIComponent(
  GOOGLE_MAPS_QUERY
)}&output=embed`;

const GOOGLE_MAPS_LINK = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  GOOGLE_MAPS_QUERY
)}`;

type ToastState = FeedbackToastData & {
  id: number;
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

export default function NeoXportLocation() {
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
      formData.get("consent") ===
      "accepted";

    const leadData = {
      fullName,
      phone,
      email: "",
      project: PROJECT_NAME,
      interest,
      message:
        "Solicitud de información enviada desde la sección de ubicación de Neo Xport.",
      campaign: "neo-xport-web",
      source: "ubicacion-neo-xport",
      consent,
      origen_ruta:
        window.location.pathname,
      origen_componente:
        "NeoXportLocation",
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
          body: JSON.stringify(leadData),
        }
      );

      if (!response.ok) {
        throw new Error(
          `Error HTTP ${response.status}`
        );
      }

      form.reset();

      showToast(SUCCESS_TOAST);
    } catch (error) {
      console.error(
        "Error enviando formulario de Neo Xport:",
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
        id="ubicacion-neo-xport"
        aria-labelledby="neo-xport-location-title"
      >
        <div className={styles.header}>
          <span>
            Ubicación estratégica
          </span>

          <h2 id="neo-xport-location-title">
            Tu futuro hogar te espera en Neo
            Xport
          </h2>

          <p>
            Vive frente al Polideportivo
            Wanka, en una zona conectada con
            centros deportivos, comercios,
            instituciones educativas y los
            principales servicios de
            Huancayo.
          </p>
        </div>

        <div className={styles.grid}>
          <article
            className={styles.mapCard}
          >
            <div className={styles.map}>
              <iframe
                src={GOOGLE_MAPS_EMBED}
                title="Ubicación de Neo Xport frente al Polideportivo Wanka"
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
                    San Antonio · Av.
                    Chorrillos
                  </strong>

                  <p>
                    Frente al Polideportivo
                    Wanka, en el cruce de Jr.
                    Nación Wanka y Paseo de
                    la Colina.
                  </p>
                </div>
              </div>

              <a
                href={GOOGLE_MAPS_LINK}
                target="_blank"
                rel="noreferrer"
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
            id="formulario-neo-xport"
          >
            <div
              className={
                styles.formHeader
              }
            >
              <span>
                Solicita información
              </span>

              <h3>Conoce Neo Xport</h3>

              <p>
                Déjanos tus datos y un
                asesor te brindará
                información sobre precios,
                departamentos disponibles y
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
                Estoy interesado en

                <select
                  name="interest"
                  defaultValue=""
                  disabled={isSending}
                  required
                >
                  <option
                    value=""
                    disabled
                  >
                    Selecciona una opción
                  </option>

                  <option value="neo-xport-2-dormitorios">
                    Departamento de 2
                    dormitorios
                  </option>

                  <option value="neo-xport-3-dormitorios">
                    Departamento de 3
                    dormitorios
                  </option>

                  <option value="neo-xport-inversion">
                    Comprar para inversión
                  </option>

                  <option value="neo-xport-financiamiento">
                    Conocer opciones de
                    financiamiento
                  </option>

                  <option value="neo-xport-asesoria">
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
                  disabled={isSending}
                  required
                />

                <span>
                  Acepto ser contactado por
                  ANCOSUR para recibir
                  información comercial
                  sobre Neo Xport.
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

            <div
              className={styles.divider}
            >
              <span>
                o comunícate directamente
              </span>
            </div>

            <a
              href={whatsappNeoXport}
              target="_blank"
              rel="noreferrer"
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
              className={styles.schedule}
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
                  Lunes a sábado, de 8:00
                  a. m. a 6:00 p. m.
                </strong>
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