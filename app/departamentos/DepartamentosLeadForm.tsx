"use client";

import {
  ArrowRightIcon,
  BuildingsIcon,
  EnvelopeSimpleIcon,
  PhoneIcon,
  UserIcon,
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

import styles from "./DepartamentosPage.module.css";

const SOURCE_ID = 4 as const;
const CAMPAIGN_CODE = "DEP";
const AD_NAME = "Web";
const LEAD_TYPE = "WEB ANCOSUR";
const COMPONENT_NAME = "DepartamentosLeadForm";
const REQUEST_TIMEOUT = 20_000;

type LeadFormData = {
  fullName: string;
  phone: string;
  email: string;
  project: string;
  consent: boolean;
};

type LeadFormErrors = Partial<
  Record<keyof LeadFormData, string>
>;

type ToastState = FeedbackToastData & {
  id: number;
};

type ProjectOption = {
  value: string;
  label: string;
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

const initialFormData: LeadFormData = {
  fullName: "",
  phone: "",
  email: "",
  project: "",
  consent: true,
};

const projectOptions: ProjectOption[] = [
  {
    value: "Neo Xport",
    label: "Neo Xport",
  },
  {
    value: "Neo Rivera",
    label: "Neo Rivera",
  },
  {
    value: "Neo Eterna",
    label: "Neo Eterna",
  },
  {
    value: "Neo Balto",
    label: "Neo Balto",
  },
  {
    value: "Neo Emperatriz",
    label: "Neo Emperatriz",
  },
  {
    value: "Distrito San Carlos",
    label: "Distrito San Carlos",
  },
  {
    value: "Por definir",
    label: "Aún no sé qué proyecto elegir",
  },
];

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
  const responseText = await response.text();

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
    normalized.includes("sqlstate[22001]") ||
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
        "Revisa el nombre, celular, correo y proyecto.",
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

  if (status === 408 || status === 504) {
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
      title: "No se pudieron procesar los datos",
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

export default function DepartamentosLeadForm() {
  const [formData, setFormData] =
    useState<LeadFormData>(initialFormData);

  const [errors, setErrors] =
    useState<LeadFormErrors>({});

  const [isSending, setIsSending] =
    useState(false);

  /*
   * Bloqueo inmediato para evitar dos solicitudes
   * cuando el usuario hace doble clic.
   */
  const submitLockRef = useRef(false);

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

  const updateField = <
    K extends keyof LeadFormData,
  >(
    field: K,
    value: LeadFormData[K]
  ) => {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [field]: undefined,
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: LeadFormErrors = {};

    const fullName =
      formData.fullName
        .replace(/\s+/g, " ")
        .trim();

    const phone =
      formData.phone.replace(/\D/g, "");

    const email =
      formData.email.trim().toLowerCase();

    const nameRegex =
      /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s.'’-]{3,70}$/;

    const phoneRegex = /^9\d{8}$/;

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    if (!fullName) {
      newErrors.fullName =
        "Ingresa tu nombre completo.";
    } else if (!nameRegex.test(fullName)) {
      newErrors.fullName =
        "Ingresa un nombre válido.";
    }

    if (!phone) {
      newErrors.phone =
        "Ingresa tu número de celular.";
    } else if (!phoneRegex.test(phone)) {
      newErrors.phone =
        "El celular debe tener 9 dígitos y empezar con 9.";
    }

    /*
     * El correo es opcional.
     * Se valida solamente cuando tiene contenido.
     */
    if (
      email &&
      !emailRegex.test(email)
    ) {
      newErrors.email =
        "Ingresa un correo válido o deja el campo vacío.";
    }

    if (!formData.project.trim()) {
      newErrors.project =
        "Selecciona un proyecto.";
    }

    if (!formData.consent) {
      newErrors.consent =
        "Debes aceptar el contacto comercial.";
    }

    setErrors(newErrors);

    const errorMessage =
      newErrors.fullName ||
      newErrors.phone ||
      newErrors.email ||
      newErrors.project ||
      newErrors.consent;

    if (errorMessage) {
      showToast({
        variant: "error",
        title: "Revisa tus datos",
        message: errorMessage,
      });
    }

    return (
      Object.keys(newErrors).length === 0
    );
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

    const isValid = validateForm();

    if (!isValid) {
      return;
    }

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

    const projectName =
      formData.project.trim();

    /*
     * Se conserva el proyecto seleccionado porque
     * es uno de los campos reales del formulario.
     *
     * No se genera mensaje automático.
     * No se envía comentario desde el componente.
     */
    const clientMetadata = {
      interes: projectName,
      origenRuta: window.location.pathname,
      origenComponente: COMPONENT_NAME,
      tipoLead: LEAD_TYPE,
    };

    const leadPayload = {
      fuente_id: SOURCE_ID,
      telefono: phone,
      nombre: fullName,
      email,
      dni: "",
      campaña: CAMPAIGN_CODE,
      anuncio: AD_NAME,
      msj_client:
        JSON.stringify(clientMetadata),
    };

    const controller =
      new AbortController();

    const timeoutId =
      window.setTimeout(() => {
        controller.abort();
      }, REQUEST_TIMEOUT);

    try {
      submitLockRef.current = true;
      setIsSending(true);
      setToast(null);

      const response = await fetch(
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
            JSON.stringify(leadPayload),

          signal:
            controller.signal,
        }
      );

      const result =
        await readApiResponse(response);

      const requestFailed =
        !response.ok ||
        hasApiFailure(result);

      if (requestFailed) {
        const serverMessage =
          extractApiMessage(result);

        console.error(
          "Error API Departamentos:",
          {
            status: response.status,
            result,
            serverMessage,
            payload: {
              fuente_id: SOURCE_ID,
              telefono: phone,
              nombre: fullName,
              email: email || "",
              dni: "",
              campaña: CAMPAIGN_CODE,
              anuncio: AD_NAME,
              msj_client: clientMetadata,
            },
          }
        );

        const friendlyError =
          getFriendlyServerError(
            response.status,
            result
          );

        showToast({
          variant: "error",
          title: friendlyError.title,
          message: friendlyError.message,
        });

        return;
      }

      setFormData(initialFormData);
      setErrors({});

      showToast({
        ...SUCCESS_TOAST,
        message:
          result.message ||
          SUCCESS_TOAST.message,
      });
    } catch (error) {
      console.error(
        "Error enviando formulario de Departamentos:",
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
      window.clearTimeout(timeoutId);
      submitLockRef.current = false;
      setIsSending(false);
    }
  };

  return (
    <>
      <form
        className={styles.leadForm}
        onSubmit={handleSubmit}
        noValidate
      >
        <div
          className={
            styles.leadFormHeader
          }
        >
          <span>
            Formulario
          </span>

          <strong>
            Recibe asesoría gratis
          </strong>

          <p>
            Déjanos tus datos y te ayudamos
            a elegir el departamento ideal.
          </p>
        </div>

        <div className={styles.formGrid}>
          <label className={styles.field}>
            Nombre completo

            <div
              className={styles.inputBox}
            >
              <UserIcon
                size={20}
                weight="bold"
                aria-hidden={true}
              />

              <input
                type="text"
                name="fullName"
                placeholder="Ej. Miguel Asto"
                autoComplete="name"
                minLength={3}
                maxLength={70}
                value={formData.fullName}
                disabled={isSending}
                aria-invalid={Boolean(
                  errors.fullName
                )}
                onChange={(event) =>
                  updateField(
                    "fullName",
                    event.target.value
                  )
                }
              />
            </div>

            {errors.fullName && (
              <small
                className={styles.error}
              >
                {errors.fullName}
              </small>
            )}
          </label>

          <label className={styles.field}>
            Celular

            <div
              className={styles.inputBox}
            >
              <PhoneIcon
                size={20}
                weight="bold"
                aria-hidden={true}
              />

              <input
                type="tel"
                name="phone"
                placeholder="Ej. 987654321"
                inputMode="numeric"
                autoComplete="tel"
                maxLength={9}
                value={formData.phone}
                disabled={isSending}
                aria-invalid={Boolean(
                  errors.phone
                )}
                onChange={(event) =>
                  updateField(
                    "phone",
                    event.target.value
                      .replace(/\D/g, "")
                      .slice(0, 9)
                  )
                }
              />
            </div>

            {errors.phone && (
              <small
                className={styles.error}
              >
                {errors.phone}
              </small>
            )}
          </label>

          <label className={styles.field}>
            Correo opcional

            <div
              className={styles.inputBox}
            >
              <EnvelopeSimpleIcon
                size={20}
                weight="bold"
                aria-hidden={true}
              />

              <input
                type="email"
                name="email"
                placeholder="Ej. correo@gmail.com"
                autoComplete="email"
                maxLength={120}
                value={formData.email}
                disabled={isSending}
                aria-invalid={Boolean(
                  errors.email
                )}
                onChange={(event) =>
                  updateField(
                    "email",
                    event.target.value
                  )
                }
              />
            </div>

            {errors.email && (
              <small
                className={styles.error}
              >
                {errors.email}
              </small>
            )}
          </label>

          <label className={styles.field}>
            Proyecto de interés

            <div
              className={styles.inputBox}
            >
              <BuildingsIcon
                size={20}
                weight="bold"
                aria-hidden={true}
              />

              <select
                name="project"
                value={formData.project}
                disabled={isSending}
                aria-invalid={Boolean(
                  errors.project
                )}
                onChange={(event) =>
                  updateField(
                    "project",
                    event.target.value
                  )
                }
              >
                <option value="">
                  Selecciona un proyecto
                </option>

                {projectOptions.map(
                  (project) => (
                    <option
                      key={project.value}
                      value={project.value}
                    >
                      {project.label}
                    </option>
                  )
                )}
              </select>
            </div>

            {errors.project && (
              <small
                className={styles.error}
              >
                {errors.project}
              </small>
            )}
          </label>
        </div>

        <label
          className={styles.checkbox}
        >
          <input
            type="checkbox"
            name="consent"
            checked={formData.consent}
            disabled={isSending}
            onChange={(event) =>
              updateField(
                "consent",
                event.target.checked
              )
            }
          />

          <span>
            Acepto ser contactado por
            ANCOSUR para recibir información
            comercial.
          </span>
        </label>

        {errors.consent && (
          <small className={styles.error}>
            {errors.consent}
          </small>
        )}

        <button
          type="submit"
          disabled={isSending}
          aria-busy={isSending}
        >
          {isSending
            ? "Enviando..."
            : "Quiero asesoría gratis"}

          <ArrowRightIcon
            size={18}
            weight="bold"
            aria-hidden={true}
          />
        </button>
      </form>

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