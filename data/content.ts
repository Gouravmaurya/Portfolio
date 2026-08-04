import type { AtlasScene, CaseStudy, Experience, PracticeArea, SocialLink } from "@/types/content";

export const scenes: AtlasScene[] = [
  {
    id: "uncharted",
    index: "00",
    chapter: "Prologue",
    title: "Every useful system begins as uncharted territory.",
    copy: "A field of unanswered questions. A coordinate. A first deliberate line.",
    accent: "ink",
    layers: [{ id: "cartographer", src: "/atlas/cartographer-hero.webp", alt: "A faceless cartographer drawing a technical atlas at a drafting table", depth: 1 }],
  },
  {
    id: "coordinates",
    index: "01",
    chapter: "Coordinates",
    title: "I map complex ideas into useful intelligent products.",
    copy: "Full-stack AI engineer and creative developer working from interface to infrastructure.",
    accent: "indigo",
    layers: [{ id: "coordinates-plate", src: "/atlas/cartographer-hero.webp", alt: "The cartographer surrounded by coordinates and hand-drawn system maps", depth: 0.65 }],
  },
  {
    id: "haven",
    index: "02",
    chapter: "Territory",
    title: "Map the unknown before you decide.",
    copy: "Haven turns fragmented property context into a legible path from discovery to underwriting.",
    accent: "indigo",
    layers: [{ id: "haven-plate", src: "/atlas/haven-territory.webp", alt: "An ink-drawn property territory resolving into real-estate intelligence panels", depth: 1 }],
  },
  {
    id: "safar",
    index: "03",
    chapter: "Passage",
    title: "A journey becomes useful when every choice connects.",
    copy: "Safar joins traveller intent, destinations, routes and itineraries in one editable planning flow.",
    accent: "indigo",
    layers: [{ id: "safar-plate", src: "/atlas/safar-passage.webp", alt: "A cartographer following an indigo route through an illustrated travel atlas", depth: 1 }],
  },
];

export const projects: CaseStudy[] = [
  {
    slug: "haven",
    index: "02",
    title: "Haven AI",
    eyebrow: "Real-estate intelligence",
    year: "2026",
    status: "Concept Product",
    role: "Full-stack AI engineer",
    summary: "A real-estate intelligence workspace that turns fragmented property information into clearer investment decisions.",
    problem: "Property research is split across listings, assumptions and analysis tools. Haven explores how those inputs can become one coherent, inspectable product workflow.",
    workflow: ["Discover", "Underwrite", "Analyse", "Decide"],
    decisions: [
      { title: "Progressive density", body: "Primary decisions stay visible while financial and contextual detail arrives in deliberate layers." },
      { title: "Visible reasoning", body: "AI assistance is framed as one inspectable step in the workflow, never an unexplained answer." },
      { title: "Continuous context", body: "Discovery and underwriting share the same property context to reduce duplicated research." },
    ],
    stack: ["Next.js", "AI workflows", "Firebase", "Data visualisation"],
    image: "/atlas/haven-territory.webp",
    imageAlt: "Concept illustration of the Haven property intelligence system",
    disclosure: "Concept product. Illustrated system frames communicate product direction and are not production screenshots. No customer, usage or performance claims are presented.",
  },
  {
    slug: "safar",
    index: "03",
    title: "Safar AI",
    eyebrow: "AI travel planning",
    year: "2024",
    status: "Personal Project",
    role: "Product and engineering",
    summary: "An AI travel planner that connects preferences, destinations, practical trip details and an editable itinerary.",
    problem: "Trip planning usually means moving between inspiration, maps, accommodation and itinerary tools. Safar explores a more continuous journey shaped around traveller intent.",
    workflow: ["Preferences", "Destination", "Itinerary", "Journey"],
    decisions: [
      { title: "Intent first", body: "The experience begins with the traveller's constraints instead of a generic destination catalogue." },
      { title: "Route as structure", body: "Locations and itinerary details share one route so the plan remains spatially understandable." },
      { title: "Editable generation", body: "Generated suggestions are a starting point that stays under the traveller's control." },
    ],
    stack: ["React", "Firebase", "Gemini API", "Google Places"],
    image: "/atlas/safar-passage.webp",
    imageAlt: "Concept illustration of the Safar travel-planning journey",
    disclosure: "Personal project with a public live build. The atlas artwork is a conceptual visualisation rather than a literal product screenshot.",
    liveUrl: "https://www.safarai.in/",
  },
];

export const practiceAreas: PracticeArea[] = [
  { index: "I", title: "Interface", description: "Clear product surfaces that make complex workflows feel immediate and intentional.", tools: ["React", "Next.js", "TypeScript", "GSAP", "Accessibility"] },
  { index: "II", title: "Systems", description: "APIs, data and application logic designed as one maintainable product system.", tools: ["Node.js", "Firebase", "MongoDB", "REST APIs", "Docker"] },
  { index: "III", title: "Intelligence", description: "AI workflows shaped around human judgement, visible state and useful control.", tools: ["LLM workflows", "Agents", "Structured output", "Prompt systems"] },
];

export const experience: Experience[] = [
  { year: "2026", company: "Persist Ventures", role: "Full-stack AI engineer", description: "Building AI-enabled product experiences across interface, application logic and data." },
  { year: "2025", company: "Kite Info", role: "Software engineer", description: "Contributed to full-stack product delivery and maintainable web systems." },
  { year: "2024", company: "Independent", role: "Product builder", description: "Designed and developed Safar AI and independent interface experiments." },
];

export const socials: SocialLink[] = [
  { label: "Email", href: "mailto:gouravmaurya351@gmail.com" },
  { label: "GitHub", href: "https://github.com/Gouravmaurya" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/gourav-maurya-a39969226/" },
  { label: "Resume", href: "/Gourav-Maurya-Resume.pdf" },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
