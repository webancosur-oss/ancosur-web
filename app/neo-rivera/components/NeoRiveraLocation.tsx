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
import type { FormEvent } from "react";

import FeedbackToast, {
  type FeedbackToastData,
} from "@/components/ui/FeedbackToast/FeedbackToast";

import { whatsappNeoRivera } from "../data";
import styles from "./NeoRiveraLocation.module.css";

const GOOGLE_MAPS_QUERY =
  "Jirón Las Dalias, La Ribera, Huancayo, Junín, Perú";

const GOOGLE_MAPS_EMBED = `https://www.google.com/maps?q=${encodeURIComponent(
  GOOGLE_MAPS_QUERY
)}&output=embed`;

const GOOGLE_MAPS_LINK = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  GOOGLE_MAPS_QUERY
)}`;

type ApiResponse = {
  message?: string;
  error?: string;
};

const getRequestErrorMessage = (
  status: number
) => {
  if (status === 400 || status === 422) {
    return "Revisa los datos ingresados e inténtalo nuevamente.";
  }

  if (status === 409) {
    return "Ya recibimos una solicitud con estos datos. Un asesor se comunicará contigo.";
  }

  if (status >= 500) {
    return "Nuestro servicio no está disponible en este momento. Inténtalo nuevamente en unos minutos.";
  }

  return "No pudimos enviar tu solicitud. Inténtalo nuevamente.";
};

export default function NeoRiveraLocation() {
  const [isSending, setIsSending] =
    useState(false);

  const [toast, setToast] =
    useState<FeedbackToastData | null>(
      null
    );

  const closeToast = useCallback(() => {
    setToast(null);
  }, []);

  const showToast = (
    data: FeedbackToastData
  ) => {
    setToast(null);

    window.setTimeout(() => {
      setToast(data);
    }, 10);
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (isSending) return;

    const form = event.currentTarget;
    const formData = new FormData(form);

    const fullName = String(
      formData.get("fullName") ?? ""
    ).trim();

    const phone = String(
      formData.get("phone") ?? ""
    ).replace(/\D/g, "");

    const consent =
      formData.get("consent") ===
      "accepted";

    if (fullName.length < 3) {
      showToast({
        variant: "warning",
        title: "Revisa tu nombre",
        message:
          "Ingresa tu nombre completo para continuar.",
      });

      return;
    }

    if (!/^9\d{8}$/.test(phone)) {
      showToast({
        variant: "warning",
        title: "Celular incorrecto",
        message:
          "Ingresa un celular peruano de 9 dígitos que empiece con 9.",
      });

      return;
    }

    if (!consent) {
      showToast({
        variant: "warning",
        title: "Autorización necesaria",
        message:
          "Debes aceptar la autorización de contacto para enviar tu solicitud.",
      });

      return;
    }

    const leadData = {
      fullName,
      phone,
      email: "",
      project: "Neo Rivera",
      interest:
        "Información general de Neo Rivera",
      message:
        "Solicitud de información enviada desde la sección de ubicación de Neo Rivera.",
      campaign: "neo-rivera-web",
      source: "ubicacion-neo-rivera",
      consent: true,
      origen_ruta:
        window.location.pathname,
      origen_componente:
        "NeoRiveraLocation",
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

      const result =
        (await response
          .json()
          .catch(() => ({}))) as ApiResponse;

      if (!response.ok) {
        console.error(
          "Error de la API:",
          response.status,
          result
        );

        throw new Error(
          getRequestErrorMessage(
            response.status
          )
        );
      }

      console.info(
        "Lead registrado:",
        result
      );

      form.reset();

      showToast({
        variant: "success",
        title:
          "¡Datos enviados correctamente!",
        message:
          "Recibimos tus datos. Un asesor de ANCOSUR se comunicará contigo pronto.",
      });
    } catch (error) {
      console.error(
        "Error enviando solicitud de Neo Rivera:",
        error
      );

      showToast({
        variant: "error",
        title:
          "No pudimos enviar tus datos",
        message:
          error instanceof Error
            ? error.message
            : "Verifica tu conexión e inténtalo nuevamente.",
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <>
      <section
        className={styles.section}
        id="ubicacion-neo-rivera"
        aria-labelledby="neo-rivera-location-title"
      >
        <div className={styles.header}>
          <span>Ubicación</span>

          <h2 id="neo-rivera-location-title">
            Tu futuro hogar te espera en NEO
            RIVERA
          </h2>

          <p>
            Vive en una zona residencial
            tranquila, conectada con los
            principales servicios y puntos
            importantes de Huancayo.
          </p>
        </div>

        <div className={styles.grid}>
          <div className={styles.mapCard}>
            <div className={styles.map}>
              <iframe
                src={GOOGLE_MAPS_EMBED}
                title="Ubicación de Neo Rivera en Huancayo"
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
                    La Ribera · Jr. Las
                    Dalias
                  </strong>

                  <p>
                    Al costado del Parque La
                    Rivera, Huancayo.
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
          </div>

          <aside
            className={
              styles.contactCard
            }
          >
            <div
              className={styles.formHeader}
            >
              <span>
                Solicita información
              </span>

              <h3>Conoce Neo Rivera</h3>

              <p>
                Déjanos tus datos y un
                asesor te brindará precios,
                disponibilidad y formas de
                pago.
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
                  placeholder="Ej. Angela Huayra"
                  autoComplete="name"
                  minLength={3}
                  maxLength={100}
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
                  title="Ingresa un celular peruano de 9 dígitos."
                  disabled={isSending}
                  required
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
                  disabled={isSending}
                  required
                />

                <span>
                  Acepto ser contactado por
                  ANCOSUR para recibir
                  información comercial
                  sobre Neo Rivera.
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
              href={whatsappNeoRivera}
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