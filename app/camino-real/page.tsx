import ProjectFilter from "@/components/ProjectFilter";

import { createSeoMetadata } from "@/src/lib/seo";

import CaminoRealBenefits from "./components/CaminoRealBenefits";
import CaminoRealHero from "./components/CaminoRealHero";
import CaminoRealLocation from "./components/CaminoRealLocation";
import CaminoRealMedia from "./components/CaminoRealMedia";
import CaminoRealOverviewSection from "./components/CaminoRealOverviewSection";

import {
  disclaimerCaminoReal,
  seoCaminoReal,
} from "./data";

import styles from "./CaminoRealPage.module.css";

/* =========================================================
   SEO
========================================================= */

export const metadata = createSeoMetadata({
  title: seoCaminoReal.title,

  description: seoCaminoReal.description,

  pathname: "/camino-real",

  keywords: seoCaminoReal.keywords,

  image: seoCaminoReal.openGraphImage,
});

/* =========================================================
   PÁGINA
========================================================= */

export default function CaminoRealPage() {
  return (
    <main
      id="main-content"
      className={styles.page}
    >
      <CaminoRealHero />

      <CaminoRealOverviewSection />

      <CaminoRealMedia />

      <CaminoRealBenefits />

      <CaminoRealLocation />

      <ProjectFilter />

      <p className={styles.disclaimer}>
        {disclaimerCaminoReal}
      </p>
    </main>
  );
}