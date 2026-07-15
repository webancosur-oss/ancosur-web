/* eslint-disable @next/next/no-img-element */

import ActionButton from "@/components/buttons/ActionButton";

import { hero } from "../data";
import styles from "./CaminoRealHero.module.css";

export default function CaminoRealHero() {
  return (
    <section
      className={styles.hero}
      aria-labelledby="camino-real-hero-title"
    >
      <img
        src={hero.image}
        alt="Camino Real Residencial en El Tambo"
        className={styles.heroImage}
        width={1920}
        height={1080}
        fetchPriority="high"
      />

      <div
        className={styles.heroOverlay}
        aria-hidden={true}
      />

      <div className={styles.heroInner}>
        <div className={styles.heroContent}>
          <img
            src={hero.logo}
            alt="Camino Real Residencial"
            className={styles.projectLogo}
            width={300}
            height={120}
          />

          <span className={styles.statusBadge}>
            {hero.status}
          </span>

          <h1
            id="camino-real-hero-title"
            className={styles.heroTitle}
          >
            {hero.title}
          </h1>

          <div className={styles.heroActions}>
            <ActionButton
              href="#informacion-camino-real"
              size="lg"
              mobileSize="md"
              className={styles.heroButton}
            >
              Quiero información
            </ActionButton>
          </div>
        </div>
      </div>
    </section>
  );
}