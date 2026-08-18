"use client";

import {
  ArrowRightIcon,
  XIcon,
} from "@phosphor-icons/react";
import Image from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import type {
  FormEvent,
} from "react";

import FeedbackToast, {
  type FeedbackToastData,
} from "@/components/ui/FeedbackToast/FeedbackToast";

import styles from "./PromoPopup.module.css";

/* =========================================================
   CONFIGURACIÓN
========================================================= */

const SOURCE_ID = 4 as const;
const CAMPAIGN_NAME =
  "Popup Campaña Camino Real";
const AD_NAME = "Web";
const LEAD_TYPE = "WEB Ancosur";
const COMPONENT_NAME = "PromoPopup";
const REQUEST_TIMEOUT = 20_000;

const popupConfig = {
  id: "campana-cusco-2026",
  enabled: true,
  showDelay: 1_200,
  showOncePerSession: true,
  image:
    "/assets/campanias/postjulio.png",
  imageAlt:
    "Campaña Ancosur - Te regalamos un viaje a Cusco",
  imageWidth: 1_080,
  imageHeight: 1_080,
};

/* =========================================================
   TIPOS
========================================================= */

type ToastState =
  FeedbackToastData & {
    id: number;
  };

type JsonObject =
  Record<string, unknown>;

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

const SUCCESS_TOAST:
  FeedbackToastData = {
    variant: "success",

    title:
      "¡Registro enviado correctamente!",

    message:
      "Gracias por participar. Un asesor de Ancosur se comunicará contigo muy pronto para brindarte más información sobre la campaña.",
  };

const ERROR_TOAST:
  FeedbackToastData = {
    variant: "error",

    title:
      "No pudimos enviar tus datos",

    message:
      "Verifica tu conexión e inténtalo nuevamente.",
  };

/* =========================================================
   UTILIDADES
========================================================= */

const isJsonObject = (
  value: unknown,
): value is JsonObject => {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value)
  );
};

const readApiResponse = async (
  response: Response,
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
  value: unknown,
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
  value: unknown,
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
    extractApiMessage(
      value.response,
    );

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

/* =========================================================
   COMPONENTE
========================================================= */

export default function PromoPopup() {
  const [
    isVisible,
    setIsVisible,
  ] = useState(false);

  const [
    isSending,
    setIsSending,
  ] = useState(false);

  const submitLockRef =
    useRef(false);

  const [
    toast,
    setToast,
  ] = useState<ToastState | null>(
    null,
  );

  useEffect(() => {
    if (!popupConfig.enabled) {
      return;
    }

    const storageKey =
      `popup-${popupConfig.id}`;

    if (
      popupConfig.showOncePerSession
    ) {
      const alreadyClosed =
        sessionStorage.getItem(
          storageKey,
        );

      if (alreadyClosed) {
        return;
      }
    }

    const timer =
      window.setTimeout(() => {
        setIsVisible(true);
      }, popupConfig.showDelay);

    return () => {
      window.clearTimeout(timer);
    };
  }, []);

  const closeToast =
    useCallback(() => {
      setToast(null);
    }, []);

  const showToast = (
    toastData:
      FeedbackToastData,
  ) => {
    setToast({
      ...toastData,
      id: Date.now(),
    });
  };

  const closePopup = () => {
    if (isSending) {
      return;
    }

    setIsVisible(false);

    if (
      popupConfig.showOncePerSession
    ) {
      sessionStorage.setItem(
        `popup-${popupConfig.id}`,
        "closed",
      );
    }
  };

  const handleSubmit = async (
    event:
      FormEvent<HTMLFormElement>,
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

        title:
          "Revisa tus datos",

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
        formData.get(
          "fullName",
        ) ?? "",
      )
        .replace(/\s+/g, " ")
        .trim();

    const phone =
      String(
        formData.get(
          "phone",
        ) ?? "",
      )
        .replace(/\D/g, "")
        .slice(0, 9);

    const email =
      String(
        formData.get(
          "email",
        ) ?? "",
      )
        .trim()
        .toLowerCase();

    const dni =
      String(
        formData.get(
          "dni",
        ) ?? "",
      )
        .replace(/\D/g, "")
        .slice(0, 8);

    const message =
      String(
        formData.get(
          "message",
        ) ?? "",
      ).trim();

    const consent =
      formData.get(
        "consent",
      ) === "accepted";

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
        fullName,
      )
    ) {
      showToast({
        variant: "error",

        title:
          "Nombre no válido",

        message:
          "Ingresa tu nombre usando únicamente letras y espacios.",
      });

      submitLockRef.current = false;
      return;
    }

    if (
      !phoneRegex.test(
        phone,
      )
    ) {
      showToast({
        variant: "error",

        title:
          "Celular no válido",

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

        title:
          "Correo no válido",

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

    if (
      message.length > 250
    ) {
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

    /*
     * msj_client contiene únicamente
     * los datos técnicos del origen.
     *
     * El mensaje del usuario se envía
     * en comentario y solo cuando existe.
     */
    const clientMetadata:
      Record<string, string> = {
        origenRuta:
          window.location.pathname,

        origenComponente:
          COMPONENT_NAME,

        tipoLead:
          LEAD_TYPE,

        interes:
          CAMPAIGN_NAME,
      };

    const leadPayload = {
      fuente_id:
        SOURCE_ID,

      telefono:
        phone,

      nombre:
        fullName,

      email,

      dni,

      campaña:
        CAMPAIGN_NAME,

      anuncio:
        AD_NAME,

      msj_client:
        JSON.stringify(
          clientMetadata,
        ),

      ...(message
        ? {
            comentario:
              message,
          }
        : {}),
    };

    const controller =
      new AbortController();

    const timeoutId =
      window.setTimeout(() => {
        controller.abort();
      }, REQUEST_TIMEOUT);

    try {
      setIsSending(true);
      setToast(null);

      const response =
        await fetch(
          "https://ancosur-api-production.up.railway.app/api/leads",
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
                leadPayload,
              ),

            cache:
              "no-store",

            signal:
              controller.signal,
          },
        );

      const result =
        await readApiResponse(
          response,
        );

      const requestFailed =
        !response.ok ||
        hasApiFailure(result);

      if (requestFailed) {
        const apiMessage =
          extractApiMessage(
            result,
          );

        console.error(
          "Error API PromoPopup:",
          {
            status:
              response.status,

            result,

            payload: {
              ...leadPayload,

              msj_client:
                clientMetadata,

              comentario:
                message || undefined,
            },
          },
        );

        showToast({
          variant: "error",

          title:
            "No pudimos registrar tus datos",

          message:
            apiMessage ||
            "La API rechazó la solicitud. Revisa tus datos e inténtalo nuevamente.",
        });

        return;
      }

      form.reset();

      showToast(
        SUCCESS_TOAST,
      );

      window.setTimeout(() => {
        closePopup();
      }, 1_800);
    } catch (error) {
      console.error(
        "Error enviando PromoPopup:",
        error,
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
            "La solicitud superó los 20 segundos de espera.",
        });

        return;
      }

      showToast(
        ERROR_TOAST,
      );
    } finally {
      window.clearTimeout(
        timeoutId,
      );

      submitLockRef.current = false;
      setIsSending(false);
    }
  };

  if (!isVisible) {
    return (
      <FeedbackToast
        key={toast?.id}
        open={toast !== null}
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
    );
  }

  return (
    <>
      <div
        className={
          styles.overlay
        }
        role="dialog"
        aria-modal="true"
        aria-labelledby="promo-popup-title"
      >
        <button
          type="button"
          className={
            styles.backdrop
          }
          onClick={
            closePopup
          }
          aria-label="Cerrar promoción"
          disabled={
            isSending
          }
        />

        <div
          className={
            styles.popup
          }
        >
          <button
            type="button"
            className={
              styles.closeButton
            }
            onClick={
              closePopup
            }
            aria-label="Cerrar promoción"
            disabled={
              isSending
            }
          >
            <XIcon
              size={20}
              weight="bold"
              aria-hidden="true"
            />
          </button>

          <div
            className={
              styles.imageLink
            }
          >
            <Image
              src={
                popupConfig.image
              }
              alt={
                popupConfig.imageAlt
              }
              width={
                popupConfig.imageWidth
              }
              height={
                popupConfig.imageHeight
              }
              className={
                styles.popupImage
              }
              priority
              sizes="(max-width: 480px) 92vw, (max-width: 768px) 82vw, 520px"
            />
          </div>

          <form
            className={
              styles.form
            }
            onSubmit={
              handleSubmit
            }
          >
            <div
              className={
                styles.formHeader
              }
            >
              <span>
                Campaña especial
              </span>

              <strong
                id="promo-popup-title"
              >
                Participa por un viaje a Cusco
              </strong>

              <p>
                Completa tus datos y un asesor
                te explicará cómo participar.
              </p>
            </div>

            <label>
              Nombre completo

              <input
                type="text"
                name="fullName"
                placeholder="Ej. Miguel Asto"
                autoComplete="name"
                minLength={3}
                maxLength={80}
                pattern="[A-Za-zÁÉÍÓÚáéíóúÑñÜü.'’ -]{3,80}"
                title="Ingresa tu nombre usando únicamente letras y espacios."
                disabled={
                  isSending
                }
                onInput={(event) => {
                  event.currentTarget.value =
                    event.currentTarget.value
                      .replace(
                        /[^a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s.'’-]/g,
                        "",
                      )
                      .replace(
                        /\s{2,}/g,
                        " ",
                      )
                      .slice(
                        0,
                        80,
                      );
                }}
                required
              />
            </label>

            <div
              className={
                styles.formGrid
              }
            >
              <label>
                Celular

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
                  disabled={
                    isSending
                  }
                  onInput={(event) => {
                    event.currentTarget.value =
                      event.currentTarget.value
                        .replace(
                          /\D/g,
                          "",
                        )
                        .slice(
                          0,
                          9,
                        );
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
                  disabled={
                    isSending
                  }
                />
              </label>

              <label>
                Documento opcional

                <input
                  type="text"
                  name="dni"
                  placeholder="12345678"
                  autoComplete="off"
                  inputMode="numeric"
                  pattern="[0-9]{8}"
                  minLength={8}
                  maxLength={8}
                  title="Ingresa un documento de 8 dígitos o deja el campo vacío."
                  disabled={
                    isSending
                  }
                  onInput={(event) => {
                    event.currentTarget.value =
                      event.currentTarget.value
                        .replace(
                          /\D/g,
                          "",
                        )
                        .slice(
                          0,
                          8,
                        );
                  }}
                />
              </label>
            </div>

            <label>
              Mensaje opcional

              <textarea
                name="message"
                rows={3}
                maxLength={250}
                placeholder="Escribe alguna consulta sobre la campaña."
                disabled={
                  isSending
                }
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
                disabled={
                  isSending
                }
                required
              />

              <span>
                Acepto ser contactado por
                Ancosur para recibir
                información sobre esta
                campaña y sus proyectos.
              </span>
            </label>

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
                : "Quiero participar"}

              <ArrowRightIcon
                size={18}
                weight="bold"
                aria-hidden="true"
              />
            </button>
          </form>
        </div>
      </div>

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