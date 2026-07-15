import { benefits } from "../data";
import styles from "../components/ColinasDeMoroBenefits.module.css";

export default function ColinasDeMoroBenefits() {
  return (
    <section
      className={styles.benefitsSection}
      aria-labelledby="colinas-de-moro-benefits-title"
    >
      <div className={styles.benefitsHeader}>
        <span>Beneficios del proyecto</span>

        <h2 id="colinas-de-moro-benefits-title">
          Compra tu lote con mayor seguridad
        </h2>

        <p>
          Un proyecto pensado para que puedas construir, invertir y
          desarrollar tu patrimonio.
        </p>
      </div>

      <div className={styles.benefitsGrid}>
        {benefits.map((benefit) => (
          <article
            key={benefit.number}
            className={styles.benefitCard}
          >
            <span className={styles.benefitNumber}>
              {benefit.number}
            </span>

            <h3>{benefit.title}</h3>

            <p>{benefit.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}