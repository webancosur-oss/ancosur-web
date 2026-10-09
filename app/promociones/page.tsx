import {
  ORGANIZATION_ID,
} from "@/src/organization";
import {
  createSeoMetadata,
  DEFAULT_OG_IMAGE,
  SITE_NAME,
  SITE_URL,
} from "@/src/seo";

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
import ShowRoomPromo from "./components/ShowroomPromoHero";

/* =========================================================
   CONFIGURACIÓN
========================================================= */

const PAGE_PATH = "/promociones";
const EVENT_URL = `${SITE_URL}${PAGE_PATH}`;

const PAGE_TITLE =
  "Promociones inmobiliarias en Huancayo | ANCOSUR";

const PAGE_DESCRIPTION =
  "Promociones vigentes de ANCOSUR en departamentos y lotes en Huancayo: descuentos, beneficios especiales y asesoría personalizada en el showroom.";

const EVENT_DESCRIPTION =
  "Participa en el Cyber House Ancosur, conoce nuestros proyectos inmobiliarios, recibe asesoría personalizada y accede a beneficios especiales durante el evento.";

const PAGE_IMAGE = DEFAULT_OG_IMAGE;

/* El esquema Event solo se publica mientras el evento no
   haya terminado: un evento pasado marcado como
   "EventScheduled" es información falsa para Google. */
const IS_EVENT_ACTIVE =
  new Date(CYBER_HOUSE_END).getTime() > Date.now();

/* =========================================================
   SEO
========================================================= */

export const metadata = createSeoMetadata({
  title: PAGE_TITLE,

  description: PAGE_DESCRIPTION,

  pathname: PAGE_PATH,

  keywords: [
    "promociones Ancosur",
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

  description: EVENT_DESCRIPTION,

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
      ORGANIZATION_ID,

    name:
      SITE_NAME,

    url:
      `${SITE_URL}/`,
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

        <ShowRoomPromo />
        
        <CaminoRealPromoHero />
        
        <CuscoPromoHero />

        <CyberHero />

        <CyberHouseLeadForm />
      </main>

      {IS_EVENT_ACTIVE && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              eventSchema,
            ).replace(
              /</g,
              "\\u003c",
            ),
          }}
        />
      )}
    </>
  );
}