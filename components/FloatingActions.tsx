"use client";

import {
  ArrowRightIcon,
  ArrowUpIcon,
  BroadcastIcon,
  WhatsappLogoIcon,
  XIcon,
} from "@phosphor-icons/react";
import {
  useEffect,
  useState,
} from "react";

import styles from "./FloatingActions.module.css";

const whatsappChatUrl =
  "https://wa.me/51971069763?text=Hola,%20vengo%20de%20la%20web%20de%20ANCOSUR%20y%20quiero%20recibir%20m%C3%A1s%20informaci%C3%B3n.";

const whatsappChannelUrl =
  "https://whatsapp.com/51971069763";

export default function FloatingActions() {
  const [showTopButton, setShowTopButton] = useState(false);
  const [isChannelOpen, setIsChannelOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTopButton(window.scrollY > 520);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsChannelOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <aside
      className={styles.floatingActions}
      aria-label="Acciones rápidas"
    >
      <div
        className={`${styles.channelWidget} ${
          isChannelOpen ? styles.channelWidgetOpen : ""
        }`}
      >
        <div
          className={styles.channelPanel}
          aria-hidden={!isChannelOpen}
        >
          <div className={styles.channelPanelTop}>
            <div className={styles.channelBrand}>
              <span className={styles.channelBrandIcon}>
                <BroadcastIcon
                  size={22}
                  weight="fill"
                  aria-hidden="true"
                />
              </span>

              <div>
                <small>Canal oficial</small>
                <strong>ANCOSUR en WhatsApp</strong>
              </div>
            </div>

            <button
              type="button"
              className={styles.channelClose}
              onClick={() => setIsChannelOpen(false)}
              aria-label="Cerrar canal de WhatsApp"
            >
              <XIcon
                size={17}
                weight="bold"
                aria-hidden="true"
              />
            </button>
          </div>

          <p>
            Recibe promociones, lanzamientos, novedades, beneficios y
            contenido exclusivo de nuestros proyectos.
          </p>

          <div className={styles.channelBenefits}>
            <span>Promociones</span>
            <span>Lanzamientos</span>
            <span>Beneficios</span>
          </div>

          <a
            href={whatsappChannelUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.channelLink}
            onClick={() => setIsChannelOpen(false)}
          >
            Seguir el canal
            <ArrowRightIcon
              size={17}
              weight="bold"
              aria-hidden="true"
            />
          </a>
        </div>

          <button
        type="button"
        className={`${styles.topButton} ${
          showTopButton ? styles.showTopButton : ""
        }`}
        onClick={scrollToTop}
        aria-label="Volver al inicio"
      >
        <ArrowUpIcon
          size={20}
          weight="bold"
          aria-hidden="true"
        />
      </button>

        <button
          type="button"
          className={styles.channelButton}
          onClick={() => setIsChannelOpen((previous) => !previous)}
          aria-label={
            isChannelOpen
              ? "Cerrar canal de WhatsApp"
              : "Abrir canal de WhatsApp"
          }
          aria-expanded={isChannelOpen}
        >
          <span className={styles.buttonIconBox}>
            <BroadcastIcon
              size={21}
              weight="fill"
              aria-hidden="true"
            />
          </span>

          <span className={styles.buttonText}>
            <small>Novedades</small>
            <strong>Canal ANCOSUR</strong>
          </span>
        </button>
      </div>


      <a
        href={whatsappChatUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.whatsappButton}
        aria-label="Escribir a ANCOSUR por WhatsApp"
      >
        <span
          className={styles.whatsappPulse}
          aria-hidden="true"
        />

        <span className={styles.buttonIconBox}>
          <WhatsappLogoIcon
            size={23}
            weight="fill"
            aria-hidden="true"
          />
        </span>

        <span className={styles.buttonText}>
          <small>Atención rápida</small>
          <strong>Habla con un asesor</strong>
        </span>
      </a>
    </aside>
  );
}