import type { Metadata } from "next";
import About from "@/components/About";
import FinalCta from "@/components/FinalCta";
import Hero from "@/components/Hero";
import ProductsOverview from "@/components/ProductsOverview";
import TaglineReveal from "@/components/TaglineReveal";
import { metadataFor } from "@/lib/seo";

export const metadata: Metadata = metadataFor("home");

/**
 * Home. A company overview, not a product pitch: it introduces FoundLoom,
 * presents both products as peers, says what the company is for, and sends
 * people onward. The depth for each product lives on its own route.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <ProductsOverview />
      <TaglineReveal />
      <About summary />
      <FinalCta />
    </>
  );
}
