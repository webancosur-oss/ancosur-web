import {
  ArrowLeftIcon,
  DownloadSimpleIcon,
} from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

import type { TransparencyProject } from "../data";
import styles from "./ProjectLegalInformation.module.css";

type ProjectLegalInformationProps = {
  project: TransparencyProject;
};

export default function ProjectLegalInformation({
  project,
}: ProjectLegalInformationProps) {
  return (
    <article className={styles.information}>
      <span className={styles.eyebrow}>
        Información del proyecto
      </span>

      <h1>{project.name}</h1>

      <dl className={styles.projectData}>
        <div>
          <dt>Nombre del proyecto</dt>
          <dd>{project.name}</dd>
        </div>

        <div>
          <dt>Razón social</dt>
          <dd>{project.companyName}</dd>
        </div>

        <div>
          <dt>RUC</dt>
          <dd>{project.ruc}</dd>
        </div>

        <div>
          <dt>Domicilio fiscal</dt>
          <dd>{project.fiscalAddress}</dd>
        </div>

        <div>
          <dt>Teléfono de contacto</dt>
          <dd>{project.contactPhone}</dd>
        </div>

        <div>
          <dt>Ubicación del proyecto</dt>
          <dd>{project.projectAddress}</dd>
        </div>
      </dl>

      <div className={styles.description}>
        {project.description.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      <div className={styles.documents}>
        <h2>Documentos disponibles</h2>

        <div className={styles.documentGrid}>
          {project.documents.map((document) => (
            <a
              key={document.label}
              href={document.href}
              target="_blank"
              rel="noreferrer"
            >
              <DownloadSimpleIcon
                size={18}
                weight="bold"
                aria-hidden={true}
              />

              {document.label}
            </a>
          ))}
        </div>
      </div>

      <Link
        href={project.projectRoute}
        className={styles.backButton}
      >
        <ArrowLeftIcon
          size={17}
          weight="bold"
          aria-hidden={true}
        />

        Volver a {project.name}
      </Link>
    </article>
  );
}