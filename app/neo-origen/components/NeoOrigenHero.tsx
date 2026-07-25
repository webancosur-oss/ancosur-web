import ActionButton from "@/components/buttons/ActionButton";
import { hero } from "../data";
import styles from "../NeoOrigenPage.module.css";

export default function NeoOrigenHero() {
  return (
    <section className={styles.hero}>
      <img
        src={hero.image}
        alt="Neo Origen, proyecto inmobiliario en El Tambo, Huancayo"
        className={styles.heroImage}
      />

      <div className={styles.heroOverlay} />

      <div className={styles.heroInner}>
        <div className={styles.heroContent}>
          <img
            src={hero.logo}
            alt="Logo Neo Origen"
            className={styles.projectLogo}
          />

          <h1 className={styles.heroTitle}>
            Tu espacio en el universo: innovación y conectividad en El Tambo
          </h1>

          <div className={styles.heroActions}>
            <ActionButton
              href="#informacion-neo-origen"
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