import type { Metadata } from "next";

/* =========================================================
   CONFIGURACIÓN GLOBAL
   El dominio principal es www.ancosur.com: ancosur.com
   redirige (308) hacia www, así que canonical, og:url,
   sitemap y datos estructurados deben usar siempre www.
========================================================= */

export const SITE_URL =
  "https://www.ancosur.com";

export const SITE_NAME =
  "Ancosur Inmobiliaria";

export const BRAND_NAME =
  "ANCOSUR";

/* Imagen 1200×630 en JPG (<200 KB): WhatsApp, Facebook,
   LinkedIn, X e iMessage la muestran sin problemas. */
export const DEFAULT_OG_IMAGE =
  "/og/ancosur.jpg";

export const DEFAULT_OG_ALT =
  "ANCOSUR: departamentos, lotes y proyectos inmobiliarios en Huancayo";

export const X_HANDLE =
  "@Ancosur_";

type CreateSeoMetadataParams = {
  title: string;
  description: string;
  pathname: string;
  keywords?: string[];
  image?: string;
  imageAlt?: string;
  type?: "website" | "article";
  noIndex?: boolean;
};

export function normalizePathname(
  pathname: string,
): string {
  if (!pathname || pathname === "/") {
    return "/";
  }

  return `/${pathname.replace(
    /^\/+|\/+$/g,
    "",
  )}`;
}

export function absoluteUrl(
  pathOrUrl: string,
): string {
  if (/^https?:\/\//.test(pathOrUrl)) {
    return pathOrUrl;
  }

  const pathname =
    normalizePathname(pathOrUrl);

  return pathname === "/"
    ? `${SITE_URL}/`
    : `${SITE_URL}${pathname}`;
}

function imageType(
  url: string,
): string | undefined {
  const extension = url
    .split("?")[0]
    .split(".")
    .pop()
    ?.toLowerCase();

  switch (extension) {
    case "jpg":
    case "jpeg":
      return "image/jpeg";
    case "png":
      return "image/png";
    case "webp":
      return "image/webp";
    default:
      return undefined;
  }
}

export function createSeoMetadata({
  title,
  description,
  pathname,
  keywords = [],
  image = DEFAULT_OG_IMAGE,
  imageAlt,
  type = "website",
  noIndex = false,
}: CreateSeoMetadataParams): Metadata {
  const canonical =
    absoluteUrl(pathname);

  const imageUrl =
    absoluteUrl(image);

  /* Solo las imágenes de /og/ tienen 1200×630 garantizado */
  const isOgSized =
    image.startsWith("/og/");

  return {
    /* Evita "… | Ancosur Inmobiliaria | ANCOSUR" con la
       plantilla del layout raíz. */
    title: /ancosur/i.test(title)
      ? { absolute: title }
      : title,

    description,

    keywords,

    alternates: {
      canonical,

      languages: {
        "es-PE": canonical,
        "x-default": canonical,
      },
    },

    openGraph: {
      type,

      locale: "es_PE",

      url: canonical,

      siteName: SITE_NAME,

      title,

      description,

      images: [
        {
          url: imageUrl,

          secureUrl: imageUrl,

          type: imageType(imageUrl),

          ...(isOgSized
            ? { width: 1200, height: 630 }
            : {}),

          alt: imageAlt ?? title,
        },
      ],
    },

    twitter: {
      card:
        "summary_large_image",

      site: X_HANDLE,

      creator: X_HANDLE,

      title,

      description,

      images: [
        {
          url: imageUrl,
          alt: imageAlt ?? title,
        },
      ],
    },

    robots: {
      index: !noIndex,

      follow: !noIndex,

      googleBot: {
        index: !noIndex,

        follow: !noIndex,

        noimageindex: false,

        "max-image-preview":
          "large",

        "max-snippet": -1,

        "max-video-preview": -1,
      },
    },
  };
}

/* next/image solo optimiza hosts declarados en next.config
   (images.remotePatterns); otras URLs se muestran tal cual. */
export function isOptimizableImage(
  url: string,
): boolean {
  return (
    url.startsWith("/") ||
    url.startsWith(
      "https://ancosur-api-production.up.railway.app/api/",
    )
  );
}
