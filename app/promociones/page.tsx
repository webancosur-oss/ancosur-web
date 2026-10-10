import { ORGANIZATION_ID } from "@/src/organization";
import {
  createSeoMetadata,
  SITE_NAME,
  SITE_URL,
} from "@/src/seo";

import PromoFeature from "./components/PromoFeature";
import PromotionsGrid from "./components/PromotionsGrid";
import PromotionsHero from "./components/PromotionsHero";
import PromotionsLeadForm from "./components/PromotionsLeadForm";

import {
  getActivePromotions,
  SHOWROOM_ADDRESS,
  SHOWROOM_END,
  SHOWROOM_LOCATION,
  SHOWROOM_START,
} from "./data";

import styles from "./PromocionesPage.module.css";

/* Se regenera cada hora: las promociones vencidas
   desaparecen sin necesidad de un nuevo deploy. */
export const revalidate = 3600;

const PAGE_PATH = "/promociones";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;

/* =========================================================
   SEO
========================================================= */

export const metadata = createSeoMetadata({
  title: "Promociones inmobiliarias en Huancayo | ANCOSUR",

  description:
    "Promociones de ANCOSUR en departamentos y lotes en Huancayo: beneficios de octubre, Showroom inmobiliario y asesoría personalizada en sala de ventas.",

  pathname: PAGE_PATH,

  keywords: [
    "promociones Ancosur",
    "promociones inmobiliarias Huancayo",
    "showroom inmobiliario Huancayo",
    "lotes Camino Real promoción",
    "departamentos en Huancayo",
    "lotes en Huancayo",
    "Ancosur",
  ],
});

/* =========================================================
   PÁGINA
========================================================= */

export default function PromocionesPage() {
  const promotions = getActivePromotions();

  const showroomActive = promotions.some(
    (promotion) => promotion.id === "showroom",
  );

  /* Evento real del Showroom; solo mientras esté vigente */
  const showroomSchema = {
    "@context": "https://schema.org",

    "@type": "Event",

    "@id": `${PAGE_URL}#showroom`,

    name: "Showroom inmobiliario Ancosur",

    description:
      "Conoce todos los proyectos de Ancosur en un solo lugar, con asesoría personalizada y las promociones de octubre.",

    url: `${PAGE_URL}#showroom`,

    image: [`${SITE_URL}/assets/campanias/showroom-17-octubre.webp`],

    startDate: SHOWROOM_START,

    endDate: SHOWROOM_END,

    eventStatus: "https://schema.org/EventScheduled",

    eventAttendanceMode:
      "https://schema.org/OfflineEventAttendanceMode",

    isAccessibleForFree: true,

    location: {
      "@type": "Place",

      name: SHOWROOM_LOCATION,

      address: {
        "@type": "PostalAddress",
        streetAddress: SHOWROOM_ADDRESS.split(",")[0],
        addressLocality: "Huancayo",
        addressRegion: "Junín",
        addressCountry: "PE",
      },
    },

    organizer: {
      "@type": "Organization",
      "@id": ORGANIZATION_ID,
      name: SITE_NAME,
      url: `${SITE_URL}/`,
    },

    inLanguage: "es-PE",
  };

  return (
    <>
      <main
        id="main-content"
        className={styles.page}
      >
        <PromotionsHero promotions={promotions} />

        {promotions.length > 0 ? (
          <>
            <PromotionsGrid promotions={promotions} />

            {promotions.map((promotion, index) => (
              <PromoFeature
                key={promotion.id}
                promotion={promotion}
                reverse={index % 2 === 1}
              />
            ))}
          </>
        ) : (
          <section className={styles.empty}>
            <h2>Pronto tendremos nuevas promociones</h2>
            <p>
              Déjanos tus datos y te avisaremos de las
              próximas campañas y eventos de Ancosur.
            </p>
          </section>
        )}

        <PromotionsLeadForm
          promotions={promotions.map(({ id, name }) => ({
            id,
            name,
          }))}
        />
      </main>

      {showroomActive && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(showroomSchema).replace(
              /</g,
              "\\u003c",
            ),
          }}
        />
      )}
    </>
  );
}
