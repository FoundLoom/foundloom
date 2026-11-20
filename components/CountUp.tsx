"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "motion/react";
import { EASE_BASE } from "@/lib/motion";
import { useMotionAllowed } from "@/lib/useMotionAllowed";

/**
 * A number that counts up from zero the first time it scrolls into view.
 *
 * The final value is what gets rendered on the server and what assistive
 * technology reads, so the figure is correct with JavaScript off and is
 * never announced mid-count.
 */
export default function CountUp({
  value,
  duration = 1.4,
}: {
  value: number;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const motionAllowed = useMotionAllowed();
  const [shown, setShown] = useState(value);

  useEffect(() => {
    if (!inView || !motionAllowed) {
      setShown(value);
      return;
    }
    const controls = animate(0, value, {
      duration,
      ease: EASE_BASE,
      onUpdate: (latest) => setShown(Math.round(latest)),
    });
    return () => controls.stop();
  }, [inView, motionAllowed, value, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      <span aria-hidden="true">{shown}</span>
      <span className="sr-only">{value}</span>
    </span>
  );
}
