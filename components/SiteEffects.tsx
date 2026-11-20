"use client";

import { useEffect } from "react";
import { motion, useScroll, useSpring } from "motion/react";

/**
 * Two page-wide effects that belong to no single section.
 *
 * 1. Reading progress: a lime hairline along the top edge that fills as the
 *    page scrolls.
 * 2. Pointer glow: cards light up under the cursor. One delegated listener
 *    writes the pointer position into CSS variables on whichever card is
 *    under it; the stylesheet does the drawing. Skipped on touch devices,
 *    where there is no hover to follow.
 */
export default function SiteEffects() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    restDelta: 0.001,
  });

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    let frame = 0;
    const onMove = (e: PointerEvent) => {
      const card = (e.target as Element | null)?.closest<HTMLElement>(
        ".card, .product-card, .widget",
      );
      if (!card) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${e.clientX - rect.left}px`);
        card.style.setProperty("--my", `${e.clientY - rect.top}px`);
      });
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <motion.div
      aria-hidden="true"
      className="scroll-progress"
      style={{ scaleX: progress }}
    />
  );
}
