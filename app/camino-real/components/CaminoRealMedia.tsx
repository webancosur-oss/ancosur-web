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
          <iframe
            src="https://www.youtube.com/embed/XX6JkY2VpF8?si=SF8QSt33_8txb4F2"
            title="Video Camino Real Residencial"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      </article>

      {/*
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
      */}
    </section>
  );
}