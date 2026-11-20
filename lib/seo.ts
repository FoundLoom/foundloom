import type { Metadata } from "next";
import { routes, site } from "./content";

/**
 * Per-page SEO.
 *
 * Every route gets its own title, description and canonical. This is the
 * point of a multi-page site: two pages can rank for two different queries,
 * where one page competes with itself.
 */

type PageKey =
  | "home"
  | "products"
  | "pocketpair"
  | "aiInventory"
  | "about"
  | "contact";

/*
 * Keyword focus, one line per page, so titles and copy stay pointed at the
 * same thing:
 *
 *   home        FoundLoom (brand) + what the two products are
 *   products    FoundLoom products, PocketPair vs AI Inventory
 *   pocketpair  event networking app, QR code networking, remember people
 *               you meet at conferences, save contacts by event
 *   aiInventory compare AI models, LLM comparison, AI model directory,
 *               AI terminology explained, AI newsletter
 *   about       about FoundLoom
 *   contact     contact FoundLoom
 *
 * AI Inventory is an inventory OF AI models. It is not stock or warehouse
 * software, and nothing here should chase "inventory management" searches:
 * those visitors want a different kind of product.
 *
 * Titles stay under 60 characters and descriptions under 160, the lengths
 * search results show without cutting off.
 */
export const pageSeo: Record<
  PageKey,
  { title: string; description: string; path: string }
> = {
  home: {
    title: "FoundLoom | Event Networking App and AI Model Directory",
    description:
      "FoundLoom builds two web tools: PocketPair, which saves the people you meet at events with the event attached, and AI Inventory, for comparing AI models.",
    path: routes.home,
  },
  products: {
    title: "FoundLoom Products: PocketPair and AI Inventory Compared",
    description:
      "Compare FoundLoom's two products. PocketPair saves event contacts with one QR scan. AI Inventory helps you discover and compare AI models and LLMs.",
    path: routes.products,
  },
  pocketpair: {
    title: "PocketPair: Event Networking App That Knows Where You Met",
    description:
      "A QR networking app for conferences and meetups. One scan saves each contact in that event's folder, so you know where you met. Join the waitlist.",
    path: routes.pocketpair,
  },
  aiInventory: {
    title: "AI Inventory: Discover and Compare AI Models and LLMs",
    description:
      "AI Inventory is a web app for discovering and comparing AI models and large language models, with AI news, plain-language terminology and a weekly newsletter.",
    path: routes.aiInventory,
  },
  about: {
    title: "About FoundLoom: Small, Focused Web Tools",
    description:
      "FoundLoom builds focused web tools instead of one product that does everything: PocketPair for event networking and AI Inventory for comparing AI models.",
    path: routes.about,
  },
  contact: {
    title: "Contact FoundLoom: PocketPair, AI Inventory and Press",
    description:
      "Contact FoundLoom about the PocketPair waitlist, AI Inventory access, press or partnerships. Send a message through the form on this page.",
    path: routes.contact,
  },
};

/** Builds the full Metadata object for a page, canonical and OG included. */
export function metadataFor(key: PageKey): Metadata {
  const page = pageSeo[key];
  const url = `${site.url}${page.path === "/" ? "" : page.path}`;

  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: page.path },
    openGraph: {
      type: "website",
      url,
      siteName: site.name,
      locale: "en_US",
      title: page.title,
      description: page.description,
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: "FoundLoom: PocketPair for event networking and AI Inventory for comparing AI models",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
      images: ["/opengraph-image"],
    },
  };
}

/**
 * BreadcrumbList for a sub-page. Google uses it for the breadcrumb trail
 * shown under a result instead of the raw URL.
 */
export function breadcrumbSchema(trail: Array<{ name: string; path: string }>) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: trail.map((step, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: step.name,
      item: `${site.url}${step.path === "/" ? "" : step.path}`,
    })),
  };
}

/** Wraps a set of schema nodes into one @graph, the shape Google prefers. */
export function jsonLd(nodes: object[]) {
  return JSON.stringify({ "@context": "https://schema.org", "@graph": nodes });
}

export const organizationNode = {
  "@type": "Organization",
  "@id": `${site.url}/#organization`,
  name: site.name,
  url: site.url,
  description: site.description,
  logo: `${site.url}/icon.svg`,
};

export const websiteNode = {
  "@type": "WebSite",
  "@id": `${site.url}/#website`,
  url: site.url,
  name: site.name,
  description: site.description,
  publisher: { "@id": `${site.url}/#organization` },
  inLanguage: "en",
};
