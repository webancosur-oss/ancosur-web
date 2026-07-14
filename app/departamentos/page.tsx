import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ProjectFilter from "@/components/ProjectFilter";
import DepartamentosLeadForm from "./DepartamentosLeadForm";
import styles from "./DepartamentosPage.module.css";

export const metadata = {
  title: "Departamentos en Huancayo | ANCOSUR Inmobiliaria",
  description:
    "Encuentra departamentos en Huancayo para vivir o invertir con ANCOSUR Inmobiliaria.",
};

export default function DepartamentosPage() {
  return (
    <>
      <Navbar />

      <main>
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <span>Departamentos ANCOSUR</span>

            <h1>Departamentos para vivir e invertir</h1>

            <p>
              Tu departamento moderno, bien ubicado y pensado para tu estilo de
              vida.
            </p>

            <div className={styles.heroActions}>
              <a href="#proyectos" className={styles.primaryButton}>
                Ver departamentos
                <ArrowRightIcon size={18} weight="bold" aria-hidden={true} />
              </a>

              <a href="#asesoria" className={styles.secondaryButton}>
                Quiero asesoría
              </a>
            </div>
          </div>
        </section>

        <ProjectFilter
            eyebrow="Departamentos ANCOSUR"
            title="Elige tu próximo hogar"
            description="Descubre proyectos diseñados para elevar tu estilo de vida y recibe asesoría personalizada para elegir la mejor inversión."
            projectTypes={["Departamento"]}
            visibleLimit={12}
            showFilters={true}
            showResultsInfo={true}
            showCta={false}
            filterGroups={[
                {
                id: "todos",
                label: "Todos",
                projectTypes: ["Departamento"],
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
                projectNames: ["Neo Xport", "Moro 416"],
                },
                {
                id: "entrega-inmediata",
                label: "Entrega inmediata",
                projectNames: ["Neo Emperatriz"],
                },
                {
                id: "entregados",
                label: "Entregados",
                projectTypes: ["Departamento"],
                statuses: ["ENTREGADO"],
                },
            ]}
            />

        <section className={styles.leadSection} id="asesoria">
          <div className={styles.leadContent}>
            <span>Asesoría personalizada</span>

            <h2>Encuentra el departamento que va contigo</h2>

            <p>
              Déjanos tus datos y un asesor te ayudará a elegir la mejor opción.
            </p>

            <div className={styles.leadMiniList}>
              <span>Respuesta rápida por WhatsApp</span>
              <span>Opciones para vivir o invertir</span>
            </div>
          </div>

          <DepartamentosLeadForm />
        </section>
      </main>

      
    </>
  );
}