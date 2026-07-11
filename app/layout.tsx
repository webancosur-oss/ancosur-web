import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import FloatingActions from "@/components/FloatingActions";
import FloatingPodcast from "@/components/FloatingPodcast";

/*
 * URL principal de la web.
 * En producción configura:
 * NEXT_PUBLIC_SITE_URL=https://www.ancosur.com
 */
const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://ancosur-web-production.up.railway.app"
).replace(/\/+$/, "");

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-main",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
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
    "ANCOSUR departamentos",
    "ANCOSUR lotes",
    "ANCOSUR proyectos",
    "ANCOSUR inmobiliaria",
    "ANCOSUR inversión",
    "departamentos ANCOSUR",
    "lotes ANCOSUR",
    "proyectos ANCOSUR",
    "inmobiliaria ANCOSUR",
    "inversión ANCOSUR",
    "departamentos en venta Huancayo",
    "lotes en venta Huancayo",
    "proyectos inmobiliarios Huancayo",
    "inmobiliaria en Huancayo",
    "departamentos en Huancayo",
    "departamentos en venta",
    "lotes en Huancayo",
    "proyectos inmobiliarios",
    "Neo Rivera",
    "Neo Xport",
    "Neo Eterna",
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

interface RootLayoutProps {
  children: React.ReactNode;
}

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
    email: "info@ancosur.com",

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

    /*
     * Agrega aquí solamente las URLs reales de ANCOSUR.
     *
     * sameAs: [
     *   "https://www.facebook.com/TU-PERFIL-REAL",
     *   "https://www.instagram.com/TU-PERFIL-REAL",
     *   "https://www.youtube.com/@TU-CANAL-REAL",
     *   "https://www.linkedin.com/company/TU-PERFIL-REAL",
     * ],
     */
  };

  return (
    <html
      lang="es-PE"
      className={jakarta.variable}
      data-scroll-behavior="smooth"
    >
      <body>
        {children}
          <FloatingActions />
                  <FloatingPodcast />

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