import type { MetadataRoute } from "next";
import { site } from "@/lib/content";

/**
 * Everything is crawlable. The legal pages are kept out of search with a
 * noindex tag on the pages themselves, and a crawler has to be allowed to
 * fetch a page to see that tag. Blocking them here as well would hide the
 * noindex and can leave the bare URLs in the index.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
