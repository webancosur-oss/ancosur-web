
import { lotOptions } from "../data";
import styles from "./ColinasDeMoroMedia.module.css";

export default function ColinasDeMoroMedia() {
  return (
    <section
      className={styles.mediaSection}
      id="lotes-colinas-de-moro"
      aria-labelledby="colinas-de-moro-media-title"
    >
      <div className={styles.mediaHeader}>
        <span>Lotes desde 90 m² hasta 285 m²</span>

        <h2 id="colinas-de-moro-media-title">
          Encuentra el terreno ideal para tu próximo proyecto
        </h2>

        <p>
          Elige entre lotes de 90 m² a 285 m² y encuentra el espacio que mejor
          se adapte a tu futura vivienda, casa de campo o inversión
          inmobiliaria.
        </p>
      </div>

      <article className={styles.projectVideoCard}>
        <div className={styles.projectVideoBox}>
          <img
            src="/assets/projects/colinas-de-moro/media/portada-colinas-de-moro.webp"
            alt="Vista general del proyecto Las Colinas de Moro"
            width={1600}
            height={900}
          />

          <div
            className={styles.projectVideoOverlay}
            aria-hidden={true}
          />

          <button
            type="button"
            className={styles.projectPlayButton}
            aria-label="Reproducir presentación de Las Colinas de Moro"
          >
            <span aria-hidden={true}>▶</span>
          </button>

          <div className={styles.projectVideoContent}>
            <span>Las Colinas de Moro</span>

            <h3>
              Lotes desde 90 m² hasta 285 m² en una zona con proyección
            </h3>
          </div>
        </div>
      </article>

      <div className={styles.lotOptionsGrid}>
        {lotOptions.map((lot) => (
          <article
            key={lot.id}
            className={styles.lotOptionCard}
          >
            <div className={styles.lotOptionImage}>
              <img
                src={lot.image}
                alt={`${lot.name}, terreno de ${lot.area}`}
                width={900}
                height={700}
                loading="lazy"
              />

              <span>{lot.tag}</span>
            </div>

            <div className={styles.lotOptionContent}>
              <span>Terreno disponible</span>

              <h3>{lot.name}</h3>

              <strong>{lot.area}</strong>

              <p>{lot.description}</p>

              <a href="#informacion-colinas-de-moro">
                Cotizar este lote
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}