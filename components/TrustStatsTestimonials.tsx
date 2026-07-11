"use client";

import {
  ArrowLeftIcon,
  ArrowRightIcon,
  PlayCircleIcon,
  QuotesIcon,
} from "@phosphor-icons/react";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent,
} from "react";
import styles from "./TrustStatsTestimonials.module.css";

type StatItem = {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  description: string;
  accent: string;
};

type TestimonialItem = {
  id: number;
  name: string;
  project: string;
  quote: string;
  iframeSrc: string;
};

const stats: StatItem[] = [
  {
    value: 10,
    prefix: "+",
    suffix: "Años",
    label: "Experiencia",
    description: "Trayectoria en proyectos inmobiliarios.",
    accent: "#00A74F",
  },
  {
    value: 100,
    prefix: "S/",
    suffix: "MM",
    label: "Inversión",
    description: "Respaldo en proyectos de alto valor.",
    accent: "#1F6D4A",
  },
  {
    value: 200,
    prefix: "+",
    label: "Propiedades",
    description: "Departamentos, lotes e inversión.",
    accent: "#8FAA55",
  },
  {
    value: 9,
    prefix: "+",
    label: "Entregados",
    description: "Proyectos culminados con compromiso.",
    accent: "#102D16",
  },
];

const testimonials: TestimonialItem[] = [
  {
    id: 1,
    name: "Familia ANCOSUR",
    project: "Neo Origen",
    quote:
      "Encontramos un departamento ideal para nuestra familia, con buena ubicación y el acompañamiento que necesitábamos.",
    iframeSrc:
      "https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F1308792507541429%2F&show_text=false&width=267&t=0",
  },
  {
    id: 2,
    name: "Familia ANCOSUR",
    project: "Neo Emperatriz",
    quote:
      "Elegimos invertir porque vimos respaldo, confianza y una ubicación con gran proyección para nuestro futuro.",
    iframeSrc:
      "https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F4148433428738238%2F&show_text=false&width=267&t=0",
  },

  
  {
    id: 3,
    name: "Familia ANCOSUR",
    project: "Neo Emperatriz",
    quote:
      "El proceso fue claro desde el inicio. Recibimos orientación en cada etapa hasta concretar nuestro nuevo hogar.",
    iframeSrc:
      "https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F1417979390113934%2F&show_text=false&width=267&t=0",
  },
];

type AnimatedCounterProps = {
  value: number;
  prefix?: string;
  suffix?: string;
  start: boolean;
};

function AnimatedCounter({
  value,
  prefix = "",
  suffix = "",
  start,
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;

    let animationFrame = 0;
    const duration = 1700;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const currentValue = Math.round(easedProgress * value);

      setCount(currentValue);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [start, value]);

  return (
    <span className={styles.valueGroup}>
      <span className={styles.valueMain}>
        {prefix && <span className={styles.valuePrefix}>{prefix}</span>}
        <span className={styles.valueNumber}>{count}</span>
      </span>

      {suffix && <span className={styles.valueSuffix}>{suffix}</span>}
    </span>
  );
}

export default function TrustStatsTestimonials() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const pointerStartXRef = useRef<number | null>(null);

  const [startCounter, setStartCounter] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const activeTestimonial = testimonials[activeIndex];

  useEffect(() => {
    const currentSection = sectionRef.current;

    if (!currentSection) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStartCounter(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.25,
      }
    );

    observer.observe(currentSection);

    return () => observer.disconnect();
  }, []);

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
    <section ref={sectionRef} className={styles.section} id="confianza">
      <div className={styles.container}>
        <div className={styles.header}>
          <span>ANCOSUR en cifras</span>

          <h2>Confianza que crece con cada proyecto</h2>

          <p>
            Resultados, experiencia y clientes reales que respaldan nuestro
            compromiso inmobiliario.
          </p>
        </div>

        <div className={styles.contentGrid}>
          <div className={styles.statsPanel}>
            <div className={styles.panelHeader}>
              <span>Resultados reales</span>
              <h3>Cifras que respaldan nuestro crecimiento</h3>
            </div>

            <div className={styles.statsGrid}>
              {stats.map((stat) => (
                <article
                  key={stat.label}
                  className={styles.statCard}
                  style={
                    {
                      "--accent-color": stat.accent,
                    } as CSSProperties
                  }
                >
                  <div className={styles.statIcon}>
                    <AnimatedCounter
                      value={stat.value}
                      prefix={stat.prefix}
                      suffix={stat.suffix}
                      start={startCounter}
                    />
                  </div>

                  <div className={styles.statText}>
                    <h4>{stat.label}</h4>
                    <p>{stat.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div
            className={styles.testimonialPanel}
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerCancel={() => {
              pointerStartXRef.current = null;
            }}
          >
            <div className={styles.videoBox}>
              <div className={styles.videoBadge}>
                <PlayCircleIcon size={18} weight="fill" aria-hidden="true" />
                Video
              </div>

              <iframe
                key={activeTestimonial.id}
                className={styles.facebookVideo}
                src={activeTestimonial.iframeSrc}
                title={`Testimonio de ${activeTestimonial.name}`}
                scrolling="no"
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>

            <div className={styles.quoteBox}>
              <div className={styles.quoteIcon}>
                <QuotesIcon size={28} weight="fill" aria-hidden="true" />
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
                  <ArrowLeftIcon size={19} weight="bold" aria-hidden="true" />
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
                  <ArrowRightIcon size={19} weight="bold" aria-hidden="true" />
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
      </div>
    </section>
  );
}