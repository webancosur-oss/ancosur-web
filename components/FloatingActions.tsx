"use client";

import {
  ArrowRightIcon,
  ArrowUpIcon,
  BroadcastIcon,
  XIcon,
} from "@phosphor-icons/react";
import {
  useEffect,
  useState,
} from "react";

import styles from "./FloatingActions.module.css";


const whatsappChannelUrl =
  "https://whatsapp.com/channel/0029Vb8cnCK1t90kncFeWh26";

/* =========================================================
   COMPONENTE
========================================================= */

export default function FloatingActions() {
  const [
    showTopButton,
    setShowTopButton,
  ] = useState(false);

  const [
    isChannelOpen,
    setIsChannelOpen,
  ] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTopButton(
        window.scrollY > 520,
      );
    };

    handleScroll();

    window.addEventListener(
      "scroll",
      handleScroll,
      {
        passive: true,
      },
    );

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll,
      );
    };
  }, []);

  useEffect(() => {
    const handleEscape = (
      event: KeyboardEvent,
    ) => {
      if (
        event.key === "Escape"
      ) {
        setIsChannelOpen(false);
      }
    };

    window.addEventListener(
      "keydown",
      handleEscape,
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleEscape,
      );
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const toggleChannel = () => {
    setIsChannelOpen(
      (previous) => !previous,
    );
  };

  const closeChannel = () => {
    setIsChannelOpen(false);
  };

  return (
    <aside
      className={
        styles.floatingActions
      }
      aria-label="Acciones rápidas"
    >
      {/* =====================================================
          BOTÓN VOLVER ARRIBA
      ====================================================== */}

      <button
        type="button"
        className={`${styles.topButton} ${
          showTopButton
            ? styles.showTopButton
            : ""
        }`}
        onClick={
          scrollToTop
        }
        aria-label="Volver al inicio"
      >
        <ArrowUpIcon
          size={20}
          weight="bold"
          aria-hidden="true"
        />
      </button>

      {/* =====================================================
          CANAL DE WHATSAPP
      ====================================================== */}

      <div
        className={`${styles.channelWidget} ${
          isChannelOpen
            ? styles.channelWidgetOpen
            : ""
        }`}
      >
        <div
          className={
            styles.channelPanel
          }
          aria-hidden={
            !isChannelOpen
          }
        >
          <div
            className={
              styles.channelPanelTop
            }
          >
            <div
              className={
                styles.channelBrand
              }
            >
              <span
                className={
                  styles.channelBrandIcon
                }
              >
                <BroadcastIcon
                  size={22}
                  weight="fill"
                  aria-hidden="true"
                />
              </span>

              <div>
                <small>
                  Canal oficial
                </small>

                <strong>
                  Ancosur en WhatsApp
                </strong>
              </div>
            </div>

            <button
              type="button"
              className={
                styles.channelClose
              }
              onClick={
                closeChannel
              }
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
            Recibe promociones, lanzamientos,
            novedades, beneficios y contenido
            exclusivo de nuestros proyectos.
          </p>

          <div
            className={
              styles.channelBenefits
            }
          >
            <span>
              Promociones
            </span>

            <span>
              Lanzamientos
            </span>

            <span>
              Beneficios
            </span>
          </div>

          <a
            href={
              whatsappChannelUrl
            }
            target="_blank"
            rel="noopener noreferrer"
            className={
              styles.channelLink
            }
            onClick={
              closeChannel
            }
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
          className={
            styles.channelButton
          }
          onClick={
            toggleChannel
          }
          aria-label={
            isChannelOpen
              ? "Cerrar canal de WhatsApp"
              : "Abrir canal de WhatsApp"
          }
          aria-expanded={
            isChannelOpen
          }
        >
          <span
            className={
              styles.buttonIconBox
            }
          >
            <BroadcastIcon
              size={21}
              weight="fill"
              aria-hidden="true"
            />
          </span>

          <span
            className={
              styles.buttonText
            }
          >
            <small>
              Novedades
            </small>

            <strong>
              Canal Ancosur
            </strong>
          </span>
        </button>
      </div>
    </aside>
  );
}