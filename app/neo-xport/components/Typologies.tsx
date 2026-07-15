"use client";

/* eslint-disable @next/next/no-img-element */

import ActionButton from "@/components/buttons/ActionButton";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
} from "@phosphor-icons/react";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent,
} from "react";

import styles from "./Typologies.module.css";

type TypologiesProps = {
  mode?: "compact";
  projectHref?: string;
};

type PointerPosition = {
  x: number;
  y: number;
};

type Typology = {
  id: string;
  type: string;
  title: string;
  area: string;
  concept: string;
  audience: string;
  design: string;
  tag: string;
  image: string;
};

const AUTOPLAY_DELAY = 5200;
const SWIPE_THRESHOLD = 55;

const typologies: Typology[] = [
  {
    id: "impulso",
    type: "Tipo Impulso",
    title: "Muévete hacia tu próximo hogar",
    area: "61 m²",
    concept:
      "Una distribución funcional para quienes buscan independencia, comodidad y un estilo de vida activo cerca de todo.",
    audience:
      "Personas independientes, parejas e inversionistas",
    design:
      "Ambientes funcionales y bien distribuidos",
    tag: "61 m²",
    image:
      "/assets/projects/neo-xport/typologies/tipo-impulso.webp",
  },
  {
    id: "luz",
    type: "Tipo Luz",
    title: "Más espacio para vivir a tu ritmo",
    area: "68 m²",
    concept:
      "Un departamento con mayor amplitud e iluminación natural, diseñado para disfrutar una vida cómoda, dinámica y familiar.",
    audience:
      "Parejas, familias jóvenes y profesionales",
    design:
      "Mayor amplitud e iluminación natural",
    tag: "68 m²",
    image:
      "/assets/projects/neo-xport/typologies/tipo-luz.webp",
  },
];

export default function Typologies({
  mode = "compact",
  projectHref = "#informacion-neo-xport",
}: TypologiesProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);

  const pointerStartRef =
    useRef<PointerPosition | null>(null);

  const totalTypologies = typologies.length;
  const hasMultipleTypologies =
    totalTypologies > 1;

  const activeTypology =
    typologies[activeIndex];

  const goToSlide = useCallback(
    (index: number) => {
      if (!totalTypologies) return;

      const nextIndex =
        (index + totalTypologies) %
        totalTypologies;

      setActiveIndex(nextIndex);
      setDragOffset(0);
    },
    [totalTypologies]
  );

  const goPrevious = useCallback(() => {
    if (!hasMultipleTypologies) return;

    goToSlide(activeIndex - 1);
  }, [
    activeIndex,
    goToSlide,
    hasMultipleTypologies,
  ]);

  const goNext = useCallback(() => {
    if (!hasMultipleTypologies) return;

    goToSlide(activeIndex + 1);
  }, [
    activeIndex,
    goToSlide,
    hasMultipleTypologies,
  ]);

  useEffect(() => {
    if (
      isPaused ||
      isDragging ||
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

    return () =>
      window.clearInterval(timer);
  }, [
    hasMultipleTypologies,
    isDragging,
    isPaused,
    totalTypologies,
  ]);

  const resetDrag = () => {
    pointerStartRef.current = null;
    setIsDragging(false);
    setDragOffset(0);
  };

  const handlePointerDown = (
    event: PointerEvent<HTMLDivElement>
  ) => {
    if (!hasMultipleTypologies) return;

    const target =
      event.target as HTMLElement;

    if (
      target.closest("button") ||
      target.closest("a")
    ) {
      return;
    }

    if (
      event.pointerType === "mouse" &&
      event.button !== 0
    ) {
      return;
    }

    pointerStartRef.current = {
      x: event.clientX,
      y: event.clientY,
    };

    setIsPaused(true);
    setIsDragging(true);
    setDragOffset(0);

    event.currentTarget.setPointerCapture(
      event.pointerId
    );
  };

  const handlePointerMove = (
    event: PointerEvent<HTMLDivElement>
  ) => {
    if (
      !pointerStartRef.current ||
      !isDragging
    ) {
      return;
    }

    const differenceX =
      event.clientX -
      pointerStartRef.current.x;

    const differenceY =
      event.clientY -
      pointerStartRef.current.y;

    const isVerticalGesture =
      Math.abs(differenceY) >
      Math.abs(differenceX);

    if (
      isVerticalGesture &&
      Math.abs(differenceY) > 12
    ) {
      setDragOffset(0);
      return;
    }

    event.preventDefault();
    setDragOffset(differenceX);
  };

  const handlePointerUp = (
    event: PointerEvent<HTMLDivElement>
  ) => {
    if (!pointerStartRef.current) return;

    const differenceX =
      event.clientX -
      pointerStartRef.current.x;

    const differenceY =
      event.clientY -
      pointerStartRef.current.y;

    const isHorizontalSwipe =
      Math.abs(differenceX) >
        SWIPE_THRESHOLD &&
      Math.abs(differenceX) >
        Math.abs(differenceY);

    resetDrag();
    setIsPaused(false);

    if (
      event.currentTarget.hasPointerCapture(
        event.pointerId
      )
    ) {
      event.currentTarget.releasePointerCapture(
        event.pointerId
      );
    }

    if (!isHorizontalSwipe) return;

    if (differenceX < 0) {
      goNext();
    } else {
      goPrevious();
    }
  };

  const handlePointerCancel = (
    event: PointerEvent<HTMLDivElement>
  ) => {
    resetDrag();
    setIsPaused(false);

    if (
      event.currentTarget.hasPointerCapture(
        event.pointerId
      )
    ) {
      event.currentTarget.releasePointerCapture(
        event.pointerId
      );
    }
  };

  const handleKeyDown = (
    event: KeyboardEvent<HTMLDivElement>
  ) => {
    if (!hasMultipleTypologies) return;

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

  const sliderTransform = `translate3d(calc(-${
    activeIndex * 100
  }% + ${dragOffset}px), 0, 0)`;

  return (
    <section
      className={`${styles.typologies} ${
        mode === "compact"
          ? styles.compact
          : ""
      }`}
      aria-label="Tipologías de departamentos de Neo Xport"
      onPointerEnter={() =>
        setIsPaused(true)
      }
      onPointerLeave={() => {
        if (!isDragging) {
          setIsPaused(false);
        }
      }}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <div
        className={`${styles.visual} ${
          isDragging
            ? styles.dragging
            : ""
        }`}
        role="region"
        aria-label="Galería de tipologías de Neo Xport"
        tabIndex={
          hasMultipleTypologies ? 0 : -1
        }
        onKeyDown={handleKeyDown}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={
          handlePointerCancel
        }
      >
        <div
          className={styles.visualTrack}
          style={{
            transform: sliderTransform,
            transition: isDragging
              ? "none"
              : undefined,
          }}
        >
          {typologies.map(
            (typology, index) => (
              <article
                key={typology.id}
                className={
                  styles.visualSlide
                }
                aria-hidden={
                  index !== activeIndex
                }
              >
                <img
                  src={typology.image}
                  alt={`Plano del ${typology.type} de Neo Xport, ${typology.area}`}
                  className={styles.image}
                  width={1200}
                  height={800}
                  loading={
                    index === 0
                      ? "eager"
                      : "lazy"
                  }
                  draggable={false}
                />

                <div
                  className={
                    styles.imageOverlay
                  }
                  aria-hidden={true}
                />

                <div
                  className={
                    styles.visualTop
                  }
                >
                  <span>
                    {typology.tag}
                  </span>
                </div>

                <div
                  className={`${styles.visualTitle} ${
                    !hasMultipleTypologies
                      ? styles.visualTitleSingle
                      : ""
                  }`}
                >
                  <span>
                    Departamento
                  </span>

                  <h3>
                    {typology.type}
                  </h3>

                  <strong>
                    {typology.area}
                  </strong>
                </div>
              </article>
            )
          )}
        </div>

        {hasMultipleTypologies && (
          <div className={styles.counter}>
            {String(
              activeIndex + 1
            ).padStart(2, "0")}{" "}
            /{" "}
            {String(
              totalTypologies
            ).padStart(2, "0")}
          </div>
        )}

        {hasMultipleTypologies && (
          <div className={styles.controls}>
            <button
              type="button"
              onClick={goPrevious}
              aria-label="Tipología anterior"
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
              aria-label="Siguiente tipología"
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
        <div
          className={
            styles.contentHeader
          }
        >
          <span>
            Tipologías Neo Xport
          </span>

          <strong>
            Elige el depa que se mueve
            contigo
          </strong>
        </div>

        <div
          className={
            styles.activeTypology
          }
        >
          <span>
            {activeTypology.type}
          </span>

          <strong>
            {activeTypology.title}
          </strong>
        </div>

        <p className={styles.concept}>
          {activeTypology.concept}
        </p>

        <div className={styles.details}>
          <div>
            <span>Área</span>

            <strong>
              {activeTypology.area}
            </strong>
          </div>

          <div>
            <span>Ideal para</span>

            <strong>
              {activeTypology.audience}
            </strong>
          </div>
        </div>

        <div className={styles.design}>
          <span>Diseño</span>

          <strong>
            {activeTypology.design}
          </strong>
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
            Recibe precios y
            disponibilidad
          </span>
        </div>

        {hasMultipleTypologies && (
          <div
            className={styles.dots}
            aria-label="Seleccionar tipología"
          >
            {typologies.map(
              (typology, index) => (
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
                    index === activeIndex
                      ? "true"
                      : undefined
                  }
                  onClick={() =>
                    goToSlide(index)
                  }
                />
              )
            )}
          </div>
        )}
      </div>
    </section>
  );
}