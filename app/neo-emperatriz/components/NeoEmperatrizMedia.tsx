
import Typologies from "./Typologies";
import styles from "./NeoEmperatrizMedia.module.css";

export default function NeoEmperatrizMedia() {
  return (
    <section
      className={styles.section}
      id="tipologias-neo-emperatriz"
      aria-labelledby="neo-emperatriz-media-title"
    >
      <div className={styles.header}>
        <span>Conoce Neo Emperatriz</span>

        <h2 id="neo-emperatriz-media-title">
          Descubre tu nuevo hogar listo para habitar
        </h2>

        <p>
          Conoce la propuesta residencial de Neo Emperatriz y elige el
          departamento que mejor se adapte a tu familia, con espacios amplios,
          acabados modernos y entrega inmediata en San Carlos.
        </p>
      </div>

      <div className={styles.grid}>
        <article className={styles.videoCard}>
          <div className={styles.videoBox}>
            <img
              src="/assets/projects/neo-emperatriz/video/portada-neo-emperatriz.webp"
              alt="Presentación del proyecto Neo Emperatriz"
              width={1200}
              height={675}
            />

            <div
              className={styles.videoOverlay}
              aria-hidden={true}
            />

            <button
              type="button"
              className={styles.playButton}
              aria-label="Reproducir video de Neo Emperatriz"
            >
              <span aria-hidden={true}>▶</span>
            </button>

            <div className={styles.videoBadge}>
              Presentación del proyecto
            </div>
          </div>

          <div className={styles.videoContent}>
            <span>Proyecto Neo Emperatriz</span>

            <h3>
              Naturaleza y elegancia en un hogar listo para habitar
            </h3>

            <p>
              Descubre un edificio residencial ubicado en San Carlos, cerca de
              la Universidad Continental, con departamentos familiares,
              ambientes amplios y áreas comunes para disfrutar cada día.
            </p>

            <div className={styles.videoStats}>
              <div>
                <span>Ambientes</span>
                <strong>2 y 3 dormitorios</strong>
              </div>

              <div>
                <span>Área</span>
                <strong>Desde 67 m² hasta 109 m²</strong>
              </div>

              <div>
                <span>Estado</span>
                <strong>Entrega inmediata</strong>
              </div>
            </div>
          </div>
        </article>

        <div className={styles.typologyColumn}>
          <Typologies
            mode="compact"
            projectHref="#informacion-neo-emperatriz"
          />
        </div>
      </div>
    </section>
  );
}