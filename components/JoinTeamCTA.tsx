import Link from "next/link";
import styles from "./JoinTeamCTA.module.css";

type JoinTeamCTAProps = {
  title?: string;
  description?: string;
  buttonLabel?: string;
  href?: string;
};

export default function JoinTeamCTA({
  title = "Tu talento también puede construir futuro.",
  description = "Únete a un equipo que crece, innova y transforma la forma de vivir e invertir en proyectos inmobiliarios.",
  buttonLabel = "Enviar mi CV",
  href = "/trabaja-con-nosotros",
}: JoinTeamCTAProps) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.content}>
          <span>Trabaja con nosotros</span>

          <h2>{title}</h2>

          <p>{description}</p>

          <div className={styles.tags}>
            <small>Comercial</small>
            <small>Marketing</small>
            <small>Proyectos</small>
            <small>Administración</small>
          </div>

          <Link href={href} className={styles.button}>
            {buttonLabel}
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className={styles.visualBox}>
          <div className={styles.visualContent}>
            <strong>ANCOSUR</strong>
            <p>Crecemos contigo.</p>
          </div>
        </div>
      </div>
    </section>
  );
}