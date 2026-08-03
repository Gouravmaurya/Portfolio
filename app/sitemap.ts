import type { MetadataRoute } from "next";
import { projects } from "@/data/content";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap { const base = "https://gouravmaurya.vercel.app"; return [{ url: base, priority: 1 }, { url: `${base}/colophon`, priority: .4 }, ...projects.map((project) => ({ url: `${base}/work/${project.slug}`, priority: .8 }))]; }
