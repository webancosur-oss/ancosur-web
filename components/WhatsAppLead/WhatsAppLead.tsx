"use client";

import {
  ArrowLeft,
  ArrowRight,
  Check,
  WhatsappLogo,
  X,
} from "@phosphor-icons/react";

import Link from "next/link";
import { createPortal } from "react-dom";

import {
  ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import styles from "./WhatsAppLead.module.css";

/* =========================================================
   CONFIG
========================================================= */

const API_URL =
  "https://ancosur-api-production.up.railway.app/api/formularios";

const REQUEST_TIMEOUT =
  20000;

/* =========================================================
   TYPES
========================================================= */

export type Interest =
  | "Departamento"
  | "Lote"
  | "Casa"
  | "Inversión"
  | "Resort";

export type Budget =
  | "Hasta S/ 50 mil"
  | "S/ 50 mil – S/ 100 mil"
  | "S/ 100 mil – S/ 200 mil"
  | "Más de S/ 200 mil"
  | "Aún estoy evaluando";

type WhatsAppLeadProps = {
  children?: ReactNode;

  className?: string;

  project?: string;

  source?: string;

  sourceId?: number;

  campaign?: string;

  ad?: string;

  formCode?: string;

  formName?: string;

  formType?: string;

  defaultInterest?: Interest;

  whatsappNumber?: string;

  onBeforeOpen?: () => void;
};

type TrackingData = {
  ruta_pagina: string;
  url_pagina: string;
  pagina_referencia: string;

  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_content: string;
  utm_term: string;

  gclid: string;
  fbclid: string;
};

type ApiResponse = {
  success?: boolean;

  message?: string;

  error?: string;

  data?: {
    id?: number | string;

    guardado_local?: boolean;

    estado_crm?: string;

    crm?: {
      success?: boolean;

      estado?: string;

      lead_id?: number | string | null;

      http_status?: number | null;

      message?: string;
    };
  };
};

/* =========================================================
   OPTIONS
========================================================= */

const interests: Interest[] = [
  "Departamento",
  "Lote",
  "Casa",
  "Inversión",
  "Resort",
];

const budgets: Budget[] = [
  "Hasta S/ 50 mil",
  "S/ 50 mil – S/ 100 mil",
  "S/ 100 mil – S/ 200 mil",
  "Más de S/ 200 mil",
  "Aún estoy evaluando",
];

/* =========================================================
   COMPONENT
========================================================= */

export default function WhatsAppLead({
  children,

  className,

  project = "ANCOSUR",

  source = "Web ANCOSUR",

  sourceId = 4,

  campaign = "WEB Ancosur",

  ad = "WhatsApp Lead",

  formCode = "whatsapp_lead_ancosur",

  formName = "Captación WhatsApp - Web ANCOSUR",

  formType = "whatsapp",

  defaultInterest,

  whatsappNumber = "51971069763",

  onBeforeOpen,
}: WhatsAppLeadProps) {
  /* =======================================================
     REFS
  ======================================================= */

  const modalRef =
    useRef<HTMLElement | null>(
      null,
    );

  /* =======================================================
     STATE
  ======================================================= */

  const [
    isOpen,
    setIsOpen,
  ] = useState(false);

  const [
    mounted,
    setMounted,
  ] = useState(false);

  const [
    step,
    setStep,
  ] = useState(1);

  const [
    interest,
    setInterest,
  ] = useState<Interest | "">(
    defaultInterest ?? "",
  );

  const [
    budget,
    setBudget,
  ] = useState<Budget | "">("");

  const [
    name,
    setName,
  ] = useState("");

  const [
    phone,
    setPhone,
  ] = useState("");

  const [
    email,
    setEmail,
  ] = useState("");

  const [
    dni,
    setDni,
  ] = useState("");

  const [
    accepted,
    setAccepted,
  ] = useState(false);

  const [
    isSending,
    setIsSending,
  ] = useState(false);

  const [
    error,
    setError,
  ] = useState("");

  /* =======================================================
     NORMALIZED VALUES
  ======================================================= */

  const cleanPhone =
    useMemo(
      () =>
        phone
          .replace(
            /\D/g,
            "",
          )
          .slice(
            0,
            9,
          ),
      [phone],
    );

  const cleanDni =
    useMemo(
      () =>
        dni
          .replace(
            /\D/g,
            "",
          )
          .slice(
            0,
            8,
          ),
      [dni],
    );

  /* =======================================================
     RELEASE PAGE SCROLL

     No dejamos estilos inline de bloqueo en body/html.
     Esto evita que Safari/iOS conserve la página congelada
     después de cerrar el formulario o volver desde WhatsApp.
  ======================================================= */

  const releasePageScroll = () => {
    if (
      typeof document ===
      "undefined"
    ) {
      return;
    }

    const body =
      document.body;

    const html =
      document.documentElement;

    body.style.removeProperty(
      "overflow",
    );

    body.style.removeProperty(
      "position",
    );

    body.style.removeProperty(
      "top",
    );

    body.style.removeProperty(
      "left",
    );

    body.style.removeProperty(
      "right",
    );

    body.style.removeProperty(
      "width",
    );

    body.style.removeProperty(
      "height",
    );

    body.style.removeProperty(
      "touch-action",
    );

    html.style.removeProperty(
      "overflow",
    );

    html.style.removeProperty(
      "position",
    );

    html.style.removeProperty(
      "height",
    );

    html.style.removeProperty(
      "touch-action",
    );
  };

  /* =======================================================
     PORTAL READY
  ======================================================= */

  useEffect(() => {
    setMounted(true);

    /*
     * Si la página quedó con estilos inline de una apertura
     * anterior, los limpiamos al montar el componente.
     */
    releasePageScroll();

    return () => {
      releasePageScroll();
    };
  }, []);

  /* =======================================================
     BACKGROUND SCROLL GUARD

     IMPORTANTE:
     Ya NO usamos:
       body.style.overflow = "hidden"
       body.style.position = "fixed"
       html.style.overflow = "hidden"

     Esos estilos son los que podían quedar pegados en
     Safari/iPhone después de cerrar el modal.

     El overlay es fixed y detenemos el gesto solamente
     cuando ocurre fuera del área desplazable del modal.
  ======================================================= */

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const getScrollableArea =
      () =>
        modalRef.current?.querySelector(
          `.${styles.body}`,
        ) as HTMLElement | null;

    const handleTouchMove = (
      event: TouchEvent,
    ) => {
      const target =
        event.target;

      const scrollableArea =
        getScrollableArea();

      if (
        target instanceof Node &&
        scrollableArea?.contains(
          target,
        )
      ) {
        return;
      }

      event.preventDefault();
    };

    const handleWheel = (
      event: WheelEvent,
    ) => {
      const target =
        event.target;

      const scrollableArea =
        getScrollableArea();

      if (
        target instanceof Node &&
        scrollableArea?.contains(
          target,
        )
      ) {
        return;
      }

      event.preventDefault();
    };

    document.addEventListener(
      "touchmove",
      handleTouchMove,
      {
        passive: false,
      },
    );

    document.addEventListener(
      "wheel",
      handleWheel,
      {
        passive: false,
      },
    );

    return () => {
      document.removeEventListener(
        "touchmove",
        handleTouchMove,
      );

      document.removeEventListener(
        "wheel",
        handleWheel,
      );

      /*
       * Seguridad extra:
       * al cerrar nunca dejamos estilos de bloqueo.
       */
      releasePageScroll();
    };
  }, [isOpen]);

  /* =======================================================
     ESCAPE
  ======================================================= */

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (
      event: KeyboardEvent,
    ) => {
      if (
        event.key ===
        "Escape"
      ) {
        closeModal();
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown,
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown,
      );
    };
  }, [isOpen]);

  /* =======================================================
     RESTORE AFTER WHATSAPP / BFCache

     iOS puede volver desde WhatsApp usando el historial
     conservando el DOM. Forzamos la liberación del scroll.
  ======================================================= */

  useEffect(() => {
    const restore = () => {
      if (!isOpen) {
        releasePageScroll();
      }
    };

    const handleVisibility =
      () => {
        if (
          document.visibilityState ===
          "visible"
        ) {
          restore();
        }
      };

    window.addEventListener(
      "pageshow",
      restore,
    );

    window.addEventListener(
      "focus",
      restore,
    );

    document.addEventListener(
      "visibilitychange",
      handleVisibility,
    );

    return () => {
      window.removeEventListener(
        "pageshow",
        restore,
      );

      window.removeEventListener(
        "focus",
        restore,
      );

      document.removeEventListener(
        "visibilitychange",
        handleVisibility,
      );
    };
  }, [isOpen]);

  /* =======================================================
     OPEN
  ======================================================= */
  const openModal = () => {
    setError("");

    /*
     * Limpiamos cualquier bloqueo viejo antes de abrir.
     */
    releasePageScroll();

    if (defaultInterest) {
      setInterest(defaultInterest);
      setStep(2);
    } else {
      setStep(1);
    }

    /*
     * Primero abrimos el modal.
     * Como el contenido vive en document.body mediante Portal,
     * ya no depende del overlay del menú mobile.
     */
    setIsOpen(true);

    /*
     * Después cerramos el menú hamburguesa, si el componente
     * fue usado desde el Navbar mobile.
     */
    window.requestAnimationFrame(() => {
      onBeforeOpen?.();
    });
  };

  /* =======================================================
     CLOSE
  ======================================================= */

  const closeModal = () => {
    /*
     * Primero retiramos el modal.
     */
    setIsOpen(false);

    setError("");

    /*
     * Safari puede mantener un estilo inline durante
     * un frame. Lo liberamos inmediatamente y otra vez
     * en los siguientes frames.
     */
    releasePageScroll();

    window.requestAnimationFrame(
      () => {
        releasePageScroll();

        window.requestAnimationFrame(
          () => {
            releasePageScroll();
          },
        );
      },
    );

    window.setTimeout(
      () => {
        releasePageScroll();
      },
      120,
    );

    window.setTimeout(
      () => {
        setStep(
          defaultInterest
            ? 2
            : 1,
        );

        setInterest(
          defaultInterest ?? "",
        );

        setBudget("");

        setName("");

        setPhone("");

        setEmail("");

        setDni("");

        setAccepted(false);
      },
      180,
    );
  };

  /* =======================================================
     MOVE BODY TO TOP
  ======================================================= */

  const goToStep = (
    nextStep: number,
  ) => {
    setStep(
      nextStep,
    );

    setError("");

    window.requestAnimationFrame(
      () => {
        const body =
          modalRef.current?.querySelector(
            `.${styles.body}`,
          );

        body?.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      },
    );
  };

  /* =======================================================
     TRACKING
  ======================================================= */

  const getTrackingData =
    (): TrackingData => {
      if (
        typeof window ===
        "undefined"
      ) {
        return {
          ruta_pagina:
            "",

          url_pagina:
            "",

          pagina_referencia:
            "",

          utm_source:
            "",

          utm_medium:
            "",

          utm_campaign:
            "",

          utm_content:
            "",

          utm_term:
            "",

          gclid:
            "",

          fbclid:
            "",
        };
      }

      const params =
        new URLSearchParams(
          window.location.search,
        );

      return {
        ruta_pagina:
          window.location.pathname,

        url_pagina:
          window.location.href,

        pagina_referencia:
          document.referrer || "",

        utm_source:
          params.get(
            "utm_source",
          ) ?? "",

        utm_medium:
          params.get(
            "utm_medium",
          ) ?? "",

        utm_campaign:
          params.get(
            "utm_campaign",
          ) ?? "",

        utm_content:
          params.get(
            "utm_content",
          ) ?? "",

        utm_term:
          params.get(
            "utm_term",
          ) ?? "",

        gclid:
          params.get(
            "gclid",
          ) ?? "",

        fbclid:
          params.get(
            "fbclid",
          ) ?? "",
      };
    };

  /* =======================================================
     STEP 1
  ======================================================= */

  const continueFromInterest =
    () => {
      if (!interest) {
        setError(
          "Selecciona qué estás buscando.",
        );

        return;
      }

      goToStep(2);
    };

  /* =======================================================
     STEP 2
  ======================================================= */

  const continueFromBudget =
    () => {
      if (!budget) {
        setError(
          "Selecciona un presupuesto aproximado.",
        );

        return;
      }

      goToStep(3);
    };

  /* =======================================================
     VALIDATE
  ======================================================= */

  const validateContactData =
    () => {
      const cleanName =
        name
          .replace(
            /\s+/g,
            " ",
          )
          .trim();

      const cleanEmail =
        email
          .trim()
          .toLowerCase();

      const nameRegex =
        /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s.'’-]{3,80}$/;

      const phoneRegex =
        /^9\d{8}$/;

      const emailRegex =
        /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

      const dniRegex =
        /^\d{8}$/;

      if (
        !nameRegex.test(
          cleanName,
        )
      ) {
        setError(
          "Ingresa un nombre válido usando letras y espacios.",
        );

        return null;
      }

      if (
        !phoneRegex.test(
          cleanPhone,
        )
      ) {
        setError(
          "El celular debe tener 9 dígitos y comenzar con 9.",
        );

        return null;
      }

      if (
        cleanEmail &&
        !emailRegex.test(
          cleanEmail,
        )
      ) {
        setError(
          "Ingresa un correo electrónico válido.",
        );

        return null;
      }

      if (
        cleanDni &&
        !dniRegex.test(
          cleanDni,
        )
      ) {
        setError(
          "El DNI debe contener exactamente 8 dígitos.",
        );

        return null;
      }

      if (!accepted) {
        setError(
          "Debes aceptar la política de privacidad para continuar.",
        );

        return null;
      }

      return {
        cleanName,
        cleanEmail,
      };
    };

  /* =======================================================
     SUBMIT
  ======================================================= */

  const handleSubmit =
    async () => {
      if (isSending) {
        return;
      }

      setError("");

      const validated =
        validateContactData();

      if (!validated) {
        return;
      }

      const {
        cleanName,
        cleanEmail,
      } = validated;

      const tracking =
        getTrackingData();

      /*
       * Si llega UTM Campaign desde Google,
       * usamos esa.
       *
       * Si no, usamos la campaña configurada
       * en el componente.
       */

      const realCampaign =
        tracking.utm_campaign ||
        campaign;

      const realAd =
        tracking.utm_content ||
        ad;

      /* =====================================================
         MENSAJE WHATSAPP
      ===================================================== */

      const projectLine =
        project !== "ANCOSUR"
          ? `Proyecto: ${project}.\n`
          : "";

      const whatsappMessage =
        `Hola, soy ${cleanName}.\n\n` +
        `Vi la página web de ANCOSUR y quisiera recibir información.\n\n` +
        `Estoy buscando: ${interest}.\n` +
        projectLine +
        `Presupuesto aproximado: ${budget}.\n\n` +
        `¿Podrían brindarme más información?`;

      /* =====================================================
         PAYLOAD EXACTO PARA API GO
      ===================================================== */

      const formularioData = {
        codigo_formulario:
          formCode,

        nombre_formulario:
          formName,

        tipo_formulario:
          formType,

        nombre:
          cleanName,

        telefono:
          cleanPhone,

        email:
          cleanEmail,

        dni:
          cleanDni,

        mensaje:
          whatsappMessage,

        proyecto:
          project,

        tipo_inmueble:
          interest,

        interes:
          `Presupuesto: ${budget}`,

        horario_visita:
          "",

        /*
         * OJO:
         * tu API actual utiliza "campania".
         */

        campania:
          realCampaign,

        anuncio:
          realAd,

        fuente_id:
          sourceId,

        ruta_pagina:
          tracking.ruta_pagina,

        url_pagina:
          tracking.url_pagina,

        pagina_referencia:
          tracking.pagina_referencia,

        utm_source:
          tracking.utm_source,

        utm_medium:
          tracking.utm_medium,

        utm_campaign:
          tracking.utm_campaign,

        utm_content:
          tracking.utm_content,

        utm_term:
          tracking.utm_term,

        /*
         * Información adicional.
         * Si tu backend ignora estos campos
         * no genera problema.
         */

        gclid:
          tracking.gclid,

        fbclid:
          tracking.fbclid,

        presupuesto:
          budget,

        fuente_descripcion:
          source,

        datos_originales: {
          nombre:
            cleanName,

          telefono:
            cleanPhone,

          email:
            cleanEmail,

          dni:
            cleanDni,

          interes:
            interest,

          presupuesto:
            budget,

          project,

          fuente:
            source,

          campaña:
            realCampaign,

          anuncio:
            realAd,

          consentimiento:
            true,

          tracking,

          fecha_cliente:
            new Date().toISOString(),
        },
      };

      /* =====================================================
         TIMEOUT
      ===================================================== */

      const controller =
        new AbortController();

      const timeoutId =
        window.setTimeout(
          () => {
            controller.abort();
          },
          REQUEST_TIMEOUT,
        );

      try {
        setIsSending(true);

        /* =================================================
           API ANCOSUR

           Backend:
           1. PostgreSQL
           2. CRM
           3. Actualiza estado CRM
        ================================================= */

        const response =
          await fetch(
            API_URL,
            {
              method:
                "POST",

              headers: {
                "Content-Type":
                  "application/json",

                Accept:
                  "application/json",
              },

              body:
                JSON.stringify(
                  formularioData,
                ),

              signal:
                controller.signal,
            },
          );

        /* =================================================
           RESPONSE
        ================================================= */

        const raw =
          await response.text();

        let result:
          ApiResponse =
          {};

        if (raw) {
          try {
            result =
              JSON.parse(
                raw,
              ) as ApiResponse;
          } catch {
            console.error(
              "[WhatsAppLead] Respuesta no JSON:",
              raw,
            );

            setError(
              `La API respondió HTTP ${response.status}, pero la respuesta no fue válida.`,
            );

            return;
          }
        }

        /* =================================================
           1. VERIFICAR POSTGRESQL

           NO seguimos a WhatsApp si no guardó primero.
        ================================================= */

        if (
          !response.ok ||
          result.success !==
            true ||
          result.data
            ?.guardado_local !==
            true
        ) {
          console.error(
            "[WhatsAppLead] Error guardando lead local:",
            {
              httpStatus:
                response.status,

              result,

              payload:
                formularioData,
            },
          );

          setError(
            result.message ||
              result.error ||
              "No pudimos registrar tus datos. Inténtalo nuevamente.",
          );

          return;
        }

        /* =================================================
           2. RESULTADO CRM
        ================================================= */

        const crmSuccess =
          result.data?.crm
            ?.success ===
          true;

        const crmStatus =
          result.data
            ?.estado_crm ??
          result.data?.crm
            ?.estado ??
          "pendiente";

        const crmLeadId =
          result.data?.crm
            ?.lead_id ??
          null;

        const crmHttpStatus =
          result.data?.crm
            ?.http_status ??
          null;

        console.log(
          "[WhatsAppLead] Lead procesado:",
          {
            idLocal:
              result.data?.id,

            nombre:
              cleanName,

            telefono:
              cleanPhone,

            guardadoLocal:
              true,

            estadoCRM:
              crmStatus,

            enviadoCRM:
              crmSuccess,

            crmLeadId,

            crmHttpStatus,
          },
        );

        /* =================================================
           3. GOOGLE TAG MANAGER

           Solo dispara como lead cuando
           PostgreSQL confirmó guardado.
        ================================================= */

        window.dataLayer =
          window.dataLayer ||
          [];

        window.dataLayer.push({
          event:
            "whatsapp_qualified_lead",

          form_name:
            formName,

          form_code:
            formCode,

          form_type:
            formType,

          lead_type:
            interest,

          lead_budget:
            budget,

          project,

          campaign:
            realCampaign,

          ad:
            realAd,

          source_id:
            sourceId,

          source,

          page_path:
            tracking.ruta_pagina,

          local_lead_id:
            result.data?.id ??
            "",

          local_saved:
            true,

          crm_sent:
            crmSuccess,

          crm_status:
            crmStatus,

          crm_lead_id:
            crmLeadId ??
            "",

          crm_http_status:
            crmHttpStatus ??
            "",

          utm_source:
            tracking.utm_source,

          utm_medium:
            tracking.utm_medium,

          utm_campaign:
            tracking.utm_campaign,

          utm_content:
            tracking.utm_content,

          utm_term:
            tracking.utm_term,
        });

        /* =================================================
           4. WHATSAPP

           Llegamos aquí SOLO después
           de guardar correctamente en PostgreSQL.
        ================================================= */

        const whatsappUrl =
          `https://wa.me/${whatsappNumber}` +
          `?text=${encodeURIComponent(
            whatsappMessage,
          )}`;
        /*
         * Cerramos y liberamos completamente la página
         * antes de salir hacia WhatsApp.
         */
        closeModal();

        window.setTimeout(
          () => {
            releasePageScroll();

            window.location.assign(
              whatsappUrl,
            );
          },
          260,
        );
      } catch (
        submitError
      ) {
        console.error(
          "[WhatsAppLead] Error:",
          submitError,
        );

        if (
          submitError instanceof
            Error &&
          submitError.name ===
            "AbortError"
        ) {
          setError(
            "El servidor tardó demasiado en responder. Inténtalo nuevamente.",
          );

          return;
        }

        setError(
          "No pudimos conectar con el servidor. Comprueba tu conexión e inténtalo nuevamente.",
        );
      } finally {
        window.clearTimeout(
          timeoutId,
        );

        setIsSending(false);
      }
    };

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <>
      {/* ===================================================
          TRIGGER
      ==================================================== */}

      <button
        type="button"
        className={`${styles.trigger} ${
          className ?? ""
        }`}
        onClick={
          openModal
        }
      >
        {children ?? (
          <>
            <WhatsappLogo
              size={18}
              weight="fill"
            />

            <span>
              Hablar con un asesor
            </span>
          </>
        )}
      </button>

      {/* ===================================================
          MODAL
      ==================================================== */}

      {mounted &&
        isOpen &&
        createPortal(
          <div
          className={
            styles.overlay
          }
          role="presentation"
          onMouseDown={(
            event,
          ) => {
            if (
              event.target ===
              event.currentTarget
            ) {
              closeModal();
            }
          }}
        >
          <section
            ref={modalRef}
            className={
              styles.modal
            }
            role="dialog"
            aria-modal="true"
            aria-label="Solicitar información a ANCOSUR"
          >
            {/* =========================================
                HEADER
            ========================================= */}

            <header
              className={
                styles.header
              }
            >
              <div
                className={
                  styles.headerCopy
                }
              >
                <span
                  className={
                    styles.eyebrow
                  }
                >
                  ANCOSUR INMOBILIARIA
                </span>

                <h2>
                  Encuentra una opción
                  <span>
                    {" "}
                    para ti.
                  </span>
                </h2>

                {project !==
                  "ANCOSUR" && (
                  <p
                    className={
                      styles.projectName
                    }
                  >
                    {project}
                  </p>
                )}
              </div>

              <button
                type="button"
                className={
                  styles.close
                }
                onClick={
                  closeModal
                }
                aria-label="Cerrar"
              >
                <X
                  size={19}
                  weight="bold"
                />
              </button>
            </header>

            {/* =========================================
                PROGRESS
            ========================================= */}

            <div
              className={
                styles.progress
              }
              aria-hidden="true"
            >
              <span
                className={
                  step >= 1
                    ? styles.progressActive
                    : ""
                }
              />

              <span
                className={
                  step >= 2
                    ? styles.progressActive
                    : ""
                }
              />

              <span
                className={
                  step >= 3
                    ? styles.progressActive
                    : ""
                }
              />
            </div>

            {/* =========================================
                BODY
            ========================================= */}

            <div
              className={
                styles.body
              }
            >
              {/* =====================================
                  STEP 1
              ====================================== */}

              {step === 1 && (
                <div
                  className={
                    styles.step
                  }
                >
                  <span
                    className={
                      styles.stepLabel
                    }
                  >
                    PASO 1 DE 3
                  </span>

                  <h3>
                    ¿Qué estás buscando?
                  </h3>

                  <p
                    className={
                      styles.stepDescription
                    }
                  >
                    Selecciona la opción
                    que mejor se adapte a
                    lo que buscas.
                  </p>

                  <div
                    className={
                      styles.options
                    }
                  >
                    {interests.map(
                      (item) => {
                        const active =
                          interest ===
                          item;

                        return (
                          <button
                            key={
                              item
                            }
                            type="button"
                            className={`${styles.option} ${
                              active
                                ? styles.optionActive
                                : ""
                            }`}
                            onClick={() => {
                              setInterest(
                                item,
                              );

                              setError(
                                "",
                              );
                            }}
                          >
                            <span>
                              {item}
                            </span>

                            <span
                              className={
                                styles.optionIndicator
                              }
                            >
                              {active && (
                                <Check
                                  size={
                                    13
                                  }
                                  weight="bold"
                                />
                              )}
                            </span>
                          </button>
                        );
                      },
                    )}
                  </div>

                  <button
                    type="button"
                    className={
                      styles.nextButton
                    }
                    onClick={
                      continueFromInterest
                    }
                  >
                    <span>
                      Continuar
                    </span>

                    <ArrowRight
                      size={17}
                      weight="bold"
                    />
                  </button>
                </div>
              )}

              {/* =====================================
                  STEP 2
              ====================================== */}

              {step === 2 && (
                <div
                  className={
                    styles.step
                  }
                >
                  {!defaultInterest && (
                    <button
                      type="button"
                      className={
                        styles.back
                      }
                      onClick={() =>
                        goToStep(
                          1,
                        )
                      }
                    >
                      <ArrowLeft
                        size={14}
                      />

                      <span>
                        Volver
                      </span>
                    </button>
                  )}

                  <span
                    className={
                      styles.stepLabel
                    }
                  >
                    PASO 2 DE 3
                  </span>

                  <h3>
                    ¿Qué presupuesto estás
                    considerando?
                  </h3>

                  <p
                    className={
                      styles.stepDescription
                    }
                  >
                    Es referencial y nos
                    ayudará a mostrarte
                    alternativas adecuadas.
                  </p>

                  <div
                    className={
                      styles.options
                    }
                  >
                    {budgets.map(
                      (item) => {
                        const active =
                          budget ===
                          item;

                        return (
                          <button
                            key={
                              item
                            }
                            type="button"
                            className={`${styles.option} ${
                              active
                                ? styles.optionActive
                                : ""
                            }`}
                            onClick={() => {
                              setBudget(
                                item,
                              );

                              setError(
                                "",
                              );
                            }}
                          >
                            <span>
                              {item}
                            </span>

                            <span
                              className={
                                styles.optionIndicator
                              }
                            >
                              {active && (
                                <Check
                                  size={
                                    13
                                  }
                                  weight="bold"
                                />
                              )}
                            </span>
                          </button>
                        );
                      },
                    )}
                  </div>

                  <button
                    type="button"
                    className={
                      styles.nextButton
                    }
                    onClick={
                      continueFromBudget
                    }
                  >
                    <span>
                      Continuar
                    </span>

                    <ArrowRight
                      size={17}
                      weight="bold"
                    />
                  </button>
                </div>
              )}

              {/* =====================================
                  STEP 3
              ====================================== */}

              {step === 3 && (
                <div
                  className={
                    styles.step
                  }
                >
                  <button
                    type="button"
                    className={
                      styles.back
                    }
                    onClick={() =>
                      goToStep(
                        2,
                      )
                    }
                  >
                    <ArrowLeft
                      size={14}
                    />

                    <span>
                      Volver
                    </span>
                  </button>

                  <span
                    className={
                      styles.stepLabel
                    }
                  >
                    PASO 3 DE 3
                  </span>

                  <h3>
                    Déjanos tus datos.
                  </h3>

                  <p
                    className={
                      styles.stepDescription
                    }
                  >
                    Registraremos tu
                    solicitud y después
                    podrás continuar
                    directamente por
                    WhatsApp.
                  </p>

                  {/* =================================
                      FIELDS
                  ================================== */}

                  <div
                    className={
                      styles.fields
                    }
                  >
                    {/* NOMBRE */}

                    <label
                      className={`${styles.field} ${styles.fieldFull}`}
                    >
                      <span>
                        Nombre completo
                      </span>

                      <input
                        type="text"
                        value={
                          name
                        }
                        onChange={(
                          event,
                        ) => {
                          setName(
                            event
                              .target
                              .value,
                          );

                          setError(
                            "",
                          );
                        }}
                        placeholder="Ingresa tu nombre"
                        autoComplete="name"
                        maxLength={
                          80
                        }
                      />
                    </label>

                    {/* CELULAR */}

                    <label
                      className={
                        styles.field
                      }
                    >
                      <span>
                        Celular
                      </span>

                      <div
                        className={
                          styles.phoneField
                        }
                      >
                        <span
                          className={
                            styles.countryCode
                          }
                        >
                          +51
                        </span>

                        <input
                          type="tel"
                          value={
                            phone
                          }
                          onChange={(
                            event,
                          ) => {
                            setPhone(
                              event
                                .target
                                .value
                                .replace(
                                  /\D/g,
                                  "",
                                )
                                .slice(
                                  0,
                                  9,
                                ),
                            );

                            setError(
                              "",
                            );
                          }}
                          placeholder="999 999 999"
                          inputMode="numeric"
                          autoComplete="tel"
                          maxLength={
                            9
                          }
                        />
                      </div>
                    </label>

                    {/* DNI */}

                    <label
                      className={
                        styles.field
                      }
                    >
                      <span>
                        DNI

                        <small>
                          Opcional
                        </small>
                      </span>

                      <input
                        type="text"
                        value={
                          dni
                        }
                        onChange={(
                          event,
                        ) => {
                          setDni(
                            event
                              .target
                              .value
                              .replace(
                                /\D/g,
                                "",
                              )
                              .slice(
                                0,
                                8,
                              ),
                          );

                          setError(
                            "",
                          );
                        }}
                        placeholder="12345678"
                        inputMode="numeric"
                        autoComplete="off"
                        maxLength={
                          8
                        }
                      />
                    </label>

                    {/* EMAIL */}

                    <label
                      className={`${styles.field} ${styles.fieldFull}`}
                    >
                      <span>
                        Correo electrónico

                        <small>
                          Opcional
                        </small>
                      </span>

                      <input
                        type="email"
                        value={
                          email
                        }
                        onChange={(
                          event,
                        ) => {
                          setEmail(
                            event
                              .target
                              .value,
                          );

                          setError(
                            "",
                          );
                        }}
                        placeholder="correo@ejemplo.com"
                        autoComplete="email"
                      />
                    </label>
                  </div>

                  {/* =================================
                      SUMMARY
                  ================================== */}

                  <div
                    className={
                      styles.summary
                    }
                  >
                    <div>
                      <span>
                        Buscas
                      </span>

                      <strong>
                        {interest}
                      </strong>
                    </div>

                    <div>
                      <span>
                        Presupuesto
                      </span>

                      <strong>
                        {budget}
                      </strong>
                    </div>

                    {project !==
                      "ANCOSUR" && (
                      <div>
                        <span>
                          Proyecto
                        </span>

                        <strong>
                          {project}
                        </strong>
                      </div>
                    )}
                  </div>

                  {/* =================================
                      CONSENT
                  ================================== */}

                  <label
                    className={
                      styles.consent
                    }
                  >
                    <input
                      type="checkbox"
                      checked={
                        accepted
                      }
                      onChange={(
                        event,
                      ) => {
                        setAccepted(
                          event
                            .target
                            .checked,
                        );

                        setError(
                          "",
                        );
                      }}
                    />

                    <span>
                      Acepto el tratamiento
                      de mis datos personales
                      para recibir información
                      comercial de ANCOSUR.{" "}

                      <Link
                        href="/politicas/politica-de-privacidad"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Ver política
                      </Link>
                    </span>
                  </label>

                  {/* =================================
                      SUBMIT
                  ================================== */}

                  <button
                    type="button"
                    className={
                      styles.whatsappButton
                    }
                    onClick={
                      handleSubmit
                    }
                    disabled={
                      isSending
                    }
                  >
                    <WhatsappLogo
                      size={19}
                      weight="fill"
                    />

                    <span>
                      {isSending
                        ? "Registrando solicitud..."
                        : "Continuar por WhatsApp"}
                    </span>

                    <ArrowRight
                      size={17}
                      weight="bold"
                    />
                  </button>
                </div>
              )}

              {/* =====================================
                  ERROR
              ====================================== */}

              {error && (
                <p
                  className={
                    styles.error
                  }
                  role="alert"
                >
                  {error}
                </p>
              )}
            </div>

            {/* =========================================
                FOOTER
            ========================================= */}

            <div
              className={
                styles.modalFooter
              }
            >
              <span
                className={
                  styles.secureDot
                }
                aria-hidden="true"
              />

              <span>
                Tus datos serán utilizados
                para atender tu solicitud.
              </span>
            </div>
          </section>
        </div>,
        document.body,
      )}
    </>
  );
}

/* =========================================================
   GTM TYPE
========================================================= */

declare global {
  interface Window {
    dataLayer?: Array<
      Record<
        string,
        unknown
      >
    >;
  }
}