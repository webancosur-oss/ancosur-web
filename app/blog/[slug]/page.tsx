import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { blogPosts } from "@/data/blog";
import styles from "./BlogDetail.module.css";
import BackButton from "@/components/BackButton";

const siteUrl = "https://ancosur.com";

type BlogDetailProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogDetailProps): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);

  if (!post) {
    return {
      title: "Artículo no encontrado",
    };
  }

  return {
    title: post.title,
    description: post.excerpt,

    alternates: {
      canonical: `/blog/${post.slug}`,
    },

    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `/blog/${post.slug}`,
      siteName: "ANCOSUR Inmobiliaria",
      type: "article",
      locale: "es_PE",
      images: [
        {
          url: post.image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
  };
}

export default async function BlogDetailPage({ params }: BlogDetailProps) {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);

  if (!post) {
    notFound();
  }

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: `${siteUrl}${post.image}`,
    url: `${siteUrl}/blog/${post.slug}`,
    author: {
      "@type": "Organization",
      name: "ANCOSUR Inmobiliaria",
    },
    publisher: {
      "@type": "Organization",
      name: "ANCOSUR Inmobiliaria",
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/assets/images/logo-ancosur.png`,
      },
    },
  };

  return (
    <>
      <Navbar />

      <main className={styles.page}>
        <article className={styles.article}>
             <BackButton
            href="/blog"
            label="Volver al blog"
            variant="light"
            className={styles.backButton}
          />

          <div className={styles.meta}>
            <span>{post.category}</span>
            <small>{post.date}</small>
          </div>

          <h1>{post.title}</h1>
          <p className={styles.excerpt}>{post.excerpt}</p>

          <div className={styles.imageBox}>
            <Image
              src={post.image}
              alt={post.title}
              fill
              className={styles.image}
              priority
            />
          </div>

          <div className={styles.content}>
            {post.content.map((paragraph, index) => (
              <p key={`${post.slug}-${index}`}>{paragraph}</p>
            ))}
          </div>

          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(articleJsonLd),
            }}
          />
        </article>
      </main>

      <Footer />
    </>
  );
}