"use client";

import {
  XIcon,
} from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import {
  useState,
} from "react";

import styles from "./FloatingPromo.module.css";

type FloatingPromoProps = {
  href?: string;
};

export default function FloatingPromo({
  href = "/cyber-house",
}: FloatingPromoProps) {
  const [
    isVisible,
    setIsVisible,
  ] = useState(true);

  const closePromo = () => {
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div
      className={
        styles.floatingWrapper
      }
    >
      <button
        type="button"
        className={
          styles.closeButton
        }
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
        className={
          styles.floatingPromo
        }
        aria-label="Conocer el Cyber House de ANCOSUR"
      >
        <Image
          src="/assets/floating/leonitov2.svg"
          alt="Leonito invitando al Cyber House de ANCOSUR"
          width={1057}
          height={1409}
          priority
          className={`${styles.image} ${styles.desktopImage}`}
          sizes="(max-width: 640px) 0px, (max-width: 1024px) 185px, 210px"
        />

        <Image
          src="/assets/floating/leonitov1.svg"
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