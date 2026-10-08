
import ProjectJsonLd from "@/components/seo/ProjectJsonLd";
import { createSeoMetadata } from "@/src/seo";

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
      <ProjectJsonLd
        name="Camino Real"
        path="/camino-real"
        image="/og/camino-real.jpg"
      />

      <CaminoRealHero />

      <CaminoRealOverviewSection />

      <CaminoRealMedia />

      <CaminoRealBenefits />

      <CaminoRealLocation />


      <p className={styles.disclaimer}>
        {disclaimerCaminoReal}
      </p>
    </main>
  );
}