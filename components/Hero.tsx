"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, ArrowUpRight, QrCode, Sparkle } from "@phosphor-icons/react";
import { hero } from "@/lib/content";
import { EASE_BASE } from "@/lib/motion";
import HeroNetwork from "./HeroNetwork";
import SplitText from "./SplitText";

/**
 * Home hero. Fills the first screen: the copy, open space around it, and
 * the four product facts along the bottom edge.
 *
 * The only thing that keeps moving is the backdrop, a slow network of
 * connected points. The headline animates once on arrival and then holds
 * still.
 */
export default function Hero() {
  return (
    <section
      id="top"
      data-theme="black"
      className="hero-card isolate"
      aria-labelledby="hero-heading"
    >
      <HeroNetwork />
      <div className="hero-scrim" aria-hidden="true" />
      <div className="hero-grid" aria-hidden="true" />

      <div className="hero-main">
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: EASE_BASE }}
          >
            <Link
              href={hero.kicker.href}
              className="topic-pill inline-flex items-center gap-2"
            >
              <span className="flex -space-x-1.5" aria-hidden="true">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-lime text-[#191919]">
                  <QrCode size={13} weight="bold" />
                </span>
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#f8f8f8] text-[#191919]">
                  <Sparkle size={13} weight="fill" />
                </span>
              </span>
              <span className="caption-4">{hero.kicker.text}</span>
              <ArrowUpRight size={14} aria-hidden="true" />
            </Link>
          </motion.div>

          <h1 id="hero-heading" className="hero-title mt-7 text-ink">
            <SplitText
              text={hero.headingLineOne}
              delay={0.05}
              className="block lg:whitespace-nowrap"
            />
            <SplitText
              text={hero.headingLineTwo}
              delay={0.17}
              className="block text-accent lg:whitespace-nowrap"
            />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: EASE_BASE, delay: 0.3 }}
            className="body-2 mt-6 max-w-[620px] text-ink-soft"
          >
            {hero.subheading}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: EASE_BASE, delay: 0.36 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start"
          >
            <Link href={hero.primaryCta.href} className="btn btn-lime">
              {hero.primaryCta.label}
              <ArrowRight size={16} weight="bold" aria-hidden="true" />
            </Link>
            <Link href={hero.secondaryCta.href} className="btn btn-outline">
              {hero.secondaryCta.label}
            </Link>
          </motion.div>
        </div>
      </div>

      <motion.dl
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: EASE_BASE, delay: 0.5 }}
        className="hero-facts"
      >
        {hero.facts.map((fact) => (
          <div key={fact.label}>
            <dt className="caption-5 text-ink-faint">{fact.label}</dt>
            <dd className="heading-6 mt-1 text-ink">{fact.value}</dd>
          </div>
        ))}
      </motion.dl>
    </section>
  );
}
