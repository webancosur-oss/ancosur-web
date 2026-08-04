import ProjectFilter from "@/components/ProjectFilter";

import { createSeoMetadata } from "@/src/lib/seo";

import NeoXportAmenitiesSlider from "./components/NeoXportAmenities";
import NeoXportHero from "./components/NeoXportHero";
import NeoXportLocation from "./components/NeoXportLocation";
import NeoXportMedia from "./components/NeoXportMedia";
import NeoXportOverviewSection from "./components/NeoXportOverviewSection";

import {
  disclaimerNeoXport,
  seoNeoXport,
} from "./data";

import styles from "./NeoXportPage.module.css";

/* =========================================================
   SEO
========================================================= */

export const metadata = createSeoMetadata({
  title: seoNeoXport.title,

  description: seoNeoXport.description,

  pathname: "/neo-xport",

  keywords: seoNeoXport.keywords,

  image: seoNeoXport.openGraphImage,
});

/* =========================================================
   PÁGINA
========================================================= */

export default function NeoXportPage() {
  return (
    <main
      id="main-content"
      className={styles.page}
    >
      <NeoXportHero />

      <NeoXportOverviewSection />

      <NeoXportMedia />

      <NeoXportAmenitiesSlider />

      <NeoXportLocation />

      <section
        aria-label="Proyectos relacionados con Neo Xport"
      >
        <ProjectFilter />
      </section>

      <p className={styles.disclaimer}>
        {disclaimerNeoXport}
      </p>
    </main>
  );
}