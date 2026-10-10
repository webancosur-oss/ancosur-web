import {
  ArrowRightIcon,
  CalendarBlankIcon,
  WhatsappLogoIcon,
} from "@phosphor-icons/react/dist/ssr";

import Image from "next/image";
import Link from "next/link";

import {
  whatsappHref,
  type Promotion,
} from "../data";

import styles from "./Promotions.module.css";

type PromotionsGridProps = {
  promotions: Promotion[];
  kicker?: string;
  title?: string;
  description?: string;
  /* "" en /promociones; "/promociones" desde otras páginas */
  linkBase?: string;
  /* Muestra el enlace "Ver todas las promociones" */
  showAllLink?: boolean;
};

export default function PromotionsGrid({
  promotions,
  kicker = "Vigentes este mes",
  title = "Elige tu promoción",
  description = "Cada promoción tiene su vigencia y condiciones. Toca una para ver el detalle o escríbenos por WhatsApp.",
  linkBase = "",
  showAllLink = false,
}: PromotionsGridProps) {
  return (
    <section
      className={styles.gridSection}
      aria-labelledby="promociones-vigentes"
    >
      <div className={styles.container}>
        <header className={styles.sectionHeader}>
          <span className={styles.sectionKicker}>
            {kicker}
          </span>

          <h2 id="promociones-vigentes">{title}</h2>

          <p>{description}</p>
        </header>

        <div className={styles.cards}>
          {promotions.map((promotion) => (
            <article
              key={promotion.id}
              className={styles.card}
            >
              <a
                href={`${linkBase}#${promotion.id}`}
                className={styles.cardMedia}
                aria-label={`Ver detalle de ${promotion.name}`}
              >
                <Image
                  src={promotion.image}
                  alt={promotion.imageAlt}
                  width={promotion.imageWidth}
                  height={promotion.imageHeight}
                  sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 380px"
                  className={styles.cardImage}
                />
              </a>

              <div className={styles.cardBody}>
                <span
                  className={
                    promotion.kind === "evento"
                      ? styles.badgeEvent
                      : styles.badge
                  }
                >
                  <CalendarBlankIcon
                    size={14}
                    weight="bold"
                    aria-hidden="true"
                  />
                  {promotion.validityLabel}
                </span>

                <h3>{promotion.name}</h3>

                <p>{promotion.summary}</p>

                <div className={styles.cardActions}>
                  <a
                    href={`${linkBase}#${promotion.id}`}
                    className={styles.cardLink}
                  >
                    Ver detalle
                    <ArrowRightIcon
                      size={16}
                      weight="bold"
                      aria-hidden="true"
                    />
                  </a>

                  <a
                    href={whatsappHref(
                      promotion.whatsappMessage,
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.cardWhatsapp}
                    aria-label={`Consultar ${promotion.name} por WhatsApp`}
                  >
                    <WhatsappLogoIcon
                      size={20}
                      weight="fill"
                      aria-hidden="true"
                    />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        {showAllLink && (
          <div className={styles.showAll}>
            <Link
              href="/promociones"
              className={styles.showAllLink}
            >
              Ver todas las promociones
              <ArrowRightIcon
                size={18}
                weight="bold"
                aria-hidden="true"
              />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
