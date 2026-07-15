import type { Metadata } from "next";

import ProjectFilter from "@/components/ProjectFilter";
import NeoEmperatrizAmenitiesSlider from "./components/NeoEmperatrizAmenitiesSlider";
import NeoEmperatrizHero from "./components/NeoEmperatrizHero";
import NeoEmperatrizLocation from "./components/NeoEmperatrizLocation";
import NeoEmperatrizMedia from "./components/NeoEmperatrizMedia";
import NeoEmperatrizOverviewSection from "./components/NeoEmperatrizOverviewSection";
import styles from "./NeoEmperatrizPage.module.css";

export const metadata: Metadata = {
  title:
    "Neo Emperatriz | Departamentos con entrega inmediata en Huancayo",

  description:
    "Neo Emperatriz ofrece departamentos de 2 y 3 dormitorios con entrega inmediata en San Carlos, Huancayo. Áreas desde 67 m² hasta 109 m², amenidades y ubicación cerca de la Universidad Continental.",

  openGraph: {
    title:
      "Neo Emperatriz | Tu nuevo hogar listo para habitar",

    description:
      "Departamentos familiares con entrega inmediata, áreas desde 67 m² y una ubicación estratégica en San Carlos, Huancayo.",

    images: [
      {
        url: "/assets/projects/sliders/neo-emperatriz.webp",
        width: 1200,
        height: 630,
        alt: "Neo Emperatriz, departamentos con entrega inmediata en Huancayo",
      },
    ],
  },
};

export default function NeoEmperatrizPage() {
  return (
    <main className={styles.page}>
      <NeoEmperatrizHero />

      <NeoEmperatrizOverviewSection />

      <NeoEmperatrizMedia />

      <NeoEmperatrizAmenitiesSlider />

      <NeoEmperatrizLocation />

      <ProjectFilter />

      <p className={styles.disclaimer}>
        Todas las imágenes, planos, medidas y áreas son referenciales y pueden
        presentar modificaciones durante el desarrollo del proyecto.
      </p>
    </main>
  );
}