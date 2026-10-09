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
import { ProyectosWebAPI } from "@/data/proyectosWeb";
import type { ProyectoWeb } from "@/src/types/proyectoWeb";

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

type InterestType = "Departamento" | "Lote";

type FormData = {
  fullName: string;
  phone: string;
  dni: string;
  interestType: InterestType | "";
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

/* =========================================================
   CONFIGURACIÓN
========================================================= */

const popupConfig = {
  enabled: true,
  showDelay: 1200,
  showOncePerSession: false,
};

/* =========================================================
   CAMPAÑA
========================================================= */

const campaigns: PopupCampaign[] = [
  {
    id: "formulario-aterrador",

    title:
      "Que el alquiler no te siga dando miedo",

    eyebrow:
      "",

    description:
      "Déjanos tus datos y descubre los departamentos y lotes que pueden convertirse en tu próximo hogar.",

    image:
      "/assets/campanias/depaween.webp",

    imageAlt:
      "Campaña Depaween Ancosur - Que el alquiler no te siga dando miedo",

    imageWidth: 1080,

    imageHeight: 1080,
  },
];

/* =========================================================
   TIPOS DE INTERÉS
========================================================= */

const interestOptions: {
  value: InterestType;
  label: string;
  icon: string;
}[] = [
  { value: "Departamento", label: "Departamentos", icon: "🏢" },
  { value: "Lote", label: "Lotes", icon: "🌳" },
];

/* Solo proyectos activos con unidades en venta */
const isProjectAvailable = (project: ProyectoWeb) =>
  project.activo &&
  project.estado !== "vendido" &&
  !/FINALIZADO|ENTREGADO|VENDIDOS/i.test(
    project.etapa ?? ""
  );

/* =========================================================
   FORMULARIO INICIAL
========================================================= */

const initialFormData: FormData = {
  fullName: "",
  phone: "",
  dni: "",
  interestType: "",
  project: "",
  message: "",
  consent: true,
};

/* =========================================================
   TOASTS
========================================================= */

const SUCCESS_TOAST: FeedbackToastData = {
  variant: "success",

  title:
    "¡Datos enviados correctamente!",

  message:
    "Un asesor de Ancosur se comunicará contigo pronto.",
};

const ERROR_TOAST: FeedbackToastData = {
  variant: "error",

  title:
    "No pudimos enviar tus datos",

  message:
    "Verifica tu conexión e inténtalo nuevamente.",
};

/* =========================================================
   COMPONENTE
========================================================= */

export default function PromoLeadPopup() {
  const [isVisible, setIsVisible] =
    useState(false);

  const [
    activeCampaignId,
    setActiveCampaignId,
  ] = useState(campaigns[0].id);

  const [formData, setFormData] =
    useState<FormData>(
      initialFormData
    );

  const [errors, setErrors] =
    useState<FormErrors>({});

  const [isSending, setIsSending] =
    useState(false);

  const [toast, setToast] =
    useState<ToastState | null>(null);

  const [projects, setProjects] =
    useState<ProyectoWeb[]>([]);

  const [loadingProjects, setLoadingProjects] =
    useState(true);

  /* =======================================================
     PROYECTOS ACTIVOS
  ======================================================= */

  useEffect(() => {
    let cancelled = false;

    ProyectosWebAPI.listarActivos({ limit: 100, page: 1 })
      .then((response) => {
        if (cancelled) return;

        setProjects(
          response.data
            .filter(isProjectAvailable)
            .sort(
              (a, b) =>
                Number(a.orden ?? 0) -
                Number(b.orden ?? 0)
            )
        );
      })
      .catch((error) => {
        console.error(
          "No se pudieron cargar los proyectos del popup:",
          error
        );
      })
      .finally(() => {
        if (!cancelled) setLoadingProjects(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const projectsByType = useMemo(() => {
    if (!formData.interestType) return [];

    return projects.filter(
      (project) =>
        project.tipo === formData.interestType
    );
  }, [projects, formData.interestType]);

  const selectInterestType = (
    interestType: InterestType
  ) => {
    setFormData((previous) => ({
      ...previous,
      interestType,
      project:
        previous.interestType === interestType
          ? previous.project
          : "",
    }));

    setErrors((previous) => ({
      ...previous,
      interestType: undefined,
      project: undefined,
    }));
  };

  /* =======================================================
     CAMPAÑA ACTIVA
  ======================================================= */

  const activeCampaign = useMemo(() => {
    return (
      campaigns.find(
        (campaign) =>
          campaign.id ===
          activeCampaignId
      ) ?? campaigns[0]
    );
  }, [activeCampaignId]);

  /* =======================================================
     TOAST
  ======================================================= */

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

  /* =======================================================
     SESSION STORAGE
  ======================================================= */

  const registerPopupAsClosed = () => {
    if (
      popupConfig.showOncePerSession
    ) {
      sessionStorage.setItem(
        "popup-ancosur-formulario-aterrador",
        "closed"
      );
    }
  };

  /* =======================================================
     CERRAR POPUP
  ======================================================= */

  const closePopup = () => {
    setIsVisible(false);
    setErrors({});
    registerPopupAsClosed();
  };

  /* =======================================================
     MOSTRAR POPUP
  ======================================================= */

  useEffect(() => {
    if (!popupConfig.enabled) {
      return;
    }

    const storageKey =
      "popup-ancosur-formulario-aterrador";

    if (
      popupConfig.showOncePerSession
    ) {
      const alreadyClosed =
        sessionStorage.getItem(
          storageKey
        );

      if (alreadyClosed) {
        return;
      }
    }

    /* Se abre tras la primera interacción (scroll, toque,
       tecla): un popup a pantalla completa al cargar se
       convierte en el LCP de Google y penaliza en móvil. */
    let timer = 0;

    const events = [
      "scroll",
      "pointerdown",
      "keydown",
      "touchstart",
    ] as const;

    const removeListeners = () => {
      events.forEach((name) =>
        window.removeEventListener(
          name,
          handleInteraction
        )
      );
    };

    function handleInteraction() {
      removeListeners();

      timer = window.setTimeout(() => {
        setIsVisible(true);
      }, popupConfig.showDelay);
    }

    events.forEach((name) =>
      window.addEventListener(
        name,
        handleInteraction,
        { passive: true }
      )
    );

    return () => {
      removeListeners();
      window.clearTimeout(timer);
    };
  }, []);

  /* =======================================================
     BLOQUEAR SCROLL + ESC
  ======================================================= */

  useEffect(() => {
    if (!isVisible) {
      return;
    }

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

  /* =======================================================
     CAMBIAR CAMPAÑA
  ======================================================= */

  const changeCampaign = (
    campaignId: string
  ) => {
    setActiveCampaignId(campaignId);
    setErrors({});
  };

  /* =======================================================
     VALIDACIÓN
  ======================================================= */

  const validateForm = () => {
    const newErrors: FormErrors = {};

    const fullName =
      formData.fullName
        .replace(/\s+/g, " ")
        .trim();

    const phone =
      formData.phone
        .replace(/\D/g, "")
        .slice(0, 9);

    const dni =
      formData.dni
        .replace(/\D/g, "")
        .slice(0, 8);

    const project =
      formData.project.trim();

    const message =
      formData.message.trim();

    const nameRegex =
      /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s.'’-]{3,80}$/;

    const phoneRegex =
      /^9\d{8}$/;

    const dniRegex =
      /^\d{8}$/;

    /* NOMBRE */

    if (!fullName) {
      newErrors.fullName =
        "Ingresa tu nombre completo.";
    } else if (
      !nameRegex.test(fullName)
    ) {
      newErrors.fullName =
        "Ingresa un nombre válido.";
    }

    /* CELULAR */

    if (!phone) {
      newErrors.phone =
        "Ingresa tu número de celular.";
    } else if (
      !phoneRegex.test(phone)
    ) {
      newErrors.phone =
        "El celular debe tener 9 dígitos y empezar con 9.";
    }

    /* DNI OPCIONAL */

    if (
      dni &&
      !dniRegex.test(dni)
    ) {
      newErrors.dni =
        "El DNI debe tener exactamente 8 dígitos.";
    }

    /* PROYECTO */

    if (!formData.interestType) {
      newErrors.interestType =
        "Elige si te interesan departamentos o lotes.";
    } else if (!project) {
      newErrors.project =
        "Selecciona el proyecto de tu interés.";
    }

    /* MENSAJE */

    if (message.length > 250) {
      newErrors.message =
        "El mensaje no debe superar los 250 caracteres.";
    }

    /* CONSENTIMIENTO */

    if (!formData.consent) {
      newErrors.consent =
        "Debes aceptar ser contactado.";
    }

    setErrors(newErrors);

    return (
      Object.keys(newErrors).length ===
      0
    );
  };

  /* =======================================================
     ENVIAR FORMULARIO
  ======================================================= */

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (isSending) {
      return;
    }

    /* VALIDAR */

    const isValid =
      validateForm();

    if (!isValid) {
      console.warn(
        "Formulario detenido por validación:",
        formData
      );

      return;
    }

    /* =====================================================
       DATOS LIMPIOS
    ===================================================== */

    const fullName =
      formData.fullName
        .replace(/\s+/g, " ")
        .trim();

    const phone =
      formData.phone
        .replace(/\D/g, "")
        .slice(0, 9);

    const dni =
      formData.dni
        .replace(/\D/g, "")
        .slice(0, 8);

    const project =
      formData.project.trim();

    const interestType =
      formData.interestType;

    const message =
      formData.message.trim();

    /* =====================================================
       UTM
    ===================================================== */

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

    /* =====================================================
       PAYLOAD
    ===================================================== */

    const formularioData = {
      codigo_formulario:
        "Formulario Aterrador",

      nombre_formulario:
        "Formulario Aterrador",

      tipo_formulario:
        "promocion",

      nombre:
        fullName,

      telefono:
        phone,

      email:
        "",

      dni:
        dni,

      mensaje:
        message ||
        "Cliente interesado en la campaña.",

      proyecto:
        project,

      tipo_inmueble:
        interestType,

      interes:
        `${interestType} - ${project}`,

      horario_visita:
        "",

      campania:
        "Formulario Aterrador",

      anuncio:
        "Formulario Aterrador - Popup web Ancosur",

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

    /* =====================================================
       API
    ===================================================== */

    const API_URL = (
      process.env
        .NEXT_PUBLIC_API_URL ||
      "https://ancosur-api-production.up.railway.app"
    ).replace(/\/+$/, "");

    const endpoint =
      `${API_URL}/api/formularios`;

    const controller =
      new AbortController();

    const timeoutId =
      window.setTimeout(() => {
        controller.abort();
      }, 20_000);

    try {
      setIsSending(true);
      setErrors({});
      setToast(null);

      console.log(
        "ENVIANDO A:",
        endpoint
      );

      console.log(
        "PAYLOAD:",
        formularioData
      );

      const response =
        await fetch(endpoint, {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",

            Accept:
              "application/json",
          },

          body: JSON.stringify(
            formularioData
          ),

          cache: "no-store",

          signal:
            controller.signal,
        });

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
              "Respuesta inválida",

            message:
              `La API respondió HTTP ${response.status}.`,
          });

          return;
        }
      }

      console.log(
        "RESPUESTA API:",
        {
          status:
            response.status,

          ok:
            response.ok,

          result,
        }
      );

      /* ===================================================
         ERROR API
      =================================================== */

      if (
        !response.ok ||
        result?.success !== true
      ) {
        console.error(
          "API rechazó el formulario:",
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
            "No pudimos enviar tus datos",

          message:
            result?.message ||
            result?.error ||
            `Error HTTP ${response.status}`,
        });

        return;
      }

      /* ===================================================
         CRM
      =================================================== */

      const crmSuccess =
        result?.data?.crm
          ?.success === true;

      const crmStatus =
        result?.data
          ?.estado_crm ??
        result?.data?.crm
          ?.estado ??
        (
          crmSuccess
            ? "enviado"
            : "pendiente"
        );

      const crmLeadId =
        result?.data?.crm
          ?.lead_id ?? null;

      const crmHttpStatus =
        result?.data?.crm
          ?.http_status ?? null;

      /* ===================================================
         GTM
      =================================================== */

      window.dataLayer =
        window.dataLayer || [];

      window.dataLayer.push({
        event:
          "lead_form_submit",

        form_name:
          "Formulario Aterrador",

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
          result?.data?.id ??
          "",

        local_saved:
          result?.data
            ?.guardado_local ??
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

      /* ===================================================
         LIMPIAR
      =================================================== */

      setFormData(
        initialFormData
      );

      setErrors({});

      showToast({
        ...SUCCESS_TOAST,

        message:
          result?.message ||
          "Tus datos fueron registrados correctamente.",
      });

      setIsVisible(false);

      registerPopupAsClosed();

    } catch (error) {
      console.error(
        "ERROR POST FORMULARIO:",
        error
      );

      /* TIMEOUT */

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
            "La solicitud superó los 20 segundos.",
        });

        return;
      }

      /* ERROR GENERAL */

      showToast({
        ...ERROR_TOAST,

        title:
          "No pudimos conectar con el servidor",

        message:
          error instanceof Error
            ? error.message
            : "Comprueba tu conexión.",
      });

    } finally {
      window.clearTimeout(
        timeoutId
      );

      setIsSending(false);
    }
  };

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <>
      {isVisible && (
        <div
          className={styles.overlay}
          role="dialog"
          aria-modal="true"
          aria-labelledby="promo-popup-title"
        >
          {/* BACKDROP */}

          <button
            type="button"
            className={styles.backdrop}
            onClick={closePopup}
            aria-label="Cerrar campaña"
          />

          {/* POPUP */}

          <div className={styles.popup}>

            {/* DECORACIÓN HALLOWEEN */}

            <div
              className={styles.spooky}
              aria-hidden="true"
            >
              <span className={styles.bat1}>🦇</span>
              <span className={styles.bat2}>🦇</span>
              <span className={styles.bat3}>🦇</span>
              <span className={styles.ghost1}>👻</span>
              <span className={styles.ghost2}>👻</span>
              <span className={styles.web} />
            </div>

            {/* CERRAR */}

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

            {/* =================================================
                IMAGEN
            ================================================= */}

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
                key={
                  activeCampaign.id
                }
                src={
                  activeCampaign.image
                }
                alt={
                  activeCampaign.imageAlt
                }
                width={
                  activeCampaign.imageWidth
                }
                height={
                  activeCampaign.imageHeight
                }
                priority
                quality={85}
                className={
                  styles.popupImage
                }
                sizes="(max-width:900px) 100vw,52vw"
              />
            </div>

            {/* =================================================
                FORMULARIO
            ================================================= */}

            <div
              className={styles.formSide}
            >

              <span
                className={
                  styles.eyebrow
                }
              >
                🎃{" "}
                {activeCampaign.eyebrow ||
                  "Especial Halloween"}
              </span>

              <h2
                id="promo-popup-title"
              >
                {
                  activeCampaign.title
                }
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
                className={
                  styles.form
                }
                onSubmit={
                  handleSubmit
                }
                noValidate
              >

                {/* NOMBRE */}

                <div
                  className={
                    styles.field
                  }
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
                    disabled={
                      isSending
                    }
                    onChange={(
                      event
                    ) =>
                      setFormData(
                        (
                          previous
                        ) => ({
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
                      {
                        errors.fullName
                      }
                    </small>
                  )}
                </div>

                {/* CELULAR */}

                <div
                  className={
                    styles.field
                  }
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
                    value={
                      formData.phone
                    }
                    disabled={
                      isSending
                    }
                    onChange={(
                      event
                    ) =>
                      setFormData(
                        (
                          previous
                        ) => ({
                          ...previous,

                          phone:
                            event.target
                              .value
                              .replace(
                                /\D/g,
                                ""
                              )
                              .slice(
                                0,
                                9
                              ),
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
                      {
                        errors.phone
                      }
                    </small>
                  )}
                </div>

                {/* =================================================
                    DNI
                    Actualmente oculto
                ================================================= */}

                {/*
                <div
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
                              .slice(
                                0,
                                8
                              ),
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
                </div>
                */}

                {/* PROYECTO DE INTERÉS */}

                <div
                  className={
                    styles.field
                  }
                  role="group"
                  aria-labelledby="popup-interest-label"
                >
                  <span
                    id="popup-interest-label"
                    className={
                      styles.fieldLabel
                    }
                  >
                    Proyecto de interés
                  </span>

                  <div
                    className={
                      styles.typeTabs
                    }
                  >
                    {interestOptions.map(
                      (option) => (
                        <button
                          key={option.value}
                          type="button"
                          className={`${
                            styles.typeTab
                          } ${
                            formData.interestType ===
                            option.value
                              ? styles.typeTabActive
                              : ""
                          }`}
                          aria-pressed={
                            formData.interestType ===
                            option.value
                          }
                          disabled={
                            isSending
                          }
                          onClick={() =>
                            selectInterestType(
                              option.value
                            )
                          }
                        >
                          <span aria-hidden="true">
                            {option.icon}
                          </span>
                          {option.label}
                        </button>
                      )
                    )}
                  </div>

                  {errors.interestType && (
                    <small
                      className={
                        styles.error
                      }
                    >
                      {
                        errors.interestType
                      }
                    </small>
                  )}

                  {formData.interestType && (
                    <div
                      className={
                        styles.projectList
                      }
                      role="radiogroup"
                      aria-label="Proyectos disponibles"
                    >
                      {loadingProjects ? (
                        <span
                          className={
                            styles.projectHint
                          }
                        >
                          Invocando proyectos… 🦇
                        </span>
                      ) : projectsByType.length ===
                        0 ? (
                        <span
                          className={
                            styles.projectHint
                          }
                        >
                          No hay proyectos disponibles
                          en este momento.
                        </span>
                      ) : (
                        projectsByType.map(
                          (project) => (
                            <button
                              key={project.id}
                              type="button"
                              role="radio"
                              aria-checked={
                                formData.project ===
                                project.titulo
                              }
                              className={`${
                                styles.projectChip
                              } ${
                                formData.project ===
                                project.titulo
                                  ? styles.projectChipActive
                                  : ""
                              }`}
                              disabled={
                                isSending
                              }
                              onClick={() => {
                                setFormData(
                                  (
                                    previous
                                  ) => ({
                                    ...previous,
                                    project:
                                      project.titulo,
                                  })
                                );

                                setErrors(
                                  (
                                    previous
                                  ) => ({
                                    ...previous,
                                    project:
                                      undefined,
                                  })
                                );
                              }}
                            >
                              <strong>
                                {project.titulo}
                              </strong>
                              <small>
                                {project.ciudad}
                                {project.etapa
                                  ? ` · ${project.etapa}`
                                  : ""}
                              </small>
                            </button>
                          )
                        )
                      )}
                    </div>
                  )}

                  {errors.project && (
                    <small
                      className={
                        styles.error
                      }
                    >
                      {
                        errors.project
                      }
                    </small>
                  )}
                </div>

                {/* MENSAJE */}

                <div
                  className={
                    styles.field
                  }
                >
                  <label htmlFor="popup-message">
                    Mensaje opcional
                  </label>

                  <textarea
                    id="popup-message"
                    name="message"
                    rows={3}
                    maxLength={250}
                    placeholder="¿Alguna duda o comentario?"
                    value={
                      formData.message
                    }
                    disabled={
                      isSending
                    }
                    onChange={(
                      event
                    ) =>
                      setFormData(
                        (
                          previous
                        ) => ({
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
                      {
                        errors.message
                      }
                    </small>
                  )}
                </div>

                {/* CONSENTIMIENTO */}

                <label
                  className={
                    styles.checkbox
                  }
                >
                  <input
                    type="checkbox"
                    checked={
                      formData.consent
                    }
                    disabled={
                      isSending
                    }
                    onChange={(
                      event
                    ) =>
                      setFormData(
                        (
                          previous
                        ) => ({
                          ...previous,

                          consent:
                            event.target
                              .checked,
                        })
                      )
                    }
                  />

                  <span
                    className={
                      styles.termsText
                    }
                  >
                    Acepto los{" "}
                    <Link
                      href="/politicas/politica-de-privacidad"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={
                        styles.termsLink
                      }
                    >
                      términos y la
                      política de
                      privacidad
                    </Link>{" "}
                    y autorizo ser
                    contactado por
                    Ancosur para recibir
                    información comercial.
                  </span>
                </label>

                {errors.consent && (
                  <small
                    className={
                      styles.error
                    }
                  >
                    {
                      errors.consent
                    }
                  </small>
                )}

                {/* BOTÓN */}

                <button
                  type="submit"
                  className={
                    styles.submitButton
                  }
                  disabled={
                    isSending
                  }
                  aria-busy={
                    isSending
                  }
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

      {/* =====================================================
          TOAST
      ===================================================== */}

      <FeedbackToast
        key={toast?.id}
        open={
          toast !== null
        }
        variant={
          toast?.variant ??
          "info"
        }
        title={
          toast?.title ?? ""
        }
        message={
          toast?.message ?? ""
        }
        onClose={
          closeToast
        }
      />
    </>
  );
}