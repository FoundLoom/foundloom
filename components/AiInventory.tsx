import {
  ArrowUpRight,
  BookOpen,
  MagnifyingGlass,
  Sparkle,
} from "@phosphor-icons/react/dist/ssr";
import { aiInventory } from "@/lib/content";
import Icon from "./Icon";
import Marquee from "./Marquee";
import Reveal from "./Reveal";

/**
 * Product 02. Built with the same section structure, grid and card treatment
 * as the PocketPair sections above, so the two products carry equal weight.
 */
export default function AiInventory() {
  return (
    <section
      className="border-t border-line px-4 py-20 md:py-24"
      aria-labelledby="ai-heading"
    >
      <div className="mx-auto max-w-[1320px]">
        <Reveal className="text-center">
          <p className="eyebrow">
            What it does
          </p>
          <h2 id="ai-heading" className="heading-3 mx-auto mt-6 max-w-[680px]">
            Discover and compare AI models in one place
          </h2>
        </Reveal>

        {/* Four features, matching the PocketPair benefits grid exactly. */}
        <ul className="mt-12 grid gap-4 sm:grid-cols-2">
          {aiInventory.items.map((item, i) => (
            <Reveal as="li" key={item.title} delay={i * 0.06}>
              <article className="h-full card border border-line bg-surface-sunken p-6 hover:-translate-y-1">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-card text-accent">
                  <Icon name={item.icon} size={20} />
                </span>
                <h3 className="title-1 mt-6 text-ink">{item.title}</h3>
                <p className="body-6 mt-3 text-ink-soft">{item.body}</p>
              </article>
            </Reveal>
          ))}
        </ul>

        {/* Product visual, the counterpart to PocketPair's event folders. */}
        <Reveal>
          <div className="mt-12 card border border-line bg-surface-sunken p-2">
            <div className="rounded-lg border border-line bg-card p-6">
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex flex-1 items-center gap-2 rounded-lg border border-line px-3 py-2">
                  <MagnifyingGlass
                    size={16}
                    className="shrink-0 text-ink-faint"
                    aria-hidden="true"
                  />
                  <span className="body-6 text-ink-faint">Search models</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {aiInventory.sampleFilters.map((f, i) => (
                    <span
                      key={f}
                      className={`caption-4 rounded-lg px-2 py-1 ${
                        i === 0
                          ? "bg-accent-soft text-accent"
                          : "bg-surface-sunken text-ink-soft"
                      }`}
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>

              <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                {aiInventory.sampleModels.map((m) => (
                  <li
                    key={m.name}
                    className={`flex items-center gap-3 rounded-lg px-3 py-3 ${
                      m.accent ? "bg-accent-soft" : "bg-surface-sunken"
                    }`}
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-card">
                      <Sparkle
                        size={16}
                        weight="fill"
                        className={m.accent ? "text-accent" : "text-ink-faint"}
                        aria-hidden="true"
                      />
                    </span>
                    <span className="min-w-0">
                      <span className="body-5 block truncate text-ink">
                        {m.name}
                      </span>
                      <span className="caption-5 block truncate text-ink-faint">
                        {m.provider}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-line pt-6">
                <BookOpen
                  size={16}
                  className="shrink-0 text-ink-faint"
                  aria-hidden="true"
                />
                <span className="caption-4 text-ink-soft">
                  Terminology:
                </span>
                {aiInventory.sampleTerms.map((t) => (
                  <span
                    key={t}
                    className="caption-5 rounded-lg bg-surface-sunken px-2 py-1 text-ink-soft"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <p className="caption-5 mt-6 text-ink-faint">
            Sample data, shown to illustrate the interface.
          </p>
        </Reveal>

        {/* Scrolling terminology strip. Public vocabulary, no claim about
            what AI Inventory covers. Pauses on hover and on focus. */}
        <Reveal>
          <div className="mt-12">
            <p className="caption-3 uppercase text-ink-faint">
              Terminology explained in plain language
            </p>
            <div className="mt-4">
              <Marquee items={aiInventory.marqueeTerms} />
            </div>
          </div>
        </Reveal>

        {/* AI Inventory's own action. Outlined, because PocketPair's waitlist
            is the one time-sensitive thing on the page. */}
        <Reveal>
          <div className="mt-12 flex flex-wrap items-center gap-4">
            <a
              href={aiInventory.cta.href}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
            >
              {aiInventory.cta.label}
              <ArrowUpRight size={16} weight="bold" aria-hidden="true" />
            </a>
          </div>

          <p className="caption-5 mt-4 flex flex-wrap items-center gap-2 text-ink-faint">
            Who it is for:
            <span
              className="placeholder-chip"
              title="Unconfirmed fact. Replace this value in lib/content.ts."
            >
              {aiInventory.audienceAssumption}
            </span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
