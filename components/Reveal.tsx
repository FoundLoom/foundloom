"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { EASE_ENTRY, viewportOnce } from "@/lib/motion";

type RevealProps = {
  children: ReactNode;
  /** Extra delay in seconds, for staggering siblings. */
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li" | "article";
};

/**
 * Scroll reveal. Rises 32px (Spacing-400) and fades from 0 to full opacity
 * over 700ms on the entry curve, once only.
 *
 * Uses whileInView, which is backed by IntersectionObserver. There is no
 * scroll listener anywhere in this project.
 *
 * Under prefers-reduced-motion the global stylesheet collapses the duration,
 * and motion's own reduced-motion handling drops the transform, so the
 * content simply appears.
 */
export default function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
}: RevealProps) {
  const MotionTag = motion[as];

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.7, ease: EASE_ENTRY, delay }}
    >
      {children}
    </MotionTag>
  );
}
