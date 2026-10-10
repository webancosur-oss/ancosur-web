import type {
  Metadata,
  Viewport,
} from "next";
import type { ReactNode } from "react";

import { Manrope } from "next/font/google";

import "./globals.css";

import FloatingActions from "@/components/FloatingActions";
import FloatingPodcast from "@/components/FloatingPodcast";
import FloatingPromo from "@/components/FloatingPromo/FloatingPromo";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import {
  BRAND_NAME,
  DEFAULT_OG_ALT,
  DEFAULT_OG_IMAGE,
  SITE_NAME,
  SITE_URL,
  X_HANDLE,
} from "@/src/seo";
import {
  ADDRESS,
  EMAIL,
  GEO,
  ORGANIZATION_ID,
  PHONE,
  SOCIAL_PROFILES,
  WEBSITE_ID,
} from "@/src/organization";

/* =========================================================
   FUENTE GLOBAL
========================================================= */

const manrope = Manrope({
  variable: "--font-main",
  subsets: ["latin"],
  weight: [
    "400",
    "500",
    "600",
    "700",
  ],
  display: "swap",
});

const GTM_ID = "GTM-WG5V57RC";

/* =========================================================
   VIEWPORT
========================================================= */

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#00a74f",
  colorScheme: "light",
};

/* =========================================================
   METADATA GLOBAL
========================================================= */

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  applicationName: BRAND_NAME,

  title: {
    default:
      "Departamentos y lotes en Huancayo | ANCOSUR",

    template:
      "%s | ANCOSUR",
  },

  description:
    "Departamentos y lotes en Huancayo con ANCOSUR: proyectos en preventa y con entrega inmediata, con asesoría para vivir o invertir con seguridad.",

  keywords: [
    "ANCOSUR",
    "ANCOSUR Inmobiliaria",
    "inmobiliaria en Huancayo",
    "inmobiliaria Huancayo",
    "departamentos en Huancayo",
    "departamentos en venta Huancayo",
    "lotes en Huancayo",
    "lotes en venta Huancayo",
    "terrenos en Huancayo",
    "proyectos inmobiliarios Huancayo",
    "inversión inmobiliaria Huancayo",
    "bienes raíces Huancayo",
  ],

  authors: [
    {
      name: SITE_NAME,
      url: `${SITE_URL}/`,
    },
  ],

  creator:
    SITE_NAME,

  publisher:
    SITE_NAME,

  category:
    "Bienes raíces",

  /* Sin "url": cada página define su propio og:url.
     Si no, todas heredarían el de la portada. */
  openGraph: {
    siteName:
      SITE_NAME,

    locale:
      "es_PE",

    type:
      "website",

    images: [
      {
        url:
          DEFAULT_OG_IMAGE,

        width:
          1200,

        height:
          630,

        type:
          "image/jpeg",

        alt:
          DEFAULT_OG_ALT,
      },
    ],
  },

  twitter: {
    card:
      "summary_large_image",

    site:
      X_HANDLE,

    creator:
      X_HANDLE,

    images: [
      {
        url: DEFAULT_OG_IMAGE,
        alt: DEFAULT_OG_ALT,
      },
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

  /* Los iconos salen de app/icon.png y app/apple-icon.png
     (convenciones de Next). Definir "icons" aquí los anula
     y deja sin apple-touch-icon a iPhone / iMessage. */

  appleWebApp: {
    capable: true,

    title: BRAND_NAME,

    statusBarStyle: "default",
  },

  formatDetection: {
    telephone: false,
  },

  other: {
    "geo.region":
      "PE-JUN",

    "geo.placename":
      "Huancayo",

    "geo.position":
      `${GEO.latitude};${GEO.longitude}`,

    ICBM:
      `${GEO.latitude}, ${GEO.longitude}`,

    "content-language":
      "es-PE",
  },
};

/* =========================================================
   TIPOS
========================================================= */

type RootLayoutProps = {
  children: ReactNode;
};

/* =========================================================
   ROOT LAYOUT
========================================================= */

export default function RootLayout({
  children,
}: RootLayoutProps) {
  const organizationSchema = {
    "@context":
      "https://schema.org",

    "@type":
      "RealEstateAgent",

    "@id":
      ORGANIZATION_ID,

    name:
      BRAND_NAME,

    alternateName:
      SITE_NAME,

    url:
      `${SITE_URL}/`,

    /* Google exige logo raster (no SVG) de al menos 112 px */
    logo: {
      "@type":
        "ImageObject",

      url:
        `${SITE_URL}/icon-512.png`,

      width:
        512,

      height:
        512,
    },

    image:
      `${SITE_URL}${DEFAULT_OG_IMAGE}`,

    description:
      "Empresa inmobiliaria dedicada al desarrollo y comercialización de departamentos, lotes y proyectos inmobiliarios en Huancayo y otras zonas del Perú.",

    telephone:
      PHONE,

    email:
      EMAIL,

    priceRange:
      "$$",

    address: {
      "@type":
        "PostalAddress",

      ...ADDRESS,
    },

    geo: {
      "@type":
        "GeoCoordinates",

      ...GEO,
    },

    hasMap:
      `https://www.google.com/maps/search/?api=1&query=${GEO.latitude},${GEO.longitude}`,

    areaServed: [
      {
        "@type":
          "City",

        name:
          "Huancayo",
      },
      {
        "@type":
          "AdministrativeArea",

        name:
          "Junín",
      },
      {
        "@type":
          "Country",

        name:
          "Perú",
      },
    ],

    contactPoint: {
      "@type":
        "ContactPoint",

      telephone:
        PHONE,

      contactType:
        "sales",

      areaServed:
        "PE",

      availableLanguage:
        "Spanish",
    },

    sameAs:
      SOCIAL_PROFILES,
  };

  const websiteSchema = {
    "@context":
      "https://schema.org",

    "@type":
      "WebSite",

    "@id":
      WEBSITE_ID,

    url:
      `${SITE_URL}/`,

    name:
      BRAND_NAME,

    alternateName:
      SITE_NAME,

    description:
      "Departamentos, lotes y proyectos inmobiliarios en Huancayo.",

    inLanguage:
      "es-PE",

    publisher: {
      "@id":
        ORGANIZATION_ID,
    },
  };

  const structuredData = [
    organizationSchema,
    websiteSchema,
  ];

  return (
    <html
      lang="es-PE"
      className={manrope.variable}
    >
      <body>
        {/* GTM se carga cuando el navegador queda libre tras el
            load: no compite con el primer pintado. Los eventos
            que se envíen antes quedan en dataLayer y GTM los
            procesa al cargar. */}
        <Script
          id="gtm"
          strategy="lazyOnload"
        >
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`}
        </Script>
        <Navbar />

        {children}

        <FloatingActions />

        <FloatingPodcast />

        <Footer />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html:
              JSON.stringify(
                structuredData,
              ).replace(
                /</g,
                "\\u003c",
              ),
          }}
        />

        {/* Vercel Web Analytics: visitas y páginas vistas */}
        <Analytics />
      </body>
    </html>
  );
}