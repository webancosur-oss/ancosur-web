"use client";

import {
  ArrowRightIcon,
  DownloadSimpleIcon,
} from "@phosphor-icons/react";
import Link from "next/link";
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
  brochureCaminoReal,
  details,
  facts,
  projectDescription,
  projectFormData,
} from "../data";

import styles from "./CaminoRealOverviewSection.module.css";

const SOURCE_ID = 4 as const;

const PROJECT_NAME =
  projectFormData.projectName ||
  "Camino Real";

type ToastState =
  FeedbackToastData & {
    id: number;
  };

type ApiResponse = {
  success?: boolean;
  response?: string;
  message?: string;
  error?: string;
  data?: unknown;
  [key: string]: unknown;
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
      const data: unknown =
        await response.json();

      if (
        typeof data === "object" &&
        data !== null &&
        !Array.isArray(data)
      ) {
        return data as ApiResponse;
      }

      return {
        success: response.ok,
        data,
      };
    } catch {
      return {
        success: false,
        message:
          "La API devolvió una respuesta JSON no válida.",
      };
    }
  }

  const responseText =
    await response.text();

  return {
    success: response.ok,
    message:
      responseText ||
      (response.ok
        ? "Solicitud procesada correctamente."
        : "No se recibió una respuesta válida de la API."),
  };
};

export default function CaminoRealOverviewSection() {
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

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (isSending) {
      return;
    }

    const form =
      event.currentTarget;

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const formData =
      new FormData(form);

    const fullName =
      String(
        formData.get(
          "fullName"
        ) ?? ""
      ).trim();

    const phone =
      String(
        formData.get(
          "phone"
        ) ?? ""
      ).replace(/\D/g, "");

    const email =
      String(
        formData.get(
          "email"
        ) ?? ""
      )
        .trim()
        .toLowerCase();

    const selectedInterestValue =
      String(
        formData.get(
          "interest"
        ) ?? ""
      ).trim();

    const selectedInterest =
      projectFormData.interestOptions.find(
        (option) =>
          option.value ===
          selectedInterestValue
      );

    const interest =
      selectedInterest?.label ||
      selectedInterestValue;

    const message =
      String(
        formData.get(
          "message"
        ) ?? ""
      ).trim();

    const consent =
      formData.get(
        "consent"
      ) === "accepted";

    const nameRegex =
      /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]{3,80}$/;

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    if (
      !nameRegex.test(fullName)
    ) {
      showToast({
        variant: "error",
        title:
          "Nombre no válido",
        message:
          "Ingresa tu nombre completo usando solo letras y espacios.",
      });

      return;
    }

    if (
      !/^9\d{8}$/.test(phone)
    ) {
      showToast({
        variant: "error",
        title:
          "Celular no válido",
        message:
          "El celular debe tener 9 dígitos y comenzar con 9.",
      });

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
          "Ingresa un correo electrónico válido.",
      });

      return;
    }

    if (!interest) {
      showToast({
        variant: "error",
        title:
          "Selecciona una opción",
        message:
          "Indica qué tipo de propiedad te interesa.",
      });

      return;
    }

    if (!consent) {
      showToast({
        variant: "error",
        title:
          "Consentimiento requerido",
        message:
          "Debes aceptar la política de privacidad para continuar.",
      });

      return;
    }

    const defaultMessage =
      `Solicitud de información sobre ${PROJECT_NAME}. Interés: ${interest}.`;

    /*
     * Estructura enviada a la ruta
     * unificada POST /api/leads.
     */
    const leadData = {
      fuente_id: SOURCE_ID,

      telefono: phone,

      nombre: fullName,

      email,

      /*
       * Este formulario no solicita DNI.
       */
      dni: "",

      "campaña":
        `Proyecto ${PROJECT_NAME}`,

      anuncio:
        `Formulario web - ${PROJECT_NAME}`,

      /*
       * La API solicita msj_client
       * como una cadena JSON.
       */
      msj_client:
        JSON.stringify({
          proyecto:
            PROJECT_NAME,

          interes: interest,

          mensaje:
            message ||
            defaultMessage,

          origen_ruta:
            window.location.pathname,

          origen_componente:
            `CaminoRealOverviewSection - ${PROJECT_NAME}`,

          consentimiento:
            consent,

          fuente_id:
            SOURCE_ID,
        }),

      comentario:
        message ||
        defaultMessage,
    };

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
          }
        );

      const result =
        await readApiResponse(
          response
        );

      if (
        !response.ok ||
        result.success === false
      ) {
        console.error(
          "Error API Camino Real:",
          {
            status:
              response.status,

            result,
          }
        );

        showToast({
          variant: "error",

          title:
            "No pudimos enviar tus datos",

          message:
            result.message ||
            result.error ||
            `La solicitud no pudo procesarse. Código ${response.status}.`,
        });

        return;
      }

      form.reset();

      showToast(
        SUCCESS_TOAST
      );
    } catch (error) {
      console.error(
        "Error enviando formulario de Camino Real:",
        error
      );

      showToast({
        ...ERROR_TOAST,

        message:
          error instanceof Error
            ? error.message
            : ERROR_TOAST.message,
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <>
      <section
        className={
          styles.overviewSection
        }
        id="informacion-camino-real"
        aria-labelledby="camino-real-overview-title"
      >
        <div
          className={
            styles.overviewInner
          }
        >
          <div
            className={
              styles.overviewContent
            }
          >
            <span
              className={
                styles.eyebrow
              }
            >
              {
                projectDescription.eyebrow
              }
            </span>

            <h2 id="camino-real-overview-title">
              {
                projectDescription.title
              }
            </h2>

            <p
              className={
                styles.overviewDescription
              }
            >
              {
                projectDescription.introduction
              }
            </p>

            <div
              className={
                styles.overviewFacts
              }
            >
              {facts.map((item) => (
                <div
                  key={item.label}
                  className={
                    styles.overviewFact
                  }
                >
                  <span>
                    {item.label}
                  </span>

                  <strong>
                    {item.value}
                  </strong>
                </div>
              ))}
            </div>

            <div
              className={
                styles.projectText
              }
            >
              {projectDescription.paragraphs.map(
                (paragraph) => (
                  <p key={paragraph}>
                    {paragraph}
                  </p>
                )
              )}
            </div>

            <ul
              className={
                styles.detailsList
              }
            >
              {details.map((item) => (
                <li key={item.label}>
                  <strong>
                    {item.label}
                  </strong>

                  <span>
                    {item.value}
                  </span>
                </li>
              ))}
            </ul>

            <div
              className={
                styles.overviewActions
              }
            >
              <a
                href={
                  brochureCaminoReal
                }
                download
                aria-label="Descargar brochure de Camino Real"
              >
                <DownloadSimpleIcon
                  size={18}
                  weight="bold"
                  aria-hidden={true}
                />

                Descargar brochure
              </a>

              <Link href="/portal-de-transparencia/camino-real">
                Respaldo legal

                <ArrowRightIcon
                  size={18}
                  weight="bold"
                  aria-hidden={true}
                />
              </Link>
            </div>
          </div>

          <form
            className={
              styles.overviewForm
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
                Solicita información
              </span>

              <strong>
                {
                  projectFormData.title
                }
              </strong>

              <p>
                {
                  projectFormData.description
                }
              </p>
            </div>

            <label>
              Nombre completo

              <input
                type="text"
                name="fullName"
                placeholder="Ingresa tu nombre"
                autoComplete="name"
                minLength={3}
                maxLength={80}
                pattern="[A-Za-zÁÉÍÓÚáéíóúÑñÜü ]{3,80}"
                title="Ingresa tu nombre usando solo letras y espacios."
                disabled={isSending}
                required
              />
            </label>

            <div
              className={
                styles.formTwoColumns
              }
            >
              <label>
                Celular

                <input
                  type="tel"
                  name="phone"
                  placeholder="987654321"
                  inputMode="numeric"
                  autoComplete="tel"
                  pattern="9[0-9]{8}"
                  minLength={9}
                  maxLength={9}
                  title="Ingresa un celular peruano de 9 dígitos que empiece con 9."
                  disabled={
                    isSending
                  }
                  onInput={(
                    event
                  ) => {
                    event.currentTarget.value =
                      event.currentTarget.value
                        .replace(
                          /\D/g,
                          ""
                        )
                        .slice(
                          0,
                          9
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
            </div>

            <label>
              Estoy interesado en

              <select
                name="interest"
                defaultValue=""
                disabled={
                  isSending
                }
                required
              >
                <option
                  value=""
                  disabled
                >
                  Selecciona una opción
                </option>

                {projectFormData.interestOptions.map(
                  (option) => (
                    <option
                      key={
                        option.value
                      }
                      value={
                        option.value
                      }
                    >
                      {
                        option.label
                      }
                    </option>
                  )
                )}
              </select>
            </label>

            <label>
              Mensaje opcional

              <textarea
                name="message"
                placeholder="Cuéntanos qué lote buscas o cuándo deseas que te contactemos."
                rows={4}
                maxLength={250}
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
                Acepto los{" "}
                <Link
                  href="/politicas/politica-de-privacidad"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  términos y la política
                  de privacidad
                </Link>{" "}
                y autorizo a ANCOSUR a
                contactarme para recibir
                información comercial
                sobre Camino Real.
              </span>
            </label>

            <button
              type="submit"
              disabled={
                isSending
              }
              aria-busy={
                isSending
              }
            >
              {isSending
                ? "Enviando datos..."
                : "Enviar datos"}

              <ArrowRightIcon
                size={18}
                weight="bold"
                aria-hidden={true}
              />
            </button>
          </form>
        </div>
      </section>

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