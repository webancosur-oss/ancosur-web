import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Manrope } from "next/font/google";

import "./globals.css";

import FloatingActions from "@/components/FloatingActions";
import FloatingPodcast from "@/components/FloatingPodcast";
import FloatingPromo from "@/components/FloatingPromo/FloatingPromo";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const rawSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://ancosur.com";

const siteUrl = rawSiteUrl.replace(/\/+$/, "");

const siteName = "ANCOSUR Inmobiliaria";

const defaultTitle =
  "ANCOSUR Inmobiliaria | Departamentos, lotes y proyectos en Huancayo";

const defaultDescription =
  "ANCOSUR desarrolla departamentos, lotes y proyectos inmobiliarios en Huancayo. Encuentra tu próximo hogar o una oportunidad de inversión inmobiliaria.";

const defaultOgImage = "/opengraph-image.png";
const defaultTwitterImage = "/twitter-image.png";

const manrope = Manrope({
  variable: "--font-main",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: true,
  fallback: ["Arial", "Helvetica", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  applicationName: siteName,

  title: {
    default: defaultTitle,
    template: "%s | ANCOSUR Inmobiliaria",
  },

  description: defaultDescription,

  keywords: [
    "ANCOSUR",
    "ANCOSUR Inmobiliaria",
    "ANCOSUR Huancayo",
    "inmobiliaria en Huancayo",
    "inmobiliaria Huancayo",
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
  ],

  authors: [
    {
      name: siteName,
      url: siteUrl,
    },
  ],

  creator: siteName,
  publisher: siteName,
  category: "Inmobiliaria",
  classification: "Bienes raíces y desarrollo inmobiliario",
  referrer: "origin-when-cross-origin",

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  alternates: {
    canonical: siteUrl,
    languages: {
      "es-PE": siteUrl,
    },
  },

  openGraph: {
    title: defaultTitle,
    description: defaultDescription,
    url: siteUrl,
    siteName,
    locale: "es_PE",
    type: "website",
    images: [
      {
        url: defaultOgImage,
        width: 1200,
        height: 630,
        alt: "ANCOSUR Inmobiliaria - Departamentos, lotes y proyectos inmobiliarios en Huancayo",
        type: "image/png",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
    images: [
      {
        url: defaultTwitterImage,
        width: 1200,
        height: 630,
        alt: "ANCOSUR Inmobiliaria - Proyectos inmobiliarios en Huancayo",
      },
    ],
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
        sizes: "any",
      },
      {
        url: "/icon.png",
        type: "image/png",
        sizes: "512x512",
      },
    ],
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
  },
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({
  children,
}: RootLayoutProps) {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": ["RealEstateAgent", "LocalBusiness"],
    "@id": `${siteUrl}/#organization`,
    name: siteName,
    alternateName: "ANCOSUR",
    description: defaultDescription,
    url: siteUrl,
    logo: {
      "@type": "ImageObject",
      url: `${siteUrl}/assets/images/ancosur-logo-black.svg`,
    },
    image: {
      "@type": "ImageObject",
      url: `${siteUrl}${defaultOgImage}`,
      width: 1200,
      height: 630,
    },
    telephone: "+51 968 658 098",
    email: "jefe.experiencia.cliente@ancosur.com",
    priceRange: "$$",
    currenciesAccepted: "PEN",
    paymentAccepted:
      "Efectivo, transferencia bancaria y financiamiento",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Av. San Carlos 1481",
      addressLocality: "Huancayo",
      addressRegion: "Junín",
      addressCountry: "PE",
    },
    areaServed: [
      {
        "@type": "City",
        name: "Huancayo",
      },
      {
        "@type": "AdministrativeArea",
        name: "Junín",
      },
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+51 968 658 098",
        email: "jefe.experiencia.cliente@ancosur.com",
        contactType: "sales",
        areaServed: "PE",
        availableLanguage: ["Spanish"],
      },
    ],
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    url: siteUrl,
    name: siteName,
    description: defaultDescription,
    inLanguage: "es-PE",
    publisher: {
      "@id": `${siteUrl}/#organization`,
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
        <FloatingPromo href="/promociones" />
        <Footer />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(
              /</g,
              "\\u003c",
            ),
          }}
        />
      </body>
    </html>
  );
}