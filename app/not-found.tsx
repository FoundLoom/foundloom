import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found — FoundLoom",
  robots: { index: false, follow: true },
};

/** Branded 404 with a way back. */
export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 pt-28 text-center">
      <p className="caption-3 font-mono uppercase text-accent">
        404
      </p>
      <h1 className="heading-3 mt-6 max-w-[680px]">
        This page is not in any folder.
      </h1>
      <p className="body-3 mt-6 max-w-[680px] text-ink-soft">
        The link may be out of date, or the page may have moved. Everything
        FoundLoom makes is still a click away.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="button-md btn btn-lime"
        >
          Back to home
        </Link>
        <Link
          href="/pocketpair"
          className="button-md btn btn-outline"
        >
          Explore PocketPair
        </Link>
      </div>
    </div>
  );
}
