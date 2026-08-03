import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { ExperienceProvider } from "@/components/experience-provider";
import { SiteChrome } from "@/components/site-chrome";

export const metadata: Metadata = {
  metadataBase: new URL("https://gouravmaurya.vercel.app"),
  title: { default: "Gourav Maurya — Signal Observatory", template: "%s — Gourav Maurya" },
  description: "Full-stack AI engineer and creative developer turning scattered ideas into clear, intelligent product systems.",
  keywords: ["Gourav Maurya", "Full-Stack AI Engineer", "Creative Developer", "Next.js", "AI products"],
  openGraph: {
    title: "Gourav Maurya — Signal Observatory",
    description: "AI products engineered from interface to infrastructure.",
    type: "website",
    images: [{ url: "/og.png", width: 1728, height: 909, alt: "Gourav Maurya — Full-Stack AI Engineer" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gourav Maurya — Signal Observatory",
    description: "AI products engineered from interface to infrastructure.",
    images: ["/og.png"],
  },
};

export const viewport: Viewport = { themeColor: "#080b0d", colorScheme: "dark", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Gourav Maurya",
    jobTitle: "Full-Stack AI Engineer and Creative Developer",
    url: "https://gouravmaurya.vercel.app",
  };
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main">Skip to content</a>
        <ExperienceProvider><SiteChrome />{children}</ExperienceProvider>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
        <Analytics /><SpeedInsights />
      </body>
    </html>
  );
}
