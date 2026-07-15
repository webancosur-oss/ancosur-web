import type { Metadata } from "next";

import ProjectFilter from "@/components/ProjectFilter";

import NeoBaltoAmenitiesSlider from "./components/NeoBaltoAmenitiesSlider";
import NeoBaltoHero from "./components/NeoBaltoHero";
import NeoBaltoLocation from "./components/NeoBaltoLocation";
import NeoBaltoMedia from "./components/NeoBaltoMedia";
import NeoBaltoOverviewSection from "./components/NeoBaltoOverviewSection";

import styles from "./NeoBaltoPage.module.css";

export const metadata: Metadata = {
  title: "Neo Balto | Departamentos Pet-Centric en Huancayo",

  description:
    "Neo Balto es un proyecto Pet-Centric ubicado en San Antonio, Huancayo. Cuenta con departamentos desde 43 m², amenidades para mascotas y espacios diseñados para una vida más cómoda en familia.",

  openGraph: {
    title: "Neo Balto | El primer edificio Pet-Centric de Huancayo",

    description:
      "Departamentos desde 43 m² con Lobby Sensorial, Eco-Pet Wash y Terraza Pet-Friendly en San Antonio, Huancayo.",

    images: [
      {
        url: "/assets/projects/sliders/neo-balto.webp",
        width: 1200,
        height: 630,
        alt: "Neo Balto, proyecto Pet-Centric en Huancayo",
      },
    ],
  },
};

export default function NeoBaltoPage() {
  return (
    <main className={styles.page}>
      <NeoBaltoHero />

      <NeoBaltoOverviewSection />

      <NeoBaltoMedia />

      <NeoBaltoAmenitiesSlider />

      <NeoBaltoLocation />

      <section
        className={styles.relatedProjects}
        aria-labelledby="neo-balto-related-title"
      >

        <ProjectFilter />
      </section>

      <p className={styles.disclaimer}>
        Todas las imágenes, planos, medidas, áreas, precios, acabados y
        equipamiento son referenciales y pueden presentar modificaciones
        durante el desarrollo del proyecto.
      </p>
    </main>
  );
}