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
  brochureColinasDeMoro,
  details,
  facts,
} from "../data";

import styles from "../components/ColinasDeMoroOverviewSection.module.css";

const SOURCE_ID = 4 as const;

const PROJECT_NAME =
  "Las Colinas de Moro";

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
  const responseText =
    await response.text();

  if (!responseText.trim()) {
    return {
      success: response.ok,
      message: response.ok
        ? "Solicitud procesada correctamente."
        : `Error HTTP ${response.status}.`,
    };
  }

  try {
    const parsed: unknown =
      JSON.parse(responseText);

    if (
      typeof parsed === "object" &&
      parsed !== null &&
      !Array.isArray(parsed)
    ) {
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

export default function ColinasDeMoroOverviewSection() {
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
      /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s.'’-]{3,80}$/;

    const phoneRegex =
      /^9\d{8}$/;

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
          "Ingresa tu nombre completo usando letras y espacios.",
      });

      return;
    }

    if (
      !phoneRegex.test(phone)
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

    if (
      message.length > 250
    ) {
      showToast({
        variant: "error",
        title:
          "Mensaje muy largo",
        message:
          "El mensaje no debe superar los 250 caracteres.",
      });

      return;
    }

    if (!consent) {
      showToast({
        variant: "error",
        title:
          "Consentimiento requerido",
        message:
          "Debes aceptar la política de privacidad para enviar tus datos.",
      });

      return;
    }

    const defaultMessage =
      `Solicitud de información sobre ${PROJECT_NAME}.`;

    /*
     * Estructura enviada a la API
     * externa mediante POST /api/leads.
     */
    const leadData = {
      fuente_id:
        SOURCE_ID,

      telefono:
        phone,

      nombre:
        fullName,

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
       * La API requiere msj_client
       * como texto JSON.
       */
      msj_client:
        JSON.stringify({
          proyecto:
            PROJECT_NAME,

          categoria_interes:
            "Lotes",

          nombre:
            fullName,

          telefono:
            phone,

          correo:
            email,

          mensaje:
            message ||
            defaultMessage,

          origen_ruta:
            window.location.pathname,

          origen_componente:
            `ColinasDeMoroOverviewSection - ${PROJECT_NAME}`,

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
          "Error API Las Colinas de Moro:",
          {
            status:
              response.status,
            result,
            leadData,
          }
        );

        const nestedData =
          typeof result.data ===
            "object" &&
          result.data !== null &&
          !Array.isArray(
            result.data
          )
            ? result.data as Record<
                string,
                unknown
              >
            : null;

        const nestedError =
          typeof nestedData?.error ===
          "string"
            ? nestedData.error
            : "";

        const apiMessage =
          result.message ||
          result.error ||
          nestedError ||
          `No se pudo enviar la solicitud. Código ${response.status}.`;

        showToast({
          variant: "error",
          title:
            "No pudimos enviar tus datos",
          message:
            String(apiMessage),
        });

        return;
      }

      form.reset();

      showToast(
        SUCCESS_TOAST
      );
    } catch (error) {
      console.error(
        "Error enviando formulario de Las Colinas de Moro:",
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
        id="informacion-colinas-de-moro"
        aria-labelledby="colinas-de-moro-overview-title"
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
              Invierte en tu patrimonio
            </span>

            <h2 id="colinas-de-moro-overview-title">
              Lotes con entrega inmediata
              en Concepción
            </h2>

            <p
              className={
                styles.overviewDescription
              }
            >
              Las Colinas de Moro es una
              oportunidad para construir
              tu vivienda, casa de campo
              o realizar una inversión
              en una zona conectada con
              la Carretera Central y con
              proyección de crecimiento.
            </p>

            <div
              className={
                styles.overviewFacts
              }
            >
              {facts.map((item) => (
                <div
                  key={`${item.label}-${item.value}`}
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

            <ul
              className={
                styles.detailsList
              }
            >
              {details.map((item) => (
                <li
                  key={`${item.label}-${item.value}`}
                >
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
                  brochureColinasDeMoro
                }
                download
                aria-label="Descargar brochure de Las Colinas de Moro"
              >
                <DownloadSimpleIcon
                  size={18}
                  weight="bold"
                  aria-hidden={true}
                />

                Descargar brochure
              </a>

              <Link href="/portal-de-transparencia/las-colinas-de-moro">
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
                Conoce nuestros lotes
                disponibles
              </strong>

              <p>
                Completa tus datos y un
                asesor te brindará
                información sobre
                precios, metrajes,
                disponibilidad y formas
                de pago.
              </p>
            </div>

            <label htmlFor="colinas-full-name">
              Nombre completo

              <input
                id="colinas-full-name"
                type="text"
                name="fullName"
                placeholder="Ingresa tu nombre"
                autoComplete="name"
                minLength={3}
                maxLength={80}
                pattern="[A-Za-zÁÉÍÓÚáéíóúÑñÜü.'’ -]{3,80}"
                title="Ingresa tu nombre usando letras y espacios."
                disabled={
                  isSending
                }
                required
              />
            </label>

            <div
              className={
                styles.formTwoColumns
              }
            >
              <label htmlFor="colinas-phone">
                Celular

                <input
                  id="colinas-phone"
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

              <label htmlFor="colinas-email">
                Correo electrónico

                <input
                  id="colinas-email"
                  type="email"
                  name="email"
                  placeholder="correo@gmail.com"
                  autoComplete="email"
                  maxLength={120}
                  disabled={
                    isSending
                  }
                  required
                />
              </label>
            </div>

            <label htmlFor="colinas-message">
              Mensaje opcional

              <textarea
                id="colinas-message"
                name="message"
                placeholder="Cuéntanos qué metraje buscas o cuándo deseas que te contactemos."
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
                sobre Las Colinas de Moro.
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
                ? "Enviando solicitud..."
                : "Solicitar información"}

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