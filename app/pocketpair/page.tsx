import type { Metadata } from "next";
import AppShowcase from "@/components/AppShowcase";
import Benefits from "@/components/Benefits";
import Breadcrumbs from "@/components/Breadcrumbs";
import EventFolders from "@/components/EventFolders";
import Faq from "@/components/Faq";
import HowItWorks from "@/components/HowItWorks";
import PageHero from "@/components/PageHero";
import PocketPairCta from "@/components/PocketPairCta";
import PocketPairVisual from "@/components/PocketPairVisual";
import Problem from "@/components/Problem";
import { pocketpair, routes, site } from "@/lib/content";
import { breadcrumbSchema, jsonLd, metadataFor } from "@/lib/seo";

export const metadata: Metadata = metadataFor("pocketpair");

const trail = [
  { name: "Home", path: routes.home },
  { name: "Products", path: routes.products },
  { name: "PocketPair", path: routes.pocketpair },
];

export default function PocketPairPage() {
  const product = {
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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd([product, breadcrumbSchema(trail)]),
        }}
      />

      <PageHero
        eyebrow={pocketpair.eyebrow}
        status={pocketpair.status}
        live={false}
        headingLineOne="The people you meet"
        headingLineTwo="should not disappear."
        body={pocketpair.body}
        breadcrumbs={<Breadcrumbs trail={trail} />}
      >
        <PocketPairVisual />
      </PageHero>

      <Problem />
      <Benefits />
      <HowItWorks />
      <AppShowcase />
      <EventFolders />
      <Faq only="PocketPair" />
      <PocketPairCta />
    </>
  );
}
