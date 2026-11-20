import { ImageResponse } from "next/og";
import { hero } from "@/lib/content";

export const alt =
  "FoundLoom: PocketPair for event networking and AI Inventory for comparing AI models";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Social sharing card, shown when any page is shared. Company-level rather
 * than about one product, in the site's own black and lime.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#000000",
          padding: 80,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 34, fontWeight: 600 }}>
          <span style={{ color: "#f8f8f8" }}>Found</span>
          <span style={{ color: "#ddff46" }}>Loom</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 84,
              fontWeight: 700,
              letterSpacing: "-0.04em",
              lineHeight: 1.02,
              color: "#f8f8f8",
              display: "flex",
            }}
          >
            {hero.headingLineOne}
          </div>
          <div
            style={{
              fontSize: 84,
              fontWeight: 700,
              letterSpacing: "-0.04em",
              lineHeight: 1.02,
              color: "#ddff46",
              display: "flex",
            }}
          >
            {hero.headingLineTwo}
          </div>
        </div>

        <div style={{ display: "flex", gap: 16, fontSize: 26 }}>
          <div
            style={{
              display: "flex",
              border: "1px solid #414042",
              borderRadius: 12,
              padding: "10px 20px",
              color: "#d1d6d9",
            }}
          >
            PocketPair · Event networking
          </div>
          <div
            style={{
              display: "flex",
              border: "1px solid #414042",
              borderRadius: 12,
              padding: "10px 20px",
              color: "#d1d6d9",
            }}
          >
            AI Inventory · Compare AI models
          </div>
        </div>
      </div>
    ),
    size,
  );
}
