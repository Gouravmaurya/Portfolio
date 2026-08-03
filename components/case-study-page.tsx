"use client";

import Link from "next/link";
import type { CaseStudy } from "@/types/content";
import { MediaSlot } from "./media-slot";

export function CaseStudyPage({ project }: { project: CaseStudy }) {
  return <main id="main" className={`editorial-case case-${project.slug}`} style={{ "--case-bg": project.theme.background, "--case-fg": project.theme.foreground, "--case-accent": project.theme.accent } as React.CSSProperties}>
    <section className="case-cover editorial-grid">
      <Link href="/#work" className="case-back">← SELECTED WORK</Link>
      <div className="case-cover-meta"><span>PROJECT / {project.index}</span><span>{project.year}</span><span>{project.role}</span></div>
      <p className="case-eyebrow">{project.eyebrow}</p><h1>{project.title}</h1>
      <p className="case-deck">{project.summary}</p>
      <MediaSlot asset={project.reelFrames[0]} className="case-cover-media" />
    </section>

    <section className="case-context editorial-grid">
      <p className="section-label">01 / CONTEXT</p><h2>THE PROBLEM<br /><em>BEHIND THE</em><br />PRODUCT.</h2><p className="context-copy">{project.problem}</p>
      <ol>{project.constraints.map((constraint, index) => <li key={constraint}><span>0{index + 1}</span>{constraint}</li>)}</ol>
    </section>

    <section className="case-gallery editorial-grid">
      <p className="section-label">02 / PRODUCT MEDIA</p>
      <MediaSlot asset={project.reelFrames[1]} className="gallery-a" />
      <MediaSlot asset={project.reelFrames[2]} className="gallery-b" />
      <MediaSlot asset={project.reelFrames[3]} className="gallery-c" />
    </section>

    <section className="case-system editorial-grid">
      <p className="section-label">03 / SYSTEM</p><h2>FROM INPUT<br />TO <em>OUTCOME.</em></h2>
      <div className="architecture-flow">{project.architecture.map((stage, index) => <div key={stage}><span>0{index + 1}</span><strong>{stage}</strong></div>)}</div>
    </section>

    <section className="case-decisions-new editorial-grid">
      <p className="section-label">04 / DECISIONS</p><h2>WHAT SHAPED<br /><em>THE BUILD.</em></h2>
      <div className="decision-list">{project.decisions.map((decision, index) => <article key={decision.title}><span>0{index + 1}</span><h3>{decision.title}</h3><p>{decision.body}</p></article>)}</div>
    </section>

    <section className="case-result editorial-grid"><p className="section-label">05 / RESULT</p><blockquote>{project.outcome}</blockquote></section>
    <Link className="case-next editorial-grid" href={`/work/${project.nextProject}`}><span>NEXT PROJECT</span><strong>{project.nextProject.toUpperCase()}</strong><i>↗</i></Link>
  </main>;
}
