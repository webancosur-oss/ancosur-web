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
    "Un asesor de Ancosur se comunicará contigo pronto.",
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

  const formData =
    new FormData(form);

  const fullName = String(
    formData.get("fullName") ?? ""
  )
    .replace(/\s+/g, " ")
    .trim();

  const phone = String(
    formData.get("phone") ?? ""
  )
    .replace(/\D/g, "")
    .slice(0, 9);

  const email = String(
    formData.get("email") ?? ""
  )
    .trim()
    .toLowerCase();

  const message = String(
    formData.get("message") ?? ""
  ).trim();

  /* =========================================
     VALIDACIONES
  ========================================= */

  const nameRegex =
    /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s.'’-]{3,80}$/;

  const phoneRegex =
    /^9\d{8}$/;

  const emailRegex =
    /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  if (!nameRegex.test(fullName)) {
    showToast({
      variant: "error",
      title: "Nombre no válido",
      message:
        "Ingresa tu nombre completo usando letras y espacios.",
    });

    return;
  }

  if (!phoneRegex.test(phone)) {
    showToast({
      variant: "error",
      title: "Celular no válido",
      message:
        "El celular debe tener 9 dígitos y comenzar con 9.",
    });

    return;
  }

  if (
    email &&
    !emailRegex.test(email)
  ) {
    showToast({
      variant: "error",
      title: "Correo no válido",
      message:
        "Ingresa un correo electrónico válido o deja el campo vacío.",
    });

    return;
  }

  if (message.length > 250) {
    showToast({
      variant: "error",
      title: "Mensaje demasiado largo",
      message:
        "El mensaje no debe superar los 250 caracteres.",
    });

    return;
  }

  /* =========================================
     METADATA
  ========================================= */

  const clientMetadata = {
    proyecto:
      PROJECT_NAME,

    categoria:
      "Lotes",

    origenRuta:
      window.location.pathname,

    origenComponente:
      `TerrazasConcepcionOverviewSection - ${PROJECT_NAME}`,

    mensaje:
      message ||
      `Solicitud de información sobre ${PROJECT_NAME}.`,
  };

  /* =========================================
     PAYLOAD PARA /api/leads
  ========================================= */

  const leadData = {
    fuente_id: 4,

    telefono:
      phone,

    nombre:
      fullName,

    email,

    dni:
      "",

    campaña:
      "WEB Terrazas Concepcion",

    anuncio:
      "Formulario Overview",

    msj_client:
      JSON.stringify(
        clientMetadata
      ),

    comentario:
      message,
  };

  const controller =
    new AbortController();

  const timeoutId =
    window.setTimeout(
      () => {
        controller.abort();
      },
      20_000
    );

  try {
    setIsSending(true);
    setToast(null);

    const response =
      await fetch(
        "/api/leads",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",

            Accept:
              "application/json",
          },

          body:
            JSON.stringify(
              leadData
            ),

          cache:
            "no-store",

          signal:
            controller.signal,
        }
      );

    const result =
      await readApiResponse(
        response
      );

    const requestFailed =
      !response.ok ||
      result?.success === false;

    if (requestFailed) {
      console.error(
        "Error API Terrazas Concepción Overview:",
        {
          status:
            response.status,

          result,

          payload: {
            fuente_id:
              leadData.fuente_id,

            telefono:
              phone,

            nombre:
              fullName,

            email:
              email || "",

            campaña:
              leadData.campaña,

            anuncio:
              leadData.anuncio,

            msj_client:
              clientMetadata,
          },
        }
      );

      showToast({
        variant: "error",

        title:
          "No pudimos enviar tus datos",

        message:
          getApiErrorMessage(
            result,
            response.status
          ),
      });

      return;
    }

    /* =========================================
       GOOGLE TAG MANAGER
       SOLO SI EL LEAD FUE ACEPTADO
    ========================================= */

    window.dataLayer =
      window.dataLayer || [];

    window.dataLayer.push({
      event:
        "lead_form_submit",

      form_name:
        "Terrazas Concepción Overview",

      lead_type:
        "Lotes",

      campaign:
        "WEB Terrazas Concepcion",

      source_id:
        4,

      page_path:
        window.location.pathname,
    });

    /* =========================================
       LIMPIAR FORMULARIO
    ========================================= */

    form.reset();

    /* =========================================
       ÉXITO
    ========================================= */

    showToast({
      ...SUCCESS_TOAST,

      message:
        result?.message ||
        SUCCESS_TOAST.message,
    });

  } catch (error) {
    console.error(
      "Error enviando formulario de Terrazas Concepción Overview:",
      error
    );

    if (
      error instanceof Error &&
      error.name === "AbortError"
    ) {
      showToast({
        variant: "error",

        title:
          "El servidor tardó demasiado",

        message:
          "La solicitud superó los 20 segundos de espera. Inténtalo nuevamente.",
      });

      return;
    }

    showToast({
      ...ERROR_TOAST,

      title:
        "No pudimos conectar con el servidor",

      message:
        "Comprueba tu conexión a Internet e inténtalo nuevamente.",
    });

  } finally {
    window.clearTimeout(
      timeoutId
    );

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
                Ancosur para recibir
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