import { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

const BASE = "https://www.cambridgewriters.co.uk";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // ── Static pages ──────────────────────────────────────────────────────────
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE}/`,          lastModified: new Date(), changeFrequency: "weekly",  priority: 1.0 },
    { url: `${BASE}/services`,  lastModified: new Date(), changeFrequency: "weekly",  priority: 0.9 },
    { url: `${BASE}/order`,     lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/reviews`,   lastModified: new Date(), changeFrequency: "weekly",  priority: 0.8 },
    { url: `${BASE}/blog`,      lastModified: new Date(), changeFrequency: "daily",   priority: 0.8 },
    { url: `${BASE}/about`,     lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/contact`,   lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/privacy`,   lastModified: new Date(), changeFrequency: "yearly",  priority: 0.3 },
    { url: `${BASE}/terms`,     lastModified: new Date(), changeFrequency: "yearly",  priority: 0.3 },
    { url: `${BASE}/refund`,    lastModified: new Date(), changeFrequency: "yearly",  priority: 0.3 },
  ];

  // ── Dynamic: service pages ────────────────────────────────────────────────
  let serviceRoutes: MetadataRoute.Sitemap = [];
  try {
    const services = await prisma.service.findMany({
      where: { isActive: true },
      select: { slug: true, updatedAt: true },
    });
    serviceRoutes = services.map((s) => ({
      url: `${BASE}/services/${s.slug}`,
      lastModified: s.updatedAt,
      changeFrequency: "monthly",
      priority: 0.85,
    }));
  } catch { /* DB unavailable at build time — skip */ }

  // ── Dynamic: blog posts ───────────────────────────────────────────────────
  let blogRoutes: MetadataRoute.Sitemap = [];
  try {
    const posts = await prisma.blogPost.findMany({
      where: { isPublished: true },
      select: { slug: true, updatedAt: true },
    });
    blogRoutes = posts.map((p) => ({
      url: `${BASE}/blog/${p.slug}`,
      lastModified: p.updatedAt,
      changeFrequency: "monthly",
      priority: 0.7,
    }));
  } catch { /* DB unavailable at build time — skip */ }

  return [...staticRoutes, ...serviceRoutes, ...blogRoutes];
}
