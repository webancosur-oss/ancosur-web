import ActionButton from "@/components/buttons/ActionButton";
import { hero } from "../data";
import styles from "../NeoBaltoPage.module.css";

export default function NeoBaltoHero() {
  return (
    <section className={styles.hero}>
      <img
        src={hero.image}
        alt="Neo Balto, edificio Pet-Centric en San Antonio, Huancayo"
        className={styles.heroImage}
      />

      <div className={styles.heroOverlay} />

      <div className={styles.heroInner}>
        <div className={styles.heroContent}>
          <img
            src={hero.logo}
            alt="Logo Neo Balto"
            className={styles.projectLogo}
          />

          <span className={styles.statusBadge}>
            Lanzamiento
          </span>

          <h1 className={styles.heroTitle}>
            Primer edificio Pet-Centric de Huancayo
          </h1>

          <div className={styles.heroActions}>
            <ActionButton
              href="#informacion-neo-balto"
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