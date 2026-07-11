import {
  ArrowRightIcon,
  BuildingsIcon,
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

type ProjectTypology = "impulso" | "equilibrio" | "espacio" | "tiempo" | "luz";
type FilterTypology = "todos" | ProjectTypology;

type DepartamentosPageProps = {
  searchParams?:
    | Promise<{
        tipologia?: string | string[];
      }>
    | {
        tipologia?: string | string[];
      };
};

const typologyFilters: {
  id: FilterTypology;
  label: string;
  subtitle: string;
}[] = [
  {
    id: "todos",
    label: "Todos",
    subtitle: "Ver proyectos",
  },
  {
    id: "impulso",
    label: "Impulso",
    subtitle: "Tu primer gran paso",
  },
  {
    id: "equilibrio",
    label: "Equilibrio",
    subtitle: "Vida y trabajo",
  },
  {
    id: "espacio",
    label: "Espacio",
    subtitle: "Para compartir",
  },
  {
    id: "tiempo",
    label: "Tiempo",
    subtitle: "Más eficiencia",
  },
  {
    id: "luz",
    label: "Luz",
    subtitle: "Energía que inspira",
  },
];

const typologyLabelMap: Record<ProjectTypology, string> = {
  impulso: "Impulso",
  equilibrio: "Equilibrio",
  espacio: "Espacio",
  tiempo: "Tiempo",
  luz: "Luz",
};

const projectTypologyMap: Record<string, ProjectTypology[]> = {
  "neo eterna": ["impulso", "equilibrio", "espacio", "tiempo", "luz"],
  "neo xport": ["luz", "impulso"],
  "neo balto": ["luz", "impulso"],
  "neo rivera": ["luz", "equilibrio"],
  "distrito san carlos": ["espacio", "equilibrio", "impulso"],
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
    project.status === "VENDIDOS" ||
    deliveredProjectSet.has(project.name.toLowerCase());

  return isDepartment && !isDelivered;
});

const getGoogleMapsHref = (projectName: string, location: string) => {
  const query = `${projectName} ANCOSUR ${location} Huancayo Perú`;

  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    query
  )}`;
};

const getProjectTypologies = (projectName: string): ProjectTypology[] => {
  const normalizedName = projectName.toLowerCase();

  const matchedProject = Object.entries(projectTypologyMap).find(([name]) =>
    normalizedName.includes(name)
  );

  return matchedProject?.[1] ?? [];
};

const getFilterHref = (id: FilterTypology) => {
  if (id === "todos") {
    return "/departamentos#departamentos";
  }

  return `/departamentos?tipologia=${id}#departamentos`;
};

const isValidTypology = (value: string | undefined): value is FilterTypology => {
  return typologyFilters.some((item) => item.id === value);
};

export default async function DepartamentosPage({
  searchParams,
}: DepartamentosPageProps) {
  const resolvedSearchParams = await searchParams;

  const rawTypology = Array.isArray(resolvedSearchParams?.tipologia)
    ? resolvedSearchParams?.tipologia[0]
    : resolvedSearchParams?.tipologia;

  const selectedTypology: FilterTypology = isValidTypology(rawTypology)
    ? rawTypology
    : "todos";

  const selectedTypologyData =
    typologyFilters.find((item) => item.id === selectedTypology) ??
    typologyFilters[0];

  const filteredDepartamentos =
    selectedTypology === "todos"
      ? departamentosDisponibles
      : departamentosDisponibles.filter((project) =>
          getProjectTypologies(project.name).includes(selectedTypology)
        );

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

        <section className={styles.projectsSection} id="departamentos">
          <div className={styles.sectionHeader}>
            <span>Tipologías ANCOSUR</span>
            <h2>
              {selectedTypology === "todos"
                ? "Departamentos ANCOSUR"
                : `Tipo ${selectedTypologyData.label}`}
            </h2>
            <p>
              Filtra por nuestras 5 tipologías especiales y encuentra el
              proyecto que mejor se adapta a tu forma de vivir o invertir.
            </p>
          </div>

          <div className={styles.typologyFilters}>
            {typologyFilters.map((item) => (
              <Link
                key={item.id}
                href={getFilterHref(item.id)}
                className={`${styles.typologyButton} ${
                  selectedTypology === item.id ? styles.typologyActive : ""
                }`}
              >
                <span>{item.label}</span>
                <small>{item.subtitle}</small>
              </Link>
            ))}
          </div>

          <div className={styles.resultsInfo}>
            Mostrando <strong>{filteredDepartamentos.length}</strong>{" "}
            {filteredDepartamentos.length === 1
              ? "proyecto"
              : "proyectos"}{" "}
            {selectedTypology !== "todos" && (
              <>
                con tipología <strong>{selectedTypologyData.label}</strong>
              </>
            )}
          </div>

          {filteredDepartamentos.length > 0 ? (
            <div className={styles.grid}>
              {filteredDepartamentos.map((project) => {
                const locationText =
                project.location ?? "Ubicación por consultar";
                const projectTypologies = getProjectTypologies(project.name);
                const mapsHref = getGoogleMapsHref(project.name, locationText);

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

                    <span className={styles.statusBadge}>
                      {project.status}
                    </span>

                    <div className={styles.cardContent}>
                      <div className={styles.mainInfo}>
                        <span className={styles.type}>{project.type}</span>
                        <h3>{project.name}</h3>

                        {projectTypologies.length > 0 && (
                          <div className={styles.typologyTags}>
                            {projectTypologies.map((typology) => (
                              <span
                                key={typology}
                                className={styles.typologyTag}
                              >
                                {typologyLabelMap[typology]}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className={styles.details}>
                        <div className={styles.metaGrid}>
                          <div className={styles.metaItem}>
                            <a
                              href={mapsHref}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={styles.locationLink}
                              aria-label={`Ver ubicación de ${project.name} en Google Maps`}
                            >
                              <MapPinIcon
                                size={18}
                                weight="bold"
                                aria-hidden="true"
                              />

                              <div>
                                <span>Ubicación</span>
                                <strong>{locationText}</strong>
                              </div>
                            </a>
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
          ) : (
            <div className={styles.emptyState}>
              <h3>No hay proyectos activos con esta tipología.</h3>
              <p>
                Déjanos tus datos y un asesor te ayudará a encontrar una opción
                similar.
              </p>
              <a href="#asesoria" className={styles.primaryButton}>
                Solicitar asesoría
                <ArrowRightIcon size={18} weight="bold" aria-hidden="true" />
              </a>
            </div>
          )}
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
                  <option value="Tipo Impulso">Tipo Impulso</option>
                  <option value="Tipo Equilibrio">Tipo Equilibrio</option>
                  <option value="Tipo Espacio">Tipo Espacio</option>
                  <option value="Tipo Tiempo">Tipo Tiempo</option>
                  <option value="Tipo Luz">Tipo Luz</option>
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