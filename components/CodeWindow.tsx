"use client";

import { motion } from "motion/react";
import { EASE_ENTRY, viewportOnce } from "@/lib/motion";

/**
 * An editor window showing a real file from this project, lib/content.ts,
 * with its lines arriving one after another as it scrolls into view.
 *
 * The snippet is the site's actual route table. Keep it in step with the
 * file if the routes change; it is here as evidence, not decoration.
 */
type Token = { text: string; tone?: "key" | "str" | "kw" | "dim" };

const LINES: readonly (readonly Token[])[] = [
  [{ text: "// lib/content.ts", tone: "dim" }],
  [
    { text: "export const ", tone: "kw" },
    { text: "routes" },
    { text: " = {" },
  ],
  [{ text: "  home", tone: "key" }, { text: ": " }, { text: '"/"', tone: "str" }, { text: "," }],
  [{ text: "  products", tone: "key" }, { text: ": " }, { text: '"/products"', tone: "str" }, { text: "," }],
  [{ text: "  pocketpair", tone: "key" }, { text: ": " }, { text: '"/pocketpair"', tone: "str" }, { text: "," }],
  [{ text: "  aiInventory", tone: "key" }, { text: ": " }, { text: '"/ai-inventory"', tone: "str" }, { text: "," }],
  [{ text: "  about", tone: "key" }, { text: ": " }, { text: '"/about"', tone: "str" }, { text: "," }],
  [{ text: "  contact", tone: "key" }, { text: ": " }, { text: '"/contact"', tone: "str" }, { text: "," }],
  [{ text: "} " }, { text: "as const", tone: "kw" }, { text: ";" }],
];

export default function CodeWindow({ className }: { className?: string }) {
  return (
    <motion.div
      role="img"
      aria-label="Code editor showing the route table from this site's source: home, products, PocketPair, AI Inventory, about and contact."
      className={`terminal ${className ?? ""}`}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } },
      }}
    >
      <div className="terminal-bar" aria-hidden="true">
        <span />
        <span />
        <span />
        <p>content.ts</p>
      </div>
      <div className="terminal-body" aria-hidden="true">
        {LINES.map((line, i) => (
          <motion.p
            key={i}
            className="terminal-line"
            variants={{
              hidden: { opacity: 0, x: -10 },
              visible: {
                opacity: 1,
                x: 0,
                transition: { duration: 0.45, ease: EASE_ENTRY },
              },
            }}
          >
            <span className="code-gutter">{i + 1}</span>
            <span className="whitespace-pre">
              {line.map((token, t) => (
                <span key={t} className={token.tone ? `code-${token.tone}` : undefined}>
                  {token.text}
                </span>
              ))}
            </span>
          </motion.p>
        ))}
      </div>
    </motion.div>
  );
}
