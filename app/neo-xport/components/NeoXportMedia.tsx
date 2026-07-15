/* eslint-disable @next/next/no-img-element */

import Typologies from "./Typologies";
import styles from "./NeoXportMedia.module.css";

export default function NeoXportMedia() {
  return (
    <section
      className={styles.section}
      id="tipologias-neo-xport"
      aria-labelledby="neo-xport-media-title"
    >
      <div className={styles.header}>
        <span>Conoce Neo Xport</span>

        <h2 id="neo-xport-media-title">
          Descubre el proyecto y encuentra la tipología ideal para ti
        </h2>

        <p>
          Conoce el primer edificio con ADN deportivo de Huancayo y elige
          la distribución que mejor se adapte a tu ritmo y estilo de vida.
        </p>
      </div>

      <div className={styles.grid}>
        <article className={styles.videoCard}>
          <div className={styles.videoBox}>
            <img
              src="/assets/projects/neo-xport/media/portada-neo-xport.webp"
              alt="Presentación del proyecto Neo Xport en Huancayo"
              width={1200}
              height={675}
              loading="lazy"
            />

            <div
              className={styles.videoOverlay}
              aria-hidden={true}
            />

            <button
              type="button"
              className={styles.playButton}
              aria-label="Reproducir presentación de Neo Xport"
            >
              <span aria-hidden={true}>▶</span>
            </button>

            <div className={styles.videoBadge}>
              Presentación del proyecto
            </div>
          </div>

          <div className={styles.videoContent}>
            <span>Proyecto Neo Xport</span>

            <h3>
              Vive en movimiento frente al Polideportivo Wanka
            </h3>

            <p>
              Descubre un edificio pensado para deportistas, personas
              activas e inversionistas, con espacios para entrenar,
              recuperarte, reunirte y disfrutar cada día.
            </p>

            <div className={styles.videoStats}>
              <div>
                <span>Distribuciones</span>
                <strong>2 y 3 ambientes</strong>
              </div>

              <div>
                <span>Área</span>
                <strong>De 60 m² a 77 m²</strong>
              </div>

              <div>
                <span>Concepto</span>
                <strong>ADN deportivo</strong>
              </div>
            </div>
          </div>
        </article>

        <div className={styles.typologyColumn}>
          <Typologies
            mode="compact"
            projectHref="#informacion-neo-xport"
          />
        </div>
      </div>
    </section>
  );
}