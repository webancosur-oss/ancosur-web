import {
  ArrowRightIcon,
  MapPinIcon,
  MountainsIcon,
} from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";

import { createSeoMetadata } from "@/src/lib/seo";

import ResortsLeadForm from "./components/ResortsLeadForm";

import styles from "./ResortsPage.module.css";

/* =========================================================
   SEO
========================================================= */

export const metadata = createSeoMetadata({
  title:
    "Resorts en Selva Central | ANCOSUR Inmobiliaria",

  description:
    "Conoce los proyectos resort de ANCOSUR en Selva Central. Descubre Zagari Resort Club en San Ramón y próximos desarrollos inmobiliarios en Oxapampa.",

  pathname: "/resorts",

  keywords: [
    "resorts Selva Central",
    "resorts San Ramón",
    "resorts Oxapampa",
    "Zagari Resort Club",
    "resort inmobiliario",
    "inversión en resorts",
    "proyectos turísticos Selva Central",
    "inversión inmobiliaria Selva Central",
    "ANCOSUR",
    "ANCOSUR Inmobiliaria",
  ],

  image: "/opengraph-image.png",
});

/* =========================================================
   PROYECTOS
========================================================= */

const resorts = [
  {
    id: 1,
    name: "Zagari Resort Club",
    status: "EN CONSTRUCCIÓN",
    location: "San Ramón",
    region: "Selva Central",
    type: "Resort Club",
    image:
      "/assets/projects/tarjetas/zagari.webp",
    href:
      "/proyectos/zagari-resort-club",
    cta: "Ver proyecto",
  },
  {
    id: 2,
    name: "Nuevo Resort",
    status: "PRÓXIMAMENTE",
    location: "Oxapampa",
    region: "Selva Central",
    type: "Resort",
    image:
      "/assets/projects/tarjetas/proximamente.png",
    href: "",
    cta: "Próximamente",
  },
];

/* =========================================================
   PÁGINA
========================================================= */

export default function ResortsPage() {
  return (
    <>
      <main
        id="main-content"
        className={styles.page}
      >
        <section
          className={styles.projectsSection}
          id="resorts"
          aria-labelledby="resorts-title"
        >
          <div className={styles.sectionHeader}>
            <span>
              Proyectos disponibles
            </span>

            <h1 id="resorts-title">
              Resorts ANCOSUR en Selva Central
            </h1>

            <p>
              Conoce nuestros proyectos resort en Selva Central y
              descubre una nueva forma de invertir en destinos
              naturales.
            </p>
          </div>

          <div className={styles.grid}>
            {resorts.map((project) => (
              <article
                key={project.id}
                className={styles.card}
              >
                <div className={styles.imageBox}>
                  <Image
                    src={project.image}
                    alt={`${project.name} en ${project.location}, ${project.region}`}
                    width={900}
                    height={680}
                    className={styles.image}
                    sizes="
                      (max-width: 640px) 100vw,
                      (max-width: 1024px) 50vw,
                      33vw
                    "
                  />
                </div>

                <div
                  className={styles.overlay}
                  aria-hidden="true"
                />

                <span className={styles.statusBadge}>
                  {project.status}
                </span>

                <div className={styles.cardContent}>
                  <div className={styles.mainInfo}>
                    <span className={styles.type}>
                      {project.type}
                    </span>

                    <h2>
                      {project.name}
                    </h2>
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
                          <span>
                            Ubicación
                          </span>

                          <strong>
                            {project.location}
                          </strong>
                        </div>
                      </div>

                      <div className={styles.metaItem}>
                        <MountainsIcon
                          size={18}
                          weight="bold"
                          aria-hidden="true"
                        />

                        <div>
                          <span>
                            Zona
                          </span>

                          <strong>
                            {project.region}
                          </strong>
                        </div>
                      </div>
                    </div>

                    <div className={styles.footer}>
                      <div className={styles.footerText}>
                        <span>
                          Estado
                        </span>

                        <strong>
                          {project.status}
                        </strong>
                      </div>

                      {project.href ? (
                        <Link
                          href={project.href}
                          className={styles.link}
                          aria-label={`Ver proyecto ${project.name}`}
                        >
                          {project.cta}

                          <ArrowRightIcon
                            size={17}
                            weight="bold"
                            aria-hidden="true"
                          />
                        </Link>
                      ) : (
                        <span
                          className={styles.linkDisabled}
                          aria-disabled="true"
                        >
                          {project.cta}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section
          className={styles.leadSection}
          id="asesoria"
          aria-labelledby="resorts-lead-title"
        >
          <div className={styles.leadContent}>
            <span>
              Asesoría personalizada
            </span>

            <h2 id="resorts-lead-title">
              ¿Quieres saber más sobre nuestros resorts?
            </h2>

            <p>
              Déjanos tus datos y un asesor te brindará información
              sobre Zagari Resort Club y los próximos proyectos en
              Selva Central.
            </p>
          </div>

          <ResortsLeadForm />
        </section>
      </main>

      <Script
        id="resorts-scroll-fix"
        strategy="afterInteractive"
      >
        {`
          document.addEventListener("click", function (event) {
            const targetElement = event.target;

            if (!(targetElement instanceof Element)) {
              return;
            }

            const trigger = targetElement.closest(
              "[data-scroll-target]"
            );

            if (!trigger) {
              return;
            }

            const targetId = trigger.getAttribute(
              "data-scroll-target"
            );

            if (!targetId) {
              return;
            }

            const target = document.getElementById(
              targetId
            );

            if (!target) {
              return;
            }

            event.preventDefault();

            window.history.replaceState(
              null,
              "",
              "#" + targetId
            );

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