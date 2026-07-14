"use client";

import ActionButton from "./buttons/ActionButton";
import styles from "./ProjectFilter.module.css";

export type ProjectFilterOption = {
  id: string;
  label: string;
};

type ProjectFilterTabsProps = {
  options: ProjectFilterOption[];
  activeId: string;
  onChange: (id: string) => void;
  ariaLabel?: string;
};

export default function ProjectFilterTabs({
  options,
  activeId,
  onChange,
  ariaLabel = "Filtros de proyectos",
}: ProjectFilterTabsProps) {
  if (!options.length) return null;

  return (
    <div className={styles.filters} aria-label={ariaLabel}>
      {options.map((option) => (
        <ActionButton
          key={option.id}
          type="button"
          variant="unstyled"
          className={`${styles.filterButton} ${
            activeId === option.id ? styles.active : ""
          }`}
          ariaLabel={`Filtrar por ${option.label}`}
          onClick={() => onChange(option.id)}
        >
          {option.label}
        </ActionButton>
      ))}
    </div>
  );
}