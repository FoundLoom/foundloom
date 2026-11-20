import type { MetadataRoute } from "next";
import { routes, site } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  /* The legal pages are noindex, so they are deliberately absent. */
  const pages: Array<[string, number, "weekly" | "monthly"]> = [
    [routes.home, 1, "weekly"],
    [routes.products, 0.9, "weekly"],
    [routes.pocketpair, 0.9, "weekly"],
    [routes.aiInventory, 0.9, "weekly"],
    [routes.about, 0.6, "monthly"],
    [routes.contact, 0.5, "monthly"],
  ];

  return pages.map(([path, priority, changeFrequency]) => ({
    url: `${site.url}${path === "/" ? "" : path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));
}
