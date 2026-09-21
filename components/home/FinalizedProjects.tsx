// src/components/home/FinalizedProjects.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import {
  getProjectAssetUrl,
  ProyectosWebAPI,
} from "@/data/proyectosWeb";

import type { ProyectoWeb } from "@/src/types/proyectoWeb";

import styles from "./FinalizedProjects.module.css";

type FinalizedProjectsProps = {
  limit?: number;
  title?: string;
  description?: string;
};

function getWhatsAppHref(
  project: ProyectoWeb
): string | null {
  const number =
    project.whatsapp
      ?.replace(/\D/g, "")
      .trim() || "";

  if (!number) {
    return null;
  }

  const projectName =
    project.titulo?.trim() ||
    "este proyecto";

  const message = encodeURIComponent(
    `Hola, vi el proyecto ${projectName} en la web de ANCOSUR y quisiera conocer más sobre este proyecto y recibir información.`
  );

  return `https://wa.me/${number}?text=${message}`;
}

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="17"
      height="17"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h13" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20.5 11.5a8.5 8.5 0 0 1-12.7 7.4L3.5 20l1.1-4.1A8.5 8.5 0 1 1 20.5 11.5Z" />
      <path d="M8.5 8.5c.2-.4.4-.4.7-.4h.5c.2 0 .4.1.5.4l.7 1.6c.1.2.1.4-.1.6l-.5.6c-.1.1-.1.3 0 .5.5.9 1.3 1.7 2.2 2.2.2.1.4.1.5 0l.6-.5c.2-.2.4-.2.6-.1l1.6.7c.3.1.4.3.4.5v.5c0 .3 0 .5-.4.7-.4.2-1 .3-1.5.2-1.2-.2-2.6-.9-3.8-2.1-1.2-1.2-1.9-2.6-2.1-3.8-.1-.5 0-1.1.2-1.5Z" />
    </svg>
  );
}

function ProjectCard({
  project,
}: {
  project: ProyectoWeb;
}) {
  const imageUrl = getProjectAssetUrl(
    project.imagen_url
  );

  const projectName =
    project.titulo?.trim() ||
    "Proyecto ANCOSUR";

  const whatsappHref =
    getWhatsAppHref(project);

  return (
    <article className={styles.card}>
      <div className={styles.imageWrapper}>
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={projectName}
            className={styles.image}
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div
            className={styles.imagePlaceholder}
            aria-label={`Imagen no disponible para ${projectName}`}
          >
            ANCOSUR
          </div>
        )}

        <span className={styles.badge}>
          PROYECTO CULMINADO
        </span>
      </div>

      <div className={styles.cardContent}>
        <h3 className={styles.projectTitle}>
          {projectName}
        </h3>

        <p className={styles.projectMessage}>
          Conoce la experiencia de ANCOSUR y
          descubre este proyecto que ya fue
          culminado.
        </p>

        {whatsappHref ? (
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.whatsapp}
            aria-label={`Quiero información sobre ${projectName} por WhatsApp`}
          >
            <WhatsAppIcon />
            <span>QUIERO INFORMACIÓN</span>
          </a>
        ) : (
          <span
            className={styles.whatsappDisabled}
            aria-disabled="true"
          >
            <span>PRÓXIMAMENTE</span>
          </span>
        )}
      </div>
    </article>
  );
}

export default function FinalizedProjects({
  limit = 3,
  title = "Proyectos culminados",
  description = "Conoce algunos de los proyectos que ya fueron culminados por ANCOSUR.",
}: FinalizedProjectsProps) {
  const [projects, setProjects] = useState<
    ProyectoWeb[]
  >([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadFinalizedProjects() {
      try {
        setLoading(true);
        setError("");

        const response =
          await ProyectosWebAPI.listar({
            activo: true,
            etapa: "FINALIZADOS",
            page: 1,
            limit: 100,
          });

        if (cancelled) {
          return;
        }

        const finalized =
          Array.isArray(response.data)
            ? response.data
                .filter(
                  (project) =>
                    project.etapa ===
                      "FINALIZADOS" ||
                    project.etapa ===
                      "ENTREGADO" ||
                    project.etapa ===
                      "TODOS VENDIDOS"
                )
                .sort(
                  (a, b) =>
                    Number(a.orden ?? 0) -
                    Number(b.orden ?? 0)
                )
                .slice(
                  0,
                  Math.max(limit, 1)
                )
            : [];

        setProjects(finalized);
      } catch (err) {
        if (cancelled) {
          return;
        }

        setProjects([]);

        setError(
          err instanceof Error
            ? err.message
            : "No fue posible cargar los proyectos culminados."
        );
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadFinalizedProjects();

    return () => {
      cancelled = true;
    };
  }, [limit]);

  return (
    <section
      className={styles.section}
      aria-labelledby="finalized-projects-title"
    >
      <div className={styles.container}>
        <header className={styles.header}>
          <span className={styles.eyebrow}>
            PROYECTOS ANCOSUR
          </span>

          <h2
            id="finalized-projects-title"
            className={styles.title}
          >
            {title}
          </h2>

          <p className={styles.description}>
            {description}
          </p>
        </header>

        {loading && (
          <div className={styles.state}>
            <span
              className={styles.loader}
              aria-hidden="true"
            />
            <span>
              Cargando proyectos culminados...
            </span>
          </div>
        )}

        {!loading && error && (
          <div
            className={styles.state}
            role="alert"
          >
            <strong>
              No pudimos cargar los proyectos culminados.
            </strong>
            <span>{error}</span>
          </div>
        )}

        {!loading &&
          !error &&
          projects.length > 0 && (
            <>
              <div className={styles.grid}>
                {projects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                  />
                ))}
              </div>

              <div className={styles.footer}>
                <Link
                  href="/proyectos-entregados"
                  className={styles.viewAll}
                >
                  <span>
                    VER MÁS PROYECTOS CULMINADOS
                  </span>
                  <ArrowIcon />
                </Link>
              </div>
            </>
          )}

        {!loading &&
          !error &&
          projects.length === 0 && (
            <div className={styles.state}>
              <span>
                No hay proyectos culminados disponibles.
              </span>
            </div>
          )}
      </div>
    </section>
  );
}
