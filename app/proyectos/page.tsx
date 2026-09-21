// app/proyectos/page.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

import {
  getProjectAssetUrl,
  getProjectHref,
  ProyectosWebAPI,
} from "@/data/proyectoWeb";

import type { ProyectoWeb } from "@/src/types/proyectoWeb";



import styles from "./page.module.css";
import FilterTabs, { FilterOption } from "@/components/ui/FilterTabs/FilterTabs";
import FinalizedProjects from "@/components/home/FinalizedProjects";

type Filter =
  | "pre_venta"
  | "en_construccion"
  | "entrega_inmediata";

const FILTERS: readonly FilterOption<Filter>[] = [
  {
    value: "pre_venta",
    label: "Preventa",
  },
  {
    value: "en_construccion",
    label: "En construcción",
  },
  {
    value: "entrega_inmediata",
    label: "Entrega inmediata",
  },
];

function isDeliveredProject(project: ProyectoWeb): boolean {
  return (
    project.etapa === "ENTREGADO" ||
    project.etapa === "FINALIZADOS"
  );
}

function matchesFilter(
  project: ProyectoWeb,
  filter: Filter
): boolean {
  switch (filter) {
    case "pre_venta":
      return project.etapa === "PRE VENTA";

    case "en_construccion":
      return project.etapa === "EN CONSTRUCCIÓN";

    case "entrega_inmediata":
      return project.etapa === "ENTREGA INMEDIATA";

    default:
      return false;
  }
}

function toNumber(
  value: number | string | null | undefined
): number | null {
  if (
    value === null ||
    value === undefined ||
    value === ""
  ) {
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

function getShowroomHref(
  project: ProyectoWeb
): string | null {
  const showroomUrl = (
    project as ProyectoWeb & {
      showroom_url?: string | null;
    }
  ).showroom_url;

  const value =
    typeof showroomUrl === "string"
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

function BedIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
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

function AreaIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
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

function ProjectCard({
  project,
}: {
  project: ProyectoWeb;
}) {
  const imageUrl = getProjectAssetUrl(
    project.imagen_url
  );

  const logoUrl = getProjectAssetUrl(
    project.logo_url
  );

  const projectHref = getProjectHref(project);
  const showroomHref = getShowroomHref(project);

  const area = getArea(project);
  const price = formatPrice(
    project.precio_desde
  );

  const whatsapp =
    project.whatsapp
      ?.replace(/\D/g, "")
      .trim() || "";

  const delivered = isDeliveredProject(project);

  return (
    <article className={styles.card}>
      <div className={styles.imageWrapper}>
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
          <div className={styles.imagePlaceholder}>
            ANCOSUR
          </div>
        )}

        <div
          className={styles.imageOverlay}
          aria-hidden="true"
        />

        <span
          className={`${styles.stage} ${
            delivered
              ? styles.stageDelivered
              : ""
          }`}
        >
          {delivered
            ? "ENTREGADO"
            : project.etapa}
        </span>
      </div>

      <div className={styles.cardContent}>
        {logoUrl &&
          (project.logo_tamano ?? 0) > 0 && (
            <div className={styles.logoWrapper}>
              <img
                src={logoUrl}
                alt=""
                className={styles.logo}
                loading="lazy"
                decoding="async"
              />
            </div>
          )}

        <span className={styles.type}>
          {project.tipo}
        </span>

        <h2 className={styles.projectTitle}>
          {project.titulo}
        </h2>

        {(project.ciudad ||
          project.direccion) && (
          <div className={styles.location}>
            {project.ciudad && (
              <span>{project.ciudad}</span>
            )}

            {project.ciudad &&
              project.direccion && (
                <span
                  className={styles.separator}
                  aria-hidden="true"
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

        {(project.dormitorios || area) && (
          <div className={styles.details}>
            {project.dormitorios && (
              <span className={styles.detail}>
                <BedIcon />
                <span>
                  {project.dormitorios} Dorm.
                </span>
              </span>
            )}

            {area && (
              <span className={styles.detail}>
                <AreaIcon />
                <span>{area}</span>
              </span>
            )}
          </div>
        )}

        {price && !delivered && (
          <div className={styles.price}>
            <span>Desde</span>
            <strong>{price}</strong>
          </div>
        )}

        {delivered ? (
          <div className={styles.deliveredLabel}>
            <span>Proyecto entregado</span>
          </div>
        ) : (
          <div className={styles.actions}>
            {projectHref ? (
              <Link
                href={projectHref}
                className={styles.actionPrimary}
              >
                <span>VER MÁS</span>
                <ArrowIcon />
              </Link>
            ) : whatsapp ? (
              <a
                href={`https://wa.me/${whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.actionPrimary}
              >
                <span>SABER MÁS</span>
                <ArrowIcon />
              </a>
            ) : (
              <span
                className={styles.actionDisabled}
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
        )}
      </div>
    </article>
  );
}

export default function ProyectosPage() {
  const [projects, setProjects] = useState<
    ProyectoWeb[]
  >([]);

  const [filter, setFilter] =
    useState<Filter>("pre_venta");

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
            limit: 100,
            page: 1,
          });

        if (cancelled) {
          return;
        }

        const ordered = [
          ...response.data,
        ].sort(
          (a, b) =>
            Number(a.orden ?? 0) -
            Number(b.orden ?? 0)
        );

        setProjects(ordered);
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
  }, []);

  const filteredProjects = useMemo(
    () =>
      projects.filter((project) =>
        matchesFilter(project, filter)
      ),
    [projects, filter]
  );

  return (
    <main className={styles.page}>
      <section className={styles.catalog}>
        <div className={styles.catalogContainer}>
          <header className={styles.catalogHeader}>
            <span className={styles.sectionEyebrow}>
              PROYECTOS ANCOSUR
            </span>

            <h1 className={styles.sectionTitle}>
              Encuentra el proyecto ideal para ti
            </h1>

            <p className={styles.catalogDescription}>
              Filtra nuestros proyectos según su etapa comercial y elige la mejor opción para vivir, invertir o construir.
            </p>
          </header>

          {!loading &&
            !error &&
            projects.length > 0 && (
              <div className={styles.filters}>
                <FilterTabs
                  options={FILTERS}
                  value={filter}
                  onChange={setFilter}
                  ariaLabel="Filtrar proyectos por etapa"
                />
              </div>
            )}

          {loading && (
            <div className={styles.state}>
              <span
                className={styles.loader}
                aria-hidden="true"
              />
              <span>
                Cargando proyectos...
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
            filteredProjects.length === 0 && (
              <div className={styles.empty}>
                <span
                  className={styles.emptyLine}
                  aria-hidden="true"
                />

                <h3>
                  No hay proyectos para mostrar.
                </h3>

                <p>
                  Prueba con otro filtro para
                  continuar explorando nuestros
                  proyectos.
                </p>
              </div>
            )}

          {!loading &&
            !error &&
            filteredProjects.length > 0 && (
              <div className={styles.grid}>
                {filteredProjects.map(
                  (project) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                    />
                  )
                )}
              </div>
            )}
        </div>
      </section>

      <FinalizedProjects
        limit={3}
      />
    </main>
  );
}
