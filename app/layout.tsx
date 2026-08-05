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
  metadataBase: new URL(
    "https://ancosur.com",
  ),

  applicationName: "ANCOSUR",

  title: {
    default:
      "Departamentos y lotes en Huancayo | ANCOSUR",

    template:
      "%s | ANCOSUR",
  },

  description:
    "Encuentra departamentos, lotes y proyectos inmobiliarios en Huancayo con ANCOSUR. Conoce opciones para vivir, invertir y adquirir una propiedad segura.",

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
      name: "ANCOSUR Inmobiliaria",
      url: "https://ancosur.com",
    },
  ],

  creator:
    "ANCOSUR Inmobiliaria",

  publisher:
    "ANCOSUR Inmobiliaria",

  category:
    "Bienes raíces",

  openGraph: {
    title:
      "Departamentos y lotes en Huancayo | ANCOSUR",

    description:
      "Encuentra departamentos, lotes y proyectos inmobiliarios en Huancayo con ANCOSUR. Conoce opciones para vivir e invertir.",

    url:
      "https://ancosur.com/",

    siteName:
      "ANCOSUR",

    locale:
      "es_PE",

    type:
      "website",

    images: [
      {
        url:
          "/opengraph-image.png",

        width:
          1200,

        height:
          630,

        alt:
          "ANCOSUR: departamentos, lotes y proyectos inmobiliarios en Huancayo",
      },
    ],
  },

  twitter: {
    card:
      "summary_large_image",

    title:
      "Departamentos y lotes en Huancayo | ANCOSUR",

    description:
      "Encuentra departamentos, lotes y proyectos inmobiliarios en Huancayo con ANCOSUR.",

    images: [
      "/opengraph-image.png",
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

  icons: {
    icon:
      "/favicon.ico",

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
      "https://ancosur.com/#organization",

    name:
      "ANCOSUR",

    alternateName:
      "ANCOSUR Inmobiliaria",

    url:
      "https://ancosur.com/",

    logo:
      "https://ancosur.com/assets/images/ancosur-logo-black.svg",

    image:
      "https://ancosur.com/opengraph-image.png",

    description:
      "Empresa inmobiliaria dedicada al desarrollo y comercialización de departamentos, lotes y proyectos inmobiliarios en Huancayo y otras zonas del Perú.",

    telephone:
      "+51 971 069 763",

    email:
      "jefe.experiencia.cliente@ancosur.com",

    priceRange:
      "$$",

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

    contactPoint: {
      "@type":
        "ContactPoint",

      telephone:
        "+51 971 069 763",

      contactType:
        "sales",

      areaServed:
        "PE",

      availableLanguage:
        "Spanish",
    },

    sameAs: [
      "https://www.facebook.com/ancosur",
      "https://www.instagram.com/ancosur",
      "https://www.youtube.com/@ancosur",
    ],
  };

  const websiteSchema = {
    "@context":
      "https://schema.org",

    "@type":
      "WebSite",

    "@id":
      "https://ancosur.com/#website",

    url:
      "https://ancosur.com/",

    name:
      "ANCOSUR",

    alternateName:
      "ANCOSUR Inmobiliaria",

    description:
      "Departamentos, lotes y proyectos inmobiliarios en Huancayo.",

    inLanguage:
      "es-PE",

    publisher: {
      "@id":
        "https://ancosur.com/#organization",
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
                structuredData,
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