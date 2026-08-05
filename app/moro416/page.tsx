import ProjectFilter from "@/components/ProjectFilter";

import { createSeoMetadata } from "@/src/lib/seo";

import Moro416AmenitiesSlider from "./components/Moro416AmenitiesSlider";
import Moro416Hero from "./components/Moro416Hero";
import Moro416Location from "./components/Moro416Location";
import Moro416Media from "./components/Moro416Media";
import Moro416OverviewSection from "./components/Moro416OverviewSection";

import styles from "./Moro416.module.css";

/* =========================================================
   SEO
========================================================= */

export const metadata = createSeoMetadata({
  title:
    "Moro 416 | Departamentos para inversión en Huancayo",

  description:
    "Moro 416 es un proyecto mixto frente a Real Plaza Huancayo con departamentos para rentas cortas, oficinas corporativas y áreas desde 36 m².",

  pathname: "/moro-416",

  keywords: [
    "Moro 416",
    "departamentos en Huancayo",
    "departamentos para inversión Huancayo",
    "departamentos Airbnb Huancayo",
    "rentas cortas Huancayo",
    "oficinas en Huancayo",
    "oficinas frente a Real Plaza Huancayo",
    "departamentos frente a Real Plaza Huancayo",
    "inversión inmobiliaria Huancayo",
    "proyectos inmobiliarios Huancayo",
    "Ancosur",
    "Ancosur Inmobiliaria",
  ],

  image:
    "/assets/projects/sliders/moro-416.webp",
});

/* =========================================================
   PÁGINA
========================================================= */

export default function Moro416Page() {
  return (
    <main
      id="main-content"
      className={styles.page}
    >
      <Moro416Hero />

      <Moro416OverviewSection />

      <Moro416Media />

      <Moro416AmenitiesSlider />

      <Moro416Location />

      <section
        className={styles.relatedProjects}
        aria-label="Proyectos relacionados con Moro 416"
      >
        <ProjectFilter />
      </section>

      <p className={styles.disclaimer}>
        Todas las imágenes, planos, medidas, áreas, precios,
        acabados, equipamiento y áreas comunes son referenciales
        y pueden presentar modificaciones durante el desarrollo
        del proyecto. La disponibilidad y los precios están sujetos
        a cambios sin previo aviso.
      </p>
    </main>
  );
}