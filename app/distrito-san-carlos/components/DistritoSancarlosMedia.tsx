
import Typologies from "./Typologies";
import styles from "./DistritoSanCarlosMedia.module.css";

export default function DistritoSanCarlosMedia() {
  return (
    <section
      className={styles.section}
      id="tipologias-distrito-san-carlos"
      aria-labelledby="distrito-san-carlos-media-title"
    >
      <div className={styles.header}>
        <span>Conoce Distrito San Carlos</span>

        <h2 id="distrito-san-carlos-media-title">
          Descubre el proyecto y encuentra tu tipología ideal
        </h2>

        <p>
          Conoce un proyecto que integra vivienda, áreas comunes y servicios
          comerciales para que tengas todo lo que necesitas cerca de tu hogar.
        </p>
      </div>

      <div className={styles.grid}>
        <article className={styles.videoCard}>
          <div className={styles.videoBox}>
            <img
              src="https://placehold.co/1200x675/dce7e2/17172f.webp?text=Video+Distrito+San+Carlos"
              alt="Presentación del proyecto Distrito San Carlos"
              width={1200}
              height={675}
            />

            <div className={styles.videoOverlay} />

            <button
              type="button"
              className={styles.playButton}
              aria-label="Reproducir video de Distrito San Carlos"
            >
              <span aria-hidden={true}>▶</span>
            </button>

            <div className={styles.videoBadge}>
              Presentación del proyecto
            </div>
          </div>

          <div className={styles.videoContent}>
            <span>Proyecto Distrito San Carlos</span>

            <h3>
              Una ciudad dentro de tu edificio
            </h3>

            <p>
              Vive conectado con áreas comunes, zonas comerciales y servicios
              diseñados para facilitar tu día a día sin alejarte de tu hogar.
            </p>

            <div className={styles.videoStats}>
              <div>
                <span>Dormitorios</span>
                <strong>2 y 3 dormitorios</strong>
              </div>

              <div>
                <span>Área</span>
                <strong>Desde 54 m² hasta 146 m²</strong>
              </div>

              <div>
                <span>Concepto</span>
                <strong>Ciudad de 15 minutos</strong>
              </div>
            </div>
          </div>
        </article>

        <div className={styles.typologyColumn}>
          <Typologies
            mode="compact"
            projectHref="#informacion-distrito-san-carlos"
          />
        </div>
      </div>
    </section>
  );
}