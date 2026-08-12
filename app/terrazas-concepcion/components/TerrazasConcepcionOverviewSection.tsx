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

  if (isSending) {
    return;
  }

  const form =
    event.currentTarget;

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

  const fullName =
    String(
      formData.get("fullName") ?? ""
    )
      .replace(/\s+/g, " ")
      .trim();

  const phone =
    String(
      formData.get("phone") ?? ""
    )
      .replace(/\D/g, "")
      .slice(0, 9);

  const email =
    String(
      formData.get("email") ?? ""
    )
      .trim()
      .toLowerCase();

  const message =
    String(
      formData.get("message") ?? ""
    )
      .trim()
      .slice(0, 250);

  const consent =
    formData.get("consent") ===
    "accepted";

  /* ================================
     VALIDACIONES
  ================================= */

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
      title:
        "Mensaje demasiado largo",
      message:
        "El mensaje no debe superar los 250 caracteres.",
    });

    return;
  }

  if (!consent) {
    showToast({
      variant: "error",
      title:
        "Consentimiento requerido",
      message:
        "Debes aceptar la autorización de contacto.",
    });

    return;
  }

  /* ================================
     UTM
  ================================= */

  const params =
    new URLSearchParams(
      window.location.search
    );

  const utmSource =
    params.get("utm_source") ?? "";

  const utmMedium =
    params.get("utm_medium") ?? "";

  const utmCampaign =
    params.get("utm_campaign") ?? "";

  const utmContent =
    params.get("utm_content") ?? "";

  const utmTerm =
    params.get("utm_term") ?? "";

  /* ================================
     PAYLOAD ANCOSUR API
  ================================= */

  const formularioData = {
    codigo_formulario:
      "terrazas_concepcion_overview",

    nombre_formulario:
      "Formulario Terrazas Concepción",

    tipo_formulario:
      "lotes",

    nombre:
      fullName,

    telefono:
      phone,

    email:
      email,

    dni:
      "",

    mensaje:
      message,

    proyecto:
      PROJECT_NAME,

    tipo_inmueble:
      "Lote",

    interes:
      PROJECT_NAME,

    horario_visita:
      "",

    campania:
      "WEB Terrazas Concepcion",

    anuncio:
      "Formulario Overview",

    fuente_id:
      4,

    ruta_pagina:
      window.location.pathname,

    url_pagina:
      window.location.href,

    pagina_referencia:
      document.referrer || "",

    utm_source:
      utmSource,

    utm_medium:
      utmMedium,

    utm_campaign:
      utmCampaign,

    utm_content:
      utmContent,

    utm_term:
      utmTerm,
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

    /* ================================
       API GO
    ================================= */

    const response =
      await fetch(
        "http://localhost:5000/api/formularios",
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
              formularioData
            ),

          cache:
            "no-store",

          signal:
            controller.signal,
        }
      );

    const raw =
      await response.text();

    let result: any = {};

    if (raw) {
      try {
        result =
          JSON.parse(raw);
      } catch {
        console.error(
          "Respuesta no JSON de ANCOSUR API:",
          raw
        );

        showToast({
          variant: "error",

          title:
            "Respuesta inválida del servidor",

          message:
            `La API respondió HTTP ${response.status}.`,
        });

        return;
      }
    }

    /* ================================
       VALIDAR GUARDADO EN POSTGRESQL
    ================================= */

    if (
      !response.ok ||
      result.success !== true ||
      result.data?.guardado_local !==
        true
    ) {
      console.error(
        "Error guardando Terrazas Concepción:",
        {
          status:
            response.status,

          result,

          payload:
            formularioData,
        }
      );

      showToast({
        variant: "error",

        title:
          "No pudimos registrar tus datos",

        message:
          result.message ||
          result.error ||
          "No fue posible registrar tus datos.",
      });

      return;
    }

    /* ================================
       RESULTADO CRM
    ================================= */

    const crmSuccess =
      result.data?.crm?.success ===
      true;

    const crmStatus =
      result.data?.estado_crm ??
      result.data?.crm?.estado ??
      "pendiente";

    const crmLeadId =
      result.data?.crm?.lead_id ??
      result.data?.crm_lead_id ??
      null;

    const crmHttpStatus =
      result.data?.crm?.http_status ??
      null;

    const crmMessage =
      result.data?.crm?.message ??
      "";

    console.log(
      "TERRAZAS CONCEPCIÓN PROCESADO:",
      {
        idLocal:
          result.data?.id,

        nombre:
          fullName,

        telefono:
          phone,

        proyecto:
          PROJECT_NAME,

        guardadoLocal:
          true,

        estadoCRM:
          crmStatus,

        enviadoCRM:
          crmSuccess,

        crmLeadId,

        crmHttpStatus,

        crmMessage,
      }
    );

    /* ================================
       GOOGLE TAG MANAGER
    ================================= */

    window.dataLayer =
      window.dataLayer || [];

    window.dataLayer.push({
      event:
        "lead_form_submit",

      form_name:
        "Terrazas Concepción Overview",

      form_code:
        formularioData.codigo_formulario,

      form_type:
        formularioData.tipo_formulario,

      lead_type:
        "Lotes",

      project:
        PROJECT_NAME,

      campaign:
        formularioData.campania,

      source_id:
        formularioData.fuente_id,

      page_path:
        window.location.pathname,

      local_lead_id:
        result.data?.id ?? "",

      local_saved:
        true,

      crm_sent:
        crmSuccess,

      crm_status:
        crmStatus,

      crm_lead_id:
        crmLeadId ?? "",

      crm_http_status:
        crmHttpStatus ?? "",

      utm_source:
        utmSource,

      utm_medium:
        utmMedium,

      utm_campaign:
        utmCampaign,

      utm_content:
        utmContent,

      utm_term:
        utmTerm,
    });

    /* ================================
       LIMPIAR
    ================================= */

    form.reset();

    /* ================================
       ÉXITO
    ================================= */

    showToast({
      ...SUCCESS_TOAST,

      message:
        "Tus datos fueron registrados correctamente.",
    });
  } catch (error) {
    console.error(
      "Error enviando formulario de Terrazas Concepción:",
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
          "La solicitud superó el tiempo de espera. Inténtalo nuevamente.",
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