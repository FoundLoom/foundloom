import { Plus } from "@phosphor-icons/react/dist/ssr";
import { faq } from "@/lib/content";
import Reveal from "./Reveal";

/**
 * Grouped by product. Pass `only` on a product page so it shows just that
 * product's questions; omit it to show every group.
 */
export default function Faq({ only }: { only?: string }) {
  const groups = only
    ? faq.groups.filter((g) => g.title === only)
    : faq.groups;
  if (groups.length === 0) return null;
  const single = groups.length === 1;
  return (
    <section
      id="faq"
      className="scroll-mt-24 border-t border-line px-4 py-20 md:py-24"
      aria-labelledby="faq-heading"
    >
      <div className="mx-auto max-w-3xl">
        <Reveal className="text-center">
          <p className="eyebrow">
            {faq.eyebrow}
          </p>
          <h2 id="faq-heading" className="heading-3 mt-6">
            {single ? `Questions about ${groups[0].title}` : faq.heading}
          </h2>
        </Reveal>

        {groups.map((group, g) => (
          <div key={group.title} className={g === 0 ? "mt-12" : "mt-12"}>
            {!single && (
              <Reveal>
                <h3 className="caption-3 uppercase text-ink-faint">
                  {group.title}
                </h3>
              </Reveal>
            )}

            <div className={single ? "flex flex-col gap-2" : "mt-4 flex flex-col gap-2"}>
              {group.items.map((item, i) => (
                <Reveal key={item.q} delay={Math.min(i, 4) * 0.04}>
                  {/* Native disclosure: keyboard accessible with no JavaScript. */}
                  <details className="group card border border-line bg-surface-sunken p-2 transition-colors duration-300 ease-base hover:border-line-strong">
                    <summary className="flex cursor-pointer list-none items-start justify-between gap-4 rounded-lg px-3 py-3 [&::-webkit-details-marker]:hidden">
                      <h3 className="title-3 text-ink">{item.q}</h3>
                      <Plus
                        size={18}
                        weight="bold"
                        className="mt-0.5 shrink-0 text-ink-faint transition-transform duration-500 ease-base group-open:rotate-45"
                        aria-hidden="true"
                      />
                    </summary>
                    <p className="body-6 px-3 pb-3 text-ink-soft">
                      {item.a.map((segment, k) =>
                        segment.placeholder ? (
                          <span
                            key={k}
                            className="placeholder-chip"
                            title="Unconfirmed fact. Replace this value in lib/content.ts."
                          >
                            {segment.text}
                          </span>
                        ) : (
                          <span key={k}>{segment.text}</span>
                        ),
                      )}
                    </p>
                  </details>
                </Reveal>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
