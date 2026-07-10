import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackButton from "@/components/BackButton";
import styles from "./AlcanceSigPage.module.css";

export const metadata = {
  title: "Alcance del SIG | ANCOSUR Inmobiliaria",
  description:
    "Conoce el alcance del Sistema Integrado de Gestión de ANCOSUR S.A.C., basado en las normas ISO 9001:2015 e ISO 14001:2015.",
};

const mainProcesses = [
  "Gestión de Proyectos",
  "Gestión de Ventas",
  "Gestión de Experiencia al Cliente",
];

const interactionProcesses = [
  "Gestión Estratégica",
  "Sistema Integrado de Gestión",
  "Gestión de Oficina Técnica",
  "Gestión de Control de Calidad",
  "Gestión Documentaria",
  "Gestión de Logística",
  "Gestión de Tecnología de la Información",
  "Gestión de Talento Humano",
  "Gestión de Marketing",
  "Gestión de Experiencia al Cliente",
];

export default function AlcanceSigPage() {
  return (
    <>
      <Navbar />

      <main className={styles.page}>
        <section className={styles.hero}>
          <div className={styles.heroContent}>
           <BackButton
            href="/politicas"
            label="Volver a políticas"
            variant="dark"
            className={styles.backButton}
          />

          <span className={styles.eyebrow}>Políticas ANCOSUR</span>
            <h1>Alcance del Sistema Integrado de Gestión</h1>
            <p>
              Alcance basado en los requisitos de las normas ISO 9001:2015 e ISO
              14001:2015.
            </p>
          </div>
        </section>

        <section className={styles.contentSection}>
          <article className={styles.article}>
            <div className={styles.badge}>ANCOSUR S.A.C.</div>

            <p>
              En la empresa <strong>ANCOSUR S.A.C.</strong>, ubicada en la Av.
              San Carlos N.° 1481, Urbanización San Antonio, distrito de
              Huancayo, provincia de Huancayo y departamento de Junín, se
              consideran dentro de su alcance los requisitos de la norma{" "}
              <strong>ISO 9001:2015 Sistema de Gestión de la Calidad</strong> y
              la norma{" "}
              <strong>ISO 14001:2015 Sistema de Gestión Ambiental</strong>.
            </p>

            <div className={styles.scopeBox}>
              <span>Alcance principal</span>
              <h2>Diseño de proyectos, venta y post venta de departamentos</h2>
            </div>

            <p>
              Tomando como base el Mapa de Procesos de la empresa, están dentro
              del alcance del Sistema Integrado de Gestión los siguientes
              procesos:
            </p>

            <div className={styles.processGrid}>
              <div className={styles.processCard}>
                <h3>Procesos principales</h3>

                <ul>
                  {mainProcesses.map((process) => (
                    <li key={process}>{process}</li>
                  ))}
                </ul>
              </div>

              <div className={styles.processCard}>
                <h3>Procesos de interacción</h3>

                <ul>
                  {interactionProcesses.map((process) => (
                    <li key={process}>{process}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className={styles.note}>
              <h3>Justificación del requisito 7.1.5.2</h3>
              <p>
                Respecto a la trazabilidad de las mediciones, ANCOSUR S.A.C. no
                cuenta con equipos que necesiten ser calibrados para este
                alcance.
              </p>
            </div>
          </article>
        </section>
      </main>

      <Footer />
    </>
  );
}