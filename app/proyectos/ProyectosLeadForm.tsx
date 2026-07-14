"use client";

import {
  ArrowRightIcon,
  BuildingsIcon,
  CheckCircleIcon,
  EnvelopeSimpleIcon,
  PhoneIcon,
  UserIcon,
  WarningCircleIcon,
} from "@phosphor-icons/react";
import { FormEvent, useState } from "react";
import styles from "./ProyectosPage.module.css";

type LeadFormData = {
  fullName: string;
  phone: string;
  email: string;
  interest: string;
  consent: boolean;
};

type LeadFormErrors = Partial<Record<keyof LeadFormData, string>>;

type ApiLeadResponse = {
  success?: boolean;
  response?: string;
  message?: string;
  data?: unknown;
};

const initialFormData: LeadFormData = {
  fullName: "",
  phone: "",
  email: "",
  interest: "",
  consent: false,
};

const interestOptions = [
  "No estoy seguro, quiero asesoría",
  "Neo Xport - depa para deportistas",
  "Neo Rivera - bienestar y tranquilidad",
  "Neo Eterna - zona universitaria",
  "Neo Balto - pet friendly",
  "Distrito San Carlos - ciudad de 15 minutos",
  "Quiero invertir en departamentos",
];

export default function ProyectosLeadForm() {
  const [formData, setFormData] = useState<LeadFormData>(initialFormData);
  const [errors, setErrors] = useState<LeadFormErrors>({});
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const updateField = <K extends keyof LeadFormData>(
    field: K,
    value: LeadFormData[K]
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [field]: undefined,
    }));

    if (status !== "idle") {
      setStatus("idle");
    }
  };

  const validateForm = () => {
    const newErrors: LeadFormErrors = {};

    const fullName = formData.fullName.trim();
    const phone = formData.phone.replace(/\D/g, "");
    const email = formData.email.trim();

    const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{3,70}$/;
    const phoneRegex = /^9\d{8}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    if (!fullName) {
      newErrors.fullName = "Ingresa tu nombre completo.";
    } else if (!nameRegex.test(fullName)) {
      newErrors.fullName = "Ingresa un nombre válido.";
    }

    if (!phone) {
      newErrors.phone = "Ingresa tu número de celular.";
    } else if (!phoneRegex.test(phone)) {
      newErrors.phone = "El celular debe tener 9 dígitos y empezar con 9.";
    }

    if (email && !emailRegex.test(email)) {
      newErrors.email = "Ingresa un correo válido.";
    }

    if (!formData.interest) {
      newErrors.interest = "Selecciona una opción.";
    }

    if (!formData.consent) {
      newErrors.consent = "Debes aceptar ser contactado.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isValid = validateForm();

    if (!isValid) return;

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    if (!apiUrl) {
      console.error("NEXT_PUBLIC_API_URL no está configurado");
      setStatus("error");
      return;
    }

    const leadPayload = {
      campaign: "departamentos-web",
      campania_nombre: "Departamentos web",
      fullName: formData.fullName.trim(),
      phone: formData.phone.replace(/\D/g, ""),
      email: formData.email.trim().toLowerCase(),
      project: formData.interest,
      categoria_interes: formData.interest,
      message: "",
      origen_ruta: window.location.pathname,
      origen_componente: "Formulario Departamentos",
    };

    try {
      setIsSending(true);
      setStatus("idle");

      const response = await fetch(`${apiUrl}/api/leads`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(leadPayload),
      });

      const contentType = response.headers.get("content-type");

      const result: ApiLeadResponse = contentType?.includes("application/json")
        ? await response.json()
        : { message: await response.text() };

      console.log("Respuesta API:", result);

      if (!response.ok) {
        setStatus("error");
        return;
      }

      setStatus("success");
      setFormData(initialFormData);
      setErrors({});
    } catch (error) {
      console.error("Error enviando lead:", error);
      setStatus("error");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <form className={styles.leadForm} onSubmit={handleSubmit} noValidate>
      <div className={styles.leadFormHeader}>
        <span>Formulario</span>
        <strong>Recibe asesoría gratis</strong>
        <p>Déjanos tus datos y te ayudamos a elegir el depa ideal.</p>
      </div>

      

      <div className={styles.formGrid}>
        <label className={styles.field}>
          Nombre completo
          <div className={styles.inputBox}>
            <UserIcon size={20} weight="bold" aria-hidden="true" />
            <input
              type="text"
              name="fullName"
              placeholder="Ej. Angela Huayra"
              value={formData.fullName}
              aria-invalid={Boolean(errors.fullName)}
              onChange={(event) => updateField("fullName", event.target.value)}
            />
          </div>
          {errors.fullName && (
            <small className={styles.error}>{errors.fullName}</small>
          )}
        </label>

        <label className={styles.field}>
          Celular
          <div className={styles.inputBox}>
            <PhoneIcon size={20} weight="bold" aria-hidden="true" />
            <input
              type="tel"
              name="phone"
              placeholder="Ej. 987654321"
              inputMode="numeric"
              maxLength={9}
              value={formData.phone}
              aria-invalid={Boolean(errors.phone)}
              onChange={(event) =>
                updateField("phone", event.target.value.replace(/\D/g, ""))
              }
            />
          </div>
          {errors.phone && (
            <small className={styles.error}>{errors.phone}</small>
          )}
        </label>

        <label className={styles.field}>
          Correo opcional
          <div className={styles.inputBox}>
            <EnvelopeSimpleIcon size={20} weight="bold" aria-hidden="true" />
            <input
              type="email"
              name="email"
              placeholder="Ej. correo@gmail.com"
              value={formData.email}
              aria-invalid={Boolean(errors.email)}
              onChange={(event) => updateField("email", event.target.value)}
            />
          </div>
          {errors.email && (
            <small className={styles.error}>{errors.email}</small>
          )}
        </label>

        <label className={styles.field}>
          ¿Qué proyecto te interesa?
          <div className={styles.inputBox}>
            <BuildingsIcon size={20} weight="bold" aria-hidden="true" />
            <select
              name="interest"
              value={formData.interest}
              aria-invalid={Boolean(errors.interest)}
              onChange={(event) => updateField("interest", event.target.value)}
            >
              <option value="">Selecciona una opción</option>
              {interestOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          {errors.interest && (
            <small className={styles.error}>{errors.interest}</small>
          )}
        </label>
      </div>

      <label className={styles.checkbox}>
        <input
          type="checkbox"
          checked={formData.consent}
          onChange={(event) => updateField("consent", event.target.checked)}
        />
        <span>
          Acepto ser contactado por ANCOSUR para recibir información comercial.
        </span>
      </label>

      {errors.consent && (
        <small className={styles.error}>{errors.consent}</small>
      )}

      <button type="submit" disabled={isSending}>
        {isSending ? "Enviando..." : "Quiero asesoría gratis"}
        <ArrowRightIcon size={18} weight="bold" aria-hidden="true" />
      </button>

      {status === "success" && (
        <div className={styles.statusSuccess}>
          <CheckCircleIcon size={20} weight="bold" aria-hidden="true" />
          <span>Datos enviados correctamente. Un asesor se comunicará contigo.</span>
        </div>
      )}

      {status === "error" && (
        <div className={styles.statusError}>
          <WarningCircleIcon size={20} weight="bold" aria-hidden="true" />
          <span>No se pudo enviar el formulario. Inténtalo nuevamente.</span>
        </div>
      )}
    </form>
  );
}