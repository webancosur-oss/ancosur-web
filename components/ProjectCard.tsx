"use client";

import Image from "next/image";
import Link from "next/link";

import {
  Bed,
  ArrowsOutSimple,
  ArrowRight,
} from "@phosphor-icons/react";

import { Project } from "@/data/projects";

import styles from "./ProjectCard.module.css";
import ActionButton from "./buttons/ActionButton";

type Props = {
  project: Project;
};

const statusLabel: Record<string, string> = {
  "PRE VENTA": "PRE VENTA",
  "LANZAMIENTO": "LANZAMIENTO",
  "EN CONSTRUCCIÓN": "EN CONSTRUCCIÓN",
  "ENTREGA INMEDIATA": "ENTREGA INMEDIATA",
  "ENTREGADO": "PROYECTO ENTREGADO",
};

export default function ProjectCard({ project }: Props) {
  if (!project) return null;

  return (
    <article className={styles.card}>
      <Link
        href={project.href}
        className={styles.cardLink}
      >
        {/* ===========================
            IMAGEN
        =========================== */}

        <div className={styles.imageBox}>
          <Image
            src={project.image}
            alt={project.name}
            fill
            className={styles.image}
            sizes="(max-width:768px)100vw,(max-width:1200px)50vw,33vw"
          />

          <div className={styles.overlay} />
        </div>

        {/* ===========================
            CONTENIDO
        =========================== */}

        <div className={styles.content}>
          <div className={styles.titleArea}>
            <h3>{project.name}</h3>
          </div>

          <div className={styles.location}>
            <strong>{project.city}</strong>

            <span>{project.address}</span>

            {/* <div className={styles.status}>
              {statusLabel[project.status]}
            </div> */}
          </div>

          <div className={styles.features}>
            <div className={styles.feature}>
              <Bed
                size={20}
                weight="regular"
              />
              <span>{project.bedrooms}</span>
            </div>

            <div className={styles.feature}>
              <ArrowsOutSimple
                size={20}
                weight="regular"
              />
              <span>{project.area}</span>
            </div>
          </div>

          <div className={styles.priceBox}>
            <small>Desde</small>
            <strong>{project.price}</strong>
          </div>
        </div>
      </Link>

      {/* ===========================
          BOTÓN
      =========================== */}

      <div className={styles.buttonArea}>
        <ActionButton
          href={project.href}
          variant="primary"
          size="md"
          fullWidth
          icon={ArrowRight}
          iconPosition="right"
        >
          VER PROYECTO
        </ActionButton>
      </div>
    </article>
  );
}