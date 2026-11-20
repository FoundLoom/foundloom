import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { about } from "@/lib/content";
import Reveal from "./Reveal";

/**
 * Current status of both products, on the About page.
 *
 * A company page that only says what it believes is a brochure. This section
 * says where the work actually is. It states only what is confirmed: one
 * product available now, one opening to a waitlist. No launch dates,
 * no headcount, no funding, no customer numbers, because none of those have
 * been confirmed and a company page is the worst place to guess.
 */
export default function CompanyNow() {
  const { now } = about;

  return (
    <section
      id="now"
      className="scroll-mt-24 border-t border-line px-4 py-20 md:py-24"
      aria-labelledby="now-heading"
    >
      <div className="mx-auto max-w-[1320px]">
        <Reveal>
          <p className="eyebrow">
            {now.eyebrow}
          </p>
          <h2 id="now-heading" className="heading-3 mt-6 max-w-[680px]">
            {now.heading}
          </h2>
          <p className="body-3 mt-6 max-w-[680px] text-ink-soft">{now.body}</p>
        </Reveal>

        <ol className="mt-12 grid gap-4 md:grid-cols-2">
          {now.items.map((item, i) => (
            <Reveal as="li" key={item.name} delay={i * 0.08}>
              <div className="flex h-full flex-col card border border-line bg-surface-sunken p-6">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="heading-5 text-ink">{item.name}</h3>
                  <span className="caption-4 rounded-lg bg-card px-2 py-1 text-ink-soft">
                    {item.state}
                  </span>
                </div>

                <p className="body-6 mt-6 flex-1 text-ink-soft">{item.body}</p>

                <Link
                  href={item.href}
                  className="button-sm link-arrow group mt-8 inline-flex items-center gap-2 text-accent"
                >
                  {item.linkLabel}
                  <ArrowRight
                    size={16}
                    weight="bold"
                    className="transition-transform duration-500 ease-base group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Link>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
