import { ArrowUp } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { footer } from "@/lib/content";
import MotionToggle from "./MotionToggle";

/**
 * Site footer. A dark slab in the same tone as the site's dark cards, closing
 * the page. The brand and one line about the company sit on the left, three
 * link groups on the right, and a utility bar beneath a hairline divider.
 * Lime marks the brand and interaction only. A footer is wayfinding, not a
 * second homepage.
 */
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="mx-auto max-w-[1560px] px-6 pt-14 md:px-10 md:pt-16">
        <div className="grid gap-12 md:grid-cols-[minmax(0,340px)_1fr] md:gap-16">
          <div className="max-w-[340px]">
            <Link
              href="/"
              aria-label="FoundLoom, back to home"
              className="footer-brand"
            >
              Found<span>Loom</span>
            </Link>
            <p className="body-6 mt-4 text-ink-soft">{footer.tagline}</p>
          </div>

          <div className="grid grid-cols-2 gap-x-10 gap-y-10 sm:grid-cols-3 md:gap-x-12">
            {footer.columns.map((column, i) => (
              <nav
                key={column.title}
                aria-label={column.title}
                /* Legal has three links, so on phones it takes the full row
                   rather than leaving a lone column beside the others. */
                className={i === footer.columns.length - 1 ? "col-span-2 sm:col-span-1" : undefined}
              >
                {/* A label, not a heading: the nav is already named for
                    assistive technology, and footer link groups should not
                    appear in the page's heading outline. */}
                <p className="footer-heading">{column.title}</p>
                <ul className="mt-5 flex flex-col gap-3">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link href={link.href} className="footer-link body-6">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-line py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="caption-5 text-ink-faint">
            © {year} FoundLoom. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <MotionToggle />
            <a href="#main" className="footer-top body-6">
              Back to top
              <ArrowUp size={14} weight="bold" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
