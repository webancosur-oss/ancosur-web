"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  ArrowRight,
} from "@phosphor-icons/react";

import {
  projects,
} from "@/data/projects";
import type {
  ProjectStatus,
} from "@/data/projects";

import ActionButton from "./buttons/ActionButton";
import ProjectCard from "./ProjectCard";

import styles from "./ProjectFilter.module.css";

export type FilterGroup = {
  id: string;
  label: string;
  projectNames?: string[];
  projectTypes?: string[];
  statuses?: ProjectStatus[];
};

type ProjectFilterProps = {
  eyebrow?: string;
  title?: string;
  description?: string;

  projectNames?: string[];
  projectTypes?: string[];
  statuses?: ProjectStatus[];

  filterGroups?: FilterGroup[];
  initialFilterId?: string;

  showHeader?: boolean;
  showFilters?: boolean;
  showResultsInfo?: boolean;
  showCta?: boolean;

  visibleLimit?: number;

  ctaHref?: string;
  ctaLabel?: string;
};

const DEFAULT_VISIBLE_LIMIT = 9;

const defaultFilters: FilterGroup[] = [
  {
    id: "pre-venta",
    label: "Preventa",
    statuses: [
      "PRE VENTA",
    ],
  },
  {
    id: "lanzamiento",
    label: "Lanzamiento",
    statuses: [
      "LANZAMIENTO",
    ],
  },
  {
    id: "construccion",
    label: "En construcción",
    statuses: [
      "EN CONSTRUCCIÓN",
    ],
  },
  {
    id: "entrega",
    label: "Entrega inmediata",
    statuses: [
      "ENTREGA INMEDIATA",
    ],
  },
  {
    id: "entregados",
    label: "Entregados",
    statuses: [
      "ENTREGADO",
    ],
  },
];

export default function ProjectFilter({
  eyebrow =
    "Proyectos ANCOSUR",

  title =
    "Tenemos el proyecto ideal para ti",

  description =
    "Descubre opciones para vivir, invertir o construir tu futuro.",

  projectNames,
  projectTypes,
  statuses,

  filterGroups =
    defaultFilters,

  initialFilterId,

  showHeader = true,
  showFilters = false,
  showResultsInfo = false,
  showCta = true,

  visibleLimit =
    DEFAULT_VISIBLE_LIMIT,

  ctaHref = "/proyectos",
  ctaLabel =
    "Ver más proyectos",
}: ProjectFilterProps) {
  /*
   * Si no se envía initialFilterId,
   * se selecciona automáticamente
   * el primer filtro disponible.
   */
  const resolvedInitialFilterId =
    initialFilterId ??
    filterGroups[0]?.id ??
    "";

  const [
    activeFilter,
    setActiveFilter,
  ] = useState(
    resolvedInitialFilterId,
  );

  /*
   * Sincroniza el estado cuando cambian
   * los filtros o initialFilterId.
   */
  useEffect(() => {
    const filterExists =
      filterGroups.some(
        (filter) =>
          filter.id ===
          resolvedInitialFilterId,
      );

    if (filterExists) {
      setActiveFilter(
        resolvedInitialFilterId,
      );

      return;
    }

    setActiveFilter(
      filterGroups[0]?.id ??
        "",
    );
  }, [
    filterGroups,
    resolvedInitialFilterId,
  ]);

  const filteredProjects =
    useMemo(() => {
      let filtered = [
        ...projects,
      ];

      /* ===========================
         FILTROS BASE
      =========================== */

      if (projectNames?.length) {
        filtered =
          filtered.filter(
            (project) =>
              projectNames.includes(
                project.name,
              ),
          );
      }

      if (projectTypes?.length) {
        filtered =
          filtered.filter(
            (project) =>
              projectTypes.includes(
                project.type,
              ),
          );
      }

      if (statuses?.length) {
        filtered =
          filtered.filter(
            (project) =>
              statuses.includes(
                project.status,
              ),
          );
      }

      /* ===========================
         FILTRO ACTIVO
      =========================== */

      if (
        showFilters &&
        activeFilter
      ) {
        const currentFilter =
          filterGroups.find(
            (item) =>
              item.id ===
              activeFilter,
          );

        if (currentFilter) {
          filtered =
            filtered.filter(
              (project) => {
                const matchesName =
                  !currentFilter
                    .projectNames
                    ?.length ||
                  currentFilter.projectNames.includes(
                    project.name,
                  );

                const matchesType =
                  !currentFilter
                    .projectTypes
                    ?.length ||
                  currentFilter.projectTypes.includes(
                    project.type,
                  );

                const matchesStatus =
                  !currentFilter
                    .statuses
                    ?.length ||
                  currentFilter.statuses.includes(
                    project.status,
                  );

                return (
                  matchesName &&
                  matchesType &&
                  matchesStatus
                );
              },
            );
        }
      }

      return filtered;
    }, [
      activeFilter,
      filterGroups,
      projectNames,
      projectTypes,
      statuses,
      showFilters,
    ]);

  const visibleProjects =
    useMemo(() => {
      if (
        visibleLimit ===
          undefined ||
        visibleLimit <= 0
      ) {
        return filteredProjects;
      }

      return filteredProjects.slice(
        0,
        visibleLimit,
      );
    }, [
      filteredProjects,
      visibleLimit,
    ]);

  const shouldShowCta =
    showCta &&
    visibleLimit !==
      undefined &&
    visibleLimit > 0 &&
    filteredProjects.length >
      visibleLimit;

  return (
    <section
      className={
        styles.projectsSection
      }
      id="proyectos"
    >
      {/* ===========================
          CABECERA
      =========================== */}

      {showHeader && (
        <div
          className={
            styles.heading
          }
        >
          {eyebrow && (
            <span
              className={
                styles.subtitle
              }
            >
              {eyebrow}
            </span>
          )}

          {title && (
            <h2>
              {title}
            </h2>
          )}

          {description && (
            <p>
              {description}
            </p>
          )}
        </div>
      )}

      {/* ===========================
          FILTROS
      =========================== */}

      {showFilters &&
        filterGroups.length >
          0 && (
          <div
            className={
              styles.filters
            }
            role="tablist"
            aria-label="Filtrar proyectos"
          >
            {filterGroups.map(
              (filter) => {
                const isActive =
                  activeFilter ===
                  filter.id;

                return (
                  <button
                    key={
                      filter.id
                    }
                    type="button"
                    role="tab"
                    aria-selected={
                      isActive
                    }
                    onClick={() =>
                      setActiveFilter(
                        filter.id,
                      )
                    }
                    className={`${styles.filterButton} ${
                      isActive
                        ? styles.active
                        : ""
                    }`}
                  >
                    {filter.label}
                  </button>
                );
              },
            )}
          </div>
        )}

      {/* ===========================
          RESULTADOS
      =========================== */}

      {showResultsInfo && (
        <div
          className={
            styles.topBar
          }
        >
          <div
            className={
              styles.results
            }
            aria-live="polite"
          >
            Mostrando{" "}
            <strong>
              {
                visibleProjects.length
              }
            </strong>{" "}
            de{" "}
            <strong>
              {
                filteredProjects.length
              }
            </strong>{" "}
            {filteredProjects.length ===
            1
              ? "proyecto encontrado"
              : "proyectos encontrados"}
          </div>
        </div>
      )}

      {/* ===========================
          GRID
      =========================== */}

      {filteredProjects.length >
      0 ? (
        <div
          className={styles.grid}
        >
          {visibleProjects.map(
            (project) => (
              <ProjectCard
                key={
                  project.id
                }
                project={
                  project
                }
              />
            ),
          )}
        </div>
      ) : (
        <div
          className={
            styles.emptyState
          }
        >
          <h3>
            No se encontraron
            proyectos
          </h3>

          <p>
            Intenta cambiar los
            filtros para visualizar
            otros proyectos.
          </p>
        </div>
      )}

      {/* ===========================
          BOTÓN VER MÁS
      =========================== */}

      {shouldShowCta && (
        <div
          className={
            styles.buttonWrapper
          }
        >
          <ActionButton
            href={ctaHref}
            variant="primary"
            size="lg"
            icon={
              ArrowRight
            }
            iconPosition="right"
          >
            {ctaLabel}
          </ActionButton>
        </div>
      )}
    </section>
  );
}