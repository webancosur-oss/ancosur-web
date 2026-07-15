import type { Metadata } from "next";

import ProjectFilter from "@/components/ProjectFilter";

import NeoEternaAmenitiesSlider from "./components/NeoEternaAmenitiesSlider";
import NeoEternaHero from "./components/NeoEternaHero";
import NeoEternaLocation from "./components/NeoEternaLocation";
import NeoEternaMedia from "./components/NeoEternaMedia";
import NeoEternaOverviewSection from "./components/NeoEternaOverviewSection";

import styles from "./NeoEternaPage.module.css";

export const metadata: Metadata = {
  title: "Neo Eterna | Departamentos en la zona universitaria de Huancayo",
  description:
    "Neo Eterna es un proyecto de departamentos ubicado en la zona universitaria de San Carlos, Huancayo. Cuenta con tipologías de 1, 2 y 3 ambientes, áreas desde 41 m² y amenidades para estudiantes, profesionales e inversionistas.",

  openGraph: {
    title: "Neo Eterna | Inversión en la zona universitaria de Huancayo",
    description:
      "Departamentos de 1, 2 y 3 ambientes cerca de la Universidad Continental, UPLA y Universidad Roosevelt.",
    images: [
      {
        url: "/assets/projects/sliders/neo-eterna.webp",
        width: 1200,
        height: 630,
        alt: "Neo Eterna, proyecto inmobiliario en San Carlos, Huancayo",
      },
    ],
  },
};

export default function NeoEternaPage() {
  return (
    <main className={styles.page}>
      <NeoEternaHero />

      <NeoEternaOverviewSection />

      <NeoEternaMedia />

      <NeoEternaAmenitiesSlider />

      <NeoEternaLocation />

      <section
        className={styles.relatedProjects}
        aria-labelledby="related-projects-title"
      >

        <ProjectFilter />
      </section>

      <p className={styles.disclaimer}>
        Todas las imágenes, planos, medidas, áreas, precios y acabados son
        referenciales y pueden presentar modificaciones durante el desarrollo
        del proyecto.
      </p>
    </main>
  );
}