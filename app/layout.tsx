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

const PRODUCTION_URL = "https://ancosur.com";

const SITE_NAME = "Ancosur Inmobiliaria";

const DEFAULT_TITLE =
  "Departamentos y lotes en Huancayo";

const DEFAULT_DESCRIPTION =
  "Encuentra departamentos, lotes y proyectos inmobiliarios en Huancayo con Ancosur. Opciones para vivir, invertir y construir nuevas experiencias.";

const OG_IMAGE_ALT =
  "Ancosur Inmobiliaria: departamentos, lotes y proyectos inmobiliarios en Huancayo";

/* =========================================================
   NORMALIZACIÓN DE LA URL
========================================================= */

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
    const parsedUrl = new URL(normalizedValue);

    const isLocalhost =
      parsedUrl.hostname === "localhost" ||
      parsedUrl.hostname === "127.0.0.1";

    if (
      process.env.NODE_ENV === "production" &&
      isLocalhost
    ) {
      return PRODUCTION_URL;
    }

    if (
      parsedUrl.hostname === "ancosur.com" ||
      parsedUrl.hostname === "www.ancosur.com"
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
  process.env.NEXT_PUBLIC_X_HANDLE?.trim();

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
   VIEWPORT
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

  colorScheme: "light dark",
};

/* =========================================================
   METADATA GLOBAL

   IMPORTANTE:
   No se coloca canonical aquí.

   Cada página define su propia canonical.
========================================================= */

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  applicationName: SITE_NAME,

  title: {
    default: DEFAULT_TITLE,

    template: "%s | Ancosur",
  },

  description: DEFAULT_DESCRIPTION,

  keywords: [
    "Ancosur",
    "Ancosur Inmobiliaria",
    "Ancosur Huancayo",
    "inmobiliaria en Huancayo",
    "inmobiliaria Huancayo",
    "departamentos en Huancayo",
    "departamentos en venta Huancayo",
    "departamentos nuevos Huancayo",
    "venta de departamentos Huancayo",
    "lotes en Huancayo",
    "lotes en venta Huancayo",
    "terrenos en Huancayo",
    "terrenos en venta Huancayo",
    "proyectos inmobiliarios Huancayo",
    "inversión inmobiliaria Huancayo",
    "venta de propiedades Huancayo",
    "bienes raíces Huancayo",
  ],

  authors: [
    {
      name: SITE_NAME,
      url: siteUrl,
    },
  ],

  creator: SITE_NAME,

  publisher: SITE_NAME,

  category: "Inmobiliaria",

  classification:
    "Bienes raíces y desarrollo inmobiliario",

  referrer:
    "origin-when-cross-origin",

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  /*
   * No colocar aquí:
   *
   * alternates: {
   *   canonical: "/"
   * }
   *
   * Porque haría que las páginas internas pudieran
   * apuntar incorrectamente hacia la portada.
   */

  openGraph: {
    title: DEFAULT_TITLE,

    description: DEFAULT_DESCRIPTION,

    /*
     * No colocar url: "/" globalmente.
     *
     * Cada página tendrá su propia URL.
     */

    siteName: SITE_NAME,

    locale: "es_PE",

    type: "website",

    images: [
      {
        url: "/opengraph-image.png",

        secureUrl:
          `${siteUrl}/opengraph-image.png`,

        width: 1200,

        height: 630,

        alt: OG_IMAGE_ALT,

        type: "image/png",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: DEFAULT_TITLE,

    description: DEFAULT_DESCRIPTION,

    images: [
      {
        url: "/twitter-image.png",

        width: 1200,

        height: 630,

        alt: OG_IMAGE_ALT,
      },
    ],

    ...(xHandle
      ? {
          site: xHandle,
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

      "max-image-preview": "large",

      "max-snippet": -1,

      "max-video-preview": -1,
    },
  },

  icons: {
    icon: [
      {
        url: "/favicon.ico",

        type: "image/x-icon",

        sizes: "any",
      },
      
      {
        url: "/icon-192.png",

        type: "image/png",

        sizes: "192x192",
      },
      {
        url: "/icon-512.png",

        type: "image/png",

        sizes: "512x512",
      },
    ],

    shortcut: "/favicon.ico",

    apple: [
      {
        url: "/apple-icon.png",

        type: "image/png",

        sizes: "180x180",
      },
    ],
  },

  manifest: "/manifest.webmanifest",

  other: {
    "geo.region": "PE-JUN",

    "geo.placename": "Huancayo",

    "content-language": "es-PE",

    ...(xHandle
      ? {
          "twitter:site": xHandle,
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
    "@context": "https://schema.org",

    "@type": [
      "RealEstateAgent",
      "LocalBusiness",
    ],

    "@id":
      `${siteUrl}/#organization`,

    name: SITE_NAME,

    alternateName: "Ancosur",

    description: DEFAULT_DESCRIPTION,

    url: siteUrl,

    logo: {
      "@type": "ImageObject",

      url:
        `${siteUrl}/assets/images/ancosur-logo-black.svg`,
    },

    image: {
      "@type": "ImageObject",

      url:
        `${siteUrl}/opengraph-image.png`,

      width: 1200,

      height: 630,

      caption: OG_IMAGE_ALT,
    },

    telephone:
      "+51 971 069 763",

    email:
      "jefe.experiencia.cliente@ancosur.com",

    priceRange: "$$",

    currenciesAccepted: "PEN",

    paymentAccepted:
      "Efectivo, transferencia bancaria y financiamiento",

    address: {
      "@type": "PostalAddress",

      streetAddress:
        "Av. San Carlos 1481",

      addressLocality: "Huancayo",

      addressRegion: "Junín",

      postalCode: "12002",

      addressCountry: "PE",
    },

    geo: {
      "@type": "GeoCoordinates",

      latitude: -12.0651,

      longitude: -75.2049,
    },

    areaServed: [
      {
        "@type": "City",

        name: "Huancayo",
      },
      {
        "@type":
          "AdministrativeArea",

        name: "Junín",
      },
      {
        "@type": "Country",

        name: "Perú",
      },
    ],

    contactPoint: [
      {
        "@type": "ContactPoint",

        telephone:
          "+51 971 069 763",

        email:
          "jefe.experiencia.cliente@ancosur.com",

        contactType: "sales",

        areaServed: "PE",

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
    "@context": "https://schema.org",

    "@type": "WebSite",

    "@id":
      `${siteUrl}/#website`,

    url: siteUrl,

    name: SITE_NAME,

    alternateName: "Ancosur",

    description: DEFAULT_DESCRIPTION,

    inLanguage: "es-PE",

    publisher: {
      "@id":
        `${siteUrl}/#organization`,
    },

    potentialAction: {
      "@type": "SearchAction",

      target: {
        "@type": "EntryPoint",

        urlTemplate:
          `${siteUrl}/proyectos?search={search_term_string}`,
      },

      "query-input":
        "required name=search_term_string",
    },
  };

  const jsonLd = [
    organizationJsonLd,
    websiteJsonLd,
  ];

  return (
    <html
      lang="es-PE"
      className={manrope.variable}
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
            __html: JSON.stringify(
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