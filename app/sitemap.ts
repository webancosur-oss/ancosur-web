import type { MetadataRoute } from "next";

import { transparencyProjects } from "@/app/portal-de-transparencia/data";
import { absoluteUrl } from "@/src/seo";

/* El sitemap se regenera cada hora para incluir artículos
   nuevos del blog sin necesidad de un nuevo deploy. */
export const revalidate = 3600;

const API_URL =
  process.env.API_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "https://ancosur-api-production.up.railway.app";

type Entry = MetadataRoute.Sitemap[number];

const page = (
  pathname: string,
  changeFrequency: Entry["changeFrequency"],
  priority: number,
  image?: string,
): Entry => ({
  url: absoluteUrl(pathname),
  changeFrequency,
  priority,
  ...(image ? { images: [absoluteUrl(image)] } : {}),
});

/* =========================================================
   RUTAS REALES (cada una tiene su page.tsx)
   Si agregas o renombras una página, actualízala aquí.
========================================================= */

const corePages: Entry[] = [
  page("/", "weekly", 1, "/og/ancosur.jpg"),
  page("/proyectos", "weekly", 0.9),
  page("/departamentos", "weekly", 0.9),
  page("/lotes", "weekly", 0.9),
  page("/resorts", "weekly", 0.8, "/og/resorts.jpg"),
  page("/promociones", "weekly", 0.8),
  page("/proyectos-entregados", "monthly", 0.7),
  page("/nosotros", "monthly", 0.7, "/og/nosotros.jpg"),
  page("/equipo", "monthly", 0.6),
  page("/inversionistas", "monthly", 0.7),
  page("/blog", "weekly", 0.8),
  page("/trabaja-con-nosotros", "weekly", 0.6),
  page("/beneficios/club-beneficios", "monthly", 0.6),
  page("/beneficios/compramos-tu-terreno", "monthly", 0.6),
  page("/beneficios/socio-referido", "monthly", 0.6),
  page("/portal-de-transparencia", "monthly", 0.5),
  page("/libro-de-reclamaciones", "yearly", 0.3),
  page("/politicas", "yearly", 0.3),
  page("/politicas/politica-de-privacidad", "yearly", 0.3),
  page("/politicas/terminos-y-condiciones", "yearly", 0.3),
  page("/politicas/cookies", "yearly", 0.3),
  page("/politicas/sig", "yearly", 0.3),
  page("/politicas/sig-alcance", "yearly", 0.3),
];

const projectPages: Entry[] = [
  "neo-balto",
  "neo-xport",
  "neo-eterna",
  "neo-origen",
  "neo-rivera",
  "neo-emperatriz",
  "distrito-san-carlos",
  "moro416",
  "camino-real",
  "colinas-de-moro",
  "terrazas-concepcion",
].map((slug) =>
  page(`/${slug}`, "weekly", 0.9, `/og/${slug}.jpg`),
);

const transparencyPages: Entry[] =
  transparencyProjects.map((project) =>
    page(
      `/portal-de-transparencia/${project.slug}`,
      "monthly",
      0.4,
    ),
  );

/* =========================================================
   ARTÍCULOS DEL BLOG (desde la API, igual que /blog)
========================================================= */

type ApiPost = {
  slug: string;
  updated_at?: string | null;
  published_at?: string | null;
  cover_image_url?: string | null;
};

async function getBlogPages(): Promise<Entry[]> {
  try {
    const response = await fetch(
      `${API_URL}/api/blog?status=publicado`,
      {
        headers: { Accept: "application/json" },
        next: { revalidate: 3600 },
      },
    );

    if (!response.ok) return [];

    const result: { data?: ApiPost[] } =
      await response.json();

    return (result.data ?? [])
      .filter((post) => post.slug?.trim())
      .map((post) => ({
        ...page(
          `/blog/${encodeURIComponent(post.slug.trim())}`,
          "monthly",
          0.7,
        ),
        lastModified:
          post.updated_at ||
          post.published_at ||
          undefined,
      }));
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const unique = new Map<string, Entry>();

  for (const entry of [
    ...corePages,
    ...projectPages,
    ...transparencyPages,
    ...(await getBlogPages()),
  ]) {
    unique.set(entry.url, entry);
  }

  return Array.from(unique.values());
}
