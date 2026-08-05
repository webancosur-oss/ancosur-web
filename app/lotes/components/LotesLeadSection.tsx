"use client";

import { ArrowRightIcon } from "@phosphor-icons/react";
import {
  useCallback,
  useRef,
  useState,
} from "react";
import type { FormEvent } from "react";

import FeedbackToast, {
  type FeedbackToastData,
} from "@/components/ui/FeedbackToast/FeedbackToast";

import styles from "./LotesLeadSection.module.css";

const SOURCE_ID = 4 as const;
const CAMPAIGN_CODE = "LOT";
const AD_NAME = "Web";
const LEAD_TYPE = "WEB Ancosur";
const COMPONENT_NAME = "LotesLeadSection";
const REQUEST_TIMEOUT = 20_000;

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

const SUCCESS_TOAST: FeedbackToastData = {
  variant: "success",
  title: "¡Solicitud enviada correctamente!",
  message:
    "Gracias por tu interés. Un asesor de Ancosur se comunicará contigo muy pronto para ayudarte a encontrar el lote ideal.",
};

const ERROR_TOAST: FeedbackToastData = {
  variant: "error",
  title: "No pudimos enviar tus datos",
  message:
    "Verifica tu conexión e inténtalo nuevamente.",
};

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
        "Revisa el nombre, celular, correo y tipo de lote.",
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

export default function LotesLeadSection() {
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

    const interest =
      String(
        formData.get("interest") ?? ""
      ).trim();

    const message =
      String(
        formData.get("message") ?? ""
      ).trim();

    const consent =
      formData.get("consent") ===
      "accepted";

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

    /*
     * El correo es opcional.
     */
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

    if (!interest) {
      showToast({
        variant: "error",
        title: "Selecciona una opción",
        message:
          "Indica qué tipo de lote estás buscando.",
      });

      submitLockRef.current = false;
      return;
    }

    if (message.length > 250) {
      showToast({
        variant: "error",
        title: "Mensaje demasiado largo",
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
     * msj_client contiene únicamente:
     *
     * - Interés seleccionado.
     * - Ruta del formulario.
     * - Componente de origen.
     * - Tipo de lead.
     * - Mensaje, solo cuando fue escrito.
     *
     * No se envía comentario para evitar
     * duplicar el contenido dentro del CRM.
     */
    const clientMetadata:
      Record<string, string> = {
        interes:
          interest,

        origenRuta:
          window.location.pathname,

        origenComponente:
          COMPONENT_NAME,

        tipoLead:
          LEAD_TYPE,
      };

    if (message) {
      clientMetadata.mensaje =
        message;
    }

    const leadData = {
      fuente_id:
        SOURCE_ID,

      telefono:
        phone,

      nombre:
        fullName,

      email,

      dni:
        "",

      campaña:
        CAMPAIGN_CODE,

      anuncio:
        AD_NAME,

      msj_client:
        JSON.stringify(
          clientMetadata
        ),
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
        hasApiFailure(result);

      if (requestFailed) {
        const friendlyError =
          getFriendlyServerError(
            response.status,
            result
          );

        console.error(
          "Error API Lotes:",
          {
            status:
              response.status,

            result,

            payload: {
              ...leadData,

              msj_client:
                clientMetadata,
            },
          }
        );

        showToast({
          variant: "error",
          title:
            friendlyError.title,
          message:
            friendlyError.message,
        });

        return;
      }

      form.reset();

      showToast(
        SUCCESS_TOAST
      );
    } catch (error) {
      console.error(
        "Error enviando formulario de Lotes:",
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
            "La solicitud superó los 20 segundos de espera.",
        });

        return;
      }

      showToast(ERROR_TOAST);
    } finally {
      window.clearTimeout(
        timeoutId
      );

      submitLockRef.current = false;
      setIsSending(false);
    }
  };

  return (
    <>
      <section
        className={styles.section}
        id="asesoria"
        aria-labelledby="lotes-lead-title"
      >
        <div className={styles.content}>
          <span>
            Asesoría personalizada
          </span>

          <h2 id="lotes-lead-title">
            Encuentra el lote ideal para ti
          </h2>

          <p>
            Déjanos tus datos y un asesor te ayudará a
            elegir la mejor opción según tu presupuesto,
            ubicación y objetivo de inversión.
          </p>

          <div className={styles.benefits}>
            <div>
              <strong>
                Opciones para vivir
              </strong>

              <span>
                Encuentra espacios para construir tu
                futuro hogar.
              </span>
            </div>

            <div>
              <strong>
                Opciones para invertir
              </strong>

              <span>
                Conoce proyectos ubicados en zonas con
                proyección de crecimiento.
              </span>
            </div>

            <div>
              <strong>
                Asesoría personalizada
              </strong>

              <span>
                Recibe información sobre precios,
                disponibilidad y financiamiento.
              </span>
            </div>
          </div>
        </div>

        <form
          className={styles.form}
          onSubmit={handleSubmit}
        >
          <div
            className={
              styles.formHeader
            }
          >
            <span>
              Solicita información
            </span>

            <strong>
              Quiero encontrar un lote
            </strong>

            <p>
              Completa tus datos y un asesor de Ancosur
              se comunicará contigo.
            </p>
          </div>

          <div className={styles.formGrid}>
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
                title="Ingresa tu nombre usando letras y espacios."
                disabled={isSending}
                required
              />
            </label>

            <label>
              Celular

              <input
                type="tel"
                name="phone"
                placeholder="Ej. 987654321"
                inputMode="numeric"
                autoComplete="tel"
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
              Correo electrónico opcional

              <input
                type="email"
                name="email"
                placeholder="Ej. correo@gmail.com"
                autoComplete="email"
                maxLength={120}
                title="Ingresa un correo válido o deja el campo vacío."
                disabled={isSending}
              />
            </label>

            <label>
              Estoy buscando

              <select
                name="interest"
                defaultValue=""
                disabled={isSending}
                required
              >
                <option
                  value=""
                  disabled
                >
                  Selecciona una opción
                </option>

                <option value="Lote para vivir">
                  Lote para vivir
                </option>

                <option value="Lote para invertir">
                  Lote para invertir
                </option>

                <option value="Lote para construir">
                  Lote para construir
                </option>

                <option value="Asesoría personalizada">
                  Asesoría personalizada
                </option>
              </select>
            </label>
          </div>

          <label
            className={
              styles.messageField
            }
          >
            Mensaje opcional

            <textarea
              name="message"
              placeholder="Cuéntanos qué ubicación, presupuesto o tipo de lote estás buscando."
              rows={4}
              maxLength={250}
              disabled={isSending}
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
              Acepto ser contactado por Ancosur para
              recibir información comercial sobre sus
              proyectos de lotes.
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
              : "Quiero que me contacten"}

            <ArrowRightIcon
              size={18}
              weight="bold"
              aria-hidden={true}
            />
          </button>
        </form>
      </section>

      <FeedbackToast
        key={toast?.id}
        open={toast !== null}
        variant={
          toast?.variant ?? "info"
        }
        title={
          toast?.title ?? ""
        }
        message={
          toast?.message ?? ""
        }
        onClose={closeToast}
      />
    </>
  );
}