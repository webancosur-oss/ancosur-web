import {
  ArrowRightIcon,
  BuildingsIcon,
  CheckCircleIcon,
  MapPinIcon,
} from "@phosphor-icons/react/dist/ssr";
import { projects } from "@/data/projects";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";
import styles from "./DepartamentosPage.module.css";

export const metadata = {
  title: "Departamentos en Huancayo",
  description:
    "Encuentra departamentos en venta en Huancayo con ANCOSUR Inmobiliaria. Proyectos modernos para vivir e invertir.",
};

const deliveredProjectNames = [
  "VITA",
  "NEO 18",
  "ADAMANT",
  "ALBAR",
  "JARDINES DE PILCOMAYO",
  "LA HUERTA",
  "VISTA ALEGRE",
  "DOVLE",
  "ZENDA",
  "URB. LINO",
  "URB. COLINA DE SAN ANTONIO",
  "CASA DEFRA",
  "CASA MONTECARMELO",
  "CASA COLON",
  "BAMBU",
  "NEO EMPERATRIZ",
  "SERENA",
  "ALTALUZ",
  "SULPAA",
  "COTIZA",
  "CASA SAN IGNACIO",
];

const deliveredProjectSet = new Set(
  deliveredProjectNames.map((name) => name.toLowerCase())
);

const departamentosDisponibles = projects.filter((project) => {
  const isDepartment = project.type.toLowerCase().includes("depart");
  const isDelivered =
    project.status === "ENTREGADO" ||
    project.status === "SIN UNIDADES" ||
    deliveredProjectSet.has(project.name.toLowerCase());

  return isDepartment && !isDelivered;
});

export default function DepartamentosPage() {
  return (
    <>
      <Navbar />

      <main>
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <span>Departamentos ANCOSUR</span>

            <h1>Encuentra tu nuevo departamento en Huancayo</h1>

            <p>
              Proyectos pensados para vivir mejor, invertir con respaldo y
              elegir una ubicación conectada a tu estilo de vida.
            </p>

            <div className={styles.heroActions}>
              <a href="#departamentos" className={styles.primaryButton}>
                Ver departamentos
                <ArrowRightIcon size={18} weight="bold" aria-hidden="true" />
              </a>

              <a href="#asesoria" className={styles.secondaryButton}>
                Solicitar asesoría
              </a>
            </div>
          </div>
        </section>

        {/* <section className={styles.intro}>
          <div className={styles.introText}>
            <span>Vive o invierte</span>
            <h2>Departamentos para cada etapa de tu vida</h2>
          </div>

          <div className={styles.introGrid}>
            <article>
              <CheckCircleIcon size={24} weight="fill" aria-hidden="true" />
              <h3>Ubicaciones estratégicas</h3>
              <p>
                Proyectos cerca de zonas comerciales, educativas y de alto
                crecimiento.
              </p>
            </article>

            <article>
              <CheckCircleIcon size={24} weight="fill" aria-hidden="true" />
              <h3>Opciones para vivir</h3>
              <p>
                Departamentos para familias, jóvenes profesionales e
                inversionistas.
              </p>
            </article>

            <article>
              <CheckCircleIcon size={24} weight="fill" aria-hidden="true" />
              <h3>Respaldo ANCOSUR</h3>
              <p>
                Te acompañamos desde la elección del proyecto hasta concretar tu
                inversión.
              </p>
            </article>
          </div>
        </section> */}

        <section className={styles.projectsSection} id="departamentos">
          <div className={styles.sectionHeader}>
            <span>Proyectos disponibles</span>
            <h2>Departamentos ANCOSUR</h2>
            <p>
              Explora nuestras opciones activas y elige el proyecto que mejor se
              adapte a tu forma de vivir o invertir.
            </p>
          </div>

          <div className={styles.grid}>
            {departamentosDisponibles.map((project) => {
              const locationText =
                project.location ?? "Ubicación por consultar";

              return (
                <article key={project.id} className={styles.card}>
                  <div className={styles.imageBox}>
                    <Image
                      src={project.image}
                      alt={project.name}
                      width={900}
                      height={680}
                      className={styles.image}
                      sizes="(max-width: 640px) 42vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>

                  <div className={styles.overlay} />

                  <span className={styles.statusBadge}>{project.status}</span>

                  <div className={styles.cardContent}>
                    <div className={styles.mainInfo}>
                      <span className={styles.type}>{project.type}</span>
                      <h3>{project.name}</h3>
                    </div>

                    <div className={styles.details}>
                      <div className={styles.metaGrid}>
                        <div className={styles.metaItem}>
                          <MapPinIcon
                            size={18}
                            weight="bold"
                            aria-hidden="true"
                          />
                          <div>
                            <span>Ubicación</span>
                            <strong>{locationText}</strong>
                          </div>
                        </div>

                        <div className={styles.metaItem}>
                          <BuildingsIcon
                            size={18}
                            weight="bold"
                            aria-hidden="true"
                          />
                          <div>
                            <span>Tipo</span>
                            <strong>{project.type}</strong>
                          </div>
                        </div>
                      </div>

                      <div className={styles.footer}>
                        <div className={styles.footerText}>
                          <span>Estado</span>
                          <strong>{project.status}</strong>
                        </div>

                        {project.href ? (
                          <Link href={project.href} className={styles.link}>
                            Ver más
                            <ArrowRightIcon
                              size={17}
                              weight="bold"
                              aria-hidden="true"
                            />
                          </Link>
                        ) : (
                          <a href="#asesoria" className={styles.link}>
                            Consultar
                            <ArrowRightIcon
                              size={17}
                              weight="bold"
                              aria-hidden="true"
                            />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className={styles.deliveredSection}>
          <div className={styles.deliveredHeader}>
            <span>Trayectoria ANCOSUR</span>
            <h2>Más proyectos entregados</h2>
            <p>
              Estos proyectos ya fueron finalizados o no cuentan con unidades
              disponibles. Son parte de la experiencia que respalda nuestro
              crecimiento inmobiliario.
            </p>
          </div>

          <div className={styles.deliveredGrid}>
            {deliveredProjectNames.map((name) => (
              <article key={name} className={styles.deliveredItem}>
                <BuildingsIcon size={19} weight="bold" aria-hidden="true" />
                <strong>{name}</strong>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.leadSection} id="asesoria">
          <div className={styles.leadContent}>
            <span>Encuentra tu mejor opción</span>
            <h2>¿Quieres saber qué proyecto tenemos para ti?</h2>
            <p>
              Déjanos tus datos y un asesor te ayudará a encontrar el
              departamento ideal según tu presupuesto, ubicación y estilo de
              vida.
            </p>
          </div>

          <form className={styles.leadForm} action="/api/leads" method="post">
            <input type="hidden" name="source" value="pagina-departamentos" />

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
                  <option value="Departamento para vivir">
                    Departamento para vivir
                  </option>
                  <option value="Departamento para invertir">
                    Departamento para invertir
                  </option>
                  <option value="Asesoría personalizada">
                    Asesoría personalizada
                  </option>
                </select>
              </label>
            </div>

            <button type="submit">
              Quiero que me contacten
              <ArrowRightIcon size={18} weight="bold" aria-hidden="true" />
            </button>
          </form>
        </section>
      </main>

      <Footer />
    </>
  );
}