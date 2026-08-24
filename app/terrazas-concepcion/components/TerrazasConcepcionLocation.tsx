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
  locationTerrazasConcepcion,
  projectFormData,
  whatsappTerrazasConcepcion,
} from "../data";

import styles from "./TerrazasConcepcionLocation.module.css";
import WhatsAppLead from "@/components/WhatsAppLead/WhatsAppLead";

const PROJECT_NAME =
  projectFormData.projectName ||
  "Las Terrazas de Concepción";

const GOOGLE_MAPS_EMBED = `https://www.google.com/maps?q=${encodeURIComponent(
  locationTerrazasConcepcion.googleMapsQuery
)}&output=embed`;

const GOOGLE_MAPS_LINK = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  locationTerrazasConcepcion.googleMapsQuery
)}`;

const OFFICE_GOOGLE_MAPS_LINK = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  locationTerrazasConcepcion.officeGoogleMapsQuery
)}`;

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
          (result.data as { error?: unknown }).error ?? ""
        )
      : "";

  return (
    result?.message ||
    dataError ||
    `No se pudo enviar la solicitud. Código ${status}.`
  );
};

export default function TerrazasConcepcionLocation() {
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

  const interest =
    String(
      formData.get("interest") ?? ""
    ).trim();

  const consent =
    formData.get("consent") ===
    "accepted";

  const nameRegex =
    /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s.'’-]{3,80}$/;

  const phoneRegex =
    /^9\d{8}$/;

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

  if (!interest) {
    showToast({
      variant: "error",
      title: "Selecciona una opción",
      message:
        "Indica qué información te interesa.",
    });

    return;
  }

  if (!consent) {
    showToast({
      variant: "error",
      title: "Consentimiento requerido",
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
      "terrazas_concepcion_ubicacion",

    nombre_formulario:
      "Formulario ubicación Terrazas Concepción",

    tipo_formulario:
      "lotes",

    nombre:
      fullName,

    telefono:
      phone,

    email:
      "",

    dni:
      "",

    mensaje:
      `Solicitud de información sobre ${PROJECT_NAME}. Interés: ${interest}. Enviada desde la sección de ubicación.`,

    proyecto:
      PROJECT_NAME,

    tipo_inmueble:
      "Lote",

    interes:
      interest,

    horario_visita:
      "",

    campania:
      "WEB Terrazas Concepcion",

    anuncio:
      "Formulario Ubicacion",

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

    const response =
      await fetch(
        "https://ancosur-api-production.up.railway.app/api/formularios",
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
       VALIDAR GUARDADO LOCAL
    ================================= */

    if (
      !response.ok ||
      result.success !== true ||
      result.data?.guardado_local !== true
    ) {
      console.error(
        "Error guardando Terrazas Concepción Ubicación:",
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
      result.data?.crm?.success === true;

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
      "TERRAZAS CONCEPCIÓN UBICACIÓN PROCESADO:",
      {
        idLocal:
          result.data?.id,

        nombre:
          fullName,

        telefono:
          phone,

        interes:
          interest,

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
        "Terrazas Concepción Ubicación",

      form_code:
        formularioData.codigo_formulario,

      form_type:
        formularioData.tipo_formulario,

      lead_type:
        "Lotes",

      project:
        PROJECT_NAME,

      interest:
        interest,

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

    form.reset();

    showToast({
      ...SUCCESS_TOAST,

      message:
        "Tus datos fueron registrados correctamente.",
    });
  } catch (error) {
    console.error(
      "Error enviando formulario de Terrazas Concepción Ubicación:",
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
        className={styles.section}
        id="ubicacion-terrazas-concepcion"
        aria-labelledby="terrazas-concepcion-location-title"
      >
        <div className={styles.header}>
          <span>
            {locationTerrazasConcepcion.eyebrow}
          </span>

          <h2 id="terrazas-concepcion-location-title">
            {locationTerrazasConcepcion.title}
          </h2>

          <p>
            {locationTerrazasConcepcion.description}
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
                {
                  locationTerrazasConcepcion.altitude
                    .label
                }
              </span>

              <strong>
                {
                  locationTerrazasConcepcion.altitude
                    .value
                }
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
                {
                  locationTerrazasConcepcion.climate
                    .label
                }
              </span>

              <strong>
                {
                  locationTerrazasConcepcion.climate
                    .value
                }
              </strong>
            </div>
          </article>
        </div>

        <div className={styles.grid}>
          <article className={styles.mapCard}>
            <div className={styles.map}>
              <iframe
                src={GOOGLE_MAPS_EMBED}
                title="Ubicación de Las Terrazas de Concepción"
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
                      locationTerrazasConcepcion.projectAddress
                    }
                  </strong>

                  <p>
                    {
                      locationTerrazasConcepcion.projectReference
                    }
                  </p>
                </div>
              </div>

              <a
                href={GOOGLE_MAPS_LINK}
                target="_blank"
                rel="noreferrer"
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

          <aside
            className={styles.contactCard}
            id="informacion-terrazas-concepcion"
          >
            <div className={styles.formHeader}>
              <span>
                Solicita información
              </span>

              <h3>
                {projectFormData.title}
              </h3>

              <p>
                {projectFormData.description}
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
                ¿Qué información necesitas?

                <select
                  name="interest"
                  defaultValue=""
                  disabled={isSending}
                  required
                >
                  <option value="" disabled>
                    Selecciona una opción
                  </option>

                  {projectFormData.interestOptions.map(
                    (option) => (
                      <option
                        key={option.value}
                        value={option.value}
                      >
                        {option.label}
                      </option>
                    )
                  )}
                </select>
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

           <WhatsAppLead
              className={styles.whatsappButton}
              project="Las Terrazas de Concepción"
              source="Las Terrazas de Concepción"
              sourceId={4}
              campaign="WEB Terrazas de Concepción"
              ad="Botón WhatsApp Terrazas de Concepción"
              formCode="terrazas_concepcion_whatsapp"
              formName="WhatsApp - Las Terrazas de Concepción"
              formType="lotes"
              defaultInterest="Lote"
            >
              <WhatsappLogoIcon
                size={20}
                weight="fill"
                aria-hidden={true}
              />

              <span>
                Escribir por WhatsApp
              </span>
            </WhatsAppLead>

            <div className={styles.officeInformation}>
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
                      locationTerrazasConcepcion.officeAddress
                    }
                  </strong>

                  <a
                    href={OFFICE_GOOGLE_MAPS_LINK}
                    target="_blank"
                    rel="noreferrer"
                    className={styles.officeLink}
                  >
                    Ver ubicación

                    <ArrowRightIcon
                      size={14}
                      weight="bold"
                      aria-hidden={true}
                    />
                  </a>
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
                      locationTerrazasConcepcion.schedule
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