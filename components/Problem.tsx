import { Check, X } from "@phosphor-icons/react/dist/ssr";
import { problem } from "@/lib/content";
import Reveal from "./Reveal";

export default function Problem() {
  return (
    <section
      className="px-4 py-20 md:py-24"
      aria-labelledby="problem-heading"
    >
      <div className="mx-auto max-w-[1320px]">
        <Reveal>
          <p className="eyebrow">
            {problem.eyebrow}
          </p>
          <h2 id="problem-heading" className="heading-3 mt-6 max-w-[680px]">
            {problem.heading}
          </h2>
          <p className="body-3 mt-6 max-w-[680px] text-ink-soft">
            {problem.body}
          </p>
        </Reveal>

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {[problem.before, problem.after].map((column, index) => {
            const isAfter = index === 1;
            return (
              <Reveal key={column.title} delay={index * 0.08}>
                {/* Card at 16px radius with 8px padding: rows inside resolve
                    to 8px by the nested radius formula. Borders run all the
                    way around, never one side. */}
                <div
                  className={`h-full card border p-2 ${
                    isAfter
                      ? "border-accent/30 bg-accent-soft"
                      : "border-line bg-surface-sunken"
                  }`}
                >
                  <h3
                    className={`title-3 px-3 py-3 ${
                      isAfter ? "text-accent" : "text-ink-soft"
                    }`}
                  >
                    {column.title}
                  </h3>
                  <ul className="flex flex-col gap-1">
                    {column.items.map((item) => (
                      <li
                        key={item}
                        className={`flex items-start gap-3 rounded-lg px-3 py-3 ${
                          isAfter ? "bg-card" : "bg-card/60"
                        }`}
                      >
                        {isAfter ? (
                          <Check
                            size={16}
                            weight="bold"
                            className="mt-1 shrink-0 text-accent"
                            aria-hidden="true"
                          />
                        ) : (
                          <X
                            size={16}
                            weight="bold"
                            className="mt-1 shrink-0 text-ink-faint"
                            aria-hidden="true"
                          />
                        )}
                        <span className="body-6 text-ink">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
