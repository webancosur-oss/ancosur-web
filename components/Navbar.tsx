"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import styles from "./Navbar.module.css";

const LOGO_SRC = "/assets/images/ancosur-logo-black.svg";

const navLinks = [
  // { label: "Proyectos", href: "/proyectos" },
  { label: "Nosotros", href: "/nosotros" },
  { label: "Departamentos", href: "/departamentos" },
  { label: "Lotes", href: "/lotes" },
  { label: "Resorts", href: "/resorts" },
  { label: "Trabaja con nosotros", href: "/trabaja-con-nosotros" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className={styles.navbar}>
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
              width={180}
              height={58}
              className={styles.logoImage}
              priority
              sizes="(max-width: 560px) 130px, 180px"
              onError={() => setLogoError(true)}
            />
          ) : (
            <span className={styles.logoText}>ANCOSUR</span>
          )}
        </Link>

        <nav
          id="navbar-menu"
          className={`${styles.navMenu} ${isOpen ? styles.active : ""}`}
        >
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={styles.navLink}
              onClick={closeMenu}
            >
              {item.label}
            </Link>
          ))}

          <div className={styles.mobileActions}>
            <Link
              href="/contacto"
              className={styles.loginLink}
              onClick={closeMenu}
            >
              
        971 069 763
            </Link>

            <Link
              href="/#proyectos"
              className={styles.ctaButton}
              onClick={closeMenu}
            >
              Ver proyectos
            </Link>
          </div>
        </nav>

        <div className={styles.actions}>

          <Link href="/#proyectos" className={styles.ctaButton}>
            Ver proyectos
          </Link>
           <Link href="/beneficios" className={styles.ctaButton}>
            Beneficios
          </Link>
        </div>

        <button
          type="button"
          className={`${styles.menuButton} ${isOpen ? styles.open : ""}`}
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={isOpen}
          aria-controls="navbar-menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}