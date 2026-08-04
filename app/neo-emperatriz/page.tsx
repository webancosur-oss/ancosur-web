import ProjectFilter from "@/components/ProjectFilter";

import { createSeoMetadata } from "@/src/lib/seo";

import NeoEmperatrizAmenitiesSlider from "./components/NeoEmperatrizAmenitiesSlider";
import NeoEmperatrizHero from "./components/NeoEmperatrizHero";
import NeoEmperatrizLocation from "./components/NeoEmperatrizLocation";
import NeoEmperatrizMedia from "./components/NeoEmperatrizMedia";
import NeoEmperatrizOverviewSection from "./components/NeoEmperatrizOverviewSection";

import styles from "./NeoEmperatrizPage.module.css";

/* =========================================================
   SEO
========================================================= */

export const metadata = createSeoMetadata({
  title:
    "Neo Emperatriz | Departamentos con entrega inmediata en Huancayo",

  description:
    "Neo Emperatriz ofrece departamentos de 2 y 3 dormitorios con entrega inmediata en San Carlos, Huancayo. Áreas desde 67 m² hasta 109 m², cerca de la Universidad Continental y con modernas áreas comunes.",

  pathname: "/neo-emperatriz",

  keywords: [
    "Neo Emperatriz",
    "departamentos Huancayo",
    "departamentos San Carlos",
    "departamentos entrega inmediata",
    "departamentos 2 dormitorios",
    "departamentos 3 dormitorios",
    "departamentos cerca Universidad Continental",
    "departamentos en venta Huancayo",
    "proyectos inmobiliarios Huancayo",
    "ANCOSUR",
    "ANCOSUR Inmobiliaria",
  ],

  image:
    "/assets/projects/sliders/neo-emperatriz.webp",
});

/* =========================================================
   PÁGINA
========================================================= */

export default function NeoEmperatrizPage() {
  return (
    <main
      id="main-content"
      className={styles.page}
    >
      <NeoEmperatrizHero />

      <NeoEmperatrizOverviewSection />

      <NeoEmperatrizMedia />

      <NeoEmperatrizAmenitiesSlider />

      <NeoEmperatrizLocation />

      <section
        aria-label="Proyectos relacionados"
      >
        <ProjectFilter />
      </section>

      <p className={styles.disclaimer}>
        Todas las imágenes, planos, medidas y áreas son
        referenciales y pueden presentar modificaciones
        durante el desarrollo del proyecto.
      </p>
    </main>
  );
}