import type { Metadata } from "next";

import ProjectFilter from "@/components/ProjectFilter";

import CaminoRealBenefits from "./components/CaminoRealBenefits";
import CaminoRealHero from "./components/CaminoRealHero";
import CaminoRealLocation from "./components/CaminoRealLocation";
import CaminoRealMedia from "./components/CaminoRealMedia";
import CaminoRealOverviewSection from "./components/CaminoRealOverviewSection";

import {
  disclaimerCaminoReal,
  seoCaminoReal,
} from "./data";

import styles from "./CaminoRealPage.module.css";

export const metadata: Metadata = {
  title: seoCaminoReal.title,

  description: seoCaminoReal.description,

  keywords: seoCaminoReal.keywords,

  alternates: {
    canonical: "/camino-real",
  },

  openGraph: {
    type: "website",
    locale: "es_PE",
    url: "/camino-real",
    siteName: "ANCOSUR Inmobiliaria",
    title: seoCaminoReal.title,
    description: seoCaminoReal.description,

    images: [
      {
        url: seoCaminoReal.openGraphImage,
        width: 1200,
        height: 630,
        alt:
          "Camino Real Residencial, lotes en El Tambo",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: seoCaminoReal.title,
    description: seoCaminoReal.description,
    images: [seoCaminoReal.openGraphImage],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function CaminoRealPage() {
  return (
    <main className={styles.page}>
      <CaminoRealHero />

      <CaminoRealOverviewSection />

      <CaminoRealMedia />

      <CaminoRealBenefits />

      <CaminoRealLocation />

      <ProjectFilter />

      <p className={styles.disclaimer}>
        {disclaimerCaminoReal}
      </p>
    </main>
  );
}