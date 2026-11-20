"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowUpRight, SquaresFour } from "@phosphor-icons/react";
import { pocketpairWaitlistUrl } from "@/lib/content";

/**
 * Compact action dock, fixed to the bottom of the screen.
 *
 * It stays out of the way at both ends of a page. While the page's opening
 * section is on screen the same actions are already visible there, and at
 * the foot of the page it would sit on top of the footer's own links, so in
 * both places it slides away. Two IntersectionObservers decide this; there
 * is no scroll listener.
 */
export default function FloatingDock() {
  const pathname = usePathname();
  const [overHero, setOverHero] = useState(true);
  const [overFooter, setOverFooter] = useState(false);

  useEffect(() => {
    /* The page wrapper re-mounts on navigation, so look the sections up
       again each time the route changes. */
    setOverHero(true);
    setOverFooter(false);

    const hero = document.querySelector(".page > section");
    const footerEl = document.querySelector("footer");

    const heroObserver = new IntersectionObserver(
      ([entry]) => setOverHero(entry.intersectionRatio > 0.3),
      { threshold: [0, 0.3, 0.6] },
    );
    const footerObserver = new IntersectionObserver(
      ([entry]) => setOverFooter(entry.isIntersecting),
      { rootMargin: "0px 0px -40px 0px" },
    );

    if (hero) heroObserver.observe(hero);
    else setOverHero(false);
    if (footerEl) footerObserver.observe(footerEl);

    return () => {
      heroObserver.disconnect();
      footerObserver.disconnect();
    };
  }, [pathname]);

  const hidden = overHero || overFooter;

  return (
    <nav
      aria-label="Quick links"
      className="floating-dock"
      data-hidden={hidden}
      /* Hidden means unreachable too, not just invisible. */
      inert={hidden}
    >
      <Link href="/products" className="dock-quiet">
        <SquaresFour size={17} weight="bold" aria-hidden="true" />
        <span>Products</span>
      </Link>
      <Link href={pocketpairWaitlistUrl} className="dock-primary">
        <span>Join PocketPair</span>
        <ArrowUpRight size={16} weight="bold" aria-hidden="true" />
      </Link>
      <Link href="/contact" className="dock-quiet dock-contact">
        <span>Contact</span>
      </Link>
    </nav>
  );
}
