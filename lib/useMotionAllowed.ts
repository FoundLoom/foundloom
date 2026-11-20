"use client";

import { useEffect, useState } from "react";

/**
 * Whether looping animation is allowed for this visitor.
 *
 * globals.css already collapses CSS animations under both the OS preference
 * and the footer's data-motion toggle, but neither reaches an animation
 * driven by JavaScript: a motion `animate` loop keeps running regardless.
 * Anything that repeats forever has to ask this hook and stop on its own.
 *
 * Order of authority matches the stylesheet: an explicit data-motion value
 * wins, and the OS preference decides when none is set. A MutationObserver
 * picks up the toggle being flipped mid-visit, so running loops stop the
 * moment someone asks them to.
 *
 * Starts true so the server and the first client render agree; the real
 * value lands in the effect, which only ever changes animation props.
 */
export function useMotionAllowed(): boolean {
  const [allowed, setAllowed] = useState(true);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");

    const read = () => {
      const attr = document.documentElement.dataset.motion;
      if (attr === "reduced") return false;
      if (attr === "full") return true;
      return !query.matches;
    };

    const update = () => setAllowed(read());
    update();

    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-motion"],
    });
    query.addEventListener("change", update);

    return () => {
      observer.disconnect();
      query.removeEventListener("change", update);
    };
  }, []);

  return allowed;
}
