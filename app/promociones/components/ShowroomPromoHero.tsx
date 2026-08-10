import {
  ArrowRightIcon,
  CalendarBlankIcon,
  ClockIcon,
  MapPinIcon,
  SparkleIcon,
} from "@phosphor-icons/react/dist/ssr";

import Image from "next/image";
import Link from "next/link";

import styles from "./ShowRoomPromoHero.module.css";

export default function ShowRoomPromoHero() {
  return (
    <section
      className={styles.hero}
      aria-labelledby="showroom-title"
    >
      <div className={styles.main}>
        {/* =====================================
            IMAGEN / AFICHE
        ====================================== */}

        <div className={styles.media}>
          <Image
            src="/assets/campanias/campania-showroom.webp"
            alt="Evento inmobiliario Ancosur"
            fill
            priority
            quality={90}
            sizes="
              (max-width: 720px) 100vw,
              (max-width: 1024px) 100vw,
              62vw
            "
            className={styles.image}
          />

          <div
            className={styles.mediaOverlay}
            aria-hidden="true"
          />

          <div
            className={styles.mediaShade}
            aria-hidden="true"
          />
        </div>

        {/* =====================================
            INFORMACIÓN
        ====================================== */}

        <div className={styles.content}>
          <span className={styles.eyebrow}>
            <SparkleIcon
              size={15}
              weight="fill"
              aria-hidden="true"
            />

            Evento especial Ancosur
          </span>

          <h1 id="showroom-title">
            Descubre tu próximo

            <span>
              hogar con Ancosur
            </span>
          </h1>

          <p className={styles.subtitle}>
            Conoce nuestros proyectos inmobiliarios,
            recibe asesoría personalizada y encuentra
            nuevas oportunidades para invertir o
            adquirir tu próximo hogar.
          </p>

          <div className={styles.eventDetails}>
            <article className={styles.detail}>
              <div className={styles.detailIcon}>
                <MapPinIcon
                  size={20}
                  weight="duotone"
                  aria-hidden="true"
                />
              </div>

              <div>
                <span>
                  Lugar
                </span>

                <strong>
                  Sala de eventos, Ancosur
                </strong>
              </div>
            </article>

            <article className={styles.detail}>
              <div className={styles.detailIcon}>
                <CalendarBlankIcon
                  size={20}
                  weight="duotone"
                  aria-hidden="true"
                />
              </div>

              <div>
                <span>
                  Fecha
                </span>

                <strong>
                  Sábado, 15 de agosto
                </strong>
              </div>
            </article>

            <article className={styles.detail}>
              <div className={styles.detailIcon}>
                <ClockIcon
                  size={20}
                  weight="duotone"
                  aria-hidden="true"
                />
              </div>

              <div>
                <span>
                  Horario
                </span>

                <strong>
                  11:00 am — 5:00 pm
                </strong>
              </div>
            </article>
          </div>

          <div className={styles.actions}>
            <a
              href="#registro"
              className={styles.primaryButton}
            >
              Quiero asistir

              <ArrowRightIcon
                size={18}
                weight="bold"
                aria-hidden="true"
              />
            </a>

            <Link
              href="/proyectos"
              className={styles.secondaryButton}
            >
              Ver proyectos
            </Link>
          </div>

          <p className={styles.note}>
            Conoce nuestros proyectos y recibe
            información directamente de nuestros
            asesores.
          </p>
        </div>
      </div>

      {/* =====================================
          BARRA INFERIOR
      ====================================== */}

      <div className={styles.eventBar}>
        <div className={styles.eventBarInner}>
          <article className={styles.eventItem}>
            <MapPinIcon
              size={20}
              weight="bold"
              aria-hidden="true"
            />

            <div>
              <span>
                Ubicación
              </span>

              <strong>
                Sala de eventos Ancosur
              </strong>
            </div>
          </article>

          <article className={styles.eventItem}>
            <CalendarBlankIcon
              size={20}
              weight="bold"
              aria-hidden="true"
            />

            <div>
              <span>
                Fecha
              </span>

              <strong>
                Sábado 15 de agosto
              </strong>
            </div>
          </article>

          <article className={styles.eventItem}>
            <ClockIcon
              size={20}
              weight="bold"
              aria-hidden="true"
            />

            <div>
              <span>
                Horario
              </span>

              <strong>
                11:00 am — 5:00 pm
              </strong>
            </div>
          </article>

          <article className={styles.eventItem}>
            <SparkleIcon
              size={20}
              weight="fill"
              aria-hidden="true"
            />

            <div>
              <span>
                Experiencia
              </span>

              <strong>
                Proyectos, asesoría e inversión
              </strong>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}