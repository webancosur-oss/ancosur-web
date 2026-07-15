
import Typologies from "./Typologies";
import styles from "./NeoEternaMedia.module.css";

export default function NeoEternaMedia() {
  return (
    <section
      className={styles.section}
      id="tipologias-neo-eterna"
      aria-labelledby="neo-eterna-media-title"
    >
      <div className={styles.header}>
        <span>Conoce Neo Eterna</span>

        <h2 id="neo-eterna-media-title">
          Descubre el proyecto y encuentra tu tipología ideal
        </h2>

        <p>
          Conoce la propuesta de Neo Eterna en el corazón de la zona
          universitaria y elige el departamento que mejor se adapte a tu etapa
          de vida, tus estudios o tus objetivos de inversión.
        </p>
      </div>

      <div className={styles.grid}>
        <article className={styles.videoCard}>
          <div className={styles.videoBox}>
            <img
              src="https://placehold.co/1200x675/dce7e2/17172f.webp?text=Video+Neo+Eterna"
              alt="Presentación del proyecto Neo Eterna"
            />

            <div className={styles.videoOverlay} />

            <button
              type="button"
              className={styles.playButton}
              aria-label="Reproducir video de Neo Eterna"
            >
              <span aria-hidden={true}>▶</span>
            </button>

            <div className={styles.videoBadge}>
              Presentación del proyecto
            </div>
          </div>

          <div className={styles.videoContent}>
            <span>Proyecto Neo Eterna</span>

            <h3>
              Inversión inteligente en el corazón de la zona universitaria
            </h3>

            <p>
              Descubre un proyecto moderno y funcional ubicado cerca de las
              principales universidades de Huancayo, pensado para estudiantes,
              profesionales, padres de familia e inversionistas.
            </p>

            <div className={styles.videoStats}>
              <div>
                <span>Ambientes</span>
                <strong>1, 2 y 3 ambientes</strong>
              </div>

              <div>
                <span>Área</span>
                <strong>Desde 41 m² hasta 78 m²</strong>
              </div>

              <div>
                <span>Concepto</span>
                <strong>Hub Universitario</strong>
              </div>
            </div>
          </div>
        </article>

        <div className={styles.typologyColumn}>
          <Typologies
            mode="compact"
            projectHref="#informacion-neo-eterna"
          />
        </div>
      </div>
    </section>
  );
}