/* eslint-disable @next/next/no-img-element */

import ActionButton from "@/components/buttons/ActionButton";

import { hero } from "../data";
import styles from "./NeoXportHero.module.css";

export default function NeoXportHero() {
  return (
    <section
      className={styles.hero}
      aria-labelledby="neo-xport-title"
    >
      <img
        src={hero.image}
        alt="Neo Xport, edificio con ADN deportivo frente al Polideportivo Wanka"
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
            alt="Neo Xport"
            className={styles.projectLogo}
            width={300}
            height={140}
          />

          <span className={styles.statusBadge}>
            {hero.status}
          </span>

          <h1
            id="neo-xport-title"
            className={styles.heroTitle}
          >
            Vive en movimiento en Neo Xport
          </h1>

          <div className={styles.heroActions}>
            <ActionButton
              href="#informacion-neo-xport"
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