import { benefits } from "@/lib/content";
import Icon from "./Icon";
import Reveal from "./Reveal";

export default function Benefits() {
  return (
    <section
      className="border-t border-line px-4 py-20 md:py-24"
      aria-labelledby="benefits-heading"
    >
      <div className="mx-auto max-w-[1320px]">
        <Reveal className="text-center">
          <p className="eyebrow">
            {benefits.eyebrow}
          </p>
          <h2
            id="benefits-heading"
            className="heading-3 mx-auto mt-6 max-w-[680px]"
          >
            {benefits.heading}
          </h2>
          <p className="body-3 mx-auto mt-6 max-w-[680px] text-ink-soft">
            {benefits.subheading}
          </p>
        </Reveal>

        <ul className="mt-12 grid gap-4 md:grid-cols-3">
          {benefits.items.map((item, i) => (
            <Reveal
              as="li"
              key={item.title}
              delay={i * 0.06}
              /* Wide, narrow / narrow, wide: a bento rather than a grid. */
              className={i % 4 === 0 || i % 4 === 3 ? "md:col-span-2" : undefined}
            >
              <article className="group relative h-full min-h-[220px] overflow-hidden card border border-line bg-surface-sunken p-6 hover:-translate-y-1 md:p-8">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-card text-accent">
                  <Icon name={item.icon} size={20} />
                </span>
                <h3 className="heading-6 mt-8 text-ink">{item.title}</h3>
                <p className="body-6 mt-3 max-w-[520px] text-ink-soft">{item.body}</p>
                <span className="card-watermark text-ink" aria-hidden="true">
                  <Icon name={item.icon} size={150} />
                </span>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
