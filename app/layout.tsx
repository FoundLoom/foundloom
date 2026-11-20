import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Analytics from "@/components/Analytics";
import Footer from "@/components/Footer";
import FloatingDock from "@/components/FloatingDock";
import Nav from "@/components/Nav";
import SiteEffects from "@/components/SiteEffects";
import { site } from "@/lib/content";
import { jsonLd, organizationNode, websiteNode } from "@/lib/seo";
import "./globals.css";

/* Geist only. Geist Mono is restricted to numeric and data UI. */
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

/** Defaults. Each page overrides title, description, canonical and OG. */
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: "%s",
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  category: "technology",
  keywords: [
    "FoundLoom",
    "PocketPair",
    "AI Inventory",
    "QR code networking app",
    "event networking app",
    "conference contact manager",
    "save contacts by event",
    "meetup networking",
    "compare AI models",
    "AI model directory",
    "LLM comparison",
    "AI terminology explained",
    "AI newsletter",
  ],
  formatDetection: { email: false, address: false, telephone: false },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
  },
  /* Google Search Console ownership. Empty until the variable is set, in
     which case no tag is emitted at all. */
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : undefined,
};

export const viewport: Viewport = {
  themeColor: "#191919",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {/* Site-wide schema. Page-level nodes are emitted per route. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: jsonLd([organizationNode, websiteNode]),
          }}
        />
        <a href="#main" className="skip-link button-sm">
          Skip to content
        </a>
        <SiteEffects />
        <Nav />
        <FloatingDock />
        {/* Sections are rounded cards laid directly on the dark page. */}
        <main id="main">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
