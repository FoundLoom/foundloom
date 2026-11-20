import Link from "next/link";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";

/**
 * Shell for the legal pages. These exist so the footer has no dead links.
 * The body text is a marked placeholder: real legal copy has to come from
 * FoundLoom, it is not something to draft speculatively.
 */
export default function LegalPage({
  title,
  slug,
}: {
  title: string;
  slug: string;
}) {
  return (
    <div className="mx-auto max-w-3xl px-4 pb-20 pt-28 md:pt-36">
        <Link
          href="/"
          className="body-6 inline-flex items-center gap-2 text-ink-soft transition-colors duration-300 ease-base hover:text-ink"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          Back to home
        </Link>

        <h1 className="heading-3 mt-10">{title}</h1>

        <div className="mt-10 card border border-line bg-surface-sunken p-6">
          <p className="body-5 text-ink">This page needs real copy.</p>
          <p className="body-6 mt-3 text-ink-soft">
            Legal text has to come from FoundLoom and cannot be drafted on your
            behalf. Replace the body of{" "}
            <code className="font-mono text-ink">app/{slug}/page.tsx</code> with
            your own{" "}
            <span className="placeholder-chip">{`{{${slug}_copy}}`}</span>{" "}
            before launch.
          </p>
        </div>
    </div>
  );
}
