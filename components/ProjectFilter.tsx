"use client";

import {
  ArrowRightIcon,
  BuildingsIcon,
  MapPinIcon,
} from "@phosphor-icons/react";
import { projects, ProjectStatus } from "@/data/projects";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import styles from "./ProjectFilter.module.css";

type FilterStatus = "TODOS" | ProjectStatus;

const filters: FilterStatus[] = [
  "TODOS",
  "LANZAMIENTO",
  "PRE VENTA",
  "EN CONSTRUCCIÓN",
  "ENTREGA INMEDIATA",
  "VENDIDOS",
  "ENTREGADO",
];

const INITIAL_VISIBLE_COUNT = 12;
const LOAD_MORE_COUNT = 6;

export default function ProjectFilter() {
  const [activeFilter, setActiveFilter] = useState<FilterStatus>("TODOS");
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT);

  const filteredProjects = useMemo(() => {
    if (activeFilter === "TODOS") return projects;

    return projects.filter((project) => project.status === activeFilter);
  }, [activeFilter]);

  const visibleProjects = useMemo(() => {
    return filteredProjects.slice(0, visibleCount);
  }, [filteredProjects, visibleCount]);

  const hasMoreProjects = visibleCount < filteredProjects.length;

  useEffect(() => {
    setVisibleCount(INITIAL_VISIBLE_COUNT);
  }, [activeFilter]);

  const handleLoadMore = () => {
    setVisibleCount((currentCount) =>
      Math.min(currentCount + LOAD_MORE_COUNT, filteredProjects.length)
    );
  };

  return (
    <section className={styles.section} id="proyectos">
      <div className={styles.header}>
        <span>Proyectos ANCOSUR</span>

        <h2>Encuentra el proyecto ideal para ti</h2>

        <p>
          Explora nuestros proyectos inmobiliarios y descubre opciones para
          vivir, invertir o construir tu futuro.
        </p>
      </div>

      <div className={styles.filters} aria-label="Filtros de proyectos">
        {filters.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => setActiveFilter(filter)}
            className={`${styles.filterButton} ${
              activeFilter === filter ? styles.active : ""
            }`}
          >
            {filter === "TODOS" ? "Todos" : filter}
          </button>
        ))}
      </div>

      <div className={styles.resultsInfo}>
        Mostrando <strong>{visibleProjects.length}</strong> de{" "}
        <strong>{filteredProjects.length}</strong>{" "}
        {filteredProjects.length === 1
          ? "proyecto encontrado"
          : "proyectos encontrados"}
      </div>

      <div className={styles.grid}>
        {visibleProjects.map((project) => {
          const hasLocation = Boolean(project.location);
          const hasHref = Boolean(project.href);

          return (
            <article key={project.id} className={styles.card}>
              <div className={styles.imageBox}>
                <Image
                  src={project.image}
                  alt={project.name}
                  width={900}
                  height={680}
                  className={styles.image}
                  sizes="(max-width: 640px) 42vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>

              <div className={styles.overlay} />

              <span className={styles.statusBadge}>{project.status}</span>

              <div className={styles.cardContent}>
                <div className={styles.mainInfo}>
                  <span className={styles.type}>{project.type}</span>
                  <h3>{project.name}</h3>
                </div>

                <div className={styles.details}>
                  <div className={styles.metaGrid}>
                    {hasLocation && (
                      <div className={styles.metaItem}>
                        <MapPinIcon
                          size={18}
                          weight="bold"
                          aria-hidden="true"
                        />
                        <div>
                          <span>Ubicación</span>
                          <strong>{project.location}</strong>
                        </div>
                      </div>
                    )}

                    <div className={styles.metaItem}>
                      <BuildingsIcon
                        size={18}
                        weight="bold"
                        aria-hidden="true"
                      />
                      <div>
                        <span>Tipo</span>
                        <strong>{project.type}</strong>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`${styles.footer} ${
                      !hasHref ? styles.footerNoLink : ""
                    }`}
                  >
                    <div className={styles.footerText}>
                      <span>Estado</span>
                      <strong>{project.status}</strong>
                    </div>

                    {project.href && (
                      <Link href={project.href} className={styles.link}>
                        Ver más
                        <ArrowRightIcon
                          size={17}
                          weight="bold"
                          aria-hidden="true"
                        />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {hasMoreProjects && (
        <div className={styles.loadMoreWrap}>
          <button
            type="button"
            className={styles.loadMoreButton}
            onClick={handleLoadMore}
          >
            Ver más proyectos
            <ArrowRightIcon size={18} weight="bold" aria-hidden="true" />
          </button>

          <span className={styles.loadMoreText}>
            Quedan {filteredProjects.length - visibleProjects.length} por ver
          </span>
        </div>
      )}
    </section>
  );
}