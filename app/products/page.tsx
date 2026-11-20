import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import FinalCta from "@/components/FinalCta";
import PageHero from "@/components/PageHero";
import ProductComparison from "@/components/ProductComparison";
import ProductsDetailed from "@/components/ProductsDetailed";
import TaglineReveal from "@/components/TaglineReveal";
import {
  aiInventory,
  pocketpair,
  productsPage,
  routes,
  site,
} from "@/lib/content";
import { breadcrumbSchema, jsonLd, metadataFor } from "@/lib/seo";

export const metadata: Metadata = metadataFor("products");

const trail = [
  { name: "Home", path: routes.home },
  { name: "Products", path: routes.products },
];

/**
 * The catalogue route. A company with more than one product needs a page
 * that owns the word "products", both for visitors who look for it in the
 * nav and because it is the page that can rank for "FoundLoom products"
 * without competing with either product's own page.
 *
 * Its content is unique to it: the two products described in full and
 * compared against each other. The FAQ is not repeated here, since those
 * answers already rank from /pocketpair and /ai-inventory.
 */
export default function ProductsPage() {
  const pocketpairNode = {
    "@type": "SoftwareApplication",
    "@id": `${site.url}${routes.pocketpair}#product`,
    name: pocketpair.name,
    applicationCategory: "BusinessApplication",
    applicationSubCategory: pocketpair.eyebrow,
    operatingSystem: "Web",
    description: pocketpair.body,
    url: `${site.url}${routes.pocketpair}`,
    publisher: { "@id": `${site.url}/#organization` },
  };

  const aiInventoryNode = {
    "@type": "SoftwareApplication",
    "@id": `${site.url}${routes.aiInventory}#product`,
    name: aiInventory.name,
    applicationCategory: "DeveloperApplication",
    applicationSubCategory: aiInventory.eyebrow,
    operatingSystem: "Web",
    description: aiInventory.body,
    url: `${site.url}${routes.aiInventory}`,
    publisher: { "@id": `${site.url}/#organization` },
  };

  const page = {
    "@type": "CollectionPage",
    "@id": `${site.url}${routes.products}#page`,
    url: `${site.url}${routes.products}`,
    name: "FoundLoom products",
    description: productsPage.body,
    isPartOf: { "@id": `${site.url}/#website` },
    about: { "@id": `${site.url}/#organization` },
    mainEntity: {
      "@type": "ItemList",
      itemListOrder: "https://schema.org/ItemListUnordered",
      numberOfItems: 2,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          item: { "@id": `${site.url}${routes.pocketpair}#product` },
        },
        {
          "@type": "ListItem",
          position: 2,
          item: { "@id": `${site.url}${routes.aiInventory}#product` },
        },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd([
            page,
            pocketpairNode,
            aiInventoryNode,
            breadcrumbSchema(trail),
          ]),
        }}
      />

      <PageHero
        eyebrow={productsPage.eyebrow}
        headingLineOne={productsPage.headingLineOne}
        headingLineTwo={productsPage.headingLineTwo}
        body={productsPage.body}
        breadcrumbs={<Breadcrumbs trail={trail} />}
      />

      <ProductsDetailed />
      <ProductComparison />
      <TaglineReveal />
      <FinalCta />
    </>
  );
}
