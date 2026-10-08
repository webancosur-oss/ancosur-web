import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ORGANIZATION_ID } from "@/src/organization";
import {
  absoluteUrl,
  createSeoMetadata,
} from "@/src/seo";
import BackButton from "@/components/BackButton";

import styles from "./BlogDetail.module.css";

export const revalidate = 300;

const API_URL =
  process.env.API_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "https://ancosur-api-production.up.railway.app";

/* =========================================================
   TIPOS — CKEDITOR 5 / HTML
========================================================= */

type BlogContentItem = {
  type?: string;
  format?: string;
  html?: string;
};

type BlogPost = {
  id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  cover_image_url: string | null;
  content: BlogContentItem[] | string | null;
  status: string;
  author_name: string | null;
  created_at: string;
  updated_at: string;
  published_at: string | null;
};

type BlogResponse = {
  success?: boolean;
  data?: BlogPost;
  message?: string;
};

/* =========================================================
   API
========================================================= */

async function getPost(
  slug: string
): Promise<BlogPost | null> {
  try {
    const base = API_URL.replace(/\/+$/, "");

    const response = await fetch(
      `${base}/api/blog/${encodeURIComponent(slug)}`,
      {
        method: "GET",
        next: {
          revalidate: 300,
        },
        headers: {
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      console.error(
        "Error API Blog:",
        response.status,
        response.statusText
      );

      return null;
    }

    const result =
      (await response.json()) as BlogResponse;

    if (!result.success || !result.data) {
      console.error(
        "Respuesta inválida del blog:",
        result
      );

      return null;
    }

    return result.data;
  } catch (error) {
    console.error(
      "Error cargando artículo:",
      error
    );

    return null;
  }
}

/* =========================================================
   URL DE MEDIA
   Solo resuelve rutas relativas del backend.
   No modifica el HTML almacenado.
========================================================= */

function getMediaUrl(
  value: unknown
): string {
  if (typeof value !== "string") {
    return "";
  }

  const url = value.trim();

  if (!url) {
    return "";
  }

  if (/^https?:\/\//i.test(url)) {
    return url;
  }

  if (url.startsWith("/api/")) {
    return `${API_URL.replace(/\/+$/, "")}${url}`;
  }

  if (url.startsWith("/")) {
    return url;
  }

  return `/${url}`;
}

/* =========================================================
   HTML DE CKEDITOR 5
   El servidor guarda:
   [
     {
       "type": "richtext",
       "format": "html",
       "html": "..."
     }
   ]

   Se devuelve EXACTAMENTE ese HTML.
   No se convierte a Tiptap.
   No se reconstruyen nodos.
   No se generan etiquetas nuevas.
========================================================= */

function getArticleHtml(
  content: BlogPost["content"]
): string {
  if (!content) {
    return "";
  }

  if (Array.isArray(content)) {
    return content
      .filter(
        (item): item is BlogContentItem =>
          Boolean(item) &&
          typeof item === "object"
      )
      .map((item) =>
        typeof item.html === "string"
          ? item.html
          : ""
      )
      .filter(Boolean)
      .join("\n");
  }

  if (typeof content === "string") {
    return content.trim();
  }

  return "";
}

/* =========================================================
   METADATA
========================================================= */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const post = await getPost(slug);

  if (!post) {
    return {
      title: "Artículo no encontrado",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const cover = getMediaUrl(
    post.cover_image_url
  );

  const seo = createSeoMetadata({
    title: post.title,

    description:
      post.excerpt ||
      `Conoce más sobre ${post.title}.`,

    pathname: `/blog/${post.slug}`,

    image: cover || undefined,

    imageAlt: post.title,

    type: "article",
  });

  return {
    ...seo,

    openGraph: {
      ...seo.openGraph,

      type: "article",

      publishedTime:
        post.published_at ||
        undefined,

      modifiedTime:
        post.updated_at ||
        undefined,

      authors: post.author_name
        ? [post.author_name]
        : undefined,
    },
  };
}

/* =========================================================
   PAGE
========================================================= */

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  const contentHtml =
    getArticleHtml(post.content);

  const cover = getMediaUrl(
    post.cover_image_url
  );

  const articleJsonLd = {
    "@context": "https://schema.org",

    "@type": "BlogPosting",

    headline: post.title,

    description: post.excerpt || undefined,

    image: cover ? [absoluteUrl(cover)] : undefined,

    datePublished:
      post.published_at || post.created_at,

    dateModified:
      post.updated_at || undefined,

    author: post.author_name
      ? {
          "@type": "Person",
          name: post.author_name,
        }
      : {
          "@id": ORGANIZATION_ID,
        },

    publisher: {
      "@id": ORGANIZATION_ID,
    },

    mainEntityOfPage:
      absoluteUrl(`/blog/${post.slug}`),

    inLanguage: "es-PE",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleJsonLd,
          ).replace(/</g, "\\u003c"),
        }}
      />

      <main className={styles.page}>
        <article className={styles.article}>
          <div className={styles.backWrapper}>
            <BackButton
              href="/blog"
              label="Volver al blog"
              variant="light"
            />
          </div>

          <header className={styles.header}>
            <div className={styles.meta}>
              {post.category ? (
                <span>
                  {post.category}
                </span>
              ) : null}

              {post.published_at ? (
                <time
                  dateTime={
                    post.published_at
                  }
                >
                  {new Date(
                    post.published_at
                  ).toLocaleDateString(
                    "es-PE",
                    {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    }
                  )}
                </time>
              ) : null}
            </div>

            <h1>{post.title}</h1>

               {cover ? (
              <figure
                className={
                  styles.coverImage
                }
              >
                <img
                  src={cover}
                  alt={post.title}
                  loading="eager"
                  fetchPriority="high"
                />
              </figure>
            ) : null}

            {post.excerpt ? (
              <p
                className={
                  styles.excerpt
                }
              >
                {post.excerpt}
              </p>
            ) : null}

         
          </header>

          <section
            className={styles.content}
          >
            {contentHtml ? (
              <div
                className={
                  styles.htmlContent
                }
                dangerouslySetInnerHTML={{
                  __html: contentHtml,
                }}
              />
            ) : (
              <p
                className={
                  styles.emptyContent
                }
              >
                Este artículo todavía
                no tiene contenido.
              </p>
            )}
          </section>
        </article>
      </main>
    </>
  );
}
