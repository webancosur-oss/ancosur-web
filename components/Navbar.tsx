"use client";

import {
  CaretDownIcon,
  ListIcon,
  PhoneCallIcon,
  WhatsappLogoIcon,
  XIcon,
} from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  useEffect,
  useRef,
  useState,
} from "react";

import styles from "./Navbar.module.css";

const LOGO_SRC =
  "/assets/images/ancosur-logo.svg";

const WHATSAPP_LINK =
  "https://wa.me/51971069763?text=Hola,%20vengo%20de%20la%20web%20de%20ANCOSUR%20y%20quiero%20recibir%20m%C3%A1s%20informaci%C3%B3n.";

/* =========================================================
   NAVEGACIÓN PRINCIPAL
========================================================= */

const navLinks = [
  {
    label: "Departamentos",
    href: "/departamentos",
  },
  {
    label: "Lotes",
    href: "/lotes",
  },
  {
    label: "Resorts",
    href: "/resorts",
  },
  {
    label: "Nosotros",
    href: "/nosotros",
  },
];

/* =========================================================
   BENEFICIOS
========================================================= */

const benefitLinks = [
  {
    label: "Socio Referido",
    description:
      "Refiere a tus conocidos y recibe S/ 500.",
    href: "/beneficios/socio-referido",
  },
  {
    label: "Club de Beneficios",
    description:
      "Accede a descuentos exclusivos con nuestros aliados.",
    href: "/beneficios/club-beneficios",
  },
  {
    label: "Compramos tu Terreno",
    description:
      "Presenta tu terreno y evalúa una propuesta.",
    href: "/beneficios/compramos-tu-terreno",
  },
];

export default function Navbar() {
  const pathname = usePathname();

  /* =========================================================
     ESTADOS SEPARADOS
  ========================================================= */

  const [
    isMobileMenuOpen,
    setIsMobileMenuOpen,
  ] = useState(false);

  const [
    isDesktopBenefitsOpen,
    setIsDesktopBenefitsOpen,
  ] = useState(false);

  const [
    isMobileBenefitsOpen,
    setIsMobileBenefitsOpen,
  ] = useState(false);

  const [
    isScrolled,
    setIsScrolled,
  ] = useState(false);

  const [
    logoError,
    setLogoError,
  ] = useState(false);

  const benefitsRef =
    useRef<HTMLDivElement>(null);

  /* =========================================================
     CERRAR TODO
  ========================================================= */

  const closeAllMenus = () => {
    setIsMobileMenuOpen(false);
    setIsDesktopBenefitsOpen(false);
    setIsMobileBenefitsOpen(false);
  };

  /* =========================================================
     CERRAR SOLO MENÚ MOBILE
  ========================================================= */

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setIsMobileBenefitsOpen(false);
  };

  /* =========================================================
     RUTA ACTIVA
  ========================================================= */

  const isActivePath = (
    href: string
  ) => {
    if (!pathname) {
      return false;
    }

    return (
      pathname === href ||
      pathname.startsWith(`${href}/`)
    );
  };

  /* =========================================================
     BENEFICIO ACTIVO
  ========================================================= */

  const isBenefitActive =
    benefitLinks.some((item) =>
      isActivePath(item.href)
    );

  /* =========================================================
     SCROLL
  ========================================================= */

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(
        window.scrollY > 40
      );
    };

    handleScroll();

    window.addEventListener(
      "scroll",
      handleScroll,
      {
        passive: true,
      }
    );

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );
    };
  }, []);

  /* =========================================================
     BLOQUEAR SCROLL MOBILE
  ========================================================= */

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow =
        "hidden";
    } else {
      document.body.style.overflow =
        "";
    }

    return () => {
      document.body.style.overflow =
        "";
    };
  }, [isMobileMenuOpen]);

  /* =========================================================
     CERRAR DROPDOWN DESKTOP AL HACER CLICK AFUERA
  ========================================================= */

  useEffect(() => {
    const handlePointerDown = (
      event: PointerEvent
    ) => {
      if (
        benefitsRef.current &&
        !benefitsRef.current.contains(
          event.target as Node
        )
      ) {
        setIsDesktopBenefitsOpen(
          false
        );
      }
    };

    document.addEventListener(
      "pointerdown",
      handlePointerDown
    );

    return () => {
      document.removeEventListener(
        "pointerdown",
        handlePointerDown
      );
    };
  }, []);

  /* =========================================================
     ESC
  ========================================================= */

  useEffect(() => {
    const handleEscape = (
      event: KeyboardEvent
    ) => {
      if (event.key === "Escape") {
        closeAllMenus();
      }
    };

    document.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      document.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, []);

  /* =========================================================
     CUANDO CAMBIA LA RUTA
     NEXT.JS YA NAVEGÓ → CERRAMOS MENÚS
  ========================================================= */

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsDesktopBenefitsOpen(false);
    setIsMobileBenefitsOpen(false);
  }, [pathname]);

  /* =========================================================
     NAVEGAR DESDE MOBILE
     
     IMPORTANTE:
     No usamos preventDefault.
     Dejamos que Next.js ejecute el Link.
  ========================================================= */

  const handleMobileNavigation = () => {
    setIsMobileBenefitsOpen(false);
  };

  return (
    <header
      className={`${styles.navbar} ${
        isScrolled
          ? styles.navbarScrolled
          : ""
      }`}
    >
      {/* =====================================================
          NAVBAR PRINCIPAL
      ===================================================== */}

      <div
        className={styles.navbarShell}
      >
        {/* =================================================
            LOGO
        ================================================= */}

        <Link
          href="/"
          className={styles.brand}
          aria-label="Ir al inicio"
          onClick={closeAllMenus}
        >
          {!logoError ? (
            <Image
              src={LOGO_SRC}
              alt="ANCOSUR Inmobiliaria"
              width={190}
              height={62}
              priority
              className={
                styles.logoImage
              }
              onError={() =>
                setLogoError(true)
              }
            />
          ) : (
            <span
              className={
                styles.logoText
              }
            >
              ANCOSUR
            </span>
          )}
        </Link>

        {/* =================================================
            DESKTOP NAV
        ================================================= */}

        <nav
          className={styles.desktopNav}
          aria-label="Navegación principal"
        >
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`${styles.navLink} ${
                isActivePath(item.href)
                  ? styles.navLinkActive
                  : ""
              }`}
            >
              {item.label}
            </Link>
          ))}

          {/* =================================================
              BENEFICIOS DESKTOP
          ================================================= */}

          <div
            ref={benefitsRef}
            className={
              styles.benefitsWrapper
            }
          >
            <button
              type="button"
              className={`${styles.benefitsButton} ${
                isBenefitActive
                  ? styles.benefitsActive
                  : ""
              }`}
              onClick={() =>
                setIsDesktopBenefitsOpen(
                  (previous) =>
                    !previous
                )
              }
              aria-expanded={
                isDesktopBenefitsOpen
              }
              aria-haspopup="menu"
            >
              <span>
                Beneficios
              </span>

              <CaretDownIcon
                size={15}
                weight="bold"
                className={
                  isDesktopBenefitsOpen
                    ? styles.caretOpen
                    : ""
                }
              />
            </button>

            <div
              className={`${styles.dropdown} ${
                isDesktopBenefitsOpen
                  ? styles.dropdownOpen
                  : ""
              }`}
              role="menu"
              aria-hidden={
                !isDesktopBenefitsOpen
              }
            >
              <div
                className={
                  styles.dropdownTitle
                }
              >
                <span>
                  BENEFICIOS ANCOSUR
                </span>

                <strong>
                  Elige una opción
                </strong>
              </div>

              <div
                className={
                  styles.dropdownList
                }
              >
                {benefitLinks.map(
                  (item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      role="menuitem"
                      className={`${styles.dropdownItem} ${
                        isActivePath(
                          item.href
                        )
                          ? styles.dropdownItemActive
                          : ""
                      }`}
                      onClick={() =>
                        setIsDesktopBenefitsOpen(
                          false
                        )
                      }
                    >
                      <span
                        className={
                          styles.dropdownDot
                        }
                      />

                      <span
                        className={
                          styles.dropdownText
                        }
                      >
                        <strong>
                          {item.label}
                        </strong>

                        <small>
                          {
                            item.description
                          }
                        </small>
                      </span>
                    </Link>
                  )
                )}
              </div>
            </div>
          </div>
        </nav>

        {/* =================================================
            WHATSAPP DESKTOP
        ================================================= */}

        <a
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className={
            styles.whatsappButton
          }
          aria-label="Contactar por WhatsApp"
        >
          <WhatsappLogoIcon
            size={19}
            weight="bold"
          />

          <span>
            971 069 763
          </span>
        </a>

        {/* =================================================
            BOTÓN MOBILE
        ================================================= */}

        <button
          type="button"
          className={
            styles.menuButton
          }
          onClick={() =>
            setIsMobileMenuOpen(
              (previous) =>
                !previous
            )
          }
          aria-label={
            isMobileMenuOpen
              ? "Cerrar menú"
              : "Abrir menú"
          }
          aria-expanded={
            isMobileMenuOpen
          }
          aria-controls="mobile-navigation"
        >
          {isMobileMenuOpen ? (
            <XIcon
              size={25}
              weight="bold"
            />
          ) : (
            <ListIcon
              size={27}
              weight="bold"
            />
          )}
        </button>
      </div>

      {/* =====================================================
          OVERLAY MOBILE
      ===================================================== */}

      <div
        id="mobile-navigation"
        className={`${styles.mobileOverlay} ${
          isMobileMenuOpen
            ? styles.mobileOverlayOpen
            : ""
        }`}
        onClick={(event) => {
          if (
            event.target ===
            event.currentTarget
          ) {
            closeMobileMenu();
          }
        }}
      >
        {/* =================================================
            PANEL MOBILE
        ================================================= */}

        <div
          className={
            styles.mobilePanel
          }
          onClick={(event) =>
            event.stopPropagation()
          }
        >
          <div
            className={
              styles.mobileHeader
            }
          >
            MENÚ ANCOSUR
          </div>

          <nav
            className={
              styles.mobileLinks
            }
            aria-label="Menú móvil"
          >
            {/* =================================================
                LINKS PRINCIPALES
            ================================================= */}

            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.mobileLink} ${
                  isActivePath(item.href)
                    ? styles.mobileLinkActive
                    : ""
                }`}
                onClick={
                  handleMobileNavigation
                }
              >
                {item.label}
              </Link>
            ))}

            {/* =================================================
                BENEFICIOS MOBILE
            ================================================= */}

            <div
              className={
                styles.mobileBenefits
              }
            >
              <button
                type="button"
                className={`${styles.mobileBenefitsButton} ${
                  isMobileBenefitsOpen
                    ? styles.mobileBenefitsOpen
                    : ""
                }`}
                onClick={(event) => {
                  event.stopPropagation();

                  setIsMobileBenefitsOpen(
                    (previous) =>
                      !previous
                  );
                }}
                aria-expanded={
                  isMobileBenefitsOpen
                }
                aria-haspopup="true"
              >
                <span>
                  Beneficios
                </span>

                <CaretDownIcon
                  size={18}
                  weight="bold"
                  className={
                    isMobileBenefitsOpen
                      ? styles.caretOpen
                      : ""
                  }
                />
              </button>

              {/* =================================================
                  SUBMENÚ MOBILE
              ================================================= */}

              <div
                className={`${styles.mobileBenefitsList} ${
                  isMobileBenefitsOpen
                    ? styles.mobileBenefitsListOpen
                    : ""
                }`}
              >
                {benefitLinks.map(
                  (item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`${styles.mobileBenefit} ${
                        isActivePath(
                          item.href
                        )
                          ? styles.mobileBenefitActive
                          : ""
                      }`}
                      onClick={
                        handleMobileNavigation
                      }
                    >
                      <span
                        className={
                          styles.mobileDot
                        }
                      />

                      <span
                        className={
                          styles.mobileBenefitText
                        }
                      >
                        <strong>
                          {item.label}
                        </strong>

                        <small>
                          {
                            item.description
                          }
                        </small>
                      </span>
                    </Link>
                  )
                )}
              </div>
            </div>
          </nav>

          {/* =================================================
              WHATSAPP MOBILE
          ================================================= */}

          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className={
              styles.mobileWhatsapp
            }
            onClick={
              closeMobileMenu
            }
          >
            <PhoneCallIcon
              size={20}
              weight="bold"
            />

            <span>
              971 069 763
            </span>
          </a>
        </div>
      </div>
    </header>
  );
}