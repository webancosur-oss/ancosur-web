import {
  ArrowRightIcon,
  CheckCircleIcon,
  FileTextIcon,
  HouseLineIcon,
  MapPinIcon,
  SparkleIcon,
} from "@phosphor-icons/react/dist/ssr";

import Image from "next/image";
import Link from "next/link";

import styles from "./CaminoRealPromoHero.module.css";

const benefits = [
  {
    id: "planos-gratis",
    icon: HouseLineIcon,
    label: "Beneficio 01",
    title: "Planos gratis",
    description:
      "Planos de tu casa diseñados por Darkham Studio.",
  },
  {
    id: "notaria-gratis",
    icon: FileTextIcon,
    label: "Beneficio 02",
    title: "Notaría gratis",
    description:
      "Cubrimos tus gastos notariales y registrales.",
  },
];

export default function CaminoRealPromoHero() {
  return (
    <section
      className={styles.hero}
      aria-labelledby="camino-real-promo-title"
    >
      <div className={styles.main}>
        {/* =========================================
            CONTENIDO
        ========================================== */}

        <div className={styles.content}>
          <span className={styles.eyebrow}>
            <SparkleIcon
              size={15}
              weight="fill"
              aria-hidden="true"
            />

            Promoción Camino Real
          </span>

          <h1 id="camino-real-promo-title">
            Compra tu lote

            <span>
              y ahorra
            </span>
          </h1>

          <p className={styles.subtitle}>
            Adquiere tu lote en Camino Real Residencial
            y elige uno de dos beneficios exclusivos para
            comenzar a construir tu futuro.
          </p>

          {/* =====================================
              BENEFICIOS
          ====================================== */}

          <div
            className={styles.benefits}
            aria-label="Beneficios disponibles"
          >
            {benefits.map((benefit) => {
              const Icon = benefit.icon;

              return (
                <article
                  key={benefit.id}
                  className={styles.benefitCard}
                >
                  <div
                    className={styles.benefitIcon}
                    aria-hidden="true"
                  >
                    <Icon
                      size={23}
                      weight="duotone"
                    />
                  </div>

                  <div className={styles.benefitContent}>
                    <span>
                      {benefit.label}
                    </span>

                    <strong>
                      {benefit.title}
                    </strong>

                    <p>
                      {benefit.description}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>

          {/* =====================================
              ACCIONES
          ====================================== */}

          <div className={styles.actions}>
            <a
              href="#registro"
              className={styles.primaryButton}
            >
              <span>
                Quiero esta promoción
              </span>

              <ArrowRightIcon
                size={18}
                weight="bold"
                aria-hidden="true"
              />
            </a>

            <Link
              href="/camino-real"
              className={styles.secondaryButton}
            >
              Conocer Camino Real
            </Link>
          </div>

          <p className={styles.legal}>
            El cliente podrá elegir uno de los beneficios
            disponibles. Promoción sujeta a términos,
            condiciones, disponibilidad y evaluación
            comercial.
          </p>
        </div>

        {/* =========================================
            IMAGEN
        ========================================== */}

        <div className={styles.media}>
          <Image
            src="/assets/campanias/campania-camino-real.webp"
            alt="Promoción Compra tu lote y ahorra en Camino Real Residencial"
            fill
            priority
            quality={90}
            sizes="
              (max-width: 820px) 100vw,
              (max-width: 1200px) 54vw,
              58vw
            "
            className={styles.image}
          />

          <div
            className={styles.mediaOverlay}
            aria-hidden="true"
          />

          <div className={styles.imageBadge}>
            <SparkleIcon
              size={14}
              weight="fill"
              aria-hidden="true"
            />

            <span>
              Elige tu beneficio
            </span>
          </div>
        </div>
      </div>

      {/* =========================================
          INFORMACIÓN INFERIOR
      ========================================== */}

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
                Proyecto
              </span>

              <strong>
                Camino Real Residencial
              </strong>
            </div>
          </article>

          <article className={styles.eventItem}>
            <HouseLineIcon
              size={20}
              weight="bold"
              aria-hidden="true"
            />

            <div>
              <span>
                Promoción
              </span>

              <strong>
                Compra tu lote y ahorra
              </strong>
            </div>
          </article>

          <article className={styles.eventItem}>
            <FileTextIcon
              size={20}
              weight="bold"
              aria-hidden="true"
            />

            <div>
              <span>
                Beneficio 01
              </span>

              <strong>
                Planos de vivienda gratis
              </strong>
            </div>
          </article>

          <article className={styles.eventItem}>
            <CheckCircleIcon
              size={20}
              weight="bold"
              aria-hidden="true"
            />

            <div>
              <span>
                Beneficio 02
              </span>

              <strong>
                Notaría gratis
              </strong>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}