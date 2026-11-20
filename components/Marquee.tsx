"use client";

/**
 * Edge-to-edge scrolling strip. Pure CSS transform animation, so it costs
 * nothing on the main thread, and it pauses on hover and on focus within.
 *
 * The track is duplicated once and translated by exactly -50%, which makes
 * the loop seamless. The duplicate is hidden from assistive technology so the
 * content is not announced twice.
 *
 * Stops entirely under prefers-reduced-motion and under the footer's
 * reduce-motion toggle, both handled in globals.css.
 */
export default function Marquee({ items }: { items: readonly string[] }) {
  return (
    <div
      className="marquee relative overflow-hidden"
      /* Fade the ends so items enter and leave rather than popping. */
      style={{
        maskImage:
          "linear-gradient(90deg, transparent, #000 80px, #000 calc(100% - 80px), transparent)",
        WebkitMaskImage:
          "linear-gradient(90deg, transparent, #000 80px, #000 calc(100% - 80px), transparent)",
      }}
    >
      <div className="marquee-track flex w-max gap-2">
        {[0, 1].map((copy) => (
          <ul
            key={copy}
            className="flex shrink-0 gap-2"
            aria-hidden={copy === 1 ? "true" : undefined}
          >
            {items.map((item) => (
              <li
                key={`${copy}-${item}`}
                className="marquee-card title-4 whitespace-nowrap border border-line bg-card px-6 py-4 text-ink"
              >
                {item}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
