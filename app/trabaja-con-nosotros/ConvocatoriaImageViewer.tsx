"use client";

import {
  ArrowsOutIcon,
  XIcon,
} from "@phosphor-icons/react";

import {
  useEffect,
  useState,
} from "react";

import {
  createPortal,
} from "react-dom";

import styles from "./ConvocatoriaImageViewer.module.css";

type ConvocatoriaImageViewerProps = {
  src: string;
  alt: string;
};

export default function ConvocatoriaImageViewer({
  src,
  alt,
}: ConvocatoriaImageViewerProps) {
  const [
    isOpen,
    setIsOpen,
  ] = useState(false);

  const [
    mounted,
    setMounted,
  ] = useState(false);

  useEffect(() => {
    setMounted(true);

    return () => {
      setMounted(false);
    };
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow =
      document.body.style.overflow;

    const handleKeyDown = (
      event: KeyboardEvent
    ) => {
      if (
        event.key ===
        "Escape"
      ) {
        setIsOpen(false);
      }
    };

    document.body.style.overflow =
      "hidden";

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
  }, [isOpen]);

  const viewer =
    mounted &&
    isOpen
      ? createPortal(
          <div
            className={
              styles.overlay
            }
            role="dialog"
            aria-modal="true"
            aria-label={`Imagen completa de ${alt}`}
            onMouseDown={(
              event
            ) => {
              if (
                event.target ===
                event.currentTarget
              ) {
                setIsOpen(false);
              }
            }}
          >
            <div
              className={
                styles.viewer
              }
            >
              {/* =====================================
                  CONTROLES SUPERIORES
              ===================================== */}

              <div
                className={
                  styles.topBar
                }
              >
                <div
                  className={
                    styles.titleBox
                  }
                >
                  <span>
                    Convocatoria
                  </span>

                  <strong>
                    {alt}
                  </strong>
                </div>

                <button
                  type="button"
                  className={
                    styles.closeButton
                  }
                  onClick={() =>
                    setIsOpen(false)
                  }
                  aria-label="Cerrar imagen"
                >
                  <XIcon
                    size={21}
                    weight="bold"
                  />
                </button>
              </div>

              {/* =====================================
                  IMAGEN
              ===================================== */}

              <div
                className={
                  styles.imageArea
                }
              >
                <img
                  src={src}
                  alt={alt}
                  className={
                    styles.fullImage
                  }
                  draggable={false}
                />
              </div>
            </div>
          </div>,
          document.body
        )
      : null;

  return (
    <>
      <button
        type="button"
        className={
          styles.trigger
        }
        onClick={() =>
          setIsOpen(true)
        }
        aria-label={`Ver imagen completa de ${alt}`}
      >
        <img
          src={src}
          alt={alt}
          className={
            styles.thumbnail
          }
          loading="lazy"
          decoding="async"
          draggable={false}
        />

        <span
          className={
            styles.viewLabel
          }
          aria-hidden="true"
        >
          <ArrowsOutIcon
            size={15}
            weight="bold"
          />

          Ver imagen
        </span>
      </button>

      {viewer}
    </>
  );
}