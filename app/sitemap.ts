import type { MetadataRoute } from "next";
import { notes } from "@/content/notes";

export const dynamic = "force-static";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");

/** Written to /sitemap.xml at build time. Empty until NEXT_PUBLIC_SITE_URL is set, since sitemaps need absolute URLs. */
export default function sitemap(): MetadataRoute.Sitemap {
  if (!siteUrl) return [];
  return [
    { url: `${siteUrl}/`, changeFrequency: "monthly", priority: 1 },
    ...notes.map((n) => ({ url: `${siteUrl}/notes/${n.slug}/`, lastModified: n.date, changeFrequency: "yearly" as const, priority: 0.7 })),
  ];
}
