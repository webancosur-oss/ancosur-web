"use client";

import { useMemo, useState } from "react";
import { ArrowRight } from "@phosphor-icons/react";

import { projects } from "@/data/projects";
import type { ProjectStatus } from "@/data/projects";

import ProjectCard from "./ProjectCard";
import ActionButton from "./buttons/ActionButton";

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

  showFilters?: boolean;

  visibleLimit?: number;

  showResultsInfo?: boolean;

  showCta?: boolean;
  ctaHref?: string;
  ctaLabel?: string;
};

const DEFAULT_VISIBLE_LIMIT = 9;

const defaultFilters: FilterGroup[] = [
  {
    id: "todos",
    label: "Todos",
  },
  {
    id: "pre-venta",
    label: "Pre venta",
    statuses: ["PRE VENTA"],
  },
  {
    id: "lanzamiento",
    label: "Lanzamiento",
    statuses: ["LANZAMIENTO"],
  },
  {
    id: "construccion",
    label: "En construcción",
    statuses: ["EN CONSTRUCCIÓN"],
  },
  {
    id: "entrega",
    label: "Entrega inmediata",
    statuses: ["ENTREGA INMEDIATA"],
  },
  {
    id: "entregados",
    label: "Entregados",
    statuses: ["ENTREGADO"],
  },
];

export default function ProjectFilter({
  eyebrow = "Proyectos ANCOSUR",
  title = "Tenemos el proyecto ideal para ti",
  description =
    "Descubre opciones para vivir, invertir o construir tu futuro.",

  projectNames,
  projectTypes,
  statuses,

  filterGroups = defaultFilters,
  initialFilterId = "todos",

  showFilters = false,

  visibleLimit = DEFAULT_VISIBLE_LIMIT,

  showResultsInfo = false,

  showCta = true,
  ctaHref = "/proyectos",
  ctaLabel = "Ver más proyectos",
}: ProjectFilterProps) {

  const [activeFilter, setActiveFilter] =
    useState(initialFilterId);
      const filteredProjects = useMemo(() => {

    let filtered = [...projects];

    // ===========================
    // FILTROS BASE
    // ===========================

    if (projectNames?.length) {

      filtered = filtered.filter((project) =>
        projectNames.includes(project.name)
      );

    }

    if (projectTypes?.length) {

      filtered = filtered.filter((project) =>
        projectTypes.includes(project.type)
      );

    }

    if (statuses?.length) {

      filtered = filtered.filter((project) =>
        statuses.includes(project.status)
      );

    }

    // ===========================
    // FILTRO ACTIVO (TABS)
    // ===========================

    if (showFilters && activeFilter !== "todos") {

      const currentFilter = filterGroups.find(
        (item) => item.id === activeFilter
      );

      if (currentFilter) {

        filtered = filtered.filter((project) => {

          const matchesName =
            !currentFilter.projectNames?.length ||
            currentFilter.projectNames.includes(project.name);

          const matchesType =
            !currentFilter.projectTypes?.length ||
            currentFilter.projectTypes.includes(project.type);

          const matchesStatus =
            !currentFilter.statuses?.length ||
            currentFilter.statuses.includes(project.status);

          return (
            matchesName &&
            matchesType &&
            matchesStatus
          );

        });

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

  const visibleProjects = useMemo(() => {

    if (!visibleLimit) {
      return filteredProjects;
    }

    return filteredProjects.slice(0, visibleLimit);

  }, [filteredProjects, visibleLimit]);

  return (

    <section
      className={styles.projectsSection}
      id="proyectos"
    >

      <div className={styles.heading}>

        <span className={styles.subtitle}>
          {eyebrow}
        </span>

        <h2>
          {title}
        </h2>

        <p>
          {description}
        </p>

      </div>
            {/* ===========================
          FILTROS
      =========================== */}

      {showFilters && filterGroups.length > 0 && (

        <div className={styles.filters}>

          {filterGroups.map((filter) => (

            <button
              key={filter.id}
              type="button"
              onClick={() => setActiveFilter(filter.id)}
              className={`${styles.filterButton} ${
                activeFilter === filter.id ? styles.active : ""
              }`}
            >
              {filter.label}
            </button>

          ))}

        </div>

      )}

      {/* ===========================
          RESULTADOS
      =========================== */}

    {showResultsInfo && (

      <div className={styles.topBar}>

        <div className={styles.results}>

          Mostrando{" "}
          <strong>{visibleProjects.length}</strong> de{" "}
          <strong>{filteredProjects.length}</strong>{" "}
          {filteredProjects.length === 1
            ? "proyecto encontrado"
            : "proyectos encontrados"}

        </div>

      </div>

    )}

      {/* ===========================
          GRID
      =========================== */}

      <div className={styles.grid}>

        {visibleProjects.map((project) => (

          <ProjectCard
            key={project.id}
            project={project}
          />

        ))}

      </div>
            {/* ===========================
          BOTÓN VER MÁS
      =========================== */}

      {showCta &&
        visibleLimit &&
        filteredProjects.length > visibleLimit && (

          <div className={styles.buttonWrapper}>

            <ActionButton
              href={ctaHref}
              variant="primary"
              size="lg"
              icon={ArrowRight}
              iconPosition="right"
            >
              {ctaLabel}
            </ActionButton>

          </div>

      )}

      {/* ===========================
          SIN RESULTADOS
      =========================== */}

      {filteredProjects.length === 0 && (

        <div className={styles.emptyState}>

          <h3>No se encontraron proyectos</h3>

          <p>
            Intenta cambiar los filtros para visualizar otros proyectos.
          </p>

        </div>

      )}

    </section>

  );

}