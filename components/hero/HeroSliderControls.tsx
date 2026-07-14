"use client";

import { ArrowLeftIcon, ArrowRightIcon } from "@phosphor-icons/react";
import styles from "./HeroAncosur.module.css";

type SlideItem = {
  id: number;
  title: string;
};

type HeroSliderControlsProps = {
  slides: SlideItem[];
  activeIndex: number;
  goPrev: () => void;
  goNext: () => void;
  goToSlide: (index: number) => void;
};

export default function HeroSliderControls({
  slides,
  activeIndex,
  goPrev,
  goNext,
  goToSlide,
}: HeroSliderControlsProps) {
  return (
    <div className={styles.counter} aria-label="Controles del slider">
      <button
        type="button"
        className={styles.counterArrow}
        onClick={goPrev}
        aria-label="Slide anterior"
      >
        <ArrowLeftIcon size={18} weight="bold" aria-hidden={true} />
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
        <ArrowRightIcon size={18} weight="bold" aria-hidden={true} />
      </button>
    </div>
  );
}