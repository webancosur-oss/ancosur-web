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
  brochureTerrazasConcepcion,
  details,
  facts,
  projectFormData,
} from "../data";

import styles from "./TerrazasConcepcionOverviewSection.module.css";

const PROJECT_NAME =
  projectFormData.projectName ||
  "Las Terrazas de Concepción";

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
          (result.data as { error?: unknown })
            .error ?? ""
        )
      : "";

  return (
    result?.message ||
    dataError ||
    `No se pudo enviar la solicitud. Código ${status}.`
  );
};

export default function TerrazasConcepcionOverviewSection() {
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

    const email = String(
      formData.get("email") ?? ""
    )
      .trim()
      .toLowerCase();

    const message = String(
      formData.get("message") ?? ""
    ).trim();

    const leadData = {
      nombres_completos: fullName,
      telefono: phone,
      email,
      proyecto_interes: PROJECT_NAME,
      categoria_interes: "Lotes",
      fuente_prospeccion: "Web",
      mensaje:
        message ||
        `Solicitud de información sobre ${PROJECT_NAME}.`,
      origen_ruta: window.location.pathname,
      origen_componente:
        `TerrazasConcepcionOverviewSection - ${PROJECT_NAME}`,
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
        className={styles.overviewSection}
        id="informacion-terrazas-concepcion"
        aria-labelledby="terrazas-concepcion-overview-title"
      >
        <div className={styles.overviewInner}>
          <div className={styles.overviewContent}>
            <span className={styles.eyebrow}>
              Naturaleza, tranquilidad e
              inversión
            </span>

            <h2 id="terrazas-concepcion-overview-title">
              Construye tu futuro en Las
              Terrazas de Concepción
            </h2>

            <p className={styles.overviewDescription}>
              Un proyecto entregado con 57
              lotes de 90 m² a 174 m²,
              rodeado de naturaleza y con
              vistas privilegiadas al Valle
              de Concepción. Encuentra
              terrenos desde S/ 33,900 con
              financiamiento directo y
              facilidades de pago.
            </p>

            <div className={styles.overviewFacts}>
              {facts.map((item) => (
                <article
                  key={`${item.label}-${item.value}`}
                  className={styles.overviewFact}
                >
                  <span>
                    {item.label}
                  </span>

                  <strong>
                    {item.value}
                  </strong>
                </article>
              ))}
            </div>

            <ul className={styles.detailsList}>
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

            <div className={styles.overviewActions}>
              <a
                href={
                  brochureTerrazasConcepcion
                }
                download
                aria-label="Descargar brochure de Las Terrazas de Concepción"
              >
                <DownloadSimpleIcon
                  size={18}
                  weight="bold"
                  aria-hidden={true}
                />

                Descargar brochure
              </a>

              <Link href="/portal-de-transparencia/las-terrazas-de-concepcion">
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
            noValidate
          >
            <div className={styles.formHeader}>
              <span>
                Solicita información
              </span>

              <strong>
                {projectFormData.title}
              </strong>

              <p>
                {projectFormData.description}
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
                Acepto ser contactado por
                ANCOSUR para recibir
                información comercial sobre
                Las Terrazas de Concepción.
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