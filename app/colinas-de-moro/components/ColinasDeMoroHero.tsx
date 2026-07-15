
import ActionButton from "@/components/buttons/ActionButton";
import { hero } from "../data";
import styles from "../components/ColinasDeMoroHero.module.css";

export default function ColinasDeMoroHero() {
  return (
    <section
      className={styles.hero}
      aria-labelledby="colinas-de-moro-title"
    >
      <img
        src={hero.image}
        alt="Las Colinas de Moro, proyecto de lotes en La Huaycha, Concepción"
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
            alt="Logo Las Colinas de Moro"
            className={styles.projectLogo}
          />

          <span className={styles.statusBadge}>
            Entrega inmediata
          </span>

          <h1
            id="colinas-de-moro-title"
            className={styles.heroTitle}
          >
            El terreno ideal para construir tu futuro
          </h1>

          <div className={styles.heroActions}>
            <ActionButton
              href="#informacion-colinas-de-moro"
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