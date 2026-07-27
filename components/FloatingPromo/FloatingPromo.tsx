"use client";

import { XIcon } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import styles from "./FloatingPromo.module.css";

type FloatingPromoProps = {
  href?: string;
};

export default function FloatingPromo({
  href = "/promociones",
}: FloatingPromoProps) {
  const pathname = usePathname();

  const [isVisible, setIsVisible] =
    useState(true);

  const closePromo = () => {
    setIsVisible(false);
  };

  /*
   * Elimina parámetros, hash y barra final para
   * comparar correctamente la ruta actual.
   */
  const targetPath = href
    .split("?")[0]
    .split("#")[0]
    .replace(/\/$/, "");

  const currentPath = pathname
    .replace(/\/$/, "");

  const isTargetPage =
    currentPath === targetPath;

  /*
   * No mostrar si:
   * 1. El usuario cerró la promoción.
   * 2. Ya está dentro de la página promocionada.
   */
  if (!isVisible || isTargetPage) {
    return null;
  }

  return (
    <div className={styles.floatingWrapper}>
      <button
        type="button"
        className={styles.closeButton}
        onClick={closePromo}
        aria-label="Cerrar promoción del Cyber House"
        title="Cerrar"
      >
        <XIcon
          size={16}
          weight="bold"
          aria-hidden="true"
        />
      </button>

      <Link
        href={href}
        className={styles.floatingPromo}
        onClick={closePromo}
        aria-label="Conocer el Cyber House de ANCOSUR"
      >
        <Image
          src="/assets/floating/cyber-house.svg"
          alt="Leonito invitando al Cyber House de ANCOSUR"
          width={1057}
          height={1409}
          priority
          className={`${styles.image} ${styles.desktopImage}`}
          sizes="(max-width: 640px) 0px, (max-width: 1024px) 185px, 210px"
        />

        <Image
          src="/assets/floating/cyber-house.svg"
          alt="Leonito invitando al Cyber House de ANCOSUR"
          width={1086}
          height={1448}
          priority
          className={`${styles.image} ${styles.mobileImage}`}
          sizes="(max-width: 640px) 195px, 0px"
        />
      </Link>
    </div>
  );
}