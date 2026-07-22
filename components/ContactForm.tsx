"use client";

import {
  BuildingsIcon,
  EnvelopeSimpleIcon,
  MapPinIcon,
  PaperPlaneTiltIcon,
  PhoneIcon,
  UserIcon,
  WhatsappLogoIcon,
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

import styles from "./ContactForm.module.css";

type LeadFormData = {
  fullName: string;
  phone: string;
  email: string;
  interest: string;
  message: string;
  consent: boolean;
  website: string;
};

type LeadFormErrors = Partial<
  Record<
    keyof LeadFormData,
    string
  >
>;

type ContactFormProps = {
  id?: string;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  campaign?: string;
};

type ToastState =
  FeedbackToastData & {
    id: number;
  };

type ApiResponse = {
  success?: boolean;
  response?: string;
  message?: string;
  data?: unknown;
  [key: string]: unknown;
};

const initialFormData: LeadFormData = {
  fullName: "",
  phone: "",
  email: "",
  interest: "",
  message: "",
  consent: true,
  website: "",
};

const SUCCESS_TOAST: FeedbackToastData = {
  variant: "success",
  title:
    "¡Datos enviados correctamente!",
  message:
    "Un asesor de ANCOSUR se comunicará contigo pronto.",
};

const ERROR_TOAST: FeedbackToastData = {
  variant: "error",
  title:
    "No pudimos enviar tus datos",
  message:
    "Verifica tu conexión e inténtalo nuevamente.",
};

const interestOptions = [
  "Departamentos",
  "Lotes",
  "Inversión inmobiliaria",
  "Entrega inmediata",
  "Preventa",
  "Campaña vigente",
] as const;

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

export default function ContactForm({
  id = "contactar",
  eyebrow = "Contáctanos",
  title =
    "Encuentra el proyecto ideal para ti",
  subtitle =
    "Déjanos tus datos y un asesor de ANCOSUR se comunicará contigo para brindarte mayor información.",
  campaign =
    "contacto-web-general",
}: ContactFormProps) {
  const [
    formData,
    setFormData,
  ] = useState<LeadFormData>(
    initialFormData
  );

  const [
    errors,
    setErrors,
  ] = useState<LeadFormErrors>(
    {}
  );

  const [
    isSending,
    setIsSending,
  ] = useState(false);

  const [
    toast,
    setToast,
  ] = useState<ToastState | null>(
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

  const validateForm = () => {
    const newErrors: LeadFormErrors =
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

    const message =
      formData.message.trim();

    const nameRegex =
      /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]{3,70}$/;

    const phoneRegex =
      /^9\d{8}$/;

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
      !phoneRegex.test(phone)
    ) {
      newErrors.phone =
        "El celular debe tener 9 dígitos y empezar con 9.";
    }

    /*
     * El correo es opcional.
     * Solo se valida cuando el usuario
     * escribe un correo.
     */
    if (
      email &&
      !emailRegex.test(email)
    ) {
      newErrors.email =
        "Ingresa un correo válido.";
    }

    if (!formData.interest) {
      newErrors.interest =
        "Selecciona una opción de interés.";
    }

    if (message.length > 250) {
      newErrors.message =
        "El mensaje no debe superar los 250 caracteres.";
    }

    if (!formData.consent) {
      newErrors.consent =
        "Debes aceptar ser contactado.";
    }

    setErrors(newErrors);

    return (
      Object.keys(newErrors)
        .length === 0
    );
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

  const handleSubmit = async (
  event: FormEvent<HTMLFormElement>
) => {
  event.preventDefault();

  if (isSending) {
    return;
  }

  /*
   * Campo honeypot contra bots.
   */
  if (formData.website) {
    return;
  }

  if (!validateForm()) {
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

  const interest = formData.interest.trim();

  const message = formData.message.trim();

  const leadPayload = {
    nombres_completos: fullName,
    telefono: phone,
    email,
    proyecto_interes: interest,
    categoria_interes: interest,
    fuente_prospeccion: "Web",
    mensaje:
      message ||
      "Solicitud de información enviada desde el formulario de contacto.",
    origen_ruta: window.location.pathname,
    origen_componente: `Formulario ${title} - ${campaign}`,
  };

  try {
    setIsSending(true);
    setToast(null);
    setErrors({});

    const response = await fetch("/api/leads", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(leadPayload),
    });

    const result = await readApiResponse(response);

    if (!response.ok || result.success === false) {
      console.error("Error API leads:", result);

      showToast({
        variant: "error",
        title: "No pudimos enviar tus datos",
        message:
          result.message ||
          "Verifica la información e inténtalo nuevamente.",
      });

      return;
    }

    setFormData(initialFormData);
    setErrors({});

    showToast(SUCCESS_TOAST);
  } catch (error) {
    console.error(
      "Error enviando formulario de contacto:",
      error
    );

    showToast(ERROR_TOAST);
  } finally {
    setIsSending(false);
  }
};

  return (
    <>
      <section
        id={id}
        className={
          styles.contactSection
        }
      >
        <div
          className={
            styles.container
          }
        >
          <div
            className={
              styles.infoSide
            }
          >
            <span
              className={
                styles.eyebrow
              }
            >
              {eyebrow}
            </span>

            <h2>{title}</h2>

            <p>{subtitle}</p>

            <div
              className={
                styles.infoCards
              }
            >
              <div
                className={
                  styles.infoCard
                }
              >
                <span
                  className={
                    styles.iconBox
                  }
                >
                  <WhatsappLogoIcon
                    size={22}
                    weight="bold"
                    aria-hidden={
                      true
                    }
                  />
                </span>

                <div>
                  <strong>
                    WhatsApp
                  </strong>

                  <small>
                    Atención rápida con
                    un asesor comercial.
                  </small>
                </div>
              </div>

              <div
                className={
                  styles.infoCard
                }
              >
                <span
                  className={
                    styles.iconBox
                  }
                >
                  <MapPinIcon
                    size={22}
                    weight="bold"
                    aria-hidden={
                      true
                    }
                  />
                </span>

                <div>
                  <strong>
                    Ubicación
                  </strong>

                  <small>
                    Proyectos en
                    Huancayo, El Tambo
                    y más zonas.
                  </small>
                </div>
              </div>

              <div
                className={
                  styles.infoCard
                }
              >
                <span
                  className={
                    styles.iconBox
                  }
                >
                  <BuildingsIcon
                    size={22}
                    weight="bold"
                    aria-hidden={
                      true
                    }
                  />
                </span>

                <div>
                  <strong>
                    Asesoría
                    inmobiliaria
                  </strong>

                  <small>
                    Te ayudamos a
                    elegir según tu
                    presupuesto.
                  </small>
                </div>
              </div>
            </div>
          </div>

          <div
            className={
              styles.formSide
            }
          >
            <form
              className={
                styles.form
              }
              onSubmit={
                handleSubmit
              }
              noValidate
            >
              <input
                className={
                  styles.honeypot
                }
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                value={
                  formData.website
                }
                onChange={(
                  event
                ) =>
                  updateField(
                    "website",
                    event.target.value
                  )
                }
                disabled={
                  isSending
                }
                aria-hidden="true"
              />

              <div
                className={
                  styles.formHeader
                }
              >
                <span>
                  Formulario de
                  contacto
                </span>

                <strong>
                  Quiero más
                  información
                </strong>
              </div>

              <div
                className={
                  styles.field
                }
              >
                <label
                  htmlFor="fullName"
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
                    aria-hidden={
                      true
                    }
                  />

                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    placeholder="Ej. Angela Huayra"
                    autoComplete="name"
                    minLength={3}
                    maxLength={70}
                    value={
                      formData.fullName
                    }
                    onChange={(
                      event
                    ) =>
                      updateField(
                        "fullName",
                        event.target
                          .value
                      )
                    }
                    disabled={
                      isSending
                    }
                    required
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
                className={
                  styles.twoColumns
                }
              >
                <div
                  className={
                    styles.field
                  }
                >
                  <label
                    htmlFor="phone"
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
                      aria-hidden={
                        true
                      }
                    />

                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="987654321"
                      autoComplete="tel"
                      inputMode="numeric"
                      pattern="9[0-9]{8}"
                      minLength={9}
                      maxLength={9}
                      value={
                        formData.phone
                      }
                      onChange={(
                        event
                      ) =>
                        updateField(
                          "phone",
                          event.target.value
                            .replace(
                              /\D/g,
                              ""
                            )
                            .slice(
                              0,
                              9
                            )
                        )
                      }
                      disabled={
                        isSending
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
                      {
                        errors.phone
                      }
                    </small>
                  )}
                </div>

                <div
                  className={
                    styles.field
                  }
                >
                  <label
                    htmlFor="email"
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
                      aria-hidden={
                        true
                      }
                    />

                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="correo@gmail.com"
                      autoComplete="email"
                      maxLength={120}
                      value={
                        formData.email
                      }
                      onChange={(
                        event
                      ) =>
                        updateField(
                          "email",
                          event.target
                            .value
                        )
                      }
                      disabled={
                        isSending
                      }
                    />
                  </div>

                  {errors.email && (
                    <small
                      className={
                        styles.error
                      }
                    >
                      {
                        errors.email
                      }
                    </small>
                  )}
                </div>
              </div>

              <div
                className={
                  styles.field
                }
              >
                <label
                  htmlFor="interest"
                >
                  Estoy interesado en
                </label>

                <select
                  id="interest"
                  name="interest"
                  value={
                    formData.interest
                  }
                  onChange={(
                    event
                  ) =>
                    updateField(
                      "interest",
                      event.target.value
                    )
                  }
                  disabled={
                    isSending
                  }
                  required
                >
                  <option value="">
                    Selecciona una
                    opción
                  </option>

                  {interestOptions.map(
                    (option) => (
                      <option
                        key={
                          option
                        }
                        value={
                          option
                        }
                      >
                        {option}
                      </option>
                    )
                  )}
                </select>

                {errors.interest && (
                  <small
                    className={
                      styles.error
                    }
                  >
                    {
                      errors.interest
                    }
                  </small>
                )}
              </div>

              <div
                className={
                  styles.field
                }
              >
                <label
                  htmlFor="message"
                >
                  Mensaje opcional
                </label>

                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  maxLength={250}
                  placeholder="Cuéntanos qué proyecto te interesa o cuándo deseas que te contactemos."
                  value={
                    formData.message
                  }
                  onChange={(
                    event
                  ) =>
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

              <label
                className={
                  styles.checkbox
                }
              >
                <input
                  type="checkbox"
                  name="consent"
                  checked={
                    formData.consent
                  }
                  onChange={(
                    event
                  ) =>
                    updateField(
                      "consent",
                      event.target
                        .checked
                    )
                  }
                  disabled={
                    isSending
                  }
                  required
                />

                <span>
                  Acepto ser contactado
                  por ANCOSUR para
                  recibir información
                  comercial sobre sus
                  proyectos
                  inmobiliarios.
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
                  : "Enviar datos"}

                <PaperPlaneTiltIcon
                  size={20}
                  weight="bold"
                  aria-hidden={
                    true
                  }
                />
              </button>
            </form>
          </div>
        </div>
      </section>

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
    </>
  );
}