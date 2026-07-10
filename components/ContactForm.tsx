"use client";

import {
  BuildingsIcon,
  CheckCircleIcon,
  EnvelopeSimpleIcon,
  MapPinIcon,
  PaperPlaneTiltIcon,
  PhoneIcon,
  UserIcon,
  WarningCircleIcon,
  WhatsappLogoIcon,
} from "@phosphor-icons/react";

import { FormEvent, useState } from "react";
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

type LeadFormErrors = Partial<Record<keyof LeadFormData, string>>;

type ContactFormProps = {
  id?: string;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  campaign?: string;
};

const initialFormData: LeadFormData = {
  fullName: "",
  phone: "",
  email: "",
  interest: "",
  message: "",
  consent: false,
  website: "",
};

const interestOptions = [
  "Departamentos",
  "Lotes",
  "Inversión inmobiliaria",
  "Entrega inmediata",
  "Preventa",
  "Campaña vigente",
];

export default function ContactForm({
  id = "contactar",
  eyebrow = "Contáctanos",
  title = "Encuentra el proyecto ideal para ti",
  subtitle = "Déjanos tus datos y un asesor de ANCOSUR se comunicará contigo para brindarte mayor información.",
  campaign = "contacto-web-general",
}: ContactFormProps) {
  const [formData, setFormData] = useState<LeadFormData>(initialFormData);
  const [errors, setErrors] = useState<LeadFormErrors>({});
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

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

  if (!email) {
    newErrors.email = "Ingresa tu correo electrónico.";
  } else if (!emailRegex.test(email)) {
    newErrors.email = "Ingresa un correo válido.";
  }

  if (!formData.interest) {
    newErrors.interest = "Selecciona una opción de interés.";
  }

  if (!formData.consent) {
    newErrors.consent = "Debes aceptar ser contactado.";
  }

  setErrors(newErrors);

  return Object.keys(newErrors).length === 0;
};

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

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (formData.website) return;

    const isValid = validateForm();

    if (!isValid) return;

    const leadPayload = {
      campaign,
      fullName: formData.fullName.trim(),
      phone: formData.phone.replace(/\D/g, ""),
      email: formData.email.trim().toLowerCase(),
      interest: formData.interest,
      message: formData.message.trim(),
      source: "web",
      createdAt: new Date().toISOString(),
    };

    try {
      setIsSending(true);
      setStatus("idle");

      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(leadPayload),
      });

      if (!response.ok) {
        throw new Error("No se pudo enviar el formulario.");
      }

      setStatus("success");
      setFormData(initialFormData);
      setErrors({});
    } catch (error) {
      console.error(error);
      setStatus("error");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section id={id} className={styles.contactSection}>
      <div className={styles.container}>
        <div className={styles.infoSide}>
          <span className={styles.eyebrow}>{eyebrow}</span>

          <h2>{title}</h2>

          <p>{subtitle}</p>

          <div className={styles.infoCards}>
            <div className={styles.infoCard}>
              <span className={styles.iconBox}>
<WhatsappLogoIcon size={22} weight="bold" aria-hidden="true" />
              </span>
              <div>
                <strong>WhatsApp</strong>
                <small>Atención rápida con un asesor comercial.</small>
              </div>
            </div>

            <div className={styles.infoCard}>
              <span className={styles.iconBox}>
<MapPinIcon size={22} weight="bold" aria-hidden="true" />
              </span>
              <div>
                <strong>Ubicación</strong>
                <small>Proyectos en Huancayo, El Tambo y más zonas.</small>
              </div>
            </div>

            <div className={styles.infoCard}>
              <span className={styles.iconBox}>
<BuildingsIcon size={22} weight="bold" aria-hidden="true" />
              </span>
              <div>
                <strong>Asesoría inmobiliaria</strong>
                <small>Te ayudamos a elegir según tu presupuesto.</small>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.formSide}>
          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <input
              className={styles.honeypot}
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              value={formData.website}
              onChange={(event) => updateField("website", event.target.value)}
            />

            <div className={styles.formHeader}>
              <span>Formulario de contacto</span>
              <strong>Quiero más información</strong>
            </div>

            <div className={styles.field}>
              <label htmlFor="fullName">Nombre completo</label>
              <div className={styles.inputWrap}>
<UserIcon size={20} weight="bold" aria-hidden="true" />
                <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    required
                    placeholder="Ej. Angela Huayra"
                    value={formData.fullName}
                    onChange={(event) => updateField("fullName", event.target.value)}
                    />
              </div>
              {errors.fullName && (
                <small className={styles.error}>{errors.fullName}</small>
              )}
            </div>

            <div className={styles.twoColumns}>
              <div className={styles.field}>
                <label htmlFor="phone">Celular</label>
                <div className={styles.inputWrap}>
<PhoneIcon size={20} weight="bold" aria-hidden="true" />
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    inputMode="numeric"
                    maxLength={9}
                    placeholder="987654321"
                    value={formData.phone}
                    onChange={(event) =>
                        updateField("phone", event.target.value.replace(/\D/g, ""))
                    }
                    />
                </div>
                {errors.phone && (
                  <small className={styles.error}>{errors.phone}</small>
                )}
              </div>

              <div className={styles.field}>
                <label htmlFor="email">Correo opcional</label>
                <div className={styles.inputWrap}>
<EnvelopeSimpleIcon size={20} weight="bold" aria-hidden="true" />
                 <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        placeholder="correo@gmail.com"
                        value={formData.email}
                        onChange={(event) => updateField("email", event.target.value)}
                        />
                </div>
                {errors.email && (
                  <small className={styles.error}>{errors.email}</small>
                )}
              </div>
            </div>

            <div className={styles.field}>
              <label htmlFor="interest">Estoy interesado en</label>
              <select
                id="interest"
                name="interest"
                required
                value={formData.interest}
                onChange={(event) => updateField("interest", event.target.value)}
              >
                <option value="">Selecciona una opción</option>
                {interestOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              {errors.interest && (
                <small className={styles.error}>{errors.interest}</small>
              )}
            </div>

            <div className={styles.field}>
              <label htmlFor="message">Mensaje opcional</label>
              <textarea
                id="message"
                name="message"
                rows={4}
                placeholder="Cuéntanos qué proyecto te interesa o cuándo deseas que te contactemos."
                value={formData.message}
                onChange={(event) => updateField("message", event.target.value)}
              />
            </div>

            <label className={styles.checkbox}>
              <input
                type="checkbox"
                checked={formData.consent}
                onChange={(event) =>
                  updateField("consent", event.target.checked)
                }
              />
              <span>
                Acepto ser contactado por ANCOSUR para recibir información
                comercial sobre sus proyectos inmobiliarios.
              </span>
            </label>

            {errors.consent && (
              <small className={styles.error}>{errors.consent}</small>
            )}

            <button
              type="submit"
              className={styles.submitButton}
              disabled={isSending}
            >
              {isSending ? "Enviando..." : "Enviar datos"}
<PaperPlaneTiltIcon size={20} weight="bold" aria-hidden="true" />
            </button>

            {status === "success" && (
              <div className={styles.statusSuccess}>
<CheckCircleIcon size={22} weight="bold" aria-hidden="true" />
                <span>
                  Datos enviados correctamente. Un asesor se comunicará contigo.
                </span>
              </div>
            )}

            {status === "error" && (
              <div className={styles.statusError}>
<WarningCircleIcon size={22} weight="bold" aria-hidden="true" />                
<span>
                  No se pudo enviar el formulario. Inténtalo nuevamente.
                </span>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}