import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackButton from "@/components/BackButton";
import { jobs } from "@/data/jobs";
import styles from "./TrabajaPage.module.css";

export const metadata = {
  title: "Trabaja con Nosotros | ANCOSUR Inmobiliaria",
  description:
    "Conoce las oportunidades laborales disponibles en ANCOSUR Inmobiliaria y postula a nuestra bolsa de trabajo.",
};

export default function TrabajaPage() {
  const activeJobs = jobs.filter((job) => job.active);

  return (
    <>
      <Navbar />

      <main className={styles.page}>
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <span className={styles.eyebrow}>Bolsa de trabajo ANCOSUR</span>
            <h1>Construye tu futuro con nosotros</h1>
            <p>
              Buscamos personas con talento, compromiso y actitud para formar
              parte de una empresa inmobiliaria en crecimiento.
            </p>
          </div>
        </section>

        <section className={styles.introSection}>
          <div className={styles.introText}>
            <span>Trabaja con nosotros</span>
            <h2>Únete a un equipo que construye confianza</h2>
          </div>

          <p>
            En ANCOSUR impulsamos proyectos inmobiliarios con enfoque en
            calidad, innovación y servicio. Si quieres crecer profesionalmente y
            aportar a proyectos que transforman la ciudad, esta oportunidad es
            para ti.
          </p>
        </section>

        <section className={styles.jobsSection}>
          <div className={styles.header}>
            <span>Vacantes disponibles</span>
            <h2>Postula a nuestras oportunidades laborales</h2>
          </div>

          {activeJobs.length > 0 ? (
            <div className={styles.grid}>
              {activeJobs.map((job) => (
                <article key={job.id} className={styles.card}>
                  <div className={styles.cardHeader}>
                    <span>{job.area}</span>
                    <h3>{job.title}</h3>
                    <p>{job.summary}</p>
                  </div>

                  <div className={styles.meta}>
                    <small>{job.location}</small>
                    <small>{job.modality}</small>
                    <small>{job.type}</small>
                  </div>

                 <div className={styles.requirements}>
  <h4>Requisitos</h4>

  <ul>
    {job.requirements.map((item) => (
      <li key={item}>{item}</li>
    ))}
  </ul>
</div>

{job.functions.length > 0 && (
  <div className={styles.requirements}>
    <h4>Funciones principales</h4>

    <ul>
      {job.functions.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  </div>
)}

<div className={styles.applyBox}>
  <a
    href={`mailto:${job.applyEmail}?subject=Postulación%20${encodeURIComponent(
      job.title
    )}`}
    className={styles.applyButton}
  >
    Enviar CV
  </a>

  {job.applyPhone && (
    <a
      href={`https://wa.me/51${job.applyPhone.replace(/\s/g, "")}?text=Hola,%20quiero%20postular%20a%20la%20vacante%20de%20${encodeURIComponent(
        job.title
      )}`}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.whatsappButton}
    >
      WhatsApp
    </a>
  )}
</div>
                </article>
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <h3>Actualmente no tenemos vacantes disponibles</h3>
              <p>
                Puedes enviarnos tu CV para considerarte en futuras
                oportunidades laborales.
              </p>

              <a
                href="mailto:info@ancosur.com?subject=Postulación%20espontánea%20ANCOSUR"
                className={styles.applyButton}
              >
                Enviar CV
              </a>
            </div>
          )}
        </section>

        <section className={styles.cta}>
          <div>
            <span>Postulación espontánea</span>
            <h2>¿No encontraste una vacante para ti?</h2>
            <p>
              Envíanos tu CV y cuéntanos en qué área te gustaría desarrollarte.
              Nuestro equipo podrá considerarte para futuras convocatorias.
            </p>
          </div>

          <a href="mailto:info@ancosur.com?subject=Postulación%20espontánea%20ANCOSUR">
            Enviar CV
          </a>
        </section>
      </main>

      <Footer />
    </>
  );
}