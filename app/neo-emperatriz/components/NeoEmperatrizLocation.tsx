"use client";

import {
  ArrowRightIcon,
  ClockIcon,
  MapPinIcon,
  WhatsappLogoIcon,
} from "@phosphor-icons/react";
import {
  useCallback,
  useRef,
  useState,
} from "react";
import type { FormEvent } from "react";

import FeedbackToast, {
  type FeedbackToastData,
} from "@/components/ui/FeedbackToast/FeedbackToast";

import {
  locationNeoEmperatriz,
  whatsappNeoEmperatriz,
} from "../data";

import styles from "./NeoEmperatrizLocation.module.css";
import WhatsAppLead from "@/components/WhatsAppLead/WhatsAppLead";

/* =========================================================
   CONFIGURACIÓN
========================================================= */

const SOURCE_ID = 4 as const;
const CAMPAIGN_CODE = "Neo Emperatriz";
const AD_NAME = "Web";
const LEAD_TYPE = "WEB Ancosur";
const COMPONENT_NAME = "NeoEmperatrizLocation";
const REQUEST_TIMEOUT = 20_000;

const GOOGLE_MAPS_EMBED =
  `https://maps.google.com/maps?q=${encodeURIComponent(
    locationNeoEmperatriz.googleMapsQuery
  )}&t=m&z=18&ie=UTF8&iwloc=near&output=embed`;

const GOOGLE_MAPS_LINK =
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    locationNeoEmperatriz.googleMapsQuery
  )}`;

/* =========================================================
   TIPOS
========================================================= */

type ToastState = FeedbackToastData & {
  id: number;
};

type JsonObject = Record<string, unknown>;

type ApiResponse = {
  success?: boolean;
  accion?: string;
  id?: number;
  code?: string;
  message?: string;
  error?: string;
  data?: unknown;
  response?: unknown;
  errors?: unknown;
  [key: string]: unknown;
};

/* =========================================================
   MENSAJES
========================================================= */

const SUCCESS_TOAST: FeedbackToastData = {
  variant: "success",
  title: "¡Solicitud enviada correctamente!",
  message:
    "Gracias por tu interés en Neo Emperatriz. Un asesor de Ancosur se comunicará contigo muy pronto para brindarte información sobre los últimos departamentos disponibles, precios y formas de pago.",
};

const ERROR_TOAST: FeedbackToastData = {
  variant: "error",
  title: "No pudimos enviar tus datos",
  message:
    "Verifica tu conexión e inténtalo nuevamente.",
};

/* =========================================================
   UTILIDADES DE RESPUESTA
========================================================= */

const isJsonObject = (
  value: unknown
): value is JsonObject => {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value)
  );
};

const readApiResponse = async (
  response: Response
): Promise<ApiResponse> => {
  const responseText =
    await response.text();

  if (!responseText.trim()) {
    return {
      success: response.ok,
      message: response.ok
        ? "Solicitud procesada correctamente."
        : `El servidor respondió con el código ${response.status}.`,
    };
  }

  try {
    const parsed: unknown =
      JSON.parse(responseText);

    if (isJsonObject(parsed)) {
      return parsed as ApiResponse;
    }

    return {
      success: response.ok,
      data: parsed,
    };
  } catch {
    return {
      success: response.ok,
      message: responseText,
    };
  }
};

const hasApiFailure = (
  value: unknown
): boolean => {
  if (!isJsonObject(value)) {
    return false;
  }

  if (value.success === false) {
    return true;
  }

  return (
    hasApiFailure(value.data) ||
    hasApiFailure(value.response)
  );
};

const extractApiMessage = (
  value: unknown
): string => {
  if (typeof value === "string") {
    return value.trim();
  }

  if (!isJsonObject(value)) {
    return "";
  }

  if (
    typeof value.error === "string" &&
    value.error.trim()
  ) {
    return value.error.trim();
  }

  const dataMessage =
    extractApiMessage(value.data);

  if (dataMessage) {
    return dataMessage;
  }

  const responseMessage =
    extractApiMessage(value.response);

  if (responseMessage) {
    return responseMessage;
  }

  if (
    typeof value.message === "string" &&
    value.message.trim()
  ) {
    return value.message.trim();
  }

  return "";
};

const extractApiCode = (
  value: unknown
): string => {
  if (!isJsonObject(value)) {
    return "";
  }

  if (
    typeof value.code === "string" &&
    value.code.trim()
  ) {
    return value.code.trim();
  }

  return (
    extractApiCode(value.data) ||
    extractApiCode(value.response)
  );
};

const isCampaignLengthError = (
  message: string
): boolean => {
  const normalized =
    message.toLowerCase();

  return (
    normalized.includes(
      "sqlstate[22001]"
    ) ||
    normalized.includes(
      "data too long for column 'campaña'"
    ) ||
    normalized.includes(
      'data too long for column "campaña"'
    ) ||
    (
      normalized.includes("1406") &&
      normalized.includes("campaña")
    )
  );
};

const getFriendlyServerError = (
  status: number,
  result: ApiResponse
): {
  title: string;
  message: string;
} => {
  const serverMessage =
    extractApiMessage(result);

  const serverCode =
    extractApiCode(result);

  if (
    serverCode ===
      "CAMPAIGN_HISTORY_TOO_LONG" ||
    isCampaignLengthError(
      serverMessage
    )
  ) {
    return {
      title:
        "El CRM no pudo actualizar el contacto",
      message:
        "Este contacto tiene un historial de campañas demasiado extenso. Solicita al administrador del CRM que revise el contacto.",
    };
  }

  if (serverCode === "VALIDATION_ERROR") {
    return {
      title: "Revisa los datos ingresados",
      message:
        serverMessage ||
        "Uno o más campos tienen un formato incorrecto.",
    };
  }

  if (status === 400) {
    return {
      title: "Datos no válidos",
      message:
        serverMessage ||
        "Revisa el nombre, celular, correo electrónico y número de documento.",
    };
  }

  if (status === 401 || status === 403) {
    return {
      title: "API no autorizada",
      message:
        "El servidor no tiene autorización para registrar el lead.",
    };
  }

  if (status === 404) {
    return {
      title: "Ruta de leads no encontrada",
      message:
        "No se encontró la ruta /api/leads.",
    };
  }

  if (
    status === 408 ||
    status === 504
  ) {
    return {
      title: "El servidor tardó demasiado",
      message:
        "La solicitud superó el tiempo máximo permitido.",
    };
  }

  if (status === 413) {
    return {
      title: "Información demasiado extensa",
      message:
        "La información enviada supera el tamaño permitido.",
    };
  }

  if (status === 415) {
    return {
      title: "Formato no permitido",
      message:
        "El servidor requiere que la solicitud se envíe como JSON.",
    };
  }

  if (status === 422) {
    return {
      title:
        "No se pudieron procesar los datos",
      message:
        serverMessage ||
        "El servidor rechazó uno o más campos.",
    };
  }

  if (status === 429) {
    return {
      title: "Demasiadas solicitudes",
      message:
        "Espera unos minutos antes de volver a enviar el formulario.",
    };
  }

  if (status >= 500) {
    return {
      title: "Error del servidor",
      message:
        serverMessage ||
        "El servidor de leads no pudo procesar la solicitud.",
    };
  }

  return {
    title: "No pudimos enviar tus datos",
    message:
      serverMessage ||
      result.message ||
      `La solicitud no pudo procesarse. Código ${status}.`,
  };
};

/* =========================================================
   COMPONENTE
========================================================= */

export default function NeoEmperatrizLocation() {
  const [isSending, setIsSending] =
    useState(false);

  const submitLockRef =
    useRef(false);

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

  if (
    isSending ||
    submitLockRef.current
  ) {
    return;
  }

  submitLockRef.current = true;

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

    submitLockRef.current = false;
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

  const dni =
    String(
      formData.get("dni") ?? ""
    )
      .replace(/\D/g, "")
      .slice(0, 8);

  const message =
    String(
      formData.get("message") ?? ""
    ).trim();

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

  const dniRegex =
    /^\d{8}$/;

  if (!nameRegex.test(fullName)) {
    showToast({
      variant: "error",
      title: "Nombre no válido",
      message:
        "Ingresa tu nombre completo usando letras y espacios.",
    });

    submitLockRef.current = false;
    return;
  }

  if (!phoneRegex.test(phone)) {
    showToast({
      variant: "error",
      title: "Celular no válido",
      message:
        "El celular debe tener 9 dígitos y comenzar con 9.",
    });

    submitLockRef.current = false;
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
        "Ingresa un correo válido o deja el campo vacío.",
    });

    submitLockRef.current = false;
    return;
  }

  if (
    dni &&
    !dniRegex.test(dni)
  ) {
    showToast({
      variant: "error",
      title:
        "Número de documento no válido",
      message:
        "El número de documento debe contener exactamente 8 dígitos o dejarse vacío.",
    });

    submitLockRef.current = false;
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

    submitLockRef.current = false;
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

    submitLockRef.current = false;
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
      "neo_emperatriz_principal",

    nombre_formulario:
      "Formulario principal Neo Emperatriz",

    tipo_formulario:
      "departamentos",

    nombre:
      fullName,

    telefono:
      phone,

    email:
      email,

    dni:
      dni,

    mensaje:
      message,

    proyecto:
      "Neo Emperatriz",

    tipo_inmueble:
      "Departamento",

    interes:
      LEAD_TYPE,

    horario_visita:
      "",

    campania:
      CAMPAIGN_CODE,

    anuncio:
      AD_NAME,

    fuente_id:
      SOURCE_ID,

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
      REQUEST_TIMEOUT
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
          "Respuesta no JSON:",
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
      result.data?.guardado_local !==
        true
    ) {
      console.error(
        "Error guardando lead Neo Emperatriz:",
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
          "No fue posible guardar el formulario.",
      });

      return;
    }

    /* ================================
       ESTADO CRM
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
      null;

    const crmHttpStatus =
      result.data?.crm?.http_status ??
      null;

    console.log(
      "LEAD NEO EMPERATRIZ:",
      {
        idLocal:
          result.data?.id,

        nombre:
          fullName,

        telefono:
          phone,

        proyecto:
          "Neo Emperatriz",

        guardadoLocal:
          true,

        estadoCRM:
          crmStatus,

        enviadoCRM:
          crmSuccess,

        crmLeadId,

        crmHttpStatus,
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
        "Neo Emperatriz",

      form_code:
        formularioData.codigo_formulario,

      form_type:
        formularioData.tipo_formulario,

      lead_type:
        LEAD_TYPE,

      project:
        formularioData.proyecto,

      campaign:
        CAMPAIGN_CODE,

      source_id:
        SOURCE_ID,

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
       ÉXITO
    ================================= */

    form.reset();

    showToast({
      ...SUCCESS_TOAST,

      message:
        "Tus datos fueron registrados correctamente.",
    });
  } catch (error) {
    console.error(
      "Error enviando formulario de Neo Emperatriz:",
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

    submitLockRef.current =
      false;

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
          <span>
            Ubicación
          </span>

          <h2 id="neo-emperatriz-location-title">
            Tu nuevo hogar te espera en Neo Emperatriz
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

            <div className={styles.locationInfo}>
              <div className={styles.locationMain}>
                <div className={styles.locationIcon}>
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
          </div>

          <aside className={styles.contactCard}>
            <div className={styles.formHeader}>
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
                  pattern="[A-Za-zÁÉÍÓÚáéíóúÑñÜü.'’ -]{3,80}"
                  title="Ingresa tu nombre usando letras y espacios."
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
                  onInput={(event) => {
                    event.currentTarget.value =
                      event.currentTarget.value
                        .replace(/\D/g, "")
                        .slice(0, 9);
                  }}
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
                  title="Ingresa un correo válido o deja el campo vacío."
                  disabled={isSending}
                />
              </label>

              <label>
                Número de documento opcional

                <input
                  type="text"
                  name="dni"
                  placeholder="12345678"
                  autoComplete="off"
                  inputMode="numeric"
                  pattern="[0-9]{8}"
                  minLength={8}
                  maxLength={8}
                  title="Ingresa un número de documento de 8 dígitos o deja el campo vacío."
                  disabled={isSending}
                  onInput={(event) => {
                    event.currentTarget.value =
                      event.currentTarget.value
                        .replace(/\D/g, "")
                        .slice(0, 8);
                  }}
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
                  defaultChecked
                  disabled={isSending}
                  required
                />

                <span>
                  Acepto ser contactado por
                  Ancosur para recibir
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

            <div className={styles.divider}>
              <span>
                o comunícate directamente
              </span>
            </div>

          <WhatsAppLead
              className={styles.whatsappButton}
              project="Neo Emperatriz"
              source="Neo Emperatriz"
              sourceId={4}
              campaign="WEB Neo Emperatriz"
              ad="Botón WhatsApp Neo Emperatriz"
              formCode="neo_emperatriz_whatsapp"
              formName="WhatsApp - Neo Emperatriz"
              formType="departamentos"
              defaultInterest="Departamento"
            >
              <WhatsappLogoIcon
                size={20}
                weight="fill"
                aria-hidden={true}
              />

              <span>
                Agendar visita
              </span>
            </WhatsAppLead>

            <div className={styles.schedule}>
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
        variant={toast?.variant ?? "info"}
        title={toast?.title ?? ""}
        message={toast?.message ?? ""}
        onClose={closeToast}
      />
    </>
  );
}