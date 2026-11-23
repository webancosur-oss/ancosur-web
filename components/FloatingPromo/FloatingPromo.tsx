"use client";

import { XIcon } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
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

  /*
   * Ruta en la que el usuario cerró a Leonito.
   * Al cambiar de página vuelve a mostrarse.
   *
   * Ejemplo:
   * /promociones → /
   * /promociones → /departamentos
   */
  const [closedOnPath, setClosedOnPath] =
    useState<string | null>(null);

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

  const isVisible =
    closedOnPath !== currentPath;

  const closePromo = () => {
    setClosedOnPath(currentPath);
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

      {/* Leonito explorador (temática selva de Zagari Resort
          Club). En móvil se muestra en tamaño reducido. */}
      <Link
        href={href}
        className={styles.floatingPromo}
        onClick={closePromo}
        aria-label="Conocer las promociones de Ancosur"
      >
        <Image
          src="/assets/floating/leonito-zagari.webp"
          alt="Leonito explorador invitando a conocer las promociones de Ancosur"
          width={760}
          height={1006}
          className={styles.image}
          sizes="(max-width: 640px) 124px, (max-width: 1024px) 185px, 210px"
        />
      </Link>
    </div>
  );
}