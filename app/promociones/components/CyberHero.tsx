import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CalendarBlankIcon,
  ClockIcon,
  MapPinIcon,
  SparkleIcon,
  TimerIcon,
} from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";

import {
  CYBER_HOUSE_DATE_LABEL,
  CYBER_HOUSE_END,
  CYBER_HOUSE_LOCATION,
  CYBER_HOUSE_START,
  CYBER_HOUSE_TIME_LABEL,
} from "../data";

import EventCountdown from "./EventCountdown";

import styles from "./CyberHero.module.css";

export default function CyberHero() {
  return (
    <section className={styles.hero}>
      <div className={styles.main}>
        <div className={styles.content}>

          <span
            className={styles.eyebrow}
          >
            <SparkleIcon
              size={16}
              weight="fill"
              aria-hidden="true"
            />

            Evento inmobiliario ANCOSUR
          </span>

          <h1>
            Cyber House

            <span>
              Encuentra tu próxima
              propiedad
            </span>
          </h1>

          <p
            className={styles.subtitle}
          >
            Conoce nuestros proyectos,
            recibe asesoría personalizada
            y accede a beneficios
            exclusivos durante este
            evento especial.
          </p>

          <div
            className={
              styles.countdownWrap
            }
          >
            <EventCountdown
              startAt={
                CYBER_HOUSE_START
              }
              endAt={
                CYBER_HOUSE_END
              }
              eventName="Cyber House ANCOSUR"
            />
          </div>

          <div
            className={styles.actions}
          >
            <a
              href="#registro"
              className={
                styles.primaryButton
              }
            >
              Registrar mi asistencia

              <ArrowRightIcon
                size={18}
                weight="bold"
                aria-hidden="true"
              />
            </a>

            <a
              href="#proyectos"
              className={
                styles.secondaryButton
              }
            >
              Conocer proyectos
            </a>
          </div>
        </div>

        <div className={styles.media}>
          <Image
            src="/assets/campanias/hero-cyber.webp"
            alt="Evento Cyber House de ANCOSUR Inmobiliaria"
            fill
            priority
            sizes="(max-width: 820px) 100vw, 55vw"
            className={styles.image}
          />

          <div
            className={
              styles.mediaOverlay
            }
          />

        </div>
      </div>

      <div
        className={styles.eventBar}
      >
        <div
          className={
            styles.eventBarInner
          }
        >
          <article
            className={
              styles.eventItem
            }
          >
            <CalendarBlankIcon
              size={20}
              weight="bold"
              aria-hidden="true"
            />

            <div>
              <span>Fecha</span>
              <strong>
                {
                  CYBER_HOUSE_DATE_LABEL
                }
              </strong>
            </div>
          </article>

          <article
            className={
              styles.eventItem
            }
          >
            <ClockIcon
              size={20}
              weight="bold"
              aria-hidden="true"
            />

            <div>
              <span>Horario</span>
              <strong>
                {
                  CYBER_HOUSE_TIME_LABEL
                }
              </strong>
            </div>
          </article>

          <article
            className={
              styles.eventItem
            }
          >
            <MapPinIcon
              size={20}
              weight="bold"
              aria-hidden="true"
            />

            <div>
              <span>Lugar</span>
              <strong>
                {
                  CYBER_HOUSE_LOCATION
                }
              </strong>
            </div>
          </article>

          <article
            className={
              styles.eventItem
            }
          >
            <TimerIcon
              size={20}
              weight="bold"
              aria-hidden="true"
            />

            <div>
              <span>Duración</span>
              <strong>
                7 horas de atención
              </strong>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
