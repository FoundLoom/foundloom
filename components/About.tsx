import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { about, routes } from "@/lib/content";
import CodeWindow from "./CodeWindow";
import Icon from "./Icon";
import Reveal from "./Reveal";

/** Company statement. Every company site has one; this page needs it too. */
export default function About({ summary = false }: { summary?: boolean }) {
  return (
    <section
      id="about"
      className="scroll-mt-24 border-t border-line bg-surface-sunken px-4 py-20 md:py-24"
      aria-labelledby="about-heading"
    >
      <div className="mx-auto max-w-[1320px]">
        <div className="grid gap-12 md:grid-cols-[1fr_1.1fr] md:gap-14">
          <Reveal className="md:sticky md:top-[100px] md:self-start">
            <p className="eyebrow">
              {/* The About page already carries "About FoundLoom" in its hero,
                  so the full version of this section labels itself. */}
              {summary ? about.eyebrow : "Our approach"}
            </p>
            <h2 id="about-heading" className="heading-3 mt-6">
              {summary ? about.heading : "How we work"}
            </h2>
            <p className="body-3 mt-6 text-ink-soft">{about.body}</p>

            {summary ? (
              <Link
                href={routes.about}
                className="btn btn-dark mt-8"
              >
                More about FoundLoom
                <ArrowRight
                  size={16}
                  weight="bold"
                  className="transition-transform duration-500 ease-base group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            ) : (
              <p className="caption-5 mt-6 flex flex-wrap items-center gap-2 text-ink-faint">
                The full story:
                <span
                  className="placeholder-chip"
                  title="Unconfirmed fact. Replace this value in lib/content.ts."
                >
                  {about.story}
                </span>
              </p>
            )}

            {/* On the About page, show the work: a real file from this
                site's source rather than a picture of code. */}
            {!summary && <CodeWindow className="mt-10 max-w-[440px]" />}
          </Reveal>

          <ul className="flex flex-col">
            {about.points.map((point, i) => (
              <Reveal
                as="li"
                key={point.title}
                delay={i * 0.06}
                className={`rule-row ${i === about.points.length - 1 ? "rule-row-last" : ""}`}
              >
                <div className="flex items-center gap-5 py-6">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[8px_24px_8px_8px] bg-accent-soft text-accent">
                    <Icon name={point.icon} size={18} />
                  </span>
                  <span>
                    <h3 className="heading-6 text-ink">{point.title}</h3>
                    <p className="body-6 mt-2 text-ink-soft">{point.body}</p>
                  </span>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
