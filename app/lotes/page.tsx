import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";
import type { Metadata } from "next";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ProjectFilter from "@/components/ProjectFilter";

import LotesLeadSection from "./components/LotesLeadSection";
import styles from "./LotesPage.module.css";

export const metadata: Metadata = {
  title: "Lotes en Huancayo | ANCOSUR Inmobiliaria",
  description:
    "Encuentra lotes en venta en Huancayo, La Huaycha, Concepción y zonas de crecimiento con ANCOSUR Inmobiliaria.",
};

const lotesPageProjectNames = [
  "Camino Real",
  "Las Colinas de Moro",
  "Las Terrazas de Concepción",
  "Zagari Resort Club",
  "La Huerta Vista Alegre",
  "+20 viviendas Unifamiliares",
];

export default function LotesPage() {
  return (
    <>
      <Navbar />

      <main>
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <span>Lotes ANCOSUR</span>

            <h1>Invierte en tierra con futuro</h1>

            <p>
              Elige una ubicación con proyección para construir,
              crecer o asegurar tu próxima inversión.
            </p>

            <div className={styles.heroActions}>
              <a
                href="#proyectos"
                className={styles.primaryButton}
              >
                Ver lotes

                <ArrowRightIcon
                  size={18}
                  weight="bold"
                  aria-hidden={true}
                />
              </a>

              <a
                href="#asesoria"
                className={styles.secondaryButton}
              >
                Quiero asesoría
              </a>
            </div>
          </div>
        </section>

        <div id="proyectos">
          <ProjectFilter
            eyebrow="Lotes ANCOSUR"
            title="Elige tu próximo terreno"
            description="Opciones estratégicas para construir, invertir y tomar una mejor decisión con asesoría personalizada."
            projectNames={lotesPageProjectNames}
            visibleLimit={12}
            showFilters={true}
            showResultsInfo={true}
            showCta={false}
            filterGroups={[
              {
                id: "todos",
                label: "Todos",
              },
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
        </div>

        <LotesLeadSection />
      </main>

      <Footer />
    </>
  );
}