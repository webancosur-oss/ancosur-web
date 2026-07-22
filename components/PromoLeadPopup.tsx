"use client";

import { XIcon } from "@phosphor-icons/react";
import Image from "next/image";
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { FormEvent } from "react";

import FeedbackToast, {
  type FeedbackToastData,
} from "@/components/ui/FeedbackToast/FeedbackToast";

import styles from "./PromoLeadPopup.module.css";

type PopupCampaign = {
  id: string;
  title: string;
  eyebrow: string;
  description: string;
  image: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
};

type FormData = {
  fullName: string;
  phone: string;
  email: string;
  project: string;
  message: string;
  consent: boolean;
};

type FormErrors = Partial<
  Record<keyof FormData, string>
>;

type ToastState = FeedbackToastData & {
  id: number;
};

const popupConfig = {
  enabled: true,
  showDelay: 1200,
  showOncePerSession: false,
};

const campaigns: PopupCampaign[] = [
  {
    id: "campania-cusco-2026",
    title: "Quiero participar",
    eyebrow: "Campaña exclusiva",
    description:
      "Déjanos tus datos para recibir mayor información sobre esta campaña y los proyectos disponibles de ANCOSUR.",
    image: "/assets/campanias/campaniajulio.png",
    imageAlt:
      "Campaña ANCOSUR - Te regalamos un viaje a Cusco",
    imageWidth: 1080,
    imageHeight: 1080,
  },
];

const initialFormData: FormData = {
  fullName: "",
  phone: "",
  email: "",
  project: "",
  message: "",
  consent: true,
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

export default function PromoLeadPopup() {
  const [isVisible, setIsVisible] =
    useState(false);

  const [
    activeCampaignId,
    setActiveCampaignId,
  ] = useState(campaigns[0].id);

  const [formData, setFormData] =
    useState<FormData>(initialFormData);

  const [errors, setErrors] =
    useState<FormErrors>({});

  const [isSending, setIsSending] =
    useState(false);

  const [toast, setToast] =
    useState<ToastState | null>(null);

  const activeCampaign = useMemo(() => {
    return (
      campaigns.find(
        (campaign) =>
          campaign.id === activeCampaignId
      ) ?? campaigns[0]
    );
  }, [activeCampaignId]);

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

  const registerPopupAsClosed = () => {
    if (
      popupConfig.showOncePerSession
    ) {
      sessionStorage.setItem(
        "popup-ancosur-campaigns",
        "closed"
      );
    }
  };

  const closePopup = () => {
    setIsVisible(false);
    setErrors({});
    registerPopupAsClosed();
  };

  useEffect(() => {
    if (!popupConfig.enabled) return;

    const storageKey =
      "popup-ancosur-campaigns";

    if (
      popupConfig.showOncePerSession
    ) {
      const alreadyClosed =
        sessionStorage.getItem(
          storageKey
        );

      if (alreadyClosed) return;
    }

    const timer = window.setTimeout(() => {
      setIsVisible(true);
    }, popupConfig.showDelay);

    return () => {
      window.clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow =
      "hidden";

    const handleKeyDown = (
      event: KeyboardEvent
    ) => {
      if (event.key === "Escape") {
        closePopup();
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      document.body.style.overflow =
        previousOverflow;

      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [isVisible]);

  const changeCampaign = (
    campaignId: string
  ) => {
    setActiveCampaignId(campaignId);
    setErrors({});
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};

    const nameRegex =
      /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]{3,60}$/;

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    const phoneClean =
      formData.phone.replace(/\D/g, "");

    if (!formData.fullName.trim()) {
      newErrors.fullName =
        "Ingresa tu nombre completo.";
    } else if (
      !nameRegex.test(
        formData.fullName.trim()
      )
    ) {
      newErrors.fullName =
        "Ingresa un nombre válido.";
    }

    if (!formData.phone.trim()) {
      newErrors.phone =
        "Ingresa tu número de celular.";
    } else if (
      !/^9\d{8}$/.test(phoneClean)
    ) {
      newErrors.phone =
        "El celular debe tener 9 dígitos y empezar con 9.";
    }

    if (!formData.email.trim()) {
      newErrors.email =
        "Ingresa tu correo electrónico.";
    } else if (
      !emailRegex.test(
        formData.email.trim()
      )
    ) {
      newErrors.email =
        "Ingresa un correo válido.";
    }

    if (!formData.project) {
      newErrors.project =
        "Selecciona una opción de interés.";
    }

    if (
      formData.message.trim().length >
      250
    ) {
      newErrors.message =
        "El mensaje no debe superar los 250 caracteres.";
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

  const cleanMessage = formData.message.trim();

  const leadData = {
    nombres_completos: formData.fullName.trim(),
    telefono: formData.phone.replace(/\D/g, ""),
    email: formData.email.trim().toLowerCase(),
    proyecto_interes: formData.project,
    categoria_interes: formData.project,
    fuente_prospeccion: "Web",
    mensaje:
      cleanMessage ||
      `Solicitud de información enviada desde el popup de campaña sobre ${formData.project}.`,
    origen_ruta: window.location.pathname,
    origen_componente: `Popup ${activeCampaign.eyebrow} - ${activeCampaign.id}`,
  };

  try {
    setIsSending(true);
    setErrors({});
    setToast(null);

    const response = await fetch("/api/leads", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(leadData),
    });

    const responseData = await response.json().catch(() => null);

    if (!response.ok || !responseData?.success) {
      console.error("Error API leads:", responseData);

      throw new Error(
        responseData?.message ||
          `Error HTTP ${response.status}`
      );
    }

    setFormData(initialFormData);
    setErrors({});
    setIsVisible(false);
    registerPopupAsClosed();

    showToast(SUCCESS_TOAST);
  } catch (error) {
    console.error(
      "Error enviando formulario del popup:",
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
      {isVisible && (
        <div
          className={styles.overlay}
          role="dialog"
          aria-modal="true"
          aria-labelledby="promo-popup-title"
        >
          <button
            type="button"
            className={styles.backdrop}
            onClick={closePopup}
            aria-label="Cerrar campaña"
          />

          <div className={styles.popup}>
            <button
              type="button"
              className={
                styles.closeButton
              }
              onClick={closePopup}
              aria-label="Cerrar popup"
            >
              <XIcon
                size={21}
                weight="bold"
                aria-hidden={true}
              />
            </button>

            <div
              className={styles.imageSide}
            >
              {campaigns.length > 1 && (
                <div
                  className={
                    styles.campaignTabs
                  }
                >
                  {campaigns.map(
                    (campaign) => (
                      <button
                        key={campaign.id}
                        type="button"
                        className={`${
                          styles.campaignTab
                        } ${
                          activeCampaign.id ===
                          campaign.id
                            ? styles.activeTab
                            : ""
                        }`}
                        onClick={() =>
                          changeCampaign(
                            campaign.id
                          )
                        }
                      >
                        {campaign.eyebrow}
                      </button>
                    )
                  )}
                </div>
              )}

              <Image
                key={activeCampaign.id}
                src={activeCampaign.image}
                alt={
                  activeCampaign.imageAlt
                }
                width={
                  activeCampaign.imageWidth
                }
                height={
                  activeCampaign.imageHeight
                }
                className={
                  styles.popupImage
                }
                priority
                sizes="(max-width: 520px) calc(100vw - 20px), (max-width: 900px) 640px, 560px"
              />
            </div>

            <div
              className={styles.formSide}
            >
              <span
                className={styles.eyebrow}
              >
                {activeCampaign.eyebrow}
              </span>

              <h2 id="promo-popup-title">
                {activeCampaign.title}
              </h2>

              <p
                className={
                  styles.description
                }
              >
                {
                  activeCampaign.description
                }
              </p>

              <form
                className={styles.form}
                onSubmit={handleSubmit}
                noValidate
              >
                <div
                  className={styles.field}
                >
                  <label htmlFor="popup-full-name">
                    Nombre completo
                  </label>

                  <input
                    id="popup-full-name"
                    name="fullName"
                    type="text"
                    placeholder="Ej. Angela Huayra"
                    autoComplete="name"
                    value={
                      formData.fullName
                    }
                    disabled={isSending}
                    onChange={(event) =>
                      setFormData(
                        (previous) => ({
                          ...previous,
                          fullName:
                            event.target
                              .value,
                        })
                      )
                    }
                  />

                  {errors.fullName && (
                    <small
                      className={
                        styles.error
                      }
                    >
                      {errors.fullName}
                    </small>
                  )}
                </div>

                <div
                  className={styles.field}
                >
                  <label htmlFor="popup-phone">
                    Celular
                  </label>

                  <input
                    id="popup-phone"
                    name="phone"
                    type="tel"
                    inputMode="numeric"
                    autoComplete="tel"
                    maxLength={9}
                    placeholder="Ej. 987654321"
                    value={formData.phone}
                    disabled={isSending}
                    onChange={(event) =>
                      setFormData(
                        (previous) => ({
                          ...previous,
                          phone:
                            event.target.value
                              .replace(
                                /\D/g,
                                ""
                              )
                              .slice(0, 9),
                        })
                      )
                    }
                  />

                  {errors.phone && (
                    <small
                      className={
                        styles.error
                      }
                    >
                      {errors.phone}
                    </small>
                  )}
                </div>

                <div
                  className={styles.field}
                >
                  <label htmlFor="popup-email">
                    Correo electrónico
                  </label>

                  <input
                    id="popup-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="Ej. correo@gmail.com"
                    value={formData.email}
                    disabled={isSending}
                    onChange={(event) =>
                      setFormData(
                        (previous) => ({
                          ...previous,
                          email:
                            event.target
                              .value,
                        })
                      )
                    }
                  />

                  {errors.email && (
                    <small
                      className={
                        styles.error
                      }
                    >
                      {errors.email}
                    </small>
                  )}
                </div>

                <div
                  className={styles.field}
                >
                  <label htmlFor="popup-project">
                    Estoy interesado en
                  </label>

                  <select
                    id="popup-project"
                    name="project"
                    value={formData.project}
                    disabled={isSending}
                    onChange={(event) =>
                      setFormData(
                        (previous) => ({
                          ...previous,
                          project:
                            event.target
                              .value,
                        })
                      )
                    }
                  >
                    <option value="">
                      Selecciona una opción
                    </option>

                    <option value="Departamentos">
                      Departamentos
                    </option>

                    <option value="Lotes">
                      Lotes
                    </option>

                    <option value="Inversión inmobiliaria">
                      Inversión inmobiliaria
                    </option>
                  </select>

                  {errors.project && (
                    <small
                      className={
                        styles.error
                      }
                    >
                      {errors.project}
                    </small>
                  )}
                </div>

                <div
                  className={styles.field}
                >
                  <label htmlFor="popup-message">
                    Mensaje opcional
                  </label>

                  <textarea
                    id="popup-message"
                    name="message"
                    rows={3}
                    maxLength={250}
                    placeholder="Cuéntanos qué proyecto te interesa"
                    value={
                      formData.message
                    }
                    disabled={isSending}
                    onChange={(event) =>
                      setFormData(
                        (previous) => ({
                          ...previous,
                          message:
                            event.target
                              .value,
                        })
                      )
                    }
                  />

                  <small
                    className={
                      styles.counter
                    }
                  >
                    {
                      formData.message
                        .length
                    }
                    /250 caracteres
                  </small>

                  {errors.message && (
                    <small
                      className={
                        styles.error
                      }
                    >
                      {errors.message}
                    </small>
                  )}
                </div>

                <label
                  className={
                    styles.checkbox
                  }
                >
                  <input
                    type="checkbox"
                    checked={
                      formData.consent
                    }
                    disabled={isSending}
                    onChange={(event) =>
                      setFormData(
                        (previous) => ({
                          ...previous,
                          consent:
                            event.target
                              .checked,
                        })
                      )
                    }
                  />

                  <span>
                    Acepto ser contactado por
                    ANCOSUR para recibir
                    información comercial.
                  </span>
                </label>

                {errors.consent && (
                  <small
                    className={
                      styles.error
                    }
                  >
                    {errors.consent}
                  </small>
                )}

                <button
                  type="submit"
                  className={
                    styles.submitButton
                  }
                  disabled={isSending}
                  aria-busy={isSending}
                >
                  {isSending
                    ? "Enviando..."
                    : "Participar"}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

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