import Image from "next/image";

import { createSeoMetadata } from "@/src/lib/seo";
import { teamGroups } from "@/data/team";

import styles from "./EquipoPage.module.css";

/* =========================================================
   SEO
========================================================= */

export const metadata = createSeoMetadata({
  title: "Nuestro equipo | Ancosur Inmobiliaria",

  description:
    "Conoce al equipo de Ancosur Inmobiliaria, profesionales especializados en desarrollo inmobiliario, construcción, ventas y atención al cliente en Huancayo.",

  pathname: "/equipo",

  keywords: [
    "equipo Ancosur",
    "nuestro equipo Ancosur",
    "Ancosur Inmobiliaria",
    "equipo inmobiliario Huancayo",
    "asesores inmobiliarios Huancayo",
    "profesionales inmobiliarios",
    "empresa inmobiliaria Huancayo",
    "Ancosur Huancayo",
  ],

  image: "/opengraph-image.png",
});

/* =========================================================
   UTILIDAD PARA TELÉFONOS
========================================================= */

function formatPhone(phone: string) {
  const normalizedPhone = phone.replace(/\D/g, "");

  if (normalizedPhone.startsWith("51")) {
    return `+${normalizedPhone}`;
  }

  return `+51${normalizedPhone}`;
}

/* =========================================================
   PÁGINA
========================================================= */

export default function EquipoPage() {
  return (
    <main
      id="main-content"
      className={styles.page}
    >
      <header className={styles.pageHeader}>
        <span>Equipo Ancosur</span>

        <h1>
          Profesionales que construyen nuevas experiencias
        </h1>

        <p>
          Conoce a las personas que hacen posible el desarrollo,
          construcción y comercialización de nuestros proyectos
          inmobiliarios.
        </p>
      </header>

      <div className={styles.teamsContainer}>
        {teamGroups.map((group, groupIndex) => {
          const sectionId = `equipo-${groupIndex}`;

          return (
            <section
              key={group.area}
              className={styles.areaSection}
              aria-labelledby={sectionId}
            >
              <header className={styles.areaHeader}>
                <div className={styles.areaTitle}>
                  <span
                    className={styles.areaNumber}
                    aria-hidden="true"
                  >
                    {String(groupIndex + 1).padStart(2, "0")}
                  </span>

                  <div className={styles.areaTitleContent}>
                    <span className={styles.areaEyebrow}>
                      Equipo Ancosur
                    </span>

                    <h2 id={sectionId}>
                      {group.area}
                    </h2>
                  </div>
                </div>

                <span className={styles.memberCount}>
                  {group.members.length}{" "}
                  {group.members.length === 1
                    ? "integrante"
                    : "integrantes"}
                </span>
              </header>

              <div className={styles.grid}>
                {group.members.map(
                  (member, memberIndex) => (
                    <article
                      key={member.id}
                      className={styles.card}
                    >
                      <div className={styles.imageBox}>
                        <Image
                          src={member.image}
                          alt={`${member.name}, ${member.position} de Ancosur`}
                          fill
                          priority={
                            groupIndex === 0 &&
                            memberIndex < 4
                          }
                          sizes="
                            (max-width: 480px) 112px,
                            (max-width: 640px) 128px,
                            (max-width: 900px) 50vw,
                            (max-width: 1200px) 33vw,
                            25vw
                          "
                          className={styles.image}
                        />

                        <div
                          className={styles.imageOverlay}
                          aria-hidden="true"
                        />
                      </div>

                      <div className={styles.content}>
                        <span className={styles.position}>
                          {member.position}
                        </span>

                        <h3>
                          {member.name}
                        </h3>

                        {member.phone && (
                          <a
                            href={`tel:${formatPhone(
                              member.phone,
                            )}`}
                            className={styles.phone}
                            aria-label={`Llamar a ${member.name} al ${member.phone}`}
                          >
                            <span
                              className={styles.phoneIcon}
                              aria-hidden="true"
                            >
                              <svg viewBox="0 0 24 24">
                                <path
                                  fill="currentColor"
                                  d="M6.62 10.79a15.46 15.46 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.61 21 3 13.39 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1.02l-2.2 2.2Z"
                                />
                              </svg>
                            </span>

                            <span>
                              {member.phone}
                            </span>
                          </a>
                        )}
                      </div>
                    </article>
                  ),
                )}
              </div>
            </section>
          );
        })}
      </div>
    </main>
  );
}