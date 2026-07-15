
import ActionButton from "@/components/buttons/ActionButton";
import { hero } from "../data";
import styles from "../DistritoSanCarlosPage.module.css";

export default function DistritoSanCarlosHero() {
  return (
    <section
      className={styles.hero}
      aria-labelledby="distrito-san-carlos-title"
    >
      <img
        src={hero.image}
        alt="Distrito San Carlos, condominio de uso mixto en Huancayo"
        className={styles.heroImage}
      />

      <div className={styles.heroOverlay} />

      <div className={styles.heroInner}>
        <div className={styles.heroContent}>
          <img
            src={hero.logo}
            alt="Logo Distrito San Carlos"
            className={styles.projectLogo}
          />

          <span className={styles.statusBadge}>
            Pre venta
          </span>

          <h1
            id="distrito-san-carlos-title"
            className={styles.heroTitle}
          >
            Vive conectado: una ciudad dentro de tu edificio
          </h1>

          <div className={styles.heroActions}>
            <ActionButton
              href="#informacion-distrito-san-carlos"
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