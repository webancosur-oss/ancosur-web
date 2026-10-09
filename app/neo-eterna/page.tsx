import ProjectJsonLd from "@/components/seo/ProjectJsonLd";
import { createSeoMetadata } from "@/src/seo";

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
    "Neo Eterna | Departamentos cerca a universidades en Huancayo",

  description:
    "Departamentos de 1, 2 y 3 ambientes desde 41 m² en la zona universitaria de San Carlos, Huancayo, con amenidades para estudiantes e inversionistas.",

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
    "Ancosur",
    "Ancosur Inmobiliaria",
  ],

  image: "/og/neo-eterna.jpg",
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
      <ProjectJsonLd
        name="Neo Eterna"
        path="/neo-eterna"
        image="/og/neo-eterna.jpg"
      />

      <NeoEternaHero />

      <NeoEternaOverviewSection />

      <NeoEternaMedia />

      <NeoEternaAmenitiesSlider />

      <NeoEternaLocation />

      <section
        className={styles.relatedProjects}
        aria-label="Proyectos relacionados con Neo Eterna"
      >
      </section>

      <p className={styles.disclaimer}>
        Todas las imágenes, planos, medidas, áreas, precios y acabados son
        referenciales y pueden presentar modificaciones durante el desarrollo
        del proyecto.
      </p>
    </main>
  );
}