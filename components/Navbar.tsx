"use client";

import {
  ListIcon,
  PhoneCallIcon,
  WhatsappLogoIcon,
  XIcon,
} from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./Navbar.module.css";

const LOGO_SRC = "/assets/images/ancosur-logo-black.svg";

const mainLinks = [
  { label: "Departamentos", href: "/departamentos" },
  { label: "Lotes", href: "/lotes" },
  { label: "Resorts", href: "/resorts" },
];

const secondaryLinks = [
  { label: "Nosotros", href: "/nosotros" },
  { label: "Trabaja con nosotros", href: "/trabaja-con-nosotros" },
  { label: "Proyectos", href: "/#proyectos" },
  { label: "Beneficios", href: "/beneficios" },
];

export default function Navbar() {
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [logoError, setLogoError] = useState(false);

  const closeMenu = () => setIsOpen(false);

  const isActivePath = (href: string) => {
    if (href.includes("#")) {
      return pathname === "/" && href.startsWith("/#");
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <header
      className={`${styles.navbar} ${isScrolled ? styles.scrolled : ""} ${
        isOpen ? styles.menuOpened : ""
      }`}
    >
      <div className={styles.inner}>
        <Link
          href="/"
          className={styles.brand}
          onClick={closeMenu}
          aria-label="Ir al inicio"
        >
          {!logoError ? (
            <Image
              src={LOGO_SRC}
              alt="ANCOSUR Inmobiliaria"
              width={190}
              height={62}
              className={styles.logoImage}
              priority
              sizes="(max-width: 560px) 138px, 190px"
              onError={() => setLogoError(true)}
            />
          ) : (
            <span className={styles.logoText}>ANCOSUR</span>
          )}
        </Link>

        <nav className={styles.desktopNav} aria-label="Navegación principal">
          <div className={styles.segmentedMenu}>
            {mainLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.segmentLink} ${
                  isActivePath(item.href) ? styles.segmentActive : ""
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>

        <div className={styles.actions}>
          <a href="tel:+51971069763" className={styles.phoneLink}>
            <WhatsappLogoIcon size={19} weight="bold" aria-hidden="true" />
            <span>971 069 763</span>
          </a>

          <Link
            href="/beneficios"
            className={`${styles.outlineButton} ${
              isActivePath("/beneficios") ? styles.outlineActive : ""
            }`}
          >
            Beneficios
          </Link>
        </div>

        <button
          type="button"
          className={styles.menuButton}
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
        >
          {isOpen ? (
            <XIcon size={26} weight="bold" aria-hidden="true" />
          ) : (
            <ListIcon size={28} weight="bold" aria-hidden="true" />
          )}
        </button>
      </div>

      <div
        id="mobile-menu"
        className={`${styles.mobileMenu} ${isOpen ? styles.mobileMenuOpen : ""}`}
      >
        <div className={styles.mobilePanel}>
          <span className={styles.mobileEyebrow}>Menú ANCOSUR</span>

          <div className={styles.mobileLinks}>
            {mainLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.mobileMainLink} ${
                  isActivePath(item.href) ? styles.mobileActive : ""
                }`}
                onClick={closeMenu}
              >
                {item.label}
              </Link>
            ))}

            {secondaryLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.mobileLink} ${
                  isActivePath(item.href) ? styles.mobileSecondaryActive : ""
                }`}
                onClick={closeMenu}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className={styles.mobileActions}>
            <a
              href="tel:+51971069763"
              className={styles.mobilePhone}
              onClick={closeMenu}
            >
              <PhoneCallIcon size={20} weight="bold" aria-hidden="true" />
              971 069 763
            </a>

            <Link
              href="/#proyectos"
              className={styles.mobileButton}
              onClick={closeMenu}
            >
              Ver proyectos
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}