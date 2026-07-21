"use client";

import {
  ArrowRightIcon,
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

import styles from "../ResortsPage.module.css";

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

const getApiErrorMessage = (
  result: ApiResponse | null,
  status: number
) => {
  const dataError =
    result?.data &&
    typeof result.data === "object" &&
    "error" in result.data
      ? String(
          (result.data as { error?: unknown })
            .error ?? ""
        )
      : "";

  return (
    result?.message ||
    dataError ||
    `No se pudo enviar la solicitud. Código ${status}.`
  );
};

export default function ResortsLeadForm() {
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

    if (fullName.length < 3) {
      showToast({
        variant: "error",
        title: "Revisa tu nombre",
        message:
          "Ingresa tus nombres y apellidos.",
      });

      return;
    }

    if (
      phone.length !== 9 ||
      !phone.startsWith("9")
    ) {
      showToast({
        variant: "error",
        title: "Celular incorrecto",
        message:
          "El celular debe tener 9 dígitos y empezar con 9.",
      });

      return;
    }

    if (!interest) {
      showToast({
        variant: "error",
        title: "Selecciona una opción",
        message:
          "Indica el proyecto resort de tu interés.",
      });

      return;
    }

    const leadPayload = {
      nombres_completos: fullName,

      telefono: phone,

      email,

      proyecto_interes: interest,

      categoria_interes: "Resorts",

      fuente_prospeccion: "Web",

      mensaje:
        `Solicitud de información sobre ${interest} enviada desde la página de Resorts ANCOSUR.`,

      origen_ruta:
        window.location.pathname,

      origen_componente:
        "Formulario Resorts",
    };

    try {
      setIsSending(true);
      setToast(null);

      const response =
        await fetch("/api/leads", {
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
          cache: "no-store",
        });

      const result =
        await readApiResponse(
          response
        );

      if (
        !response.ok ||
        result?.success === false
      ) {
        showToast({
          variant: "error",
          title:
            "No pudimos enviar tus datos",
          message: getApiErrorMessage(
            result,
            response.status
          ),
        });

        return;
      }

      form.reset();

      showToast(
        SUCCESS_TOAST
      );
    } catch {
      showToast(
        ERROR_TOAST
      );
    } finally {
      setIsSending(false);
    }
  };

  return (
    <>
      <form
        className={
          styles.leadForm
        }
        onSubmit={
          handleSubmit
        }
      >
        <div
          className={
            styles.formGrid
          }
        >
          <label>
            Nombre completo

            <input
              type="text"
              name="fullName"
              placeholder="Ej. Angela Huayra"
              autoComplete="name"
              minLength={3}
              maxLength={100}
              disabled={
                isSending
              }
              required
            />
          </label>

          <label>
            Celular

            <input
              type="tel"
              name="phone"
              placeholder="Ej. 987654321"
              autoComplete="tel"
              inputMode="numeric"
              pattern="9[0-9]{8}"
              minLength={9}
              maxLength={9}
              title="Ingresa un celular peruano de 9 dígitos que empiece con 9."
              onInput={(event) => {
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
              disabled={
                isSending
              }
              required
            />
          </label>

          <label>
            Correo

            <input
              type="email"
              name="email"
              placeholder="Ej. correo@gmail.com"
              autoComplete="email"
              maxLength={120}
              disabled={
                isSending
              }
              required
            />
          </label>

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

              <option
                value="Zagari Resort Club"
              >
                Zagari Resort Club
              </option>

              <option
                value="Nuevo Resort Oxapampa"
              >
                Nuevo Resort Oxapampa
              </option>

              <option
                value="Asesoría personalizada"
              >
                Asesoría personalizada
              </option>
            </select>
          </label>
        </div>

        <label className={styles.checkbox}>
          <input
            type="checkbox"
            name="consent"
            value="accepted"
            checked
            readOnly
          />

          <span>
            Acepto ser contactado por ANCOSUR para recibir información
            comercial sobre sus proyectos resort.
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
            ? "Enviando..."
            : "Quiero que me contacten"}

          <ArrowRightIcon
            size={18}
            weight="bold"
            aria-hidden="true"
          />
        </button>
      </form>

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