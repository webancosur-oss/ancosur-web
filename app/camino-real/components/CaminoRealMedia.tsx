/* eslint-disable @next/next/no-img-element */

import { lotOptions } from "../data";
import styles from "./CaminoRealMedia.module.css";

export default function CaminoRealMedia() {
  return (
    <section
      className={styles.mediaSection}
      id="lotes-camino-real"
      aria-labelledby="camino-real-media-title"
    >
      <div className={styles.mediaHeader}>
        <span>Lotes desde 90 m² hasta 178 m²</span>

        <h2 id="camino-real-media-title">
          Encuentra el terreno ideal para construir tu futuro
        </h2>

        <p>
          Elige entre lotes de 90 m² a 178 m² y encuentra el espacio que mejor
          se adapte a tu futura vivienda o inversión inmobiliaria dentro de una
          urbanización completa en El Tambo.
        </p>
      </div>

      <article className={styles.projectVideoCard}>
        <div className={styles.projectVideoBox}>
          <img
            src="/assets/projects/camino-real/media/portada-camino-real.webp"
            alt="Vista general del proyecto Camino Real Residencial"
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
            aria-label="Reproducir presentación de Camino Real Residencial"
          >
            <span aria-hidden={true}>▶</span>
          </button>

          <div className={styles.projectVideoContent}>
            <span>Camino Real Residencial</span>

            <h3>
              Lotes desde 90 m² hasta 178 m² en una urbanización completa de
              El Tambo
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

              <a href="#informacion-camino-real">
                Cotizar este lote
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}