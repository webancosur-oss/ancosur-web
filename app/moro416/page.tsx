import type { Metadata } from "next";

import ProjectFilter from "@/components/ProjectFilter";



import styles from "./Moro416.module.css";
import Moro416Hero from "./components/Moro416Hero";
import Moro416OverviewSection from "./components/Moro416OverviewSection";
import Moro416Media from "./components/Moro416Media";
import Moro416AmenitiesSlider from "./components/Moro416AmenitiesSlider";
import Moro416Location from "./components/Moro416Location";

export const metadata: Metadata = {
  title:
    "Moro 416 | Departamentos para inversión y oficinas en Huancayo",

  description:
    "Moro 416 es un proyecto mixto ubicado en la intersección de la avenida Giráldez y Ferrocarril, frente a Real Plaza Huancayo. Cuenta con departamentos para rentas cortas, oficinas corporativas, áreas desde 36 m² y precios desde S/ 189,108.",

  keywords: [
    "Moro 416",
    "departamentos en Huancayo",
    "departamentos Airbnb Huancayo",
    "inversión inmobiliaria Huancayo",
    "oficinas en Huancayo",
    "departamentos frente a Real Plaza Huancayo",
    "proyectos inmobiliarios Huancayo",
    "ANCOSUR Inmobiliaria",
  ],

  openGraph: {
    title:
      "Moro 416 | Tu activo financiero más inteligente en Huancayo",

    description:
      "Proyecto mixto con departamentos para Airbnb, rentas cortas y oficinas corporativas. Áreas desde 36 m² y precios desde S/ 189,108.",

    type: "website",

    images: [
      {
        url: "/assets/projects/sliders/moro-416.webp",
        width: 1200,
        height: 630,
        alt: "Moro 416, proyecto mixto de inversión en Huancayo",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title:
      "Moro 416 | Departamentos para inversión en Huancayo",

    description:
      "Departamentos para rentas cortas y oficinas corporativas frente a Real Plaza Huancayo.",

    images: [
      "/assets/projects/sliders/moro-416.webp",
    ],
  },
};

export default function Moro416Page() {
  return (
    <main className={styles.page}>
      {/* HERO PRINCIPAL */}

      <Moro416Hero />

      {/* INFORMACIÓN GENERAL, ÁREAS Y PRECIO */}

      <Moro416OverviewSection />

      {/* VIDEO, GALERÍA O CONTENIDO MULTIMEDIA */}

      <Moro416Media />

      {/* 8 ÁREAS COMUNES */}

      <Moro416AmenitiesSlider />

      {/* UBICACIÓN DEL PROYECTO */}

      <Moro416Location />

      {/* PROYECTOS RELACIONADOS */}

      <section
        className={styles.relatedProjects}
        aria-labelledby="moro-416-related-title"
      >

        <ProjectFilter />
      </section>

      {/* AVISO LEGAL */}

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