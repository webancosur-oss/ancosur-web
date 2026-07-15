import { benefits } from "../data";
import styles from "./CaminoRealBenefits.module.css";

export default function CaminoRealBenefits() {
  return (
    <section
      className={styles.benefitsSection}
      id="beneficios-camino-real"
      aria-labelledby="camino-real-benefits-title"
    >
      <div className={styles.benefitsHeader}>
        <span>Beneficios del proyecto</span>

        <h2 id="camino-real-benefits-title">
          Invierte en un lote con respaldo y seguridad
        </h2>

        <p>
          Camino Real es una urbanización pensada para que puedas construir tu
          vivienda, invertir y desarrollar tu patrimonio en una zona con
          crecimiento urbano.
        </p>
      </div>

      <div className={styles.benefitsGrid}>
        {benefits.map((benefit, index) => (
          <article
            key={benefit.id}
            className={styles.benefitCard}
          >
            <span className={styles.benefitNumber}>
              {String(index + 1).padStart(2, "0")}
            </span>

            <h3>{benefit.title}</h3>

            <p>{benefit.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}