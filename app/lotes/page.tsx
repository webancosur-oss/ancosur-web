import {
  ArrowRightIcon,
  BuildingsIcon,
  CheckCircleIcon,
  MapPinIcon,
  TreeIcon,
} from "@phosphor-icons/react/dist/ssr";
import { projects } from "@/data/projects";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import styles from "./LotesPage.module.css";

export const metadata = {
  title: "Lotes en Huancayo | ANCOSUR Inmobiliaria",
  description:
    "Encuentra lotes en venta en Huancayo, La Huaycha y zonas de crecimiento con ANCOSUR Inmobiliaria. Proyectos ideales para vivir, construir o invertir.",
};

const deliveredLotNames = [
  "JARDINES DE PILCOMAYO",
  "LA HUERTA",
  "VISTA ALEGRE",
  "URB. LINO",
  "URB. COLINA DE SAN ANTONIO",
];

const activeLotKeywords = [
  "camino real",
  "colinas de moro",
  "las colinas de moro",
  "zagari",
  "zaagari",
];

const deliveredLotSet = new Set(
  deliveredLotNames.map((name) => name.toLowerCase())
);

const isColinasDeMoro = (name: string) =>
  name.includes("colinas de moro") || name.includes("las colinas de moro");

const lotesDisponibles = projects.filter((project) => {
  const type = project.type.toLowerCase();
  const name = project.name.toLowerCase();

  const isForcedLot = activeLotKeywords.some((keyword) =>
    name.includes(keyword)
  );

  const isLot = type.includes("lote") || type.includes("terreno") || isForcedLot;

  const isDelivered =
    !isForcedLot &&
    (project.status === "ENTREGADO" ||
      project.status === "VENDIDOS" ||
      deliveredLotSet.has(name));

  return isLot && !isDelivered;
});

const getProjectStatus = (project: (typeof projects)[number]) => {
  const name = project.name.toLowerCase();

  if (isColinasDeMoro(name)) {
    return "ENTREGA INMEDIATA";
  }

  return project.status;
};

const getProjectLocation = (project: (typeof projects)[number]) => {
  const name = project.name.toLowerCase();

  if (isColinasDeMoro(name)) {
    return "La Huaycha";
  }

  return project.location ?? "Ubicación por consultar";
};

export default function LotesPage() {
  return (
    <>
      <Navbar />

      <main>
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <span>Lotes ANCOSUR</span>

            <h1>Construye tu futuro en una ubicación estratégica</h1>

            <p>
              Encuentra lotes pensados para vivir, invertir o iniciar el
              proyecto que siempre imaginaste.
            </p>

            <div className={styles.heroActions}>
              <a
                href="#lotes"
                data-scroll-target="lotes"
                className={styles.primaryButton}
              >
                Ver lotes
                <ArrowRightIcon size={18} weight="bold" aria-hidden="true" />
              </a>

              <a
                href="#asesoria"
                data-scroll-target="asesoria"
                className={styles.secondaryButton}
              >
                Solicitar asesoría
              </a>
            </div>
          </div>
        </section>

        <section className={styles.projectsSection} id="lotes">
          <div className={styles.sectionHeader}>
            <span>Proyectos disponibles</span>
            <h2>Lotes ANCOSUR</h2>
            <p>
              Explora nuestras opciones activas y elige el lote que mejor se
              adapte a tu plan de vida o inversión.
            </p>
          </div>

          <div className={styles.grid}>
            {lotesDisponibles.map((project) => {
              const projectHref = project.href ?? "#asesoria";
              const projectStatus = getProjectStatus(project);
              const locationText = getProjectLocation(project);

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

                  <span className={styles.statusBadge}>{projectStatus}</span>

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
                          <TreeIcon
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
                          <strong>{projectStatus}</strong>
                        </div>

                        <Link href={projectHref} className={styles.link}>
                          {project.href ? "Ver más" : "Consultar"}
                          <ArrowRightIcon
                            size={17}
                            weight="bold"
                            aria-hidden="true"
                          />
                        </Link>
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
            <h2>Más proyectos urbanizados</h2>
            <p>
              Estos proyectos ya fueron entregados o no cuentan con unidades
              disponibles. Son parte del respaldo y experiencia de ANCOSUR.
            </p>
          </div>

          <div className={styles.deliveredGrid}>
            {deliveredLotNames.map((name) => (
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
            <h2>¿Quieres saber qué lote tenemos para ti?</h2>
            <p>
              Déjanos tus datos y un asesor te ayudará a encontrar una opción
              según tu presupuesto, ubicación ideal y objetivo de inversión.
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
                  <option value="Lote para construir">
                    Lote para construir
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

      <Script id="lotes-scroll-fix" strategy="afterInteractive">
        {`
          document.addEventListener("click", function (event) {
            const trigger = event.target.closest("[data-scroll-target]");

            if (!trigger) return;

            const targetId = trigger.getAttribute("data-scroll-target");
            const target = document.getElementById(targetId);

            if (!target) return;

            event.preventDefault();

            window.history.replaceState(null, "", "#" + targetId);

            target.scrollIntoView({
              behavior: "smooth",
              block: "start"
            });
          });
        `}
      </Script>
    </>
  );
}