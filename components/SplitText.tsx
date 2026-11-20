"use client";

import { motion } from "motion/react";
import { EASE_BASE } from "@/lib/motion";

/**
 * Heading text that arrives one word at a time: each word rises half its
 * own height and sharpens out of a blur. Runs once on mount.
 *
 * The sentence is exposed to assistive technology as a single string; the
 * animated words themselves are hidden from it, so nothing is read out
 * word by word.
 */
export default function SplitText({
  text,
  delay = 0,
  className,
}: {
  text: string;
  /** Seconds before the first word starts. */
  delay?: number;
  className?: string;
}) {
  const words = text.split(" ");

  return (
    <span className={className} aria-label={text}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          aria-hidden="true"
          className="inline-block overflow-hidden pb-[0.12em] align-bottom"
        >
          <motion.span
            className="inline-block"
            initial={{ opacity: 0, y: "0.55em", filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              duration: 0.5,
              ease: EASE_BASE,
              delay: delay + i * 0.04,
            }}
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
