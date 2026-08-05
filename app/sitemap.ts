import type { MetadataRoute } from "next";

import { blogPosts } from "@/data/blog";
import { projects } from "@/data/projects";

const SITE_URL = "https://ancosur.com";

/* =========================================================
   CONVERTIR RUTAS EN URL ABSOLUTA
========================================================= */

function toAbsoluteUrl(pathname: string): string {
  if (
    pathname.startsWith("http://") ||
    pathname.startsWith("https://")
  ) {
    return pathname;
  }

  const cleanPath = pathname
    .split("?")[0]
    .split("#")[0]
    .replace(/^\/+|\/+$/g, "");

  return cleanPath
    ? `${SITE_URL}/${cleanPath}`
    : `${SITE_URL}/`;
}

/* =========================================================
   PÁGINAS ESTÁTICAS

   Agrega únicamente rutas que tengan un page.tsx real.
   No agregar:
   - /404
   - /not-found
   - archivos inexistentes
========================================================= */

const staticPages: MetadataRoute.Sitemap = [
  {
    url: `${SITE_URL}/`,
    changeFrequency: "weekly",
    priority: 1,
  },
  {
    url: `${SITE_URL}/proyectos`,
    changeFrequency: "weekly",
    priority: 0.9,
  },
  {
    url: `${SITE_URL}/departamentos`,
    changeFrequency: "weekly",
    priority: 0.9,
  },
  {
    url: `${SITE_URL}/lotes`,
    changeFrequency: "weekly",
    priority: 0.9,
  },
  {
    url: `${SITE_URL}/resorts`,
    changeFrequency: "weekly",
    priority: 0.8,
  },
  {
    url: `${SITE_URL}/promociones`,
    changeFrequency: "weekly",
    priority: 0.8,
  },
  {
    url: `${SITE_URL}/proyectos-entregados`,
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    url: `${SITE_URL}/nosotros`,
    changeFrequency: "monthly",
    priority: 0.7,
  },
  {
    url: `${SITE_URL}/equipo`,
    changeFrequency: "monthly",
    priority: 0.6,
  },
  {
    url: `${SITE_URL}/inversionistas`,
    changeFrequency: "monthly",
    priority: 0.7,
  },
  {
    url: `${SITE_URL}/blog`,
    changeFrequency: "weekly",
    priority: 0.8,
  },
  {
    url: `${SITE_URL}/trabaja-con-nosotros`,
    changeFrequency: "weekly",
    priority: 0.6,
  },
  {
    url: `${SITE_URL}/politicas`,
    changeFrequency: "yearly",
    priority: 0.4,
  },
  {
    url: `${SITE_URL}/portal-de-transparencia`,
    changeFrequency: "monthly",
    priority: 0.5,
  },
  {
    url: `${SITE_URL}/libro-de-reclamaciones`,
    changeFrequency: "yearly",
    priority: 0.4,
  },
  {
    url: `${SITE_URL}/club-beneficios`,
    changeFrequency: "monthly",
    priority: 0.6,
  },
  {
    url: `${SITE_URL}/compramos-terreno`,
    changeFrequency: "monthly",
    priority: 0.6,
  },
  {
    url: `${SITE_URL}/socio-referido`,
    changeFrequency: "monthly",
    priority: 0.6,
  },
];

/* =========================================================
   PÁGINAS DE PROYECTOS

   Se generan desde @/data/projects.
========================================================= */

const projectPages: MetadataRoute.Sitemap = projects
  .filter((project) => {
    return (
      typeof project.href === "string" &&
      project.href.startsWith("/") &&
      project.href !== "/" &&
      !project.href.startsWith("/#") &&
      !project.href.includes("?") &&
      !project.href.includes("#")
    );
  })
  .map((project) => ({
    url: toAbsoluteUrl(project.href),

    changeFrequency:
      project.status === "ENTREGADO"
        ? "monthly"
        : "weekly",

    priority:
      project.status === "ENTREGADO"
        ? 0.6
        : 0.8,

    images: project.image
      ? [toAbsoluteUrl(project.image)]
      : undefined,
  }));

/* =========================================================
   ARTÍCULOS DEL BLOG
========================================================= */

const blogPages: MetadataRoute.Sitemap = blogPosts
  .filter((post) => {
    return (
      typeof post.slug === "string" &&
      post.slug.trim().length > 0
    );
  })
  .map((post) => ({
    url: `${SITE_URL}/blog/${encodeURIComponent(
      post.slug.trim(),
    )}`,

    changeFrequency: "monthly",

    priority: 0.7,

    images: post.image
      ? [toAbsoluteUrl(post.image)]
      : undefined,
  }));

/* =========================================================
   GENERAR SITEMAP SIN DUPLICADOS
========================================================= */

export default function sitemap(): MetadataRoute.Sitemap {
  const allPages = [
    ...staticPages,
    ...projectPages,
    ...blogPages,
  ];

  const uniquePages = new Map<
    string,
    MetadataRoute.Sitemap[number]
  >();

  for (const page of allPages) {
    uniquePages.set(page.url, page);
  }

  return Array.from(uniquePages.values());
}