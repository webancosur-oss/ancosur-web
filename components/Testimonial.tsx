"use client";

import {
  ArrowLeftIcon,
  ArrowRightIcon,
  PlayCircleIcon,
  QuotesIcon,
} from "@phosphor-icons/react";
import { useCallback, useRef, useState, type PointerEvent } from "react";
import styles from "./Testimonial.module.css";

type TestimonialItem = {
  id: number;
  name: string;
  project: string;
  quote: string;
  iframeSrc: string;
};

const testimonials: TestimonialItem[] = [
  {
    id: 1,
    name: "Familia ANCOSUR",
    project: "Neo Emperatriz",
    quote:
      "Encontramos un departamento ideal para nuestra familia, con buena ubicación y el acompañamiento que necesitábamos.",
    iframeSrc:
      "https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F1692833732157565%2F&show_text=false&width=267&t=0",
  },
  {
    id: 2,
    name: "Cliente inversionista",
    project: "Neo Emperatriz",
    quote:
      "Elegimos invertir porque vimos respaldo, confianza y una ubicación con gran proyección para nuestro futuro.",
    iframeSrc:
      "https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F4148433428738238%2F&show_text=false&width=267&t=0",
  },
  {
    id: 3,
    name: "Nuevo propietario",
    project: "Neo Emperatriz",
    quote:
      "El proceso fue claro desde el inicio. Recibimos orientación en cada etapa hasta concretar nuestro nuevo hogar.",
    iframeSrc:
      "https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F1417979390113934%2F&show_text=false&width=267&t=0",
  },
 
];

export default function Testimonial() {
  const [activeIndex, setActiveIndex] = useState(0);
  const pointerStartXRef = useRef<number | null>(null);

  const activeTestimonial = testimonials[activeIndex];

  const goToTestimonial = useCallback((index: number) => {
    const total = testimonials.length;
    const nextIndex = (index + total) % total;

    setActiveIndex(nextIndex);
  }, []);

  const goNext = useCallback(() => {
    goToTestimonial(activeIndex + 1);
  }, [activeIndex, goToTestimonial]);

  const goPrev = useCallback(() => {
    goToTestimonial(activeIndex - 1);
  }, [activeIndex, goToTestimonial]);

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    pointerStartXRef.current = event.clientX;
  };

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (pointerStartXRef.current === null) return;

    const difference = event.clientX - pointerStartXRef.current;

    if (Math.abs(difference) > 55) {
      if (difference < 0) {
        goNext();
      } else {
        goPrev();
      }
    }

    pointerStartXRef.current = null;
  };

  return (
    <section className={styles.section} id="testimonios">
      <div className={styles.container}>
        <div className={styles.header}>
          <span>Testimonios</span>

          <h2>Historias reales de quienes confiaron en ANCOSUR</h2>

          <p>
            Conoce la experiencia de nuestros clientes y cómo encontraron una
            opción ideal para vivir o invertir.
          </p>
        </div>

        <div
          className={styles.wrapper}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
        >
          <div className={styles.videoSide}>
            <div className={styles.videoCard}>
              <div className={styles.videoBadge}>
                <PlayCircleIcon size={20} weight="fill" aria-hidden="true" />
                Historia en video
              </div>

              <iframe
                key={activeTestimonial.id}
                className={styles.facebookVideo}
                src={activeTestimonial.iframeSrc}
                title={`Testimonio de ${activeTestimonial.name}`}
                scrolling="no"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>

          <div className={styles.contentSide}>
            <div className={styles.quoteIcon}>
              <QuotesIcon size={34} weight="fill" aria-hidden="true" />
            </div>

            <p className={styles.quote}>{activeTestimonial.quote}</p>

            <div className={styles.clientInfo}>
              <strong>{activeTestimonial.name}</strong>
              <span>{activeTestimonial.project}</span>
            </div>

            <div className={styles.controls}>
              <button
                type="button"
                className={styles.controlButton}
                onClick={goPrev}
                aria-label="Testimonio anterior"
              >
                <ArrowLeftIcon size={20} weight="bold" aria-hidden="true" />
              </button>

              <div className={styles.counter}>
                <strong>{String(activeIndex + 1).padStart(2, "0")}</strong>
                <span>/ {String(testimonials.length).padStart(2, "0")}</span>
              </div>

              <button
                type="button"
                className={styles.controlButton}
                onClick={goNext}
                aria-label="Siguiente testimonio"
              >
                <ArrowRightIcon size={20} weight="bold" aria-hidden="true" />
              </button>
            </div>

            <div className={styles.dots} aria-label="Lista de testimonios">
              {testimonials.map((testimonial, index) => (
                <button
                  key={testimonial.id}
                  type="button"
                  className={`${styles.dot} ${
                    activeIndex === index ? styles.activeDot : ""
                  }`}
                  onClick={() => goToTestimonial(index)}
                  aria-label={`Ver testimonio ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}