import {
  ArrowRight,
  Buildings,
} from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";

import ActionButton from "@/components/buttons/ActionButton";

import styles from "./DeliveredProjectsSection.module.css";

export type DeliveredProjectItem = {
  id: number | string;
  name: string;
  image: string;
  type?: string;
  href: string;
};

type DeliveredProjectsSectionProps = {
  projects: DeliveredProjectItem[];

  eyebrow?: string;
  title?: string;
  description?: string;

  limit?: number;

  ctaHref?: string;
  ctaLabel?: string;
};

const variantClasses = [
  styles.greenDark,
  styles.greenMedium,
  styles.greenLight,
];

export default function DeliveredProjectsSection({
  projects,
  eyebrow = "Experiencia ANCOSUR",
  title =
    "Proyectos entregados que respaldan nuestra experiencia",
  description =
    "Conoce algunos de los proyectos desarrollados y entregados por ANCOSUR.",
  limit = 3,
  ctaHref = "/proyectos-entregados",
  ctaLabel = "Ver más proyectos entregados",
}: DeliveredProjectsSectionProps) {
  const visibleProjects = projects.slice(
    0,
    limit,
  );

  if (visibleProjects.length === 0) {
    return null;
  }

  return (
    <section
      className={styles.section}
      aria-labelledby="delivered-projects-title"
    >
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.headerLabel}>
            <Buildings
              size={17}
              weight="fill"
              aria-hidden="true"
            />

            <span>{eyebrow}</span>
          </div>

          <h2 id="delivered-projects-title">
            {title}
          </h2>

          <p>{description}</p>
        </header>

        <div className={styles.grid}>
          {visibleProjects.map(
            (project, index) => {
              const variantClass =
                variantClasses[
                  index %
                    variantClasses.length
                ];

              return (
                <article
                  key={project.id}
                  className={`${styles.card} ${variantClass}`}
                >
                  <Link
                    href={project.href}
                    className={styles.cardLink}
                    aria-label={`Conocer el proyecto entregado ${project.name}`}
                  >
                    <div className={styles.cardTop}>
                      <div
                        className={
                          styles.projectContent
                        }
                      >
                        <span
                          className={
                            styles.projectType
                          }
                        >
                          {project.type ??
                            "Departamentos"}
                        </span>

                        <h3>{project.name}</h3>
                      </div>

                      <span
                        className={
                          styles.arrowButton
                        }
                        aria-hidden="true"
                      >
                        <ArrowRight
                          size={19}
                          weight="bold"
                        />
                      </span>
                    </div>

                    <div
                      className={
                        styles.imageWrapper
                      }
                    >
                      <Image
                        src={project.image}
                        alt={`Proyecto entregado ${project.name}`}
                        fill
                        sizes="
                          (max-width: 680px) 100vw,
                          (max-width: 1050px) 50vw,
                          33vw
                        "
                        className={styles.image}
                      />

                      <div
                        className={
                          styles.imageOverlay
                        }
                        aria-hidden="true"
                      />
                    </div>
                  </Link>
                </article>
              );
            },
          )}
        </div>

        <div className={styles.action}>
          <ActionButton
            href={ctaHref}
            variant="primary"
            size="lg"
          >
            <span>{ctaLabel}</span>

            <ArrowRight
              size={18}
              weight="bold"
              aria-hidden="true"
            />
          </ActionButton>
        </div>
      </div>
    </section>
  );
}