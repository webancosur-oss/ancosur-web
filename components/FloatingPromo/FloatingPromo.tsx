"use client";

import { XIcon } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  useEffect,
  useMemo,
  useState,
} from "react";

import styles from "./FloatingPromo.module.css";

type FloatingPromoProps = {
  href?: string;
};

function normalizePath(path: string): string {
  const cleanedPath = path
    .split("?")[0]
    .split("#")[0]
    .replace(/\/+$/, "");

  return cleanedPath || "/";
}

export default function FloatingPromo({
  href = "/promociones",
}: FloatingPromoProps) {
  const pathname = usePathname();

  const [isVisible, setIsVisible] =
    useState(true);

  const targetPath = useMemo(
    () => normalizePath(href),
    [href],
  );

  const currentPath = useMemo(
    () => normalizePath(pathname),
    [pathname],
  );

  const isTargetPage =
    currentPath === targetPath;

  /*
   * Al salir de la página de promociones,
   * el león vuelve a mostrarse.
   *
   * Ejemplo:
   * /promociones → /
   * /promociones → /departamentos
   */
  useEffect(() => {
    if (!isTargetPage) {
      setIsVisible(true);
    }
  }, [
    currentPath,
    isTargetPage,
  ]);

  const closePromo = () => {
    setIsVisible(false);
  };

  /*
   * No mostrar si:
   * 1. Ya está en la página de promociones.
   * 2. El usuario lo cerró en la ruta actual.
   */
  if (
    isTargetPage ||
    !isVisible
  ) {
    return null;
  }

  return (
    <div className={styles.floatingWrapper}>
      <button
        type="button"
        className={styles.closeButton}
        onClick={closePromo}
        aria-label="Cerrar promoción de Ancosur"
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
        aria-label="Conocer las promociones de Ancosur"
      >
        <Image
          src="/assets/floating/leonito-peruano.svg"
          alt="Leonito invitando a conocer las promociones de Ancosur"
          width={1057}
          height={1409}
          priority
          className={`${styles.image} ${styles.desktopImage}`}
          sizes="
            (max-width: 640px) 0px,
            (max-width: 1024px) 185px,
            210px
          "
        />

        <Image
          src="/assets/floating/leonito-peruano.svg"
          alt="Leonito invitando a conocer las promociones de Ancosur"
          width={1086}
          height={1448}
          priority
          className={`${styles.image} ${styles.mobileImage}`}
          sizes="
            (max-width: 640px) 195px,
            0px
          "
        />
      </Link>
    </div>
  );
}