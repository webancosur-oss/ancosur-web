import type { MetadataRoute } from "next";
import { blogPosts } from "@/data/blog";

const siteUrl = "https://ancosur.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/blog",
    "/nosotros",
    "/beneficios",
    "/trabaja-con-nosotros",
    "/politicas",
    "/libro-de-reclamaciones",
    "/certificados",
  ];

  const blogRoutes = blogPosts.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    ...staticRoutes.map((route) => ({
      url: `${siteUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: route === "" ? 1 : 0.8,
    })),
    ...blogRoutes,
  ];
}