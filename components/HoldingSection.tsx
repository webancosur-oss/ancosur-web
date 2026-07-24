"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

import styles from "./HoldingSection.module.css";

type CompanyId =
  | "ancosur"
  | "straton"
  | "zagari"
  | "darkham"
  | "sulpaa"
  | "tercer-espacio";

type Company = {
  id: CompanyId;
  name: string;
  category: string;
  description: string;
  href: string;
  logo: string;
  background: string;
  tone: string;
};

const companies: Company[] = [
  {
    id: "ancosur",
    name: "ANCOSUR",
    category: "Desarrollo inmobiliario",
    description:
      "Creamos proyectos inmobiliarios para vivir, invertir y construir un patrimonio seguro.",
    href: "/nosotros",
    logo: "/assets/images/ancosur-logo.svg",
    background: "/assets/holding/ancosur.webp",
    tone: "#00a74f",
  },
  {
    id: "straton",
    name: "STRATON",
    category: "Construcción",
    description:
      "Ejecutamos proyectos de construcción con eficiencia, precisión técnica y altos estándares de calidad.",
    href: "#",
    logo: "/assets/images/straton.svg",
    background: "/assets/holding/straton.webp",
    tone: "#185d36",
  },
  {
    id: "zagari",
    name: "ZAGARI",
    category: "Resort y turismo",
    description:
      "Desarrollamos experiencias turísticas que conectan inversión, naturaleza y bienestar.",
    href: "https://zagari.pe/",
    logo: "/assets/images/zagari.svg",
    background: "/assets/holding/zagari.webp",
    tone: "#4aaa72",
  },
  {
    id: "darkham",
    name: "DARKHAM",
    category: "Diseño y arquitectura",
    description:
      "Transformamos conceptos en espacios arquitectónicos funcionales, contemporáneos y con identidad.",
    href: "#",
    logo: "/assets/images/darkham.svg",
    background: "/assets/holding/darkham.webp",
    tone: "#073d25",
  },
  {
    id: "sulpaa",
    name: "SULPAA",
    category: "Inversión y gestión",
    description:
      "Gestionamos proyectos e inversiones mediante estrategias orientadas al crecimiento y la generación de valor.",
    href: "https://sulpaa.com/",
    logo: "/assets/images/sulpaa.svg",
    background: "/assets/holding/sulpaa.webp",
    tone: "#718f43",
  },
  {
    id: "tercer-espacio",
    name: "TERCER ESPACIO",
    category: "Podcast y comunidad",
    description:
      "Un espacio de conversación, conocimiento y comunidad donde compartimos nuevas perspectivas.",
    href: "https://open.spotify.com/show/4MlsSTgEjZAUKhd9SsQ5tp",
    logo: "/assets/images/tercer-espacio.svg",
    background: "/assets/holding/tercer-espacio.webp",
    tone: "#9dbb4d",
  },
];

export default function HoldingSection() {
  const [activeCompanyId, setActiveCompanyId] =
    useState<CompanyId>("ancosur");

  const activeCompany = useMemo(
    () =>
      companies.find(
        (company) => company.id === activeCompanyId,
      ) ?? companies[0],
    [activeCompanyId],
  );

  const isExternal = activeCompany.href.startsWith("http");
  const hasWebsite = activeCompany.href !== "#";

  return (
    <section
      className={styles.section}
      style={
        {
          "--active-tone": activeCompany.tone,
        } as React.CSSProperties
      }
    >
      {/* FONDO */}

      <div className={styles.background}>
        {companies.map((company) => (
          <Image
            key={company.id}
            src={company.background}
            alt=""
            fill
            priority={company.id === "ancosur"}
            sizes="100vw"
            className={`${styles.backgroundImage} ${
              activeCompanyId === company.id
                ? styles.backgroundImageActive
                : ""
            }`}
          />
        ))}
      </div>

      <div
        className={styles.backgroundOverlay}
        aria-hidden="true"
      />

      <div
        className={styles.backgroundGlow}
        aria-hidden="true"
      />

      <div className={styles.container}>
        {/* INFORMACIÓN */}

        <div className={styles.content}>
          <span className={styles.eyebrow}>
            Ecosistema empresarial
          </span>

          <div className={styles.activeLogo}>
            <Image
              key={activeCompany.id}
              src={activeCompany.logo}
              alt={activeCompany.name}
              width={440}
              height={170}
              className={styles.activeLogoImage}
              priority
            />
          </div>

          <span className={styles.category}>
            {activeCompany.category}
          </span>

          <h2>{activeCompany.name}</h2>

          <p>{activeCompany.description}</p>

          {hasWebsite ? (
            <a
              href={activeCompany.href}
              target={isExternal ? "_blank" : undefined}
              rel={
                isExternal
                  ? "noopener noreferrer"
                  : undefined
              }
              className={styles.mainButton}
            >
              Visitar sitio

              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fill="currentColor"
                  d="M7 17 17 7M9 7h8v8"
                />
              </svg>
            </a>
          ) : (
            <span
              className={`${styles.mainButton} ${styles.disabledButton}`}
            >
              Próximamente
            </span>
          )}
        </div>

        {/* SELECTOR DE EMPRESAS */}

        <nav
          className={styles.companyNavigation}
          aria-label="Empresas del Holding"
        >
          {companies.map((company, index) => {
            const isActive =
              activeCompanyId === company.id;

            return (
              <button
                key={company.id}
                type="button"
                className={`${styles.companyButton} ${
                  isActive
                    ? styles.companyButtonActive
                    : ""
                }`}
                style={
                  {
                    "--company-tone": company.tone,
                  } as React.CSSProperties
                }
                onClick={() =>
                  setActiveCompanyId(company.id)
                }
                onMouseEnter={() =>
                  setActiveCompanyId(company.id)
                }
                aria-label={`Mostrar ${company.name}`}
                aria-pressed={isActive}
              >
                <span className={styles.companyNumber}>
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className={styles.companyLogo}>
                  <Image
                    src={company.logo}
                    alt={company.name}
                    width={180}
                    height={90}
                    className={styles.companyLogoImage}
                  />
                </span>

                <span className={styles.companyText}>
                  <strong>{company.name}</strong>
                  <small>{company.category}</small>
                </span>
              </button>
            );
          })}
        </nav>
      </div>
    </section>
  );
}