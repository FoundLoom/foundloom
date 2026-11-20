import type { Transition, Variants } from "motion/react";

/** The one approved easing curve. Weighted, decelerating into place. */
export const EASE_BASE = [0.22, 1, 0.36, 1] as const;

/** Entrances: scroll reveals and the hero widgets. */
export const EASE_ENTRY = [0.22, 0.61, 0.36, 1] as const;

/** Layout and position changes. */
export const transitionBase: Transition = {
  duration: 0.5,
  ease: EASE_BASE,
};

/** Scroll reveals sit at the slower end of the permitted range. */
export const transitionReveal: Transition = {
  duration: 0.7,
  ease: EASE_BASE,
};

/**
 * Section scroll reveal: rise 32px (Spacing-400) and fade in.
 * Only transform and opacity are animated.
 */
export const revealVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: transitionReveal },
};

/**
 * Nav link entrance: rise 24px (Spacing-300), staggered 60ms apart,
 * with the whole sequence capped at 400ms however long the menu is.
 */
export function navLinkDelay(index: number, total: number): number {
  const step = 0.06;
  const cap = 0.4;
  const naive = index * step;
  if (total <= 1) return 0;
  const longest = (total - 1) * step;
  return longest <= cap ? naive : (naive / longest) * cap;
}

export const navLinkVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE_BASE, delay },
  }),
};

/** Reveal each section once. Never replay on scroll back up. */
export const viewportOnce = { once: true, amount: 0.2 } as const;
