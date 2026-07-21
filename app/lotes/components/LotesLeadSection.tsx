"use client";

import { ArrowRightIcon } from "@phosphor-icons/react";
import { useCallback, useState } from "react";
import type { FormEvent } from "react";

import FeedbackToast, {
  type FeedbackToastData,
} from "@/components/ui/FeedbackToast/FeedbackToast";

import styles from "./LotesLeadSection.module.css";

const PROJECT_NAME = "Lotes";

type ToastState = FeedbackToastData & {
  id: number;
};

type ApiResponse = {
  success?: boolean;
  response?: string;
  message?: string;
  data?: unknown;
};

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

const readApiResponse = async (
  response: Response
): Promise<ApiResponse> => {
  const contentType =
    response.headers.get("content-type");

  if (contentType?.includes("application/json")) {
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

  const responseText = await response.text();

  return {
    success: response.ok,
    message:
      responseText ||
      "No se recibió una respuesta de la API.",
  };
};

const getApiErrorMessage = (
  result: ApiResponse | null,
  status: number
) => {
  const dataError =
    result?.data &&
    typeof result.data === "object" &&
    "error" in result.data
      ? String(
          (result.data as { error?: unknown }).error ??
            ""
        )
      : "";

  return (
    result?.message ||
    dataError ||
    `No se pudo enviar la solicitud. Código ${status}.`
  );
};

export default function LotesLeadSection() {
  const [isSending, setIsSending] =
    useState(false);

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

    const formData = new FormData(form);

    const fullName = String(
      formData.get("fullName") ?? ""
    ).trim();

    const phone = String(
      formData.get("phone") ?? ""
    ).replace(/\D/g, "");

    const email = String(
      formData.get("email") ?? ""
    )
      .trim()
      .toLowerCase();

    const interest = String(
      formData.get("interest") ?? ""
    ).trim();

    const message = String(
      formData.get("message") ?? ""
    ).trim();

    const leadData = {
      nombres_completos: fullName,
      telefono: phone,
      email,
      proyecto_interes: PROJECT_NAME,
      categoria_interes: interest || "Lotes",
      fuente_prospeccion: "Web",
      mensaje:
        message ||
        `Solicitud de información enviada desde la página de Lotes. Interés: ${interest}.`,
      origen_ruta: window.location.pathname,
      origen_componente:
        "LotesLeadSection - Lotes",
    };

    try {
      setIsSending(true);
      setToast(null);

      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(leadData),
        cache: "no-store",
      });

      const result =
        await readApiResponse(response);

      if (
        !response.ok ||
        result?.success === false
      ) {
        showToast({
          variant: "error",
          title: "No pudimos enviar tus datos",
          message: getApiErrorMessage(
            result,
            response.status
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
        className={styles.section}
        id="asesoria"
        aria-labelledby="lotes-lead-title"
      >
        <div className={styles.content}>
          <span>Asesoría personalizada</span>

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
              <strong>Opciones para vivir</strong>

              <span>
                Encuentra espacios para construir tu
                futuro hogar.
              </span>
            </div>

            <div>
              <strong>Opciones para invertir</strong>

              <span>
                Conoce proyectos ubicados en zonas con
                proyección de crecimiento.
              </span>
            </div>

            <div>
              <strong>Asesoría personalizada</strong>

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
          <div className={styles.formHeader}>
            <span>Solicita información</span>

            <strong>
              Quiero encontrar un lote
            </strong>

            <p>
              Completa tus datos y un asesor de ANCOSUR
              se comunicará contigo.
            </p>
          </div>

          <div className={styles.formGrid}>
            <label>
              Nombre completo

              <input
                type="text"
                name="fullName"
                placeholder="Ej. Angela Huayra"
                autoComplete="name"
                minLength={3}
                maxLength={80}
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
                required
              />
            </label>

            <label>
              Correo electrónico

              <input
                type="email"
                name="email"
                placeholder="Ej. correo@gmail.com"
                autoComplete="email"
                maxLength={120}
                disabled={isSending}
                required
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
                <option value="" disabled>
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

          <label className={styles.messageField}>
            Mensaje opcional

            <textarea
              name="message"
              placeholder="Cuéntanos qué ubicación, presupuesto o tipo de lote estás buscando."
              rows={4}
              maxLength={250}
              disabled={isSending}
            />
          </label>

          <label className={styles.checkbox}>
            <input
              type="checkbox"
              name="consent"
              value="accepted"
              checked
              readOnly
            />

            <span>
              Acepto ser contactado por ANCOSUR para
              recibir información comercial sobre sus
              proyectos de lotes.
            </span>
          </label>

          <button
            type="submit"
            className={styles.submitButton}
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
        variant={toast?.variant ?? "info"}
        title={toast?.title ?? ""}
        message={toast?.message ?? ""}
        onClose={closeToast}
      />
    </>
  );
}