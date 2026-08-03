export type MotionProfile = "full" | "reduced" | "static";
export type WebGLTier = "high" | "low" | "none";
export type AssetStatus = "verified" | "placeholder";

export interface MediaAsset {
  id: string;
  src?: string;
  alt: string;
  type: "image" | "video" | "diagram";
  status: AssetStatus;
  aspectRatio: "16:10" | "4:3" | "4:5" | "9:16" | "1:1";
  caption?: string;
  credit?: string;
}

export interface ProjectTheme {
  background: string;
  foreground: string;
  accent: string;
}

export interface Project {
  slug: "haven" | "safar";
  index: string;
  title: string;
  eyebrow: string;
  year: string;
  role: string;
  summary: string;
  stages: string[];
  stack: string[];
  theme: ProjectTheme;
  reelFrames: MediaAsset[];
}

export interface CaseStudy extends Project {
  problem: string;
  constraints: string[];
  decisions: { title: string; body: string }[];
  architecture: string[];
  outcome: string;
  nextProject: "haven" | "safar";
}

export interface Experience {
  year: string;
  company: string;
  role: string;
  description: string;
}

export interface PracticeArea {
  index: string;
  title: string;
  description: string;
  tools: string[];
}

export interface SocialLink {
  label: string;
  href: string;
}
