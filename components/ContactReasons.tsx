import { contactReasons } from "@/lib/content";
import Icon from "./Icon";
import Reveal from "./Reveal";

/**
 * What people write in about, on the Contact page.
 *
 * These four match the four options in the form's subject field exactly, so
 * the page tells you how your message will be sorted before you send it.
 * Kept to categories rather than promises: no response-time claim is made
 * here, because the real one has not been confirmed.
 */
export default function ContactReasons() {
  return (
    <section
      id="reasons"
      className="scroll-mt-24 border-t border-line bg-surface-sunken px-4 py-20 md:py-24"
      aria-labelledby="reasons-heading"
    >
      <div className="mx-auto max-w-[1320px]">
        <Reveal>
          <p className="eyebrow">
            {contactReasons.eyebrow}
          </p>
          <h2 id="reasons-heading" className="heading-3 mt-6 max-w-[680px]">
            {contactReasons.heading}
          </h2>
          <p className="body-3 mt-6 max-w-[680px] text-ink-soft">
            {contactReasons.body}
          </p>
        </Reveal>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2">
          {contactReasons.items.map((item, i) => (
            <Reveal as="li" key={item.title} delay={i * 0.06}>
              <div className="flex h-full gap-4 card border border-line bg-card p-6 hover:-translate-y-1">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent">
                  <Icon name={item.icon} size={18} />
                </span>
                <span>
                  <h3 className="title-2 text-ink">{item.title}</h3>
                  <p className="body-6 mt-1 text-ink-soft">{item.body}</p>
                </span>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
