import Typologies from "./Typologies";
import styles from "./Moro416Media.module.css";

export default function Moro416Media() {
  return (
    <section
      className={styles.section}
      id="tipologias-moro-416"
      aria-labelledby="moro-416-media-title"
    >
      <div className={styles.header}>
        <span>Conoce Moro 416</span>

        <h2 id="moro-416-media-title">
          Descubre un proyecto de uso mixto
          en el corazón de Huancayo
        </h2>

        <p>
          Conoce Moro 416, una propuesta que
          integra espacios comerciales,
          oficinas y departamentos en una
          ubicación estratégica de alto valor
          urbano y comercial.
        </p>
      </div>

      <div className={styles.grid}>
        <article className={styles.videoCard}>
          <div className={styles.videoBox}>
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/7MJlsOOQV2Q?si=5Fda_KdTUtSfQrTD"
              title="Presentación del proyecto Moro 416"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />

            <div className={styles.videoBadge}>
              Presentación del proyecto
            </div>
          </div>

          <div className={styles.videoContent}>
            <span>Proyecto Moro 416</span>

            <h3>
              Vive, trabaja e invierte en un
              nuevo referente arquitectónico
              de Huancayo
            </h3>

            <p>
              Moro 416 es un proyecto
              inmobiliario de uso mixto que
              integra locales comerciales,
              oficinas y departamentos, con
              una ubicación privilegiada en
              la intersección de la avenida
              Ferrocarril y la avenida
              Giráldez.
            </p>

            <div className={styles.videoStats}>
              <div>
                <span>Tipología</span>
                <strong>Uso mixto</strong>
              </div>

              <div>
                <span>Área</span>
                <strong>Desde 42 m²</strong>
              </div>

              <div>
                <span>Altura</span>
                <strong>19 pisos</strong>
              </div>
            </div>
          </div>
        </article>

        <div className={styles.typologyColumn}>
          <Typologies
            mode="compact"
            projectHref="#informacion-moro-416"
          />
        </div>
      </div>
    </section>
  );
}