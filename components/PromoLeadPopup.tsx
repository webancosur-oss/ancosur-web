"use client";

import { XIcon } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { FormEvent } from "react";

import FeedbackToast, {
  type FeedbackToastData,
} from "@/components/ui/FeedbackToast/FeedbackToast";

import styles from "./PromoLeadPopup.module.css";

type PopupCampaign = {
  id: string;
  title: string;
  eyebrow: string;
  description: string;
  image: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
};

type FormData = {
  fullName: string;
  phone: string;
  email: string;
  dni: string;
  project: string;
  message: string;
  consent: boolean;
};

type FormErrors = Partial<
  Record<keyof FormData, string>
>;

type ToastState = FeedbackToastData & {
  id: number;
};

const popupConfig = {
  enabled: true,
  showDelay: 1200,
  showOncePerSession: false,
};

const campaigns: PopupCampaign[] = [
  {
    id: "Compra tu lote y ahorra",
    title: "Quiero participar",
    eyebrow: "Campaña exclusiva",
    description:
      "Déjanos tus datos para recibir mayor información.",
    image: "/assets/campanias/campania-camino-real.webp",
    imageAlt:
      "Campaña Ancosur - Elige un Beneficio (Plano o Notaria Gratis)",
    imageWidth: 1080,
    imageHeight: 1080,
  },
];

const initialFormData: FormData = {
  fullName: "",
  phone: "",
  email: "",
  dni: "",
  project: "",
  message: "",
  consent: true,
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

export default function PromoLeadPopup() {
  const [isVisible, setIsVisible] =
    useState(false);

  const [
    activeCampaignId,
    setActiveCampaignId,
  ] = useState(campaigns[0].id);

  const [formData, setFormData] =
    useState<FormData>(initialFormData);

  const [errors, setErrors] =
    useState<FormErrors>({});

  const [isSending, setIsSending] =
    useState(false);

  const [toast, setToast] =
    useState<ToastState | null>(null);

  const activeCampaign = useMemo(() => {
    return (
      campaigns.find(
        (campaign) =>
          campaign.id === activeCampaignId
      ) ?? campaigns[0]
    );
  }, [activeCampaignId]);

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

  const registerPopupAsClosed = () => {
    if (
      popupConfig.showOncePerSession
    ) {
      sessionStorage.setItem(
        "popup-ancosur-campaigns",
        "closed"
      );
    }
  };

  const closePopup = () => {
    setIsVisible(false);
    setErrors({});
    registerPopupAsClosed();
  };

  useEffect(() => {
    if (!popupConfig.enabled) return;

    const storageKey =
      "popup-ancosur-campaigns";

    if (
      popupConfig.showOncePerSession
    ) {
      const alreadyClosed =
        sessionStorage.getItem(
          storageKey
        );

      if (alreadyClosed) return;
    }

    const timer = window.setTimeout(() => {
      setIsVisible(true);
    }, popupConfig.showDelay);

    return () => {
      window.clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow =
      "hidden";

    const handleKeyDown = (
      event: KeyboardEvent
    ) => {
      if (event.key === "Escape") {
        closePopup();
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      document.body.style.overflow =
        previousOverflow;

      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [isVisible]);

  const changeCampaign = (
    campaignId: string
  ) => {
    setActiveCampaignId(campaignId);
    setErrors({});
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};

    const nameRegex =
      /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]{3,60}$/;

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    const phoneClean =
      formData.phone.replace(/\D/g, "");

    if (!formData.fullName.trim()) {
      newErrors.fullName =
        "Ingresa tu nombre completo.";
    } else if (
      !nameRegex.test(
        formData.fullName.trim()
      )
    ) {
      newErrors.fullName =
        "Ingresa un nombre válido.";
    }

    if (!formData.phone.trim()) {
      newErrors.phone =
        "Ingresa tu número de celular.";
    } else if (
      !/^9\d{8}$/.test(phoneClean)
    ) {
      newErrors.phone =
        "El celular debe tener 9 dígitos y empezar con 9.";
    }

    if (!formData.email.trim()) {
      newErrors.email =
        "Ingresa tu correo electrónico.";
    } else if (
      !emailRegex.test(
        formData.email.trim()
      )
    ) {
      newErrors.email =
        "Ingresa un correo válido.";
    }

    const dniClean =
      formData.dni.replace(/\D/g, "");

    if (!formData.dni.trim()) {
      newErrors.dni =
        "Ingresa tu DNI.";
    } else if (!/^\d{8}$/.test(dniClean)) {
      newErrors.dni =
        "El DNI debe tener exactamente 8 dígitos.";
    }

    if (!formData.project) {
      newErrors.project =
        "Selecciona una opción de interés.";
    }

    if (
      formData.message.trim().length >
      250
    ) {
      newErrors.message =
        "El mensaje no debe superar los 250 caracteres.";
    }

    if (!formData.consent) {
      newErrors.consent =
        "Debes aceptar ser contactado.";
    }

    setErrors(newErrors);

    return (
      Object.keys(newErrors).length === 0
    );
  };

const handleSubmit = async (
  event: FormEvent<HTMLFormElement>
) => {
  event.preventDefault();

  if (isSending) {
    return;
  }

  /* =========================================
     VALIDAR FORMULARIO
  ========================================= */

  const isValid =
    validateForm();

  if (!isValid) {
    return;
  }

  /* =========================================
     LIMPIAR DATOS
  ========================================= */

  const fullName =
    formData.fullName
      .replace(/\s+/g, " ")
      .trim();

  const phone =
    formData.phone
      .replace(/\D/g, "")
      .slice(0, 9);

  const email =
    formData.email
      .trim()
      .toLowerCase();

  const dni =
    formData.dni
      ?.replace(/\D/g, "")
      .slice(0, 8) || "";

  const project =
    formData.project.trim();

  const cleanMessage =
    formData.message.trim();

  /* =========================================
     VALIDACIONES EXTRA
  ========================================= */

  if (
    !fullName ||
    fullName.length < 3
  ) {
    showToast({
      variant: "error",
      title: "Nombre no válido",
      message:
        "Ingresa tu nombre completo.",
    });

    return;
  }

  if (
    !/^9\d{8}$/.test(phone)
  ) {
    showToast({
      variant: "error",
      title: "Celular no válido",
      message:
        "Ingresa un celular peruano válido de 9 dígitos.",
    });

    return;
  }

  if (!project) {
    showToast({
      variant: "error",
      title: "Selecciona un proyecto",
      message:
        "Selecciona el proyecto de tu interés.",
    });

    return;
  }

  /* =========================================
     UTM
  ========================================= */

  const params =
    new URLSearchParams(
      window.location.search
    );

  const utmSource =
    params.get(
      "utm_source"
    ) ?? "";

  const utmMedium =
    params.get(
      "utm_medium"
    ) ?? "";

  const utmCampaign =
    params.get(
      "utm_campaign"
    ) ?? "";

  const utmContent =
    params.get(
      "utm_content"
    ) ?? "";

  const utmTerm =
    params.get(
      "utm_term"
    ) ?? "";

  /* =========================================
     PAYLOAD ANCOSUR
  ========================================= */

  const formularioData = {
    codigo_formulario:
      "popup_viaje_cusco_2026",

    nombre_formulario:
      "Popup Viaje Cusco 2026",

    tipo_formulario:
      "promocion",

    nombre:
      fullName,

    telefono:
      phone,

    email:
      email,

    dni:
      dni,

    mensaje:
      cleanMessage,

    proyecto:
      project,

    tipo_inmueble:
      "",

    interes:
      project,

    horario_visita:
      "",

    campania:
      "Campaña viaje a Cusco 2026",

    anuncio:
      "Popup web Ancosur",

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

  /* =========================================
     API URL

     En Railway:
     NEXT_PUBLIC_API_URL=
     https://ancosur-api-production.up.railway.app
  ========================================= */

  const API_URL =
    (
      process.env
        .NEXT_PUBLIC_API_URL ||
      "https://ancosur-api-production.up.railway.app"
    ).replace(/\/+$/, "");

  const endpoint =
    `${API_URL}/api/formularios`;

  /* =========================================
     TIMEOUT
  ========================================= */

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
    setErrors({});
    setToast(null);

    console.log(
      "Enviando formulario:",
      endpoint,
      formularioData
    );

    /* =========================================
       POST → API GO

       La API Go se encarga de:
       1. PostgreSQL
       2. CRM
    ========================================= */

    const response =
      await fetch(
        endpoint,
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

    /* =========================================
       LEER RESPUESTA
    ========================================= */

    const contentType =
      response.headers.get(
        "content-type"
      ) || "";

    let result: any = null;

    if (
      contentType.includes(
        "application/json"
      )
    ) {
      result =
        await response.json();
    } else {
      const text =
        await response.text();

      console.error(
        "La API respondió texto:",
        text
      );

      throw new Error(
        text ||
          `Respuesta HTTP ${response.status}`
      );
    }

    console.log(
      "Respuesta ANCOSUR API:",
      {
        status:
          response.status,

        ok:
          response.ok,

        result,
      }
    );

    /* =========================================
       ERROR HTTP
    ========================================= */

    if (!response.ok) {
      console.error(
        "HTTP ERROR:",
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
          result?.message ||
          result?.error ||
          `Error HTTP ${response.status}`,
      });

      return;
    }

    /* =========================================
       ERROR LÓGICO DE API
    ========================================= */

    if (
      result?.success !== true
    ) {
      console.error(
        "API ERROR:",
        result
      );

      showToast({
        variant: "error",

        title:
          "No pudimos registrar tus datos",

        message:
          result?.message ||
          result?.error ||
          "La API no confirmó el registro.",
      });

      return;
    }

    /* =========================================
       INFORMACIÓN LOCAL
    ========================================= */

    const localLeadId =
      result?.data?.id ??
      result?.data?.formulario_id ??
      result?.id ??
      "";

    /*
     * No bloqueamos el formulario únicamente
     * porque guardado_local no venga en la
     * respuesta.
     *
     * success:true + HTTP 2xx es suficiente
     * para considerar que nuestra API procesó
     * correctamente la solicitud.
     */

    const localSaved =
      result?.data
        ?.guardado_local === true ||
      Boolean(localLeadId);

    /* =========================================
       CRM
    ========================================= */

    const crmSuccess =
      result?.data
        ?.crm
        ?.success === true;

    const crmStatus =
      result?.data
        ?.estado_crm ??
      result?.data
        ?.crm
        ?.estado ??
      (
        crmSuccess
          ? "enviado"
          : "pendiente"
      );

    const crmLeadId =
      result?.data
        ?.crm
        ?.lead_id ??
      null;

    const crmHttpStatus =
      result?.data
        ?.crm
        ?.http_status ??
      null;

    const crmMessage =
      result?.data
        ?.crm
        ?.message ??
      "";

    /* =========================================
       LOG
    ========================================= */

    console.log(
      "POPUP CUSCO REGISTRADO:",
      {
        localLeadId,

        localSaved,

        nombre:
          fullName,

        telefono:
          phone,

        proyecto:
          project,

        crmSuccess,

        crmStatus,

        crmLeadId,

        crmHttpStatus,

        crmMessage,
      }
    );

    /* =========================================
       GTM

       SOLO DESPUÉS DEL POST EXITOSO
    ========================================= */

    window.dataLayer =
      window.dataLayer || [];

    window.dataLayer.push({
      event:
        "lead_form_submit",

      form_name:
        "Popup Viaje Cusco 2026",

      form_code:
        formularioData
          .codigo_formulario,

      form_type:
        formularioData
          .tipo_formulario,

      lead_type:
        "Promoción",

      project:
        project,

      campaign:
        formularioData
          .campania,

      source_id:
        formularioData
          .fuente_id,

      page_path:
        window.location.pathname,

      local_lead_id:
        localLeadId,

      local_saved:
        localSaved,

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

    /* =========================================
       LIMPIAR
    ========================================= */

    setFormData(
      initialFormData
    );

    setErrors({});

    /* =========================================
       MOSTRAR ÉXITO ANTES DE CERRAR
    ========================================= */

    showToast({
      ...SUCCESS_TOAST,

      message:
        result?.message ||
        "Tus datos fueron registrados correctamente. Nos pondremos en contacto contigo.",
    });

    /* =========================================
       CERRAR POPUP
    ========================================= */

    setIsVisible(false);

    registerPopupAsClosed();

  } catch (error) {
    console.error(
      "ERROR POST /api/formularios:",
      error
    );

    if (
      error instanceof Error &&
      error.name ===
        "AbortError"
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
        error instanceof Error
          ? error.message
          : "Comprueba tu conexión a Internet e inténtalo nuevamente.",
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
      {isVisible && (
        <div
          className={styles.overlay}
          role="dialog"
          aria-modal="true"
          aria-labelledby="promo-popup-title"
        >
          <button
            type="button"
            className={styles.backdrop}
            onClick={closePopup}
            aria-label="Cerrar campaña"
          />

          <div className={styles.popup}>
            <button
              type="button"
              className={
                styles.closeButton
              }
              onClick={closePopup}
              aria-label="Cerrar popup"
            >
              <XIcon
                size={21}
                weight="bold"
                aria-hidden={true}
              />
            </button>

            <div
              className={styles.imageSide}
            >
              {campaigns.length > 1 && (
                <div
                  className={
                    styles.campaignTabs
                  }
                >
                  {campaigns.map(
                    (campaign) => (
                      <button
                        key={campaign.id}
                        type="button"
                        className={`${
                          styles.campaignTab
                        } ${
                          activeCampaign.id ===
                          campaign.id
                            ? styles.activeTab
                            : ""
                        }`}
                        onClick={() =>
                          changeCampaign(
                            campaign.id
                          )
                        }
                      >
                        {campaign.eyebrow}
                      </button>
                    )
                  )}
                </div>
              )}

              <Image
                key={activeCampaign.id}
                src={activeCampaign.image}
                alt={activeCampaign.imageAlt}
                width={activeCampaign.imageWidth}
                height={activeCampaign.imageHeight}
                priority
                quality={100}
                className={styles.popupImage}
                sizes="(max-width:900px)100vw,52vw"
              />
            </div>

            <div
              className={styles.formSide}
            >
              <span
                className={styles.eyebrow}
              >
                {activeCampaign.eyebrow}
              </span>

              <h2 id="promo-popup-title">
                {activeCampaign.title}
              </h2>

              <p
                className={
                  styles.description
                }
              >
                {
                  activeCampaign.description
                }
              </p>

              <form
                className={styles.form}
                onSubmit={handleSubmit}
                noValidate
              >
                <div
                  className={styles.field}
                >
                  <label htmlFor="popup-full-name">
                    Nombre completo
                  </label>

                  <input
                    id="popup-full-name"
                    name="fullName"
                    type="text"
                    placeholder="Ej. Miguel Asto"
                    autoComplete="name"
                    value={
                      formData.fullName
                    }
                    disabled={isSending}
                    onChange={(event) =>
                      setFormData(
                        (previous) => ({
                          ...previous,
                          fullName:
                            event.target
                              .value,
                        })
                      )
                    }
                  />

                  {errors.fullName && (
                    <small
                      className={
                        styles.error
                      }
                    >
                      {errors.fullName}
                    </small>
                  )}
                </div>

                <div
                  className={styles.field}
                >
                  <label htmlFor="popup-phone">
                    Celular
                  </label>

                  <input
                    id="popup-phone"
                    name="phone"
                    type="tel"
                    inputMode="numeric"
                    autoComplete="tel"
                    maxLength={9}
                    placeholder="Ej. 987654321"
                    value={formData.phone}
                    disabled={isSending}
                    onChange={(event) =>
                      setFormData(
                        (previous) => ({
                          ...previous,
                          phone:
                            event.target.value
                              .replace(
                                /\D/g,
                                ""
                              )
                              .slice(0, 9),
                        })
                      )
                    }
                  />

                  {errors.phone && (
                    <small
                      className={
                        styles.error
                      }
                    >
                      {errors.phone}
                    </small>
                  )}
                </div>

                <div
                  className={styles.field}
                >
                  <label htmlFor="popup-email">
                    Correo electrónico
                  </label>

                  <input
                    id="popup-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="Ej. correo@gmail.com"
                    value={formData.email}
                    disabled={isSending}
                    onChange={(event) =>
                      setFormData(
                        (previous) => ({
                          ...previous,
                          email:
                            event.target
                              .value,
                        })
                      )
                    }
                  />

                  {errors.email && (
                    <small
                      className={
                        styles.error
                      }
                    >
                      {errors.email}
                    </small>
                  )}
                </div>

                {/* <div
                  className={styles.field}
                >
                  <label htmlFor="popup-dni">
                    DNI
                  </label>

                  <input
                    id="popup-dni"
                    name="dni"
                    type="text"
                    inputMode="numeric"
                    autoComplete="off"
                    maxLength={8}
                    placeholder="Ej. 12345678"
                    value={formData.dni}
                    disabled={isSending}
                    onChange={(event) =>
                      setFormData(
                        (previous) => ({
                          ...previous,
                          dni:
                            event.target.value
                              .replace(
                                /\D/g,
                                ""
                              )
                              .slice(0, 8),
                        })
                      )
                    }
                  />

                  {errors.dni && (
                    <small
                      className={
                        styles.error
                      }
                    >
                      {errors.dni}
                    </small>
                  )}
                </div> */}

                <div
                  className={styles.field}
                >
                  <label htmlFor="popup-project">
                    Estoy interesado en
                  </label>

                  <select
                    id="popup-project"
                    name="project"
                    value={formData.project}
                    disabled={isSending}
                    onChange={(event) =>
                      setFormData(
                        (previous) => ({
                          ...previous,
                          project:
                            event.target
                              .value,
                        })
                      )
                    }
                  >
                    <option value="">
                      Selecciona una opción
                    </option>

                    <option value="Departamentos">
                      Departamentos
                    </option>

                    <option value="Lotes">
                      Lotes
                    </option>
                    
                  </select>

                  {errors.project && (
                    <small
                      className={
                        styles.error
                      }
                    >
                      {errors.project}
                    </small>
                  )}
                </div>

                <div
                  className={styles.field}
                >
                  <label htmlFor="popup-message">
                    Mensaje opcional
                  </label>

                  <textarea
                    id="popup-message"
                    name="message"
                    rows={3}
                    maxLength={250}
                    placeholder="Cuéntanos qué proyecto te interesa"
                    value={
                      formData.message
                    }
                    disabled={isSending}
                    onChange={(event) =>
                      setFormData(
                        (previous) => ({
                          ...previous,
                          message:
                            event.target
                              .value,
                        })
                      )
                    }
                  />

                  <small
                    className={
                      styles.counter
                    }
                  >
                    {
                      formData.message
                        .length
                    }
                    /250 caracteres
                  </small>

                  {errors.message && (
                    <small
                      className={
                        styles.error
                      }
                    >
                      {errors.message}
                    </small>
                  )}
                </div>

                <label className={styles.checkbox}>
                  <input
                    type="checkbox"
                    checked={formData.consent}
                    disabled={isSending}
                    onChange={(event) =>
                      setFormData((previous) => ({
                        ...previous,
                        consent: event.target.checked,
                      }))
                    }
                  />
                  <span className={styles.termsText}>
                    Acepto los{" "}
                    <Link
                      href="/politicas/politica-de-privacidad"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.termsLink}
                    >
                      términos y la política de privacidad
                    </Link>{" "}
                    y autorizo ser contactado por Ancosur para recibir información comercial.
                  </span>
                </label>

                {errors.consent && (
                  <small
                    className={
                      styles.error
                    }
                  >
                    {errors.consent}
                  </small>
                )}

                <button
                  type="submit"
                  className={
                    styles.submitButton
                  }
                  disabled={isSending}
                  aria-busy={isSending}
                >
                  {isSending
                    ? "Enviando..."
                    : "Participar"}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

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