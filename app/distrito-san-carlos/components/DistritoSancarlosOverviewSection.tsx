"use client";

import {
  ArrowRightIcon,
  DownloadSimpleIcon,
} from "@phosphor-icons/react";
import Link from "next/link";
import { useCallback, useState } from "react";
import type { FormEvent } from "react";

import FeedbackToast, {
  type FeedbackToastData,
} from "@/components/ui/FeedbackToast/FeedbackToast";

import {
  brochureDistritoSanCarlos,
  details,
  facts,
} from "../data";

import styles from "../DistritoSanCarlosPage.module.css";

const PROJECT_NAME = "Distrito San Carlos";

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

export default function DistritoSanCarlosOverviewSection() {
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

    const email = String(
      formData.get("email") ?? ""
    )
      .trim()
      .toLowerCase();

    const interest = String(
      formData.get("interest") ?? ""
    ).trim();

    const message = String(
      formData.get("message") ?? ""
    ).trim();

    const consent =
      formData.get("consent") ===
      "accepted";

    const leadData = {
      fullName,
      phone,
      email,
      project: PROJECT_NAME,
      interest,
      message:
        message ||
        "Solicitud de información enviada desde la página de Distrito San Carlos.",
      campaign: "distrito-san-carlos-web",
      source: "distrito-san-carlos-page",
      consent,
      origen_ruta:
        window.location.pathname,
      origen_componente:
        "DistritoSanCarlosOverviewSection",
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
        "Error enviando formulario de Distrito San Carlos:",
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
        className={styles.overviewSection}
        id="informacion-distrito-san-carlos"
        aria-labelledby="distrito-san-carlos-overview-title"
      >
        <div className={styles.overviewInner}>
          <div
            className={
              styles.overviewContent
            }
          >
            <span
              className={styles.eyebrow}
            >
              Ciudad de 15 minutos
            </span>

            <h2 id="distrito-san-carlos-overview-title">
              Una ciudad dentro de tu edificio
            </h2>

            <p
              className={
                styles.overviewDescription
              }
            >
              Distrito San Carlos integra
              departamentos, áreas comunes,
              espacios comerciales y servicios
              para que puedas vivir, trabajar,
              comprar y disfrutar sin alejarte
              de tu hogar.
            </p>

            <div
              className={
                styles.overviewFacts
              }
            >
              {facts.map((item) => (
                <div
                  key={`${item.label}-${item.value}`}
                  className={
                    styles.overviewFact
                  }
                >
                  <span>
                    {item.label}
                  </span>

                  <strong>
                    {item.value}
                  </strong>
                </div>
              ))}
            </div>

            <ul
              className={styles.detailsList}
            >
              {details.map((item) => (
                <li
                  key={`${item.label}-${item.value}`}
                >
                  <strong>
                    {item.label}
                  </strong>

                  <span>
                    {item.value}
                  </span>
                </li>
              ))}
            </ul>

            <div
              className={
                styles.overviewActions
              }
            >
              <a
                href={
                  brochureDistritoSanCarlos
                }
                download
                aria-label="Descargar brochure de Distrito San Carlos"
              >
                <DownloadSimpleIcon
                  size={18}
                  weight="bold"
                  aria-hidden={true}
                />

                Descargar brochure
              </a>

              <Link href="/portal-de-transparencia/distrito-san-carlos">
                Respaldo legal

                <ArrowRightIcon
                  size={18}
                  weight="bold"
                  aria-hidden={true}
                />
              </Link>
            </div>
          </div>

          <form
            className={
              styles.overviewForm
            }
            onSubmit={handleSubmit}
          >
            <div
              className={styles.formHeader}
            >
              <span>
                Solicita información
              </span>

              <strong>
                Conoce Distrito San Carlos
              </strong>

              <p>
                Completa tus datos y un asesor
                te brindará información sobre
                precios, disponibilidad,
                tipologías y formas de pago.
              </p>
            </div>

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

            <div
              className={
                styles.formTwoColumns
              }
            >
              <label>
                Celular

                <input
                  type="tel"
                  name="phone"
                  placeholder="987654321"
                  inputMode="numeric"
                  autoComplete="tel"
                  pattern="9[0-9]{8}"
                  minLength={9}
                  maxLength={9}
                  title="Ingresa un número celular peruano de 9 dígitos que comience con 9."
                  disabled={isSending}
                  required
                />
              </label>

              <label>
                Correo opcional

                <input
                  type="email"
                  name="email"
                  placeholder="correo@gmail.com"
                  autoComplete="email"
                  maxLength={120}
                  disabled={isSending}
                />
              </label>
            </div>

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

                <option value="Distrito San Carlos - Tipo Impulso">
                  Tipo Impulso
                </option>

                <option value="Distrito San Carlos - Tipo Equilibrio">
                  Tipo Equilibrio
                </option>

                <option value="Distrito San Carlos - Tipo Espacio">
                  Tipo Espacio
                </option>

                <option value="Distrito San Carlos - Triplex">
                  Triplex
                </option>

                <option value="Distrito San Carlos - Penthouse">
                  Penthouse
                </option>

                <option value="Distrito San Carlos - Asesoría personalizada">
                  Asesoría personalizada
                </option>
              </select>
            </label>

            <label>
              Mensaje opcional

              <textarea
                name="message"
                placeholder="Cuéntanos qué departamento buscas o cuándo deseas que te contactemos."
                rows={4}
                maxLength={250}
                disabled={isSending}
              />
            </label>

            <label
              className={styles.checkbox}
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
                información comercial sobre
                Distrito San Carlos.
              </span>
            </label>

            <button
              type="submit"
              disabled={isSending}
              aria-busy={isSending}
            >
              {isSending
                ? "Enviando datos..."
                : "Enviar datos"}

              <ArrowRightIcon
                size={18}
                weight="bold"
                aria-hidden={true}
              />
            </button>
          </form>
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