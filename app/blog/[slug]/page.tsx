import type { Metadata } from "next";
import { notFound } from "next/navigation";

import Navbar from "@/components/Navbar";
import BackButton from "@/components/BackButton";

import styles from "./BlogDetail.module.css";

export const dynamic = "force-dynamic";
export const revalidate = 0;

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
        cache: "no-store",
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
      title: "Artículo no encontrado | ANCOSUR",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const cover = getMediaUrl(
    post.cover_image_url
  );

  return {
    title: `${post.title} | ANCOSUR`,

    description:
      post.excerpt ||
      `Conoce más sobre ${post.title}.`,

    alternates: {
      canonical: `/blog/${post.slug}`,
    },

    openGraph: {
      title: post.title,

      description:
        post.excerpt || "",

      type: "article",

      locale: "es_PE",

      publishedTime:
        post.published_at ||
        undefined,

      modifiedTime:
        post.updated_at ||
        undefined,

      images: cover
        ? [
            {
              url: cover,
              width: 1200,
              height: 630,
              alt: post.title,
            },
          ]
        : undefined,
    },

    twitter: {
      card: "summary_large_image",

      title: post.title,

      description:
        post.excerpt || "",

      images: cover
        ? [cover]
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

  return (
    <>
      <Navbar />

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

            {post.excerpt ? (
              <p
                className={
                  styles.excerpt
                }
              >
                {post.excerpt}
              </p>
            ) : null}

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
