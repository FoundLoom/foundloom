import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { productsPage, routes } from "@/lib/content";
import Reveal from "./Reveal";

/**
 * Side-by-side comparison, as a real table: one <th scope="row"> per
 * criterion and one <th scope="col"> per product, so a screen reader
 * announces "Status today, AI Inventory, available now" rather than
 * reading loose cells.
 *
 * Every row here is answerable from confirmed facts. There is deliberately
 * no pricing row and no ratings row: neither product's pricing has been
 * confirmed, and inventing either would be worse than leaving the comparison
 * one row shorter.
 *
 * On narrow screens the table scrolls sideways inside a focusable region
 * rather than being duplicated as cards, which would put the same text on
 * the page twice.
 */
export default function ProductComparison() {
  const { comparison } = productsPage;
  const hrefs = [routes.pocketpair, routes.aiInventory];

  return (
    <section
      id="compare"
      className="scroll-mt-24 border-t border-line bg-surface-sunken px-4 py-20 md:py-24"
      aria-labelledby="compare-heading"
    >
      <div className="mx-auto max-w-[1320px]">
        <Reveal>
          <p className="eyebrow">
            {comparison.eyebrow}
          </p>
          <h2 id="compare-heading" className="heading-3 mt-6 max-w-[680px]">
            {comparison.heading}
          </h2>
          <p className="body-3 mt-6 max-w-[680px] text-ink-soft">
            {comparison.body}
          </p>

          {/* On a phone the second column sits off-screen, so say so rather
              than leaving people to discover the sideways scroll. */}
          <p className="caption-5 mt-6 inline-flex items-center gap-1 text-ink-faint md:hidden">
            Scroll the table sideways to see both products
            <ArrowRight size={12} weight="bold" aria-hidden="true" />
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <div
            role="region"
            aria-labelledby="compare-heading"
            tabIndex={0}
            className="mt-12 overflow-x-auto card-flat border border-line bg-card"
          >
            <table className="w-full min-w-[44rem] border-collapse text-left">
              <caption className="sr-only">
                PocketPair compared with AI Inventory across what each product
                does, when to use it, its current status, how to get access,
                and whether it depends on the other.
              </caption>
              <thead>
                <tr className="border-b border-line">
                  <th scope="col" className="caption-3 px-6 py-4 uppercase text-ink-faint">
                    <span className="sr-only">Criterion</span>
                  </th>
                  {comparison.columns.map((column) => (
                    <th
                      key={column}
                      scope="col"
                      className="title-1 px-6 py-4 text-ink"
                    >
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparison.rows.map((row) => (
                  <tr key={row.label} className="border-b border-line last:border-0">
                    <th
                      scope="row"
                      className="body-5 w-1/4 bg-surface-sunken px-6 py-4 align-top text-ink"
                    >
                      {row.label}
                    </th>
                    {row.values.map((value, i) => (
                      <td
                        key={`${row.label}-${comparison.columns[i]}`}
                        className="body-6 px-6 py-4 align-top text-ink-soft"
                      >
                        {value}
                      </td>
                    ))}
                  </tr>
                ))}
                <tr>
                  <th scope="row" className="body-5 bg-surface-sunken px-6 py-4 align-top text-ink">
                    Read more
                  </th>
                  {comparison.columns.map((column, i) => (
                    <td key={`more-${column}`} className="px-6 py-4 align-top">
                      <Link
                        href={hrefs[i]}
                        className="button-sm link-arrow group inline-flex items-center gap-2 text-accent"
                      >
                        {column}
                        <ArrowRight
                          size={16}
                          weight="bold"
                          className="transition-transform duration-500 ease-base group-hover:translate-x-1"
                          aria-hidden="true"
                        />
                      </Link>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </Reveal>

        <Reveal>
          <p className="caption-5 mt-6 text-ink-faint">
            Pricing is not listed because it has not been confirmed for either
            product. Ask us and you will get the real answer rather than a
            number invented for this table.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
