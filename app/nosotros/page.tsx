import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import styles from "./NosotrosPage.module.css";

export const metadata = {
  title: "Nosotros | ANCOSUR Inmobiliaria",
  description:
    "Conoce la historia, misión, visión, valores y fórmula de trabajo de ANCOSUR Inmobiliaria.",
};

const images = {
  team:
    "/assets/nosotros/equipo.webp",
  formula:
    "/assets/nosotros/piramide.webp",
};

const values = [
  {
    title: "Disciplina",
    description:
      "Hacemos lo que tenemos que hacer, cuando tengamos que hacerlo, tengamos ganas o no. Organización, limpieza y puntualidad.",
  },
  {
    title: "Espíritu de superación",
    description:
      "Nunca nos rendimos. Siempre estamos tratando de ser mejores y hacer algo muy importante en nuestra vida profesional.",
  },
  {
    title: "Trabajo en equipo",
    description:
      "Compartimos conocimientos e información y disfrutamos nuestros roles. El objetivo siempre es que gane el equipo.",
  },
  {
    title: "Actitud positiva",
    description:
      "La buena actitud define a los ganadores. Creemos que es la mejor manera de abordar la vida.",
  },
  {
    title: "Transparencia",
    description: "No tenemos como persona ni como equipo agendas ocultas.",
  },
];

const formula = [
  "Valores",
  "Visión - Misión",
  "Nuestro equipo",
  "Innovación",
  "Compromiso con el cliente",
  "Pasión por la excelencia",
  "Ejecución",
];

export default function NosotrosPage() {
  return (
    <>
      <Navbar />

      <main className={styles.page}>

        <section className={styles.hero}>
  <Image
    src="/assets/heros/10anios.png"
    alt="ANCOSUR Vive Diferente - 10 años contigo"
    fill
    priority
    sizes="100vw"
    className={styles.heroImage}
  />

  <div className={styles.heroOverlay} />

  <div className={styles.heroContent}>
    <span>Nosotros</span>

    <h1>ANCOSUR Inmobiliaria: construimos espacios para vivir diferente</h1>

    <p>
      10 años desarrollando proyectos inmobiliarios con innovación, compromiso
      y una visión enfocada en mejorar la forma de vivir.
    </p>
  </div>
</section>

         {/* <section className={styles.yearsSection}>
          <span>Trayectoria</span>
          <h2>10 años contigo</h2>
          <p>
            Una década construyendo proyectos inmobiliarios con compromiso,
            innovación y cercanía con cada familia.
          </p>
        </section> */}

        <section className={styles.missionSection}>
            <div className={styles.missionContent}>
                <span>Misión</span>
                <h2>Hacer realidad el sueño de la vivienda ideal</h2>
                <p>
                Hacemos realidad el sueño de la vivienda ideal de nuestros clientes,
                sin descuidar el espacio donde se diseña.
                </p>
            </div>
            </section>

            <section className={styles.visionSection}>
            <div className={styles.visionContent}>
                <span>Visión</span>
                <h2>Desarrollar proyectos con corazón sostenible</h2>
                <p>
                Para 2030 nos vemos desarrollando proyectos inmobiliarios de gran
                envergadura a nivel nacional, que tengan como corazón la sustentabilidad
                del medio ambiente.
                </p>
            </div>
        </section>

        <section className={styles.valuesSection}>
          <div className={styles.imageBox}>
            <img
              src={images.team}
              alt="Equipo ANCOSUR Inmobiliaria"
              className={styles.image}
            />
          </div>

          <div className={styles.valuesContent}>
            <span className={styles.eyebrow}>Nuestros valores</span>
            <h2>La forma en que trabajamos cada día</h2>

            <div className={styles.valuesList}>
              {values.map((item) => (
                <article key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.formulaSection}>
          <div className={styles.formulaHeader}>
            <span>Nuestra fórmula</span>
            <h2>La base que sostiene nuestro crecimiento</h2>
          </div>

          <div className={styles.formulaGrid}>
            <div className={styles.formulaList}>
              {formula.map((item, index) => (
                <div key={item} className={styles.formulaItem}>
                  <strong>{index + 1}</strong>
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div>
              <img
                src={images.formula}
                alt="Fórmula de trabajo ANCOSUR"
                className={styles.image}
              />
            </div>
          </div>
        </section>

       
      </main>

      <Footer />
    </>
  );
}