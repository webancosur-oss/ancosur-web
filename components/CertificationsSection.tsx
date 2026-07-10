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
  whatItMeans: string;
  whyItMatters: string;
  trustPoints: string[];
};

const certifications: Certification[] = [
  {
    id: 1,
    name: "Certificación SGS",
    subtitle: "Calidad y procesos supervisados",
    description:
      "SGS evalúa procesos de calidad, control y cumplimiento.",
    image: "/assets/certificados/isos.svg",
    href: "https://www.sgs.com/es-pe",
    whatItMeans:
      "Nos ayuda a trabajar con mayor orden, control y mejora continua.",
    whyItMatters:
      "Para el cliente, representa mayor confianza en cada etapa del proyecto.",
    trustPoints: [
      "Procesos mejor controlados.",
      "Compromiso con la calidad.",
      "Mejora continua en obra.",
    ],
  },
  {
    id: 2,
    name: "Instituto CAPECO",
    subtitle: "Formación técnica para construcción",
    description:
      "CAPECO impulsa la capacitación y actualización del sector construcción.",
    image: "/assets/certificados/instituto.svg",
    href: "https://www.capeco.org",
    whatItMeans:
      "Refuerza la preparación técnica de nuestro equipo.",
    whyItMatters:
      "Para el cliente, significa contar con un equipo más preparado y actualizado.",
    trustPoints: [
      "Equipo capacitado.",
      "Buenas prácticas constructivas.",
      "Mayor respaldo técnico.",
    ],
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
      {
        threshold: 0.2,
      }
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
          <span>Certificaciones y respaldo</span>

          <h2>Más que metros cuadrados, construimos confianza.</h2>

          <p>
            En ANCOSUR trabajamos con procesos, capacitación y respaldo técnico
            para desarrollar proyectos con mayor seguridad y compromiso.
          </p>
        </div>

        <div className={styles.certificationsList}>
          {certifications.map((item, index) => (
            <article
              key={item.id}
              className={styles.certificationItem}
              style={{ animationDelay: `${index * 140}ms` }}
            >
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.logoLink}
                aria-label={`Abrir página de ${item.name}`}
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  width={760}
                  height={420}
                  className={styles.logo}
                  sizes="(max-width: 640px) 88vw, (max-width: 1024px) 420px, 460px"
                />
              </a>

              <div className={styles.content}>
                <span className={styles.itemSubtitle}>{item.subtitle}</span>

                <h3>{item.name}</h3>

                <p className={styles.description}>{item.description}</p>

                <div className={styles.infoGrid}>
                  <div className={styles.infoBlock}>
                    <strong>¿Qué significa?</strong>
                    <p>{item.whatItMeans}</p>
                  </div>

                  <div className={styles.infoBlock}>
                    <strong>¿Por qué importa?</strong>
                    <p>{item.whyItMatters}</p>
                  </div>
                </div>

                <ul className={styles.trustList}>
                  {item.trustPoints.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>

                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.externalButton}
                >
                  Ver respaldo
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className={styles.trustBox}>
          <span>¿Por qué confiar en ANCOSUR?</span>

          <h3>No solo construimos espacios, creamos experiencias para vivir mejor.</h3>

          <p>
            Porque elegir un departamento o un lote no se trata solo de metros cuadrados.
            Se trata del lugar donde empiezas nuevas etapas, compartes momentos y
            construyes tu futuro con seguridad, respaldo y acompañamiento.
          </p>
        </div>
      </div>
    </section>
  );
}