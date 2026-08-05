import ProjectFilter from "@/components/ProjectFilter";

import { createSeoMetadata } from "@/src/lib/seo";

import ColinasDeMoroBenefits from "./components/ColinasDeMoroBenefits";
import ColinasDeMoroHero from "./components/ColinasDeMoroHero";
import ColinasDeMoroLocation from "./components/ColinasDeMoroLocation";
import ColinasDeMoroMedia from "./components/ColinasDeMoroMedia";
import ColinasDeMoroOverviewSection from "./components/ColinasDeMoroOverviewSection";

import styles from "./ColinasDeMoroPage.module.css";

/* =========================================================
   SEO
========================================================= */

export const metadata = createSeoMetadata({
  title:
    "Las Colinas de Moro | Lotes en Concepción",

  description:
    "Las Colinas de Moro ofrece lotes desde 90 m² con entrega inmediata en La Huaycha, Concepción. Cuotas desde S/ 800, título de propiedad y acceso desde la Carretera Central.",

  pathname:
    "/las-colinas-de-moro",

  keywords: [
    "Las Colinas de Moro",
    "lotes en Concepción",
    "lotes en La Huaycha",
    "terrenos en Concepción",
    "lotes desde 90 m²",
    "lotes con entrega inmediata",
    "lotes con título de propiedad",
    "cuotas desde 800 soles",
    "proyectos inmobiliarios Concepción",
    "Ancosur",
    "Ancosur Inmobiliaria",
  ],

  image:
    "/assets/projects/sliders/colinas-de-moro.webp",
});

/* =========================================================
   PÁGINA
========================================================= */

export default function ColinasDeMoroPage() {
  return (
    <main
      id="main-content"
      className={styles.page}
    >
      <ColinasDeMoroHero />

      <ColinasDeMoroOverviewSection />

      <ColinasDeMoroMedia />

      <ColinasDeMoroBenefits />

      <ColinasDeMoroLocation />

      <ProjectFilter />

      <p className={styles.disclaimer}>
        Todas las imágenes, planos, medidas, áreas y precios son
        referenciales y pueden presentar modificaciones durante el
        desarrollo y comercialización del proyecto.
      </p>
    </main>
  );
}