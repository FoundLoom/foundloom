import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Privacy policy — FoundLoom",
  description:
    "How FoundLoom handles personal data across its website, PocketPair and AI Inventory.",
  alternates: { canonical: "/privacy" },
  robots: { index: false, follow: true },
};

export default function Page() {
  return <LegalPage title="Privacy policy" slug="privacy" />;
}
