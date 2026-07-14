"use client";

import { ArrowRightIcon } from "@phosphor-icons/react";
import { projects, ProjectStatus } from "@/data/projects";
import { useMemo, useState } from "react";
import ActionButton from "./buttons/ActionButton";
import ProjectCard from "./ProjectCard";
import ProjectFilterTabs from "./ProjectFilterTabs";
import styles from "./ProjectFilter.module.css";

export type ProjectFilterGroup = {
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

  filterGroups?: ProjectFilterGroup[];
  initialFilterId?: string;
  showFilters?: boolean;

  visibleLimit?: number;
  showResultsInfo?: boolean;

  showCta?: boolean;
  ctaHref?: string;
  ctaLabel?: string;
};

const DEFAULT_VISIBLE_LIMIT = 8;

const normalizeText = (value: string) => {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
};

const matchesTextList = (value: string, list?: string[]) => {
  if (!list?.length) return true;

  const normalizedValue = normalizeText(value);

  return list.some((item) => {
    const normalizedItem = normalizeText(item);

    return (
      normalizedValue.includes(normalizedItem) ||
      normalizedItem.includes(normalizedValue)
    );
  });
};

export default function ProjectFilter({
  eyebrow = "Proyectos ANCOSUR",
  title = "Tenemos el proyecto ideal para ti",
  description = "Descubre opciones para vivir, invertir o construir tu futuro.",

  projectNames,
  projectTypes,
  statuses,

  filterGroups,
  initialFilterId,
  showFilters = false,

  visibleLimit = DEFAULT_VISIBLE_LIMIT,
  showResultsInfo = false,

  showCta = true,
  ctaHref = "/proyectos",
  ctaLabel = "Ver más proyectos",
}: ProjectFilterProps) {
  const firstFilterId = filterGroups?.[0]?.id ?? "";
  const [activeFilterId, setActiveFilterId] = useState(
    initialFilterId ?? firstFilterId
  );

  const activeFilter = useMemo(() => {
    if (!showFilters || !filterGroups?.length) return null;

    return (
      filterGroups.find((filterGroup) => filterGroup.id === activeFilterId) ??
      filterGroups[0]
    );
  }, [activeFilterId, filterGroups, showFilters]);

  const selectedProjects = useMemo(() => {
    return projects.filter((project) => {
      const baseMatchesName = matchesTextList(project.name, projectNames);
      const baseMatchesType = matchesTextList(project.type, projectTypes);
      const baseMatchesStatus =
        !statuses?.length || statuses.includes(project.status);

      const matchesBase =
        baseMatchesName && baseMatchesType && baseMatchesStatus;

      if (!matchesBase) return false;

      if (!activeFilter) return true;

      const filterMatchesName = matchesTextList(
        project.name,
        activeFilter.projectNames
      );

      const filterMatchesType = matchesTextList(
        project.type,
        activeFilter.projectTypes
      );

      const filterMatchesStatus =
        !activeFilter.statuses?.length ||
        activeFilter.statuses.includes(project.status);

      return filterMatchesName && filterMatchesType && filterMatchesStatus;
    });
  }, [projectNames, projectTypes, statuses, activeFilter]);

  const visibleProjects = useMemo(() => {
    return selectedProjects.slice(0, visibleLimit);
  }, [selectedProjects, visibleLimit]);

  return (
    <section className={styles.section} id="proyectos">
      <div className={styles.header}>
        <span>{eyebrow}</span>

        <h2>{title}</h2>

        <p>{description}</p>
      </div>

      {showFilters && filterGroups && (
        <ProjectFilterTabs
          options={filterGroups.map((filterGroup) => ({
            id: filterGroup.id,
            label: filterGroup.label,
          }))}
          activeId={activeFilterId}
          onChange={setActiveFilterId}
        />
      )}

      {showResultsInfo && (
        <div className={styles.resultsInfo}>
          Mostrando <strong>{visibleProjects.length}</strong> de{" "}
          <strong>{selectedProjects.length}</strong>{" "}
          {selectedProjects.length === 1
            ? "proyecto encontrado"
            : "proyectos encontrados"}
        </div>
      )}

      <div className={styles.grid}>
        {visibleProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      <div className={styles.loadMoreWrap}>
        <ActionButton
          href={ctaHref}
          icon={ArrowRightIcon}
          size="lg"
          className={styles.loadMoreButton}
          isActive={showCta}
        >
          {ctaLabel}
        </ActionButton>
      </div>
    </section>
  );
}