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
  brochureNeoOrigen,
  details,
  facts,
  interestOptionsNeoOrigen,
} from "../data";

import styles from "../NeoOrigenPage.module.css";

/* =========================================================
   CONFIGURACIÓN
========================================================= */

const PROJECT_NAME =
  "Neo Origen";

const PROJECT_CATEGORY =
  "Departamentos de 1, 2 y 3 dormitorios";

const LEGAL_ROUTE =
  "/portal-de-transparencia/neo-origen";

/* =========================================================
   TIPOS
========================================================= */

type ToastState =
  FeedbackToastData & {
    id: number;
  };

type ApiResponse = {
  success?: boolean;
  response?: string;
  message?: string;
  data?: unknown;
};

/* =========================================================
   MENSAJES
========================================================= */

const SUCCESS_TOAST: FeedbackToastData = {
  variant: "success",
  title:
    "¡Datos enviados correctamente!",
  message:
    "Un asesor de ANCOSUR se comunicará contigo pronto para brindarte información sobre Neo Origen.",
};

const ERROR_TOAST: FeedbackToastData = {
  variant: "error",
  title:
    "No pudimos enviar tus datos",
  message:
    "Verifica tu conexión e inténtalo nuevamente.",
};

/* =========================================================
   RESPUESTA DE LA API
========================================================= */

const readApiResponse = async (
  response: Response,
): Promise<ApiResponse> => {
  const contentType =
    response.headers.get(
      "content-type",
    );

  if (
    contentType?.includes(
      "application/json",
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

const getApiErrorMessage = (
  result: ApiResponse | null,
  status: number,
) => {
  const dataError =
    result?.data &&
    typeof result.data ===
      "object" &&
    "error" in result.data
      ? String(
          (
            result.data as {
              error?: unknown;
            }
          ).error ?? "",
        )
      : "";

  return (
    result?.message ||
    dataError ||
    `No se pudo enviar la solicitud. Código ${status}.`
  );
};

/* =========================================================
   COMPONENTE
========================================================= */

export default function NeoOrigenOverviewSection() {
  const [
    isSending,
    setIsSending,
  ] = useState(false);

  const [
    toast,
    setToast,
  ] =
    useState<ToastState | null>(
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

  /* =========================================================
     ENVÍO DEL FORMULARIO
  ========================================================= */

  const handleSubmit = async (
    event:
      FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (isSending) return;

    const form =
      event.currentTarget;

    if (
      !form.checkValidity()
    ) {
      form.reportValidity();

      showToast({
        variant: "error",
        title:
          "Revisa tus datos",
        message:
          "Completa correctamente los campos requeridos.",
      });

      return;
    }

    const formData =
      new FormData(form);

    const fullName = String(
      formData.get(
        "fullName",
      ) ?? "",
    ).trim();

    const phone = String(
      formData.get("phone") ??
        "",
    ).replace(/\D/g, "");

    const email = String(
      formData.get("email") ??
        "",
    )
      .trim()
      .toLowerCase();

    const interest = String(
      formData.get(
        "interest",
      ) ?? "",
    ).trim();

    const message = String(
      formData.get("message") ??
        "",
    ).trim();

    if (
      fullName.length < 3
    ) {
      showToast({
        variant: "error",
        title:
          "Revisa tu nombre",
        message:
          "Ingresa tu nombre completo para continuar.",
      });

      return;
    }

    if (
      !/^9\d{8}$/.test(
        phone,
      )
    ) {
      showToast({
        variant: "error",
        title:
          "Celular incorrecto",
        message:
          "Ingresa un celular peruano de 9 dígitos que empiece con 9.",
      });

      return;
    }

    const leadData = {
      nombres_completos:
        fullName,

      telefono:
        phone,

      email,

      proyecto_interes:
        PROJECT_NAME,

      categoria_interes:
        interest ||
        PROJECT_CATEGORY,

      fuente_prospeccion:
        "Web",

      mensaje:
        message ||
        `Solicitud de información sobre ${PROJECT_NAME}. Interés: ${
          interest ||
          PROJECT_CATEGORY
        }.`,

      origen_ruta:
        window.location.pathname,

      origen_componente:
        `NeoOrigenOverviewSection - ${PROJECT_NAME}`,
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
                leadData,
              ),

            cache:
              "no-store",
          },
        );

      const result =
        await readApiResponse(
          response,
        );

      if (
        !response.ok ||
        result?.success ===
          false
      ) {
        showToast({
          variant: "error",
          title:
            "No pudimos enviar tus datos",
          message:
            getApiErrorMessage(
              result,
              response.status,
            ),
        });

        return;
      }

      form.reset();

      showToast(
        SUCCESS_TOAST,
      );
    } catch {
      showToast(
        ERROR_TOAST,
      );
    } finally {
      setIsSending(
        false,
      );
    }
  };

  return (
    <>
      <section
        className={
          styles.overviewSection
        }
        id="informacion-neo-origen"
        aria-labelledby="neo-origen-overview-title"
      >
        <div
          className={
            styles.overviewInner
          }
        >
          {/* INFORMACIÓN */}

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
              Innovación y conectividad
            </span>

            <h2 id="neo-origen-overview-title">
              Tu espacio en el universo,
              en el corazón de El Tambo
            </h2>

            <p
              className={
                styles.overviewDescription
              }
            >
              Neo Origen es una propuesta
              inmobiliaria inspirada en el
              universo, diseñada para
              ofrecer una experiencia de
              vida moderna, funcional y
              diferente en El Tambo.
            </p>

            <p
              className={
                styles.overviewDescription
              }
            >
              Su ubicación en Jr. Libertad
              1187 permite vivir cerca de
              Plaza Vea, comercios,
              servicios y principales vías
              de acceso, combinando
              conectividad, comodidad y
              potencial de inversión.
            </p>

            {/* DATOS PRINCIPALES */}

            {!!facts.length && (
              <div
                className={
                  styles.overviewFacts
                }
              >
                {facts.map(
                  (item) => (
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
                  ),
                )}
              </div>
            )}

            {/* DETALLES */}

            {!!details.length && (
              <ul
                className={
                  styles.detailsList
                }
              >
                {details.map(
                  (item) => (
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
                  ),
                )}
              </ul>
            )}

            {/* ACCIONES */}

            <div
              className={
                styles.overviewActions
              }
            >
              <a
                href={
                  brochureNeoOrigen
                }
                download
                aria-label="Descargar brochure de Neo Origen"
              >
                <DownloadSimpleIcon
                  size={18}
                  weight="bold"
                  aria-hidden={true}
                />

                Descargar brochure
              </a>

              <Link
                href={
                  LEGAL_ROUTE
                }
              >
                Respaldo legal

                <ArrowRightIcon
                  size={18}
                  weight="bold"
                  aria-hidden={true}
                />
              </Link>
            </div>
          </div>

          {/* FORMULARIO */}

          <form
            className={
              styles.overviewForm
            }
            onSubmit={
              handleSubmit
            }
            noValidate
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
                Conoce Neo Origen
              </strong>

              <p>
                Completa tus datos y un
                asesor se comunicará
                contigo para brindarte
                precios, disponibilidad,
                planos, tipologías y formas
                de pago.
              </p>
            </div>

            {/* NOMBRE */}

            <label>
              Nombre completo

              <input
                type="text"
                name="fullName"
                placeholder="Ej. Carlos Mendoza"
                autoComplete="name"
                minLength={3}
                maxLength={100}
                disabled={
                  isSending
                }
                required
              />
            </label>

            {/* CELULAR Y CORREO */}

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
                  maxLength={150}
                  disabled={
                    isSending
                  }
                />
              </label>
            </div>

            {/* MENSAJE */}

            <label>
              Mensaje opcional

              <textarea
                name="message"
                placeholder="Cuéntanos qué departamento buscas o cuándo deseas que te contactemos."
                rows={4}
                maxLength={250}
                disabled={
                  isSending
                }
              />
            </label>

            {/* CONSENTIMIENTO */}

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
                required
              />

              <span>
                Acepto ser contactado por
                ANCOSUR para recibir
                información comercial
                sobre Neo Origen y acepto
                la Política de Privacidad.
              </span>
            </label>

            {/* BOTÓN */}

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