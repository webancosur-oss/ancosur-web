import ProjectFilter from "@/components/ProjectFilter";

import { createSeoMetadata } from "@/src/lib/seo";

import NeoOrigenAmenitiesSlider from "./components/NeoOrigenAmenitiesSlider";
import NeoOrigenHero from "./components/NeoOrigenHero";
import NeoOrigenLocation from "./components/NeoOrigenLocation";
import NeoOrigenMedia from "./components/NeoOrigenMedia";
import NeoOrigenOverviewSection from "./components/NeoOrigenOverviewSection";

import styles from "./NeoOrigenPage.module.css";

/* =========================================================
   SEO
========================================================= */

export const metadata = createSeoMetadata({
  title:
    "Neo Origen | Departamentos en El Tambo, Huancayo",

  description:
    "Neo Origen es un proyecto inmobiliario ubicado en Jr. Libertad 1187, El Tambo, Huancayo. Cuenta con departamentos de 1, 2 y 3 ambientes, áreas desde 40 m² y modernas áreas comunes.",

  pathname: "/neo-origen",

  keywords: [
    "Neo Origen",
    "departamentos El Tambo",
    "departamentos Huancayo",
    "departamentos en venta",
    "departamentos modernos",
    "departamentos 1 ambiente",
    "departamentos 2 ambientes",
    "departamentos 3 ambientes",
    "departamentos Jr. Libertad",
    "proyectos inmobiliarios Huancayo",
    "ANCOSUR",
    "ANCOSUR Inmobiliaria",
  ],

  image:
    "/assets/projects/sliders/neo-origen.webp",
});

/* =========================================================
   PÁGINA
========================================================= */

export default function NeoOrigenPage() {
  return (
    <main
      id="main-content"
      className={styles.page}
    >
      <NeoOrigenHero />

      <NeoOrigenOverviewSection />

      <NeoOrigenMedia />

      <NeoOrigenAmenitiesSlider />

      <NeoOrigenLocation />

      <section
        className={styles.relatedProjects}
        aria-label="Proyectos relacionados con Neo Origen"
      >
        <ProjectFilter />
      </section>

      <p className={styles.disclaimer}>
        Todas las imágenes, renders, planos, medidas, áreas,
        precios, acabados, equipamiento y áreas comunes son
        referenciales y pueden presentar modificaciones durante
        el desarrollo del proyecto. La disponibilidad y los
        precios están sujetos a cambios sin previo aviso.
      </p>
    </main>
  );
}