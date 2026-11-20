import { CalendarBlank, FolderSimple, MapPin } from "@phosphor-icons/react/dist/ssr";
import { folders } from "@/lib/content";
import CountUp from "./CountUp";
import Reveal from "./Reveal";

export default function EventFolders() {
  return (
    <section
      className="border-t border-line px-4 py-20 md:py-24"
      aria-labelledby="folders-heading"
    >
      <div className="mx-auto max-w-[1320px]">
        <Reveal>
          <p className="eyebrow">
            {folders.eyebrow}
          </p>
          <h2 id="folders-heading" className="heading-3 mt-6 max-w-[680px]">
            {folders.heading}
          </h2>
          <p className="body-3 mt-6 max-w-[680px] text-ink-soft">
            {folders.body}
          </p>
        </Reveal>

        <ul className="mt-12 grid gap-4 md:grid-cols-3">
          {folders.events.map((event, i) => (
            <Reveal as="li" key={event.name} delay={i * 0.06}>
              {/* 16px outer radius, 8px padding, so inner rows land on 8px. */}
              <article
                className={`h-full card border p-2 ${
                  event.accent
                    ? "border-accent/30 bg-accent-soft"
                    : "border-line bg-surface-sunken"
                }`}
              >
                <header className="px-3 py-3">
                  <div className="flex items-start justify-between gap-3">
                    <FolderSimple
                      size={20}
                      weight={event.accent ? "fill" : "regular"}
                      className={
                        event.accent ? "text-accent" : "text-ink-faint"
                      }
                      aria-hidden="true"
                    />
                    <span className="caption-4 font-mono text-ink-faint">
                      <CountUp value={event.people} /> people
                    </span>
                  </div>
                  <h3 className="title-3 mt-3 text-ink">{event.name}</h3>
                  <p className="caption-5 mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-ink-faint">
                    <span className="inline-flex items-center gap-1">
                      <MapPin size={12} aria-hidden="true" />
                      {event.venue}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <CalendarBlank size={12} aria-hidden="true" />
                      {event.date}
                    </span>
                  </p>
                </header>

                <ul className="flex flex-col gap-1">
                  {event.contacts.map((contact) => (
                    <li
                      key={contact.name}
                      className="flex items-center gap-3 rounded-lg bg-card px-3 py-2"
                    >
                      <span
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-surface-sunken"
                        aria-hidden="true"
                      >
                        <span className="caption-3 text-ink-soft">
                          {contact.name
                            .split(" ")
                            .map((w) => w[0])
                            .join("")}
                        </span>
                      </span>
                      <span className="min-w-0">
                        <span className="body-5 block truncate text-ink">
                          {contact.name}
                        </span>
                        <span className="caption-5 block truncate text-ink-faint">
                          {contact.role}
                        </span>
                      </span>
                    </li>
                  ))}
                  <li className="rounded-lg bg-card/60 px-3 py-2">
                    <span className="caption-5 text-ink-faint">
                      and {event.people - event.contacts.length} more from this
                      event
                    </span>
                  </li>
                </ul>
              </article>
            </Reveal>
          ))}
        </ul>

        <Reveal>
          <p className="caption-5 mt-6 text-ink-faint">
            Sample data, shown to illustrate the interface.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
