// app/proyectos-entregados/page.tsx
"use client";

import { useEffect, useMemo, useState } from "react";

import {
  getProjectAssetUrl,
  ProyectosWebAPI,
} from "@/data/proyectosWeb";

import type { ProyectoWeb } from "@/src/types/proyectoWeb";

import styles from "./page.module.css";

function WhatsAppIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20.5 11.5a8.5 8.5 0 0 1-12.7 7.4L3.5 20l1.1-4.1A8.5 8.5 0 1 1 20.5 11.5Z" />
      <path d="M8.5 8.5c.2-.4.4-.4.7-.4h.5c.2 0 .4.1.5.4l.7 1.6c.1.2.1.4-.1.6l-.5.6c-.1.1-.1.3 0 .5.5.9 1.3 1.7 2.2 2.2.2.1.4.1.5 0l.6-.5c.2-.2.4-.2.6-.1l1.6.7c.3.1.4.3.4.5v.5c0 .3 0 .5-.4.7-.4.2-1 .3-1.5.2-1.2-.2-2.6-.9-3.8-2.1-1.2-1.2-1.9-2.6-2.1-3.8-.1-.5 0-1.1.2-1.5Z" />
    </svg>
  );
}

function FinalizedCard({
  project,
}: {
  project: ProyectoWeb;
}) {
  const imageUrl = getProjectAssetUrl(
    project.imagen_url
  );

  const whatsapp =
    project.whatsapp
      ?.replace(/\D/g, "")
      .trim() || "";

  const whatsappHref = whatsapp
    ? `https://wa.me/${whatsapp}?text=${encodeURIComponent(
        `Hola, vi el proyecto ${project.titulo} en la web de ANCOSUR y quisiera conocer más sobre este proyecto y recibir información.`
      )}`
    : "";

  return (
    <article className={styles.card}>
      <div className={styles.imageWrapper}>
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={project.titulo || "Proyecto ANCOSUR"}
            className={styles.image}
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className={styles.imagePlaceholder}>
            ANCOSUR
          </div>
        )}

        <div
          className={styles.imageOverlay}
          aria-hidden="true"
        />

        <span className={styles.badge}>
          PROYECTO CULMINADO
        </span>
      </div>

      <div className={styles.cardContent}>
        <h2 className={styles.projectTitle}>
          {project.titulo}
        </h2>

        <p className={styles.projectMessage}>
          Conoce la experiencia de ANCOSUR y descubre
          este proyecto que ya fue culminado.
        </p>

        {whatsappHref ? (
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.whatsapp}
            aria-label={`Solicitar información sobre ${project.titulo} por WhatsApp`}
          >
            <WhatsAppIcon />
            <span>QUIERO INFORMACIÓN</span>
          </a>
        ) : (
          <span
            className={styles.whatsappDisabled}
            aria-disabled="true"
          >
            PRÓXIMAMENTE
          </span>
        )}
      </div>
    </article>
  );
}

export default function ProyectosEntregadosPage() {
  const [projects, setProjects] = useState<
    ProyectoWeb[]
  >([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadProjects() {
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
          response.data
            .filter(
              (project) =>
                project.etapa ===
                "FINALIZADOS"
            )
            .sort(
              (a, b) =>
                Number(a.orden ?? 0) -
                Number(b.orden ?? 0)
            );

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

    loadProjects();

    return () => {
      cancelled = true;
    };
  }, []);

  const total = useMemo(
    () => projects.length,
    [projects]
  );

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroContainer}>
          <span className={styles.eyebrow}>
            PROYECTOS ANCOSUR
          </span>

          <h1 className={styles.title}>
            Proyectos culminados
          </h1>

          <p className={styles.description}>
            Conoce los proyectos que ya fueron
            finalizados y forman parte de la
            experiencia de ANCOSUR.
          </p>
        </div>
      </section>

      <section className={styles.catalog}>
        <div className={styles.catalogContainer}>
          <div className={styles.catalogHeader}>

            {!loading && !error && (
              <span className={styles.count}>
                {total}{" "}
                {total === 1
                  ? "proyecto"
                  : "proyectos"}
              </span>
            )}
          </div>

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
                No pudimos cargar los proyectos.
              </strong>
              <span>{error}</span>
            </div>
          )}

          {!loading &&
            !error &&
            projects.length === 0 && (
              <div className={styles.state}>
                <span>
                  No hay proyectos finalizados
                  disponibles.
                </span>
              </div>
            )}

          {!loading &&
            !error &&
            projects.length > 0 && (
              <div className={styles.grid}>
                {projects.map((project) => (
                  <FinalizedCard
                    key={project.id}
                    project={project}
                  />
                ))}
              </div>
            )}
        </div>
      </section>
    </main>
  );
}
