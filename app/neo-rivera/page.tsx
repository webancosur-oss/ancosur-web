import ProjectFilter from "@/components/ProjectFilter";

import { createSeoMetadata } from "@/src/lib/seo";

import NeoRiveraAmenitiesSlider from "./components/NeoRiveraAmenitiesSlider";
import NeoRiveraHero from "./components/NeoRiveraHero";
import NeoRiveraLocation from "./components/NeoRiveraLocation";
import NeoRiveraMedia from "./components/NeoRiveraMedia";
import NeoRiveraOverviewSection from "./components/NeoRiveraOverviewSection";

import styles from "./NeoRiveraPage.module.css";

/* =========================================================
   SEO
========================================================= */

export const metadata = createSeoMetadata({
  title:
    "Neo Rivera | Departamentos Wellness en Huancayo",

  description:
    "Neo Rivera es un edificio Wellness ubicado en La Ribera, Huancayo. Departamentos de 2 habitaciones, áreas desde 57 m², amenidades para el bienestar y una excelente ubicación para vivir o invertir.",

  pathname: "/neo-rivera",

  keywords: [
    "Neo Rivera",
    "departamentos Wellness",
    "departamentos Huancayo",
    "departamentos La Ribera",
    "departamentos 2 habitaciones",
    "departamentos modernos",
    "departamentos en venta Huancayo",
    "proyectos inmobiliarios Huancayo",
    "bienestar",
    "Wellness",
    "ANCOSUR",
    "ANCOSUR Inmobiliaria",
  ],

  image:
    "/assets/projects/sliders/neo-rivera.webp",
});

/* =========================================================
   PÁGINA
========================================================= */

export default function NeoRiveraPage() {
  return (
    <main
      id="main-content"
      className={styles.page}
    >
      <NeoRiveraHero />

      <NeoRiveraOverviewSection />

      <NeoRiveraMedia />

      <NeoRiveraAmenitiesSlider />

      <NeoRiveraLocation />

      <section
        aria-label="Proyectos relacionados con Neo Rivera"
      >
        <ProjectFilter />
      </section>

      <p className={styles.disclaimer}>
        Todas las imágenes, planos, medidas y áreas son
        referenciales y pueden presentar modificaciones durante
        el desarrollo del proyecto.
      </p>
    </main>
  );
}