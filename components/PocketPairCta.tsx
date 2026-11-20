import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { pocketpair, pocketpairCta, pocketpairWaitlistUrl } from "@/lib/content";
import Reveal from "./Reveal";

/** Closes the PocketPair section. The page's one filled, primary action,
    which opens the waitlist hosted at pocketpairWaitlistUrl. */
export default function PocketPairCta() {
  return (
    <section
      id="pocketpair-waitlist"
      className="scroll-mt-24 px-4 pb-20 md:pb-24"
      aria-labelledby="pocketpair-cta-heading"
    >
      <div className="mx-auto max-w-[1320px]">
        <Reveal>
          <div className="card border border-line bg-surface-sunken p-6 text-center md:p-12">
            <h2 id="pocketpair-cta-heading" className="heading-5 text-ink">
              {pocketpairCta.heading}
            </h2>
            <p className="body-3 mx-auto mt-3 max-w-[680px] text-ink-soft">
              {pocketpairCta.body}
            </p>
            <div className="mt-8">
              <a
                href={pocketpairWaitlistUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="button-md btn btn-lime inline-flex items-center"
              >
                {pocketpairCta.cta}
                <ArrowUpRight size={16} weight="bold" aria-hidden="true" />
              </a>
              <p className="caption-5 mt-4 text-ink-faint">
                {pocketpair.waitlistReassurance}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
