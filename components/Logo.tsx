import Image from "next/image";
import Link from "next/link";
import { routes } from "@/lib/content";

/* ---------------------------------------------------------------------------
 * DROP YOUR LOGO HERE
 *
 * Save the file to /public (an SVG is best; a PNG at 2x also works), then set
 * the constant below to its path:
 *
 *     const LOGO_SRC: string | null = "/logo.svg";
 *
 * It appears in the nav and the footer at the sizes below. Until it is set,
 * the styled wordmark is used, which is a perfectly valid fallback.
 *
 * The favicon is separate: replace /app/icon.svg with your mark.
 * ------------------------------------------------------------------------- */
const LOGO_SRC: string | null = null;
const LOGO_WIDTH = 132;
const LOGO_HEIGHT = 24;

export default function Logo({
  size = "sm",
  className,
}: {
  size?: "sm" | "lg";
  className?: string;
}) {
  const scale = size === "lg" ? 1.25 : 1;

  return (
    <Link
      href={routes.home}
      aria-label="FoundLoom, back to home"
      className={`inline-flex shrink-0 items-center transition-opacity duration-300 ease-base hover:opacity-80 ${className ?? ""}`}
    >
      {LOGO_SRC ? (
        <Image
          src={LOGO_SRC}
          alt="FoundLoom"
          width={Math.round(LOGO_WIDTH * scale)}
          height={Math.round(LOGO_HEIGHT * scale)}
          priority
        />
      ) : (
        <span
          className={`${size === "lg" ? "title-1" : "button-sm tracking-tight"} text-ink`}
        >
          Found<span>Loom</span>
        </span>
      )}
    </Link>
  );
}
