"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import styles from "./HoldingSection.module.css";

type PlatformId =
  | "inmobiliario"
  | "construccion"
  | "resort"
  | "arquitectura"
  | "gestion"
  | "podcast";

type Accent =
  | "greenBrand"
  | "greenForest"
  | "greenFresh"
  | "greenOlive"
  | "greenDeep"
  | "greenLime";

type Platform = {
  id: PlatformId;
  label: string;
  description: string;
};

type Company = {
  name: string;
  category: string;
  platform: PlatformId;
  description: string;
  href: string;
  accent: Accent;
  logo: string;
};

const platforms: Platform[] = [
  {
    id: "inmobiliario",
    label: "Inmobiliario",
    description: "ANCOSUR",
  },
  {
    id: "construccion",
    label: "Construcción",
    description: "STRATON",
  },
  {
    id: "resort",
    label: "Resort",
    description: "ZAGARI",
  },
  {
    id: "arquitectura",
    label: "Diseño & arquitectura",
    description: "DARKHAM",
  },
  {
    id: "gestion",
    label: "Inversión & gestión",
    description: "SULPAA",
  },
  {
    id: "podcast",
    label: "Podcast & comunidad",
    description: "TERCER ESPACIO",
  },
];

const companies: Company[] = [
  {
    name: "ANCOSUR",
    category: "Desarrollo inmobiliario",
    platform: "inmobiliario",
    description:
      "Proyectos inmobiliarios para vivir, invertir y construir futuro.",
    href: "/nosotros",
    accent: "greenBrand",
    logo: "/assets/images/ancosur-logo.svg",
  },
  {
    name: "STRATON",
    category: "Construcción",
    platform: "construccion",
    description: "Construcción de proyectos con eficiencia, técnica y calidad.",
    href: "#",
    accent: "greenForest",
    logo: "/assets/images/straton.svg",
  },
  {
    name: "ZAGARI",
    category: "Resort",
    platform: "resort",
    description:
      "Proyectos turísticos que conectan inversión, naturaleza y experiencia.",
    href: "https://zagari.pe/",
    accent: "greenFresh",
    logo: "/assets/images/zagari.svg",
  },
  {
    name: "DARKHAM",
    category: "Diseño & arquitectura",
    platform: "arquitectura",
    description:
      "Diseño arquitectónico que transforma ideas en espacios con identidad.",
    href: "#",
    accent: "greenDeep",
    logo: "/assets/images/darkham.svg",
  },
  {
    name: "SULPAA",
    category: "Inversión & gestión",
    platform: "gestion",
    description:
      "Gestión estratégica de proyectos e inversiones para generar valor.",
    href: "https://sulpaa.com/",
    accent: "greenOlive",
    logo: "/assets/images/sulpaa.svg",
  },
  {
    name: "TERCER ESPACIO",
    category: "Podcast & comunidad",
    platform: "podcast",
    description:
      "Un espacio de conversación, ideas y comunidad impulsado por ANCOSUR.",
    href: "https://open.spotify.com/show/4MlsSTgEjZAUKhd9SsQ5tp",
    accent: "greenLime",
    logo: "/assets/images/tercer-espacio.svg",
  },
];

export default function HoldingSection() {
  const [activePlatform, setActivePlatform] =
    useState<PlatformId>("inmobiliario");

  const activeCompany = useMemo(() => {
    return (
      companies.find((company) => company.platform === activePlatform) ??
      companies[0]
    );
  }, [activePlatform]);

  const activeInfo =
    platforms.find((item) => item.id === activePlatform) ?? platforms[0];

  const hasWebsite = activeCompany.href !== "#";

  return (
    <section className={`${styles.section} ${styles[activeCompany.accent]}`}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span>Ecosistema empresarial</span>
          <h2>Nuestro Holding</h2>
          <p>
            Empresas especializadas en inmobiliaria, construcción, diseño,
            turismo, inversión y comunidad.
          </p>
        </div>

        <div className={styles.layout}>
          <aside className={styles.sidebar}>
            <div className={styles.sidebarTop}>
              <small>Unidad activa</small>
              <strong>{activeInfo.label}</strong>
              <p>{activeInfo.description}</p>
            </div>

            <div className={styles.platforms}>
              {platforms.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActivePlatform(item.id)}
                  className={`${styles.platformItem} ${
                    activePlatform === item.id ? styles.activePlatform : ""
                  }`}
                >
                  <strong>{String(index + 1).padStart(2, "0")}</strong>

                  <span>
                    {item.label}
                    <small>{item.description}</small>
                  </span>
                </button>
              ))}
            </div>
          </aside>

          <div className={styles.content}>
            <article className={styles.featureCard}>
              <small className={styles.category}>{activeCompany.category}</small>

              <div className={styles.featureLogo}>
                <Image
                  src={activeCompany.logo}
                  alt={activeCompany.name}
                  width={620}
                  height={260}
                  className={styles.featureLogoImage}
                  priority
                />
              </div>

              <p>{activeCompany.description}</p>

              {hasWebsite ? (
                <a
                  href={activeCompany.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.link}
                >
                  Conocer más
                  <span aria-hidden="true">→</span>
                </a>
              ) : (
                <span className={`${styles.link} ${styles.linkDisabled}`}>
                  Próximamente
                  <span aria-hidden="true">→</span>
                </span>
              )}
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}