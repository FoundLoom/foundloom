import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Terms and conditions — FoundLoom",
  description:
    "The terms that apply to using the FoundLoom website, PocketPair and AI Inventory.",
  alternates: { canonical: "/terms" },
  robots: { index: false, follow: true },
};

export default function Page() {
  return <LegalPage title="Terms and conditions" slug="terms" />;
}
