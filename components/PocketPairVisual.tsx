"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { FolderSimple, QrCode, UserPlus } from "@phosphor-icons/react";
import { EASE_BASE } from "@/lib/motion";

/* ---------------------------------------------------------------------------
 * REAL PRODUCT SCREENSHOT
 *
 * Captured from the live PocketPair page at foundloom.framer.ai and cropped
 * to the three app screens. To swap it, drop a new file in /public and change
 * the path, the dimensions and the alt text below. Setting SCREENSHOT to null
 * falls back to the coded mock further down, which is kept for that reason.
 * ------------------------------------------------------------------------- */
const SCREENSHOT: string | null = "/pocketpair-app.png";
const SCREENSHOT_WIDTH = 2082;
const SCREENSHOT_HEIGHT = 1032;
const SCREENSHOT_ALT =
  "Three PocketPair app screens: the home view with a personal networking QR code, My Connections listing saved contacts with the event each came from, and Pockets, where people are grouped by where you met them";

/** The full-width PocketPair UI, for the product page hero. */
export default function PocketPairVisual() {
  if (SCREENSHOT) {
    return (
      <div className="overflow-hidden card-flat border border-line bg-card p-2">
        <Image
          src={SCREENSHOT}
          alt={SCREENSHOT_ALT}
          width={SCREENSHOT_WIDTH}
          height={SCREENSHOT_HEIGHT}
          priority
          sizes="(max-width: 1024px) 100vw, 1024px"
          className="w-full rounded-lg"
        />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: EASE_BASE, delay: 0.4 }}
      className="relative"
      role="img"
      aria-label="The PocketPair app: an event folder for the Bengaluru Tech Summit holding the people met there, with a scan confirmation alongside it."
    >
      {/* 16px outer radius with 8px padding gives inner panels 8px. */}
      <div className="card-flat border border-line bg-surface-sunken p-2">
        <div className="rounded-lg border border-line bg-card">
          <div className="flex items-center gap-2 border-b border-line px-4 py-3">
            <div className="flex gap-1">
              <span className="block h-2 w-2 rounded-full bg-line-strong" />
              <span className="block h-2 w-2 rounded-full bg-line-strong" />
              <span className="block h-2 w-2 rounded-full bg-line-strong" />
            </div>
            <p className="caption-4 ml-2 text-ink-faint">PocketPair</p>
          </div>

          <div className="grid gap-4 p-4 sm:grid-cols-[1fr_1.2fr]">
            <div className="flex flex-col gap-2">
              <p className="caption-3 px-1 text-ink-faint">Events</p>
              {[
                { name: "Bengaluru Tech Summit", n: 23, on: true },
                { name: "Mumbai Product Meetup", n: 11, on: false },
                { name: "Delhi Campus Fest", n: 17, on: false },
              ].map((f) => (
                <div
                  key={f.name}
                  className={`flex items-center gap-2 rounded-lg px-3 py-2 ${
                    f.on ? "bg-accent-soft" : "bg-surface-sunken"
                  }`}
                >
                  <FolderSimple
                    size={16}
                    weight={f.on ? "fill" : "regular"}
                    className={f.on ? "text-accent" : "text-ink-faint"}
                    aria-hidden="true"
                  />
                  <span
                    className={`body-6 flex-1 truncate ${
                      f.on ? "text-accent" : "text-ink-soft"
                    }`}
                  >
                    {f.name}
                  </span>
                  <span className="caption-5 font-mono text-ink-faint">
                    {f.n}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-2">
              <p className="caption-3 px-1 text-ink-faint">
                Bengaluru Tech Summit · 14 Mar
              </p>
              {[
                { n: "Aarav Menon", r: "Backend, logistics platform" },
                { n: "Stephanie Okafor", r: "Design lead, fintech" },
                { n: "Rohit Deshmukh", r: "Founder, warehouse robotics" },
              ].map((p) => (
                <div
                  key={p.n}
                  className="flex items-center gap-3 rounded-lg border border-line px-3 py-2"
                >
                  <span
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-surface-sunken"
                    aria-hidden="true"
                  >
                    <span className="caption-3 text-ink-soft">
                      {p.n
                        .split(" ")
                        .map((w) => w[0])
                        .join("")}
                    </span>
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="body-5 block truncate text-ink">{p.n}</span>
                    <span className="caption-5 block truncate text-ink-faint">
                      {p.r}
                    </span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE_BASE, delay: 0.7 }}
        className="relative mt-4 flex items-center gap-3 card-flat border border-line bg-card p-3 sm:absolute sm:-bottom-6 sm:left-6 sm:mt-0"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-soft">
          <QrCode size={16} weight="bold" className="text-accent" aria-hidden="true" />
        </span>
        <span>
          <span className="body-4 block text-ink">Connection saved</span>
          <span className="caption-5 block text-ink-faint">
            Filed under Bengaluru Tech Summit
          </span>
        </span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE_BASE, delay: 0.85 }}
        className="absolute -top-4 right-6 hidden items-center gap-2 rounded-xl border border-line bg-card px-3 py-2 md:flex"
      >
        <UserPlus size={16} weight="bold" className="text-accent" aria-hidden="true" />
        <span className="caption-4 text-ink">Priya Nair added you back</span>
      </motion.div>
    </motion.div>
  );
}
