import type { Metadata } from "next";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ProjectFilter from "@/components/ProjectFilter";

import styles from "./NeoOrigenPage.module.css";
import NeoOrigenOverviewSection from "./components/NeoOrigenOverviewSection";
import NeoOrigenMedia from "./components/NeoOrigenMedia";
import NeoOrigenAmenitiesSlider from "./components/NeoOrigenAmenitiesSlider";
import NeoOrigenLocation from "./components/NeoOrigenLocation";
import NeoOrigenHero from "./components/NeoOrigenHero";

export const metadata: Metadata = {
  title:
    "Neo Origen | Departamentos en El Tambo, Huancayo",

  description:
    "Neo Origen es un proyecto inmobiliario ubicado en Jr. Libertad 1187, El Tambo, Huancayo. Cuenta con departamentos de 1, 2 y 3 ambientes, áreas desde 40 m² y cinco áreas comunes.",

  openGraph: {
    title:
      "Neo Origen | Innovación y conectividad en El Tambo",

    description:
      "Departamentos desde 40 m², cinco áreas comunes y una propuesta arquitectónica inspirada en el universo.",

    images: [
      {
        url: "/assets/projects/sliders/neo-origen.webp",
        width: 1200,
        height: 630,
        alt:
          "Neo Origen, proyecto inmobiliario en El Tambo, Huancayo",
      },
    ],
  },
};

export default function NeoOrigenPage() {
  return (
    <>
      <Navbar />

      <main className={styles.page}>
        <NeoOrigenHero />

        <NeoOrigenOverviewSection />

        <NeoOrigenMedia />

        <NeoOrigenAmenitiesSlider />

        <NeoOrigenLocation />

        <section
          className={styles.relatedProjects}
          aria-labelledby="neo-origen-related-title"
        >

          <ProjectFilter />
        </section>

        <p className={styles.disclaimer}>
          Todas las imágenes, renders, planos, medidas, áreas, precios,
          acabados, equipamiento y áreas comunes son referenciales y pueden
          presentar modificaciones durante el desarrollo del proyecto. La
          disponibilidad y los precios están sujetos a cambios sin previo
          aviso.
        </p>
      </main>

      <Footer />
    </>
  );
}