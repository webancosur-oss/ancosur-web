import type { Metadata } from "next";

import {
  ArrowRightIcon,
  MapPinIcon,
  MountainsIcon,
} from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

import ResortsLeadForm from "./components/ResortsLeadForm";

import styles from "./ResortsPage.module.css";

export const metadata: Metadata = {
  title:
    "Resorts en Selva Central | ANCOSUR Inmobiliaria",
  description:
    "Conoce los proyectos resort de ANCOSUR Inmobiliaria en Selva Central. Zagari Resort Club en San Ramón y nuevo resort en Oxapampa próximamente.",
};

const resorts = [
  {
    id: 1,
    name: "Zagari - Resort Club",
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

export default function ResortsPage() {
  return (
    <>
      <Navbar />

      <main>
        <section className={styles.hero}>
          <div
            className={
              styles.heroContent
            }
          >
            <span>
              Resorts ANCOSUR
            </span>

            <h1>
              Invierte en experiencias
              que conectan con la
              naturaleza
            </h1>

            <p>
              Proyectos resort en Selva
              Central pensados para
              disfrutar, descansar e
              invertir en destinos con
              alto potencial turístico.
            </p>

            <div
              className={
                styles.heroActions
              }
            >
              <a
                href="#resorts"
                data-scroll-target="resorts"
                className={
                  styles.primaryButton
                }
              >
                Ver resorts

                <ArrowRightIcon
                  size={18}
                  weight="bold"
                  aria-hidden="true"
                />
              </a>

              <a
                href="#asesoria"
                data-scroll-target="asesoria"
                className={
                  styles.secondaryButton
                }
              >
                Solicitar asesoría
              </a>
            </div>
          </div>
        </section>

        <section
          className={
            styles.projectsSection
          }
          id="resorts"
        >
          <div
            className={
              styles.sectionHeader
            }
          >
            <span>
              Proyectos disponibles
            </span>

            <h2>
              Resorts ANCOSUR
            </h2>

            <p>
              Conoce nuestros proyectos
              resort en Selva Central y
              descubre una nueva forma
              de invertir en destinos
              naturales.
            </p>
          </div>

          <div className={styles.grid}>
            {resorts.map(
              (project) => (
                <article
                  key={project.id}
                  className={
                    styles.card
                  }
                >
                  <div
                    className={
                      styles.imageBox
                    }
                  >
                    <Image
                      src={project.image}
                      alt={project.name}
                      width={900}
                      height={680}
                      className={
                        styles.image
                      }
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>

                  <div
                    className={
                      styles.overlay
                    }
                  />

                  <span
                    className={
                      styles.statusBadge
                    }
                  >
                    {project.status}
                  </span>

                  <div
                    className={
                      styles.cardContent
                    }
                  >
                    <div
                      className={
                        styles.mainInfo
                      }
                    >
                      <span
                        className={
                          styles.type
                        }
                      >
                        {project.type}
                      </span>

                      <h3>
                        {project.name}
                      </h3>
                    </div>

                    <div
                      className={
                        styles.details
                      }
                    >
                      <div
                        className={
                          styles.metaGrid
                        }
                      >
                        <div
                          className={
                            styles.metaItem
                          }
                        >
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
                              {
                                project.location
                              }
                            </strong>
                          </div>
                        </div>

                        <div
                          className={
                            styles.metaItem
                          }
                        >
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
                              {
                                project.region
                              }
                            </strong>
                          </div>
                        </div>
                      </div>

                      <div
                        className={
                          styles.footer
                        }
                      >
                        <div
                          className={
                            styles.footerText
                          }
                        >
                          <span>
                            Estado
                          </span>

                          <strong>
                            {
                              project.status
                            }
                          </strong>
                        </div>

                        {project.href ? (
                          <Link
                            href={
                              project.href
                            }
                            className={
                              styles.link
                            }
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
                            className={
                              styles.linkDisabled
                            }
                          >
                            {project.cta}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              )
            )}
          </div>
        </section>

        <section
          className={
            styles.leadSection
          }
          id="asesoria"
        >
          <div
            className={
              styles.leadContent
            }
          >
            <span>
              Asesoría personalizada
            </span>

            <h2>
              ¿Quieres saber más sobre
              nuestros resorts?
            </h2>

            <p>
              Déjanos tus datos y un
              asesor te brindará
              información sobre Zagari
              Resort Club y los próximos
              proyectos en Selva
              Central.
            </p>
          </div>

          <ResortsLeadForm />
        </section>
      </main>

      <Footer />

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