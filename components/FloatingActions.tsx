"use client";

import {
  ArrowRightIcon,
  CheckCircleIcon,
  XIcon,
} from "@phosphor-icons/react";
import { FormEvent, useEffect, useRef, useState } from "react";

import styles from "./FloatingActions.module.css";

type Interest = "departamentos" | "lotes" | "visita";

type ChatStep = "welcome" | "phone" | "success";

const WHATSAPP_NUMBER = "51971069763";
const CHATBOT_ICON = "/assets/images/chatbot.svg";

const optionLabels: Record<Interest, string> = {
  departamentos: "Departamentos",
  lotes: "Lotes",
  visita: "Agendar visita",
};

export default function FloatingActions() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<ChatStep>("welcome");
  const [interest, setInterest] = useState<Interest | null>(null);
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  useEffect(() => {
    if (isOpen && step === "phone") {
      const timer = window.setTimeout(() => {
        inputRef.current?.focus();
      }, 120);

      return () => window.clearTimeout(timer);
    }
  }, [isOpen, step]);

  const handleInterest = (selectedInterest: Interest) => {
    setInterest(selectedInterest);
    setPhone("");
    setPhoneError("");
    setStep("phone");
  };

  const handlePhoneChange = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 9);

    setPhone(digits);
    setPhoneError("");
  };

  const validatePhone = () => {
    if (!/^\d{9}$/.test(phone)) {
      setPhoneError(
        "Ingresa un número celular válido de 9 dígitos.",
      );

      return false;
    }

    return true;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!interest || !validatePhone()) {
      return;
    }

    try {
      setIsSubmitting(true);

      const message = [
        "Hola, ANCOSUR.",
        "",
        `Estoy interesado(a) en: ${optionLabels[interest]}.`,
        `Mi número celular es: ${phone}.`,
        "",
        "Quisiera recibir más información.",
      ].join("\n");

      const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
        message,
      )}`;

      window.open(
        whatsappUrl,
        "_blank",
        "noopener,noreferrer",
      );

      setStep("success");
    } catch (error) {
      console.error("Error abriendo WhatsApp:", error);

      setPhoneError(
        "No pudimos abrir WhatsApp. Inténtalo nuevamente.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetChat = () => {
    if (isSubmitting) return;

    setStep("welcome");
    setInterest(null);
    setPhone("");
    setPhoneError("");
  };

  return (
    <div className={styles.wrapper}>
      {isOpen && (
        <section
          className={styles.chatWindow}
          role="dialog"
          aria-label="Asistente de ANCOSUR"
        >
          <header className={styles.chatHeader}>
            <div className={styles.chatIdentity}>
              <div className={styles.chatAvatar}>
                <img
                  src={CHATBOT_ICON}
                  alt="Asistente ANCOSUR"
                />
              </div>

              <div className={styles.chatIdentityText}>
                <strong>Asistente ANCOSUR</strong>
                <span>Estamos para ayudarte</span>
              </div>
            </div>

            <button
              type="button"
              className={styles.closeButton}
              onClick={() => setIsOpen(false)}
              aria-label="Cerrar asistente"
            >
              <XIcon size={18} weight="bold" />
            </button>
          </header>

          <div className={styles.chatBody}>
            {step === "welcome" && (
              <>
                <div className={styles.messageGroup}>
                  <span className={styles.messageBubble}>
                    Hola. ¿En qué podemos ayudarte?
                  </span>
                </div>

                <div className={styles.optionList}>
                  <button
                    type="button"
                    className={styles.optionButton}
                    onClick={() =>
                      handleInterest("departamentos")
                    }
                  >
                    <span>Departamentos</span>

                    <ArrowRightIcon
                      size={17}
                      weight="bold"
                    />
                  </button>

                  <button
                    type="button"
                    className={styles.optionButton}
                    onClick={() =>
                      handleInterest("lotes")
                    }
                  >
                    <span>Lotes</span>

                    <ArrowRightIcon
                      size={17}
                      weight="bold"
                    />
                  </button>

                  <button
                    type="button"
                    className={styles.optionButton}
                    onClick={() =>
                      handleInterest("visita")
                    }
                  >
                    <span>Agendar visita</span>

                    <ArrowRightIcon
                      size={17}
                      weight="bold"
                    />
                  </button>
                </div>
              </>
            )}

            {step === "phone" && interest && (
              <>
                <div className={styles.messageGroup}>
                  <span className={styles.messageBubble}>
                    Perfecto. Has elegido{" "}
                    <strong>
                      {optionLabels[interest]}
                    </strong>
                    .
                  </span>
                </div>

                <div className={styles.messageGroup}>
                  <span className={styles.messageBubble}>
                    Déjanos tu número celular de 9 dígitos y
                    te conectaremos con un asesor por
                    WhatsApp.
                  </span>
                </div>

                <form
                  className={styles.phoneForm}
                  onSubmit={handleSubmit}
                >
                  <label
                    htmlFor="ancosur-phone"
                    className={styles.phoneLabel}
                  >
                    Número celular
                  </label>

                  <div
                    className={`${styles.phoneInputWrap} ${
                      phoneError
                        ? styles.phoneInputError
                        : ""
                    }`}
                  >
                    <span className={styles.countryPrefix}>
                      +51
                    </span>

                    <input
                      ref={inputRef}
                      id="ancosur-phone"
                      name="phone"
                      type="tel"
                      inputMode="numeric"
                      autoComplete="tel"
                      value={phone}
                      onChange={(event) =>
                        handlePhoneChange(
                          event.target.value,
                        )
                      }
                      placeholder="Ingresa tu número celular"
                      maxLength={9}
                      aria-invalid={Boolean(phoneError)}
                    />
                  </div>

                  {phoneError && (
                    <span className={styles.errorMessage}>
                      {phoneError}
                    </span>
                  )}

                  <button
                    type="submit"
                    className={styles.submitButton}
                    disabled={isSubmitting}
                  >
                    <span>
                      {isSubmitting
                        ? "Abriendo WhatsApp..."
                        : "Continuar"}
                    </span>

                    {!isSubmitting && (
                      <ArrowRightIcon
                        size={17}
                        weight="bold"
                      />
                    )}
                  </button>

                  <button
                    type="button"
                    className={styles.backButton}
                    onClick={resetChat}
                    disabled={isSubmitting}
                  >
                    Cambiar opción
                  </button>
                </form>
              </>
            )}

            {step === "success" && (
              <div className={styles.successState}>
                <div className={styles.successIcon}>
                  <CheckCircleIcon
                    size={28}
                    weight="fill"
                  />
                </div>

                <strong>¡Listo!</strong>

                <p>
                  Hemos preparado tu solicitud. Ahora puedes
                  continuar la conversación con un asesor de
                  ANCOSUR por WhatsApp.
                </p>

                <button
                  type="button"
                  className={styles.restartButton}
                  onClick={resetChat}
                >
                  Hacer otra consulta
                </button>
              </div>
            )}
          </div>

          <footer className={styles.chatFooter}>
            ANCOSUR Inmobiliaria
          </footer>
        </section>
      )}

      <button
        type="button"
        className={`${styles.floatingButton} ${
          isOpen ? styles.floatingButtonOpen : ""
        }`}
        onClick={() => setIsOpen((previous) => !previous)}
        aria-label={
          isOpen
            ? "Cerrar asistente"
            : "Abrir asistente"
        }
        aria-expanded={isOpen}
      >
        {isOpen ? (
          <XIcon
            className={styles.closeFloatingIcon}
            size={26}
            weight="bold"
          />
        ) : (
          <>
            <img
              className={styles.floatingIcon}
              src={CHATBOT_ICON}
              alt="Abrir asistente"
            />

            <span className={styles.floatingText}>
              <small>¿Necesitas ayuda?</small>
              <strong>Hablemos</strong>
            </span>
          </>
        )}
      </button>
    </div>
  );
}