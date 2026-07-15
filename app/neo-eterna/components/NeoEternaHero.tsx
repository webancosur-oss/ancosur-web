import ActionButton from "@/components/buttons/ActionButton";
import { hero } from "../data";
import styles from "../NeoEternaPage.module.css";

export default function NeoEternaHero() {
  return (
    <section className={styles.hero}>
      <img
        src={hero.image}
        alt="Neo Eterna, departamentos en la zona universitaria de San Carlos, Huancayo"
        className={styles.heroImage}
      />

      <div className={styles.heroOverlay} />

      <div className={styles.heroInner}>
        <div className={styles.heroContent}>
          <img
            src={hero.logo}
            alt="Logo Neo Eterna"
            className={styles.projectLogo}
          />

          <span className={styles.statusBadge}>
            Pre venta
          </span>

          <h1 className={styles.heroTitle}>
            Inversión inteligente en el corazón de la zona universitaria
          </h1>

          <div className={styles.heroActions}>
            <ActionButton
              href="#informacion-neo-eterna"
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