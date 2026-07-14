"use client";

import { PhoneIcon } from "@phosphor-icons/react";
import styles from "./HeroAncosur.module.css";
import ActionButton from "../buttons/ActionButton";

type HeroSearchBoxProps = {
  location: string;
  meters: string;
  price: string;
  contactHref?: string;
};

export default function HeroSearchBox({
  location,
  meters,
  price,
  contactHref = "#contactar",
}: HeroSearchBoxProps) {
  return (
    <div className={styles.searchBox}>
      <div className={styles.searchItem}>
        <span>Ubicación</span>
        <strong>{location}</strong>
      </div>

      <div className={styles.divider} />

      <div className={styles.searchItem}>
        <span>Metraje</span>
        <strong>{meters}</strong>
      </div>

      <div className={styles.divider} />

      <div className={styles.searchItem}>
        <span>Precio</span>
        <strong>{price}</strong>
      </div>

      <ActionButton
        href={contactHref}
        ariaLabel="Contactar con ANCOSUR"
        icon={PhoneIcon}
        iconPosition="right"
        size="sm"
        fullWidth
        className={styles.searchButton}
      >
        Contactar
      </ActionButton>
    </div>
  );
}