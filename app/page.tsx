import {
  BRAND_NAME,
  DEFAULT_OG_IMAGE,
  SITE_URL,
  X_HANDLE,
} from "@/src/seo";
import {
  ORGANIZATION_ID,
  WEBSITE_ID,
} from "@/src/organization";
import type { Metadata } from "next";

import CertificationsSection from "@/components/CertificationsSection";
import ContactForm from "@/components/ContactForm";
import FAQSection from "@/components/FAQSection";
import HeroAncosur from "@/components/hero/HeroAncosur";
import HoldingSection from "@/components/HoldingSection";
import PromoLeadPopup from "@/components/PromoLeadPopupLazy";
import TrustStatsTestimonials from "@/components/TrustStatsTestimonials";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import FloatingPromo from "@/components/FloatingPromo/FloatingPromo";

/* =========================================================
   CONFIGURACIÓN SEO DE LA PORTADA
========================================================= */


const HOME_TITLE =
  "ANCOSUR | Departamentos y lotes en Huancayo";

const HOME_DESCRIPTION =
  "Departamentos y lotes en Huancayo con ANCOSUR: proyectos en preventa y con entrega inmediata, con asesoría para vivir o invertir con seguridad.";

const HOME_IMAGE =
  DEFAULT_OG_IMAGE;

/* =========================================================
   METADATA DE LA PORTADA
========================================================= */

export const metadata: Metadata = {
  /*
   * Absolute evita que el template global agregue
   * nuevamente "| ANCOSUR".
   */

  title: {
    absolute: HOME_TITLE,
  },

  description:
    HOME_DESCRIPTION,

  keywords: [
    "ANCOSUR",
    "ANCOSUR Inmobiliaria",
    "ANCOSUR Huancayo",
    "inmobiliaria Huancayo",
    "inmobiliaria en Huancayo",
    "mejor inmobiliaria en Huancayo",
    "departamentos Huancayo",
    "departamentos en Huancayo",
    "departamentos en venta Huancayo",
    "departamentos nuevos Huancayo",
    "departamentos de estreno Huancayo",
    "venta de departamentos Huancayo",
    "comprar departamento Huancayo",
    "lotes Huancayo",
    "lotes en Huancayo",
    "lotes en venta Huancayo",
    "terrenos Huancayo",
    "terrenos en venta Huancayo",
    "comprar terreno Huancayo",
    "proyectos inmobiliarios Huancayo",
    "inversión inmobiliaria Huancayo",
    "bienes raíces Huancayo",
    "propiedades en venta Huancayo",
    "Moro 416",
    "Neo Rivera",
    "Neo Balto",
    "Neo Xport",
    "Neo Eterna",
    "Neo Origen",
    "Neo Emperatriz",
    "Distrito San Carlos",
    "Camino Real",
    "Las Colinas de Moro",
    "Zagari Resort Club",
  ],

  alternates: {
    canonical:
      `${SITE_URL}/`,

    languages: {
      "es-PE":
        `${SITE_URL}/`,
    },
  },

  openGraph: {
    title:
      HOME_TITLE,

    description:
      HOME_DESCRIPTION,

    url:
      `${SITE_URL}/`,

    siteName:
      BRAND_NAME,

    locale:
      "es_PE",

    type:
      "website",

    images: [
      {
        url:
          `${SITE_URL}${HOME_IMAGE}`,

        secureUrl:
          `${SITE_URL}${HOME_IMAGE}`,

        width:
          1200,

        height:
          630,

        alt:
          "ANCOSUR: departamentos, lotes y proyectos inmobiliarios en Huancayo",

        type:
          "image/jpeg",
      },
    ],
  },

  twitter: {
    card:
      "summary_large_image",

    site:
      X_HANDLE,

    title:
      HOME_TITLE,

    description:
      HOME_DESCRIPTION,

    images: [
      `${SITE_URL}${HOME_IMAGE}`,
    ],
  },

  robots: {
    index:
      true,

    follow:
      true,

    googleBot: {
      index:
        true,

      follow:
        true,

      "max-image-preview":
        "large",

      "max-snippet":
        -1,

      "max-video-preview":
        -1,
    },
  },
};

/* =========================================================
   PÁGINA PRINCIPAL
========================================================= */

export default function Home() {
  const homePageJsonLd = {
    "@context":
      "https://schema.org",

    "@type":
      "WebPage",

    "@id":
      `${SITE_URL}/#webpage`,

    url:
      `${SITE_URL}/`,

    name:
      HOME_TITLE,

    headline:
      "Departamentos y lotes en Huancayo con ANCOSUR",

    description:
      HOME_DESCRIPTION,

    inLanguage:
      "es-PE",

    isPartOf: {
      "@id":
        WEBSITE_ID,
    },

    about: {
      "@id":
        ORGANIZATION_ID,
    },

    primaryImageOfPage: {
      "@type":
        "ImageObject",

      url:
        `${SITE_URL}${HOME_IMAGE}`,

      width:
        1200,

      height:
        630,
    },

    breadcrumb: {
      "@id":
        `${SITE_URL}/#breadcrumb`,
    },
  };

  const breadcrumbJsonLd = {
    "@context":
      "https://schema.org",

    "@type":
      "BreadcrumbList",

    "@id":
      `${SITE_URL}/#breadcrumb`,

    itemListElement: [
      {
        "@type":
          "ListItem",

        position:
          1,

        name:
          "Inicio",

        item:
          `${SITE_URL}/`,
      },
    ],
  };

  const jsonLd = [
    homePageJsonLd,
    breadcrumbJsonLd,
  ];

  return (
    <>
      <PromoLeadPopup />

      <FloatingPromo href="/promociones" />   

      <main id="main-content">
        <HeroAncosur />

        <FeaturedProjects />

        <TrustStatsTestimonials />

        <CertificationsSection />

        <HoldingSection />

        <ContactForm />

        <FAQSection />
      </main>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html:
            JSON.stringify(
              jsonLd,
            ).replace(
              /</g,
              "\\u003c",
            ),
        }}
      />
    </>
  );
}