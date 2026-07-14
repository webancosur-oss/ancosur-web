import { ArrowRightIcon, BuildingsIcon } from "@phosphor-icons/react/dist/ssr";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ProjectFilter from "@/components/ProjectFilter";
import styles from "./LotesPage.module.css";

export const metadata = {
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

const deliveredLotNames = [
  "JARDINES DE PILCOMAYO",
  "LA HUERTA",
  "VISTA ALEGRE",
  "URB. LINO",
  "URB. COLINA DE SAN ANTONIO",
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
              Elige una ubicación con proyección para construir, crecer o
              asegurar tu próxima inversión.
            </p>

            <div className={styles.heroActions}>
              <a href="#proyectos" className={styles.primaryButton}>
                Ver lotes
                <ArrowRightIcon size={18} weight="bold" aria-hidden={true} />
              </a>

              <a href="#asesoria" className={styles.secondaryButton}>
                Quiero asesoría
              </a>
            </div>
          </div>
        </section>

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
                projectNames: ["Camino Real", "Zagari Resort Club"],
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

        <section className={styles.deliveredSection}>
          <div className={styles.deliveredHeader}>
            <span>Trayectoria ANCOSUR</span>

            <h2>Proyectos urbanizados</h2>

            <p>
              Desarrollos entregados que respaldan nuestra experiencia en
              proyectos de habilitación urbana.
            </p>
          </div>

          <div className={styles.deliveredGrid}>
            {deliveredLotNames.map((name) => (
              <article key={name} className={styles.deliveredItem}>
                <BuildingsIcon size={19} weight="bold" aria-hidden={true} />
                <strong>{name}</strong>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.leadSection} id="asesoria">
          <div className={styles.leadContent}>
            <span>Asesoría personalizada</span>

            <h2>Encuentra el lote ideal para ti</h2>

            <p>
              Déjanos tus datos y un asesor te ayudará a elegir la mejor opción
              según tu presupuesto, ubicación y objetivo de inversión.
            </p>
          </div>

          <form className={styles.leadForm} action="/api/leads" method="post">
            <input type="hidden" name="source" value="pagina-lotes" />

            <div className={styles.formGrid}>
              <label>
                Nombre completo
                <input
                  type="text"
                  name="fullName"
                  placeholder="Ej. Angela Huayra"
                  required
                />
              </label>

              <label>
                Celular
                <input
                  type="tel"
                  name="phone"
                  placeholder="Ej. 987654321"
                  inputMode="numeric"
                  required
                />
              </label>

              <label>
                Correo
                <input
                  type="email"
                  name="email"
                  placeholder="Ej. correo@gmail.com"
                  required
                />
              </label>

              <label>
                Estoy buscando
                <select name="interest" required defaultValue="">
                  <option value="" disabled>
                    Selecciona una opción
                  </option>
                  <option value="Lote para vivir">Lote para vivir</option>
                  <option value="Lote para invertir">Lote para invertir</option>
                  <option value="Lote para construir">Lote para construir</option>
                  <option value="Asesoría personalizada">
                    Asesoría personalizada
                  </option>
                </select>
              </label>
            </div>

            <button type="submit">
              Quiero que me contacten
              <ArrowRightIcon size={18} weight="bold" aria-hidden={true} />
            </button>
          </form>
        </section>
      </main>

      
    </>
  );
}