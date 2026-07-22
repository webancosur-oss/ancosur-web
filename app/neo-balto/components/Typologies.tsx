"use client";

import ActionButton from "@/components/buttons/ActionButton";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
} from "@phosphor-icons/react";
import {
  useCallback,
  useEffect,
  useState,
  type KeyboardEvent,
} from "react";

import { typologies } from "../data";
import styles from "./Typologies.module.css";

type TypologiesProps = {
  mode?: "compact";
  projectHref?: string;
};

type Typology = (typeof typologies)[number];

const AUTOPLAY_DELAY = 5200;

export default function Typologies({
  mode = "compact",
  projectHref = "#informacion-neo-balto",
}: TypologiesProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedTypology, setSelectedTypology] =
    useState<Typology | null>(null);

  const totalTypologies = typologies.length;
  const hasMultipleTypologies = totalTypologies > 1;
  const activeTypology = typologies[activeIndex];

  const closeImageModal = useCallback(() => {
    setSelectedTypology(null);
  }, []);

  const goToSlide = useCallback(
    (index: number) => {
      if (!totalTypologies) return;

      const nextIndex =
        (index + totalTypologies) % totalTypologies;

      setActiveIndex(nextIndex);
    },
    [totalTypologies]
  );

  const goPrevious = useCallback(() => {
    if (!hasMultipleTypologies) return;

    goToSlide(activeIndex - 1);
  }, [activeIndex, goToSlide, hasMultipleTypologies]);

  const goNext = useCallback(() => {
    if (!hasMultipleTypologies) return;

    goToSlide(activeIndex + 1);
  }, [activeIndex, goToSlide, hasMultipleTypologies]);

  useEffect(() => {
    if (
      isPaused ||
      selectedTypology ||
      !hasMultipleTypologies
    ) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((current) =>
        current === totalTypologies - 1
          ? 0
          : current + 1
      );
    }, AUTOPLAY_DELAY);

    return () => {
      window.clearInterval(timer);
    };
  }, [
    hasMultipleTypologies,
    isPaused,
    selectedTypology,
    totalTypologies,
  ]);

  useEffect(() => {
    if (!selectedTypology) return;

    const handleKeyDown = (
      event: globalThis.KeyboardEvent
    ) => {
      if (event.key === "Escape") {
        closeImageModal();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener(
        "keydown",
        handleKeyDown
      );

      document.body.style.overflow = "";
    };
  }, [closeImageModal, selectedTypology]);

  const handleKeyDown = (
    event: KeyboardEvent<HTMLDivElement>
  ) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goPrevious();
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      goNext();
    }
  };

  if (!activeTypology) return null;

  const sliderTransform = `translate3d(-${
    activeIndex * 100
  }%, 0, 0)`;

  return (
    <>
      <section
        className={styles.typologies}
        data-mode={mode}
        aria-label="Tipologías de departamentos Neo Balto"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => {
          if (!selectedTypology) {
            setIsPaused(false);
          }
        }}
        onFocus={() => setIsPaused(true)}
        onBlur={() => {
          if (!selectedTypology) {
            setIsPaused(false);
          }
        }}
      >
        <div
          className={styles.visual}
          role="region"
          aria-label="Slider de tipologías Neo Balto"
          tabIndex={0}
          onKeyDown={handleKeyDown}
        >
          <div
            className={styles.visualTrack}
            style={{
              transform: sliderTransform,
            }}
          >
            {typologies.map((typology, index) => (
              <article
                key={typology.id}
                className={styles.visualSlide}
                aria-hidden={index !== activeIndex}
              >
                <button
                  type="button"
                  className={styles.imageButton}
                  onClick={() =>
                    setSelectedTypology(typology)
                  }
                  aria-label={`Ver imagen ampliada de ${typology.type}`}
                >
                  <img
                    src={typology.image}
                    alt={`${typology.type} de Neo Balto`}
                    className={styles.image}
                    draggable={false}
                  />
                </button>

                <div
                  className={styles.imageOverlay}
                  aria-hidden={true}
                />

                <div className={styles.visualTop}>
                  <span>{typology.tag}</span>
                </div>

                <div className={styles.visualTitle}>
                  <span>{typology.type}</span>
                  <h3>{typology.title}</h3>
                </div>
              </article>
            ))}
          </div>

          <div className={styles.counter}>
            {String(activeIndex + 1).padStart(2, "0")} /{" "}
            {String(totalTypologies).padStart(2, "0")}
          </div>

          {hasMultipleTypologies && (
            <div className={styles.controls}>
              <button
                type="button"
                onClick={goPrevious}
                aria-label="Ver tipología anterior"
              >
                <ArrowLeftIcon
                  size={18}
                  weight="bold"
                  aria-hidden={true}
                />
              </button>

              <button
                type="button"
                onClick={goNext}
                aria-label="Ver siguiente tipología"
              >
                <ArrowRightIcon
                  size={18}
                  weight="bold"
                  aria-hidden={true}
                />
              </button>
            </div>
          )}
        </div>

        <div
          key={activeTypology.id}
          className={styles.content}
        >
          <div className={styles.contentHeader}>
            <span>Tipologías Neo Balto</span>

            <strong>
              Encuentra el departamento ideal para ti y tu
              mascota
            </strong>
          </div>

          <p className={styles.concept}>
            {activeTypology.concept}
          </p>

          <div className={styles.details}>
            <div>
              <span>Ideal para</span>
              <strong>{activeTypology.audience}</strong>
            </div>

            <div>
              <span>Diseño</span>
              <strong>{activeTypology.design}</strong>
            </div>
          </div>

          <div className={styles.ctaArea}>
            <ActionButton
              href={projectHref}
              icon={ArrowRightIcon}
              iconPosition="right"
              variant="light"
              size="md"
              mobileSize="sm"
              className={styles.ctaButton}
            >
              Quiero esta tipología
            </ActionButton>

            <span className={styles.ctaHint}>
              Recibe precios y disponibilidad
            </span>
          </div>

          {hasMultipleTypologies && (
            <div
              className={styles.dots}
              aria-label="Seleccionar tipología"
            >
              {typologies.map((typology, index) => (
                <button
                  key={typology.id}
                  type="button"
                  className={
                    index === activeIndex
                      ? styles.activeDot
                      : ""
                  }
                  aria-label={`Ver ${typology.type}`}
                  aria-current={
                    index === activeIndex ? "true" : undefined
                  }
                  onClick={() => goToSlide(index)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {selectedTypology && (
        <div
          className={styles.imageModalOverlay}
          role="dialog"
          aria-modal="true"
          aria-label={`Imagen ampliada de ${selectedTypology.type}`}
          onClick={closeImageModal}
        >
          <div
            className={styles.imageModal}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className={styles.imageModalClose}
              onClick={closeImageModal}
              aria-label="Cerrar imagen"
            >
              ×
            </button>

            <img
              src={selectedTypology.image}
              alt={`${selectedTypology.type} ampliada`}
            />

            <p className={styles.imageModalCaption}>
              {selectedTypology.type}
            </p>
          </div>
        </div>
      )}
    </>
  );
}