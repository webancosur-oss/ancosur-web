"use client";

import { CaretLeftIcon, CaretRightIcon } from "@phosphor-icons/react";

import styles from "./HeroSliderControls.module.css";

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

/* Flechas + puntos (el activo se alarga en verde Ancosur),
   centrado en todas las pantallas. */
export default function HeroSliderControls({
  slides,
  activeIndex,
  goPrev,
  goNext,
  goToSlide,
}: HeroSliderControlsProps) {
  return (
    <div
      className={styles.controls}
      role="group"
      aria-label="Controles del slider"
    >
      <button
        type="button"
        className={styles.arrow}
        onClick={goPrev}
        aria-label="Proyecto anterior"
      >
        <CaretLeftIcon size={18} weight="bold" aria-hidden="true" />
      </button>

      <div className={styles.dots}>
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            type="button"
            onClick={() => goToSlide(index)}
            className={`${styles.dot} ${
              activeIndex === index ? styles.dotActive : ""
            }`}
            aria-label={`Ver ${slide.title} (${index + 1} de ${slides.length})`}
            aria-current={activeIndex === index ? "true" : undefined}
          />
        ))}
      </div>

      <button
        type="button"
        className={styles.arrow}
        onClick={goNext}
        aria-label="Proyecto siguiente"
      >
        <CaretRightIcon size={18} weight="bold" aria-hidden="true" />
      </button>
    </div>
  );
}
