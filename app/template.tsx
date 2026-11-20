"use client";

import { motion } from "motion/react";
import { useEffect, type ReactNode } from "react";
import { EASE_BASE } from "@/lib/motion";

/* False until the first page has mounted in the browser. Module scope, so it
   survives client-side navigations and resets on a full page load. */
let hasLoadedOnce = false;

/**
 * Page transition. A template re-mounts on every navigation, so each route
 * fades up into place instead of swapping instantly. Opacity and a short
 * rise only, and kept to 220ms: any longer and moving between pages starts
 * to feel like waiting.
 *
 * The very first page is exempt. It is rendered on the server, and hiding
 * it until JavaScript arrives would delay first paint and leave the page
 * blank for anyone whose scripts are slow or blocked. Only navigations made
 * inside the site animate.
 */
export default function Template({ children }: { children: ReactNode }) {
  const animateIn = hasLoadedOnce;

  useEffect(() => {
    hasLoadedOnce = true;
  }, []);

  return (
    <motion.div
      className="page"
      initial={animateIn ? { opacity: 0, y: 8 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, ease: EASE_BASE }}
    >
      {children}
    </motion.div>
  );
}
