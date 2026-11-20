"use client";

import { useEffect, useRef, useState } from "react";
import { tagline } from "@/lib/content";

/**
 * Mandatory large type tagline section.
 *
 * Words start muted at 30% of the base text colour and each one transitions
 * individually to full colour as it crosses a trigger line placed just above
 * the vertical middle of the viewport. Words activate one at a time in
 * reading order; the block never flips all at once.
 *
 * Implemented with one IntersectionObserver watching every word. There is no
 * scroll listener. Under prefers-reduced-motion every word renders at full
 * colour immediately and nothing animates.
 */
export default function TaglineReveal() {
  const words = tagline.text.split(" ");
  const wordRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const [activeCount, setActiveCount] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (query.matches) {
      setReduced(true);
      setActiveCount(words.length);
      return;
    }

    const nodes = wordRefs.current.filter(
      (n): n is HTMLSpanElement => n !== null,
    );
    if (nodes.length === 0) return;

    /* The trigger line sits at 55% of the viewport height. A word counts as
       active once it has risen above that line. Tracking a high-water mark
       keeps the reveal from undoing itself on scroll back up. */
    const observer = new IntersectionObserver(
      (entries) => {
        let highest = 0;
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const index = nodes.indexOf(entry.target as HTMLSpanElement);
          if (index >= 0) highest = Math.max(highest, index + 1);
        }
        if (highest > 0) {
          setActiveCount((current) => Math.max(current, highest));
        }
      },
      { rootMargin: "0px 0px -45% 0px", threshold: 0 },
    );

    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, [words.length]);

  return (
    <section
      data-theme="plain"
      aria-label="What PocketPair is for"
    >
      <p className="heading-2 mx-auto max-w-[864px] text-center">
        {words.map((word, i) => (
          <span
            key={`${word}-${i}`}
            ref={(el) => {
              wordRefs.current[i] = el;
            }}
            style={{
              /* Longhand only: mixing the `transition` shorthand with
                 `transitionDelay` makes React warn when either changes. */
              transitionProperty: reduced ? "none" : "color",
              transitionDuration: "500ms",
              transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
              transitionDelay: reduced ? "0ms" : `${(i % 4) * 40}ms`,
            }}
            className={i < activeCount ? "text-ink" : "text-ink/30"}
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </span>
        ))}
      </p>
    </section>
  );
}
