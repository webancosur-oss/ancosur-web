"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./Footer.module.css";
import { useState } from "react";

type FooterLink = {
  label: string;
  href: string;
};

type SocialLink = {
  label: string;
  image: string;
  href: string;
};

const logoSrc = "/assets/images/ancosur-logo.svg"


const companyLinks: FooterLink[] = [
  { label: "Departamentos", href: "/departamentos" },
  { label: "Lotes", href: "/lotes" },
  { label: "Nosotros", href: "/nosotros" },
  { label: "Trabaja con nosotros", href: "/trabaja-con-nosotros" },
];

const investorLinks: FooterLink[] = [
  { label: "Inversionistas", href: "/inversionistas" },
  { label: "Compra de terrenos", href: "/beneficios" },
  // { label: "Portal de Transparencia", href: "/portal-de-transparencia" },
  { label: "Políticas", href: "/politicas" },
];

const supportLinks: FooterLink[] = [
{
  label: "Libro de Reclamaciones",
  href: "https://wa.me/51971069763?text=Hola,%20quiero%20información%20sobre%20el%20Libro%20de%20Reclamaciones%20de%20ANCOSUR",
},  { label: "Certificados", href: "/#certificaciones" },
];

const socialLinks: SocialLink[] = [
  {
    label: "Facebook",
    image: "/assets/icons/facebook.png",
    href: "https://www.facebook.com/ancosurinmobiliaria",
  },
  {
    label: "TikTok",
    image: "/assets/icons/tiktok.png",
    href: "https://www.tiktok.com/@ancosurinmobiliaria",
  },
  {
    label: "Instagram",
    image: "/assets/icons/instagram.png",
    href: "https://www.instagram.com/ancosurinmobiliaria/",
  },
  {
    label: "YouTube",
    image: "/assets/icons/youtube.png",
    href: "https://youtube.com",
  },
  {
    label: "LinkedIn",
    image: "/assets/icons/linkedin.png",
    href: "https://pe.linkedin.com/company/ancosurinmobiliaria",
  },
   {
    label: "Twitter",
    image: "/assets/icons/twitter.png",
    href: "https://x.com/Ancosur_",
  },
];

export default function Footer() {
    const [logoError, setLogoError] = useState(false);

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.brand}>
           {!logoError ? (
           <Link href="/" className={styles.logo}>
  {!logoError ? (
    <img
      src={logoSrc}
      alt="ANCOSUR Inmobiliaria"
      className={styles.logoImage}
      onError={() => setLogoError(true)}
    />
  ) : (
    <span className={styles.logoText}>ANCOSUR</span>
  )}
</Link>
            
          ) : (
            <span className={styles.logoText}>ANCOSUR</span>
          )}
          <p>
            Desarrollamos proyectos inmobiliarios pensados para vivir, invertir
            y construir futuro.
          </p>

          <div className={styles.socials}>
            {socialLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.label}
              >
                <Image
                  src={item.image}
                  alt={item.label}
                  width={22}
                  height={22}
                />
              </a>
            ))}
          </div>
        </div>

        <div className={styles.columns}>
          <div className={styles.column}>
            {/* <h3>Nosotros</h3> */}
            <ul>
              {companyLinks.map((item) => (
                <li key={item.label}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.column}>
            {/* <h3>Políticas</h3> */}
            <ul>
              {investorLinks.map((item) => (
                <li key={item.label}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.column}>
            <h3>Atención al cliente</h3>

            <ul className={styles.contactList}>
              <li>
                <span>Teléfono</span>
                <a href="tel:+51968658098">(+51) 968 658 098</a>
              </li>

              <li>
                <span>Correo</span>
                <a href="mailto:jefe.experiencia.cliente@ancosur.com">jefe.experiencia.cliente@ancosur.com</a>
              </li>
            </ul>
          </div>

          <div className={styles.column}>
            <h3>Oficina de ventas</h3>

            <address>
              Av. San Carlos 1481
              <br />
              San Antonio – Huancayo
            </address>

            <div className={styles.memberBox}>
              <span>Miembros de</span>
              <Link href={"/equipo"}>
              <strong>ANCOSUR Inmobiliaria</strong>
              </Link>
            </div>
          </div>
        </div>

        <div className={styles.legalCards}>
          {supportLinks.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              // target="_blank"
              className={styles.legalCard}
            >
              <span>{item.label}</span>
              <small>Ver información</small>
            </Link>
          ))}
        </div>

        <div className={styles.bottom}>
          <p>
            © {new Date().getFullYear()} ANCOSUR Inmobiliaria. Todos los
            derechos reservados.
          </p>

          <div>
            <Link href="/politicas">Privacidad</Link>
            <Link href="/terminos-y-condiciones">Términos</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}