import ProjectFilter from "@/components/ProjectFilter";

import { createSeoMetadata } from "@/src/lib/seo";

import styles from "./DistritoSanCarlosPage.module.css";

import DistritoSanCarlosHero from "./components/DistritoSancarlosHero";
import DistritoSanCarlosOverviewSection from "./components/DistritoSancarlosOverviewSection";
import DistritoSanCarlosMedia from "./components/DistritoSancarlosMedia";
import DistritoSanCarlosAmenitiesSlider from "./components/DistritoSancarlosAmenitiesSlider";
import DistritoSanCarlosLocation from "./components/DistritoSanCarlosLocation";

/* =========================================================
   SEO
========================================================= */

export const metadata = createSeoMetadata({
  title:
    "Distrito San Carlos | Departamentos en Huancayo",

  description:
    "Distrito San Carlos es un proyecto inmobiliario de uso mixto en Huancayo con departamentos modernos, áreas comunes, zonas comerciales y una ubicación estratégica para vivir e invertir.",

  pathname: "/distrito-san-carlos",

  keywords: [
    "Distrito San Carlos",
    "departamentos en Huancayo",
    "departamentos San Carlos",
    "proyecto inmobiliario Huancayo",
    "departamentos modernos",
    "departamentos en venta",
    "departamentos de estreno",
    "inversión inmobiliaria",
    "Ancosur",
    "Ancosur Inmobiliaria",
    "Huancayo",
    "departamentos Junín",
  ],

  image:
    "/assets/projects/sliders/distrito-san-carlos.webp",
});

/* =========================================================
   PÁGINA
========================================================= */

export default function DistritoSanCarlosPage() {
  return (
    <main
      id="main-content"
      className={styles.page}
    >
      <DistritoSanCarlosHero />

      <DistritoSanCarlosOverviewSection />

      <DistritoSanCarlosMedia />

      <DistritoSanCarlosAmenitiesSlider />

      <DistritoSanCarlosLocation />

      <ProjectFilter />

      <p className={styles.disclaimer}>
        Todas las imágenes, planos, medidas y áreas son
        referenciales y pueden presentar modificaciones durante
        el desarrollo del proyecto.
      </p>
    </main>
  );
}