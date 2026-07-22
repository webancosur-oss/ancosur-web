import Typologies from "./Typologies";
import styles from "./NeoRiveraMedia.module.css";

export default function NeoRiveraMedia() {
  return (
    <section
      className={styles.section}
      id="tipologias-neo-balto"
      aria-labelledby="neo-balto-media-title"
    >
      <div className={styles.header}>
        <span>Conoce Neo Balto</span>

        <h2 id="neo-balto-media-title">
          Descubre el proyecto y encuentra tu
          tipología ideal
        </h2>

        <p>
          Conoce la propuesta Pet-Centric de
          Neo Balto y elige el departamento
          que mejor se adapte a tu estilo de
          vida y al de tu mascota.
        </p>
      </div>

      <div className={styles.grid}>
        <article className={styles.videoCard}>
          <div className={styles.videoBox}>
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/tYWVRRRBmZQ?si=ABI8bMWyDRyKtYrg"
              title="Presentación del proyecto Neo Balto"
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
            <span>Proyecto Neo Balto</span>

            <h3>
              Vive en familia en el primer
              edificio Pet-Centric de Huancayo
            </h3>

            <p>
              Descubre su arquitectura,
              ubicación, amenidades
              pet-friendly y departamentos
              diseñados para compartir una
              vida más cómoda junto a tu
              mascota.
            </p>

            <div className={styles.videoStats}>
              <div>
                <span>Ambientes</span>
                <strong>2 ambientes</strong>
              </div>

              <div>
                <span>Área</span>
                <strong>Desde 43 m²</strong>
              </div>

              <div>
                <span>Concepto</span>
                <strong>Pet-Centric</strong>
              </div>
            </div>
          </div>
        </article>

        <div className={styles.typologyColumn}>
          <Typologies
            mode="compact"
            projectHref="#informacion-neo-balto"
          />
        </div>
      </div>
    </section>
  );
}