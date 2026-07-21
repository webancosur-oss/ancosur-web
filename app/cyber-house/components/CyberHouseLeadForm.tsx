"use client";

import {
  CalendarCheckIcon,
  EnvelopeSimpleIcon,
  PaperPlaneTiltIcon,
  PhoneIcon,
  UserIcon,
} from "@phosphor-icons/react";
import {
  useCallback,
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

type FormDataState = {
  fullName: string;
  phone: string;
  email: string;
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

type ApiResponse = {
  success?: boolean;
  response?: string;
  message?: string;
  data?: unknown;
};

type ToastState =
  FeedbackToastData & {
    id: number;
  };

const INITIAL_FORM: FormDataState = {
  fullName: "",
  phone: "",
  email: "",
  project: "",
  visitTime: "",
  message: "",
  consent: true,
  website: "",
};

const SUCCESS_TOAST: FeedbackToastData = {
  variant: "success",
  title:
    "¡Registro enviado correctamente!",
  message:
    "Un asesor de ANCOSUR se comunicará contigo para confirmar tu atención.",
};

const ERROR_TOAST: FeedbackToastData = {
  variant: "error",
  title:
    "No pudimos enviar tus datos",
  message:
    "Verifica tu conexión e inténtalo nuevamente.",
};

const readApiResponse = async (
  response: Response
): Promise<ApiResponse> => {
  const contentType =
    response.headers.get(
      "content-type"
    );

  if (
    contentType?.includes(
      "application/json"
    )
  ) {
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

  const responseText =
    await response.text();

  return {
    success: response.ok,
    message:
      responseText ||
      "No se recibió una respuesta de la API.",
  };
};

export default function CyberHouseLeadForm() {
  const [formData, setFormData] =
    useState<FormDataState>(
      INITIAL_FORM
    );

  const [errors, setErrors] =
    useState<FormErrors>({});

  const [
    isSending,
    setIsSending,
  ] = useState(false);

  const [toast, setToast] =
    useState<ToastState | null>(
      null
    );

  const closeToast =
    useCallback(() => {
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
    K extends keyof FormDataState,
  >(
    field: K,
    value: FormDataState[K]
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

  const validateForm = (
    form: HTMLFormElement
  ): boolean => {
    const newErrors: FormErrors =
      {};

    const fullName =
      formData.fullName.trim();

    const phone =
      formData.phone.replace(
        /\D/g,
        ""
      );

    const email =
      formData.email
        .trim()
        .toLowerCase();

    const nameRegex =
      /^[A-Za-zÁÉÍÓÚáéíóúÑñÜü.' -]{3,80}$/;

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    if (!fullName) {
      newErrors.fullName =
        "Ingresa tu nombre completo.";
    } else if (
      !nameRegex.test(fullName)
    ) {
      newErrors.fullName =
        "Ingresa un nombre válido.";
    }

    if (!phone) {
      newErrors.phone =
        "Ingresa tu número de celular.";
    } else if (
      !/^9\d{8}$/.test(phone)
    ) {
      newErrors.phone =
        "El celular debe tener 9 dígitos y empezar con 9.";
    }

    if (
      email &&
      !emailRegex.test(email)
    ) {
      newErrors.email =
        "Ingresa un correo válido.";
    }

    if (!formData.project) {
      newErrors.project =
        "Selecciona un proyecto.";
    }

    setErrors(newErrors);

    const errorFields =
      Object.keys(
        newErrors
      ) as Array<
        keyof FormDataState
      >;

    const firstError =
      errorFields[0];

    if (firstError) {
      requestAnimationFrame(() => {
        const element =
          form.elements.namedItem(
            firstError
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

      showToast({
        variant: "error",
        title: "Revisa tus datos",
        message:
          newErrors[firstError] ||
          "Completa correctamente el formulario.",
      });
    }

    return (
      errorFields.length === 0
    );
  };

  const handleSubmit = async (
  event: FormEvent<HTMLFormElement>
) => {
  event.preventDefault();

  if (isSending) {
    return;
  }

  const form = event.currentTarget;

  if (formData.website) {
    return;
  }

  if (!validateForm(form)) {
    return;
  }

  const fullName = formData.fullName.trim();

  const phone = formData.phone.replace(
    /\D/g,
    ""
  );

  const email = formData.email
    .trim()
    .toLowerCase();

  const project = formData.project.trim();

  const visitTime =
    formData.visitTime.trim();

  const additionalMessage =
    formData.message.trim();

  const leadPayload = {
    nombres_completos: fullName,

    telefono: phone,

    email,

    proyecto_interes: project,

    categoria_interes:
      "Cyber House",

    fuente_prospeccion: "Web",

    mensaje:
      `Registro para Cyber House ANCOSUR. Proyecto de interés: ${project}. Horario estimado de visita: ${
        visitTime || "Por coordinar"
      }.${
        additionalMessage
          ? ` Mensaje: ${additionalMessage}`
          : ""
      }`,

    origen_ruta:
      window.location.pathname,

    origen_componente:
      "Formulario Cyber House",
  };

  try {
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
        body: JSON.stringify(
          leadPayload
        ),
      }
    );

    const result =
      await readApiResponse(response);

    if (
      !response.ok ||
      result?.success === false
    ) {
      const resultData =
        result?.data as
          | { error?: string }
          | undefined;

      const apiMessage =
        result?.message ||
        resultData?.error ||
        `No se pudo enviar la solicitud. Código ${response.status}.`;

      showToast({
        variant: "error",
        title:
          "No pudimos registrar tu asistencia",
        message: String(apiMessage),
      });

      return;
    }

    setFormData(INITIAL_FORM);
    setErrors({});

    showToast(SUCCESS_TOAST);
  } catch {
    showToast({
      variant: "error",
      title:
        "No pudimos conectar con la API",
      message:
        "Revisa tu conexión o intenta nuevamente en unos minutos.",
    });
  } finally {
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
              Reserva tu atención
            </span>

            <h2>
              Regístrate para el Cyber
              House ANCOSUR
            </h2>

            <p>
              Completa tus datos para
              recibir asesoría sobre el
              proyecto que más te
              interesa.
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
            noValidate
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
                Formulario de registro
              </span>

              <strong>
                Quiero participar
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
                    placeholder="Ej. Angela Huayra"
                    autoComplete="name"
                    minLength={3}
                    maxLength={80}
                    value={
                      formData.fullName
                    }
                    onChange={(event) =>
                      updateField(
                        "fullName",
                        event.target.value
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
                    maxLength={9}
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
                  Horario aproximado
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
                >
                  <option value="">
                    Por coordinar
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
                  maxLength={300}
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
                  /300
                </small>
              </div>
            </div>

            <label className={styles.checkbox}>
              <input
                type="checkbox"
                name="consent"
                checked
                readOnly
              />

              <span>
                Acepto ser contactado por ANCOSUR para recibir información sobre el
                Cyber House y sus proyectos.
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
                : "Registrar mi asistencia"}

              <PaperPlaneTiltIcon
                size={20}
                weight="bold"
                aria-hidden="true"
              />
            </button>

            <p className={styles.note}>
              El registro no representa
              una reserva o compra
              obligatoria.
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
