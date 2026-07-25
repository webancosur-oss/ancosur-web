import Typologies from "./Typologies";
import styles from "./NeoOrigenMedia.module.css";

export default function NeoOrigenMedia() {
  return (
    <section
      className={styles.section}
      id="tipologias-neo-origen"
      aria-labelledby="neo-origen-media-title"
    >
      <div className={styles.header}>
        <span>Conoce Neo Origen</span>

        <h2 id="neo-origen-media-title">
          Descubre el proyecto y encuentra tu tipología ideal
        </h2>

        <p>
          Conoce la propuesta innovadora de Neo Origen y elige el
          departamento que mejor se adapte a tu estilo de vida, necesidades
          familiares u objetivos de inversión.
        </p>
      </div>

      <div className={styles.grid}>
        <article className={styles.videoCard}>
          <div className={styles.videoBox}>
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/tYWVRRRBmZQ?si=ABI8bMWyDRyKtYrg"
              title="Presentación del proyecto Neo Origen"
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
            <span>Proyecto Neo Origen</span>

            <h3>
              Innovación, conectividad y un nuevo estilo de vida en El Tambo
            </h3>

            <p>
              Descubre su arquitectura temática inspirada en el universo,
              su ubicación estratégica, sus ocho áreas comunes y sus
              departamentos diseñados para vivir con comodidad o invertir
              con visión de futuro.
            </p>

            <div className={styles.videoStats}>
              <div>
                <span>Ambientes</span>
                <strong>1, 2 y 3 ambientes</strong>
              </div>

              <div>
                <span>Área</span>
                <strong>Desde 40 m²</strong>
              </div>

              <div>
                <span>Concepto</span>
                <strong>Universo e innovación</strong>
              </div>
            </div>
          </div>
        </article>

        <div className={styles.typologyColumn}>
          <Typologies
            mode="compact"
            projectHref="#informacion-neo-origen"
          />
        </div>
      </div>
    </section>
  );
}