import Link from "next/link";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import styles from "./BlogPage.module.css";

/* =========================================================
   CONFIGURACIÓN NEXT
========================================================= */

export const dynamic = "force-dynamic";
export const revalidate = 0;

/* =========================================================
   API
========================================================= */

const API_URL =
  process.env.API_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "https://ancosur-api-production.up.railway.app";

/* =========================================================
   TIPOS
========================================================= */

type BlogPost = {
  id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;

  cover_image_url:
    | string
    | null;

  status: string;

  author_name:
    | string
    | null;

  created_at: string;
  updated_at: string;

  published_at:
    | string
    | null;
};

type BlogResponse = {
  success: boolean;

  total?: number;

  data?: BlogPost[];

  message?: string;
};

/* =========================================================
   OBTENER PUBLICACIONES
========================================================= */

async function getPosts(): Promise<BlogPost[]> {
  try {
    const response =
      await fetch(
        `${API_URL}/api/blog?status=publicado`,
        {
          method: "GET",

          cache: "no-store",

          headers: {
            Accept:
              "application/json",
          },
        }
      );

    if (!response.ok) {
      console.error(
        "Error API Blog:",
        response.status,
        response.statusText
      );

      return [];
    }

    const result:
      BlogResponse =
      await response.json();

    if (
      !result.success ||
      !Array.isArray(
        result.data
      )
    ) {
      console.error(
        "Respuesta inválida de API Blog:",
        result
      );

      return [];
    }

    return result.data;
  } catch (error) {
    console.error(
      "Error cargando publicaciones:",
      error
    );

    return [];
  }
}

/* =========================================================
   CONSTRUIR URL DE IMAGEN
========================================================= */

function getImageUrl(
  imageUrl:
    | string
    | null
    | undefined
): string | null {
  if (!imageUrl) {
    return null;
  }

  const cleanUrl =
    imageUrl.trim();

  if (!cleanUrl) {
    return null;
  }

  /* =======================================================
     URL ABSOLUTA
  ======================================================= */

  if (
    cleanUrl.startsWith(
      "http://"
    ) ||
    cleanUrl.startsWith(
      "https://"
    )
  ) {
    return cleanUrl;
  }

  /* =======================================================
     IMAGEN DEL BACKEND
     
     Ejemplo DB:
     
     /api/blog/imagen/UUID
     
     Resultado:
     
     https://ancosur-api-production.up.railway.app
     /api/blog/imagen/UUID
  ======================================================= */

  if (
    cleanUrl.startsWith(
      "/api/"
    )
  ) {
    return `${API_URL}${cleanUrl}`;
  }

  /* =======================================================
     RUTA RELATIVA
  ======================================================= */

  if (
    cleanUrl.startsWith("/")
  ) {
    return `${API_URL}${cleanUrl}`;
  }

  return cleanUrl;
}

/* =========================================================
   FECHA
========================================================= */

function formatDate(
  date:
    | string
    | null
    | undefined
): string {
  if (!date) {
    return "";
  }

  try {
    return new Date(
      date
    ).toLocaleDateString(
      "es-PE",
      {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }
    );
  } catch {
    return "";
  }
}

/* =========================================================
   PÁGINA
========================================================= */

export default async function BlogPage() {
  const posts =
    await getPosts();

  return (
    <>
      <Navbar />

      <main
        className={
          styles.page
        }
      >

        {/* =================================================
            HERO
        ================================================= */}

        <section
          className={
            styles.hero
          }
        >

          <div
            className={
              styles.heroOverlay
            }
          />

          <div
            className={
              styles.heroContent
            }
          >

            <span>
              Blog inmobiliario
            </span>

            <h1>
              Consejos para comprar,
              invertir y vivir mejor
            </h1>

            <p>
              Información útil para tomar
              mejores decisiones antes de
              adquirir un departamento,
              lote o proyecto inmobiliario.
            </p>

          </div>

        </section>

        {/* =================================================
            PUBLICACIONES
        ================================================= */}

        <section
          className={
            styles.postsSection
          }
        >

          <div
            className={
              styles.container
            }
          >

            {posts.length === 0 ? (

              /* =================================================
                 SIN PUBLICACIONES
              ================================================= */

              <div
                className={
                  styles.empty
                }
              >

                <h2>
                  Próximamente
                </h2>

                <p>
                  Estamos preparando nuevos
                  artículos para ti.
                </p>

              </div>

            ) : (

              /* =================================================
                 GRID
              ================================================= */

              <div
                className={
                  styles.grid
                }
              >

                {posts.map(
                  (post) => {

                    const imageUrl =
                      getImageUrl(
                        post.cover_image_url
                      );

                    return (
                      <article
                        key={
                          post.id
                        }
                        className={
                          styles.card
                        }
                      >

                        {/* =====================================
                            IMAGEN
                        ===================================== */}

                        <Link
                          href={`/blog/${post.slug}`}
                          className={
                            styles.imageLink
                          }
                        >

                          <div
                            className={
                              styles.imageBox
                            }
                          >

                            {imageUrl ? (

                              <img
                                src={imageUrl}
                                alt={post.title}
                                className={styles.image}
                                loading="lazy"
                                decoding="async"
                              />

                            ) : (

                              <div
                                className={
                                  styles.noImage
                                }
                              >
                                ANCOSUR
                              </div>

                            )}

                            <div
                              className={
                                styles.imageOverlay
                              }
                            />

                            {post.category && (
                              <span
                                className={
                                  styles.category
                                }
                              >
                                {
                                  post.category
                                }
                              </span>
                            )}

                          </div>

                        </Link>

                        {/* =====================================
                            CONTENIDO
                        ===================================== */}

                        <div
                          className={
                            styles.content
                          }
                        >

                          <div
                            className={
                              styles.date
                            }
                          >
                            {formatDate(
                              post.published_at ||
                              post.created_at
                            )}
                          </div>

                          <h2>
                            {
                              post.title
                            }
                          </h2>

                          {post.excerpt && (
                            <p>
                              {
                                post.excerpt
                              }
                            </p>
                          )}

                          <Link
                            href={`/blog/${post.slug}`}
                            className={
                              styles.readMore
                            }
                          >

                            <span>
                              Leer artículo
                            </span>

                            <span
                              aria-hidden="true"
                            >
                              →
                            </span>

                          </Link>

                        </div>

                      </article>
                    );
                  }
                )}

              </div>

            )}

          </div>

        </section>

      </main>
    </>
  );
}