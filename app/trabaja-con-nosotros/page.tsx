import {
  BriefcaseIcon,
  BuildingsIcon,
} from "@phosphor-icons/react/dist/ssr";

import { createSeoMetadata } from "@/src/lib/seo";

import ConvocatoriaImageViewer from "./ConvocatoriaImageViewer";
import JobApplicationModal from "./JobApplicationModal";

import styles from "./TrabajaPage.module.css";

/* =========================================================
   CONFIGURACIÓN NEXT
========================================================= */

/*
 * Esta página consulta convocatorias que pueden cambiar
 * desde el dashboard.
 *
 * Evitamos que Next deje una versión antigua cacheada.
 */
export const dynamic =
  "force-dynamic";

export const revalidate = 0;

/* =========================================================
   CONFIGURACIÓN API
========================================================= */

const API_BASE_URL =
  process.env.API_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "https://ancosur-api-production.up.railway.app";

/*
 * IMPORTANTE:
 *
 * Este endpoint es SOLO para la web pública.
 *
 * En Go:
 *
 * GET /api/convocatorias/publicas
 *
 * debe usar:
 *
 * WHERE activo = TRUE
 */
const CONVOCATORIAS_URL =
  `${API_BASE_URL}/api/convocatorias/publicas`;

/* =========================================================
   TYPES
========================================================= */

type Convocatoria = {
  id: string;

  titulo: string;

  descripcion: string;

  imagen_nombre?: string;

  imagen_tipo?: string;

  imagen_tamano?: number;

  imagen_url?: string;

  activo?: boolean;

  creado_en: string;

  actualizado_en?: string;
};

type ConvocatoriasResponse = {
  success: boolean;

  total?: number;

  data?: Convocatoria[];

  message?: string;

  error?: string;
};

/* =========================================================
   SEO
========================================================= */

export const metadata =
  createSeoMetadata({
    title:
      "Trabaja con Nosotros | Ancosur Inmobiliaria",

    description:
      "Conoce las oportunidades laborales disponibles en Ancosur Inmobiliaria y postula a nuestra bolsa de trabajo en Huancayo.",

    pathname:
      "/trabaja-con-nosotros",

    keywords: [
      "trabaja con nosotros Ancosur",
      "empleos Ancosur",
      "vacantes Ancosur",
      "trabajo inmobiliaria Huancayo",
      "bolsa de trabajo Huancayo",
      "empleos en Huancayo",
      "oportunidades laborales Huancayo",
      "postular Ancosur",
      "Ancosur",
      "Ancosur Inmobiliaria",
    ],

    image:
      "/opengraph-image.png",
  });

/* =========================================================
   NORMALIZAR URL IMAGEN
========================================================= */

function getConvocatoriaImageUrl(
  convocatoria: Convocatoria
): string {
  const imageUrl =
    convocatoria.imagen_url?.trim();

  if (!imageUrl) {
    return "";
  }

  if (
    imageUrl.startsWith(
      "http://"
    ) ||
    imageUrl.startsWith(
      "https://"
    )
  ) {
    return imageUrl;
  }

  /*
   * La API devuelve algo como:
   *
   * /api/convocatorias/UUID/imagen
   */
  if (
    imageUrl.startsWith("/")
  ) {
    return `${API_BASE_URL}${imageUrl}`;
  }

  return `${API_BASE_URL}/${imageUrl}`;
}

/* =========================================================
   OBTENER CONVOCATORIAS PÚBLICAS
========================================================= */

async function getConvocatorias():
  Promise<Convocatoria[]> {
  try {
    const response =
      await fetch(
        CONVOCATORIAS_URL,
        {
          method:
            "GET",

          headers: {
            Accept:
              "application/json",
          },

          /*
           * Fundamental para que al activar/desactivar
           * desde el dashboard se refleje en la web.
           */
          cache:
            "no-store",
        }
      );

    const raw =
      await response.text();

    let result:
      ConvocatoriasResponse;

    try {
      result =
        raw
          ? JSON.parse(
              raw
            )
          : {
              success:
                false,
            };
    } catch {
      console.error(
        "Respuesta no JSON de convocatorias públicas:",
        raw
      );

      return [];
    }

    if (
      !response.ok ||
      result.success !==
        true
    ) {
      console.error(
        "Error cargando convocatorias públicas:",
        {
          status:
            response.status,

          result,
        }
      );

      return [];
    }

    if (
      !Array.isArray(
        result.data
      )
    ) {
      return [];
    }

    /*
     * SEGUNDA PROTECCIÓN.
     *
     * El backend ya debe hacer:
     *
     * WHERE activo = TRUE
     *
     * Pero además descartamos aquí
     * cualquier registro que accidentalmente
     * llegue como activo = false.
     *
     * Si la propiedad no viene, la aceptamos
     * por compatibilidad.
     */
    return result.data.filter(
      (convocatoria) =>
        convocatoria.activo !==
        false
    );
  } catch (error) {
    console.error(
      "No se pudo conectar con la API de convocatorias públicas:",
      error
    );

    return [];
  }
}

/* =========================================================
   PÁGINA
========================================================= */

export default async function TrabajaPage() {
  const convocatorias =
    await getConvocatorias();

  return (
    <main
      id="main-content"
      className={
        styles.page
      }
    >
      {/* ===================================================
          HERO
      =================================================== */}

      <section
        className={
          styles.hero
        }
        aria-labelledby="trabaja-title"
      >
        <div
          className={
            styles.heroContent
          }
        >
          <span
            className={
              styles.eyebrow
            }
          >
            Bolsa de trabajo Ancosur
          </span>

          <h1
            id="trabaja-title"
          >
            Construye tu futuro
            con nosotros
          </h1>

          <p>
            Buscamos personas con
            talento, compromiso y
            actitud para formar
            parte de una empresa
            inmobiliaria en
            crecimiento.
          </p>
        </div>
      </section>

      {/* ===================================================
          CONVOCATORIAS PÚBLICAS
      =================================================== */}

      <section
        className={
          styles.jobsSection
        }
        aria-labelledby="vacantes-title"
      >
        {/* ===============================================
            HEADER
        =============================================== */}

        <div
          className={
            styles.header
          }
        >
          <span>
            Convocatorias disponibles
          </span>

          <h2
            id="vacantes-title"
          >
            Encuentra una
            oportunidad para crecer
            con nosotros
          </h2>

          <p>
            Conoce nuestras
            convocatorias vigentes
            y envía tu CV
            directamente desde
            nuestra página web.
          </p>
        </div>

        {/* ===============================================
            LISTADO
        =============================================== */}

        {convocatorias.length >
        0 ? (
          <div
            className={
              styles.grid
            }
          >
            {convocatorias.map(
              (
                convocatoria
              ) => {
                const imageUrl =
                  getConvocatoriaImageUrl(
                    convocatoria
                  );

                return (
                  <article
                    key={
                      convocatoria.id
                    }
                    className={
                      styles.card
                    }
                  >
                    {/* =====================================
                        IMAGEN
                    ===================================== */}

                    <div
                      className={
                        styles.jobImageBox
                      }
                    >
                      {imageUrl ? (
                        <ConvocatoriaImageViewer
                          src={
                            imageUrl
                          }
                          alt={
                            convocatoria.titulo
                          }
                        />
                      ) : (
                        <div
                          className={
                            styles.jobImagePlaceholder
                          }
                        >
                          <BriefcaseIcon
                            size={
                              42
                            }
                            weight="duotone"
                            aria-hidden="true"
                          />
                        </div>
                      )}
                    </div>

                    {/* =====================================
                        CONTENIDO
                    ===================================== */}

                    <div
                      className={
                        styles.cardBody
                      }
                    >
                      {/* ===================================
                          TÍTULO / DESCRIPCIÓN
                      =================================== */}

                      <div
                        className={
                          styles.cardHeader
                        }
                      >
                        <span>
                          Oportunidad laboral
                        </span>

                        <h3>
                          {
                            convocatoria.titulo
                          }
                        </h3>

                        <p>
                          {
                            convocatoria.descripcion
                          }
                        </p>
                      </div>

                      {/* ===================================
                          META
                      =================================== */}

                      <div
                        className={
                          styles.meta
                        }
                      >
                        <div>
                          <BuildingsIcon
                            size={
                              17
                            }
                            weight="regular"
                            aria-hidden="true"
                          />

                          <span>
                            Ancosur
                            Inmobiliaria
                          </span>
                        </div>

                        <div>
                          <BriefcaseIcon
                            size={
                              17
                            }
                            weight="regular"
                            aria-hidden="true"
                          />

                          <span>
                            Convocatoria
                            abierta
                          </span>
                        </div>
                      </div>

                      {/* ===================================
                          POSTULAR
                      =================================== */}

                      <div
                        className={
                          styles.cardApplicationArea
                        }
                      >
                        <JobApplicationModal
                          jobId={
                            convocatoria.id
                          }
                          jobTitle={
                            convocatoria.titulo
                          }
                          area={
                            convocatoria.titulo
                          }
                        />
                      </div>
                    </div>
                  </article>
                );
              }
            )}
          </div>
        ) : (
          /* ===============================================
             SIN CONVOCATORIAS
          =============================================== */

          <div
            className={
              styles.emptyState
            }
          >
            <BriefcaseIcon
              size={
                42
              }
              weight="duotone"
              aria-hidden="true"
            />

            <h3>
              Actualmente no
              tenemos convocatorias
              disponibles
            </h3>

            <p>
              Nuevas oportunidades
              laborales serán
              publicadas
              próximamente.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}