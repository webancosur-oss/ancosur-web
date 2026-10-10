import {
  ArrowRightIcon,
  CalendarBlankIcon,
  ClockIcon,
  MapPinIcon,
  SparkleIcon,
  WhatsappLogoIcon,
} from "@phosphor-icons/react/dist/ssr";

import {
  PROMOTIONS_PERIOD_LABEL,
  SHOWROOM_ADDRESS,
  SHOWROOM_DATE_LABEL,
  SHOWROOM_END,
  SHOWROOM_START,
  SHOWROOM_TIME_LABEL,
  whatsappHref,
  type Promotion,
} from "../data";

import EventCountdown from "./EventCountdown";
import PromoCta from "./PromoCta";

import styles from "./Promotions.module.css";

type PromotionsHeroProps = {
  promotions: Promotion[];
};

export default function PromotionsHero({
  promotions,
}: PromotionsHeroProps) {
  const showroom = promotions.find(
    (promotion) => promotion.id === "showroom",
  );

  return (
    <section
      className={styles.hero}
      aria-labelledby="promociones-title"
    >
      <div className={styles.heroInner}>
        <div className={styles.heroCopy}>
          <span className={styles.eyebrow}>
            <SparkleIcon
              size={15}
              weight="fill"
              aria-hidden="true"
            />
            Promociones {PROMOTIONS_PERIOD_LABEL}
          </span>

          <h1 id="promociones-title">
            Promociones inmobiliarias
            <span> en Huancayo</span>
          </h1>

          <p className={styles.heroLead}>
            Beneficios en departamentos y lotes del 1 al 31
            de octubre
            {showroom
              ? `, y un Showroom inmobiliario el ${SHOWROOM_DATE_LABEL.toLowerCase()}`
              : ""}
            . Elige tu promoción y un asesor te ayudará a
            aprovecharla.
          </p>

          {promotions.length > 0 && (
            <nav
              className={styles.chips}
              aria-label="Promociones vigentes"
            >
              {promotions.map((promotion) => (
                <a
                  key={promotion.id}
                  href={`#${promotion.id}`}
                  className={styles.chip}
                >
                  {promotion.name}
                </a>
              ))}
            </nav>
          )}

          <div className={styles.actions}>
            <a
              href="#registro"
              className={styles.primaryButton}
            >
              Separar mi visita
              <ArrowRightIcon
                size={18}
                weight="bold"
                aria-hidden="true"
              />
            </a>

            <a
              href={whatsappHref(
                "Hola, quiero conocer las promociones de octubre de Ancosur.",
              )}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.whatsappButton}
            >
              <WhatsappLogoIcon
                size={20}
                weight="fill"
                aria-hidden="true"
              />
              Consultar por WhatsApp
            </a>
          </div>
        </div>

        {showroom && (
          <aside
            className={styles.eventCard}
            aria-label="Showroom inmobiliario"
          >
            <span className={styles.eventKicker}>
              Evento presencial
            </span>

            <p className={styles.eventTitle}>
              Showroom inmobiliario
            </p>

            <ul className={styles.eventFacts}>
              <li>
                <CalendarBlankIcon
                  size={18}
                  weight="duotone"
                  aria-hidden="true"
                />
                {SHOWROOM_DATE_LABEL}
              </li>
              <li>
                <ClockIcon
                  size={18}
                  weight="duotone"
                  aria-hidden="true"
                />
                {SHOWROOM_TIME_LABEL}
              </li>
              <li>
                <MapPinIcon
                  size={18}
                  weight="duotone"
                  aria-hidden="true"
                />
                {SHOWROOM_ADDRESS}
              </li>
            </ul>

            <EventCountdown
              startAt={SHOWROOM_START}
              endAt={SHOWROOM_END}
              eventName="Showroom"
            />

            <PromoCta
              promotionId="showroom"
              className={styles.eventButton}
            >
              Quiero asistir
              <ArrowRightIcon
                size={18}
                weight="bold"
                aria-hidden="true"
              />
            </PromoCta>
          </aside>
        )}
      </div>
    </section>
  );
}
