import {
  ArrowRightIcon,
  CheckCircleIcon,
  WhatsappLogoIcon,
} from "@phosphor-icons/react/dist/ssr";

import Image from "next/image";
import Link from "next/link";

import {
  whatsappHref,
  type Promotion,
} from "../data";

import PromoCta from "./PromoCta";

import styles from "./Promotions.module.css";

/* =========================================================
   DETALLE DE UNA PROMOCIÓN
   Bloque reutilizable: afiche + beneficios + datos + CTA.
   `reverse` alterna el lado del afiche en escritorio.
========================================================= */

type PromoFeatureProps = {
  promotion: Promotion;
  reverse?: boolean;
};

export default function PromoFeature({
  promotion,
  reverse = false,
}: PromoFeatureProps) {
  const titleId = `${promotion.id}-title`;

  return (
    <section
      id={promotion.id}
      className={`${styles.feature} ${reverse ? styles.featureReverse : ""}`}
      aria-labelledby={titleId}
    >
      <div className={styles.featureInner}>
        <div className={styles.featureMedia}>
          <Image
            src={promotion.image}
            alt={promotion.imageAlt}
            width={promotion.imageWidth}
            height={promotion.imageHeight}
            sizes="(max-width: 900px) 92vw, 46vw"
            className={styles.featureImage}
          />
        </div>

        <div className={styles.featureCopy}>
          <span className={styles.eyebrow}>
            {promotion.eyebrow}
          </span>

          <h2 id={titleId}>
            {promotion.title}
            <span> {promotion.highlight}</span>
          </h2>

          <p className={styles.featureText}>
            {promotion.description}
          </p>

          {promotion.benefits.length > 0 && (
            <ul className={styles.benefits}>
              {promotion.benefits.map((benefit) => (
                <li key={benefit.title}>
                  <CheckCircleIcon
                    size={22}
                    weight="fill"
                    aria-hidden="true"
                  />
                  <div>
                    <strong>{benefit.title}</strong>
                    <span>{benefit.description}</span>
                  </div>
                </li>
              ))}
            </ul>
          )}

          {promotion.details.length > 0 && (
            <dl className={styles.details}>
              {promotion.details.map((detail) => (
                <div key={detail.label}>
                  <dt>{detail.label}</dt>
                  <dd>{detail.value}</dd>
                </div>
              ))}
            </dl>
          )}

          <div className={styles.actions}>
            <PromoCta
              promotionId={promotion.id}
              className={styles.primaryButton}
            >
              {promotion.primaryCta}
              <ArrowRightIcon
                size={18}
                weight="bold"
                aria-hidden="true"
              />
            </PromoCta>

            <a
              href={whatsappHref(promotion.whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.whatsappButton}
            >
              <WhatsappLogoIcon
                size={20}
                weight="fill"
                aria-hidden="true"
              />
              WhatsApp
            </a>

            {promotion.secondaryCta && (
              <Link
                href={promotion.secondaryCta.href}
                className={styles.textLink}
              >
                {promotion.secondaryCta.label}
              </Link>
            )}
          </div>

          <p className={styles.legal}>{promotion.legal}</p>
        </div>
      </div>
    </section>
  );
}
