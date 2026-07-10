"use client";

import Image from "next/image";
import { FormEvent, useEffect, useState } from "react";
import styles from "./PromoLeadPopup.module.css";

const popupConfig = {
  id: "campana-cusco-2026",
  enabled: true,
  showDelay: 1200,
  showOncePerSession: false,
  image: "/assets/campanias/campaniajulio.png",
  imageAlt: "Campaña ANCOSUR - Te regalamos un viaje a Cusco",
  imageWidth: 1080,
  imageHeight: 1080,
};

type FormData = {
  fullName: string;
  phone: string;
  email: string;
  numDocument: string;
  project: string;
  message: string;
  consent: boolean;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

const initialFormData: FormData = {
  fullName: "",
  phone: "",
  email: "",
  numDocument: "",
  project: "",
  message: "",
  consent: false,
};

export default function PromoLeadPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (!popupConfig.enabled) return;

    const storageKey = `popup-${popupConfig.id}`;

    if (popupConfig.showOncePerSession) {
      const alreadyClosed = sessionStorage.getItem(storageKey);
      if (alreadyClosed) return;
    }

    const timer = window.setTimeout(() => {
      setIsVisible(true);
    }, popupConfig.showDelay);

    return () => window.clearTimeout(timer);
  }, []);

  const closePopup = () => {
    setIsVisible(false);

    if (popupConfig.showOncePerSession) {
      sessionStorage.setItem(`popup-${popupConfig.id}`, "closed");
    }
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};

    const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{3,60}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    const phoneClean = formData.phone.replace(/\s|-/g, "");
    const phoneRegex = /^9\d{8}$/;
    const documentClean = formData.numDocument.replace(/\D/g, "");
    const documentRegex = /^(\d{8}|\d{11})$/;

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Ingresa tu nombre completo.";
    } else if (!nameRegex.test(formData.fullName.trim())) {
      newErrors.fullName = "Ingresa un nombre válido.";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Ingresa tu número de celular.";
    } else if (!phoneRegex.test(phoneClean)) {
      newErrors.phone = "El celular debe tener 9 dígitos y empezar con 9.";
    }

    if (!formData.numDocument.trim()) {
      newErrors.numDocument = "Ingresa tu DNI o RUC.";
    } else if (!documentRegex.test(documentClean)) {
      newErrors.numDocument =
        "El DNI debe tener 8 dígitos y el RUC 11 dígitos.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Ingresa tu correo electrónico.";
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = "Ingresa un correo válido.";
    }

    if (!formData.project) {
      newErrors.project = "Selecciona una opción de interés.";
    }

    if (!formData.consent) {
      newErrors.consent = "Debes aceptar ser contactado.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isValid = validateForm();

    if (!isValid) return;

    const documentClean = formData.numDocument.replace(/\D/g, "");

    const leadData = {
      campaign: popupConfig.id,
      fullName: formData.fullName.trim(),
      phone: formData.phone.replace(/\s|-/g, ""),
      email: formData.email.trim().toLowerCase(),
      documentType: documentClean.length === 11 ? "RUC" : "DNI",
      numDocument: documentClean,
      project: formData.project,
      message: formData.message.trim(),
      createdAt: new Date().toISOString(),
    };

    console.log("Lead enviado:", leadData);

    setIsSubmitted(true);
    setFormData(initialFormData);
    setErrors({});
  };

  if (!isVisible) return null;

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true">
      <button
        type="button"
        className={styles.backdrop}
        onClick={closePopup}
        aria-label="Cerrar popup"
      />

      <div className={styles.popup}>
        <button
          type="button"
          className={styles.closeButton}
          onClick={closePopup}
          aria-label="Cerrar popup"
        >
          ×
        </button>

        <div className={styles.imageSide}>
          <Image
            src={popupConfig.image}
            alt={popupConfig.imageAlt}
            width={popupConfig.imageWidth}
            height={popupConfig.imageHeight}
            className={styles.popupImage}
            loading="lazy"
            sizes="(max-width: 768px) 92vw, 520px"
          />
        </div>

        <div className={styles.formSide}>
          {!isSubmitted ? (
            <>
              <span className={styles.eyebrow}>Campaña exclusiva</span>

              <h2>Quiero participar</h2>

              <p className={styles.description}>
                Déjanos tus datos para recibir mayor información sobre la
                campaña y los proyectos disponibles de ANCOSUR.
              </p>

              <form className={styles.form} onSubmit={handleSubmit} noValidate>
                <div className={styles.field}>
                  <label htmlFor="fullName">Nombre completo</label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    placeholder="Ej. Angela Huayra"
                    value={formData.fullName}
                    onChange={(event) =>
                      setFormData((prev) => ({
                        ...prev,
                        fullName: event.target.value,
                      }))
                    }
                  />
                  {errors.fullName && (
                    <small className={styles.error}>{errors.fullName}</small>
                  )}
                </div>

                <div className={styles.field}>
                  <label htmlFor="phone">Celular</label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    inputMode="numeric"
                    maxLength={9}
                    placeholder="Ej. 987654321"
                    value={formData.phone}
                    onChange={(event) =>
                      setFormData((prev) => ({
                        ...prev,
                        phone: event.target.value.replace(/\D/g, ""),
                      }))
                    }
                  />
                  {errors.phone && (
                    <small className={styles.error}>{errors.phone}</small>
                  )}
                </div>

                <div className={styles.field}>
                  <label htmlFor="numDocument">DNI o RUC</label>
                  <input
                    id="numDocument"
                    name="numDocument"
                    type="text"
                    inputMode="numeric"
                    maxLength={11}
                    placeholder="DNI: 8 dígitos / RUC: 11 dígitos"
                    value={formData.numDocument}
                    onChange={(event) =>
                      setFormData((prev) => ({
                        ...prev,
                        numDocument: event.target.value
                          .replace(/\D/g, "")
                          .slice(0, 11),
                      }))
                    }
                  />
                  {errors.numDocument && (
                    <small className={styles.error}>
                      {errors.numDocument}
                    </small>
                  )}
                </div>

                <div className={styles.field}>
                  <label htmlFor="email">Correo electrónico</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Ej. correo@gmail.com"
                    value={formData.email}
                    onChange={(event) =>
                      setFormData((prev) => ({
                        ...prev,
                        email: event.target.value,
                      }))
                    }
                  />
                  {errors.email && (
                    <small className={styles.error}>{errors.email}</small>
                  )}
                </div>

                <div className={styles.field}>
                  <label htmlFor="project">Estoy interesado en</label>
                  <select
                    id="project"
                    name="project"
                    value={formData.project}
                    onChange={(event) =>
                      setFormData((prev) => ({
                        ...prev,
                        project: event.target.value,
                      }))
                    }
                  >
                    <option value="">Selecciona una opción</option>
                    <option value="Departamentos">Departamentos</option>
                    <option value="Lotes">Lotes</option>
                    <option value="Inversión inmobiliaria">
                      Inversión inmobiliaria
                    </option>
                  </select>
                  {errors.project && (
                    <small className={styles.error}>{errors.project}</small>
                  )}
                </div>

                <div className={styles.field}>
                  <label htmlFor="message">Mensaje opcional</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={3}
                    placeholder="Cuéntanos qué proyecto te interesa"
                    value={formData.message}
                    onChange={(event) =>
                      setFormData((prev) => ({
                        ...prev,
                        message: event.target.value,
                      }))
                    }
                  />
                </div>

                <label className={styles.checkbox}>
                  <input
                    type="checkbox"
                    checked={formData.consent}
                    onChange={(event) =>
                      setFormData((prev) => ({
                        ...prev,
                        consent: event.target.checked,
                      }))
                    }
                  />
                  <span>
                    Acepto ser contactado por ANCOSUR para recibir información
                    comercial.
                  </span>
                </label>

                {errors.consent && (
                  <small className={styles.error}>{errors.consent}</small>
                )}

                <button type="submit" className={styles.submitButton}>
                  Participar
                </button>
              </form>
            </>
          ) : (
            <div className={styles.success}>
              <span>Registro enviado</span>
              <h2>Gracias por participar</h2>
              <p>
                Un asesor de ANCOSUR se comunicará contigo para brindarte mayor
                información.
              </p>

              <button
                type="button"
                className={styles.submitButton}
                onClick={closePopup}
              >
                Entendido
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}