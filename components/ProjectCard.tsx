import {
  ArrowRightIcon,
  BuildingsIcon,
  MapPinIcon,
} from "@phosphor-icons/react";
import Image from "next/image";
import ActionButton from "./buttons/ActionButton";
import styles from "./ProjectFilter.module.css";

type ProjectCardProps = {
  project: {
    id: number | string;
    name: string;
    type: string;
    status: string;
    image: string;
    location?: string;
    href?: string;
  };
};

export default function ProjectCard({ project }: ProjectCardProps) {
  const projectHref = project.href;
  const hasLocation = Boolean(project.location);

  return (
    <article className={styles.card}>
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
                <MapPinIcon size={18} weight="bold" aria-hidden={true} />
                <div>
                  <span>Ubicación</span>
                  <strong>{project.location}</strong>
                </div>
              </div>
            )}

            <div className={styles.metaItem}>
              <BuildingsIcon size={18} weight="bold" aria-hidden={true} />
              <div>
                <span>Tipo</span>
                <strong>{project.type}</strong>
              </div>
            </div>
          </div>

          <div
            className={`${styles.footer} ${
              !projectHref ? styles.footerNoLink : ""
            }`}
          >
            <div className={styles.footerText}>
              <span>Estado</span>
              <strong>{project.status}</strong>
            </div>

            {projectHref && (
              <ActionButton
                href={projectHref}
                icon={ArrowRightIcon}
                size="sm"
                className={styles.link}
              >
                Ver más
              </ActionButton>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}