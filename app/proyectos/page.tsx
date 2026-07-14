import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ProjectFilter from "@/components/ProjectFilter";
import DepartamentosLeadForm from "./ProyectosLeadForm";
import styles from "./ProyectosPage.module.css";
import ProyectosLeadForm from "./ProyectosLeadForm";

export const metadata = {
  title: "Proyectos inmobiliarios en Huancayo",
  description:
    "Encuentra departamentos, lotes, resorts y proyectos inmobiliarios con ANCOSUR Inmobiliaria.",
};

export default function ProyectosPage() {
  return (
    <>
      <Navbar />

      <main>
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <span>Proyectos ANCOSUR</span>

            <h1>Encuentra tu próximo hogar o inversión</h1>

            <p>
              Explora departamentos, lotes y resorts pensados para vivir mejor,
              invertir con respaldo y construir tu futuro.
            </p>

            <div className={styles.heroActions}>
              <a href="#proyectos" className={styles.primaryButton}>
                Ver proyectos
                <ArrowRightIcon size={18} weight="bold" aria-hidden={true} />
              </a>

              <a href="#asesoria" className={styles.secondaryButton}>
                Solicitar asesoría
              </a>
            </div>
          </div>
        </section>

        <ProjectFilter
          eyebrow="Proyectos ANCOSUR"
          title="Encuentra el proyecto ideal para ti"
          description="Filtra nuestros proyectos según su etapa comercial y elige la mejor opción para vivir, invertir o construir."
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
              id: "pre-venta",
              label: "Pre venta",
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

        <section className={styles.leadSection} id="asesoria">
          <div className={styles.leadContent}>
            <span>Asesoría personalizada</span>

            <h2>Encuentra el proyecto que va contigo</h2>

            <p>
              Déjanos tus datos y te ayudamos a elegir la mejor opción según tu
              estilo de vida, presupuesto y objetivo de compra.
            </p>

            <div className={styles.leadMiniList}>
              <span>Respuesta rápida por WhatsApp</span>
              <span>Opciones para vivir o invertir</span>
            </div>
          </div>

          <ProyectosLeadForm />
        </section>
      </main>

      
    </>
  );
}