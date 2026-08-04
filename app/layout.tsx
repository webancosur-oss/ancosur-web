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

const SITE_NAME =
  "ANCOSUR Inmobiliaria";

/*
 * Título de 48 caracteres aproximadamente.
 * No supera el límite recomendado de 60.
 */
const DEFAULT_TITLE =
  "Departamentos y lotes en Huancayo";

const DEFAULT_DESCRIPTION =
  "Encuentra departamentos, lotes y proyectos inmobiliarios en Huancayo con ANCOSUR. Opciones para vivir, invertir y construir nuevas experiencias.";

const OG_IMAGE_ALT =
  "ANCOSUR Inmobiliaria: departamentos, lotes y proyectos inmobiliarios en Huancayo";

const normalizeSiteUrl = (
  value?: string,
): string => {
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

    /*
     * Fuerza HTTPS para el dominio ANCOSUR.
     */
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
};

const siteUrl = normalizeSiteUrl(
  process.env.SITE_URL,
);


const xHandle =
  process.env.NEXT_PUBLIC_X_HANDLE
    ?.trim();

/* =========================================================
   FUENTE
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

  preload: true,

  fallback: [
    "Arial",
    "Helvetica",
    "sans-serif",
  ],
});

/* =========================================================
   VIEWPORT Y THEME COLOR
========================================================= */

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,

  themeColor: [
    {
      media:
        "(prefers-color-scheme: light)",
      color: "#00a74f",
    },
    {
      media:
        "(prefers-color-scheme: dark)",
      color: "#101024",
    },
  ],

  colorScheme:
    "light dark",
};

/* =========================================================
   METADATA GLOBAL
========================================================= */

export const metadata: Metadata = {
  metadataBase:
    new URL(siteUrl),

  applicationName:
    SITE_NAME,

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
    "departamentos en Huancayo",
    "departamentos en venta Huancayo",
    "departamentos nuevos Huancayo",
    "lotes en Huancayo",
    "lotes en venta Huancayo",
    "terrenos en Huancayo",
    "proyectos inmobiliarios Huancayo",
    "inversión inmobiliaria Huancayo",
    "venta de departamentos Huancayo",
    "venta de lotes Huancayo",
    "Neo Rivera",
    "Neo Xport",
    "Neo Eterna",
    "Neo Balto",
    "Neo Origen",
    "Neo Emperatriz",
    "Moro 416",
    "Distrito San Carlos",
    "Camino Real",
    "Las Colinas de Moro",
    "Zagari Resort Club",
    "compra de departamentos",
    "Venta,Departamento",
    "Huancayo,Venta de Departamentos de Estreno con Cochera - Cerca a Univ. Continental",
    "VENTA DEPARTAMENTO MAS COCHERA",
    "Propiedades",
    "Inmuebles",
    "peru casas",
    "terrenos peru",
    
  ],

  authors: [
    {
      name: SITE_NAME,
      url: siteUrl,
    },
  ],

  creator:
    SITE_NAME,

  publisher:
    SITE_NAME,

  category:
    "Inmobiliaria",

  classification:
    "Bienes raíces y desarrollo inmobiliario",

  referrer:
    "origin-when-cross-origin",

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  alternates: {
    canonical: "/",

    languages: {
      "es-PE": "/",
    },
  },

  openGraph: {
    title:
      DEFAULT_TITLE,

    description:
      DEFAULT_DESCRIPTION,

    url: "/",

    siteName:
      SITE_NAME,

    locale:
      "es_PE",

    type:
      "website",

    /*
     * Estas propiedades funcionan cuando
     * utilizas /public/opengraph-image.png.
     *
     * Si conservas app/opengraph-image.png,
     * Next.js utilizará el archivo especial
     * y sus dimensiones reales.
     */
    images: [
      {
        url:
          "/opengraph-image.png",

        secureUrl:
          `${siteUrl}/opengraph-image.png`,

        width: 1200,
        height: 630,

        alt:
          OG_IMAGE_ALT,

        type:
          "image/png",
      },
    ],
  },

  twitter: {
     site: "@ANCOSUR", 

    creator: "@ANCOSUR", 

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

        width: 1200,
        height: 630,

        alt:
          OG_IMAGE_ALT,
      },
    ],

    /*
     * Next.js soporta creator.
     * Solo se agrega cuando existe una cuenta
     * oficial configurada.
     */
    ...(xHandle
      ? {
          creator: xHandle,
        }
      : {}),
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,

    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,

      "max-image-preview":
        "large",

      "max-snippet": -1,

      "max-video-preview": -1,
    },
  },

  icons: {
    icon: [
      {
        url:
          "/favicon.svg",

        type:
          "image/svg+xml",

        sizes:
          "any",
      },
      {
        url:
          "/favicon.ico",

        type:
          "image/x-icon",

        sizes:
          "any",
      },
      {
        url:
          "/icon-32.png",

        type:
          "image/png",

        sizes:
          "32x32",
      },
      {
        url:
          "/icon-192.png",

        type:
          "image/png",

        sizes:
          "192x192",
      },
      {
        url:
          "/icon-512.png",

        type:
          "image/png",

        sizes:
          "512x512",
      },
    ],

    shortcut:
      "/favicon.ico",

    apple: [
      {
        url:
          "/apple-icon.png",

        type:
          "image/png",

        sizes:
          "180x180",
      },
    ],
  },

  manifest:
    "/manifest.webmanifest",

  other: {
    "geo.region":
      "PE-JUN",

    "geo.placename":
      "Huancayo",

    "content-language":
      "es-PE",

    /*
     * Genera:
     * <meta name="twitter:site" ...>
     *
     * Solo cuando configures el usuario real.
     */
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
  children: ReactNode;
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
      SITE_NAME,

    alternateName:
      "ANCOSUR",

    description:
      DEFAULT_DESCRIPTION,

    url:
      siteUrl,

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

      width: 1200,
      height: 630,

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
  };

  const websiteJsonLd = {
    "@context":
      "https://schema.org",

    "@type":
      "WebSite",

    "@id":
      `${siteUrl}/#website`,

    url:
      siteUrl,

    name:
      SITE_NAME,

    alternateName:
      "ANCOSUR",

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