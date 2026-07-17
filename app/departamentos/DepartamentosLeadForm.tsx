"use client";

import {
  ArrowRightIcon,
  BuildingsIcon,
  EnvelopeSimpleIcon,
  PhoneIcon,
  UserIcon,
} from "@phosphor-icons/react";
import { useCallback, useState } from "react";
import type { FormEvent } from "react";

import FeedbackToast, {
  type FeedbackToastData,
} from "@/components/ui/FeedbackToast/FeedbackToast";

import styles from "./DepartamentosPage.module.css";

type LeadFormData = {
  fullName: string;
  phone: string;
  email: string;
  project: string;
  consent: boolean;
};

type LeadFormErrors = Partial<
  Record<keyof LeadFormData, string>
>;

type ToastState = FeedbackToastData & {
  id: number;
};

type ProjectOption = {
  value: string;
  label: string;
};

const initialFormData: LeadFormData = {
  fullName: "",
  phone: "",
  email: "",
  project: "",
  consent: false,
};

const projectOptions: ProjectOption[] = [
  {
    value: "Neo Xport",
    label: "Neo Xport",
  },
  {
    value: "Neo Rivera",
    label: "Neo Rivera",
  },
  {
    value: "Neo Eterna",
    label: "Neo Eterna",
  },
  {
    value: "Neo Balto",
    label: "Neo Balto",
  },
  {
    value: "Neo Emperatriz",
    label: "Neo Emperatriz",
  },
  {
    value: "Distrito San Carlos",
    label: "Distrito San Carlos",
  },
  {
    value: "Por definir",
    label: "Aún no sé qué proyecto elegir",
  },
];

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

export default function DepartamentosLeadForm() {
  const [formData, setFormData] =
    useState<LeadFormData>(initialFormData);

  const [errors, setErrors] =
    useState<LeadFormErrors>({});

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

  const validateForm = () => {
    const newErrors: LeadFormErrors = {};

    const fullName =
      formData.fullName.trim();

    const phone =
      formData.phone.replace(/\D/g, "");

    const email =
      formData.email.trim();

    const nameRegex =
      /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]{3,70}$/;

    const phoneRegex = /^9\d{8}$/;

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    if (!fullName) {
      newErrors.fullName =
        "Ingresa tu nombre completo.";
    } else if (!nameRegex.test(fullName)) {
      newErrors.fullName =
        "Ingresa un nombre válido.";
    }

    if (!phone) {
      newErrors.phone =
        "Ingresa tu número de celular.";
    } else if (!phoneRegex.test(phone)) {
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

    if (!formData.consent) {
      newErrors.consent =
        "Debes aceptar ser contactado.";
    }

    setErrors(newErrors);

    return (
      Object.keys(newErrors).length === 0
    );
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (isSending) return;

    const isValid = validateForm();

    if (!isValid) return;

    const projectName =
      formData.project.trim();

    const message =
      projectName === "Por definir"
        ? "Solicitud de asesoría para elegir un proyecto de departamentos."
        : `Solicitud de información sobre ${projectName} enviada desde la página de Departamentos.`;

    const leadPayload = {
      fullName:
        formData.fullName.trim(),

      phone:
        formData.phone.replace(
          /\D/g,
          ""
        ),

      email:
        formData.email
          .trim()
          .toLowerCase(),

      /*
       * Debe guardarse en:
       * proyecto_interes
       */
      project: projectName,

      /*
       * Debe guardarse en:
       * categoria_interes
       */
      interest: "Departamentos",

      message,

      campaign: "departamentos-web",

      source: "pagina-departamentos",

      consent: formData.consent,

      origen_ruta:
        window.location.pathname,

      origen_componente:
        "Formulario Departamentos",
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
          body: JSON.stringify(
            leadPayload
          ),
        }
      );

      if (!response.ok) {
        throw new Error(
          `Error HTTP ${response.status}`
        );
      }

      setFormData(initialFormData);
      setErrors({});

      showToast(SUCCESS_TOAST);
    } catch (error) {
      console.error(
        "Error enviando formulario de departamentos:",
        error
      );

      showToast(ERROR_TOAST);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <>
      <form
        className={styles.leadForm}
        onSubmit={handleSubmit}
        noValidate
      >
        <div
          className={
            styles.leadFormHeader
          }
        >
          <span>Formulario</span>

          <strong>
            Recibe asesoría gratis
          </strong>

          <p>
            Déjanos tus datos y te ayudamos
            a elegir el departamento ideal.
          </p>
        </div>

        <div className={styles.formGrid}>
          <label className={styles.field}>
            Nombre completo

            <div
              className={styles.inputBox}
            >
              <UserIcon
                size={20}
                weight="bold"
                aria-hidden={true}
              />

              <input
                type="text"
                name="fullName"
                placeholder="Ej. Angela Huayra"
                autoComplete="name"
                minLength={3}
                maxLength={70}
                value={formData.fullName}
                disabled={isSending}
                aria-invalid={Boolean(
                  errors.fullName
                )}
                onChange={(event) =>
                  updateField(
                    "fullName",
                    event.target.value
                  )
                }
              />
            </div>

            {errors.fullName && (
              <small
                className={styles.error}
              >
                {errors.fullName}
              </small>
            )}
          </label>

          <label className={styles.field}>
            Celular

            <div
              className={styles.inputBox}
            >
              <PhoneIcon
                size={20}
                weight="bold"
                aria-hidden={true}
              />

              <input
                type="tel"
                name="phone"
                placeholder="Ej. 987654321"
                inputMode="numeric"
                autoComplete="tel"
                maxLength={9}
                value={formData.phone}
                disabled={isSending}
                aria-invalid={Boolean(
                  errors.phone
                )}
                onChange={(event) =>
                  updateField(
                    "phone",
                    event.target.value
                      .replace(/\D/g, "")
                      .slice(0, 9)
                  )
                }
              />
            </div>

            {errors.phone && (
              <small
                className={styles.error}
              >
                {errors.phone}
              </small>
            )}
          </label>

          <label className={styles.field}>
            Correo opcional

            <div
              className={styles.inputBox}
            >
              <EnvelopeSimpleIcon
                size={20}
                weight="bold"
                aria-hidden={true}
              />

              <input
                type="email"
                name="email"
                placeholder="Ej. correo@gmail.com"
                autoComplete="email"
                maxLength={120}
                value={formData.email}
                disabled={isSending}
                aria-invalid={Boolean(
                  errors.email
                )}
                onChange={(event) =>
                  updateField(
                    "email",
                    event.target.value
                  )
                }
              />
            </div>

            {errors.email && (
              <small
                className={styles.error}
              >
                {errors.email}
              </small>
            )}
          </label>

          <label className={styles.field}>
            Proyecto de interés

            <div
              className={styles.inputBox}
            >
              <BuildingsIcon
                size={20}
                weight="bold"
                aria-hidden={true}
              />

              <select
                name="project"
                value={formData.project}
                disabled={isSending}
                aria-invalid={Boolean(
                  errors.project
                )}
                onChange={(event) =>
                  updateField(
                    "project",
                    event.target.value
                  )
                }
              >
                <option value="">
                  Selecciona un proyecto
                </option>

                {projectOptions.map(
                  (project) => (
                    <option
                      key={project.value}
                      value={project.value}
                    >
                      {project.label}
                    </option>
                  )
                )}
              </select>
            </div>

            {errors.project && (
              <small
                className={styles.error}
              >
                {errors.project}
              </small>
            )}
          </label>
        </div>

        <label
          className={styles.checkbox}
        >
          <input
            type="checkbox"
            name="consent"
            checked={formData.consent}
            disabled={isSending}
            onChange={(event) =>
              updateField(
                "consent",
                event.target.checked
              )
            }
          />

          <span>
            Acepto ser contactado por
            ANCOSUR para recibir información
            comercial.
          </span>
        </label>

        {errors.consent && (
          <small className={styles.error}>
            {errors.consent}
          </small>
        )}

        <button
          type="submit"
          disabled={isSending}
          aria-busy={isSending}
        >
          {isSending
            ? "Enviando..."
            : "Quiero asesoría gratis"}

          <ArrowRightIcon
            size={18}
            weight="bold"
            aria-hidden={true}
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