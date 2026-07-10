"use client";

import {
  PlayCircleIcon,
  SpotifyLogoIcon,
} from "@phosphor-icons/react";
import { useState } from "react";
import styles from "./FloatingPodcast.module.css";

type PodcastEpisode = {
  id: number;
  title: string;
  description: string;
  embedUrl: string;
  spotifyUrl: string;
};

const episodes: PodcastEpisode[] = [
  {
    id: 1,
    title: "Episodio 1",
    description: "ANCOSUR Podcast",
    embedUrl:
      "https://open.spotify.com/episode/4353PBdKvMf4Ksns6vaiQt?si=76d9453a60a140e8",
    spotifyUrl:
      "https://open.spotify.com/episode/3iHpWa0XFSya5LQ421Lf9x",
  },
  {
    id: 2,
    title: "Episodio 2",
    description: "ANCOSUR Podcast",
    embedUrl:
      "https://open.spotify.com/embed/episode/5s7EXRvM8gndPybTbg5bqa?utm_source=generator",
    spotifyUrl:
      "https://open.spotify.com/episode/5s7EXRvM8gndPybTbg5bqa",
  },
];

export default function FloatingPodcast() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeEpisodeId, setActiveEpisodeId] = useState(episodes[0].id);

  const activeEpisode =
    episodes.find((episode) => episode.id === activeEpisodeId) ?? episodes[0];

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
            <strong>{activeEpisode.title}</strong>
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

        <div className={styles.episodeTabs} aria-label="Lista de episodios">
          {episodes.map((episode) => (
            <button
              key={episode.id}
              type="button"
              className={`${styles.episodeButton} ${
                activeEpisodeId === episode.id ? styles.activeEpisode : ""
              }`}
              onClick={() => setActiveEpisodeId(episode.id)}
            >
              {episode.title}
            </button>
          ))}
        </div>

        <p className={styles.description}>{activeEpisode.description}</p>

        <div className={styles.frameBox}>
          {isOpen && (
            <iframe
              key={activeEpisode.id}
              className={styles.spotifyFrame}
              src={activeEpisode.embedUrl}
              width="100%"
              height="352"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              title={activeEpisode.title}
            />
          )}
        </div>

        <a
          href={activeEpisode.spotifyUrl}
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