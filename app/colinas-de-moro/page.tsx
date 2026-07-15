import type { Metadata } from "next";

import ProjectFilter from "@/components/ProjectFilter";
import ColinasDeMoroBenefits from "./components/ColinasDeMoroBenefits";
import ColinasDeMoroHero from "./components/ColinasDeMoroHero";
import ColinasDeMoroLocation from "./components/ColinasDeMoroLocation";
import ColinasDeMoroMedia from "./components/ColinasDeMoroMedia";
import ColinasDeMoroOverviewSection from "./components/ColinasDeMoroOverviewSection";
import styles from "./ColinasDeMoroPage.module.css";

export const metadata: Metadata = {
  title:
    "Las Colinas de Moro | Lotes en Concepción",

  description:
    "Las Colinas de Moro ofrece lotes desde 90 m² con entrega inmediata en La Huaycha, Concepción. Cuotas desde S/ 800, título de propiedad y acceso desde la Carretera Central.",

  openGraph: {
    title:
      "Las Colinas de Moro | Construye tu futuro en Concepción",

    description:
      "Lotes de 90 m² y 131 m² con entrega inmediata, servicios básicos y cuotas desde S/ 800.",

    images: [
      {
        url:
          "/assets/projects/sliders/colinas-de-moro.webp",
        width: 1200,
        height: 630,
        alt:
          "Las Colinas de Moro, proyecto de lotes en Concepción",
      },
    ],
  },
};

export default function ColinasDeMoroPage() {
  return (
    <main className={styles.page}>
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