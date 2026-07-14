
import ActionButton from "@/components/buttons/ActionButton";
import { hero } from "../data";
import styles from "../NeoRiveraPage.module.css";

export default function NeoRiveraHero() {
  return (
    <section className={styles.hero}>
      <img
        src={hero.image}
        alt="Neo Rivera, edificio wellness en La Ribera"
        className={styles.heroImage}
      />

      <div className={styles.heroOverlay} />

      <div className={styles.heroInner}>
        <div className={styles.heroContent}>
          <img
            src={hero.logo}
            alt="Neo Rivera"
            className={styles.projectLogo}
          />

          <span className={styles.statusBadge}>Pre venta</span>

          <h1 className={styles.heroTitle}>
            Vive en bienestar en La Ribera
          </h1>

          <div className={styles.heroActions}>
            <ActionButton
              href="#informacion-neo-rivera"
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