import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";

import type { Promotion } from "@/app/promociones/data";

import ShowroomDaysLeft from "./ShowroomDaysLeft";

import styles from "./PromoStrip.module.css";

/* =========================================================
   FRANJA DE PROMOCIONES (portada, debajo del hero)
   Anuncio de lado a lado con las promociones vigentes; cada
   una lleva a su detalle en /promociones.
========================================================= */

type PromoStripProps = {
  promotions: Promotion[];
};

export default function PromoStrip({
  promotions,
}: PromoStripProps) {
  if (promotions.length === 0) return null;

  return (
    <section
      className={styles.strip}
      aria-labelledby="franja-promociones"
    >
      <div className={styles.inner}>
        <div className={styles.head}>
          <h2
            id="franja-promociones"
            className={styles.title}
          >
            Promociones vigentes
          </h2>

          <Link
            href="/promociones"
            className={styles.all}
          >
            Ver todas
            <ArrowRightIcon
              size={15}
              weight="bold"
              aria-hidden="true"
            />
          </Link>
        </div>

        <ul className={styles.items}>
          {promotions.map((promotion) => (
            <li key={promotion.id}>
              <Link
                href={`/promociones#${promotion.id}`}
                className={`${styles.item} ${
                  promotion.id === "showroom"
                    ? styles.itemEvent
                    : ""
                }`}
              >
                <Image
                  src={promotion.image}
                  alt=""
                  width={64}
                  height={64}
                  sizes="64px"
                  className={styles.thumb}
                />

                <span className={styles.texts}>
                  <strong>{promotion.name}</strong>
                  <span className={styles.teaser}>
                    {promotion.teaser}
                  </span>
                  {promotion.id === "showroom" && (
                    <ShowroomDaysLeft
                      className={styles.badge}
                    />
                  )}
                </span>

                <ArrowRightIcon
                  size={18}
                  weight="bold"
                  aria-hidden="true"
                  className={styles.arrow}
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
