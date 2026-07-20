import Image from "next/image";

import {
  investorStats,
} from "../data";

import styles from "./InvestorsStats.module.css";

export default function InvestorsStats() {
  return (
    <section
      className={styles.section}
      id="resultados"
    >
      <div className={styles.heading}>
        <span>Respaldo inmobiliario</span>

        <h2>
          Cifras que reflejan experiencia y solidez
        </h2>

        <p>
          Nuestra trayectoria se construye con proyectos, activos y
          resultados reales.
        </p>
      </div>

      <div className={styles.grid}>
        {investorStats.map((item, index) => {
          if (item.type === "image") {
            return (
              <div
                key={`${item.src}-${index}`}
                className={styles.imageCard}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 760px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className={styles.image}
                  style={{
                    objectPosition:
                      item.position || "center",
                  }}
                />

                <div
                  className={styles.imageOverlay}
                  aria-hidden="true"
                />
              </div>
            );
          }

          return (
            <article
              key={`${item.value}-${item.label}`}
              className={`${styles.statCard} ${
                item.theme === "green"
                  ? styles.greenCard
                  : styles.blackCard
              }`}
            >
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </article>
          );
        })}
      </div>
    </section>
  );
}