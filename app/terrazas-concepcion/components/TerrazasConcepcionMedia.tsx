"use client";


import {
  PauseIcon,
  PlayIcon,
} from "@phosphor-icons/react";
import { useRef, useState } from "react";

import {
  lotOptions,
  projectMedia,
} from "../data";

import styles from "./TerrazasConcepcionMedia.module.css";

export default function TerrazasConcepcionMedia() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleVideoToggle = async () => {
    const video = videoRef.current;

    if (!video) return;

    try {
      if (video.paused) {
        await video.play();
      } else {
        video.pause();
      }
    } catch {
      setIsPlaying(false);
    }
  };

  return (
    <section
      className={styles.mediaSection}
      id="lotes-terrazas-concepcion"
      aria-labelledby="terrazas-concepcion-media-title"
    >
      <div className={styles.mediaHeader}>
        <span>Lotes de 90 m² a 174 m²</span>

        <h2 id="terrazas-concepcion-media-title">
          Encuentra el terreno ideal para construir o invertir
        </h2>

        <p>
          Elige un lote rodeado de naturaleza, con vistas privilegiadas
          al Valle de Concepción, financiamiento directo y terrenos
          desde S/ 33,900.
        </p>
      </div>

      <article className={styles.projectVideoCard}>
        <div className={styles.projectVideoBox}>
          <video
            ref={videoRef}
            className={styles.projectVideo}
            poster={projectMedia.poster}
            preload="metadata"
            playsInline
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onEnded={() => setIsPlaying(false)}
            aria-label="Presentación de Las Terrazas de Concepción"
          >
            <source
              src={projectMedia.video}
              type="video/mp4"
            />

            Tu navegador no permite reproducir este video.
          </video>

          <div
            className={`${styles.projectVideoOverlay} ${
              isPlaying
                ? styles.projectVideoOverlayHidden
                : ""
            }`}
            aria-hidden={true}
          />

          <button
            type="button"
            className={`${styles.projectPlayButton} ${
              isPlaying
                ? styles.projectPlayButtonActive
                : ""
            }`}
            onClick={handleVideoToggle}
            aria-label={
              isPlaying
                ? "Pausar presentación de Las Terrazas de Concepción"
                : "Reproducir presentación de Las Terrazas de Concepción"
            }
          >
            {isPlaying ? (
              <PauseIcon
                size={22}
                weight="fill"
                aria-hidden={true}
              />
            ) : (
              <PlayIcon
                size={27}
                weight="fill"
                aria-hidden={true}
              />
            )}
          </button>

          <div
            className={`${styles.projectVideoContent} ${
              isPlaying
                ? styles.projectVideoContentHidden
                : ""
            }`}
          >
            <span>{projectMedia.badge}</span>

            <h3>{projectMedia.title}</h3>

            <p>{projectMedia.description}</p>
          </div>
        </div>
      </article>

      <div className={styles.lotOptionsHeader}>
        <span>Opciones de terrenos</span>

        <h2>
          Elige el metraje que mejor se adapte a tus planes
        </h2>

        <p>
          Terrenos acondicionados para construir una vivienda,
          una casa de campo o desarrollar una inversión
          inmobiliaria en Concepción.
        </p>
      </div>

      <div className={styles.lotOptionsGrid}>
        {lotOptions.map((lot) => (
          <article
            key={lot.id}
            className={styles.lotOptionCard}
          >
            <div className={styles.lotOptionImage}>
              <img
                src={lot.image}
                alt={`${lot.name} en Las Terrazas de Concepción`}
                width={900}
                height={700}
                loading="lazy"
              />

              <span>{lot.tag}</span>
            </div>

            <div className={styles.lotOptionContent}>
              <span>Terreno disponible</span>

              <h3>{lot.name}</h3>

              <div className={styles.lotOptionData}>
                <div>
                  <span>Área</span>
                  <strong>{lot.area}</strong>
                </div>

                {lot.price && (
                  <div>
                    <span>Precio</span>
                    <strong>{lot.price}</strong>
                  </div>
                )}
              </div>

              <p>{lot.description}</p>

              <a href="#informacion-terrazas-concepcion">
                Cotizar este lote
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}