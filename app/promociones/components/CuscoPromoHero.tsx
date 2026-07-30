import {
  ArrowRightIcon,
  CalendarBlankIcon,
  ClockIcon,
  MapPinIcon,
  SparkleIcon,
  TimerIcon,
} from "@phosphor-icons/react/dist/ssr";

import Image from "next/image";
import Link from "next/link";

import styles from "./CuscoPromoHero.module.css";

export default function CuscoPromoHero() {
  return (
    <section className={styles.hero}>
      <div className={styles.main}>
        {/* =========================
            IMAGEN A LA IZQUIERDA
        ========================== */}

        <div className={styles.media}>
          <Image
            src="/assets/campanias/campania.webp"
            alt="Promoción de viaje a Cusco con ANCOSUR"
            fill
            priority
            sizes="(max-width: 900px) 100vw, 55vw"
            className={styles.image}
          />

          <div className={styles.mediaOverlay} />
        </div>

        {/* =========================
            INFORMACIÓN A LA DERECHA
        ========================== */}

        <div className={styles.content}>
          <span className={styles.eyebrow}>
            <SparkleIcon
              size={16}
              weight="fill"
              aria-hidden="true"
            />

            Promoción especial ANCOSUR
          </span>

          <h1>
            Vive una experiencia inolvidable

            <span>
              Viaja a Cusco con ANCOSUR
            </span>
          </h1>

          <p className={styles.subtitle}>
            Participa en nuestra promoción y
            disfruta de una experiencia única
            conociendo uno de los destinos más
            impresionantes del Perú.
          </p>

          <div className={styles.highlightBox}>
            <span>Beneficio exclusivo</span>

            <strong>
              Participa por un viaje a Cusco
            </strong>

            <p>
              Registra tus datos, conoce las
              condiciones de la promoción y
              prepárate para vivir una gran
              experiencia.
            </p>
          </div>

          <div className={styles.actions}>
            <a
              href="#registro"
              className={styles.primaryButton}
            >
              Participar ahora

              <ArrowRightIcon
                size={18}
                weight="bold"
                aria-hidden="true"
              />
            </a>

            <Link
              href="/promociones/terminos-y-condiciones"
              className={styles.secondaryButton}
            >
              Ver términos y condiciones
            </Link>
          </div>
        </div>
      </div>

      {/* =========================
          BARRA DE INFORMACIÓN
      ========================== */}

      <div className={styles.promoBar}>
        <div className={styles.promoBarInner}>
          <article className={styles.promoItem}>
            <MapPinIcon
              size={21}
              weight="bold"
              aria-hidden="true"
            />

            <div>
              <span>Destino</span>
              <strong>Cusco</strong>
            </div>
          </article>

          <article className={styles.promoItem}>
            <CalendarBlankIcon
              size={21}
              weight="bold"
              aria-hidden="true"
            />

            <div>
              <span>Promoción válida</span>
              <strong>Hasta agotar disponibilidad</strong>
            </div>
          </article>

          <article className={styles.promoItem}>
            <TimerIcon
              size={21}
              weight="bold"
              aria-hidden="true"
            />

            <div>
              <span>Duración del viaje</span>
              <strong>3 días y 2 noches</strong>
            </div>
          </article>

          <article className={styles.promoItem}>
            <ClockIcon
              size={21}
              weight="bold"
              aria-hidden="true"
            />

            <div>
              <span>Registro</span>
              <strong>100% online</strong>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}