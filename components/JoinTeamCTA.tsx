import Link from "next/link";
import styles from "./JoinTeamCTA.module.css";

type JoinTeamCTAProps = {
  title?: string;
  description?: string;
  buttonLabel?: string;
  href?: string;
};

export default function JoinTeamCTA({
  title = "¿Quieres ser parte de nuestro equipo?",
  description = "En ANCOSUR buscamos personas con talento, compromiso y ganas de crecer junto a una empresa inmobiliaria en expansión.",
  buttonLabel = "Ver oportunidades",
  href = "/trabaja-con-nosotros",
}: JoinTeamCTAProps) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.content}>
          <span>Trabaja con nosotros</span>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>

        <Link href={href} className={styles.button}>
          {buttonLabel}
        </Link>
      </div>
    </section>
  );
}