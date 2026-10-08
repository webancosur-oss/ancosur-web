import ProjectJsonLd from "@/components/seo/ProjectJsonLd";
import { createSeoMetadata } from "@/src/seo";

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

  pathname: "/terrazas-concepcion",

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
      <ProjectJsonLd
        name="Las Terrazas de Concepción"
        path="/terrazas-concepcion"
        image="/og/terrazas-concepcion.jpg"
      />

      <TerrazasConcepcionHero />

      <TerrazasConcepcionOverviewSection />

      <TerrazasConcepcionMedia />

      <TerrazasConcepcionBenefits />

      <TerrazasConcepcionLocation />

      
      <p className={styles.disclaimer}>
        {disclaimerTerrazasConcepcion}
      </p>
    </main>
  );
}