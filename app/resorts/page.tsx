import {
  BuildingsIcon,
  MapPinIcon,
  SparkleIcon,
  WhatsappLogoIcon,
} from "@phosphor-icons/react/dist/ssr";

import Image from "next/image";

import ActionButton from "@/components/buttons/ActionButton";
import { createSeoMetadata } from "@/src/lib/seo";

import ResortsLeadForm from "./components/ResortsLeadForm";

import styles from "./ResortsPage.module.css";

/* =========================================================
   SEO
========================================================= */

export const metadata = createSeoMetadata({
  title:
    "Resorts en Selva Central | ANCOSUR Inmobiliaria",

  description:
    "Conoce los proyectos resort de ANCOSUR en Selva Central. Descubre Zagari Resort Club en San Ramón y próximos desarrollos inmobiliarios en Oxapampa.",

  pathname:
    "/resorts",

  keywords: [
    "resorts Selva Central",
    "resorts San Ramón",
    "resorts Oxapampa",
    "Zagari Resort Club",
    "resort inmobiliario",
    "inversión en resorts",
    "proyectos turísticos Selva Central",
    "inversión inmobiliaria Selva Central",
    "ANCOSUR",
    "ANCOSUR Inmobiliaria",
  ],

  image:
    "/assets/projects/tarjetas/zagari.webp",
});

/* =========================================================
   CONFIGURACIÓN
========================================================= */

const WHATSAPP_NUMBER =
  "51971069763";

type Resort = {
  id: number;

  name: string;

  status: string;

  location: string;

  region: string;

  type: string;

  amenities: string;

  image: string;

  logo: string;

  logoWidth: number;

  logoHeight: number;

  whatsappMessage: string;
};

const resorts: Resort[] = [
  {
    id: 1,

    name:
      "Zagari Resort Club",

    status:
      "EN CONSTRUCCIÓN",

    location:
      "San Ramón",

    region:
      "Selva Central",

    type:
      "Resort Club",

    amenities:
      "+20 amenidades",

    image:
      "/assets/projects/tarjetas/zagari.webp",

    logo:
      "/assets/images/zagari.svg",

    logoWidth:
      180,

    logoHeight:
      70,

    whatsappMessage:
      "Hola, deseo recibir información sobre Zagari Resort Club en San Ramón.",
  },

  {
    id: 2,

    name:
      "Nuevo Resort en Oxapampa",

    status:
      "PRÓXIMAMENTE",

    location:
      "Oxapampa",

    region:
      "Selva Central",

    type:
      "Resort",

    amenities:
      "+20 amenidades",

    image:
      "/assets/projects/tarjetas/proximamente.png",

    logo:
      "/assets/images/zagari.svg",

    logoWidth:
      180,

    logoHeight:
      60,

    whatsappMessage:
      "Hola, deseo recibir información sobre el próximo resort de ANCOSUR en Oxapampa.",
  },
];

/* =========================================================
   WHATSAPP
========================================================= */

function createWhatsAppUrl(
  message: string
): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    message
  )}`;
}

/* =========================================================
   PAGE
========================================================= */

export default function ResortsPage() {
  return (
    <main
      id="main-content"
      className={styles.page}
    >
      <section
        className={
          styles.projectsSection
        }
        aria-labelledby="resorts-title"
      >
        {/* =================================================
            HEADER
        ================================================= */}

        <header
          className={
            styles.sectionHeader
          }
        >
          <span>
            Proyectos resort ANCOSUR
          </span>

          <h1 id="resorts-title">
            Invierte en experiencias
            rodeadas de naturaleza
          </h1>

          <p>
            Conoce nuestros resorts en
            Selva Central, desarrollados
            para disfrutar, descansar e
            invertir en destinos con gran
            potencial turístico.
          </p>
        </header>

        {/* =================================================
            PROYECTOS
        ================================================= */}

        <div
          className={
            styles.grid
          }
        >
          {resorts.map(
            (resort) => {
              const whatsappUrl =
                createWhatsAppUrl(
                  resort.whatsappMessage
                );

              return (
                <article
                  key={
                    resort.id
                  }
                  className={
                    styles.card
                  }
                  aria-label={`${resort.name}, ${resort.type}, ubicado en ${resort.location}, ${resort.region}`}
                >
                  {/* =====================================
                      IMAGEN
                  ====================================== */}

                  <div
                    className={
                      styles.imageBox
                    }
                  >
                    <Image
                      src={
                        resort.image
                      }
                      alt={`${resort.name} ubicado en ${resort.location}, ${resort.region}`}
                      fill
                      priority={
                        resort.id === 1
                      }
                      className={
                        styles.image
                      }
                      sizes="
                        (max-width: 640px) 100vw,
                        (max-width: 1024px) 50vw,
                        420px
                      "
                    />

                    <div
                      className={
                        styles.overlay
                      }
                      aria-hidden="true"
                    />

                    <span
                      className={
                        styles.status
                      }
                    >
                      {
                        resort.status
                      }
                    </span>
                  </div>

                  {/* =====================================
                      CONTENIDO
                  ====================================== */}

                  <div
                    className={
                      styles.content
                    }
                  >
                    {/* LOGO */}

                    <div
                      className={
                        styles.titleArea
                      }
                    >
                      <div
                        className={
                          styles.logoContainer
                        }
                        role="img"
                        aria-label={`Logo de ${resort.name}`}
                      >
                        <Image
                          src={
                            resort.logo
                          }
                          alt={`Logo oficial de ${resort.name}`}
                          width={
                            resort.logoWidth
                          }
                          height={
                            resort.logoHeight
                          }
                          className={
                            styles.logo
                          }
                        />
                      </div>

                      <span
                        className={
                          styles.srOnly
                        }
                      >
                        {
                          resort.name
                        }
                      </span>
                    </div>

                    {/* UBICACIÓN */}

                    <div
                      className={
                        styles.location
                      }
                    >
                      <strong>
                        {
                          resort.location
                        }
                      </strong>

                      <span>
                        {
                          resort.region
                        }
                      </span>
                    </div>

                    {/* CARACTERÍSTICAS */}

                    <div
                      className={
                        styles.features
                      }
                    >
                      <div
                        className={
                          styles.feature
                        }
                      >
                        <BuildingsIcon
                          size={
                            21
                          }
                          weight="regular"
                          aria-hidden="true"
                        />

                        <span>
                          {
                            resort.type
                          }
                        </span>
                      </div>

                      <div
                        className={
                          styles.feature
                        }
                      >
                        <SparkleIcon
                          size={
                            21
                          }
                          weight="regular"
                          aria-hidden="true"
                        />

                        <span>
                          {
                            resort.amenities
                          }
                        </span>
                      </div>
                    </div>

                    {/* UBICACIÓN DETALLADA */}

                    <div
                      className={
                        styles.locationDetail
                      }
                    >
                      <MapPinIcon
                        size={
                          18
                        }
                        weight="fill"
                        aria-hidden="true"
                      />

                      <span>
                        {
                          resort.location
                        }
                        ,{" "}
                        {
                          resort.region
                        }
                      </span>
                    </div>
                  </div>

                  {/* =====================================
                      WHATSAPP
                  ====================================== */}

                  <div
                    className={
                      styles.buttonArea
                    }
                  >
                    <ActionButton
                      href={
                        whatsappUrl
                      }
                      variant="primary"
                      size="md"
                      fullWidth
                      iconPosition="right"
                    >
                      <span>
                        Solicitar
                        información
                      </span>

                      <WhatsappLogoIcon
                        size={
                          19
                        }
                        weight="fill"
                        aria-hidden="true"
                      />
                    </ActionButton>
                  </div>
                </article>
              );
            }
          )}
        </div>

       <ResortsLeadForm />
      </section>
    </main>
  );
}