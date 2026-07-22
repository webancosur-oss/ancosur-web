"use client";

import { PhoneIcon } from "@phosphor-icons/react";
import Image from "next/image";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent,
} from "react";
import HeroSliderControls from "./HeroSliderControls";
import styles from "./HeroAncosur.module.css";
import ActionButton from "../buttons/ActionButton";

const AUTO_PLAY_DELAY = 6500;
const SWIPE_THRESHOLD = 55;

const slides = [
  {
    id: 1,
    title: "Una Ciudad dentro de tu Edificio",
    location: "Huancayo",
    type: "Desde 54 - 82 m²",
    price: "Desde S/ 200.688",
    logoImage: "/assets/images/distrito-sancarlos.svg",
    desktopImage: "/assets/projects/sliders/distrito-san-carlos.webp",
    mobileImage:
      "/assets/projects/sliders/mobile/distrito-san-carlos-mobile.webp",
  },
  {
    id: 2,
    title: "El Primer Edificio Wellness de Huancayo",
    location: "Ribera",
    type: "Desde 57 - 67 m²",
    price: "Desde S/ 224.690",
    logoImage: "/assets/images/neo-rivera.svg",
    desktopImage: "/assets/projects/sliders/neo-rivera.webp",
    mobileImage: "/assets/projects/sliders/mobile/neo-rivera-mobile.webp",
  },
  {
    id: 3,
    title: "El Primer Edificio con ADN Deportivo de Huancayo",
    location: "San Carlos",
    type: "Desde 68 - 79 m²",
    price: "Desde S/ 228.755",
    logoImage: "/assets/images/neo-xport.svg",
    desktopImage: "/assets/projects/sliders/neo-xport.webp",
    mobileImage: "/assets/projects/sliders/mobile/neo-xport-mobile.webp",
  },
  {
    id: 4,
    title: "Inversión Inteligente en el Corazón de la Zona Universitaria",
    location: "San Carlos",
    type: "Desde 54 - 82 m²",
    price: "Desde S/ 311.292",
    logoImage: "/assets/images/neo-eterna.svg",
    desktopImage: "/assets/projects/sliders/neo-eterna.webp",
    mobileImage: "/assets/projects/sliders/mobile/neo-eterna-mobile.webp",
  },
  {
    id: 5,
    title: "El Primer Edificio Pet-Centric de Huancayo",
    location: "San Augustin",
    type: "Desde 54 - 82 m²",
    price: "Desde S/ 191.300",
    logoImage: "/assets/images/neo-balto.svg",
    desktopImage: "/assets/projects/sliders/neo-balto.webp",
    mobileImage: "/assets/projects/sliders/mobile/neo-balto-mobile.webp",
  },
];

type SlideDirection = "next" | "prev";

type PointerStart = {
  x: number;
  y: number;
};

export default function HeroAncosur() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<SlideDirection>("next");
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);

  const pointerStartRef = useRef<PointerStart | null>(null);

  const activeSlide = slides[activeIndex];

  const directionClass =
    direction === "next" ? styles.slideNext : styles.slidePrev;

  const sliderTransform = useMemo(() => {
    return `translate3d(calc(-${activeIndex * 100}% + ${dragOffset}px), 0, 0)`;
  }, [activeIndex, dragOffset]);

  const resetDrag = () => {
    pointerStartRef.current = null;
    setIsDragging(false);
    setDragOffset(0);
  };

  const goToSlide = useCallback(
    (index: number, selectedDirection?: SlideDirection) => {
      const total = slides.length;
      const nextIndex = (index + total) % total;

      if (nextIndex === activeIndex) return;

      const autoDirection = nextIndex > activeIndex ? "next" : "prev";

      setDirection(selectedDirection ?? autoDirection);
      setActiveIndex(nextIndex);
      setDragOffset(0);
    },
    [activeIndex]
  );

  const goNext = useCallback(() => {
    goToSlide(activeIndex + 1, "next");
  }, [activeIndex, goToSlide]);

  const goPrev = useCallback(() => {
    goToSlide(activeIndex - 1, "prev");
  }, [activeIndex, goToSlide]);

  useEffect(() => {
    if (isPaused || isDragging) return;

    const timer = window.setInterval(() => {
      setDirection("next");
      setActiveIndex((currentIndex) => (currentIndex + 1) % slides.length);
    }, AUTO_PLAY_DELAY);

    return () => window.clearInterval(timer);
  }, [isPaused, isDragging]);

  const handlePointerDown = (event: PointerEvent<HTMLElement>) => {
    const target = event.target as HTMLElement;

    if (target.closest("button") || target.closest("a")) {
      return;
    }

    pointerStartRef.current = {
      x: event.clientX,
      y: event.clientY,
    };

    setIsPaused(true);
    setIsDragging(true);
    setDragOffset(0);

    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    if (!pointerStartRef.current || !isDragging) return;

    const diffX = event.clientX - pointerStartRef.current.x;
    const diffY = event.clientY - pointerStartRef.current.y;

    if (Math.abs(diffY) > Math.abs(diffX) && Math.abs(diffY) > 14) {
      setDragOffset(0);
      return;
    }

    setDragOffset(diffX);
  };

  const handlePointerUp = (event: PointerEvent<HTMLElement>) => {
    if (!pointerStartRef.current) return;

    const diffX = event.clientX - pointerStartRef.current.x;
    const diffY = event.clientY - pointerStartRef.current.y;

    const isHorizontalSwipe =
      Math.abs(diffX) > SWIPE_THRESHOLD && Math.abs(diffX) > Math.abs(diffY);

    resetDrag();

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    if (!isHorizontalSwipe) return;

    if (diffX < 0) {
      goNext();
    } else {
      goPrev();
    }
  };

  const handlePointerCancel = (event: PointerEvent<HTMLElement>) => {
    resetDrag();

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      goNext();
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goPrev();
    }
  };

  return (
    <section
      className={`${styles.hero} ${isDragging ? styles.dragging : ""}`}
      onPointerEnter={() => setIsPaused(true)}
      onPointerLeave={() => {
        if (!isDragging) {
          setIsPaused(false);
        }
      }}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerCancel}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      aria-label="Slider principal de proyectos ANCOSUR"
    >
      <div className={styles.background}>
        <div
          className={styles.sliderTrack}
          style={{
            transform: sliderTransform,
            transition: isDragging ? "none" : undefined,
          }}
        >
          {slides.map((slide, index) => (
            <div key={slide.id} className={styles.slidePanel}>
              <Image
                src={slide.desktopImage}
                alt={slide.title}
                fill
                priority={index === 0}
                className={`${styles.backgroundImage} ${styles.desktopImage}`}
                sizes="100vw"
                draggable={false}
              />

              <Image
                src={slide.mobileImage}
                alt={slide.title}
                fill
                priority={index === 0}
                className={`${styles.backgroundImage} ${styles.mobileImage}`}
                sizes="100vw"
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>

      <div
        key={`content-${activeSlide.id}`}
        className={`${styles.content} ${directionClass}`}
      >
        <h1 className={styles.seoTitle}>{activeSlide.title}</h1>

        <div className={styles.titleLogoBox}>
          <Image
            src={activeSlide.logoImage}
            alt={activeSlide.title}
            width={420}
            height={140}
            priority={activeIndex === 0}
            className={styles.titleLogo}
            draggable={false}
          />
        </div>

        <p className={styles.subtitle}>{activeSlide.title}</p>

        <div className={styles.searchBox}>
          <div className={styles.searchItem}>
            <span>Ubicación</span>
            <strong>{activeSlide.location}</strong>
          </div>

          <div className={styles.divider} />

          <div className={styles.searchItem}>
            <span>Metraje</span>
            <strong>{activeSlide.type}</strong>
          </div>

          <div className={styles.divider} />

          <div className={styles.searchItem}>
            <span>Precio</span>
            <strong>{activeSlide.price}</strong>
          </div>

          <ActionButton
            href="#contactar"
            ariaLabel="Contactar con ANCOSUR"
            icon={PhoneIcon}
            iconPosition="right"
            size="sm"
            fullWidth
            className={styles.searchButton}
          >
            Contactar
          </ActionButton>
        </div>
      </div>

      <HeroSliderControls
        slides={slides}
        activeIndex={activeIndex}
        goPrev={goPrev}
        goNext={goNext}
        goToSlide={(index) => goToSlide(index)}
      />
    </section>
  );
}