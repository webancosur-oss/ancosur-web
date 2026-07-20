"use client";

import {
  CheckCircleIcon,
  GraduationCapIcon,
  LeafIcon,
  SealCheckIcon,
} from "@phosphor-icons/react";
import Image from "next/image";
import {
  useEffect,
  useRef,
  useState,
} from "react";

import styles from "./CertificationsSection.module.css";

export default function CertificationsSection() {
  const sectionRef =
    useRef<HTMLElement | null>(
      null
    );

  const [
    isVisible,
    setIsVisible,
  ] = useState(false);

  useEffect(() => {
    const currentSection =
      sectionRef.current;

    if (!currentSection) {
      return;
    }

    const observer =
      new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        },
        {
          threshold: 0.15,
        }
      );

    observer.observe(
      currentSection
    );

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`${styles.section} ${
        isVisible
          ? styles.visible
          : ""
      }`}
      id="certificaciones"
    >
      <div
        className={styles.container}
      >
        <div
          className={styles.header}
        >
          <span>
            Respaldo ANCOSUR
          </span>

          <h2>
            Certificaciones que
            respaldan nuestra forma de
            trabajar
          </h2>

          <p>
            Aplicamos estándares de
            calidad, responsabilidad
            ambiental y formación
            técnica en el desarrollo de
            nuestros proyectos.
          </p>
        </div>

        <div className={styles.grid}>
          <article
            className={`${styles.card} ${styles.isoCard}`}
          >
            <div
              className={styles.logoBox}
            >
              <Image
                src="/assets/certificados/isos.svg"
                alt="Certificaciones ISO 14001 e ISO 9001 otorgadas por SGS"
                width={520}
                height={300}
                className={
                  styles.isoLogo
                }
                sizes="(max-width: 640px) 85vw, 470px"
              />
            </div>

            <div
              className={styles.content}
            >
              <span
                className={
                  styles.eyebrow
                }
              >
                Calidad y gestión
                ambiental
              </span>

              <h3>
                Certificaciones ISO
                otorgadas por SGS
              </h3>

              <p
                className={
                  styles.introduction
                }
              >
                Estas certificaciones
                demuestran que ANCOSUR
                trabaja con procesos
                evaluados para mantener
                la calidad y gestionar
                responsablemente su
                impacto ambiental.
              </p>

              <div
                className={styles.isoGrid}
              >
                <article
                  className={
                    styles.isoItem
                  }
                >
                  <div
                    className={
                      styles.isoItemHeader
                    }
                  >
                    <span
                      className={
                        styles.isoIcon
                      }
                    >
                      <SealCheckIcon
                        size={27}
                        weight="duotone"
                        aria-hidden="true"
                      />
                    </span>

                    <div>
                      <small>
                        Gestión de la
                        calidad
                      </small>

                      <h4>
                        ISO 9001
                      </h4>
                    </div>
                  </div>

                  <p>
                    Certifica que
                    aplicamos procesos
                    organizados,
                    controlados y
                    orientados a mejorar
                    continuamente la
                    calidad de nuestros
                    servicios.
                  </p>

                  <div
                    className={
                      styles.points
                    }
                  >
                    <span>
                      <CheckCircleIcon
                        size={16}
                        weight="fill"
                        aria-hidden="true"
                      />

                      Control de procesos
                    </span>

                    <span>
                      <CheckCircleIcon
                        size={16}
                        weight="fill"
                        aria-hidden="true"
                      />

                      Mejora continua
                    </span>

                    <span>
                      <CheckCircleIcon
                        size={16}
                        weight="fill"
                        aria-hidden="true"
                      />

                      Atención de calidad
                    </span>
                  </div>
                </article>

                <article
                  className={
                    styles.isoItem
                  }
                >
                  <div
                    className={
                      styles.isoItemHeader
                    }
                  >
                    <span
                      className={`${styles.isoIcon} ${styles.environmentIcon}`}
                    >
                      <LeafIcon
                        size={27}
                        weight="duotone"
                        aria-hidden="true"
                      />
                    </span>

                    <div>
                      <small>
                        Gestión ambiental
                      </small>

                      <h4>
                        ISO 14001
                      </h4>
                    </div>
                  </div>

                  <p>
                    Certifica que
                    gestionamos nuestros
                    procesos considerando
                    el uso responsable de
                    recursos y la
                    reducción del impacto
                    ambiental.
                  </p>

                  <div
                    className={
                      styles.points
                    }
                  >
                    <span>
                      <CheckCircleIcon
                        size={16}
                        weight="fill"
                        aria-hidden="true"
                      />

                      Gestión ambiental
                    </span>

                    <span>
                      <CheckCircleIcon
                        size={16}
                        weight="fill"
                        aria-hidden="true"
                      />

                      Uso responsable
                    </span>

                    <span>
                      <CheckCircleIcon
                        size={16}
                        weight="fill"
                        aria-hidden="true"
                      />

                      Mejora sostenible
                    </span>
                  </div>
                </article>
              </div>
            </div>
          </article>

          <article
            className={`${styles.card} ${styles.capecoCard}`}
          >
            <div
              className={styles.logoBox}
            >
              <Image
                src="/assets/certificados/capeco.svg"
                alt="Instituto CAPECO"
                width={420}
                height={240}
                className={
                  styles.capecoLogo
                }
                sizes="(max-width: 640px) 75vw, 320px"
              />
            </div>

            <div
              className={styles.content}
            >
              <span
                className={
                  styles.eyebrow
                }
              >
                Formación técnica
              </span>

              <h3>
                Formación con el
                Instituto CAPECO
              </h3>

              <p
                className={
                  styles.introduction
                }
              >
                Fortalecemos las
                capacidades de nuestro
                equipo con capacitación
                y actualización en
                buenas prácticas del
                sector construcción.
              </p>

              <div
                className={
                  styles.capecoDetails
                }
              >
                <span
                  className={
                    styles.capecoIcon
                  }
                >
                  <GraduationCapIcon
                    size={29}
                    weight="duotone"
                    aria-hidden="true"
                  />
                </span>

                <div>
                  <strong>
                    Conocimiento técnico
                    actualizado
                  </strong>

                  <p>
                    Una mejor preparación
                    nos permite tomar
                    decisiones más
                    responsables durante
                    cada etapa del
                    proyecto.
                  </p>
                </div>
              </div>

              <div
                className={`${styles.points} ${styles.capecoPoints}`}
              >
                <span>
                  <CheckCircleIcon
                    size={16}
                    weight="fill"
                    aria-hidden="true"
                  />

                  Capacitación
                </span>

                <span>
                  <CheckCircleIcon
                    size={16}
                    weight="fill"
                    aria-hidden="true"
                  />

                  Buenas prácticas
                </span>

                <span>
                  <CheckCircleIcon
                    size={16}
                    weight="fill"
                    aria-hidden="true"
                  />

                  Respaldo técnico
                </span>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}