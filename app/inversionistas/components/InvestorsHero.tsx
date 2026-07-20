import {
  ArrowDownIcon,
  ShieldCheckIcon,
} from "@phosphor-icons/react/dist/ssr";

import styles from "./InvestorsHero.module.css";

export default function InvestorsHero() {
  return (
    <section className={styles.hero}>
      <div
        className={styles.overlay}
        aria-hidden="true"
      />

      <div className={styles.content}>
        <span className={styles.eyebrow}>
          <ShieldCheckIcon
            size={17}
            weight="fill"
            aria-hidden="true"
          />

          Inversionistas ANCOSUR
        </span>

        <h1>
          Invierte en proyectos que construyen futuro
        </h1>

        <p>
          Participa en el desarrollo inmobiliario de Huancayo con
          respaldo de activos tangibles, seguridad legal y una
          rentabilidad superior a la banca tradicional.
        </p>

        <div className={styles.actions}>
          <a
            href="#formulario"
            className={styles.primaryButton}
          >
            Quiero invertir

            <ArrowDownIcon
              size={18}
              weight="bold"
              aria-hidden="true"
            />
          </a>

          <a
            href="#resultados"
            className={styles.secondaryButton}
          >
            Ver nuestro respaldo
          </a>
        </div>
      </div>
    </section>
  );
}