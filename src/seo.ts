import type { Metadata } from "next";

const SITE_NAME =
  "Ancosur Inmobiliaria";

const DEFAULT_IMAGE =
  "/opengraph-image.png";

type CreateSeoMetadataParams = {
  title: string;
  description: string;
  pathname: string;
  keywords?: string[];
  image?: string;
  noIndex?: boolean;
};

function normalizePathname(
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

export function createSeoMetadata({
  title,
  description,
  pathname,
  keywords = [],
  image = DEFAULT_IMAGE,
  noIndex = false,
}: CreateSeoMetadataParams): Metadata {
  const canonical =
    normalizePathname(pathname);

  return {
    title,

    description,

    keywords,

    alternates: {
      canonical,

      languages: {
        "es-PE": canonical,
      },
    },

    openGraph: {
      type: "website",

      locale: "es_PE",

      url: canonical,

      siteName: SITE_NAME,

      title,

      description,

      images: [
        {
          url: image,

          width: 1200,

          height: 630,

          alt: title,
        },
      ],
    },

    twitter: {
      card:
        "summary_large_image",

      title,

      description,

      images: [image],
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