import type { Metadata } from "next";

import ProjectFilter from "@/components/ProjectFilter";

import styles from "./DistritoSanCarlosPage.module.css";
import DistritoSanCarlosHero from "./components/DistritoSancarlosHero";
import DistritoSanCarlosOverviewSection from "./components/DistritoSancarlosOverviewSection";
import DistritoSanCarlosMedia from "./components/DistritoSancarlosMedia";
import DistritoSanCarlosAmenitiesSlider from "./components/DistritoSancarlosAmenitiesSlider";
import DistritoSanCarlosLocation from "./components/DistritoSanCarlosLocation";

export const metadata: Metadata = {
  title:
    "Distrito San Carlos | Departamentos en Huancayo",
  description:
    "Distrito San Carlos es un proyecto inmobiliario de uso mixto en Huancayo, con departamentos, áreas comunes, zonas comerciales y servicios para vivir conectado.",
  openGraph: {
    title:
      "Distrito San Carlos | Una ciudad dentro de tu edificio",
    description:
      "Departamentos, áreas comunes y zonas comerciales en una ubicación estratégica de Huancayo.",
    images: [
      {
        url: "/assets/projects/sliders/distrito-san-carlos.webp",
        width: 1200,
        height: 630,
        alt: "Distrito San Carlos en Huancayo",
      },
    ],
  },
};

export default function DistritoSanCarlosPage() {
  return (
    <main className={styles.page}>
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