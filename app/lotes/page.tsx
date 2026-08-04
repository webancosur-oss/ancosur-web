import ProjectFilter from "@/components/ProjectFilter";

import { createSeoMetadata } from "@/src/lib/seo";

import LotesLeadSection from "./components/LotesLeadSection";

import styles from "./LotesPage.module.css";

/* =========================================================
   SEO
========================================================= */

export const metadata = createSeoMetadata({
  title: "Lotes en Huancayo | ANCOSUR Inmobiliaria",

  description:
    "Encuentra lotes en venta en Huancayo, La Huaycha, Concepción y otras zonas de crecimiento con ANCOSUR Inmobiliaria.",

  pathname: "/lotes",

  keywords: [
    "lotes en Huancayo",
    "lotes Huancayo",
    "terrenos en Huancayo",
    "lotes en venta Huancayo",
    "terrenos en venta Huancayo",
    "lotes en Concepción",
    "lotes en La Huaycha",
    "comprar lote Huancayo",
    "comprar terreno Huancayo",
    "proyectos de lotes",
    "inversión en terrenos",
    "Camino Real",
    "Las Colinas de Moro",
    "Las Terrazas de Concepción",
    "Zagari Resort Club",
    "ANCOSUR",
    "ANCOSUR Inmobiliaria",
  ],

  image: "/opengraph-image.png",
});

/* =========================================================
   PROYECTOS
========================================================= */

const lotesPageProjectNames = [
  "Camino Real",
  "Las Colinas de Moro",
  "Las Terrazas de Concepción",
  "Zagari Resort Club",
  "La Huerta Vista Alegre",
  "+20 viviendas Unifamiliares",
];

/* =========================================================
   PÁGINA
========================================================= */

export default function LotesPage() {
  return (
    <main
      id="main-content"
      className={styles.page}
    >
      <section
        id="proyectos"
        aria-label="Proyectos de lotes ANCOSUR"
      >
        <ProjectFilter
          eyebrow="Lotes ANCOSUR"
          title="Elige tu próximo terreno"
          description="Opciones estratégicas para construir, invertir y tomar una mejor decisión con asesoría personalizada."
          projectNames={lotesPageProjectNames}
          visibleLimit={12}
          showFilters={true}
          showResultsInfo={true}
          showCta={false}
          initialFilterId="en-construccion"
          filterGroups={[
            {
              id: "en-construccion",
              label: "En construcción",
              projectNames: [
                "Camino Real",
                "Zagari Resort Club",
              ],
            },
            {
              id: "entrega-inmediata",
              label: "Entrega inmediata",
              projectNames: [
                "Las Colinas de Moro",
                "Las Terrazas de Concepción",
              ],
            },
            {
              id: "entregados",
              label: "Entregados",
              projectNames: [
                "La Huerta Vista Alegre",
                "+20 viviendas Unifamiliares",
              ],
              statuses: ["ENTREGADO"],
            },
          ]}
        />
      </section>

      <LotesLeadSection />
    </main>
  );
}