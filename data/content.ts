import type { CaseStudy, Experience, MediaAsset, PracticeArea, SocialLink } from "@/types/content";

export const sharedMedia: Record<string, MediaAsset> = {
  havenHero: { id: "haven-hero", type: "image", status: "placeholder", aspectRatio: "16:10", alt: "Reserved media slot for the Haven AI product overview", caption: "PROJECT MEDIA / HAVEN / TO BE REPLACED" },
  havenDetailA: { id: "haven-detail-a", type: "image", status: "placeholder", aspectRatio: "4:3", alt: "Reserved media slot for a Haven AI product detail", caption: "DETAIL CAPTURE / 01" },
  havenDetailB: { id: "haven-detail-b", type: "image", status: "placeholder", aspectRatio: "4:3", alt: "Reserved media slot for a Haven AI product detail", caption: "DETAIL CAPTURE / 02" },
  havenDiagram: { id: "haven-diagram", type: "diagram", status: "placeholder", aspectRatio: "4:3", alt: "Reserved media slot for the Haven AI architecture diagram", caption: "ARCHITECTURE / TO BE REPLACED" },
  safarHero: { id: "safar-hero", type: "image", status: "placeholder", aspectRatio: "16:10", alt: "Reserved media slot for the Safar AI product overview", caption: "PROJECT MEDIA / SAFAR / TO BE REPLACED" },
  safarMobileA: { id: "safar-mobile-a", type: "image", status: "placeholder", aspectRatio: "9:16", alt: "Reserved portrait capture for Safar AI", caption: "MOBILE CAPTURE / 01" },
  safarMobileB: { id: "safar-mobile-b", type: "image", status: "placeholder", aspectRatio: "9:16", alt: "Reserved portrait capture for Safar AI", caption: "MOBILE CAPTURE / 02" },
  safarRoute: { id: "safar-route", type: "diagram", status: "placeholder", aspectRatio: "4:3", alt: "Reserved route and workflow visual for Safar AI", caption: "ROUTE WORKFLOW / TO BE REPLACED" },
  portrait: { id: "portrait", type: "image", status: "placeholder", aspectRatio: "4:5", alt: "Reserved portrait slot for Gourav Maurya", caption: "PORTRAIT / TO BE REPLACED" },
  code: { id: "code", type: "image", status: "placeholder", aspectRatio: "4:3", alt: "Reserved code detail", caption: "PROCESS DETAIL / CODE" },
};

export const projects: CaseStudy[] = [
  {
    slug: "haven", index: "01", title: "HAVEN AI", eyebrow: "REAL-ESTATE INTELLIGENCE", year: "2026", role: "FULL-STACK AI ENGINEER",
    summary: "A real-estate intelligence workspace designed to turn fragmented property information into clearer investment decisions.",
    stages: ["DISCOVER", "UNDERWRITE", "ANALYZE", "DECIDE"], stack: ["NEXT.JS", "AI WORKFLOWS", "FIREBASE", "DATA VISUALIZATION"],
    theme: { background: "#2145f5", foreground: "#f4f0e6", accent: "#ff684d" },
    reelFrames: [sharedMedia.havenHero, sharedMedia.havenDetailA, sharedMedia.havenDetailB, sharedMedia.havenDiagram],
    problem: "Property research is fragmented across listings, financial assumptions and analysis tools. Haven explores how those inputs can become a coherent product workflow.",
    constraints: ["Keep dense financial information understandable", "Separate evidence from generated analysis", "Support exploration without hiding system state"],
    decisions: [
      { title: "Progressive density", body: "The interface reveals detail in layers, keeping the primary decision visible before secondary data." },
      { title: "Visible reasoning", body: "AI-assisted analysis is positioned as one stage in the workflow rather than an unexplained answer." },
      { title: "System continuity", body: "Discovery and underwriting share the same property context to reduce repeated work." },
    ],
    architecture: ["PROPERTY SOURCES", "DISCOVERY LAYER", "UNDERWRITING LOGIC", "AI ANALYSIS", "WORKSPACE"],
    outcome: "An end-to-end product direction combining discovery, financial analysis and AI-assisted interpretation. No unverified performance or usage metrics are presented.", nextProject: "safar",
  },
  {
    slug: "safar", index: "02", title: "SAFAR AI", eyebrow: "AI TRAVEL PLANNING", year: "2024", role: "PRODUCT & ENGINEERING",
    summary: "An AI travel product that organizes preferences, destinations and trip details into a connected planning experience.",
    stages: ["PREFERENCES", "DESTINATION", "ITINERARY", "JOURNEY"], stack: ["REACT", "AI GENERATION", "MAPS", "TRAVEL DATA"],
    theme: { background: "#f4f0e6", foreground: "#171714", accent: "#ff684d" },
    reelFrames: [sharedMedia.safarHero, sharedMedia.safarMobileA, sharedMedia.safarMobileB, sharedMedia.safarRoute],
    problem: "Trip planning often requires switching between inspiration, maps, accommodation and itinerary tools. Safar explores a more continuous planning journey.",
    constraints: ["Keep generated plans editable", "Make route context easy to scan", "Balance inspiration with practical trip information"],
    decisions: [
      { title: "Intent first", body: "The journey begins with the traveller’s constraints rather than a generic destination catalogue." },
      { title: "Route as structure", body: "Locations and itinerary details share a visual route so the plan remains spatially understandable." },
      { title: "Editable generation", body: "Generated content is treated as a starting point that belongs to the traveller." },
    ],
    architecture: ["TRAVELLER INTENT", "TRIP CONTEXT", "ITINERARY ENGINE", "MAP & ROUTE", "TRAVEL WORKSPACE"],
    outcome: "A product direction demonstrating how AI-generated planning can sit inside a human, editable travel experience. No unverified usage claims are included.", nextProject: "haven",
  },
];

export const practiceAreas: PracticeArea[] = [
  { index: "01", title: "AI PRODUCT ENGINEERING", description: "Useful AI workflows shaped into understandable product experiences.", tools: ["Agents", "LLM workflows", "Structured output", "Prompt systems"] },
  { index: "02", title: "FULL-STACK SYSTEMS", description: "Interfaces, APIs and data designed as one maintainable product system.", tools: ["Next.js", "React", "Node.js", "Firebase", "MongoDB"] },
  { index: "03", title: "CREATIVE DEVELOPMENT", description: "Motion and interaction used to clarify ideas and give products character.", tools: ["GSAP", "Three.js", "WebGL", "Interaction design"] },
];

export const experience: Experience[] = [
  { year: "2026", company: "PERSIST VENTURES", role: "FULL-STACK AI ENGINEER", description: "Building AI-enabled product experiences across interface, application logic and data." },
  { year: "2025", company: "KITE INFO", role: "SOFTWARE ENGINEER", description: "Contributed to full-stack product delivery and maintainable web systems." },
  { year: "2024", company: "INDEPENDENT", role: "PRODUCT BUILDER", description: "Designed and developed Safar AI and independent interface experiments." },
];

export const socials: SocialLink[] = [
  { label: "EMAIL", href: "mailto:gouravmaurya351@gmail.com" },
  { label: "GITHUB", href: "https://github.com/Gouravmaurya" },
  { label: "LINKEDIN", href: "https://www.linkedin.com/in/gourav-maurya-a39969226/" },
  { label: "RÉSUMÉ", href: "/Gourav-Maurya-Resume.pdf" },
];

export function getProject(slug: string) { return projects.find((project) => project.slug === slug); }
