
import ActionButton from "@/components/buttons/ActionButton";
import { hero } from "../data";
import styles from "../NeoEmperatrizPage.module.css";

export default function NeoEmperatrizHero() {
  return (
    <section
      className={styles.hero}
      aria-labelledby="neo-emperatriz-title"
    >
      <img
        src={hero.image}
        alt="Neo Emperatriz, departamentos de entrega inmediata en San Carlos, Huancayo"
        className={styles.heroImage}
      />

      <div
        className={styles.heroOverlay}
        aria-hidden={true}
      />

      <div className={styles.heroInner}>
        <div className={styles.heroContent}>
          <img
            src={hero.logo}
            alt="Logo Neo Emperatriz"
            className={styles.projectLogo}
          />

          <span className={styles.statusBadge}>
            Entrega inmediata
          </span>

          <h1
            id="neo-emperatriz-title"
            className={styles.heroTitle}
          >
            Tu nuevo hogar listo para habitar: naturaleza y elegancia
          </h1>

          <div className={styles.heroActions}>
            <ActionButton
              href="#informacion-neo-emperatriz"
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