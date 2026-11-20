import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Cookies — FoundLoom",
  description:
    "How the FoundLoom website uses cookies and similar technologies.",
  alternates: { canonical: "/cookies" },
  robots: { index: false, follow: true },
};

export default function Page() {
  return <LegalPage title="Cookies" slug="cookies" />;
}
