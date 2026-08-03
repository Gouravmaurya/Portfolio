import Link from "next/link";
import type { CaseStudy } from "@/types/content";
import { MediaSlot } from "./media-slot";

export function EditorialProject({ project, layout }: { project: CaseStudy; layout: "precise" | "organic" }) {
  return <article className={`editorial-project project-${project.slug} ${layout}`} style={{ "--chapter-bg": project.theme.background, "--chapter-fg": project.theme.foreground, "--chapter-accent": project.theme.accent } as React.CSSProperties}>
    <div className="chapter-top"><span>PROJECT / {project.index}</span><span>{project.year}</span><span>{project.role}</span></div>
    <div className="chapter-title"><p>{project.eyebrow}</p><h3>{project.title}</h3></div>
    <div className="chapter-layout">
      <MediaSlot asset={project.reelFrames[0]} className="chapter-hero-media" />
      <MediaSlot asset={project.reelFrames[1]} className="chapter-detail detail-a" />
      <MediaSlot asset={project.reelFrames[2]} className="chapter-detail detail-b" />
      <p className="chapter-summary">{project.summary}</p>
      <ol className="chapter-stages">{project.stages.map((stage, index) => <li key={stage}><span>0{index + 1}</span>{stage}</li>)}</ol>
      <Link className="chapter-link" href={`/work/${project.slug}`}>VIEW CASE STUDY <span>↗</span></Link>
    </div>
  </article>;
}
