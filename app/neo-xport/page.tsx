import type { Metadata } from "next";

import ProjectFilter from "@/components/ProjectFilter";

import NeoXportAmenitiesSlider from "./components/NeoXportAmenities";
import NeoXportHero from "./components/NeoXportHero";
import NeoXportLocation from "./components/NeoXportLocation";
import NeoXportMedia from "./components/NeoXportMedia";
import NeoXportOverviewSection from "./components/NeoXportOverviewSection";

import {
  disclaimerNeoXport,
  seoNeoXport,
} from "./data";

import styles from "./NeoXportPage.module.css";

export const metadata: Metadata = {
  title: seoNeoXport.title,

  description: seoNeoXport.description,

  keywords: seoNeoXport.keywords,

  alternates: {
    canonical: "/neo-xport",
  },

  openGraph: {
    type: "website",

    locale: "es_PE",

    url: "/neo-xport",

    siteName: "ANCOSUR Inmobiliaria",

    title: seoNeoXport.title,

    description: seoNeoXport.description,

    images: [
      {
        url: seoNeoXport.openGraphImage,
        width: 1200,
        height: 630,
        alt:
          "Neo Xport, edificio con ADN deportivo frente al Polideportivo Wanka en Huancayo",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: seoNeoXport.title,

    description: seoNeoXport.description,

    images: [
      seoNeoXport.openGraphImage,
    ],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function NeoXportPage() {
  return (
    <main className={styles.page}>
      <NeoXportHero />

      <NeoXportOverviewSection />

      <NeoXportMedia />

      <NeoXportAmenitiesSlider />

      <NeoXportLocation />

      <ProjectFilter />

      <p className={styles.disclaimer}>
        {disclaimerNeoXport}
      </p>
    </main>
  );
}