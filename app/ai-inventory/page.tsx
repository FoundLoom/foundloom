import type { Metadata } from "next";
import AiInventory from "@/components/AiInventory";
import Breadcrumbs from "@/components/Breadcrumbs";
import Faq from "@/components/Faq";
import FinalCta from "@/components/FinalCta";
import PageHero from "@/components/PageHero";
import { aiInventory, routes, site } from "@/lib/content";
import { breadcrumbSchema, jsonLd, metadataFor } from "@/lib/seo";

export const metadata: Metadata = metadataFor("aiInventory");

const trail = [
  { name: "Home", path: routes.home },
  { name: "Products", path: routes.products },
  { name: "AI Inventory", path: routes.aiInventory },
];

export default function AiInventoryPage() {
  const product = {
    "@type": "SoftwareApplication",
    "@id": `${site.url}${routes.aiInventory}#product`,
    name: aiInventory.name,
    applicationCategory: "DeveloperApplication",
    applicationSubCategory: aiInventory.eyebrow,
    operatingSystem: "Web",
    description: aiInventory.body,
    /* The canonical page about the product. The app itself lives at a
       deployment address that may change, so it is not used as the id. */
    url: `${site.url}${routes.aiInventory}`,
    publisher: { "@id": `${site.url}/#organization` },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd([product, breadcrumbSchema(trail)]),
        }}
      />

      <PageHero
        eyebrow={aiInventory.eyebrow}
        status={aiInventory.status}
        headingLineOne="Find your way"
        headingLineTwo="around AI models."
        body={aiInventory.body}
        breadcrumbs={<Breadcrumbs trail={trail} />}
      />

      <AiInventory />
      <Faq only="AI Inventory" />
      {/* Closing links to the other product and to contact, so this page is
          not a dead end for visitors or for crawlers. */}
      <FinalCta />
    </>
  );
}
