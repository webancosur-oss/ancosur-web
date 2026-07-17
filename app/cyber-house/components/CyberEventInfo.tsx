import {
  BuildingsIcon,
  CheckCircleIcon,
  ClockCountdownIcon,
  UsersThreeIcon,
} from "@phosphor-icons/react/dist/ssr";

import styles from "./CyberEventInfo.module.css";

const eventBenefits = [
  {
    icon: BuildingsIcon,
    title:
      "Proyectos en un solo lugar",
    description:
      "Conoce alternativas de departamentos, lotes y proyectos de inversión.",
  },
  {
    icon: UsersThreeIcon,
    title:
      "Asesoría personalizada",
    description:
      "Un asesor evaluará contigo ubicación, presupuesto y forma de financiamiento.",
  },
  {
    icon: CheckCircleIcon,
    title:
      "Beneficios del evento",
    description:
      "Consulta las condiciones y promociones disponibles durante el Cyber House.",
  },
];

const schedule = [
  {
    time: "10:00 a. m.",
    title:
      "Inicio del Cyber House",
    description:
      "Apertura y atención de los primeros asistentes.",
  },
  {
    time: "Durante el día",
    title:
      "Asesoría y cotizaciones",
    description:
      "Presentación de proyectos, tipologías y opciones de financiamiento.",
  },
  {
    time: "5:00 p. m.",
    title:
      "Cierre del evento",
    description:
      "Finaliza la atención especial del Cyber House.",
  },
];

export default function CyberEventInfo() {
  return (
    <section
      className={styles.section}
    >
      <div className={styles.inner}>
        <div className={styles.grid}>
          <div
            className={styles.content}
          >
            <span>
              Una experiencia
              inmobiliaria diferente
            </span>

            <h2>
              Todo lo que necesitas
              para tomar una mejor
              decisión
            </h2>

            <p>
              Durante el evento podrás
              comparar proyectos,
              resolver tus dudas y
              conocer alternativas
              según tus objetivos.
            </p>

            <div
              className={styles.cards}
            >
              {eventBenefits.map(
                (benefit) => {
                  const Icon =
                    benefit.icon;

                  return (
                    <article
                      key={
                        benefit.title
                      }
                      className={
                        styles.card
                      }
                    >
                      <span
                        className={
                          styles.iconBox
                        }
                      >
                        <Icon
                          size={25}
                          weight="bold"
                          aria-hidden="true"
                        />
                      </span>

                      <div>
                        <h3>
                          {
                            benefit.title
                          }
                        </h3>

                        <p>
                          {
                            benefit.description
                          }
                        </p>
                      </div>
                    </article>
                  );
                }
              )}
            </div>
          </div>

          <div
            className={
              styles.scheduleCard
            }
          >
            <div
              className={
                styles.scheduleHeader
              }
            >
              <ClockCountdownIcon
                size={28}
                weight="bold"
                aria-hidden="true"
              />

              <div>
                <span>
                  Programa del evento
                </span>

                <h3>
                  Cyber House ANCOSUR
                </h3>
              </div>
            </div>

            <div
              className={
                styles.scheduleList
              }
            >
              {schedule.map(
                (item) => (
                  <article
                    key={
                      `${item.time}-${item.title}`
                    }
                  >
                    <span>
                      {item.time}
                    </span>

                    <div>
                      <strong>
                        {item.title}
                      </strong>

                      <p>
                        {
                          item.description
                        }
                      </p>
                    </div>
                  </article>
                )
              )}
            </div>

            <a href="https://wa.me/51971069763?text=Hola%2C%20vengo%20del%20Cyber%20House%20de%20ANCOSUR%20y%20quiero%20m%C3%A1s%20informaci%C3%B3n%20sobre%20los%20proyectos%20disponibles.%20Me%20interes%C3%B3%20uno%20de%20sus%20proyectos%20y%20quisiera%20recibir%20m%C3%A1s%20detalles.">
              Separar mi atención
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
