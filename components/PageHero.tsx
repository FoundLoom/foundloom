"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { EASE_BASE } from "@/lib/motion";
import SplitText from "./SplitText";

/**
 * Hero for a sub-page. Lighter than the home hero and consistent across
 * every route, so the site reads as one thing rather than a set of
 * unrelated pages.
 */
export default function PageHero({
  eyebrow,
  status,
  live,
  headingLineOne,
  headingLineTwo,
  body,
  children,
  breadcrumbs,
}: {
  eyebrow: string;
  status?: string;
  live?: boolean;
  headingLineOne: string;
  headingLineTwo?: string;
  body: string;
  children?: ReactNode;
  breadcrumbs?: ReactNode;
}) {
  return (
    <section data-theme="black" className="page-hero-card isolate">
      <div className="aurora" aria-hidden="true" />
      <div className="hero-grid" aria-hidden="true" />
      <div className="relative z-10 mx-auto max-w-[1320px]">
        {breadcrumbs}

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: EASE_BASE }}
          className="mt-6 flex flex-wrap items-center gap-3"
        >
          <p className="eyebrow">
            {eyebrow}
          </p>
          {status && (
            <span
              className={`caption-5 inline-flex items-center gap-1 rounded-lg px-2 py-1 ${
                live
                  ? "bg-accent-soft text-accent"
                  : "bg-surface-sunken text-ink-soft"
              }`}
            >
              <span
                className={`block h-2 w-2 rounded-full ${
                  live ? "animate-pulse-dot bg-accent" : "bg-ink-faint"
                }`}
                aria-hidden="true"
              />
              {status}
            </span>
          )}
        </motion.div>

        {/* Capped at 680px, lines broken where the thought breaks. */}
        <h1 className="heading-2 mt-8 max-w-[820px]">
          <SplitText text={headingLineOne} delay={0} className="block" />
          {headingLineTwo && (
            <SplitText
              text={headingLineTwo}
              delay={0.1}
              className="block text-accent"
            />
          )}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: EASE_BASE, delay: 0.18 }}
          className="body-2 mt-8 max-w-[608px] text-ink-soft"
        >
          {body}
        </motion.p>

        {children && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: EASE_BASE, delay: 0.24 }}
            className="mt-8"
          >
            {children}
          </motion.div>
        )}
      </div>
      {/* Corner ornament, wide screens only. */}
      <div
        className="pointer-events-none absolute right-0 top-[120px] -z-10 hidden h-[220px] w-[200px] lg:block"
        aria-hidden="true"
      >
        <span
          className="shape-tile decor-float right-0 top-0 h-[88px] w-[152px]"
          style={{ borderRadius: "999px 0 0 999px" }}
        />
        <span
          className="shape-tile right-0 top-[100px] h-[72px] w-[72px]"
          style={{ background: "#2c2c2c", borderRadius: "16px 0 0 44px" }}
        />
        <span
          className="shape-tile right-[84px] top-[100px] h-[72px] w-[72px]"
          style={{ background: "#405bff", borderRadius: "16px 16px 16px 44px" }}
        />
      </div>
    </section>
  );
}
