"use client";

import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  CertificateIcon,
  EnvelopeSimpleIcon,
  FacebookLogoIcon,
  InstagramLogoIcon,
  LinkedinLogoIcon,
  MapPinIcon,
  PhoneIcon,
  TiktokLogoIcon,
  UsersThreeIcon,
  WhatsappLogoIcon,
  XLogoIcon,
  YoutubeLogoIcon,
} from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import styles from "./Footer.module.css";

type FooterLink = {
  label: string;
  href: string;
};

const logoSrc = "/assets/images/ancosur-logo-black.svg";

const companyLinks: FooterLink[] = [
  { label: "Departamentos", href: "/departamentos" },
  { label: "Lotes", href: "/lotes" },
  { label: "Nosotros", href: "/nosotros" },
  { label: "Trabaja con nosotros", href: "/trabaja-con-nosotros" },
];

const investorLinks: FooterLink[] = [
  { label: "Inversionistas", href: "/inversionistas" },
  { label: "Compra de terrenos", href: "/beneficios" },
  { label: "Portal de Transparencia", href: "/portal-de-transparencia" },
  { label: "Políticas", href: "/politicas" },
];

const socialLinks = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/ancosurinmobiliaria",
    Icon: FacebookLogoIcon,
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@ancosurinmobiliaria",
    Icon: TiktokLogoIcon,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/ancosurinmobiliaria/",
    Icon: InstagramLogoIcon,
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@ancosurinmobiliaria",
    Icon: YoutubeLogoIcon,
  },
  {
    label: "LinkedIn",
    href: "https://pe.linkedin.com/company/ancosurinmobiliaria",
    Icon: LinkedinLogoIcon,
  },
  {
    label: "X",
    href: "https://x.com/Ancosur_",
    Icon: XLogoIcon,
  },
];

const legalCards = [
  {
    label: "Libro de Reclamaciones",
    href:
      "https://wa.me/51971069763?text=Hola,%20quiero%20información%20sobre%20el%20Libro%20de%20Reclamaciones%20de%20ANCOSUR",
    Icon: WhatsappLogoIcon,
  },
  {
    label: "Certificados",
    href: "/#certificaciones",
    Icon: CertificateIcon,
  },
];

export default function Footer() {
  const [logoError, setLogoError] = useState(false);

  return (
    <footer className={styles.footer}>

      {/* =====================================================
          ARCO SUPERIOR
          EL FOOTER ES LA BASE VERDE
          Y ESTAS SON LAS 3 CAPAS SUPERIORES
      ===================================================== */}

      <div
        className={styles.rainbowArc}
        aria-hidden="true"
      >
        <span className={styles.arcOne} />
        <span className={styles.arcTwo} />
        <span className={styles.arcThree} />
      </div>


      {/* =====================================================
          CONTENIDO
      ===================================================== */}

      <div className={styles.container}>

        {/* =================================================
            MARCA
        ================================================= */}

        <div className={styles.brandCard}>

          <div className={styles.brandIdentity}>

            <Link
              href="/"
              className={styles.logo}
              aria-label="Ir al inicio de ANCOSUR"
            >
              {!logoError ? (
                <Image
                  src={logoSrc}
                  alt="ANCOSUR Inmobiliaria"
                  width={190}
                  height={60}
                  className={styles.logoImage}
                  onError={() => setLogoError(true)}
                />
              ) : (
                <span className={styles.logoText}>
                  ANCOSUR
                </span>
              )}
            </Link>

            <div className={styles.brandDescription}>
              <span>
                Desarrollamos futuro
              </span>

              <p>
                Creamos proyectos inmobiliarios
                pensados para vivir, invertir y
                construir un patrimonio seguro.
              </p>
            </div>

          </div>


          <div className={styles.brandActions}>

            <Link
              href="/departamentos"
              className={styles.projectsButton}
            >
              Conocer proyectos

              <ArrowRightIcon
                size={17}
                weight="bold"
              />
            </Link>


            <div className={styles.socialArea}>

              <span>
                Síguenos
              </span>

              <div className={styles.socials}>

                {socialLinks.map(
                  ({
                    label,
                    href,
                    Icon,
                  }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      title={label}
                    >
                      <Icon
                        size={18}
                        weight="fill"
                      />
                    </a>
                  )
                )}

              </div>

            </div>

          </div>

        </div>


        {/* =================================================
            COLUMNAS
        ================================================= */}

        <div className={styles.columns}>

          <div className={styles.column}>

            <div className={styles.columnHeading}>
              <span>01</span>

              <h3>
                Explora ANCOSUR
              </h3>
            </div>

            <ul className={styles.linkList}>

              {companyLinks.map((item) => (
                <li key={item.label}>

                  <Link href={item.href}>

                    <span>
                      {item.label}
                    </span>

                    <ArrowRightIcon
                      size={14}
                      weight="bold"
                    />

                  </Link>

                </li>
              ))}

            </ul>

          </div>


          <div className={styles.column}>

            <div className={styles.columnHeading}>
              <span>02</span>

              <h3>
                Información
              </h3>
            </div>

            <ul className={styles.linkList}>

              {investorLinks.map((item) => (
                <li key={item.label}>

                  <Link href={item.href}>

                    <span>
                      {item.label}
                    </span>

                    <ArrowRightIcon
                      size={14}
                      weight="bold"
                    />

                  </Link>

                </li>
              ))}

            </ul>

          </div>


          <div className={styles.column}>

            <div className={styles.columnHeading}>
              <span>03</span>

              <h3>
                Atención al cliente
              </h3>
            </div>

            <div className={styles.contactList}>

              <a
                href="tel:+51968658098"
                className={styles.contactItem}
              >
                <span className={styles.contactIcon}>
                  <PhoneIcon
                    size={17}
                    weight="bold"
                  />
                </span>

                <span className={styles.contactContent}>

                  <small>
                    Teléfono
                  </small>

                  <strong>
                    (+51) 968 658 098
                  </strong>

                </span>
              </a>


              <a
                href="mailto:jefe.experiencia.cliente@ancosur.com"
                className={styles.contactItem}
              >

                <span className={styles.contactIcon}>
                  <EnvelopeSimpleIcon
                    size={17}
                    weight="bold"
                  />
                </span>

                <span className={styles.contactContent}>

                  <small>
                    Correo
                  </small>

                  <strong>
                    jefe.experiencia.cliente@ancosur.com
                  </strong>

                </span>

              </a>

            </div>

          </div>


          <div className={styles.column}>

            <div className={styles.columnHeading}>
              <span>04</span>

              <h3>
                Oficina de ventas
              </h3>
            </div>

            <div className={styles.officeCard}>

              <span className={styles.officeIcon}>
                <MapPinIcon
                  size={19}
                  weight="fill"
                />
              </span>

              <address>

                <strong>
                  Sala de ventas
                </strong>

                <span>
                  Av. San Carlos 1481
                </span>

                <small>
                  San Antonio, Huancayo
                </small>

              </address>

            </div>


            <Link
              href="/equipo"
              className={styles.teamCard}
            >

              <span className={styles.teamIcon}>
                <UsersThreeIcon
                  size={23}
                  weight="fill"
                />
              </span>

              <span className={styles.teamContent}>

                <small>
                  Personas que hacen posible
                  cada proyecto
                </small>

                <strong>
                  Conoce al equipo ANCOSUR
                </strong>

              </span>

              <ArrowUpRightIcon
                size={17}
                weight="bold"
              />

            </Link>

          </div>

        </div>


        {/* =================================================
            LEGAL
        ================================================= */}

        <div className={styles.legalSection}>

          <div className={styles.legalHeading}>

            <span>
              Atención y transparencia
            </span>

            <h3>
              Información importante
              para nuestros clientes
            </h3>

          </div>


          <div className={styles.legalCards}>

            {legalCards.map(
              ({
                label,
                href,
                Icon,
              }) => (
                <a
                  key={label}
                  href={href}
                  target={
                    href.startsWith("http")
                      ? "_blank"
                      : undefined
                  }
                  rel={
                    href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className={styles.legalCard}
                  aria-label={label}
                  title={label}
                >

                  <Icon
                    size={25}
                    weight="fill"
                  />

                  <span>
                    {label}
                  </span>

                  <ArrowUpRightIcon
                    size={15}
                    weight="bold"
                  />

                </a>
              )
            )}

          </div>

        </div>


        {/* =================================================
            BOTTOM
        ================================================= */}

        <div className={styles.bottom}>

          <p>
            © {new Date().getFullYear()} ANCOSUR
            Inmobiliaria. Todos los derechos
            reservados.
          </p>

          <div>

            <Link href="/politicas/politica-de-privacidad">
              Privacidad
            </Link>

            <span aria-hidden="true">
              •
            </span>

            <Link href="/politicas/terminos-y-condiciones">
              Términos y condiciones
            </Link>

          </div>

        </div>

      </div>

    </footer>
  );
}