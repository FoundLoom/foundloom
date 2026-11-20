import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Sparkle } from "@phosphor-icons/react/dist/ssr";
import { aiInventory, productsOverview } from "@/lib/content";
import Reveal from "./Reveal";
import Tilt from "./Tilt";

/**
 * Both products as cards, before either deep dive. This is the section that
 * makes the page read as a company rather than as one product's landing page:
 * a visitor sees the full catalogue in one screen and chooses.
 *
 * The section itself has no surface. The two cards are the surface: the
 * first is lime, the second near-black. Each leans towards the cursor,
 * carries its own product art in the corner, and drives its call to action
 * from a hover anywhere on the card.
 */
export default function ProductsOverview() {
  return (
    <section
      id="products"
      data-theme="plain"
      aria-labelledby="products-heading"
    >
      <div className="mx-auto max-w-[1392px]">
        <Reveal className="flex flex-col items-center text-center">
          <p className="eyebrow">{productsOverview.eyebrow}</p>
          <h2 id="products-heading" className="heading-2 mt-8 max-w-[864px]">
            {productsOverview.heading}
          </h2>
          <p className="body-2 mt-6 max-w-[608px] text-ink-soft">
            {productsOverview.body}
          </p>
        </Reveal>

        <ul className="mt-12 grid gap-3 lg:grid-cols-2">
          {productsOverview.cards.map((card, i) => {
            const lime = i === 0;
            return (
              <Reveal as="li" key={card.name} delay={i * 0.08}>
                <Tilt className="h-full">
                <Link
                  href={card.href}
                  data-theme={lime ? "lime" : "dark"}
                  className="product-card btn-parent flex h-full flex-col items-start p-6 md:p-10 lg:p-12"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="caption-3 uppercase text-ink-faint">
                      {card.category}
                    </span>
                    <span className="caption-5 inline-flex items-center gap-2 rounded-full border border-line-strong px-3 py-0.5 text-ink">
                      {/* Live products get a pulsing dot. */}
                      <span
                        className={`block h-2 w-2 rounded-full ${
                          card.live ? "animate-pulse-dot bg-accent" : "bg-ink-faint"
                        }`}
                        aria-hidden="true"
                      />
                      {card.status}
                    </span>
                  </div>

                  <h3 className="heading-4 mt-8 max-w-[500px] text-ink">
                    {card.name}
                  </h3>
                  <p className="body-6 mt-4 max-w-[500px] text-ink-soft">
                    {card.body}
                  </p>

                  <ul className="mt-6 flex flex-col gap-2">
                    {card.points.map((point) => (
                      <li key={point} className="flex items-center gap-2">
                        <Check
                          size={14}
                          weight="bold"
                          className="shrink-0 text-accent"
                          aria-hidden="true"
                        />
                        <span className="body-6 text-ink">{point}</span>
                      </li>
                    ))}
                  </ul>

                  <span className="mt-auto block pt-9">
                    <span className={`btn ${lime ? "btn-dark" : "btn-lime"}`}>
                      {card.cta}
                      <ArrowRight size={16} weight="bold" aria-hidden="true" />
                    </span>
                  </span>

                  {/* Product art: the real app on the lime card, a small
                      animated model list on the dark one. Decorative, so
                      hidden from assistive technology. */}
                  {lime ? (
                    <span
                      className="product-art pointer-events-none absolute -bottom-3 -right-3 -z-10 hidden w-[56%] sm:block"
                      aria-hidden="true"
                    >
                      <Image
                        src="/pocketpair-app.png"
                        alt=""
                        width={2082}
                        height={1032}
                        sizes="(max-width: 1024px) 56vw, 400px"
                        className="rounded-tl-[28px] border border-[#191919] bg-white shadow-[0_24px_60px_rgba(25,25,25,0.28)]"
                      />
                    </span>
                  ) : (
                    <span
                      className="product-art pointer-events-none absolute bottom-8 right-8 -z-10 hidden w-[240px] flex-col gap-2 sm:flex"
                      aria-hidden="true"
                    >
                      {aiInventory.sampleModels.slice(0, 3).map((model, m) => (
                        <span
                          key={model.name}
                          className="decor-float flex items-center gap-3 rounded-xl border border-line bg-card px-3 py-2.5"
                          style={{
                            animationDelay: `${m * -2.5}s`,
                            marginLeft: `${m * 18}px`,
                          }}
                        >
                          <span
                            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                              model.accent
                                ? "bg-lime text-[#191919]"
                                : "bg-surface-sunken text-ink-faint"
                            }`}
                          >
                            <Sparkle size={15} weight="fill" />
                          </span>
                          <span className="min-w-0">
                            <span className="body-5 block truncate text-ink">
                              {model.name}
                            </span>
                            <span className="caption-5 block truncate text-ink-faint">
                              {model.provider}
                            </span>
                          </span>
                        </span>
                      ))}
                    </span>
                  )}
                </Link>
                </Tilt>
              </Reveal>
            );
          })}
        </ul>

        {/* Route to the catalogue page, where the two sit side by side. */}
        <Reveal className="mt-8 flex justify-center">
          <Link href={productsOverview.seeAll.href} className="btn btn-outline">
            {productsOverview.seeAll.label}
            <ArrowRight size={16} weight="bold" aria-hidden="true" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
