export type MotionProfile = "full" | "reduced" | "static";
export type CaseSlug = "haven" | "safar";

export interface SceneLayer {
  id: string;
  src: string;
  alt: string;
  depth: number;
  mobileSrc?: string;
}

export interface AtlasScene {
  id: string;
  index: string;
  chapter: string;
  title: string;
  copy: string;
  layers: SceneLayer[];
  accent?: "ink" | "indigo";
}

export interface CaseStudy {
  slug: CaseSlug;
  index: string;
  title: string;
  eyebrow: string;
  year: string;
  status: "Concept Product" | "Personal Project";
  role: string;
  summary: string;
  problem: string;
  workflow: string[];
  decisions: { title: string; body: string }[];
  stack: string[];
  image: string;
  imageAlt: string;
  disclosure: string;
  liveUrl?: string;
}

export interface PracticeArea {
  index: string;
  title: string;
  description: string;
  tools: string[];
}

export interface Experience {
  year: string;
  company: string;
  role: string;
  description: string;
}

export interface SocialLink {
  label: string;
  href: string;
}
