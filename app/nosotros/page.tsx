import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

import styles from "./NosotrosPage.module.css";
import EquipoPage from "../equipo/page";

export const metadata: Metadata = {
  title: "Nosotros | ANCOSUR Inmobiliaria",
  description:
    "Conoce la historia, misión, visión, valores y fórmula de trabajo de ANCOSUR Inmobiliaria.",
};

const images = {
  hero: "/assets/heros/10anios.png",
  team: "/assets/nosotros/equipo.webp",
  formula: "/assets/nosotros/piramide.svg",
};

const values = [
  {
    number: "01",
    title: "Disciplina",
    description:
      "Hacemos lo que tenemos que hacer, cuando tengamos que hacerlo, tengamos ganas o no. Organización, limpieza y puntualidad.",
  },
  {
    number: "02",
    title: "Espíritu de superación",
    description:
      "Nunca nos rendimos. Siempre estamos tratando de ser mejores y hacer algo muy importante en nuestra vida profesional.",
  },
  {
    number: "03",
    title: "Trabajo en equipo",
    description:
      "Compartimos conocimientos e información y disfrutamos nuestros roles. El objetivo siempre es que gane el equipo.",
  },
  {
    number: "04",
    title: "Actitud positiva",
    description:
      "La buena actitud define a los ganadores. Creemos que es la mejor manera de abordar la vida.",
  },
  {
    number: "05",
    title: "Transparencia",
    description:
      "No tenemos como personas ni como equipo agendas ocultas.",
  },
];

const formula = [
  "Valores",
  "Visión y misión",
  "Nuestro equipo",
  "Innovación",
  "Compromiso con el cliente",
  "Pasión por la excelencia",
  "Ejecución",
];

export default function NosotrosPage() {
  return (
    <>
      <Navbar />

      <main className={styles.page}>
        {/* HERO */}

        <section className={styles.hero}>
          <Image
            src={images.hero}
            alt="ANCOSUR Vive Diferente, 10 años contigo"
            fill
            priority
            sizes="100vw"
            className={styles.heroImage}
          />

          <div
            className={styles.heroOverlay}
            aria-hidden="true"
          />

          <div className={styles.heroContent}>
            <span className={styles.heroEyebrow}>
              Nosotros
            </span>

            <h1>
              ANCOSUR Inmobiliaria: construimos espacios para vivir diferente
            </h1>

            <p>
              Diez años desarrollando proyectos inmobiliarios con innovación,
              compromiso y una visión enfocada en mejorar la forma de vivir.
            </p>
          </div>
        </section>

        {/* MISIÓN */}

        <section className={styles.missionSection}>
          <div className={styles.missionContent}>
            <span>Misión</span>

            <h2>
              Hacer realidad el sueño de la vivienda ideal
            </h2>

            <p>
              Hacemos realidad el sueño de la vivienda ideal de nuestros
              clientes, sin descuidar el espacio donde se diseña, desarrolla y
              construye cada proyecto.
            </p>
          </div>
        </section>

        {/* VISIÓN */}

        <section className={styles.visionSection}>
          <div className={styles.visionDecoration} aria-hidden="true" />

          <div className={styles.visionContent}>
            <span>Visión</span>

            <h2>
              Desarrollar proyectos con corazón sostenible
            </h2>

            <p>
              Para 2030 nos vemos desarrollando proyectos inmobiliarios de gran
              envergadura a nivel nacional, que tengan como corazón la
              sostenibilidad del medio ambiente.
            </p>
          </div>
        </section>

        {/* VALORES */}

        <section className={styles.valuesSection}>
          <div className={styles.imageBox}>
            <Image
              src={images.team}
              alt="Equipo ANCOSUR Inmobiliaria"
              fill
              sizes="
                (max-width: 640px) 100vw,
                (max-width: 1000px) 90vw,
                940px
              "
              className={styles.teamImage}
            />

            <div
              className={styles.imageOverlay}
              aria-hidden="true"
            />

            <div className={styles.imageBadge}>
              <strong>5</strong>
              <span>Valores que nos representan</span>
            </div>
          </div>

          <div className={styles.valuesContent}>
            <span className={styles.eyebrow}>
              Nuestros valores
            </span>

            <h2>
              La forma en que trabajamos cada día
            </h2>

            <p className={styles.valuesIntro}>
              Nuestros valores orientan cada decisión y definen la manera en que
              trabajamos con nuestros clientes, aliados y colaboradores.
            </p>

            <div className={styles.valuesList}>
              {values.map((item) => (
                <article
                  key={item.title}
                  className={styles.valueCard}
                >
                  <span className={styles.valueNumber}>
                    {item.number}
                  </span>

                  <h3>{item.title}</h3>

                  <p>{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* FÓRMULA */}

        <section className={styles.formulaSection}>
          <div
            className={styles.formulaDecoration}
            aria-hidden="true"
          />

          <div className={styles.formulaContainer}>
            <header className={styles.formulaHeader}>
              <span>Nuestra fórmula</span>

              <h2>
                La base que sostiene nuestro crecimiento
              </h2>

              <p>
                Nuestra fórmula integra cultura, personas, innovación y
                ejecución para desarrollar proyectos que generen valor.
              </p>
            </header>

            <div className={styles.formulaGrid}>
              <div className={styles.formulaList}>
                {formula.map((item, index) => (
                  <article
                    key={item}
                    className={styles.formulaItem}
                  >
                    <strong>
                      {String(index + 1).padStart(2, "0")}
                    </strong>

                    <span>{item}</span>
                  </article>
                ))}
              </div>

              <div className={styles.pyramidBox}>
                <div
                  className={styles.pyramidGlow}
                  aria-hidden="true"
                />

                <Image
                  src={images.formula}
                  alt="Pirámide de la fórmula de trabajo ANCOSUR"
                  width={720}
                  height={650}
                  sizes="
                    (max-width: 640px) 88vw,
                    (max-width: 980px) 50vw,
                    600px
                  "
                  className={styles.pyramidImage}
                />

                <span className={styles.pyramidCaption}>
                  Modelo de crecimiento ANCOSUR
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* EQUIPO */}

        <EquipoPage />        
      </main>
    </>
  );
}