import type { Metadata } from "next";
import { EnvelopeSimple } from "@phosphor-icons/react/dist/ssr";
import Breadcrumbs from "@/components/Breadcrumbs";
import ContactForm from "@/components/ContactForm";
import ContactReasons from "@/components/ContactReasons";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { contact, routes, site } from "@/lib/content";
import { breadcrumbSchema, jsonLd, metadataFor } from "@/lib/seo";

export const metadata: Metadata = metadataFor("contact");

const trail = [
  { name: "Home", path: routes.home },
  { name: "Contact", path: routes.contact },
];

export default function ContactPage() {
  const page = {
    "@type": "ContactPage",
    "@id": `${site.url}${routes.contact}#page`,
    url: `${site.url}${routes.contact}`,
    name: "Contact FoundLoom",
    description: contact.body,
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
        eyebrow={contact.eyebrow}
        headingLineOne="Tell us what you"
        headingLineTwo="are working on."
        body={contact.body}
        breadcrumbs={<Breadcrumbs trail={trail} />}
      />

      <section className="px-4 py-20 md:py-24" aria-labelledby="contact-form-heading">
        <div className="mx-auto grid max-w-[1320px] gap-12 md:grid-cols-[1.4fr_1fr]">
          <Reveal>
            <h2 id="contact-form-heading" className="heading-5 text-ink">
              Send a message
            </h2>
            <div className="mt-8">
              <ContactForm />
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="card border border-line bg-surface-sunken p-6">
              <h2 className="title-1 text-ink">Or email us directly</h2>

              <p className="body-6 mt-3 flex flex-wrap items-center gap-2 text-ink-soft">
                <EnvelopeSimple size={16} className="shrink-0" aria-hidden="true" />
                <a
                  href={`mailto:${contact.email}`}
                  className="link-arrow text-ink"
                >
                  {contact.email}
                </a>
              </p>

              <p className="body-6 mt-6 flex flex-wrap items-center gap-2 text-ink-soft">
                Typical reply time: {contact.responseNote}
              </p>

              <p className="caption-5 mt-6 border-t border-line pt-6 text-ink-faint">
                We have not published a phone number or office address, so none
                is shown here rather than inventing one.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <ContactReasons />
    </>
  );
}
