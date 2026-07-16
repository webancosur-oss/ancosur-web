import Link from "next/link";

import { transparencyProjects } from "../data";
import styles from "./ProjectSelector.module.css";

type ProjectSelectorProps = {
  activeSlug: string;
};

export default function ProjectSelector({
  activeSlug,
}: ProjectSelectorProps) {
  return (
    <aside
      className={styles.selector}
      aria-label="Seleccionar proyecto"
    >
      <span className={styles.selectorTitle}>
        Selecciona un proyecto
      </span>

      <nav className={styles.projectList}>
        {transparencyProjects.map((project) => {
          const isActive =
            project.slug === activeSlug;

          return (
            <Link
              key={project.slug}
              href={`/portal-de-transparencia/${project.slug}`}
              className={
                isActive
                  ? styles.activeProject
                  : styles.projectLink
              }
              aria-current={
                isActive ? "page" : undefined
              }
            >
              {project.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}