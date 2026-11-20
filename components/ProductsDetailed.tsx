import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { productsPage } from "@/lib/content";
import Icon from "./Icon";
import Reveal from "./Reveal";

/**
 * The catalogue itself. One full-width block per product, alternating sides
 * so the eye has a reason to keep going, each carrying the product's own
 * three capabilities rather than a single line of copy.
 *
 * This is deliberately heavier than the card grid on the home page: someone
 * who has navigated to /products is comparing, not browsing.
 */
export default function ProductsDetailed() {
  return (
    <section
      id="catalogue"
      className="scroll-mt-24 px-4 py-20 md:py-24"
      aria-labelledby="catalogue-heading"
    >
      <div className="mx-auto max-w-[1320px]">
        <h2 id="catalogue-heading" className="sr-only">
          FoundLoom products in detail
        </h2>

        <ul className="flex flex-col gap-16 md:gap-24">
          {productsPage.items.map((item, index) => (
            <Reveal as="li" key={item.name}>
              <article className="grid items-start gap-8 md:grid-cols-[1fr_1.2fr] md:gap-16">
                {/* Identity column. Flips to the right on the second product. */}
                <div className={index % 2 === 1 ? "md:order-2" : undefined}>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="caption-3 uppercase text-ink-faint">
                      {item.category}
                    </span>
                    <span
                      className={`caption-5 inline-flex items-center gap-1 rounded-lg px-2 py-1 ${
                        item.live
                          ? "bg-accent-soft text-accent"
                          : "bg-surface-sunken text-ink-soft"
                      }`}
                    >
                      <span
                        className={`block h-2 w-2 rounded-full ${
                          item.live
                            ? "animate-pulse-dot bg-accent"
                            : "bg-ink-faint"
                        }`}
                        aria-hidden="true"
                      />
                      {item.status}
                    </span>
                  </div>

                  <h3 className="heading-4 mt-6 text-ink">{item.name}</h3>
                  <p className="body-3 mt-6 text-ink-soft">{item.summary}</p>

                  <Link
                    href={item.href}
                    className="button-md group mt-8 inline-flex items-center btn btn-lime"
                  >
                    {item.cta}
                    <ArrowRight
                      size={16}
                      weight="bold"
                      className="transition-transform duration-500 ease-base group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </Link>
                </div>

                {/* Capability column. */}
                <ul
                  className={`flex flex-col gap-2 ${
                    index % 2 === 1 ? "md:order-1" : ""
                  }`}
                >
                  {item.features.map((feature, i) => (
                    <Reveal as="li" key={feature.title} delay={i * 0.06}>
                      <div className="flex gap-4 card border border-line bg-surface-sunken p-6 transition-colors duration-500 ease-base hover:bg-card">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-card text-accent">
                          <Icon name={feature.icon} size={18} />
                        </span>
                        <span>
                          <h4 className="title-2 text-ink">{feature.title}</h4>
                          <p className="body-6 mt-1 text-ink-soft">
                            {feature.body}
                          </p>
                        </span>
                      </div>
                    </Reveal>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
