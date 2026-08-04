import { createSeoMetadata } from "@/src/lib/seo";

import { jobs } from "@/data/jobs";

import styles from "./TrabajaPage.module.css";

/* =========================================================
   SEO
========================================================= */

export const metadata = createSeoMetadata({
  title:
    "Trabaja con Nosotros | ANCOSUR Inmobiliaria",

  description:
    "Conoce las oportunidades laborales disponibles en ANCOSUR Inmobiliaria y postula a nuestra bolsa de trabajo en Huancayo.",

  pathname:
    "/trabaja-con-nosotros",

  keywords: [
    "trabaja con nosotros ANCOSUR",
    "empleos ANCOSUR",
    "vacantes ANCOSUR",
    "trabajo inmobiliaria Huancayo",
    "bolsa de trabajo Huancayo",
    "empleos en Huancayo",
    "oportunidades laborales Huancayo",
    "postular ANCOSUR",
    "ANCOSUR",
    "ANCOSUR Inmobiliaria",
  ],

  image:
    "/opengraph-image.png",
});

/* =========================================================
   PÁGINA
========================================================= */

export default function TrabajaPage() {
  const activeJobs = jobs.filter(
    (job) => job.active,
  );

  return (
    <main
      id="main-content"
      className={styles.page}
    >
      <section
        className={styles.hero}
        aria-labelledby="trabaja-title"
      >
        <div className={styles.heroContent}>
          <span className={styles.eyebrow}>
            Bolsa de trabajo ANCOSUR
          </span>

          <h1 id="trabaja-title">
            Construye tu futuro con nosotros
          </h1>

          <p>
            Buscamos personas con talento, compromiso y actitud
            para formar parte de una empresa inmobiliaria en
            crecimiento.
          </p>
        </div>
      </section>

      <section
        className={styles.introSection}
        aria-labelledby="trabaja-intro-title"
      >
        <div className={styles.introText}>
          <span>
            Trabaja con nosotros
          </span>

          <h2 id="trabaja-intro-title">
            Únete a un equipo que construye confianza
          </h2>
        </div>

        <p>
          En ANCOSUR impulsamos proyectos inmobiliarios con
          enfoque en calidad, innovación y servicio. Si quieres
          crecer profesionalmente y aportar a proyectos que
          transforman la ciudad, esta oportunidad es para ti.
        </p>
      </section>

      <section
        className={styles.jobsSection}
        aria-labelledby="vacantes-title"
      >
        <div className={styles.header}>
          <span>
            Vacantes disponibles
          </span>

          <h2 id="vacantes-title">
            Postula a nuestras oportunidades laborales
          </h2>
        </div>

        {activeJobs.length > 0 ? (
          <div className={styles.grid}>
            {activeJobs.map((job) => {
              const normalizedPhone =
                job.applyPhone
                  ?.replace(/\D/g, "");

              const whatsappPhone =
                normalizedPhone?.startsWith("51")
                  ? normalizedPhone
                  : normalizedPhone
                    ? `51${normalizedPhone}`
                    : null;

              const emailSubject =
                encodeURIComponent(
                  `Postulación ${job.title}`,
                );

              const whatsappMessage =
                encodeURIComponent(
                  `Hola, quiero postular a la vacante de ${job.title}.`,
                );

              return (
                <article
                  key={job.id}
                  className={styles.card}
                >
                  <div className={styles.cardHeader}>
                    <span>
                      {job.area}
                    </span>

                    <h3>
                      {job.title}
                    </h3>

                    <p>
                      {job.summary}
                    </p>
                  </div>

                  <div className={styles.meta}>
                    <small>
                      {job.location}
                    </small>

                    <small>
                      {job.modality}
                    </small>

                    <small>
                      {job.type}
                    </small>
                  </div>

                  {job.requirements.length > 0 && (
                    <div className={styles.requirements}>
                      <h4>
                        Requisitos
                      </h4>

                      <ul>
                        {job.requirements.map(
                          (item) => (
                            <li key={item}>
                              {item}
                            </li>
                          ),
                        )}
                      </ul>
                    </div>
                  )}

                  {job.functions.length > 0 && (
                    <div className={styles.requirements}>
                      <h4>
                        Funciones principales
                      </h4>

                      <ul>
                        {job.functions.map(
                          (item) => (
                            <li key={item}>
                              {item}
                            </li>
                          ),
                        )}
                      </ul>
                    </div>
                  )}

                  <div className={styles.applyBox}>
                    <a
                      href={`mailto:${job.applyEmail}?subject=${emailSubject}`}
                      className={styles.applyButton}
                      aria-label={`Enviar CV para la vacante de ${job.title}`}
                    >
                      Enviar CV
                    </a>

                    {whatsappPhone && (
                      <a
                        href={`https://wa.me/${whatsappPhone}?text=${whatsappMessage}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.whatsappButton}
                        aria-label={`Postular por WhatsApp a la vacante de ${job.title}`}
                      >
                        WhatsApp
                      </a>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <h3>
              Actualmente no tenemos vacantes disponibles
            </h3>

            <p>
              Puedes enviarnos tu CV para considerarte en futuras
              oportunidades laborales.
            </p>

            <a
              href="mailto:jefe.experiencia.cliente@ancosur.com?subject=Postulaci%C3%B3n%20espont%C3%A1nea%20ANCOSUR"
              className={styles.applyButton}
            >
              Enviar CV
            </a>
          </div>
        )}
      </section>

      <section
        className={styles.cta}
        aria-labelledby="postulacion-title"
      >
        <div>
          <span>
            Postulación espontánea
          </span>

          <h2 id="postulacion-title">
            ¿No encontraste una vacante para ti?
          </h2>

          <p>
            Envíanos tu CV y cuéntanos en qué área te gustaría
            desarrollarte. Nuestro equipo podrá considerarte para
            futuras convocatorias.
          </p>
        </div>

        <a href="mailto:jefe.experiencia.cliente@ancosur.com?subject=Postulaci%C3%B3n%20espont%C3%A1nea%20ANCOSUR">
          Enviar CV
        </a>
      </section>
    </main>
  );
}