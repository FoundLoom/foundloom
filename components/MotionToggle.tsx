"use client";

import { useEffect, useState } from "react";
import { Pause, Play } from "@phosphor-icons/react";

const STORAGE_KEY = "foundloom:motion";

/**
 * Lets a visitor switch the page's animation off, the way the reference site
 * does. This is a real accessibility control, not decoration: vestibular
 * disorders are not limited to people who have set an OS-level preference.
 *
 * It sets data-motion="reduced" on <html>, which globals.css uses to collapse
 * every transition and animation. The choice is remembered per browser.
 */
export default function MotionToggle() {
  const [reduced, setReduced] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = window.localStorage.getItem(STORAGE_KEY);
    } catch {
      /* Private mode or blocked storage. Fall through to the OS preference. */
    }
    const prefers = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const initial = stored === null ? prefers : stored === "reduced";
    apply(initial);
    setReduced(initial);
    setReady(true);
  }, []);

  function apply(next: boolean) {
    document.documentElement.dataset.motion = next ? "reduced" : "full";
  }

  function toggle() {
    const next = !reduced;
    setReduced(next);
    apply(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next ? "reduced" : "full");
    } catch {
      /* Nothing to do: the setting still applies for this page view. */
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={reduced}
      className="body-6 inline-flex items-center gap-2 rounded-lg px-2 py-1 text-ink/70 transition-colors duration-300 ease-base hover:bg-ink/10 hover:text-ink"
    >
      {reduced ? (
        <Play size={14} weight="fill" aria-hidden="true" />
      ) : (
        <Pause size={14} weight="fill" aria-hidden="true" />
      )}
      {/* Render a stable label until the stored preference is read, so the
          server and client markup match. */}
      {ready && reduced ? "Resume motion" : "Reduce motion"}
    </button>
  );
}
