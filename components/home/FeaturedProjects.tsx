"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import {
  getProjectAssetUrl,
  getProjectHref,
  ProyectosWebAPI,
} from "@/data/proyectoWeb";

import type { ProyectoWeb } from "@/src/types/proyectoWeb";

import styles from "./FeaturedProjects.module.css";

type FeaturedProjectsProps = {
  limit?: number;
  title?: string;
  description?: string;
};

function toNumber(
  value: number | string | null | undefined
): number | null {
  if (value === null || value === undefined || value === "") {
    return null;
  }

  const parsed = Number(value);

  return Number.isFinite(parsed) ? parsed : null;
}

function formatNumber(
  value: number | string | null | undefined
): string {
  const number = toNumber(value);

  if (number === null) {
    return "";
  }

  return new Intl.NumberFormat("es-PE", {
    maximumFractionDigits: 2,
  }).format(number);
}

function formatPrice(
  value: number | string | null | undefined
): string {
  const number = toNumber(value);

  if (number === null) {
    return "";
  }

  return new Intl.NumberFormat("es-PE", {
    style: "currency",
    currency: "PEN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(number);
}

function getArea(project: ProyectoWeb): string {
  const desde = toNumber(project.metraje_desde);
  const hasta = toNumber(project.metraje_hasta);

  if (desde !== null && hasta !== null) {
    return `${formatNumber(desde)} – ${formatNumber(hasta)} m²`;
  }

  if (desde !== null) {
    return `Desde ${formatNumber(desde)} m²`;
  }

  if (hasta !== null) {
    return `Hasta ${formatNumber(hasta)} m²`;
  }

  return "";
}

function getShowroomHref(project: ProyectoWeb): string | null {
  const showroomUrl = (
    project as ProyectoWeb & {
      showroom_url?: string | null;
    }
  ).showroom_url;

  const value = typeof showroomUrl === "string"
    ? showroomUrl.trim()
    : "";

  if (!value) {
    return null;
  }

  if (!/^https?:\/\//i.test(value)) {
    return null;
  }

  return value;
}

function normalizeProjects(
  data: ProyectoWeb[] | undefined
): ProyectoWeb[] {
  if (!Array.isArray(data)) {
    return [];
  }

  return data
    .filter((project) => project && project.activo === true)
    .sort(
      (a, b) =>
        Number(a.orden || 0) - Number(b.orden || 0)
    )
    .slice(0, 9);
}

/* Icono lineal de dormitorios. SVG propio, sin emojis ni librerías externas. */
function BedIcon() {
  return (
    <svg
      className={styles.detailIcon}
      viewBox="0 0 24 24"
      width="19"
      height="19"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3.5 18.5V9.5" />
      <path d="M3.5 13h17" />
      <path d="M20.5 18.5V11.5a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v2.5" />
      <path d="M6 13V10.8a1.8 1.8 0 0 1 1.8-1.8H11a2 2 0 0 1 2 2v2" />
      <path d="M2.5 18.5h19" />
    </svg>
  );
}

/* Icono lineal para área/metraje. */
function AreaIcon() {
  return (
    <svg
      className={styles.detailIcon}
      viewBox="0 0 24 24"
      width="19"
      height="19"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 9V4h5" />
      <path d="M4 4l6 6" />
      <path d="M20 15v5h-5" />
      <path d="M20 20l-6-6" />
      <path d="M15 4h5v5" />
      <path d="M20 4l-6 6" />
      <path d="M9 20H4v-5" />
      <path d="M4 20l6-6" />
    </svg>
  );
}

/* Flecha fina y limpia para los CTA. */
function ArrowIcon() {
  return (
    <svg
      className={styles.actionArrow}
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

export default function FeaturedProjects({
  limit = 9,
  title = "Tenemos el proyecto ideal para ti",
  description = "Descubre opciones para vivir, invertir o construir tu futuro.",
}: FeaturedProjectsProps) {
  const [projects, setProjects] = useState<ProyectoWeb[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const visibleLimit = Math.min(Math.max(limit, 1), 9);

  useEffect(() => {
    let cancelled = false;

    async function loadProjects() {
      try {
        setLoading(true);
        setError("");

        const response = await ProyectosWebAPI.listarActivos({
          limit: 100,
          page: 1,
        });

        if (cancelled) {
          return;
        }

        const items = normalizeProjects(response.data).slice(
          0,
          visibleLimit
        );

        setProjects(items);
      } catch (err) {
        if (cancelled) {
          return;
        }

        setProjects([]);

        setError(
          err instanceof Error
            ? err.message
            : "No fue posible cargar los proyectos."
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
  }, [visibleLimit]);

  return (
    <section
      id="proyectos-destacados"
      className={styles.section}
      aria-labelledby="featured-projects-title"
    >
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <span className={styles.eyebrow}>PROYECTOS ANCOSUR</span>

            <h2
              id="featured-projects-title"
              className={styles.title}
            >
              {title}
            </h2>

            <p className={styles.description}>
              {description}
            </p>
          </div>
        </div>

        {loading && (
          <div className={styles.state} aria-live="polite">
            <span
              className={styles.loader}
              aria-hidden="true"
            />
            <span>Cargando proyectos...</span>
          </div>
        )}

        {!loading && error && (
          <div className={styles.state} role="alert">
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
                No hay proyectos disponibles en este
                momento.
              </span>
            </div>
          )}

        {!loading &&
          !error &&
          projects.length > 0 && (
            <>
              <div className={styles.grid}>
                {projects.map((project) => {
                  const imageUrl = getProjectAssetUrl(
                    project.imagen_url
                  );

                  const logoUrl = getProjectAssetUrl(
                    project.logo_url
                  );

                  const projectHref =
                    getProjectHref(project);

                  const showroomHref =
                    getShowroomHref(project);

                  const area = getArea(project);

                  const price = formatPrice(
                    project.precio_desde
                  );

                  return (
                    <article
                      key={project.id}
                      className={styles.card}
                    >
                      <div
                        className={
                          styles.imageWrapper
                        }
                      >
                        {imageUrl ? (
                          <img
                            src={imageUrl}
                            alt={
                              project.titulo ||
                              "Proyecto ANCOSUR"
                            }
                            className={styles.image}
                            loading="lazy"
                            decoding="async"
                          />
                        ) : (
                          <div
                            className={
                              styles.imagePlaceholder
                            }
                          >
                            ANCOSUR
                          </div>
                        )}

                        <div
                          className={
                            styles.imageOverlay
                          }
                        />

                        {project.etapa && (
                          <span
                            className={
                              styles.stage
                            }
                          >
                            {project.etapa}
                          </span>
                        )}
                      </div>

                      <div
                        className={
                          styles.cardContent
                        }
                      >
                        {logoUrl &&
                          (project.logo_tamano ??
                            0) > 0 && (
                            <div
                              className={
                                styles.logoWrapper
                              }
                            >
                              <img
                                src={logoUrl}
                                alt=""
                                className={
                                  styles.logo
                                }
                                loading="lazy"
                                decoding="async"
                              />
                            </div>
                          )}

                        {project.tipo && (
                          <span
                            className={styles.type}
                          >
                            {project.tipo}
                          </span>
                        )}

                        <h3
                          className={
                            styles.projectTitle
                          }
                        >
                          {project.titulo}
                        </h3>

                        {(project.ciudad ||
                          project.direccion) && (
                          <div
                            className={
                              styles.location
                            }
                          >
                            {project.ciudad && (
                              <span>
                                {project.ciudad}
                              </span>
                            )}

                            {project.ciudad &&
                              project.direccion && (
                                <span
                                  className={
                                    styles.separator
                                  }
                                >
                                  ·
                                </span>
                              )}

                            {project.direccion && (
                              <span>
                                {project.direccion}
                              </span>
                            )}
                          </div>
                        )}

                        {(project.dormitorios ||
                          area) && (
                          <div
                            className={
                              styles.details
                            }
                          >
                            {project.dormitorios && (
                              <span
                                className={
                                  styles.detail
                                }
                              >
                                <BedIcon />

                                <span>
                                  {
                                    project.dormitorios
                                  }{" "}
                                  Dorm.
                                </span>
                              </span>
                            )}

                            {area && (
                              <span
                                className={
                                  styles.detail
                                }
                              >
                                <AreaIcon />

                                <span>{area}</span>
                              </span>
                            )}
                          </div>
                        )}

                        {price && (
                          <div
                            className={
                              styles.price
                            }
                          >
                            <span>Desde</span>
                            <strong>{price}</strong>
                          </div>
                        )}

                        <div
                          className={
                            styles.actions
                          }
                        >
                          {projectHref ? (
                            <Link
                              href={projectHref}
                              className={
                                styles.actionPrimary
                              }
                            >
                              <span>VER MÁS</span>
                              <ArrowIcon />
                            </Link>
                          ) : project.whatsapp ? (
                            <a
                              href={`https://wa.me/${project.whatsapp.replace(
                                /\D/g,
                                ""
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={
                                styles.actionPrimary
                              }
                            >
                              <span>
                                SABER MÁS
                              </span>
                              <ArrowIcon />
                            </a>
                          ) : (
                            <span
                              className={
                                styles.actionDisabled
                              }
                            >
                              INFORMACIÓN
                            </span>
                          )}

                          {showroomHref ? (
                            <a
                              href={showroomHref}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={styles.actionSecondary}
                              aria-label={`Ver showroom de ${project.titulo}`}
                            >
                              <span>VER SHOWROOM</span>
                              <ArrowIcon />
                            </a>
                          ) : (
                            <span
                              className={styles.actionDisabled}
                              aria-disabled="true"
                            >
                              <span>PRÓXIMAMENTE</span>
                            </span>
                          )}
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>

              {projects.length >= 9 && (
                <div className={styles.footer}>
                  <Link
                    href="/proyectos"
                    className={styles.viewAll}
                  >
                    <span>VER TODOS LOS PROYECTOS</span>
                    <ArrowIcon />
                  </Link>
                </div>
              )}
            </>
          )}
      </div>
    </section>
  );
}
