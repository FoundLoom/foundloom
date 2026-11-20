import Link from "next/link";
import { CaretRight } from "@phosphor-icons/react/dist/ssr";

/**
 * Breadcrumb trail. Gives every sub-page a visible way back, which a site
 * with real routes needs and a single-page site does not.
 *
 * The matching BreadcrumbList schema is emitted by each page, so Google can
 * show the trail under the result instead of a raw URL.
 */
export default function Breadcrumbs({
  trail,
}: {
  trail: Array<{ name: string; path: string }>;
}) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1">
        {trail.map((step, i) => {
          const last = i === trail.length - 1;
          return (
            <li key={step.path} className="flex items-center gap-1">
              {last ? (
                <span className="caption-4 text-ink-soft" aria-current="page">
                  {step.name}
                </span>
              ) : (
                <>
                  <Link
                    href={step.path}
                    className="caption-4 rounded-md px-1 py-0.5 text-ink-faint transition-colors duration-300 ease-base hover:text-ink"
                  >
                    {step.name}
                  </Link>
                  <CaretRight
                    size={12}
                    className="text-ink-faint"
                    aria-hidden="true"
                  />
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
