"use client";


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
import { amenities } from "../data";
import styles from "./NeoEmperatrizAmenities.module.css";

const AUTOPLAY_DELAY = 5000;
const DRAG_THRESHOLD = 55;

type PointerStart = {
  x: number;
  y: number;
};

export default function NeoEmperatrizAmenitiesSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);

  const pointerStartRef = useRef<PointerStart | null>(null);

  const totalAmenities = amenities.length;
  const hasMultipleAmenities = totalAmenities > 1;

  const goToSlide = useCallback(
    (index: number) => {
      if (!totalAmenities) return;

      const nextIndex =
        (index + totalAmenities) % totalAmenities;

      setActiveIndex(nextIndex);
      setDragOffset(0);
    },
    [totalAmenities]
  );

  const goPrevious = useCallback(() => {
    if (!hasMultipleAmenities) return;

    goToSlide(activeIndex - 1);
  }, [
    activeIndex,
    goToSlide,
    hasMultipleAmenities,
  ]);

  const goNext = useCallback(() => {
    if (!hasMultipleAmenities) return;

    goToSlide(activeIndex + 1);
  }, [
    activeIndex,
    goToSlide,
    hasMultipleAmenities,
  ]);

  useEffect(() => {
    if (
      isPaused ||
      isDragging ||
      !hasMultipleAmenities
    ) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((current) =>
        current === totalAmenities - 1
          ? 0
          : current + 1
      );
    }, AUTOPLAY_DELAY);

    return () => {
      window.clearInterval(timer);
    };
  }, [
    hasMultipleAmenities,
    isDragging,
    isPaused,
    totalAmenities,
  ]);

  const resetDrag = useCallback(() => {
    pointerStartRef.current = null;
    setIsDragging(false);
    setDragOffset(0);
  }, []);

  const handlePointerDown = (
    event: PointerEvent<HTMLDivElement>
  ) => {
    if (!hasMultipleAmenities) return;

    const target = event.target as HTMLElement;

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
      event.clientX - pointerStartRef.current.x;

    const differenceY =
      event.clientY - pointerStartRef.current.y;

    const isVerticalMovement =
      Math.abs(differenceY) >
      Math.abs(differenceX);

    if (
      isVerticalMovement &&
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
      event.clientX - pointerStartRef.current.x;

    const differenceY =
      event.clientY - pointerStartRef.current.y;

    const isHorizontalSwipe =
      Math.abs(differenceX) > DRAG_THRESHOLD &&
      Math.abs(differenceX) >
        Math.abs(differenceY);

    resetDrag();

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
    if (!hasMultipleAmenities) return;

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goPrevious();
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      goNext();
    }
  };

  if (!totalAmenities) return null;

  const sliderTransform = `translate3d(calc(-${
    activeIndex * 100
  }% + ${dragOffset}px), 0, 0)`;

  return (
    <section
      className={styles.amenitiesSection}
      aria-labelledby="neo-emperatriz-amenities-title"
    >
      <div className={styles.amenitiesHeader}>
        <span>Áreas comunes</span>

        <h2 id="neo-emperatriz-amenities-title">
          Espacios para disfrutar una vida con mayor comodidad
        </h2>

        <p>
          Neo Emperatriz cuenta con áreas comunes diseñadas para
          compartir, relajarte y disfrutar momentos especiales sin
          salir de tu edificio.
        </p>
      </div>

      <div
        className={styles.amenitiesCard}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => {
          if (!isDragging) {
            setIsPaused(false);
          }
        }}
        onFocus={() => setIsPaused(true)}
        onBlur={() => setIsPaused(false)}
      >
        <div className={styles.amenitiesNumber}>
          <strong>{totalAmenities}</strong>

          <span>Áreas comunes</span>

          <div className={styles.amenitiesProgress}>
            <span
              style={{
                width: `${
                  ((activeIndex + 1) /
                    totalAmenities) *
                  100
                }%`,
              }}
            />
          </div>

          <small>
            {String(activeIndex + 1).padStart(
              2,
              "0"
            )}{" "}
            /{" "}
            {String(totalAmenities).padStart(
              2,
              "0"
            )}
          </small>
        </div>

        <div
          className={`${styles.amenitiesViewport} ${
            isDragging ? styles.dragging : ""
          }`}
          tabIndex={0}
          role="region"
          aria-roledescription="carrusel"
          aria-label="Galería de áreas comunes de Neo Emperatriz"
          onKeyDown={handleKeyDown}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerCancel}
        >
          <div
            className={styles.amenitiesTrack}
            style={{
              transform: sliderTransform,
              transition: isDragging
                ? "none"
                : undefined,
            }}
          >
            {amenities.map((item, index) => (
              <article
                key={item.title}
                className={styles.amenitySlide}
                aria-hidden={
                  index !== activeIndex
                }
              >
                <img
                  src={item.image}
                  alt={`${item.title} de Neo Emperatriz`}
                  width={1600}
                  height={900}
                  loading={
                    index === 0
                      ? "eager"
                      : "lazy"
                  }
                  draggable={false}
                />

                <div
                  className={styles.amenityOverlay}
                  aria-hidden={true}
                />

                <div
                  className={styles.amenityContent}
                >
                  <span>Área común</span>

                  <h3>{item.title}</h3>

                  {item.description && (
                    <p>{item.description}</p>
                  )}
                </div>
              </article>
            ))}
          </div>

          {hasMultipleAmenities && (
            <>
              <div
                className={styles.amenitiesControls}
              >
                <button
                  type="button"
                  onClick={goPrevious}
                  aria-label="Ver área común anterior"
                >
                  <ArrowLeftIcon
                    size={19}
                    weight="bold"
                    aria-hidden={true}
                  />
                </button>

                <button
                  type="button"
                  onClick={goNext}
                  aria-label="Ver siguiente área común"
                >
                  <ArrowRightIcon
                    size={19}
                    weight="bold"
                    aria-hidden={true}
                  />
                </button>
              </div>

              <div
                className={styles.sliderDots}
                aria-label="Seleccionar área común"
              >
                {amenities.map((item, index) => (
                  <button
                    key={item.title}
                    type="button"
                    aria-label={`Ver ${item.title}`}
                    aria-current={
                      index === activeIndex
                        ? "true"
                        : undefined
                    }
                    className={
                      index === activeIndex
                        ? styles.activeDot
                        : ""
                    }
                    onClick={() =>
                      goToSlide(index)
                    }
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}