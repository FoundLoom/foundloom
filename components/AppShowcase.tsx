import Image from "next/image";
import { Check } from "@phosphor-icons/react/dist/ssr";
import Reveal from "./Reveal";

/**
 * Second real screenshot, captured from the live PocketPair page and cropped
 * tight to the scanner screen. Two columns rather than full bleed, because
 * the source artwork carries its own warm backdrop and a full width crop
 * would read as a stray pink band against this palette.
 */
const POINTS = [
  "Reads a QR code, an attendee badge or an event check in banner",
  "No switching modes while the other person waits",
  "The event is attached to the connection as it saves",
];

export default function AppShowcase() {
  return (
    <section
      className="border-t border-line px-4 py-20 md:py-24"
      aria-labelledby="showcase-heading"
    >
      <div className="mx-auto grid max-w-[1320px] items-center gap-12 md:grid-cols-[1fr_auto]">
        <Reveal>
          <p className="eyebrow">
            Inside the app
          </p>
          <h2 id="showcase-heading" className="heading-3 mt-6 max-w-[680px]">
            Point the camera, and that is the whole step.
          </h2>

          <ul className="mt-8 flex flex-col gap-3">
            {POINTS.map((point) => (
              <li key={point} className="flex items-start gap-3">
                <Check
                  size={16}
                  weight="bold"
                  className="mt-1 shrink-0 text-accent"
                  aria-hidden="true"
                />
                <span className="body-3 text-ink-soft">{point}</span>
              </li>
            ))}
          </ul>

          <p className="caption-5 mt-8 text-ink-faint">
            Screen captured from the live PocketPair app.
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="device-glow decor-float mx-auto w-full max-w-[300px]">
            <div className="overflow-hidden card-flat border border-line bg-card p-2 shadow-[0_30px_80px_rgba(0,0,0,0.55)]">
            <Image
              src="/pocketpair-scanner.png"
              alt="The PocketPair scanner screen: auto detecting a pass and badge, with the QR viewfinder active and the Instant Dual Scanner card below it"
              width={816}
              height={1560}
              sizes="300px"
              className="w-full rounded-lg"
            />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
