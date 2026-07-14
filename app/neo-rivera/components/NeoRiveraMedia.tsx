
import Typologies from "./Typologies";
import styles from "./NeoRiveraMedia.module.css";

export default function NeoRiveraMedia() {
  return (
    <section className={styles.section} id="tipologias-neo-rivera">
      <div className={styles.header}>
        <span>Conoce Neo Rivera</span>

        <h2>Descubre el proyecto y encuentra tu tipología ideal</h2>

        <p>
          Conoce la propuesta wellness de Neo Rivera y elige la distribución
          que mejor se adapte a tu estilo de vida.
        </p>
      </div>

      <div className={styles.grid}>
        <article className={styles.videoCard}>
          <div className={styles.videoBox}>
            <img
              src="https://placehold.co/1200x675/dce7e2/17172f.webp?text=Video+Neo+Rivera"
              alt="Presentación del proyecto Neo Rivera"
            />

            <div className={styles.videoOverlay} />

            <button
              type="button"
              className={styles.playButton}
              aria-label="Reproducir video de Neo Rivera"
            >
              <span aria-hidden={true}>▶</span>
            </button>

            <div className={styles.videoBadge}>
              Presentación del proyecto
            </div>
          </div>

          <div className={styles.videoContent}>
            <span>Proyecto Neo Rivera</span>

            <h3>Vive en bienestar en La Ribera</h3>

            <p>
              Descubre su arquitectura, ubicación, amenidades y propuesta
              residencial diseñada para una vida más tranquila.
            </p>

            <div className={styles.videoStats}>
              <div>
                <span>Tipología</span>
                <strong>2 dormitorios</strong>
              </div>

              <div>
                <span>Área</span>
                <strong>Desde 57 m²</strong>
              </div>

              <div>
                <span>Concepto</span>
                <strong>Wellness</strong>
              </div>
            </div>
          </div>
        </article>

        <div className={styles.typologyColumn}>
          <Typologies
            mode="compact"
            projectHref="#informacion-neo-rivera"
          />
        </div>
      </div>
    </section>
  );
}