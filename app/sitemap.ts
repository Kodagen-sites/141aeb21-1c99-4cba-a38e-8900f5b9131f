import type { MetadataRoute } from "next";
import { siteConfig } from "@/content/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const url = siteConfig.seo.siteUrl;
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${url}/`, lastModified: now, priority: 1.0, changeFrequency: "monthly" },
    { url: `${url}/about`, lastModified: now, priority: 0.8, changeFrequency: "monthly" },
    { url: `${url}/services`, lastModified: now, priority: 0.85, changeFrequency: "monthly" },
    { url: `${url}/contact`, lastModified: now, priority: 0.75, changeFrequency: "yearly" },
    { url: `${url}/privacy`, lastModified: now, priority: 0.3, changeFrequency: "yearly" },
    { url: `${url}/terms`, lastModified: now, priority: 0.3, changeFrequency: "yearly" },
  ];
  const serviceRoutes: MetadataRoute.Sitemap = siteConfig.services.map((s) => ({
    url: `${url}/services/${s.slug}`,
    lastModified: now,
    priority: 0.7,
    changeFrequency: "monthly",
  }));
  return [...staticRoutes, ...serviceRoutes];
}
