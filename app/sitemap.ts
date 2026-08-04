import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: "https://gouravmaurya.vercel.app", priority: 1, changeFrequency: "monthly" }];
}
