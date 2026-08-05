import ProjectFilter from "@/components/ProjectFilter";

import { createSeoMetadata } from "@/src/lib/seo";

import DepartamentosLeadForm from "./DepartamentosLeadForm";
import DeliveredProjectsSection from "./components/DeliveredProjectsSection";

import { projects } from "@/data/projects";

import styles from "./DepartamentosPage.module.css";

const deliveredProjects = projects
  .filter(
    (project) =>
      project.type === "Departamento" &&
      project.status === "ENTREGADO",
  )
  .slice(0, 3)
  .map((project) => ({
    id: project.id,
    name: project.name,
    image: project.image,
    type: "Departamentos",
    href: project.href,
  }));

/* =========================================================
   SEO
========================================================= */

export const metadata = createSeoMetadata({
  title:
    "Departamentos en Huancayo",

  description:
    "Encuentra departamentos en preventa, construcción y entrega inmediata en Huancayo con ANCOSUR Inmobiliaria. Conoce proyectos modernos para vivir o invertir.",

  pathname:
    "/departamentos",

  keywords: [
    "ANCOSUR",
    "ANCOSUR Inmobiliaria",
    "departamentos Huancayo",
    "departamentos en Huancayo",
    "departamentos en venta Huancayo",
    "departamentos nuevos Huancayo",
    "departamentos de estreno Huancayo",
    "departamentos en preventa Huancayo",
    "departamentos en construcción Huancayo",
    "departamentos entrega inmediata Huancayo",
    "comprar departamento Huancayo",
    "proyectos inmobiliarios Huancayo",
    "inversión inmobiliaria Huancayo",
    "Moro 416",
    "Neo Rivera",
    "Neo Balto",
    "Neo Xport",
    "Neo Origen",
    "Neo Eterna",
    "Distrito San Carlos",
  ],

  image:
    "/assets/images/opengraph/departamentos.webp",
});

/* =========================================================
   PÁGINA
========================================================= */

export default function DepartamentosPage() {
  return (
    <main
      id="main-content"
      className={styles.page}
    >
      <ProjectFilter
        eyebrow="Departamentos ANCOSUR"
        title="Elige tu próximo hogar"
        description="Descubre proyectos diseñados para elevar tu estilo de vida y recibe asesoría personalizada para elegir la mejor inversión."
        projectTypes={[
          "Departamento",
        ]}
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
            label:
              "En construcción",
            projectNames: [
              "Neo Xport",
              "Moro 416",
            ],
          },
          {
            id:
              "entrega-inmediata",
            label:
              "Entrega inmediata",
            projectNames: [
              "Neo Origen",
            ],
          },
        ]}
      />

      <DeliveredProjectsSection
        projects={
          deliveredProjects
        }
        limit={3}
        eyebrow="Departamentos entregados"
        title="Proyectos entregados que respaldan nuestra experiencia"
        description="Conoce algunos de los proyectos desarrollados y entregados por ANCOSUR en Huancayo."
        ctaHref="/proyectos-entregados"
        ctaLabel="Ver más proyectos entregados"
      />

      <section
        className={
          styles.leadSection
        }
        id="asesoria"
        aria-labelledby="departamentos-lead-title"
      >
        <div
          className={
            styles.leadContent
          }
        >
          <span>
            Asesoría personalizada
          </span>

          <h2 id="departamentos-lead-title">
            Encuentra el departamento que va contigo
          </h2>

          <p>
            Déjanos tus datos y un asesor te ayudará a elegir la mejor opción según tus necesidades, presupuesto y estilo de vida.
          </p>

          <div
            className={
              styles.leadMiniList
            }
          >
            <span>
              Respuesta rápida por WhatsApp
            </span>

            <span>
              Opciones para vivir o invertir
            </span>
          </div>
        </div>

        <DepartamentosLeadForm />
      </section>
    </main>
  );
}