"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./Hero.module.css";

type Slide = {
  id: number;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  status?: string;
  cta?: string;
  href: string;
  image: string;
};

const slides: Slide[] = [
  {
    id: 1,
    // title: "San Antonio – Av. Chorrillos",
    // subtitle: "Vive en movimiento",
    // cta: "VER PROYECTO",
    href: "/neo-xport",
    image: "/assets/hero-home/result_sap1.webp",
  },
  {
    id: 2,
    // title: "La Ribera – Jr. Las Dalias",
    // subtitle: "Vive en bienestar",
    // cta: "VER PROYECTO",
    href: "/neo-rivera",
    image: "/assets/hero-home/sap1.png",
  },
  {
    id: 3,
    // title: "Av. San Carlos",
    // subtitle: "Invierte donde la demanda nunca se detiene",
    // cta: "VER PROYECTO",
    href: "/neo-eterna",
    image: "/assets/hero-home/slider3.webp",
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className={styles.hero} aria-label="Proyectos destacados ANCOSUR">
      <h1 className={styles.seoTitle}>
        ANCOSUR Inmobiliaria: departamentos, lotes y proyectos en Huancayo
      </h1>

      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`${styles.slide} ${
            index === current ? styles.active : ""
          }`}
        >
          <Image
            src={slide.image}
            alt={`${slide.subtitle} - ${slide.title}`}
            fill
            priority={index === 0}
            sizes="100vw"
            className={styles.image}
          />

          <div className={styles.overlay} />

          <div className={styles.content}>
            {(slide.status || slide.eyebrow) && (
              <div className={styles.statusBlock}>
                {slide.status && <span>{slide.status}</span>}
                {slide.eyebrow && <strong>{slide.eyebrow}</strong>}
              </div>
            )}

            <div className={styles.textBlock}>
              <p>{slide.subtitle}</p>
              <h2>{slide.title}</h2>
            </div>

            {/* <Link href={slide.href} className={styles.cta}>
              {slide.cta}
            </Link> */}
          </div>
        </div>
      ))}

      <button
        type="button"
        className={`${styles.arrow} ${styles.prev}`}
        onClick={prevSlide}
        aria-label="Slide anterior"
      >
        ‹
      </button>

      <button
        type="button"
        className={`${styles.arrow} ${styles.next}`}
        onClick={nextSlide}
        aria-label="Siguiente slide"
      >
        ›
      </button>

      <div className={styles.dots}>
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            type="button"
            className={`${styles.dot} ${
              index === current ? styles.dotActive : ""
            }`}
            onClick={() => setCurrent(index)}
            aria-label={`Ver slide ${index + 1}: ${slide.title}`}
          />
        ))}
      </div>
    </section>
  );
}