"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import styles from "./CertificationsSection.module.css";

type Certification = {
  id: number;
  name: string;
  subtitle: string;
  description: string;
  image: string;
  href: string;
  points: string[];
};

const certifications: Certification[] = [
  {
    id: 1,
    name: "Certificación SGS",
    subtitle: "Calidad y procesos",
    description:
      "Respaldo en control, orden y mejora continua para desarrollar proyectos con mayor confianza.",
    image: "/assets/certificados/isos.svg",
    href: "https://www.sgs.com/es-pe",
    points: ["Control", "Calidad", "Confianza"],
  },
  {
    id: 2,
    name: "Instituto CAPECO",
    subtitle: "Formación técnica",
    description:
      "Capacitación y actualización para fortalecer el conocimiento técnico de nuestro equipo.",
    image: "/assets/certificados/capeco.svg",
    href: "https://www.capeco.org",
    points: ["Capacitación", "Buenas prácticas", "Respaldo técnico"],
  },
];

export default function CertificationsSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const currentSection = sectionRef.current;

    if (!currentSection) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(currentSection);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`${styles.section} ${isVisible ? styles.visible : ""}`}
      id="certificaciones"
    >
      <div className={styles.container}>
        <div className={styles.header}>
          <span>Respaldo ANCOSUR</span>
          <h2>Certificaciones que respaldan nuestra excelencia</h2>
          <p>
            Trabajamos con procesos, capacitación y respaldo técnico para darte
            mayor seguridad al invertir.
          </p>
        </div>

        <div className={styles.grid}>
          {certifications.map((item, index) => (
            <article
              key={item.id}
              className={styles.card}
              style={{ animationDelay: `${index * 140}ms` }}
            >
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.logoBox}
                aria-label={`Abrir página de ${item.name}`}
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  width={520}
                  height={300}
                  className={styles.logo}
                  sizes="(max-width: 640px) 80vw, 360px"
                />
              </a>

              <div className={styles.content}>
                <span>{item.subtitle}</span>
                <h3>{item.name}</h3>
                <p>{item.description}</p>

                <div className={styles.points}>
                  {item.points.map((point) => (
                    <small key={point}>{point}</small>
                  ))}
                </div>

                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.button}
                >
                  Ver respaldo
                </a>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}