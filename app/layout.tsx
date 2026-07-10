import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ancosur-web-production.up.railway.app";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "ANCOSUR Inmobiliaria | Departamentos en Huancayo",
    template: "%s | ANCOSUR Inmobiliaria",
  },

  description:
    "ANCOSUR Inmobiliaria desarrolla departamentos, lotes y proyectos inmobiliarios en Huancayo. Encuentra tu próximo hogar o inversión.",

  keywords: [
    "ANCOSUR",
    "inmobiliaria en Huancayo",
    "departamentos en Huancayo",
    "departamentos en venta",
    "lotes en Huancayo",
    "proyectos inmobiliarios",
    "Neo Rivera",
    "Neo Xport",
    "Neo Eterna",
  ],

  authors: [{ name: "ANCOSUR Inmobiliaria" }],
  creator: "ANCOSUR Inmobiliaria",
  publisher: "ANCOSUR Inmobiliaria",

  alternates: {
    canonical: "http://localhost:3000",
  },

openGraph: {
  title: "ANCOSUR Inmobiliaria | Departamentos en Huancayo",
  description:
    "Departamentos, lotes y proyectos inmobiliarios en Huancayo para vivir e invertir.",
  url: "/",
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


};

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: "ANCOSUR Inmobiliaria",
    url: siteUrl,
    logo: `${siteUrl}/assets/images/logo-ancosur.png`,
    image: `${siteUrl}/opengraph-image.png`,
    telephone: "+51 968658098",
    email: "info@ancosur.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Av. San Carlos 1481",
      addressLocality: "Huancayo",
      addressRegion: "Junín",
      addressCountry: "PE",
    },
    sameAs: [
      "https://www.facebook.com/",
      "https://www.instagram.com/",
      "https://www.youtube.com/",
      "https://www.linkedin.com/",
    ],
  };
return (
  <html lang="es" className={`${manrope.variable} h-full antialiased`}>
    <body className="min-h-full flex flex-col">
      {children}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />
    </body>
  </html>
);
}