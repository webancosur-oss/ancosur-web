import {
  ArrowRightIcon,
  MapPinIcon,
} from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";

import {
  cyberProjects,
} from "../data";

import styles from "./CyberProjects.module.css";

export default function CyberProjects() {
  return (
    <section
      className={styles.section}
      id="proyectos"
    >
      <div className={styles.inner}>
        <div
          className={styles.heading}
        >
          <span>
            Proyectos participantes
          </span>

          <h2>
            Encuentra la propiedad que
            se adapta a tus planes
          </h2>

          <p>
            Departamentos, lotes y
            proyectos de inversión
            disponibles para recibir
            asesoría durante el Cyber
            House.
          </p>
        </div>

        <div className={styles.grid}>
          {cyberProjects.map(
            (project) => (
              <article
                key={project.id}
                className={styles.card}
              >
                <div
                  className={
                    styles.imageBox
                  }
                >
                  <Image
                    src={project.image}
                    alt={project.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1100px) 50vw, 33vw"
                    className={
                      styles.image
                    }
                  />

                  <div
                    className={
                      styles.overlay
                    }
                  />

                  <span
                    className={
                      styles.badge
                    }
                  >
                    {project.status}
                  </span>
                </div>

                <div
                  className={
                    styles.content
                  }
                >
                  <div
                    className={
                      styles.location
                    }
                  >
                    <MapPinIcon
                      size={17}
                      weight="bold"
                      aria-hidden="true"
                    />

                    <span>
                      {project.location}
                    </span>
                  </div>

                  <h3>
                    {project.name}
                  </h3>

                  <p>
                    {
                      project.description
                    }
                  </p>

                  <div
                    className={
                      styles.tags
                    }
                  >
                    {project.tags.map(
                      (tag) => (
                        <span key={tag}>
                          {tag}
                        </span>
                      )
                    )}
                  </div>

                  <Link
                    href={project.href}
                    className={
                      styles.link
                    }
                  >
                    Conocer proyecto

                    <ArrowRightIcon
                      size={18}
                      weight="bold"
                      aria-hidden="true"
                    />
                  </Link>
                </div>
              </article>
            )
          )}
        </div>
      </div>
    </section>
  );
}
