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

import {
  investmentOptions,
} from "../data";

import styles from "./InvestorsLeadForm.module.css";

type FormDataState = {
  fullName: string;
  email: string;
  phone: string;
  investmentAmount: string;
  message: string;
  consent: boolean;
  website: string;
};

type FormErrors = Partial<
  Record<keyof FormDataState, string>
>;

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

const INITIAL_FORM: FormDataState = {
  fullName: "",
  email: "",
  phone: "",
  investmentAmount: "",
  message: "",
  consent: false,
  website: "",
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
        response:
          "investment_lead.invalid_response",
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

export default function InvestorsLeadForm() {
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
    const newErrors: FormErrors = {};

    const fullName =
      formData.fullName.trim();

    const email =
      formData.email
        .trim()
        .toLowerCase();

    const phone =
      formData.phone.replace(
        /\D/g,
        ""
      );

    const nameRegex =
      /^[A-Za-zÁÉÍÓÚáéíóúÑñÜü.' -]{3,80}$/;

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    if (!fullName) {
      newErrors.fullName =
        "Ingresa tus nombres y apellidos.";
    } else if (
      !nameRegex.test(fullName)
    ) {
      newErrors.fullName =
        "Ingresa un nombre válido.";
    }

    if (
      email &&
      !emailRegex.test(email)
    ) {
      newErrors.email =
        "Ingresa un correo válido.";
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
      !formData.investmentAmount
    ) {
      newErrors.investmentAmount =
        "Selecciona un monto de inversión.";
    }

    if (!formData.consent) {
      newErrors.consent =
        "Debes aceptar ser contactado.";
    }

    setErrors(newErrors);

    const errorFields =
      Object.keys(
        newErrors
      ) as Array<keyof FormDataState>;

    const firstError =
      errorFields[0];

    if (firstError) {
      requestAnimationFrame(() => {
        const element =
          form.elements.namedItem(
            firstError
          );

        if (
          element instanceof HTMLElement
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

    return errorFields.length === 0;
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

    /*
      Honeypot antispam.
      Si tiene contenido, no se envía.
    */
    if (formData.website) {
      return;
    }

    if (!validateForm(form)) {
      return;
    }

    const fullName =
      formData.fullName.trim();

    const email =
      formData.email
        .trim()
        .toLowerCase();

    const phone =
      formData.phone.replace(
        /\D/g,
        ""
      );

    const investmentAmount =
      formData.investmentAmount.trim();

    const additionalMessage =
      formData.message.trim();

    /*
      Este payload coincide con
      CreateInvestmentLeadRequest del backend.
    */
    const investmentPayload = {
      fullName,
      email,
      phone,
      investmentAmount,

      message:
        additionalMessage ||
        "Solicita asesoría sobre las opciones de inversión disponibles.",

      campaign:
        "inversionistas-web",

      campania_nombre:
        "Inversionistas ANCOSUR",

      project:
        "Inversiones ANCOSUR",

      proyecto_interes:
        "Inversiones ANCOSUR",

      categoria_interes:
        "Inversionista",

      source:
        "Web",

      fuente_prospeccion:
        "Web",

      origen_ruta:
        window.location.pathname,

      origen_componente:
        "Formulario Inversionistas",
    };

    try {
      setIsSending(true);
      setToast(null);

      /*
        El frontend llama al proxy de Next.js.
        El proxy llama al backend Go:
        POST /api/investment-leads
      */
      const response =
        await fetch(
          "/api/investment-leads",
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
              Accept:
                "application/json",
            },
            body: JSON.stringify(
              investmentPayload
            ),
            cache: "no-store",
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
        switch (result.response) {
          case "investment_lead.invalid_name":
            showToast({
              variant: "error",
              title:
                "Nombre no válido",
              message:
                "Ingresa correctamente tus nombres y apellidos.",
            });
            return;

          case "investment_lead.invalid_phone":
            showToast({
              variant: "error",
              title:
                "Celular no válido",
              message:
                "El celular debe tener 9 dígitos y empezar con 9.",
            });
            return;

          case "investment_lead.invalid_email":
            showToast({
              variant: "error",
              title:
                "Correo no válido",
              message:
                "Verifica el correo electrónico ingresado.",
            });
            return;

          case "investment_lead.range_required":
            showToast({
              variant: "error",
              title:
                "Selecciona un monto",
              message:
                "Selecciona el rango aproximado de tu inversión.",
            });
            return;

          case "investment_lead.state_not_found":
            showToast({
              variant: "error",
              title:
                "Configuración pendiente",
              message:
                "No existe un estado activo para registrar el lead.",
            });
            return;

          case "investment_lead.campaign_error":
            showToast({
              variant: "error",
              title:
                "Error de campaña",
              message:
                "No se pudo verificar la campaña de inversionistas.",
            });
            return;

          case "investment_lead.lead_create_error":
            showToast({
              variant: "error",
              title:
                "No se registró el contacto",
              message:
                "No se pudo crear el lead inversionista.",
            });
            return;

          case "investment_lead.investment_create_error":
            showToast({
              variant: "error",
              title:
                "No se registró la inversión",
              message:
                "No se pudo guardar la solicitud de inversión.",
            });
            return;

          default:
            showToast({
              variant: "error",
              title:
                "No pudimos registrar tu solicitud",
              message:
                result.message ||
                "Verifica tus datos e inténtalo nuevamente.",
            });
            return;
        }
      }

      setFormData(INITIAL_FORM);
      setErrors({});

      showToast(SUCCESS_TOAST);
    } catch {
      showToast(ERROR_TOAST);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <>
      <form
        className={styles.form}
        onSubmit={handleSubmit}
        noValidate
      >
        <input
          type="text"
          name="website"
          value={formData.website}
          onChange={(event) =>
            updateField(
              "website",
              event.target.value
            )
          }
          className={styles.honeypot}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
        />

        <div
          className={styles.formHeader}
        >
          <span>
            Solicita información
          </span>

          <h3>
            Quiero más información
          </h3>

          <p>
            Completa tus datos y un
            asesor se comunicará contigo.
          </p>
        </div>

        <div className={styles.grid}>
          <div
            className={`${styles.field} ${styles.fullField}`}
          >
            <label
              htmlFor="investor-fullName"
            >
              Nombre completo
            </label>

            <input
              id="investor-fullName"
              type="text"
              name="fullName"
              placeholder="Ej. Angela Huayra"
              autoComplete="name"
              minLength={3}
              maxLength={80}
              value={formData.fullName}
              onChange={(event) =>
                updateField(
                  "fullName",
                  event.target.value
                )
              }
              disabled={isSending}
              aria-invalid={
                Boolean(
                  errors.fullName
                )
              }
            />

            {errors.fullName && (
              <small
                className={styles.error}
              >
                {errors.fullName}
              </small>
            )}
          </div>

          <div className={styles.field}>
            <label
              htmlFor="investor-phone"
            >
              Celular
            </label>

            <input
              id="investor-phone"
              type="tel"
              name="phone"
              placeholder="987654321"
              autoComplete="tel"
              inputMode="numeric"
              pattern="9[0-9]{8}"
              minLength={9}
              maxLength={9}
              value={formData.phone}
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
              disabled={isSending}
              aria-invalid={
                Boolean(errors.phone)
              }
            />

            {errors.phone && (
              <small
                className={styles.error}
              >
                {errors.phone}
              </small>
            )}
          </div>

          <div className={styles.field}>
            <label
              htmlFor="investor-email"
            >
              Correo opcional
            </label>

            <input
              id="investor-email"
              type="email"
              name="email"
              placeholder="correo@gmail.com"
              autoComplete="email"
              maxLength={120}
              value={formData.email}
              onChange={(event) =>
                updateField(
                  "email",
                  event.target.value
                )
              }
              disabled={isSending}
              aria-invalid={
                Boolean(errors.email)
              }
            />

            {errors.email && (
              <small
                className={styles.error}
              >
                {errors.email}
              </small>
            )}
          </div>

          <div
            className={`${styles.field} ${styles.fullField}`}
          >
            <label
              htmlFor="investor-amount"
            >
              Monto de inversión
            </label>

            <select
              id="investor-amount"
              name="investmentAmount"
              value={
                formData.investmentAmount
              }
              onChange={(event) =>
                updateField(
                  "investmentAmount",
                  event.target.value
                )
              }
              disabled={isSending}
              aria-invalid={
                Boolean(
                  errors.investmentAmount
                )
              }
            >
              <option value="">
                Selecciona una opción
              </option>

              {investmentOptions.map(
                (option) => (
                  <option
                    key={option}
                    value={option}
                  >
                    {option}
                  </option>
                )
              )}
            </select>

            {errors.investmentAmount && (
              <small
                className={styles.error}
              >
                {
                  errors.investmentAmount
                }
              </small>
            )}
          </div>

          <div
            className={`${styles.field} ${styles.fullField}`}
          >
            <label
              htmlFor="investor-message"
            >
              Mensaje opcional
            </label>

            <textarea
              id="investor-message"
              name="message"
              rows={4}
              maxLength={500}
              placeholder="Cuéntanos qué tipo de inversión estás buscando."
              value={formData.message}
              onChange={(event) =>
                updateField(
                  "message",
                  event.target.value
                )
              }
              disabled={isSending}
            />

            <small
              className={styles.counter}
            >
              {formData.message.length}
              /500
            </small>
          </div>
        </div>

        <label
          className={styles.consent}
        >
          <input
            type="checkbox"
            name="consent"
            checked={formData.consent}
            onChange={(event) =>
              updateField(
                "consent",
                event.target.checked
              )
            }
            disabled={isSending}
          />

          <span>
            Acepto ser contactado por
            ANCOSUR para recibir
            información sobre sus
            opciones de inversión.
          </span>
        </label>

        {errors.consent && (
          <small
            className={styles.error}
          >
            {errors.consent}
          </small>
        )}

        <button
          type="submit"
          className={styles.submitButton}
          disabled={isSending}
          aria-busy={isSending}
        >
          {isSending
            ? "Enviando..."
            : "Enviar datos"}

          <ArrowRightIcon
            size={20}
            weight="bold"
            aria-hidden="true"
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