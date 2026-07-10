"use client";

import { PlayCircleIcon, SpotifyLogoIcon } from "@phosphor-icons/react";
import { useState } from "react";
import styles from "./FloatingPodcast.module.css";

const episode = {
  title: "ANCOSUR Podcast",
  description: "Episodio destacado de ANCOSUR Podcast.",
  embedUrl:
    "https://open.spotify.com/embed/episode/4353PBdKvMf4Ksns6vaiQt/video?utm_source=generator&si=2b377738d4c64558",
  spotifyUrl:
    "https://open.spotify.com/episode/4353PBdKvMf4Ksns6vaiQt?si=2b377738d4c64558",
};

export default function FloatingPodcast() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <aside className={`${styles.podcastWidget} ${isOpen ? styles.open : ""}`}>
      <button
        type="button"
        className={styles.notch}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? "Cerrar podcast" : "Abrir podcast"}
        aria-expanded={isOpen}
      >
        <span className={styles.icon}>
          <PlayCircleIcon size={20} weight="fill" aria-hidden="true" />
        </span>
        <span className={styles.text}>Podcast</span>
      </button>

      <div className={styles.panel}>
        <div className={styles.header}>
          <div className={styles.titleBox}>
            <span>
              <SpotifyLogoIcon size={17} weight="fill" aria-hidden="true" />
              ANCOSUR Podcast
            </span>
            <strong>{episode.title}</strong>
          </div>

          <button
            type="button"
            className={styles.closeButton}
            onClick={() => setIsOpen(false)}
            aria-label="Cerrar podcast"
          >
            ×
          </button>
        </div>

        <p className={styles.description}>{episode.description}</p>

        <div className={styles.frameBox}>
          {isOpen && (
            <iframe
              className={styles.spotifyFrame}
              src={episode.embedUrl}
              width="100%"
              height="279"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              allowFullScreen
              loading="lazy"
              title={episode.title}
            />
          )}
        </div>

        <a
          href={episode.spotifyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.spotifyLink}
        >
          <SpotifyLogoIcon size={18} weight="fill" aria-hidden="true" />
          Abrir en Spotify
        </a>
      </div>
    </aside>
  );
}