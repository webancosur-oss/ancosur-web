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
  brochureColinasDeMoro,
  details,
  facts,
} from "../data";

import styles from "../components/ColinasDeMoroOverviewSection.module.css";

const PROJECT_NAME = "Las Colinas de Moro";

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

export default function ColinasDeMoroOverviewSection() {
  const [isSending, setIsSending] = useState(false);

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

  const message = String(
    formData.get("message") ?? ""
  ).trim();

  const interest = "Lotes";

  const leadData = {
    nombres_completos: fullName,
    telefono: phone,
    email,
    proyecto_interes: PROJECT_NAME,
    categoria_interes: interest,
    fuente_prospeccion: "Web",
    mensaje:
      message ||
      `Solicitud de información sobre ${PROJECT_NAME}.`,
    origen_ruta: window.location.pathname,
    origen_componente: `ColinasDeMoroOverviewSection - ${PROJECT_NAME}`,
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

    showToast(SUCCESS_TOAST);
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
        className={styles.overviewSection}
        id="informacion-colinas-de-moro"
        aria-labelledby="colinas-de-moro-overview-title"
      >
        <div className={styles.overviewInner}>
          <div className={styles.overviewContent}>
            <span className={styles.eyebrow}>
              Invierte en tu patrimonio
            </span>

            <h2 id="colinas-de-moro-overview-title">
              Lotes con entrega inmediata en Concepción
            </h2>

            <p className={styles.overviewDescription}>
              Las Colinas de Moro es una oportunidad
              para construir tu vivienda, casa de campo
              o realizar una inversión en una zona
              conectada con la Carretera Central y con
              proyección de crecimiento.
            </p>

            <div className={styles.overviewFacts}>
              {facts.map((item) => (
                <div
                  key={`${item.label}-${item.value}`}
                  className={styles.overviewFact}
                >
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </div>
              ))}
            </div>

            <ul className={styles.detailsList}>
              {details.map((item) => (
                <li
                  key={`${item.label}-${item.value}`}
                >
                  <strong>{item.label}</strong>
                  <span>{item.value}</span>
                </li>
              ))}
            </ul>

            <div className={styles.overviewActions}>
              <a
                href={brochureColinasDeMoro}
                download
                aria-label="Descargar brochure de Las Colinas de Moro"
              >
                <DownloadSimpleIcon
                  size={18}
                  weight="bold"
                  aria-hidden={true}
                />

                Descargar brochure
              </a>

              <Link href="/portal-de-transparencia/las-colinas-de-moro">
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
            className={styles.overviewForm}
            onSubmit={handleSubmit}
          >
            <div className={styles.formHeader}>
              <span>Solicita información</span>

              <strong>
                Conoce nuestros lotes disponibles
              </strong>

              <p>
                Completa tus datos y un asesor te
                brindará información sobre precios,
                metrajes, disponibilidad y formas de
                pago.
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

            <div className={styles.formTwoColumns}>
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
                  title="Ingresa un celular peruano de 9 dígitos que empiece con 9."
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
              Mensaje opcional

              <textarea
                name="message"
                placeholder="Cuéntanos qué metraje buscas o cuándo deseas que te contactemos."
                rows={4}
                maxLength={250}
                disabled={isSending}
              />
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
              Acepto ser contactado por ANCOSUR para recibir información comercial
              sobre Las Colinas de Moro.
            </span>
          </label>

            <button
              type="submit"
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