"use client";

import {
  ArrowLeftIcon,
  ArrowRightIcon,
  XIcon,
} from "@phosphor-icons/react";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent,
  type KeyboardEvent,
} from "react";

import { amenities } from "../data";
import styles from "./NeoBaltoAmenities.module.css";

const AUTOPLAY_DELAY = 5000;
const DRAG_THRESHOLD = 55;
const CLICK_THRESHOLD = 8;

type PointerStart = {
  x: number;
  y: number;
};

type Amenity = (typeof amenities)[number];

export default function NeoBaltoAmenitiesSlider() {
  /* =========================================================
     ESTADOS
  ========================================================= */

  const [activeIndex, setActiveIndex] = useState(0);

  const [isPaused, setIsPaused] = useState(false);

  const [isDragging, setIsDragging] = useState(false);

  const [dragOffset, setDragOffset] = useState(0);

  const [selectedAmenity, setSelectedAmenity] =
    useState<Amenity | null>(null);

  /* =========================================================
     REFS
  ========================================================= */

  const pointerStartRef =
    useRef<PointerStart | null>(null);

  const hasMovedRef = useRef(false);

  const pointerIdRef = useRef<number | null>(null);

  /* =========================================================
     DATOS
  ========================================================= */

  const totalAmenities = amenities.length;

  const hasMultipleAmenities =
    totalAmenities > 1;

  /* =========================================================
     MODAL
  ========================================================= */

  const openModal = useCallback(
    (item: Amenity) => {
      setSelectedAmenity(item);
      setIsPaused(true);
      setDragOffset(0);
    },
    []
  );

  const closeModal = useCallback(() => {
    setSelectedAmenity(null);
    setIsPaused(false);
  }, []);

  /* =========================================================
     CAMBIAR SLIDE
  ========================================================= */

  const goToSlide = useCallback(
    (index: number) => {
      if (!totalAmenities) return;

      const nextIndex =
        (index + totalAmenities) %
        totalAmenities;

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

  /* =========================================================
     AUTOPLAY
  ========================================================= */

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
        current >= totalAmenities - 1
          ? 0
          : current + 1
      );
    }, AUTOPLAY_DELAY);

    return () => {
      window.clearInterval(timer);
    };
  }, [
    isPaused,
    isDragging,
    selectedAmenity,
    hasMultipleAmenities,
    totalAmenities,
  ]);

  /* =========================================================
     ESCAPE + BLOQUEAR SCROLL
  ========================================================= */

  useEffect(() => {
    if (!selectedAmenity) {
      document.body.style.overflow = "";
      return;
    }

    const handleKeyDown = (
      event: globalThis.KeyboardEvent
    ) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    document.addEventListener(
      "keydown",
      handleKeyDown
    );

    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener(
        "keydown",
        handleKeyDown
      );

      document.body.style.overflow = "";
    };
  }, [
    selectedAmenity,
    closeModal,
  ]);

  /* =========================================================
     POINTER DOWN
  ========================================================= */

  const handlePointerDown = (
    event: PointerEvent<HTMLDivElement>
  ) => {
    if (!hasMultipleAmenities) return;

    const target =
      event.target as HTMLElement;

    /*
     * No iniciar swipe desde controles.
     */

    if (
      target.closest(
        "[data-slider-control='true']"
      )
    ) {
      return;
    }

    /*
     * Mouse:
     * solo botón izquierdo.
     */

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

    pointerIdRef.current =
      event.pointerId;

    hasMovedRef.current = false;

    setIsDragging(false);

    setDragOffset(0);

    setIsPaused(true);

    event.currentTarget.setPointerCapture(
      event.pointerId
    );
  };

  /* =========================================================
     POINTER MOVE
  ========================================================= */

  const handlePointerMove = (
    event: PointerEvent<HTMLDivElement>
  ) => {
    if (
      !pointerStartRef.current ||
      pointerIdRef.current !==
        event.pointerId
    ) {
      return;
    }

    const differenceX =
      event.clientX -
      pointerStartRef.current.x;

    const differenceY =
      event.clientY -
      pointerStartRef.current.y;

    /*
     * Todavía no se considera drag.
     */

    if (
      Math.abs(differenceX) <
        CLICK_THRESHOLD &&
      Math.abs(differenceY) <
        CLICK_THRESHOLD
    ) {
      return;
    }

    /*
     * Si el movimiento vertical es mayor,
     * no convertirlo en swipe.
     */

    if (
      Math.abs(differenceY) >
        Math.abs(differenceX)
    ) {
      return;
    }

    /*
     * Desde aquí se considera drag.
     */

    hasMovedRef.current = true;

    setIsDragging(true);

    event.preventDefault();

    setDragOffset(differenceX);
  };

  /* =========================================================
     POINTER UP
  ========================================================= */

  const handlePointerUp = (
    event: PointerEvent<HTMLDivElement>
  ) => {
    if (
      !pointerStartRef.current ||
      pointerIdRef.current !==
        event.pointerId
    ) {
      return;
    }

    const startX =
      pointerStartRef.current.x;

    const startY =
      pointerStartRef.current.y;

    const differenceX =
      event.clientX - startX;

    const differenceY =
      event.clientY - startY;

    const wasClick =
      Math.abs(differenceX) <
        CLICK_THRESHOLD &&
      Math.abs(differenceY) <
        CLICK_THRESHOLD &&
      !hasMovedRef.current;

    const isHorizontalSwipe =
      Math.abs(differenceX) >
        DRAG_THRESHOLD &&
      Math.abs(differenceX) >
        Math.abs(differenceY);

    /*
     * Guardar si fue click antes
     * de resetear los refs.
     */

    const clickedIndex =
      activeIndex;

    /*
     * Liberar pointer.
     */

    if (
      event.currentTarget.hasPointerCapture(
        event.pointerId
      )
    ) {
      event.currentTarget.releasePointerCapture(
        event.pointerId
      );
    }

    pointerStartRef.current = null;

    pointerIdRef.current = null;

    setIsDragging(false);

    setDragOffset(0);

    /*
     * CLICK REAL
     *
     * Aquí abrimos el popup.
     */

    if (wasClick) {
      const selected =
        amenities[clickedIndex];

      if (selected) {
        openModal(selected);
      }

      return;
    }

    /*
     * SWIPE
     */

    if (isHorizontalSwipe) {
      if (differenceX < 0) {
        goNext();
      } else {
        goPrevious();
      }
    }

    /*
     * Reactivar autoplay.
     */

    setIsPaused(false);
  };

  /* =========================================================
     POINTER CANCEL
  ========================================================= */

  const handlePointerCancel = (
    event: PointerEvent<HTMLDivElement>
  ) => {
    if (
      event.currentTarget.hasPointerCapture(
        event.pointerId
      )
    ) {
      event.currentTarget.releasePointerCapture(
        event.pointerId
      );
    }

    pointerStartRef.current = null;

    pointerIdRef.current = null;

    hasMovedRef.current = false;

    setIsDragging(false);

    setDragOffset(0);

    setIsPaused(false);
  };

  /* =========================================================
     TECLADO SLIDER
  ========================================================= */

  const handleSliderKeyDown = (
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

    if (
      event.key === "Enter" ||
      event.key === " "
    ) {
      event.preventDefault();

      const selected =
        amenities[activeIndex];

      if (selected) {
        openModal(selected);
      }
    }
  };

  /* =========================================================
     OVERLAY MODAL
  ========================================================= */

  const handleOverlayClick = () => {
    closeModal();
  };

  /* =========================================================
     SI NO HAY DATOS
  ========================================================= */

  if (!totalAmenities) {
    return null;
  }

  /* =========================================================
     TRANSFORMACIÓN
  ========================================================= */

  const sliderTransform = `translate3d(calc(-${
    activeIndex * 100
  }% + ${dragOffset}px), 0, 0)`;

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <>
      <section
        className={styles.amenitiesSection}
        aria-labelledby="distrito-san-carlos-amenities-title"
      >
        {/* ===================================================
            HEADER
        =================================================== */}

        <div
          className={styles.amenitiesHeader}
        >
          <span>
            Áreas comunes
          </span>

          <h2 id="distrito-san-carlos-amenities-title">
            Todo lo que necesitas dentro de tu propio distrito
          </h2>

          <p>
            Disfruta espacios para compartir,
            trabajar, entrenar y vivir en familia
            sin alejarte de tu hogar.
          </p>
        </div>

        {/* ===================================================
            CARD
        =================================================== */}

        <div
          className={styles.amenitiesCard}
          onPointerEnter={() => {
            if (!selectedAmenity) {
              setIsPaused(true);
            }
          }}
          onPointerLeave={() => {
            if (
              !isDragging &&
              !selectedAmenity
            ) {
              setIsPaused(false);
            }
          }}
        >
          {/* =================================================
              PANEL VERDE
          ================================================= */}

          <div
            className={
              styles.amenitiesNumber
            }
          >
            <strong>
              +{totalAmenities}
            </strong>

            <span>
              Áreas comunes
            </span>

            <div
              className={
                styles.amenitiesProgress
              }
            >
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
              {String(
                activeIndex + 1
              ).padStart(2, "0")}{" "}
              /{" "}
              {String(
                totalAmenities
              ).padStart(2, "0")}
            </small>
          </div>

          {/* =================================================
              VIEWPORT
          ================================================= */}

          <div
            className={`
              ${styles.amenitiesViewport}
              ${
                isDragging
                  ? styles.dragging
                  : ""
              }
            `}
            tabIndex={0}
            role="region"
            aria-label="Galería de áreas comunes"
            onKeyDown={
              handleSliderKeyDown
            }
            onPointerDown={
              handlePointerDown
            }
            onPointerMove={
              handlePointerMove
            }
            onPointerUp={
              handlePointerUp
            }
            onPointerCancel={
              handlePointerCancel
            }
          >
            {/* =================================================
                TRACK
            ================================================= */}

            <div
              className={
                styles.amenitiesTrack
              }
              style={{
                transform:
                  sliderTransform,

                transition: isDragging
                  ? "none"
                  : undefined,
              }}
            >
              {amenities.map(
                (item, index) => (
                  <article
                    key={`${item.title}-${index}`}
                    className={
                      styles.amenitySlide
                    }
                    aria-hidden={
                      index !==
                      activeIndex
                    }
                  >
                    <img
                      src={item.image}
                      alt={`${item.title} de Distrito San Carlos`}
                      width={1600}
                      height={900}
                      loading={
                        index === 0
                          ? "eager"
                          : "lazy"
                      }
                      draggable={false}
                    />
                  </article>
                )
              )}
            </div>

            {/* =================================================
                CONTROLES
            ================================================= */}

            {hasMultipleAmenities && (
              <>
                <div
                  className={
                    styles.amenitiesControls
                  }
                >
                  <button
                    type="button"
                    data-slider-control="true"
                    onPointerDown={(event) =>
                      event.stopPropagation()
                    }
                    onClick={
                      goPrevious
                    }
                    aria-label="Área común anterior"
                  >
                    <ArrowLeftIcon
                      size={19}
                      weight="bold"
                    />
                  </button>

                  <button
                    type="button"
                    data-slider-control="true"
                    onPointerDown={(event) =>
                      event.stopPropagation()
                    }
                    onClick={goNext}
                    aria-label="Siguiente área común"
                  >
                    <ArrowRightIcon
                      size={19}
                      weight="bold"
                    />
                  </button>
                </div>

                {/* =================================================
                    DOTS
                ================================================= */}

                <div
                  className={
                    styles.sliderDots
                  }
                  aria-label="Seleccionar área común"
                >
                  {amenities.map(
                    (item, index) => (
                      <button
                        key={`${item.title}-${index}`}
                        type="button"
                        data-slider-control="true"
                        onPointerDown={(
                          event
                        ) =>
                          event.stopPropagation()
                        }
                        onClick={() =>
                          goToSlide(
                            index
                          )
                        }
                        aria-label={`Ver ${item.title}`}
                        aria-current={
                          index ===
                          activeIndex
                            ? "true"
                            : undefined
                        }
                        className={
                          index ===
                          activeIndex
                            ? styles.activeDot
                            : ""
                        }
                      />
                    )
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* =====================================================
          POPUP / MODAL
      ===================================================== */}

      {selectedAmenity && (
        <div
          className={
            styles.amenityModalOverlay
          }
          role="dialog"
          aria-modal="true"
          aria-label={`Imagen ampliada de ${selectedAmenity.title}`}
          onClick={
            handleOverlayClick
          }
        >
          <div
            className={
              styles.amenityModal
            }
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            {/* ===============================================
                CERRAR
            =============================================== */}

            <button
              type="button"
              className={
                styles.amenityModalClose
              }
              onClick={closeModal}
              aria-label="Cerrar imagen"
            >
              <XIcon
                size={24}
                weight="bold"
              />
            </button>

            {/* ===============================================
                IMAGEN COMPLETA
            =============================================== */}

            <img
              src={
                selectedAmenity.image
              }
              alt={`${selectedAmenity.title} ampliada`}
              draggable={false}
            />
          </div>
        </div>
      )}
    </>
  );
}