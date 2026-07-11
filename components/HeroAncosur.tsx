"use client";

import {
  ArrowLeftIcon,
  ArrowRightIcon,
  PhoneCallIcon,
} from "@phosphor-icons/react";
import Image from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent,
} from "react";
import styles from "./HeroAncosur.module.css";

const AUTO_PLAY_DELAY = 6500;

const slides = [
  {
    id: 1,
    title: "Una Ciudad dentro de tu Edificio",
    location: "Huancayo",
    type: "Comprar",
    price: "Desde S/ 211,270",
    logoImage: "/assets/images/distrito-sancarlos.svg",
    desktopImage: "/assets/projects/sliders/distrito-san-carlos.webp",
    mobileImage:
      "/assets/projects/sliders/mobile/distrito-san-carlos-mobile.webp",
  },
  {
    id: 2,
    title: "El Primer Edificio Wellness de Huancayo",
    location: "Huancayo",
    type: "Comprar",
    price: "Desde S/ 211,270",
    logoImage: "/assets/images/neo-rivera.svg",
    desktopImage: "/assets/projects/sliders/neo-rivera.webp",
    mobileImage: "/assets/projects/sliders/mobile/neo-rivera-mobile.webp",
  },
  {
    id: 3,
    title: "El Primer Edificio con ADN Deportivo de Huancayo",
    location: "San Carlos",
    type: "Comprar",
    price: "Desde S/ 213,060",
    logoImage: "/assets/images/neo-xport.svg",
    desktopImage: "/assets/projects/sliders/neo-xport.webp",
    mobileImage: "/assets/projects/sliders/mobile/neo-xport-mobile.webp",
  },
  {
    id: 4,
    title: "Inversión Inteligente en el Corazón de la Zona Universitaria",
    location: "San Carlos",
    type: "Invertir",
    price: "Desde S/ 174,143",
    logoImage: "/assets/images/neo-eterna.svg",
    desktopImage: "/assets/projects/sliders/neo-eterna.webp",
    mobileImage: "/assets/projects/sliders/mobile/neo-eterna-mobile.webp",
  },
  {
    id: 5,
    title: "El Primer Edificio Pet-Centric de Huancayo",
    location: "El Tambo",
    type: "Comprar",
    price: "Desde S/ 169,590",
    logoImage: "/assets/images/neo-balto.svg",
    desktopImage: "/assets/projects/sliders/neo-balto.webp",
    mobileImage: "/assets/projects/sliders/mobile/neo-balto-mobile.webp",
  },
];

type SlideDirection = "next" | "prev";

export default function HeroAncosur() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<SlideDirection>("next");
  const [isPaused, setIsPaused] = useState(false);

  const pointerStartRef = useRef<{ x: number; y: number } | null>(null);

  const activeSlide = slides[activeIndex];

  const directionClass =
    direction === "next" ? styles.slideNext : styles.slidePrev;

  const goToSlide = useCallback(
    (index: number) => {
      const total = slides.length;
      const nextIndex = (index + total) % total;

      if (nextIndex === activeIndex) return;

      const isNext =
        nextIndex === (activeIndex + 1) % total || nextIndex > activeIndex;

      setDirection(isNext ? "next" : "prev");
      setActiveIndex(nextIndex);
    },
    [activeIndex]
  );

  const goNext = useCallback(() => {
    goToSlide(activeIndex + 1);
  }, [activeIndex, goToSlide]);

  const goPrev = useCallback(() => {
    goToSlide(activeIndex - 1);
  }, [activeIndex, goToSlide]);

  useEffect(() => {
    if (isPaused) return;

    const timer = window.setInterval(() => {
      setDirection("next");
      setActiveIndex((currentIndex) => (currentIndex + 1) % slides.length);
    }, AUTO_PLAY_DELAY);

    return () => window.clearInterval(timer);
  }, [isPaused]);

  const handlePointerDown = (event: PointerEvent<HTMLElement>) => {
    pointerStartRef.current = {
      x: event.clientX,
      y: event.clientY,
    };
  };

  const handlePointerUp = (event: PointerEvent<HTMLElement>) => {
    if (!pointerStartRef.current) return;

    const diffX = event.clientX - pointerStartRef.current.x;
    const diffY = event.clientY - pointerStartRef.current.y;

    if (Math.abs(diffX) > 55 && Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX < 0) {
        goNext();
      } else {
        goPrev();
      }
    }

    pointerStartRef.current = null;
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
      className={styles.hero}
      onPointerEnter={() => setIsPaused(true)}
      onPointerLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerCancel={() => {
        pointerStartRef.current = null;
      }}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      aria-label="Slider principal de proyectos ANCOSUR"
    >
      <div
        key={`background-${activeSlide.id}`}
        className={`${styles.background} ${directionClass}`}
      >
        <Image
          src={activeSlide.desktopImage}
          alt={activeSlide.title}
          fill
          priority={activeIndex === 0}
          className={`${styles.backgroundImage} ${styles.desktopImage}`}
          sizes="100vw"
        />

        <Image
          src={activeSlide.mobileImage}
          alt={activeSlide.title}
          fill
          priority={activeIndex === 0}
          className={`${styles.backgroundImage} ${styles.mobileImage}`}
          sizes="100vw"
        />
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
            width={560}
            height={190}
            priority={activeIndex === 0}
            className={styles.titleLogo}
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
            <span>Buscas</span>
            <strong>{activeSlide.type}</strong>
          </div>

          <div className={styles.divider} />

          <div className={styles.searchItem}>
            <span>Precio</span>
            <strong>{activeSlide.price}</strong>
          </div>

          <a href="#contactar" className={styles.searchButton}>
            Contactar
            <PhoneCallIcon size={20} weight="bold" aria-hidden="true" />
          </a>
        </div>
      </div>

      <div className={styles.counter} aria-label="Controles del slider">
        <button
          type="button"
          className={styles.counterArrow}
          onClick={goPrev}
          aria-label="Slide anterior"
        >
          <ArrowLeftIcon size={18} weight="bold" aria-hidden="true" />
        </button>

        <div className={styles.counterTrack}>
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              onClick={() => goToSlide(index)}
              className={`${styles.counterItem} ${
                activeIndex === index ? styles.activeCounter : ""
              }`}
              type="button"
              aria-label={`Ir al slide ${slide.id}`}
            >
              {String(slide.id).padStart(2, "0")}
            </button>
          ))}
        </div>

        <button
          type="button"
          className={styles.counterArrow}
          onClick={goNext}
          aria-label="Siguiente slide"
        >
          <ArrowRightIcon size={18} weight="bold" aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}