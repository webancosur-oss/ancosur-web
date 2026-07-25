import ActionButton from "@/components/buttons/ActionButton";
import { hero } from "../data";
import styles from "../Moro416.module.css";

export default function Moro416Hero() {
  return (
    <section className={styles.hero}>
      <img
        src={hero.image}
        alt="Moro 416, proyecto inmobiliario en Huancayo"
        className={styles.heroImage}
      />

      <div className={styles.heroOverlay} />

      <div className={styles.heroInner}>
        <div className={styles.heroContent}>
          <img
            src={hero.logo}
            alt="Logo Moro 416"
            className={styles.projectLogo}
          />

          <h1 className={styles.heroTitle}>
            Tu activo financiero más inteligente en el centro de Huancayo
          </h1>

          <div className={styles.heroActions}>
            <ActionButton
              href="#informacion-moro-416"
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