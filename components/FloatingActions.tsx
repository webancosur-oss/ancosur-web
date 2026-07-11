"use client";

import { ArrowUpIcon, WhatsappLogoIcon } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import styles from "./FloatingActions.module.css";

const whatsappUrl =
  "https://wa.me/51971069763?text=Hola%20ANCOSUR%2C%20quiero%20informaci%C3%B3n%20sobre%20sus%20proyectos.";

export default function FloatingActions() {
  const [showTopButton, setShowTopButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTopButton(window.scrollY > 520);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <aside className={styles.floatingActions} aria-label="Acciones rápidas">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.whatsappButton}
        aria-label="Escribir a ANCOSUR por WhatsApp"
      >
        <WhatsappLogoIcon size={25} weight="fill" aria-hidden="true" />
        <span>WhatsApp</span>
      </a>

      <button
        type="button"
        className={`${styles.topButton} ${
          showTopButton ? styles.showTopButton : ""
        }`}
        onClick={scrollToTop}
        aria-label="Volver al inicio"
      >
        <ArrowUpIcon size={22} weight="bold" aria-hidden="true" />
      </button>
    </aside>
  );
}