import type { Metadata } from "next";
import About from "@/components/About";
import Breadcrumbs from "@/components/Breadcrumbs";
import CompanyNow from "@/components/CompanyNow";
import Faq from "@/components/Faq";
import PageHero from "@/components/PageHero";
import ProductsOverview from "@/components/ProductsOverview";
import { about, routes, site } from "@/lib/content";
import { breadcrumbSchema, jsonLd, metadataFor } from "@/lib/seo";

export const metadata: Metadata = metadataFor("about");

const trail = [
  { name: "Home", path: routes.home },
  { name: "About", path: routes.about },
];

export default function AboutPage() {
  const page = {
    "@type": "AboutPage",
    "@id": `${site.url}${routes.about}#page`,
    url: `${site.url}${routes.about}`,
    name: "About FoundLoom",
    description: about.body,
    about: { "@id": `${site.url}/#organization` },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd([page, breadcrumbSchema(trail)]),
        }}
      />

      <PageHero
        eyebrow={about.eyebrow}
        headingLineOne="Small tools,"
        headingLineTwo="built properly."
        body={about.body}
        breadcrumbs={<Breadcrumbs trail={trail} />}
      />

      <About />
      <CompanyNow />
      <ProductsOverview />
      <Faq only="FoundLoom" />
    </>
  );
}
