"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { howItWorks } from "@/lib/content";
import { useMotionAllowed } from "@/lib/useMotionAllowed";
import Icon from "./Icon";
import Reveal from "./Reveal";

/**
 * The three steps as a timeline rather than three cards. A rule runs
 * through the step markers and fills as the section scrolls past, and each
 * step comes up to full strength as the fill reaches it, so the order of
 * the steps is something you watch happen.
 */
export default function HowItWorks() {
  const trackRef = useRef<HTMLOListElement>(null);
  const motionAllowed = useMotionAllowed();
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 85%", "end 60%"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const total = howItWorks.steps.length;

  return (
    <section id="how-it-works" aria-labelledby="how-heading">
      <div className="mx-auto max-w-[1320px]">
        <Reveal className="text-center">
          <p className="eyebrow">{howItWorks.eyebrow}</p>
          <h2 id="how-heading" className="heading-3 mx-auto mt-6 max-w-[680px]">
            {howItWorks.heading}
          </h2>
        </Reveal>

        <ol
          ref={trackRef}
          className="relative mt-16 grid gap-12 md:grid-cols-3 md:gap-10"
        >
          {/* The rule: horizontal on desktop, vertical on a phone. */}
          <span
            className="absolute left-6 top-0 h-full w-px bg-ink/15 md:left-0 md:top-6 md:h-px md:w-full"
            aria-hidden="true"
          >
            <motion.span
              className="absolute inset-0 hidden origin-left bg-ink md:block"
              style={{ scaleX: motionAllowed ? progress : 1 }}
            />
            <motion.span
              className="absolute inset-0 origin-top bg-ink md:hidden"
              style={{ scaleY: motionAllowed ? progress : 1 }}
            />
          </span>

          {howItWorks.steps.map((step, i) => (
            <Step
              key={step.index}
              step={step}
              progress={progress}
              from={i / total}
              animated={motionAllowed}
            />
          ))}
        </ol>
      </div>
    </section>
  );
}

function Step({
  step,
  progress,
  from,
  animated,
}: {
  step: (typeof howItWorks.steps)[number];
  progress: MotionValue<number>;
  /** Point along the rule, 0 to 1, where this step sits. */
  from: number;
  animated: boolean;
}) {
  const strength = useTransform(progress, [from - 0.05, from + 0.12], [0.35, 1]);
  const scale = useTransform(progress, [from - 0.05, from + 0.12], [0.86, 1]);

  return (
    <motion.li
      className="relative pl-20 md:pl-0 md:pt-20"
      style={animated ? { opacity: strength } : undefined}
    >
      <motion.span
        className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-[8px_24px_8px_8px] border border-ink bg-accent-soft text-accent"
        style={animated ? { scale } : undefined}
      >
        <Icon name={step.icon} size={20} />
      </motion.span>
      <span className="caption-3 font-mono text-ink-faint">{step.index}</span>
      <h3 className="heading-5 mt-2 text-ink">{step.title}</h3>
      <p className="body-6 mt-3 max-w-[340px] text-ink-soft">{step.body}</p>
    </motion.li>
  );
}
