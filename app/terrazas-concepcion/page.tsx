import ProjectFilter from "@/components/ProjectFilter";

import { createSeoMetadata } from "@/src/lib/seo";

import TerrazasConcepcionBenefits from "./components/TerrazasConcepcionBenefits";
import TerrazasConcepcionHero from "./components/TerrazasConcepcionHero";
import TerrazasConcepcionLocation from "./components/TerrazasConcepcionLocation";
import TerrazasConcepcionMedia from "./components/TerrazasConcepcionMedia";
import TerrazasConcepcionOverviewSection from "./components/TerrazasConcepcionOverviewSection";

import {
  disclaimerTerrazasConcepcion,
  seoTerrazasConcepcion,
} from "./data";

import styles from "./TerrazasConcepcionPage.module.css";

/* =========================================================
   SEO
========================================================= */

export const metadata = createSeoMetadata({
  title: seoTerrazasConcepcion.title,

  description: seoTerrazasConcepcion.description,

  pathname: "/las-terrazas-de-concepcion",

  keywords: seoTerrazasConcepcion.keywords,

  image: seoTerrazasConcepcion.openGraphImage,
});

/* =========================================================
   PÁGINA
========================================================= */

export default function TerrazasConcepcionPage() {
  return (
    <main
      id="main-content"
      className={styles.page}
    >
      <TerrazasConcepcionHero />

      <TerrazasConcepcionOverviewSection />

      <TerrazasConcepcionMedia />

      <TerrazasConcepcionBenefits />

      <TerrazasConcepcionLocation />

      <section
        aria-label="Proyectos relacionados con Las Terrazas de Concepción"
      >
        <ProjectFilter />
      </section>

      <p className={styles.disclaimer}>
        {disclaimerTerrazasConcepcion}
      </p>
    </main>
  );
}