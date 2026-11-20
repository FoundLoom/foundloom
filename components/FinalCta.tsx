import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { aiInventory, finalCta, routes } from "@/lib/content";
import Reveal from "./Reveal";

/**
 * Closing section. One action per product, side by side, so neither audience
 * reaches the bottom of the page without somewhere to go.
 */
export default function FinalCta() {
  return (
    <section
      className="isolate"
      aria-labelledby="final-cta-heading"
    >
      <div className="aurora" aria-hidden="true" />
      <div className="mx-auto max-w-[1320px]">
        <Reveal className="text-center">
          <h2 id="final-cta-heading" className="heading-3">
            {finalCta.heading}
          </h2>
          <p className="body-3 mx-auto mt-6 max-w-[680px] text-ink-soft">
            {finalCta.body}
          </p>
        </Reveal>

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {finalCta.cards.map((card, i) => (
            <Reveal key={card.name} delay={i * 0.08}>
              <article className="flex h-full flex-col card border border-line bg-card p-6">
                <h3 className="title-1 text-ink">{card.name}</h3>
                <p className="body-6 mt-3 flex-1 text-ink-soft">{card.body}</p>

                <div className="mt-6">
                  {card.kind === "waitlist" ? (
                    <Link
                      href={routes.pocketpair}
                      className="button-md group inline-flex items-center btn btn-lime"
                    >
                      Explore PocketPair
                      <ArrowRight
                        size={16}
                        weight="bold"
                        className="transition-transform duration-500 ease-base group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </Link>
                  ) : (
                    <a
                      href={aiInventory.cta.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="button-md inline-flex items-center btn btn-outline"
                    >
                      {aiInventory.cta.label}
                      <ArrowUpRight
                        size={16}
                        weight="bold"
                        aria-hidden="true"
                      />
                    </a>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className="body-6 mt-8 text-center text-ink-soft">
            Here about something else?{" "}
            <Link
              href={routes.contact}
              className="text-accent underline underline-offset-4"
            >
              Get in touch
            </Link>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
