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
import TawkChat from "@/components/ui/tawk/TawkChat";

/* =========================================================
   CONFIGURACIÓN PRINCIPAL
========================================================= */

const PRODUCTION_URL =
  "https://ancosur.com";

const BRAND_NAME =
  "ANCOSUR";

const COMPANY_NAME =
  "ANCOSUR Inmobiliaria";

const DEFAULT_TITLE =
  "ANCOSUR | Departamentos y lotes en Huancayo";

const DEFAULT_DESCRIPTION =
  "Encuentra departamentos, lotes y proyectos inmobiliarios en Huancayo con ANCOSUR. Conoce oportunidades para vivir, invertir y adquirir una propiedad segura.";

const OG_IMAGE_ALT =
  "ANCOSUR Inmobiliaria: departamentos, lotes y proyectos inmobiliarios en Huancayo";

/* =========================================================
   NORMALIZACIÓN DE URL
========================================================= */

function normalizeSiteUrl(
  value?: string,
): string {
  const normalizedValue = value
    ?.trim()
    .replace(/\/+$/, "");

  if (!normalizedValue) {
    return PRODUCTION_URL;
  }

  try {
    const parsedUrl =
      new URL(normalizedValue);

    const isLocalhost =
      parsedUrl.hostname ===
        "localhost" ||
      parsedUrl.hostname ===
        "127.0.0.1";

    if (
      process.env.NODE_ENV ===
        "production" &&
      isLocalhost
    ) {
      return PRODUCTION_URL;
    }

    if (
      parsedUrl.hostname ===
        "ancosur.com" ||
      parsedUrl.hostname ===
        "www.ancosur.com"
    ) {
      return PRODUCTION_URL;
    }

    return parsedUrl.origin;
  } catch {
    return PRODUCTION_URL;
  }
}

const siteUrl =
  normalizeSiteUrl(
    process.env.SITE_URL,
  );

const xHandle =
  process.env
    .NEXT_PUBLIC_X_HANDLE
    ?.trim();

/* =========================================================
   FUENTE
========================================================= */

const manrope = Manrope({
  variable:
    "--font-main",

  subsets: [
    "latin",
  ],

  weight: [
    "400",
    "500",
    "600",
    "700",
  ],

  display:
    "swap",

  preload:
    true,

  fallback: [
    "Arial",
    "Helvetica",
    "sans-serif",
  ],
});

/* =========================================================
   VIEWPORT
========================================================= */

export const viewport: Viewport = {
  width:
    "device-width",

  initialScale:
    1,

  themeColor: [
    {
      media:
        "(prefers-color-scheme: light)",

      color:
        "#00a74f",
    },
    {
      media:
        "(prefers-color-scheme: dark)",

      color:
        "#101024",
    },
  ],

  colorScheme:
    "light dark",
};

/* =========================================================
   METADATA GLOBAL

   No se agrega canonical global.
   Cada página debe definir su propia canonical.
========================================================= */

export const metadata: Metadata = {
  metadataBase:
    new URL(siteUrl),

  applicationName:
    BRAND_NAME,

  title: {
    default:
      DEFAULT_TITLE,

    template:
      "%s | ANCOSUR",
  },

  description:
    DEFAULT_DESCRIPTION,

  keywords: [
    "ANCOSUR",
    "ANCOSUR Inmobiliaria",
    "ANCOSUR Huancayo",
    "inmobiliaria en Huancayo",
    "inmobiliaria Huancayo",
    "departamentos en Huancayo",
    "departamentos en venta Huancayo",
    "departamentos nuevos Huancayo",
    "venta de departamentos Huancayo",
    "comprar departamento Huancayo",
    "lotes en Huancayo",
    "lotes en venta Huancayo",
    "terrenos en Huancayo",
    "terrenos en venta Huancayo",
    "comprar terreno Huancayo",
    "proyectos inmobiliarios Huancayo",
    "inversión inmobiliaria Huancayo",
    "venta de propiedades Huancayo",
    "bienes raíces Huancayo",
  ],

  authors: [
    {
      name:
        COMPANY_NAME,

      url:
        siteUrl,
    },
  ],

  creator:
    COMPANY_NAME,

  publisher:
    COMPANY_NAME,

  category:
    "Inmobiliaria",

  classification:
    "Bienes raíces y desarrollo inmobiliario",

  referrer:
    "origin-when-cross-origin",

  formatDetection: {
    email:
      false,

    address:
      false,

    telephone:
      false,
  },

  openGraph: {
    title:
      DEFAULT_TITLE,

    description:
      DEFAULT_DESCRIPTION,

    siteName:
      BRAND_NAME,

    locale:
      "es_PE",

    type:
      "website",

    images: [
      {
        url:
          "/opengraph-image.png",

        secureUrl:
          `${siteUrl}/opengraph-image.png`,

        width:
          1200,

        height:
          630,

        alt:
          OG_IMAGE_ALT,

        type:
          "image/png",
      },
    ],
  },

  twitter: {
    card:
      "summary_large_image",

    title:
      DEFAULT_TITLE,

    description:
      DEFAULT_DESCRIPTION,

    images: [
      {
        url:
          "/twitter-image.png",

        width:
          1200,

        height:
          630,

        alt:
          OG_IMAGE_ALT,
      },
    ],

    ...(xHandle
      ? {
          site:
            xHandle,

          creator:
            xHandle,
        }
      : {}),
  },

  robots: {
    index:
      true,

    follow:
      true,

    nocache:
      false,

    googleBot: {
      index:
        true,

      follow:
        true,

      noimageindex:
        false,

      "max-image-preview":
        "large",

      "max-snippet":
        -1,

      "max-video-preview":
        -1,
    },
  },

  /*
   * Se deja únicamente el favicon que existe.
   *
   * Esto evita los errores:
   * GET /icon-192.png 404
   * GET /icon-512.png 404
   * GET /apple-icon.png 404
   */

  icons: {
    icon: [
      {
        url:
          "/favicon.ico",

        type:
          "image/x-icon",

        sizes:
          "any",
      },
    ],

    shortcut:
      "/favicon.ico",
  },

  other: {
    "geo.region":
      "PE-JUN",

    "geo.placename":
      "Huancayo",

    "content-language":
      "es-PE",

    ...(xHandle
      ? {
          "twitter:site":
            xHandle,
        }
      : {}),
  },
};

/* =========================================================
   TIPOS
========================================================= */

type RootLayoutProps = {
  children:
    ReactNode;
};

/* =========================================================
   ROOT LAYOUT
========================================================= */

export default function RootLayout({
  children,
}: RootLayoutProps) {
  const organizationJsonLd = {
    "@context":
      "https://schema.org",

    "@type": [
      "RealEstateAgent",
      "LocalBusiness",
    ],

    "@id":
      `${siteUrl}/#organization`,

    name:
      BRAND_NAME,

    alternateName: [
      COMPANY_NAME,
      "Inmobiliaria ANCOSUR",
    ],

    description:
      DEFAULT_DESCRIPTION,

    url:
      `${siteUrl}/`,

    logo: {
      "@type":
        "ImageObject",

      url:
        `${siteUrl}/assets/images/ancosur-logo-black.svg`,
    },

    image: {
      "@type":
        "ImageObject",

      url:
        `${siteUrl}/opengraph-image.png`,

      width:
        1200,

      height:
        630,

      caption:
        OG_IMAGE_ALT,
    },

    telephone:
      "+51 971 069 763",

    email:
      "jefe.experiencia.cliente@ancosur.com",

    priceRange:
      "$$",

    currenciesAccepted:
      "PEN",

    paymentAccepted:
      "Efectivo, transferencia bancaria y financiamiento",

    address: {
      "@type":
        "PostalAddress",

      streetAddress:
        "Av. San Carlos 1481",

      addressLocality:
        "Huancayo",

      addressRegion:
        "Junín",

      postalCode:
        "12002",

      addressCountry:
        "PE",
    },

    geo: {
      "@type":
        "GeoCoordinates",

      latitude:
        -12.0651,

      longitude:
        -75.2049,
    },

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

    contactPoint: [
      {
        "@type":
          "ContactPoint",

        telephone:
          "+51 971 069 763",

        email:
          "jefe.experiencia.cliente@ancosur.com",

        contactType:
          "sales",

        areaServed:
          "PE",

        availableLanguage: [
          "Spanish",
        ],
      },
    ],

    sameAs: [
      "https://www.facebook.com/ancosur",
      "https://www.instagram.com/ancosur",
      "https://www.youtube.com/@ancosur",
    ],
  };

  const websiteJsonLd = {
    "@context":
      "https://schema.org",

    "@type":
      "WebSite",

    "@id":
      `${siteUrl}/#website`,

    url:
      `${siteUrl}/`,

    name:
      BRAND_NAME,

    alternateName: [
      COMPANY_NAME,
      "Inmobiliaria ANCOSUR",
    ],

    description:
      DEFAULT_DESCRIPTION,

    inLanguage:
      "es-PE",

    publisher: {
      "@id":
        `${siteUrl}/#organization`,
    },
  };

  const jsonLd = [
    organizationJsonLd,
    websiteJsonLd,
  ];

  return (
    <html
      lang="es-PE"
      className={
        manrope.variable
      }
      data-scroll-behavior="smooth"
    >
      <body>
        <Navbar />

        {children}

        <FloatingActions />

        <FloatingPodcast />

        <FloatingPromo
          href="/promociones"
        />

        <Footer />

        <TawkChat />

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
      </body>
    </html>
  );
}