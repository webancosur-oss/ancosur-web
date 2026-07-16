import type { Metadata } from "next";
import { notFound } from "next/navigation";

import ProjectLegalInformation from "../components/ProjectLegalInformation";
import ProjectSelector from "../components/ProjectSelector";
import TransparencyHero from "../components/TransparencyHero";

import {
  getTransparencyProject,
  transparencyProjects,
} from "../data";

import styles from "../PortalTransparencia.module.css";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return transparencyProjects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getTransparencyProject(slug);

  if (!project) {
    return {
      title: "Portal de Transparencia | ANCOSUR",
    };
  }

  return {
    title: `${project.name} | Portal de Transparencia ANCOSUR`,

    description:
      `Información legal, técnica y documentos del proyecto ${project.name}.`,
  };
}

export default async function TransparencyProjectPage({
  params,
}: PageProps) {
  const { slug } = await params;
  const project = getTransparencyProject(slug);

  if (!project) {
    notFound();
  }

  return (
    <main className={styles.page}>
      <TransparencyHero />

      <section className={styles.portalSection}>
        <div className={styles.portalGrid}>
          <ProjectSelector activeSlug={project.slug} />

          <ProjectLegalInformation project={project} />
        </div>
      </section>
    </main>
  );
}