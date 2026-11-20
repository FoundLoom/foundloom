"use client";

import type { ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useMotionAllowed } from "@/lib/useMotionAllowed";

/**
 * Leans its child a few degrees towards the cursor, with a spring so it
 * settles rather than snaps. Does nothing on touch input or when the
 * visitor has asked for reduced motion.
 */
export default function Tilt({
  children,
  className,
  max = 4,
}: {
  children: ReactNode;
  className?: string;
  /** Largest lean in degrees. */
  max?: number;
}) {
  const motionAllowed = useMotionAllowed();
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const spring = { stiffness: 180, damping: 22, mass: 0.6 };
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-max, max]), spring);
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [max, -max]), spring);

  return (
    <motion.div
      className={className}
      style={
        motionAllowed
          ? { rotateX, rotateY, transformPerspective: 1200 }
          : undefined
      }
      onPointerMove={(e) => {
        if (!motionAllowed || e.pointerType !== "mouse") return;
        const rect = e.currentTarget.getBoundingClientRect();
        px.set((e.clientX - rect.left) / rect.width - 0.5);
        py.set((e.clientY - rect.top) / rect.height - 0.5);
      }}
      onPointerLeave={() => {
        px.set(0);
        py.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}
