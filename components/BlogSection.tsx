import Image from "next/image";
import Link from "next/link";
import { blogPosts } from "@/data/blog";
import styles from "./BlogSection.module.css";

export default function BlogSection() {
  const featuredPost = blogPosts[0];
  const secondaryPosts = blogPosts.slice(1, 4);

  return (
    <section className={styles.section} id="blog">
      <div className={styles.container}>
        <div className={styles.header}>
          <span>Blog inmobiliario</span>
          <h2>Consejos para comprar, invertir y vivir mejor</h2>
          <p>
            Encuentra información útil para tomar mejores decisiones antes de
            comprar tu departamento, lote o inversión inmobiliaria.
          </p>
        </div>

        <div className={styles.layout}>
          <article className={styles.featured}>
            <Link
              href={`/blog/${featuredPost.slug}`}
              className={styles.featuredImage}
            >
              <Image
                src={featuredPost.image}
                alt={featuredPost.title}
                fill
                className={styles.image}
              />

              <span className={styles.badge}>{featuredPost.category}</span>
            </Link>

            <div className={styles.featuredContent}>
              <span>{featuredPost.date}</span>
              <h3>{featuredPost.title}</h3>
              <p>{featuredPost.excerpt}</p>

              <Link
                href={`/blog/${featuredPost.slug}`}
                className={styles.mainLink}
              >
                Leer artículo
              </Link>
            </div>
          </article>

          <div className={styles.sidePosts}>
            {secondaryPosts.map((post) => (
              <article key={post.slug} className={styles.card}>
                <Link href={`/blog/${post.slug}`} className={styles.cardImage}>
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className={styles.image}
                  />
                </Link>

                <div className={styles.cardContent}>
                  <span>{post.category}</span>
                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>

                  <Link href={`/blog/${post.slug}`}>Leer más</Link>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className={styles.footerAction}>
          <Link href="/blog">Ver todos los artículos</Link>
        </div>
      </div>
    </section>
  );
}