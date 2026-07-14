import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Manrope } from "next/font/google";
import "./globals.css";
import FloatingActions from "@/components/FloatingActions";
import FloatingPodcast from "@/components/FloatingPodcast";
import Footer from "@/components/Footer";

const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://ancosur-web-production.up.railway.app"
).replace(/\/+$/, "");

const manrope = Manrope({
  variable: "--font-main",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  applicationName: "ANCOSUR Inmobiliaria",

  title: {
    default: "ANCOSUR Inmobiliaria | Departamentos en Huancayo",
    template: "%s | ANCOSUR Inmobiliaria",
  },

  description:
    "ANCOSUR Inmobiliaria desarrolla departamentos, lotes y proyectos inmobiliarios en Huancayo. Encuentra tu próximo hogar o inversión.",

  keywords: [
    "ANCOSUR",
    "ANCOSUR Inmobiliaria",
    "ANCOSUR Huancayo",
    "departamentos en Huancayo",
    "departamentos en venta Huancayo",
    "lotes en Huancayo",
    "lotes en venta Huancayo",
    "proyectos inmobiliarios Huancayo",
    "inmobiliaria en Huancayo",
    "inversión inmobiliaria Huancayo",
    "Neo Rivera",
    "Neo Xport",
    "Neo Eterna",
    "Neo Balto",
    "Distrito San Carlos",
    "Camino Real",
    "Zagari Resort Club",
  ],

  authors: [
    {
      name: "ANCOSUR Inmobiliaria",
      url: siteUrl,
    },
  ],

  creator: "ANCOSUR Inmobiliaria",
  publisher: "ANCOSUR Inmobiliaria",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: "ANCOSUR Inmobiliaria | Departamentos en Huancayo",
    description:
      "Departamentos, lotes y proyectos inmobiliarios en Huancayo para vivir e invertir.",
    url: siteUrl,
    siteName: "ANCOSUR Inmobiliaria",
    locale: "es_PE",
    type: "website",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "ANCOSUR Inmobiliaria - Departamentos en Huancayo",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "ANCOSUR Inmobiliaria | Departamentos en Huancayo",
    description:
      "Encuentra departamentos, lotes y proyectos inmobiliarios en Huancayo.",
    images: ["/twitter-image.png"],
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

  category: "Inmobiliaria",
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "@id": `${siteUrl}/#organization`,
    name: "ANCOSUR Inmobiliaria",
    description:
      "Empresa inmobiliaria dedicada al desarrollo de departamentos, lotes y proyectos inmobiliarios en Huancayo.",
    url: siteUrl,
    logo: {
      "@type": "ImageObject",
      url: `${siteUrl}/assets/images/ancosur-logo-black.svg`,
    },
    image: {
      "@type": "ImageObject",
      url: `${siteUrl}/opengraph-image.png`,
      width: 1200,
      height: 630,
    },
    telephone: "+51 968 658 098",
    email: "jefe.experiencia.cliente@ancosur.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Av. San Carlos 1481",
      addressLocality: "Huancayo",
      addressRegion: "Junín",
      addressCountry: "PE",
    },
    areaServed: {
      "@type": "City",
      name: "Huancayo",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+51 968 658 098",
      contactType: "sales",
      areaServed: "PE",
      availableLanguage: ["Spanish"],
    },
  };

  return (
    <html
      lang="es-PE"
      className={manrope.variable}
      data-scroll-behavior="smooth"
    >
      <body>
        {children}

        <FloatingActions />
        <FloatingPodcast />
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
      </body>
    </html>
  );
}