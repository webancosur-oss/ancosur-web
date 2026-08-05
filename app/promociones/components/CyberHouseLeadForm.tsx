"use client";

import {
  CalendarCheckIcon,
  EnvelopeSimpleIcon,
  IdentificationCardIcon,
  PaperPlaneTiltIcon,
  PhoneIcon,
  UserIcon,
} from "@phosphor-icons/react";
import {
  useCallback,
  useRef,
  useState,
} from "react";
import type {
  FormEvent,
} from "react";

import FeedbackToast, {
  type FeedbackToastData,
} from "@/components/ui/FeedbackToast/FeedbackToast";

import {
  cyberProjects,
} from "../data";

import styles from "./CyberHouseLeadForm.module.css";

const SOURCE_ID = 4 as const;
const CAMPAIGN_NAME =
  "Promociones Cyber House";
const AD_NAME = "Web";
const LEAD_TYPE = "WEB Ancosur";
const COMPONENT_NAME =
  "CyberHouseLeadForm";
const REQUEST_TIMEOUT = 20_000;

type FormDataState = {
  fullName: string;
  phone: string;
  email: string;
  dni: string;
  project: string;
  visitTime: string;
  message: string;
  consent: boolean;
  website: string;
};

type FormErrors = Partial<
  Record<
    keyof FormDataState,
    string
  >
>;

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

type ToastState =
  FeedbackToastData & {
    id: number;
  };

const INITIAL_FORM:
  FormDataState = {
    fullName: "",
    phone: "",
    email: "",
    dni: "",
    project: "",
    visitTime: "",
    message: "",
    consent: true,
    website: "",
  };

const SUCCESS_TOAST:
  FeedbackToastData = {
    variant: "success",

    title:
      "¡Visita solicitada correctamente!",

    message:
      "Gracias por tu interés en nuestras promociones. Un asesor de Ancosur se comunicará contigo para confirmar el horario de tu visita.",
  };

const ERROR_TOAST:
  FeedbackToastData = {
    variant: "error",

    title:
      "No pudimos enviar tus datos",

    message:
      "Verifica tu conexión e inténtalo nuevamente.",
  };

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

const validateForm = (
  formData: FormDataState,
): FormErrors => {
  const errors: FormErrors = {};

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
      .replace(/\D/g, "")
      .slice(0, 8);

  const message =
    formData.message.trim();

  const nameRegex =
    /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s.'’-]{3,80}$/;

  const phoneRegex =
    /^9\d{8}$/;

  const emailRegex =
    /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  const dniRegex =
    /^\d{8}$/;

  if (!nameRegex.test(fullName)) {
    errors.fullName =
      "Ingresa tu nombre usando únicamente letras y espacios.";
  }

  if (!phoneRegex.test(phone)) {
    errors.phone =
      "El celular debe tener 9 dígitos y comenzar con 9.";
  }

  if (
    email &&
    !emailRegex.test(email)
  ) {
    errors.email =
      "Ingresa un correo válido o deja el campo vacío.";
  }

  if (
    dni &&
    !dniRegex.test(dni)
  ) {
    errors.dni =
      "El número de documento debe tener exactamente 8 dígitos.";
  }

  if (!formData.project.trim()) {
    errors.project =
      "Selecciona el proyecto de tu interés.";
  }

  if (!formData.visitTime.trim()) {
    errors.visitTime =
      "Selecciona el horario para tu visita.";
  }

  if (message.length > 250) {
    errors.message =
      "El mensaje no debe superar los 250 caracteres.";
  }

  if (!formData.consent) {
    errors.consent =
      "Debes aceptar la autorización de contacto.";
  }

  return errors;
};

export default function CyberHouseLeadForm() {
  const [
    formData,
    setFormData,
  ] = useState<FormDataState>(
    INITIAL_FORM,
  );

  const [
    errors,
    setErrors,
  ] = useState<FormErrors>({});

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

  const updateField = <
    K extends keyof FormDataState,
  >(
    field: K,
    value: FormDataState[K],
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

    if (formData.website.trim()) {
      submitLockRef.current = false;
      return;
    }

    const validationErrors =
      validateForm(formData);

    setErrors(
      validationErrors,
    );

    const errorFields =
      Object.keys(
        validationErrors,
      ) as Array<
        keyof FormDataState
      >;

    const firstError =
      errorFields[0];

    if (firstError) {
      showToast({
        variant: "error",

        title:
          "Revisa tus datos",

        message:
          validationErrors[
            firstError
          ] ||
          "Completa correctamente el formulario.",
      });

      requestAnimationFrame(() => {
        const element =
          event.currentTarget.elements.namedItem(
            firstError,
          );

        if (
          element instanceof
          HTMLElement
        ) {
          element.focus();

          element.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }
      });

      submitLockRef.current = false;
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

    const dni =
      formData.dni
        .replace(/\D/g, "")
        .slice(0, 8);

    const project =
      formData.project.trim();

    const visitTime =
      formData.visitTime.trim();

    const message =
      formData.message.trim();

    /*
     * La campaña conserva únicamente su nombre.
     *
     * msj_client contiene una sola vez los datos
     * técnicos para identificar el origen del lead.
     *
     * comentario contiene únicamente el texto escrito
     * por el cliente y se omite cuando está vacío.
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
          project,

        horarioVisita:
          visitTime,
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
          "Error API promociones Cyber House:",
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
            "No pudimos separar tu visita",

          message:
            apiMessage ||
            "La API rechazó la solicitud. Revisa tus datos e inténtalo nuevamente.",
        });

        return;
      }

      setFormData(
        INITIAL_FORM,
      );

      setErrors({});

      showToast(
        SUCCESS_TOAST,
      );
    } catch (error) {
      console.error(
        "Error enviando promociones Cyber House:",
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

  return (
    <>
      <section
        className={styles.section}
        id="registro"
      >
        <div className={styles.inner}>
          <div className={styles.copy}>
            <span>
              Promociones especiales
            </span>

            <h2>
              Separa tu visita y conoce
              nuestras promociones
            </h2>

            <p>
              Completa tus datos, elige el
              proyecto y selecciona el
              horario en el que deseas
              recibir atención personalizada.
            </p>

            <div
              className={
                styles.benefits
              }
            >
              <div>
                <CalendarCheckIcon
                  size={22}
                  weight="bold"
                  aria-hidden="true"
                />

                <span>
                  Atención durante el
                  evento
                </span>
              </div>

              <div>
                <PhoneIcon
                  size={22}
                  weight="bold"
                  aria-hidden="true"
                />

                <span>
                  Confirmación por
                  teléfono
                </span>
              </div>
            </div>
          </div>

          <form
            className={styles.form}
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              name="website"
              value={
                formData.website
              }
              onChange={(event) =>
                updateField(
                  "website",
                  event.target.value
                )
              }
              className={
                styles.honeypot
              }
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
            />

            <div
              className={
                styles.formHeader
              }
            >
              <span>
                Formulario de promociones
              </span>

              <strong>
                Quiero separar mi visita
              </strong>
            </div>

            <div
              className={
                styles.formGrid
              }
            >
              <div
                className={styles.field}
              >
                <label
                  htmlFor="cyber-fullName"
                >
                  Nombre completo
                </label>

                <div
                  className={
                    styles.inputWrap
                  }
                >
                  <UserIcon
                    size={20}
                    weight="bold"
                    aria-hidden="true"
                  />

                  <input
                    id="cyber-fullName"
                    name="fullName"
                    type="text"
                    placeholder="Ej. Miguel Asto"
                    autoComplete="name"
                    minLength={3}
                    maxLength={80}
                    pattern="[A-Za-zÁÉÍÓÚáéíóúÑñÜü.'’ -]{3,80}"
                    title="Ingresa tu nombre usando únicamente letras y espacios."
                    value={
                      formData.fullName
                    }
                    onChange={(event) =>
                      updateField(
                        "fullName",
                        event.target.value
                          .replace(
                            /[^a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s.'’-]/g,
                            ""
                          )
                          .replace(
                            /\s{2,}/g,
                            " "
                          )
                          .slice(0, 80)
                      )
                    }
                    disabled={
                      isSending
                    }
                    aria-invalid={
                      Boolean(
                        errors.fullName
                      )
                    }
                  />
                </div>

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

              <div
                className={styles.field}
              >
                <label
                  htmlFor="cyber-phone"
                >
                  Celular
                </label>

                <div
                  className={
                    styles.inputWrap
                  }
                >
                  <PhoneIcon
                    size={20}
                    weight="bold"
                    aria-hidden="true"
                  />

                  <input
                    id="cyber-phone"
                    name="phone"
                    type="tel"
                    placeholder="987654321"
                    autoComplete="tel"
                    inputMode="numeric"
                    pattern="9[0-9]{8}"
                    minLength={9}
                    maxLength={9}
                    title="Ingresa un celular peruano de 9 dígitos que empiece con 9." 
                    value={
                      formData.phone
                    }
                    onChange={(event) =>
                      updateField(
                        "phone",
                        event.target.value
                          .replace(
                            /\D/g,
                            ""
                          )
                          .slice(0, 9)
                      )
                    }
                    disabled={
                      isSending
                    }
                    aria-invalid={
                      Boolean(
                        errors.phone
                      )
                    }
                    required
                  />
                </div>

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
                <label
                  htmlFor="cyber-email"
                >
                  Correo opcional
                </label>

                <div
                  className={
                    styles.inputWrap
                  }
                >
                  <EnvelopeSimpleIcon
                    size={20}
                    weight="bold"
                    aria-hidden="true"
                  />

                  <input
                    id="cyber-email"
                    name="email"
                    type="email"
                    placeholder="correo@gmail.com"
                    autoComplete="email"
                    maxLength={120}
                    value={
                      formData.email
                    }
                    onChange={(event) =>
                      updateField(
                        "email",
                        event.target.value
                      )
                    }
                    disabled={
                      isSending
                    }
                    aria-invalid={
                      Boolean(
                        errors.email
                      )
                    }
                  />
                </div>

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


              <div
                className={styles.field}
              >
                <label
                  htmlFor="cyber-dni"
                >
                  Número de documento opcional
                </label>

                <div
                  className={
                    styles.inputWrap
                  }
                >
                  <IdentificationCardIcon
                    size={20}
                    weight="bold"
                    aria-hidden="true"
                  />

                  <input
                    id="cyber-dni"
                    name="dni"
                    type="text"
                    placeholder="12345678"
                    autoComplete="off"
                    inputMode="numeric"
                    pattern="[0-9]{8}"
                    minLength={8}
                    maxLength={8}
                    title="Ingresa un número de documento de 8 dígitos o deja el campo vacío."
                    value={
                      formData.dni
                    }
                    onChange={(event) =>
                      updateField(
                        "dni",
                        event.target.value
                          .replace(
                            /\D/g,
                            ""
                          )
                          .slice(0, 8)
                      )
                    }
                    disabled={
                      isSending
                    }
                    aria-invalid={
                      Boolean(
                        errors.dni
                      )
                    }
                  />
                </div>

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

              <div
                className={styles.field}
              >
                <label
                  htmlFor="cyber-project"
                >
                  Proyecto de interés
                </label>

                <select
                  id="cyber-project"
                  name="project"
                  value={
                    formData.project
                  }
                  onChange={(event) =>
                    updateField(
                      "project",
                      event.target.value
                    )
                  }
                  disabled={
                    isSending
                  }
                  aria-invalid={
                    Boolean(
                      errors.project
                    )
                  }
                  required
                >
                  <option value="">
                    Selecciona un
                    proyecto
                  </option>

                  {cyberProjects.map(
                    (project) => (
                      <option
                        key={
                          project.id
                        }
                        value={
                          project.name
                        }
                      >
                        {project.name}
                      </option>
                    )
                  )}

                  <option value="Aún no estoy seguro">
                    Aún no estoy seguro
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
                <label
                  htmlFor="cyber-visitTime"
                >
                  Horario para tu visita
                </label>

                <select
                  id="cyber-visitTime"
                  name="visitTime"
                  value={
                    formData.visitTime
                  }
                  onChange={(event) =>
                    updateField(
                      "visitTime",
                      event.target.value
                    )
                  }
                  disabled={
                    isSending
                  }
                  aria-invalid={
                    Boolean(
                      errors.visitTime
                    )
                  }
                  required
                >
                  <option
                    value=""
                    disabled
                  >
                    Selecciona un horario
                  </option>

                  <option value="10:00 a. m. a 12:00 p. m.">
                    10:00 a. m. a
                    12:00 p. m.
                  </option>

                  <option value="12:00 p. m. a 2:00 p. m.">
                    12:00 p. m. a
                    2:00 p. m.
                  </option>

                  <option value="2:00 p. m. a 5:00 p. m.">
                    2:00 p. m. a
                    5:00 p. m.
                  </option>
                </select>

                {errors.visitTime && (
                  <small
                    className={
                      styles.error
                    }
                  >
                    {errors.visitTime}
                  </small>
                )}
              </div>

              <div
                className={`${styles.field} ${styles.fieldFull}`}
              >
                <label
                  htmlFor="cyber-message"
                >
                  Mensaje opcional
                </label>

                <textarea
                  id="cyber-message"
                  name="message"
                  rows={4}
                  maxLength={250}
                  placeholder="Cuéntanos qué tipo de propiedad buscas."
                  value={
                    formData.message
                  }
                  onChange={(event) =>
                    updateField(
                      "message",
                      event.target.value
                    )
                  }
                  disabled={
                    isSending
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
                  /250
                </small>
              </div>
            </div>

            <label className={styles.checkbox}>
              <input
                type="checkbox"
                name="consent"
                checked={
                  formData.consent
                }
                onChange={(event) =>
                  updateField(
                    "consent",
                    event.target.checked
                  )
                }
                disabled={
                  isSending
                }
                required
              />

              <span>
                Acepto ser contactado por Ancosur para recibir información sobre
                promociones, proyectos y coordinación de mi visita.
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
              disabled={
                isSending
              }
              aria-busy={
                isSending
              }
            >
              {isSending
                ? "Enviando..."
                : "Separar mi visita"}

              <PaperPlaneTiltIcon
                size={20}
                weight="bold"
                aria-hidden="true"
              />
            </button>

            <p className={styles.note}>
              La solicitud no representa
              una compra obligatoria.
              Un asesor confirmará tu visita.
            </p>
          </form>
        </div>
      </section>

      <FeedbackToast
        key={toast?.id}
        open={toast !== null}
        variant={
          toast?.variant ?? "info"
        }
        title={toast?.title ?? ""}
        message={
          toast?.message ?? ""
        }
        onClose={closeToast}
      />
    </>
  );
}