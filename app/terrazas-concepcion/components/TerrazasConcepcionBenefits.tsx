import { benefits } from "../data";

import styles from "./TerrazasConcepcionBenefits.module.css";

export default function TerrazasConcepcionBenefits() {
  return (
    <section
      className={styles.benefitsSection}
      id="beneficios-terrazas-concepcion"
      aria-labelledby="terrazas-concepcion-benefits-title"
    >
      <div className={styles.benefitsHeader}>
        <span>Áreas comunes y ventajas</span>

        <h2 id="terrazas-concepcion-benefits-title">
          Naturaleza, tranquilidad y seguridad para construir tu futuro
        </h2>

        <p>
          Las Terrazas de Concepción cuenta con terrenos acondicionados,
          servicios esenciales, financiamiento directo y espacios rodeados
          de naturaleza para construir, disfrutar o invertir.
        </p>
      </div>

      <div className={styles.benefitsGrid}>
        {benefits.map((benefit) => (
          <article
            key={benefit.number}
            className={styles.benefitCard}
          >
            <div className={styles.cardTop}>
              <span className={styles.benefitNumber}>
                {benefit.number}
              </span>

              <span
                className={styles.cardLine}
                aria-hidden={true}
              />
            </div>

            <h3>{benefit.title}</h3>

            <p>{benefit.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}