import type { Metadata } from "next";

import ProjectFilter from "@/components/ProjectFilter";

import TerrazasConcepcionBenefits from "./components/TerrazasConcepcionBenefits";
import TerrazasConcepcionHero from "./components/TerrazasConcepcionHero";
import TerrazasConcepcionLocation from "./components/TerrazasConcepcionLocation";
import TerrazasConcepcionMedia from "./components/TerrazasConcepcionMedia";
import TerrazasConcepcionOverviewSection from "./components/TerrazasConcepcionOverviewSection";

import {
  disclaimerTerrazasConcepcion,
  seoTerrazasConcepcion,
} from "./data";

import styles from "./TerrazasConcepcionPage.module.css";

export const metadata: Metadata = {
  title: seoTerrazasConcepcion.title,

  description: seoTerrazasConcepcion.description,

  keywords: seoTerrazasConcepcion.keywords,

  alternates: {
    canonical: "/las-terrazas-de-concepcion",
  },

  openGraph: {
    type: "website",

    locale: "es_PE",

    title: seoTerrazasConcepcion.title,

    description: seoTerrazasConcepcion.description,

    url: "/las-terrazas-de-concepcion",

    siteName: "ANCOSUR Inmobiliaria",

    images: [
      {
        url: seoTerrazasConcepcion.openGraphImage,
        width: 1200,
        height: 630,
        alt:
          "Las Terrazas de Concepción, proyecto de lotes rodeado de naturaleza",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: seoTerrazasConcepcion.title,

    description: seoTerrazasConcepcion.description,

    images: [seoTerrazasConcepcion.openGraphImage],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function TerrazasConcepcionPage() {
  return (
    <main className={styles.page}>
      <TerrazasConcepcionHero />

      <TerrazasConcepcionOverviewSection />

      <TerrazasConcepcionMedia />

      <TerrazasConcepcionBenefits />

      <TerrazasConcepcionLocation />

      <ProjectFilter />

      <p className={styles.disclaimer}>
        {disclaimerTerrazasConcepcion}
      </p>
    </main>
  );
}