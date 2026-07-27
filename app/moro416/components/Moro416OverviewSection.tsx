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
  brochureMoro416,
  details,
  facts,
} from "../data";

import styles from "../Moro416.module.css";

/* =========================================================
   CONFIGURACIÓN
========================================================= */

const PROJECT_NAME = "Moro 416";

const PROJECT_CATEGORY =
  "Departamentos para inversión y oficinas";

const LEGAL_ROUTE =
  "/portal-de-transparencia/moro-416";

/* =========================================================
   TIPOS
========================================================= */

type ToastState = FeedbackToastData & {
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
  title: "¡Datos enviados correctamente!",
  message:
    "Un asesor de ANCOSUR se comunicará contigo pronto para brindarte información sobre Moro 416.",
};

const ERROR_TOAST: FeedbackToastData = {
  variant: "error",
  title: "No pudimos enviar tus datos",
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
    response.headers.get("content-type");

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
    typeof result.data === "object" &&
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

export default function Moro416OverviewSection() {
  const [isSending, setIsSending] =
    useState(false);

  const [toast, setToast] =
    useState<ToastState | null>(null);

  const closeToast = useCallback(() => {
    setToast(null);
  }, []);

  const showToast = (
    toastData: FeedbackToastData,
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
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (isSending) return;

    const form = event.currentTarget;

    if (!form.checkValidity()) {
      form.reportValidity();

      showToast({
        variant: "error",
        title: "Revisa tus datos",
        message:
          "Completa correctamente los campos requeridos.",
      });

      return;
    }

    const formData =
      new FormData(form);

    const fullName = String(
      formData.get("fullName") ?? "",
    ).trim();

    const phone = String(
      formData.get("phone") ?? "",
    ).replace(/\D/g, "");

    const email = String(
      formData.get("email") ?? "",
    )
      .trim()
      .toLowerCase();

    const interest = String(
      formData.get("interest") ?? "",
    ).trim();

    const message = String(
      formData.get("message") ?? "",
    ).trim();

    const leadData = {
      nombres_completos: fullName,
      telefono: phone,
      email,

      proyecto_interes:
        PROJECT_NAME,

      categoria_interes:
        interest ||
        PROJECT_CATEGORY,

      fuente_prospeccion: "Web",

      mensaje:
        message ||
        `Solicitud de información sobre ${PROJECT_NAME}. Interés: ${
          interest ||
          "Departamentos para inversión y oficinas"
        }.`,

      origen_ruta:
        window.location.pathname,

      origen_componente:
        `Moro416OverviewSection - ${PROJECT_NAME}`,
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
            Accept: "application/json",
          },

          body:
            JSON.stringify(leadData),

          cache: "no-store",
        },
      );

      const result =
        await readApiResponse(response);

      if (
        !response.ok ||
        result?.success === false
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

      showToast(SUCCESS_TOAST);
    } catch {
      showToast(ERROR_TOAST);
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
        id="informacion-moro-416"
        aria-labelledby="moro-416-overview-title"
      >
        <div
          className={
            styles.overviewInner
          }
        >
          {/* INFORMACIÓN DEL PROYECTO */}

          <div
            className={
              styles.overviewContent
            }
          >
            <span
              className={styles.eyebrow}
            >
              Invierte en el centro de
              Huancayo
            </span>

            <h2 id="moro-416-overview-title">
              Tu activo financiero más
              inteligente en el centro de
              Huancayo
            </h2>

            <p
              className={
                styles.overviewDescription
              }
            >
              Moro 416 no es solo un
              departamento, es tu próximo
              negocio. Ubicado
              estratégicamente en la
              intersección de la avenida
              Giráldez y Ferrocarril, frente
              a Real Plaza Huancayo, este
              proyecto mixto redefine la
              inversión inmobiliaria en la
              ciudad.
            </p>

            <p
              className={
                styles.overviewDescription
              }
            >
              Diseñado bajo el concepto
              «Trabaja, Vive y Crece», Moro
              416 integra departamentos
              optimizados para rentas cortas,
              Airbnb y Booking, junto con
              oficinas corporativas de alto
              nivel.
            </p>

            {/* DATOS PRINCIPALES */}

            {!!facts.length && (
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
            )}

            {/* DETALLES */}

            {!!details.length && (
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
            )}

            {/* ACCIONES */}

            <div
              className={
                styles.overviewActions
              }
            >
              <a
                href={brochureMoro416}
                download
                aria-label="Descargar brochure de Moro 416"
              >
                <DownloadSimpleIcon
                  size={18}
                  weight="bold"
                  aria-hidden={true}
                />

                Descargar brochure
              </a>

              <Link href={LEGAL_ROUTE}>
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
            onSubmit={handleSubmit}
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
                Conoce más sobre Moro 416
              </strong>

              <p>
                Completa tus datos y un
                asesor se comunicará contigo
                para brindarte precios,
                disponibilidad, tipologías,
                oficinas y alternativas de
                inversión.
              </p>
            </div>

            {/* NOMBRE */}

            <label>
              Nombre completo

              <input
                type="text"
                name="fullName"
                placeholder="Ej. Miguel Asto"
                autoComplete="name"
                minLength={3}
                maxLength={80}
                disabled={isSending}
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
                  title="Ingresa un número celular peruano de 9 dígitos que comience con 9."
                  disabled={isSending}
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
                  disabled={isSending}
                />
              </label>
            </div>

            {/* MENSAJE */}

            <label>
              Mensaje opcional

              <textarea
                name="message"
                placeholder="Cuéntanos qué tipo de departamento, oficina o alternativa de inversión buscas."
                rows={4}
                maxLength={250}
                disabled={isSending}
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
                información comercial sobre
                Moro 416 y acepto la Política
                de Privacidad.
              </span>
            </label>

            {/* BOTÓN */}

            <button
              type="submit"
              disabled={isSending}
              aria-busy={isSending}
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
          toast?.variant ?? "info"
        }
        title={toast?.title ?? ""}
        message={toast?.message ?? ""}
        onClose={closeToast}
      />
    </>
  );
}