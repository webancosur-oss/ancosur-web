"use client";

import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  BuildingsIcon,
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

const logoSrc =
  "/assets/images/ancosur-logo-black.svg";

const companyLinks: FooterLink[] = [
  {
    label: "Departamentos",
    href: "/departamentos",
  },
  {
    label: "Lotes",
    href: "/lotes",
  },
  {
    label: "Nosotros",
    href: "/nosotros",
  },
  {
    label: "Trabaja con nosotros",
    href: "/trabaja-con-nosotros",
  },
];

const investorLinks: FooterLink[] = [
  {
    label: "Inversionistas",
    href: "/inversionistas",
  },
  {
    label: "Compra de terrenos",
    href: "/beneficios",
  },
  {
    label: "Portal de Transparencia",
    href: "/portal-de-transparencia",
  },
  {
    label: "Políticas",
    href: "/politicas",
  },
];

const socialLinks = [
  {
    label: "Facebook",
    href:
      "https://www.facebook.com/ancosurinmobiliaria",
    Icon: FacebookLogoIcon,
  },
  {
    label: "TikTok",
    href:
      "https://www.tiktok.com/@ancosurinmobiliaria",
    Icon: TiktokLogoIcon,
  },
  {
    label: "Instagram",
    href:
      "https://www.instagram.com/ancosurinmobiliaria/",
    Icon: InstagramLogoIcon,
  },
  {
    label: "YouTube",
    href:
      "https://www.youtube.com/@ancosurinmobiliaria",
    Icon: YoutubeLogoIcon,
  },
  {
    label: "LinkedIn",
    href:
      "https://pe.linkedin.com/company/ancosurinmobiliaria",
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
    label:
      "Libro de Reclamaciones",
    description:
      "Registra una consulta, reclamo o solicitud de atención.",
    href:
      "https://wa.me/51971069763?text=Hola,%20quiero%20información%20sobre%20el%20Libro%20de%20Reclamaciones%20de%20ANCOSUR",
    external: true,
    Icon: WhatsappLogoIcon,
  },
  {
    label: "Certificados",
    description:
      "Conoce los reconocimientos y certificaciones de ANCOSUR.",
    href: "/#certificaciones",
    external: false,
    Icon: CertificateIcon,
  },
];

export default function Footer() {
  const [logoError, setLogoError] =
    useState(false);

  return (
    <footer
      className={styles.footer}
    >
      <div
        className={styles.curveLine}
        aria-hidden="true"
      />

      <div
        className={styles.container}
      >
        <div
          className={styles.brandCard}
        >
          <div
            className={
              styles.brandIdentity
            }
          >
            <Link
              href="/"
              className={styles.logo}
              aria-label="Ir al inicio de ANCOSUR"
            >
              {!logoError ? (
                <Image
                  src={logoSrc}
                  alt="ANCOSUR Inmobiliaria"
                  width={220}
                  height={68}
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

            <div
              className={
                styles.brandDescription
              }
            >
              <span>
                Desarrollamos futuro
              </span>

              <p>
                Creamos proyectos
                inmobiliarios pensados
                para vivir, invertir y
                construir un patrimonio
                seguro.
              </p>
            </div>
          </div>

          <div
            className={
              styles.brandActions
            }
          >
            <Link
              href="/departamentos"
              className={
                styles.projectsButton
              }
            >
              Conocer proyectos

              <ArrowRightIcon
                size={18}
                weight="bold"
                aria-hidden="true"
              />
            </Link>

            <div
              className={
                styles.socialArea
              }
            >
              <span>
                Síguenos en redes
              </span>

              <div
                className={
                  styles.socials
                }
              >
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
                        size={20}
                        weight="fill"
                        aria-hidden="true"
                      />
                    </a>
                  )
                )}
              </div>
            </div>
          </div>
        </div>

        <div
          className={styles.columns}
        >
          <div
            className={styles.column}
          >
            <div
              className={
                styles.columnHeading
              }
            >
              <span>01</span>
              <h3>Explora ANCOSUR</h3>
            </div>

            <ul
              className={
                styles.linkList
              }
            >
              {companyLinks.map(
                (item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                    >
                      <span>
                        {item.label}
                      </span>

                      <ArrowRightIcon
                        size={15}
                        weight="bold"
                        aria-hidden="true"
                      />
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          <div
            className={styles.column}
          >
            <div
              className={
                styles.columnHeading
              }
            >
              <span>02</span>
              <h3>Información</h3>
            </div>

            <ul
              className={
                styles.linkList
              }
            >
              {investorLinks.map(
                (item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                    >
                      <span>
                        {item.label}
                      </span>

                      <ArrowRightIcon
                        size={15}
                        weight="bold"
                        aria-hidden="true"
                      />
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          <div
            className={styles.column}
          >
            <div
              className={
                styles.columnHeading
              }
            >
              <span>03</span>
              <h3>
                Atención al cliente
              </h3>
            </div>

            <div
              className={
                styles.contactList
              }
            >
              <a
                href="tel:+51968658098"
                className={
                  styles.contactItem
                }
              >
                <span
                  className={
                    styles.contactIcon
                  }
                >
                  <PhoneIcon
                    size={19}
                    weight="bold"
                    aria-hidden="true"
                  />
                </span>

                <span
                  className={
                    styles.contactContent
                  }
                >
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
                className={
                  styles.contactItem
                }
              >
                <span
                  className={
                    styles.contactIcon
                  }
                >
                  <EnvelopeSimpleIcon
                    size={19}
                    weight="bold"
                    aria-hidden="true"
                  />
                </span>

                <span
                  className={
                    styles.contactContent
                  }
                >
                  <small>Correo</small>

                  <strong>
                    jefe.experiencia.cliente
                    @ancosur.com
                  </strong>
                </span>
              </a>
            </div>
          </div>

          <div
            className={styles.column}
          >
            <div
              className={
                styles.columnHeading
              }
            >
              <span>04</span>
              <h3>
                Oficina de ventas
              </h3>
            </div>

            <div
              className={
                styles.officeCard
              }
            >
              <span
                className={
                  styles.officeIcon
                }
              >
                <MapPinIcon
                  size={21}
                  weight="fill"
                  aria-hidden="true"
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
                  San Antonio,
                  Huancayo
                </small>
              </address>
            </div>

            <Link
              href="/equipo"
              className={
                styles.teamCard
              }
            >
              <span
                className={
                  styles.teamIcon
                }
              >
                <UsersThreeIcon
                  size={27}
                  weight="fill"
                  aria-hidden="true"
                />
              </span>

              <span
                className={
                  styles.teamContent
                }
              >
                <small>
                  Personas que hacen
                  posible cada proyecto
                </small>

                <strong>
                  Conoce al equipo
                  ANCOSUR
                </strong>
              </span>

              <ArrowUpRightIcon
                size={19}
                weight="bold"
                aria-hidden="true"
              />
            </Link>
          </div>
        </div>

        <div
          className={
            styles.legalSection
          }
        >
          <div
            className={
              styles.legalHeading
            }
          >
            <div>
              <span>
                Atención y transparencia
              </span>

              <h3>
                Información importante
                para nuestros clientes
              </h3>
            </div>

          </div>

          <div
            className={
              styles.legalCards
            }
          >
            {legalCards.map(
              ({
                label,
                description,
                href,
                external,
                Icon,
              }) =>
                external ? (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={
                      styles.legalCard
                    }
                  >
                    <span
                      className={
                        styles.legalIcon
                      }
                    >
                      <Icon
                        size={25}
                        weight="fill"
                        aria-hidden="true"
                      />
                    </span>

                    <span
                      className={
                        styles.legalContent
                      }
                    >
                      <strong>
                        {label}
                      </strong>

                      <small>
                        {description}
                      </small>
                    </span>

                    <ArrowUpRightIcon
                      size={19}
                      weight="bold"
                      aria-hidden="true"
                    />
                  </a>
                ) : (
                  <Link
                    key={label}
                    href={href}
                    className={
                      styles.legalCard
                    }
                  >
                    <span
                      className={
                        styles.legalIcon
                      }
                    >
                      <Icon
                        size={25}
                        weight="fill"
                        aria-hidden="true"
                      />
                    </span>

                    <span
                      className={
                        styles.legalContent
                      }
                    >
                      <strong>
                        {label}
                      </strong>

                      <small>
                        {description}
                      </small>
                    </span>

                    <ArrowUpRightIcon
                      size={19}
                      weight="bold"
                      aria-hidden="true"
                    />
                  </Link>
                )
            )}
          </div>
        </div>

        <div className={styles.bottom}>
          <p>
            © {new Date().getFullYear()}{" "}
            ANCOSUR Inmobiliaria. Todos
            los derechos reservados.
          </p>

          <div>
            <Link href="/politicas">
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