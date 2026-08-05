import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { ExperienceProvider } from "@/components/experience-provider";
import { SiteChrome } from "@/components/site-chrome";

const newsreader = localFont({
  src: [
    { path: "./fonts/Newsreader-Variable.ttf", style: "normal", weight: "200 800" },
    { path: "./fonts/Newsreader-Italic-Variable.ttf", style: "italic", weight: "200 800" },
  ],
  variable: "--font-editorial",
  display: "swap",
});
const manrope = localFont({ src: "./fonts/Manrope-Variable.ttf", variable: "--font-sans", weight: "200 800", display: "swap" });
const plexMono = localFont({
  src: [
    { path: "./fonts/IBMPlexMono-Regular.ttf", weight: "400" },
    { path: "./fonts/IBMPlexMono-Medium.ttf", weight: "500" },
  ],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://gouravmaurya.vercel.app"),
  title: { default: "Gourav Maurya — The Atlas of Useful Intelligence", template: "%s — Gourav Maurya" },
  description: "A cinematic one-page portfolio by Gourav Maurya, a full-stack AI engineer mapping complex ideas into useful intelligent products.",
  keywords: ["Gourav Maurya", "Full-Stack AI Engineer", "Creative Developer", "Next.js", "AI products", "Portfolio"],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Gourav Maurya — The Atlas of Useful Intelligence",
    description: "Full-stack AI engineer and creative developer mapping complex ideas into useful intelligent products.",
    type: "website",
    url: "/",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Gourav Maurya — The Atlas of Useful Intelligence" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gourav Maurya — The Atlas of Useful Intelligence",
    description: "Full-stack AI engineer and creative developer mapping complex ideas into useful intelligent products.",
    images: ["/og.png"],
  },
};

export const viewport: Viewport = { themeColor: "#f2eee4", colorScheme: "light", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Gourav Maurya",
    jobTitle: "Full-Stack AI Engineer and Creative Developer",
    url: "https://gouravmaurya.vercel.app",
    sameAs: ["https://github.com/Gouravmaurya", "https://www.linkedin.com/in/gourav-maurya-a39969226/"],
  };
  return <html lang="en">
    <body className={`${newsreader.variable} ${manrope.variable} ${plexMono.variable}`}>
      <a className="skip-link" href="#main">Skip to content</a>
      <ExperienceProvider><SiteChrome />{children}</ExperienceProvider>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <Analytics /><SpeedInsights />
    </body>
  </html>;
}
