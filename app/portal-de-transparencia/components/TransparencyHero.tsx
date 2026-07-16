/* eslint-disable @next/next/no-img-element */

import styles from "./TransparencyHero.module.css";

export default function TransparencyHero() {
  return (
    <section
      className={styles.hero}
      aria-labelledby="transparency-hero-title"
    >
      <img
        src="/assets/portal-transparencia/hero-portal-transparencia.webp"
        alt="Portal de Transparencia de ANCOSUR Inmobiliaria"
        className={styles.heroImage}
        width={1920}
        height={700}
        fetchPriority="high"
      />

      <div
        className={styles.heroOverlay}
        aria-hidden={true}
      />

      <div className={styles.heroInner}>
        <div className={styles.heroContent}>
          <span className={styles.eyebrow}>
            ANCOSUR Inmobiliaria
          </span>

          <h1 id="transparency-hero-title">
            Portal de Transparencia
          </h1>

          <p>
            Ponemos a tu disposición la información legal, técnica y
            comercial de nuestros proyectos inmobiliarios.
          </p>
        </div>
      </div>
    </section>
  );
}