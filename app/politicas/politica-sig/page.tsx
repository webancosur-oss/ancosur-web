import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import styles from "./PoliticaSigPage.module.css";
import BackButton from "@/components/BackButton";

export const metadata = {
  title: "Política SIG | ANCOSUR Inmobiliaria",
  description:
    "Conoce la Política del Sistema Integrado de Gestión de ANCOSUR S.A.C., orientada a la calidad, satisfacción del cliente y protección ambiental.",
};

const commitments = [
  "Garantizar la calidad en el diseño de proyectos, venta y post venta de departamentos, asegurando que cada uno de ellos se desarrolle conforme a los estándares de calidad y ambientales establecidos.",
  "Desarrollar nuestras actividades de manera sostenible, con un firme compromiso con la prevención de la contaminación y la protección del medio ambiente.",
  "Promover buenas prácticas ambientales entre nuestros clientes y partes interesadas, fomentando una cultura de responsabilidad ambiental en aquellas áreas donde podamos ejercer influencia.",
  "Asegurar que las necesidades y expectativas de nuestros clientes se cumplan de manera efectiva y eficiente.",
  "Buscar la satisfacción de nuestros clientes.",
  "Asegurar que todas nuestras actividades se realicen en cumplimiento con la legislación nacional vigente en materia de calidad y ambiental, así como con los compromisos suscritos por la organización.",
  "Fomentar la mejora continua en todos los procesos a través de la revisión y optimización constante del Sistema Integrado de Gestión.",
];

export default function PoliticaSigPage() {
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
            <h1>Política del Sistema Integrado de Gestión</h1>
            <p>
              Compromiso con la calidad, la satisfacción del cliente y la
              protección ambiental.
            </p>
          </div>
        </section>

        <section className={styles.contentSection}>
          <article className={styles.article}>
            <div className={styles.badge}>ANCOSUR S.A.C.</div>

            <p>
              ANCOSUR S.A.C. es una empresa dedicada al{" "}
              <strong>
                diseño de proyectos, venta y post venta de departamentos
              </strong>
              , entendiendo que la excelencia en la gestión es fundamental para
              nuestro éxito y sostenibilidad.
            </p>

            <p>
              Nuestra Política de Sistema Integrado de Gestión expresa nuestro
              compromiso con la calidad, la satisfacción del cliente y la
              protección ambiental. La Alta Dirección de ANCOSUR asume el
              liderazgo y compromiso con el Sistema Integrado de Gestión de la
              Calidad y Medio Ambiente.
            </p>

            <h2>En este marco, nos comprometemos a:</h2>

            <ol className={styles.commitments}>
              {commitments.map((item, index) => (
                <li key={item}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <p>{item}</p>
                </li>
              ))}
            </ol>

            <div className={styles.closing}>
              <p>
                Estos compromisos constituyen el marco en el que se establecen
                los objetivos y metas de ANCOSUR S.A.C. para su Sistema
                Integrado de Gestión.
              </p>
            </div>
          </article>
        </section>
      </main>

      
    </>
  );
}