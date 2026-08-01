"use client";

import {
  CheckCircleIcon,
  EyeIcon,
  LeafIcon,
  SealCheckIcon,
} from "@phosphor-icons/react";
import Image from "next/image";
import {
  useEffect,
  useRef,
  useState,
} from "react";

import ActionButton from "./buttons/ActionButton";
import styles from "./CertificationsSection.module.css";
import PdfViewer from "./PdfViewer";

type CertificatePdf = {
  title: string;
  pdf: string;
};

const ISO_9001_CERTIFICATE: CertificatePdf = {
  title:
    "Certificado ISO 9001 de ANCOSUR",
  pdf:
    "/assets/certificados/certificado-iso-9001.pdf",
};

const ISO_14001_CERTIFICATE: CertificatePdf = {
  title:
    "Certificado ISO 14001 de ANCOSUR",
  pdf:
    "/assets/certificados/certificado-iso-14001.pdf",
};

export default function CertificationsSection() {
  const sectionRef =
    useRef<HTMLElement | null>(null);

  const [
    isVisible,
    setIsVisible,
  ] = useState(false);

  const [
    selectedCertificate,
    setSelectedCertificate,
  ] = useState<CertificatePdf | null>(
    null,
  );

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
        },
      );

    observer.observe(currentSection);

    return () => {
      observer.disconnect();
    };
  }, []);

  const closePdfViewer = () => {
    setSelectedCertificate(null);
  };

  return (
    <>
      <section
        ref={sectionRef}
        className={`${styles.section} ${
          isVisible
            ? styles.visible
            : ""
        }`}
        id="certificaciones"
        aria-labelledby="certifications-title"
      >
        <div className={styles.container}>
          <div className={styles.header}>
            <span>
              Respaldo ANCOSUR
            </span>

            <h2 id="certifications-title">
              Certificaciones que respaldan
              nuestra forma de trabajar
            </h2>

            <p>
              Aplicamos estándares de calidad,
              responsabilidad ambiental y
              formación técnica en el
              desarrollo de nuestros
              proyectos.
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
                  Calidad y gestión ambiental
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
                  evaluados para mantener la
                  calidad y gestionar
                  responsablemente su impacto
                  ambiental.
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
                          Gestión de la calidad
                        </small>

                        <h4>
                          ISO 9001
                        </h4>
                      </div>
                    </div>

                    <p>
                      Certifica que aplicamos
                      procesos organizados,
                      controlados y orientados
                      a mejorar continuamente
                      la calidad de nuestros
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

                    <div
                      className={
                        styles.isoItemActions
                      }
                    >
                      <ActionButton
                        type="button"
                        variant="primary"
                        onClick={() =>
                          setSelectedCertificate(
                            ISO_9001_CERTIFICATE,
                          )
                        }
                        aria-label="Visualizar certificado ISO 9001 de ANCOSUR"
                      >
                        <EyeIcon
                          size={18}
                          weight="bold"
                          aria-hidden="true"
                        />

                        Ver certificado ISO 9001
                      </ActionButton>
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
                      Certifica que gestionamos
                      nuestros procesos
                      considerando el uso
                      responsable de recursos y
                      la reducción del impacto
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

                    <div
                      className={
                        styles.isoItemActions
                      }
                    >
                      <ActionButton
                        type="button"
                        variant="primary"
                        onClick={() =>
                          setSelectedCertificate(
                            ISO_14001_CERTIFICATE,
                          )
                        }
                        aria-label="Visualizar certificado ISO 14001 de ANCOSUR"
                      >
                        <EyeIcon
                          size={18}
                          weight="bold"
                          aria-hidden="true"
                        />

                        Ver certificado ISO 14001
                      </ActionButton>
                    </div>
                  </article>
                </div>
              </div>
            </article>

            {/*
            <article
              className={`${styles.card} ${styles.capecoCard}`}
            >
              ... BLOQUE CAPECO COMENTADO ...
            </article>
            */}
          </div>
        </div>
      </section>

      <PdfViewer
        open={
          selectedCertificate !== null
        }
        onClose={closePdfViewer}
        pdf={
          selectedCertificate?.pdf ?? ""
        }
        title={
          selectedCertificate?.title ?? ""
        }
      />
    </>
  );
}