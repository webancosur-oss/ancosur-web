import type { Metadata } from "next";

import CertificationsSection from "@/components/CertificationsSection";
import ContactForm from "@/components/ContactForm";
import FAQSection from "@/components/FAQSection";
import HeroAncosur from "@/components/hero/HeroAncosur";
import HoldingSection from "@/components/HoldingSection";
import ProjectFilter from "@/components/ProjectFilter";
import PromoLeadPopup from "@/components/PromoLeadPopup";
import TrustStatsTestimonials from "@/components/TrustStatsTestimonials";

/* =========================================================
   CONFIGURACIÓN SEO DE LA PORTADA
========================================================= */

const SITE_URL = "https://ancosur.com";

const HOME_TITLE =
  "ANCOSUR - Departamentos y lotes en Huancayo";

const HOME_DESCRIPTION =
  "Encuentra departamentos, lotes y proyectos inmobiliarios en Huancayo con Ancosur. Conoce oportunidades para vivir, invertir y adquirir una propiedad segura.";

const HOME_IMAGE =
  "/opengraph-image.png";

/* =========================================================
   METADATA DE LA PORTADA
========================================================= */

export const metadata: Metadata = {
 
  title: HOME_TITLE,

  description: HOME_DESCRIPTION,

  keywords: [
    "Ancosur",
    "Ancosur Inmobiliaria",
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
    canonical: "/",

    languages: {
      "es-PE": "/",
    },
  },

  openGraph: {
    title:
      "Departamentos y lotes en Huancayo | Ancosur",

    description: HOME_DESCRIPTION,

    url: "/",

    siteName:
      "Ancosur Inmobiliaria",

    locale: "es_PE",

    type: "website",

    images: [
      {
        url: HOME_IMAGE,

        secureUrl:
          `${SITE_URL}${HOME_IMAGE}`,

        width: 1200,

        height: 630,

        alt:
          "Departamentos, lotes y proyectos inmobiliarios Ancosur en Huancayo",

        type: "image/png",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title:
      "Departamentos y lotes en Huancayo | Ancosur",

    description: HOME_DESCRIPTION,

    images: [
      HOME_IMAGE,
    ],
  },

  robots: {
    index: true,

    follow: true,

    googleBot: {
      index: true,

      follow: true,

      "max-image-preview": "large",

      "max-snippet": -1,

      "max-video-preview": -1,
    },
  },
};

/* =========================================================
   PÁGINA PRINCIPAL
========================================================= */

export default function Home() {
  const homePageJsonLd = {
    "@context": "https://schema.org",

    "@type": "WebPage",

    "@id":
      `${SITE_URL}/#webpage`,

    url: `${SITE_URL}/`,

    name:
      "Departamentos y lotes en Huancayo | Ancosur",

    headline:
      "Departamentos y lotes en Huancayo",

    description:
      HOME_DESCRIPTION,

    inLanguage: "es-PE",

    isPartOf: {
      "@id":
        `${SITE_URL}/#website`,
    },

    about: {
      "@id":
        `${SITE_URL}/#organization`,
    },

    primaryImageOfPage: {
      "@type": "ImageObject",

      url:
        `${SITE_URL}${HOME_IMAGE}`,

      width: 1200,

      height: 630,
    },

    breadcrumb: {
      "@id":
        `${SITE_URL}/#breadcrumb`,
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",

    "@type": "BreadcrumbList",

    "@id":
      `${SITE_URL}/#breadcrumb`,

    itemListElement: [
      {
        "@type": "ListItem",

        position: 1,

        name: "Inicio",

        item: `${SITE_URL}/`,
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

      <main id="main-content">
        <HeroAncosur />

        <ProjectFilter />

        <TrustStatsTestimonials />

        <CertificationsSection />

        <HoldingSection />

        <ContactForm />

        <FAQSection />
      </main>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
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