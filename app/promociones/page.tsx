import Script from "next/script";

import { createSeoMetadata } from "@/src/lib/seo";

import CyberHero from "./components/CyberHero";
import CyberHouseLeadForm from "./components/CyberHouseLeadForm";
import CuscoPromoHero from "./components/CuscoPromoHero";

import {
  CYBER_HOUSE_END,
  CYBER_HOUSE_LOCATION,
  CYBER_HOUSE_START,
} from "./data";

import styles from "./CyberHousePage.module.css";
import CaminoRealPromoHero from "./components/CaminoRealPromoHero";

/* =========================================================
   CONFIGURACIÓN
========================================================= */

const SITE_URL = "https://ancosur.com";
const PAGE_PATH = "/cyber-house";
const EVENT_URL = `${SITE_URL}${PAGE_PATH}`;

const PAGE_TITLE =
  "Cyber House Ancosur | Evento inmobiliario en Huancayo";

const PAGE_DESCRIPTION =
  "Participa en el Cyber House Ancosur, conoce nuestros proyectos inmobiliarios, recibe asesoría personalizada y accede a beneficios especiales durante el evento.";

const PAGE_IMAGE = "/opengraph-image.png";

/* =========================================================
   SEO
========================================================= */

export const metadata = createSeoMetadata({
  title: PAGE_TITLE,

  description: PAGE_DESCRIPTION,

  pathname: PAGE_PATH,

  keywords: [
    "Cyber House Ancosur",
    "evento inmobiliario Huancayo",
    "feria inmobiliaria Huancayo",
    "promociones inmobiliarias Huancayo",
    "departamentos en Huancayo",
    "lotes en Huancayo",
    "proyectos inmobiliarios Huancayo",
    "asesoría inmobiliaria Huancayo",
    "Ancosur",
    "Ancosur Inmobiliaria",
  ],

  image: PAGE_IMAGE,
});

/* =========================================================
   DATOS ESTRUCTURADOS
========================================================= */

const eventSchema = {
  "@context": "https://schema.org",

  "@type": "Event",

  "@id": `${EVENT_URL}#event`,

  name: "Cyber House Ancosur",

  description: PAGE_DESCRIPTION,

  url: EVENT_URL,

  image: [
    `${SITE_URL}${PAGE_IMAGE}`,
  ],

  startDate: CYBER_HOUSE_START,

  endDate: CYBER_HOUSE_END,

  eventStatus:
    "https://schema.org/EventScheduled",

  eventAttendanceMode:
    "https://schema.org/OfflineEventAttendanceMode",

  location: {
    "@type": "Place",

    name: "Sala de ventas Ancosur",

    address: {
      "@type": "PostalAddress",

      streetAddress:
        CYBER_HOUSE_LOCATION,

      addressLocality:
        "Huancayo",

      addressRegion:
        "Junín",

      addressCountry:
        "PE",
    },
  },

  organizer: {
    "@type": "Organization",

    "@id":
      `${SITE_URL}/#organization`,

    name:
      "Ancosur Inmobiliaria",

    url:
      SITE_URL,
  },

  performer: {
    "@type": "Organization",

    name:
      "Ancosur Inmobiliaria",
  },

  offers: {
    "@type": "Offer",

    url: EVENT_URL,

    price: "0",

    priceCurrency: "PEN",

    availability:
      "https://schema.org/InStock",

    validFrom:
      CYBER_HOUSE_START,
  },

  inLanguage:
    "es-PE",
};

/* =========================================================
   PÁGINA
========================================================= */

export default function CyberHousePage() {
  return (
    <>
      <main
        id="main-content"
        className={styles.page}
      >
        <CaminoRealPromoHero />
        
        <CuscoPromoHero />

        <CyberHero />

        <CyberHouseLeadForm />
      </main>

      <Script
        id="cyber-house-event-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            eventSchema,
          ).replace(
            /</g,
            "\\u003c",
          ),
        }}
      />
    </>
  );
}