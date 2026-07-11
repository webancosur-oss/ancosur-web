import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import styles from "./Typologies.module.css";

const typologies = [
  {
    id: "impulso",
    type: "Tipo Impulso",
    title: "Tu primer gran paso",
    concept:
      "El empujón perfecto para independizarte o iniciar tu camino como inversionista.",
    audience: "Jóvenes independientes y visionarios.",
    design: "Metraje smart, compacto, funcional y sin espacios muertos.",
    tag: "Ideal para empezar",
  },
  {
    id: "equilibrio",
    type: "Tipo Equilibrio",
    title: "Armonía entre vida y trabajo",
    concept:
      "El punto exacto donde conviven tu faceta familiar, laboral y personal.",
    audience: "Familias jóvenes y profesionales home-office.",
    design: "Espacios versátiles que evolucionan contigo y tus planes.",
    tag: "Vida + trabajo",
  },
  {
    id: "espacio",
    type: "Tipo Espacio",
    title: "Conecta con los que amas",
    concept:
      "Diseñado para quienes saben que los mejores momentos se comparten en casa.",
    audience: "Anfitriones por naturaleza y familias sociales.",
    design: "Amplitud visual, balcones protagonistas y ambientes para compartir.",
    tag: "Más amplitud",
  },
  {
    id: "tiempo",
    type: "Tipo Tiempo",
    title: "Eficiencia en cada detalle",
    concept:
      "Tu hogar trabaja para ti con practicidad máxima para rutinas aceleradas.",
    audience: "Universitarios y profesionales dinámicos.",
    design: "Distribución práctica, lavandería compacta y espacios inteligentes.",
    tag: "Práctico y funcional",
  },
  {
    id: "luz",
    type: "Tipo Luz",
    title: "Energía que inspira",
    concept:
      "Amplitud sensorial. Un hogar que respira y potencia tu creatividad.",
    audience: "Creativos, emprendedores y amantes del bienestar.",
    design: "Iluminación natural, acabados claros y sensación de amplitud.",
    tag: "Más bienestar",
  },
];

export default function Typologies() {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <span>Tipologías ANCOSUR</span>

        <h2>Encuentra el depa que se adapta a tu forma de vivir</h2>

        <p>
          No todos buscan lo mismo. Por eso creamos tipologías pensadas para
          diferentes estilos de vida, metas y momentos personales.
        </p>
      </div>

      <div className={styles.featured}>
        <div className={styles.featuredContent}>
          <span>Elige mejor</span>
          <h3>¿Cuál es tu tipología ideal?</h3>
          <p>
            Descubre si necesitas un depa para independizarte, invertir,
            trabajar desde casa, compartir en familia o vivir con más bienestar.
          </p>
        </div>

        <Link href="/departamentos" className={styles.featuredButton}>
          Ver departamentos
          <ArrowRightIcon size={18} weight="bold" aria-hidden="true" />
        </Link>
      </div>

      <div className={styles.grid}>
        {typologies.map((item, index) => (
          <article
            key={item.id}
            className={`${styles.card} ${
              index === 0 ? styles.cardPrimary : ""
            }`}
          >
            <div className={styles.cardTop}>
              <span>{item.tag}</span>
              <strong>{String(index + 1).padStart(2, "0")}</strong>
            </div>

            <div className={styles.cardTitle}>
              <small>{item.type}</small>
              <h3>{item.title}</h3>
            </div>

            <div className={styles.cardBody}>
              <p>
                <strong>Concepto:</strong> {item.concept}
              </p>

              <p>
                <strong>Para quién:</strong> {item.audience}
              </p>

              <p>
                <strong>Diseño:</strong> {item.design}
              </p>
            </div>

            <Link href="/departamentos" className={styles.cardLink}>
              Encontrar mi depa
              <ArrowRightIcon size={16} weight="bold" aria-hidden="true" />
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}