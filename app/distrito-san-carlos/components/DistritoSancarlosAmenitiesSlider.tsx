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
import styles from "./DistritoSanCarlosAmenities.module.css";

const AUTOPLAY_DELAY = 5000;
const DRAG_THRESHOLD = 55;
const CLICK_THRESHOLD = 8;

type PointerStart = {
  x: number;
  y: number;
};

type Amenity = (typeof amenities)[number];

export default function DistritoSanCarlosAmenitiesSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [selectedAmenity, setSelectedAmenity] =
    useState<Amenity | null>(null);

  const pointerStartRef = useRef<PointerStart | null>(null);
  const hasMovedRef = useRef(false);

  const totalAmenities = amenities.length;
  const hasMultipleAmenities = totalAmenities > 1;

  const closeModal = useCallback(() => {
    setSelectedAmenity(null);
  }, []);

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
  }, [activeIndex, goToSlide, hasMultipleAmenities]);

  const goNext = useCallback(() => {
    if (!hasMultipleAmenities) return;

    goToSlide(activeIndex + 1);
  }, [activeIndex, goToSlide, hasMultipleAmenities]);

  useEffect(() => {
    if (
      isPaused ||
      isDragging ||
      selectedAmenity ||
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

    return () => window.clearInterval(timer);
  }, [
    hasMultipleAmenities,
    isDragging,
    isPaused,
    selectedAmenity,
    totalAmenities,
  ]);

  useEffect(() => {
    if (!selectedAmenity) return;

    const handleKeyDown = (
      event: globalThis.KeyboardEvent
    ) => {
      if (event.key === "Escape") {
        closeModal();
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
  }, [closeModal, selectedAmenity]);

  const resetDrag = () => {
    pointerStartRef.current = null;
    setIsDragging(false);
    setDragOffset(0);
  };

  const handlePointerDown = (
    event: PointerEvent<HTMLDivElement>
  ) => {
    if (!hasMultipleAmenities) return;

    const target = event.target as HTMLElement;

    if (
      target.closest("[data-slider-control='true']") ||
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

    hasMovedRef.current = false;

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
      event.clientX - pointerStartRef.current.x;

    const differenceY =
      event.clientY - pointerStartRef.current.y;

    if (
      Math.abs(differenceX) > CLICK_THRESHOLD ||
      Math.abs(differenceY) > CLICK_THRESHOLD
    ) {
      hasMovedRef.current = true;
    }

    const isVerticalMovement =
      Math.abs(differenceY) > Math.abs(differenceX);

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
      Math.abs(differenceX) > Math.abs(differenceY);

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
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goPrevious();
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      goNext();
    }
  };

  const handleSlideClick = (
    item: Amenity,
    index: number
  ) => {
    if (index !== activeIndex) return;

    if (hasMovedRef.current) {
      hasMovedRef.current = false;
      return;
    }

    setIsPaused(true);
    setSelectedAmenity(item);
  };

  if (!totalAmenities) return null;

  const sliderTransform = `translate3d(calc(-${
    activeIndex * 100
  }% + ${dragOffset}px), 0, 0)`;

  return (
    <>
      <section
        className={styles.amenitiesSection}
        aria-labelledby="distrito-san-carlos-amenities-title"
      >
        <div className={styles.amenitiesHeader}>
          <span>Áreas comunes</span>

          <h2 id="distrito-san-carlos-amenities-title">
            Todo lo que necesitas dentro de tu propio distrito
          </h2>

          <p>
            Disfruta espacios para compartir, trabajar, entrenar
            y vivir en familia sin alejarte de tu hogar.
          </p>
        </div>

        <div
          className={styles.amenitiesCard}
          onPointerEnter={() => setIsPaused(true)}
          onPointerLeave={() => {
            if (!isDragging && !selectedAmenity) {
              setIsPaused(false);
            }
          }}
          onFocus={() => setIsPaused(true)}
          onBlur={() => {
            if (!selectedAmenity) {
              setIsPaused(false);
            }
          }}
        >
          <div className={styles.amenitiesNumber}>
            <strong>+{totalAmenities}</strong>

            <span>Áreas comunes</span>

            <div className={styles.amenitiesProgress}>
              <span
                style={{
                  width: `${
                    ((activeIndex + 1) / totalAmenities) *
                    100
                  }%`,
                }}
              />
            </div>

            <small>
              {String(activeIndex + 1).padStart(2, "0")} /{" "}
              {String(totalAmenities).padStart(2, "0")}
            </small>
          </div>

          <div
            className={`${styles.amenitiesViewport} ${
              isDragging ? styles.dragging : ""
            }`}
            tabIndex={0}
            role="region"
            aria-label="Galería de áreas comunes de Distrito San Carlos"
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
                transition: isDragging ? "none" : undefined,
              }}
            >
              {amenities.map((item, index) => (
                <article
                  key={item.title}
                  className={styles.amenitySlide}
                  aria-hidden={index !== activeIndex}
                  onClick={() =>
                    handleSlideClick(item, index)
                  }
                >
                  <img
                    src={item.image}
                    alt={`${item.title} de Distrito San Carlos`}
                    width={1600}
                    height={900}
                    loading={index === 0 ? "eager" : "lazy"}
                    draggable={false}
                  />
                </article>
              ))}
            </div>

            {hasMultipleAmenities && (
              <>
                <div className={styles.amenitiesControls}>
                  <button
                    type="button"
                    data-slider-control="true"
                    onClick={goPrevious}
                    aria-label="Área común anterior"
                  >
                    <ArrowLeftIcon
                      size={19}
                      weight="bold"
                      aria-hidden={true}
                    />
                  </button>

                  <button
                    type="button"
                    data-slider-control="true"
                    onClick={goNext}
                    aria-label="Siguiente área común"
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
                      data-slider-control="true"
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
                      onClick={() => goToSlide(index)}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {selectedAmenity && (
        <div
          className={styles.amenityModalOverlay}
          role="dialog"
          aria-modal="true"
          aria-label={`Imagen completa de ${selectedAmenity.title}`}
          onClick={closeModal}
        >
          <div
            className={styles.amenityModal}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className={styles.amenityModalClose}
              onClick={closeModal}
              aria-label="Cerrar imagen"
            >
              ×
            </button>

            <img
              src={selectedAmenity.image}
              alt={`${selectedAmenity.title} ampliada`}
            />
          </div>
        </div>
      )}
    </>
  );
}