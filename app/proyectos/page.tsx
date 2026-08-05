import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";

import ProjectFilter from "@/components/ProjectFilter";
import { createSeoMetadata } from "@/src/lib/seo";

import ProyectosLeadForm from "./ProyectosLeadForm";

import styles from "./ProyectosPage.module.css";

/* =========================================================
   SEO
========================================================= */

export const metadata = createSeoMetadata({
  title:
    "Proyectos inmobiliarios en Huancayo | Ancosur",

  description:
    "Encuentra departamentos, lotes, resorts y proyectos inmobiliarios en Huancayo con Ancosur. Opciones para vivir, invertir y construir tu futuro.",

  pathname: "/proyectos",

  keywords: [
    "proyectos inmobiliarios Huancayo",
    "departamentos Huancayo",
    "lotes Huancayo",
    "resorts inmobiliarios",
    "inversión inmobiliaria Huancayo",
    "departamentos en preventa",
    "departamentos en construcción",
    "departamentos entrega inmediata",
    "lotes en venta Huancayo",
    "Ancosur",
    "Ancosur Inmobiliaria",
    "Neo Rivera",
    "Neo Balto",
    "Neo Eterna",
    "Distrito San Carlos",
    "Neo Xport",
    "Moro 416",
    "Neo Origen",
    "Camino Real",
    "Las Colinas de Moro",
    "Zagari Resort Club",
  ],

  image: "/opengraph-image.png",
});

/* =========================================================
   PÁGINA
========================================================= */

export default function ProyectosPage() {
  return (
    <main
      id="main-content"
      className={styles.page}
    >
      <section
        className={styles.hero}
        aria-labelledby="proyectos-title"
      >
        <div className={styles.heroContent}>
          <span>
            Proyectos Ancosur
          </span>

          <h1 id="proyectos-title">
            Encuentra tu próximo hogar o inversión
          </h1>

          <p>
            Explora departamentos, lotes y resorts pensados para
            vivir mejor, invertir con respaldo y construir tu futuro.
          </p>

          <div className={styles.heroActions}>
            <a
              href="#proyectos"
              className={styles.primaryButton}
            >
              Ver proyectos

              <ArrowRightIcon
                size={18}
                weight="bold"
                aria-hidden="true"
              />
            </a>

            <a
              href="#asesoria"
              className={styles.secondaryButton}
            >
              Solicitar asesoría
            </a>
          </div>
        </div>
      </section>

      <section
        id="proyectos"
        aria-label="Listado de proyectos inmobiliarios Ancosur"
      >
        <ProjectFilter
          eyebrow="Proyectos Ancosur"
          title="Encuentra el proyecto ideal para ti"
          description="Filtra nuestros proyectos según su etapa comercial y elige la mejor opción para vivir, invertir o construir."
          visibleLimit={12}
          showFilters={true}
          showResultsInfo={true}
          showCta={false}
          initialFilterId="pre-venta"
          filterGroups={[
            {
              id: "pre-venta",
              label: "Preventa",
              projectNames: [
                "Neo Rivera",
                "Neo Balto",
                "Neo Eterna",
                "Distrito San Carlos",
              ],
            },
            {
              id: "en-construccion",
              label: "En construcción",
              projectNames: [
                "Neo Xport",
                "Moro 416",
                "Zagari",
                "Zagari Resort Club",
                "Camino Real",
              ],
            },
            {
              id: "entrega-inmediata",
              label: "Entrega inmediata",
              projectNames: [
                "Neo Origen",
                "Las Colinas de Moro",
                "Las Terrazas de Concepción",
              ],
            },
            {
              id: "entregados",
              label: "Entregados",
              statuses: ["ENTREGADO"],
            },
          ]}
        />
      </section>

      <section
        className={styles.leadSection}
        id="asesoria"
        aria-labelledby="proyectos-lead-title"
      >
        <div className={styles.leadContent}>
          <span>
            Asesoría personalizada
          </span>

          <h2 id="proyectos-lead-title">
            Encuentra el proyecto que va contigo
          </h2>

          <p>
            Déjanos tus datos y te ayudamos a elegir la mejor opción
            según tu estilo de vida, presupuesto y objetivo de compra.
          </p>

          <div className={styles.leadMiniList}>
            <span>
              Respuesta rápida por WhatsApp
            </span>

            <span>
              Opciones para vivir o invertir
            </span>
          </div>
        </div>

        <ProyectosLeadForm />
      </section>
    </main>
  );
}