import ProjectFilter from "@/components/ProjectFilter";

import { createSeoMetadata } from "@/src/lib/seo";

import NeoBaltoAmenitiesSlider from "./components/NeoBaltoAmenitiesSlider";
import NeoBaltoHero from "./components/NeoBaltoHero";
import NeoBaltoLocation from "./components/NeoBaltoLocation";
import NeoBaltoMedia from "./components/NeoBaltoMedia";
import NeoBaltoOverviewSection from "./components/NeoBaltoOverviewSection";

import styles from "./NeoBaltoPage.module.css";

/* =========================================================
   SEO
========================================================= */

export const metadata = createSeoMetadata({
  title: "Neo Balto | Departamentos Pet-Centric en Huancayo",

  description:
    "Neo Balto es el primer proyecto Pet-Centric de Huancayo. Departamentos desde 43 m² con espacios diseñados para ti y tus mascotas, ubicado en San Antonio.",

  pathname: "/neo-balto",

  keywords: [
    "Neo Balto",
    "departamentos Pet-Centric",
    "departamentos Huancayo",
    "departamentos San Antonio",
    "departamentos con áreas para mascotas",
    "departamentos pet friendly",
    "departamentos en venta Huancayo",
    "proyectos inmobiliarios Huancayo",
    "ANCOSUR",
    "ANCOSUR Inmobiliaria",
  ],

  image: "/assets/projects/sliders/neo-balto.webp",
});

/* =========================================================
   PÁGINA
========================================================= */

export default function NeoBaltoPage() {
  return (
    <main
      id="main-content"
      className={styles.page}
    >
      <NeoBaltoHero />

      <NeoBaltoOverviewSection />

      <NeoBaltoMedia />

      <NeoBaltoAmenitiesSlider />

      <NeoBaltoLocation />

      <section
        className={styles.relatedProjects}
        aria-label="Proyectos relacionados con Neo Balto"
      >
        <ProjectFilter />
      </section>

      <p className={styles.disclaimer}>
        Todas las imágenes, planos, medidas, áreas, precios,
        acabados y equipamiento son referenciales y pueden
        presentar modificaciones durante el desarrollo del
        proyecto.
      </p>
    </main>
  );
}