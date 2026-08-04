import ProjectFilter from "@/components/ProjectFilter";

import { createSeoMetadata } from "@/src/lib/seo";

import NeoEternaAmenitiesSlider from "./components/NeoEternaAmenitiesSlider";
import NeoEternaHero from "./components/NeoEternaHero";
import NeoEternaLocation from "./components/NeoEternaLocation";
import NeoEternaMedia from "./components/NeoEternaMedia";
import NeoEternaOverviewSection from "./components/NeoEternaOverviewSection";

import styles from "./NeoEternaPage.module.css";

/* =========================================================
   SEO
========================================================= */

export const metadata = createSeoMetadata({
  title:
    "Neo Eterna | Departamentos en la zona universitaria de Huancayo",

  description:
    "Neo Eterna es un proyecto de departamentos ubicado en la zona universitaria de San Carlos, Huancayo. Cuenta con tipologías de 1, 2 y 3 ambientes, áreas desde 41 m² y amenidades para estudiantes, profesionales e inversionistas.",

  pathname: "/neo-eterna",

  keywords: [
    "Neo Eterna",
    "departamentos Huancayo",
    "departamentos San Carlos",
    "departamentos zona universitaria",
    "departamentos Universidad Continental",
    "departamentos UPLA",
    "departamentos Roosevelt",
    "departamentos para inversión",
    "departamentos 1 ambiente",
    "departamentos 2 ambientes",
    "departamentos 3 ambientes",
    "proyectos inmobiliarios Huancayo",
    "ANCOSUR",
    "ANCOSUR Inmobiliaria",
  ],

  image:
    "/assets/projects/sliders/neo-eterna.webp",
});

/* =========================================================
   PÁGINA
========================================================= */

export default function NeoEternaPage() {
  return (
    <main
      id="main-content"
      className={styles.page}
    >
      <NeoEternaHero />

      <NeoEternaOverviewSection />

      <NeoEternaMedia />

      <NeoEternaAmenitiesSlider />

      <NeoEternaLocation />

      <section
        className={styles.relatedProjects}
        aria-label="Proyectos relacionados con Neo Eterna"
      >
        <ProjectFilter />
      </section>

      <p className={styles.disclaimer}>
        Todas las imágenes, planos, medidas, áreas, precios y acabados son
        referenciales y pueden presentar modificaciones durante el desarrollo
        del proyecto.
      </p>
    </main>
  );
}