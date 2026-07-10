import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { blogPosts } from "@/data/blog";
import styles from "./BlogPage.module.css";

export default function BlogPage() {
  return (
    <>
      <Navbar />

      <main className={styles.page}>
        <section className={styles.hero}>
          <span>Blog inmobiliario</span>
          <h1>Consejos para comprar, invertir y vivir mejor</h1>
          <p>
            Información útil para tomar mejores decisiones antes de adquirir un
            departamento, lote o proyecto inmobiliario.
          </p>
        </section>

        <section className={styles.grid}>
          {blogPosts.map((post) => (
            <article key={post.slug} className={styles.card}>
              <Link href={`/blog/${post.slug}`} className={styles.imageBox}>
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className={styles.image}
                />
              </Link>

              <div className={styles.content}>
                <span>{post.category}</span>
                <h2>{post.title}</h2>
                <p>{post.excerpt}</p>

                <Link href={`/blog/${post.slug}`} className={styles.link}>
                  Leer artículo
                </Link>
              </div>
            </article>
          ))}
        </section>
      </main>

      <Footer />
    </>
  );
}