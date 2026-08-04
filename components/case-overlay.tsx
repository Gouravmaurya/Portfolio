"use client";

import { useEffect, useRef } from "react";
import { getProject } from "@/data/content";
import type { CaseSlug } from "@/types/content";

type OverlayKey = CaseSlug | "colophon";

export function CaseOverlay({ active, onClose }: { active: OverlayKey | null; onClose: () => void }) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!active) return;
    const previous = document.activeElement as HTMLElement | null;
    const shell = Array.from(document.querySelectorAll<HTMLElement>("[data-page-shell]"));
    shell.forEach((element) => { element.inert = true; element.setAttribute("aria-hidden", "true"); });
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const timer = window.setTimeout(() => closeRef.current?.focus(), 30);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") { event.preventDefault(); onClose(); return; }
      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>("button, a[href], [tabindex]:not([tabindex='-1'])")).filter((node) => !node.hasAttribute("disabled"));
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      shell.forEach((element) => { element.inert = false; element.removeAttribute("aria-hidden"); });
      previous?.focus();
    };
  }, [active, onClose]);

  if (!active) return null;
  const project = active === "colophon" ? undefined : getProject(active);

  return <div className="case-overlay" role="dialog" aria-modal="true" aria-labelledby="overlay-title" onMouseDown={(event) => { if (event.currentTarget === event.target) onClose(); }}>
    <div className="case-sheet" ref={dialogRef}>
      <header className="case-sheet-header">
        <span>{project ? `FIELD FILE / ${project.index}` : "ATLAS / COLOPHON"}</span>
        <button ref={closeRef} type="button" onClick={onClose}>Close <i aria-hidden="true">×</i></button>
      </header>
      {project ? <ProjectCase project={project} /> : <Colophon />}
    </div>
  </div>;
}

function ProjectCase({ project }: { project: NonNullable<ReturnType<typeof getProject>> }) {
  return <article className="case-content">
    <div className="case-lede">
      <p className="atlas-label">{project.status} / {project.year}</p>
      <h2 id="overlay-title">{project.title}</h2>
      <p className="case-summary">{project.summary}</p>
      <div className="case-meta"><span>{project.eyebrow}</span><span>{project.role}</span></div>
    </div>
    <figure className="case-visual">
      <img src={project.image} alt={project.imageAlt} />
      <figcaption>Concept visualisation / Original atlas artwork</figcaption>
    </figure>
    <section className="case-problem">
      <p className="atlas-label">01 / Context</p>
      <h3>The problem behind the product.</h3>
      <p>{project.problem}</p>
    </section>
    <section className="case-flow">
      <p className="atlas-label">02 / Product route</p>
      <ol>{project.workflow.map((step, index) => <li key={step}><span>0{index + 1}</span><strong>{step}</strong></li>)}</ol>
    </section>
    <section className="case-decisions">
      <p className="atlas-label">03 / Decisions</p>
      <div>{project.decisions.map((decision, index) => <article key={decision.title}><span>0{index + 1}</span><h3>{decision.title}</h3><p>{decision.body}</p></article>)}</div>
    </section>
    <section className="case-stack">
      <p className="atlas-label">04 / Instruments</p>
      <ul>{project.stack.map((item) => <li key={item}>{item}</li>)}</ul>
    </section>
    <aside className="case-disclosure"><strong>Field note</strong><p>{project.disclosure}</p></aside>
    {project.liveUrl && <a className="case-live" href={project.liveUrl} target="_blank" rel="noreferrer">Visit live project <span aria-hidden="true">↗</span></a>}
  </article>;
}

function Colophon() {
  return <article className="colophon-content">
    <p className="atlas-label">Built as a one-page field atlas / 2026</p>
    <h2 id="overlay-title">Behind the map.</h2>
    <div className="colophon-grid">
      <section><span>01</span><h3>Concept</h3><p>A faceless cartographer maps uncertain ideas into interfaces, systems and intelligent products.</p></section>
      <section><span>02</span><h3>Technology</h3><p>Next.js, TypeScript, GSAP, Lenis, Canvas 2D and semantic HTML. No 3D or WebGL models.</p></section>
      <section><span>03</span><h3>Motion</h3><p>Native scrolling drives restrained parallax and route drawing. Reduced-motion and touch profiles remain first-class.</p></section>
      <section><span>04</span><h3>Artwork</h3><p>Original generated ink illustrations are disclosed as conceptual. Interface and mapping details are composed in code.</p></section>
    </div>
  </article>;
}
