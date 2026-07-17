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

import {
  locationNeoEmperatriz,
  whatsappNeoEmperatriz,
} from "../data";

import styles from "./NeoEmperatrizLocation.module.css";

const PROJECT_NAME = "Neo Emperatriz";

const GOOGLE_MAPS_EMBED = `https://maps.google.com/maps?q=${encodeURIComponent(
  locationNeoEmperatriz.googleMapsQuery
)}&t=m&z=18&ie=UTF8&iwloc=near&output=embed`;

const GOOGLE_MAPS_LINK = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  locationNeoEmperatriz.googleMapsQuery
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

export default function NeoEmperatrizLocation() {
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

    const consent =
      formData.get("consent") ===
      "accepted";

    const leadData = {
      fullName,
      phone,
      email: "",
      project: PROJECT_NAME,
      interest:
        "Información general de Neo Emperatriz",
      message:
        "Solicitud de información enviada desde la sección de ubicación de Neo Emperatriz.",
      campaign: "neo-emperatriz-web",
      source: "ubicacion-neo-emperatriz",
      consent,
      origen_ruta:
        window.location.pathname,
      origen_componente:
        "NeoEmperatrizLocation",
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
        "Error enviando formulario de Neo Emperatriz:",
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
        id="ubicacion-neo-emperatriz"
        aria-labelledby="neo-emperatriz-location-title"
      >
        <div className={styles.header}>
          <span>Ubicación</span>

          <h2 id="neo-emperatriz-location-title">
            Tu nuevo hogar te espera en Neo
            Emperatriz
          </h2>

          <p>
            Vive en San Carlos, en una
            ubicación estratégica cerca de la
            Universidad Continental,
            comercios, servicios y las
            principales vías de Huancayo.
          </p>
        </div>

        <div className={styles.grid}>
          <div className={styles.mapCard}>
            <div className={styles.map}>
              <iframe
                src={GOOGLE_MAPS_EMBED}
                title="Ubicación de Neo Emperatriz en Av. San Carlos 1481, Huancayo"
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
                      locationNeoEmperatriz.projectAddress
                    }
                  </strong>

                  <p>
                    {
                      locationNeoEmperatriz.projectReference
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
                Conoce Neo Emperatriz
              </h3>

              <p>
                Déjanos tus datos y un
                asesor te brindará
                información sobre los
                últimos departamentos
                disponibles, precios y
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
                  sobre Neo Emperatriz.
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
              href={whatsappNeoEmperatriz}
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
                    locationNeoEmperatriz.officeAddress
                  }
                </strong>

                <p>
                  {
                    locationNeoEmperatriz.schedule
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