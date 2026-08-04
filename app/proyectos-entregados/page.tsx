import {
  ArrowRight,
  Buildings,
} from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";

import ActionButton from "@/components/buttons/ActionButton";
import { projects } from "@/data/projects";
import { createSeoMetadata } from "@/src/lib/seo";

import styles from "./ProyectosEntregados.module.css";

/* =========================================================
   SEO
========================================================= */

export const metadata = createSeoMetadata({
  title:
    "Proyectos entregados en Huancayo | ANCOSUR",

  description:
    "Conoce los proyectos inmobiliarios desarrollados y entregados por ANCOSUR en Huancayo. Explora nuestro portafolio de departamentos y obras culminadas.",

  pathname:
    "/proyectos-entregados",

  keywords: [
    "proyectos entregados ANCOSUR",
    "proyectos inmobiliarios entregados",
    "departamentos entregados Huancayo",
    "edificios entregados Huancayo",
    "proyectos culminados Huancayo",
    "portafolio inmobiliario ANCOSUR",
    "inmobiliaria Huancayo",
    "ANCOSUR",
    "ANCOSUR Inmobiliaria",
  ],

  image:
    "/opengraph-image.png",
});

/* =========================================================
   VARIANTES VISUALES
========================================================= */

const cardVariants = [
  styles.greenDark,
  styles.greenMedium,
  styles.greenLight,
];

/* =========================================================
   PÁGINA
========================================================= */

export default function ProyectosEntregadosPage() {
  const deliveredProjects = projects.filter(
    (project) =>
      project.status === "ENTREGADO",
  );

  return (
    <main
      id="main-content"
      className={styles.page}
    >
      <section
        className={styles.projectsSection}
        aria-labelledby="delivered-list-title"
      >
        <div className={styles.container}>
          <header className={styles.sectionHeader}>
            <div className={styles.sectionLabel}>
              <Buildings
                size={17}
                weight="fill"
                aria-hidden="true"
              />

              <span>
                Portafolio entregado
              </span>
            </div>

            <h1 id="delivered-list-title">
              Conoce nuestros proyectos culminados
            </h1>

            <p>
              Explora los departamentos y proyectos que ya forman
              parte de la trayectoria y experiencia de ANCOSUR.
            </p>
          </header>

          {deliveredProjects.length > 0 ? (
            <div className={styles.grid}>
              {deliveredProjects.map(
                (project, index) => {
                  const variantClass =
                    cardVariants[
                      index % cardVariants.length
                    ];

                  const projectType =
                    project.type === "Departamento"
                      ? "Departamentos"
                      : project.type;

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
                          <div className={styles.projectContent}>
                            {projectType && (
                              <span className={styles.projectType}>
                                {projectType}
                              </span>
                            )}

                            <h2>
                              {project.name}
                            </h2>
                          </div>

                          <span
                            className={styles.arrowButton}
                            aria-hidden="true"
                          >
                            <ArrowRight
                              size={19}
                              weight="bold"
                            />
                          </span>
                        </div>

                        <div className={styles.imageWrapper}>
                          <Image
                            src={project.image}
                            alt={`Proyecto entregado ${project.name} de ANCOSUR`}
                            fill
                            sizes="
                              (max-width: 680px) 100vw,
                              (max-width: 1050px) 50vw,
                              33vw
                            "
                            className={styles.image}
                          />

                          <div
                            className={styles.imageOverlay}
                            aria-hidden="true"
                          />
                        </div>
                      </Link>
                    </article>
                  );
                },
              )}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <Buildings
                size={42}
                weight="duotone"
                aria-hidden="true"
              />

              <h2>
                Próximamente publicaremos nuestros proyectos
                entregados
              </h2>

              <p>
                Actualmente no existen proyectos registrados con
                el estado “ENTREGADO”.
              </p>

              <ActionButton
                href="/departamentos"
                variant="primary"
                size="lg"
              >
                <span>
                  Ver proyectos disponibles
                </span>

                <ArrowRight
                  size={18}
                  weight="bold"
                  aria-hidden="true"
                />
              </ActionButton>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}