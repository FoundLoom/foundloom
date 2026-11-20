"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { nav } from "@/lib/content";
import { EASE_BASE, navLinkDelay, navLinkVariants } from "@/lib/motion";
import Logo from "./Logo";

/**
 * Site navigation. Real routes, not anchors, with the current page marked
 * via aria-current so it is announced as well as shown.
 *
 * The bar is a dark tab hanging from the top edge of the page, centred,
 * with concave shoulders. It picks up a shadow once the page moves.
 */
export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  /* Shadow on scroll. A one-pixel sentinel watched by IntersectionObserver,
     because a scroll listener would run on every frame. */
  useEffect(() => {
    const sentinel = document.getElementById("nav-sentinel");
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      ([entry]) => setScrolled(!entry.isIntersecting),
      { threshold: 0 },
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  /* Close the panel whenever the route changes. */
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  /* Lock the page behind the open panel, and close on Escape. */
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  /** Exact match for home, prefix match otherwise. */
  const isCurrent = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  /**
   * A section is active when the current page is the section's own page or
   * any page listed in its `match` set. That is what keeps Products lit
   * while someone is reading /pocketpair.
   */
  const inSection = (link: { href: string; match?: readonly string[] }) =>
    link.match ? link.match.some((p) => pathname.startsWith(p)) : isCurrent(link.href);

  return (
    <>
      <div id="nav-sentinel" aria-hidden="true" className="absolute top-0 h-px w-px" />

      <header className="site-header pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-3 md:px-6">
        <nav
          aria-label="Primary"
          data-scrolled={scrolled}
          className="nav-tab pointer-events-auto flex w-full items-center justify-between gap-6 pl-5 pr-2 md:w-auto md:min-w-[640px] md:gap-10 md:pl-6 md:pr-3"
        >
          <Logo />

          <ul className="hidden items-center gap-1 md:flex">
            {nav.links.map((link) => {
              const active = inSection(link);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={isCurrent(link.href) ? "page" : undefined}
                    data-active={active}
                    className="nav-link title-4 relative isolate block"
                  >
                    {/* One pill shared by all links: it slides to whichever
                        section is current. */}
                    {active && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 -z-10 rounded-[7px] bg-[#2c2c2c]"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <Link
              href={nav.cta.href}
              aria-current={isCurrent(nav.cta.href) ? "page" : undefined}
              className="nav-cta"
            >
              {nav.cta.label}
            </Link>

            {/* The icon transforms between states, it never swaps. */}
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-line text-ink transition-colors duration-300 hover:bg-[#2c2c2c] md:hidden"
            >
              <span className="relative block h-3 w-4" aria-hidden="true">
                <motion.span
                  className="absolute left-0 block h-0.5 w-4 rounded-full bg-current"
                  animate={open ? { top: 5, rotate: 45 } : { top: 0, rotate: 0 }}
                  transition={{ duration: 0.5, ease: EASE_BASE }}
                  style={{ top: 0 }}
                />
                <motion.span
                  className="absolute left-0 block h-0.5 w-4 rounded-full bg-current"
                  animate={open ? { top: 5, rotate: -45 } : { top: 10, rotate: 0 }}
                  transition={{ duration: 0.5, ease: EASE_BASE }}
                  style={{ top: 10 }}
                />
              </span>
            </button>
          </div>
        </nav>
      </header>

      {/* Full height panel, not a dropdown. */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE_BASE }}
            className="fixed inset-0 z-40 bg-[#191919]/95 backdrop-blur-2xl md:hidden"
          >
            <div className="flex h-full flex-col justify-center px-6 pb-20">
              <ul className="flex flex-col gap-2">
                {nav.links.map((link, i) => (
                  <motion.li
                    key={link.href}
                    custom={navLinkDelay(i, nav.links.length + 1)}
                    variants={navLinkVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <Link
                      href={link.href}
                      aria-current={isCurrent(link.href) ? "page" : undefined}
                      className={`heading-4 block py-2 ${
                        inSection(link) ? "text-accent" : "text-ink"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
                <motion.li
                  custom={navLinkDelay(nav.links.length, nav.links.length + 1)}
                  variants={navLinkVariants}
                  initial="hidden"
                  animate="visible"
                  className="pt-4"
                >
                  <Link
                    href={nav.cta.href}
                    className="btn btn-lime w-full justify-center"
                  >
                    {nav.cta.label}
                  </Link>
                </motion.li>
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
