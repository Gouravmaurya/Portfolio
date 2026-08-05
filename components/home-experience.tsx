"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { experience, practiceAreas, projects, scenes, socials } from "@/data/content";
import type { CaseSlug } from "@/types/content";
import { useExperience } from "./experience-provider";
import { RouteCanvas } from "./route-canvas";
import { CaseOverlay } from "./case-overlay";

type OverlayKey = CaseSlug | "colophon";

function readCase(): OverlayKey | null {
  if (typeof window === "undefined") return null;
  const value = new URLSearchParams(window.location.search).get("case");
  return value === "haven" || value === "safar" || value === "colophon" ? value : null;
}

export function HomeExperience() {
  const root = useRef<HTMLElement>(null);
  const [activeCase, setActiveCase] = useState<OverlayKey | null>(null);
  const { motion } = useExperience();

  useEffect(() => {
    setActiveCase(readCase());
    const onPopState = () => setActiveCase(readCase());
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const openCase = useCallback((slug: OverlayKey) => {
    const url = new URL(window.location.href);
    url.searchParams.set("case", slug);
    window.history.pushState({ atlasOverlay: true }, "", `${url.pathname}${url.search}${url.hash}`);
    setActiveCase(slug);
  }, []);

  const closeCase = useCallback(() => {
    if (window.history.state?.atlasOverlay) {
      window.history.back();
      return;
    }
    const url = new URL(window.location.href);
    url.searchParams.delete("case");
    window.history.replaceState({}, "", `${url.pathname}${url.search}${url.hash}`);
    setActiveCase(null);
  }, []);

  useEffect(() => {
    if (motion === "static" || !root.current) return;
    gsap.registerPlugin(ScrollTrigger);
      const context = gsap.context(() => {
        gsap.from(".atlas-hero-line > span", { yPercent: 112, rotate: 1.5, duration: 1.15, stagger: 0.09, ease: "power4.out" });
        gsap.from(".hero-coordinate, .hero-foot", { opacity: 0, y: 16, duration: 0.75, stagger: 0.12, delay: 0.65 });

        const beats = gsap.utils.toArray<HTMLElement>(".prologue-beat");
        if (beats.length === 4) {
          gsap.set(beats, { autoAlpha: 0, y: 30 });
          const prologue = gsap.timeline({ scrollTrigger: { trigger: ".scroll-prologue", start: "top top", end: "bottom bottom", scrub: motion === "reduced" ? 0.2 : 0.85 } });
          prologue
            .to(".hero-title", { yPercent: -42, autoAlpha: 0, duration: 0.18, ease: "power2.in" }, 0)
            .to(".prologue-base", { scale: 1.12, autoAlpha: 0.12, filter: "blur(2px)", duration: 0.9, ease: "none" }, 0)
            .fromTo(".layer-table", { autoAlpha: 0, xPercent: -28, yPercent: 42, rotate: -8, scale: 0.74 }, { autoAlpha: 1, xPercent: 0, yPercent: 0, rotate: 0, scale: 1, duration: 0.22, ease: "power2.out" }, 0.08)
            .to(beats[0], { autoAlpha: 1, y: 0, duration: 0.08 }, 0.12)
            .to(beats[0], { autoAlpha: 0, y: -24, duration: 0.07 }, 0.23)
            .to(beats[1], { autoAlpha: 1, y: 0, duration: 0.08 }, 0.27)
            .fromTo(".layer-cartographer", { autoAlpha: 0, xPercent: 36, yPercent: 16, rotate: 4, scale: 0.86 }, { autoAlpha: 1, xPercent: 0, yPercent: 0, rotate: 0, scale: 1, duration: 0.22, ease: "power2.out" }, 0.29)
            .to(".layer-table", { xPercent: -18, yPercent: 8, rotate: -2, scale: 0.94, duration: 0.18 }, 0.36)
            .to(beats[1], { autoAlpha: 0, y: -24, duration: 0.07 }, 0.42)
            .to(beats[2], { autoAlpha: 1, y: 0, duration: 0.08 }, 0.46)
            .fromTo(".layer-instruments", { autoAlpha: 0, xPercent: -42, yPercent: -18, rotate: -18, scale: 0.72 }, { autoAlpha: 1, xPercent: 0, yPercent: 0, rotate: 0, scale: 1, duration: 0.22, ease: "power2.out" }, 0.5)
            .to(".layer-cartographer", { xPercent: 12, yPercent: 3, rotate: 1.5, duration: 0.18 }, 0.56)
            .to(beats[2], { autoAlpha: 0, y: -24, duration: 0.07 }, 0.63)
            .to(beats[3], { autoAlpha: 1, y: 0, duration: 0.08 }, 0.68)
            .to(".layer-table", { xPercent: -6, yPercent: 0, rotate: 0, scale: 1, duration: 0.24 }, 0.72)
            .to(".layer-cartographer", { xPercent: 0, yPercent: 0, rotate: 0, duration: 0.24 }, 0.72)
            .to(".layer-instruments", { xPercent: 8, yPercent: 8, rotate: 8, scale: 0.88, duration: 0.24 }, 0.72)
            .to(".prologue-meter span", { scaleY: 1, duration: 1, ease: "none" }, 0);
        }

        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
          gsap.from(element, { y: motion === "reduced" ? 22 : 55, opacity: 0, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: element, start: "top 88%", once: true } });
        });

        gsap.utils.toArray<HTMLElement>("[data-atlas-scene]").forEach((scene) => {
          const plate = scene.querySelector<HTMLElement>(".chapter-plate");
          const caption = scene.querySelector<HTMLElement>(".chapter-caption");
          if (plate) gsap.fromTo(plate, { yPercent: motion === "reduced" ? 0 : -3, scale: 1.055 }, { yPercent: motion === "reduced" ? 0 : 3, scale: 1, ease: "none", scrollTrigger: { trigger: scene, start: "top bottom", end: "bottom top", scrub: motion === "reduced" ? false : 0.8 } });
          if (caption) gsap.from(caption, { clipPath: "inset(0 100% 0 0)", scrollTrigger: { trigger: scene, start: "top 62%", end: "top 34%", scrub: motion === "reduced" ? false : 0.55 } });
        });

        gsap.to(".coordinate-compass", { rotate: 110, ease: "none", scrollTrigger: { trigger: "#coordinates", start: "top bottom", end: "bottom top", scrub: 1 } });
        gsap.to(".field-line", { scaleX: 1, transformOrigin: "left", ease: "none", scrollTrigger: { trigger: "#field-notes", start: "top 75%", end: "bottom 75%", scrub: 0.7 } });
    }, root);

    // Images and variable fonts can change the long scroll scene's geometry
    // after hydration. Refresh once the first frame has painted so the pinned
    // timeline always receives valid start/end measurements.
    const refreshFrame = window.requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => {
      window.cancelAnimationFrame(refreshFrame);
      context.revert();
    };
  }, [motion]);

  const haven = scenes.find((scene) => scene.id === "haven")!;
  const safar = scenes.find((scene) => scene.id === "safar")!;

  return <>
    <main id="main" ref={root} className="atlas-main" data-page-shell>
      <RouteCanvas />

      <section className="scroll-prologue" id="top" aria-labelledby="atlas-title" data-scroll-story>
        <div className="prologue-sticky atlas-grid">
          <img className="prologue-base" src="/atlas/cartographer-hero.webp" alt="A faceless cartographer beginning a hand-drawn atlas at a drafting table" fetchPriority="high" />
          <div className="prologue-wash" aria-hidden="true" />
          <img className="prologue-cutout layer-table" src="/atlas/layers/drafting-table-cutout.webp" alt="" aria-hidden="true" />
          <img className="prologue-cutout layer-cartographer" src="/atlas/layers/cartographer-cutout.webp" alt="" aria-hidden="true" />
          <img className="prologue-cutout layer-instruments" src="/atlas/layers/instruments-cutout.webp" alt="" aria-hidden="true" />
          <p className="hero-coordinate">28.6139° N<br />77.2090° E</p>
          <div className="hero-title" id="atlas-title">
            <p className="atlas-label">Gourav Maurya / Portfolio 2026</p>
            <h1><span className="atlas-hero-line"><span>The atlas of</span></span><span className="atlas-hero-line italic"><span>useful</span></span><span className="atlas-hero-line"><span>intelligence</span></span></h1>
          </div>
          <div className="prologue-story" aria-label="How I build products">
            <article className="prologue-beat"><span>00 / Uncharted</span><h2>Every useful system begins as uncertain territory.</h2><p>Scroll to separate the map into the disciplines behind my work.</p></article>
            <article className="prologue-beat"><span>01 / Interface</span><h2>I make complex inputs feel immediate.</h2><p>Clear product surfaces, purposeful interaction and frontend engineering reveal the next decision.</p></article>
            <article className="prologue-beat"><span>02 / Systems</span><h2>I connect every visible choice to a dependable system.</h2><p>Application logic, APIs and data move together as one maintainable product route.</p></article>
            <article className="prologue-beat"><span>03 / Intelligence</span><h2>I shape AI around human judgement.</h2><p>Visible state, structured workflows and useful control turn model capability into a product people can trust.</p></article>
          </div>
          <div className="prologue-meter" aria-hidden="true"><span /></div>
          <div className="hero-foot">
            <p>Full-stack AI engineer<br />Creative developer</p>
            <a href="#coordinates">Enter the atlas <span aria-hidden="true">↓</span></a>
          </div>
        </div>
      </section>

      <section className="coordinates-section atlas-grid" id="coordinates">
        <div className="coordinate-index"><span>01</span><p>Coordinates<br />India / Available worldwide</p></div>
        <div className="coordinate-compass" aria-hidden="true"><i /><i /><i /><span>N</span></div>
        <div className="coordinate-statement">
          <p className="atlas-label" data-reveal>Position / Full-stack AI engineer</p>
          <h2 data-reveal>I map complex ideas into <em>useful intelligent products.</em></h2>
          <p data-reveal>Working from interface to infrastructure, I turn uncertain requirements into systems people can understand, inspect and use.</p>
        </div>
        <aside className="coordinate-note" data-reveal><span>Field principle / 001</span><p>Clarity is not decoration. It is part of the engineering.</p></aside>
      </section>

      <section className="work-marker atlas-grid" id="territory">
        <p className="atlas-label">Selected territories / 02–03</p>
        <h2 data-reveal>Two products.<br />Two kinds of <em>orientation.</em></h2>
      </section>

      <ProjectChapter scene={haven} onOpen={() => openCase("haven")} meta="Concept Product / 2026" />
      <ProjectChapter scene={safar} onOpen={() => openCase("safar")} meta="Personal Project / 2024" reverse />

      <section className="practice-section atlas-grid" id="instruments">
        <div className="practice-heading">
          <p className="atlas-label">04 / Instruments</p>
          <h2 data-reveal>One practice.<br /><em>Three instruments.</em></h2>
          <p data-reveal>Designing the surface, building the system and shaping the intelligence as one connected product.</p>
        </div>
        <div className="instrument-list">
          {practiceAreas.map((area) => <article key={area.index} data-reveal>
            <span>{area.index}</span><h3>{area.title}</h3><p>{area.description}</p>
            <ul>{area.tools.map((tool) => <li key={tool}>{tool}</li>)}</ul>
          </article>)}
        </div>
      </section>

      <section className="field-section atlas-grid" id="field-notes">
        <div className="field-heading">
          <p className="atlas-label">05 / Field notes</p>
          <h2 data-reveal>Experience leaves<br /><em>a legible trail.</em></h2>
        </div>
        <div className="field-timeline">
          <i className="field-line" aria-hidden="true" />
          {experience.map((item) => <article key={item.company} data-reveal>
            <span>{item.year}</span><div><h3>{item.company}</h3><em>{item.role}</em><p>{item.description}</p></div>
          </article>)}
        </div>
        <aside className="field-profile" data-reveal>
          <span>Education / 2021–2025</span><strong>B.Tech, Computer Science & Engineering</strong><p>International Institute of Technology and Management, Sonipat.</p>
        </aside>
      </section>

      <footer className="contact-section atlas-grid" id="open-route">
        <p className="atlas-label">06 / Open route</p>
        <h2 data-reveal>Have a problem<br />worth <em>mapping?</em></h2>
        <p className="contact-copy" data-reveal>I’m available for selected product engineering, AI and creative development work.</p>
        <a className="contact-email" href="mailto:gouravmaurya351@gmail.com">gouravmaurya351@gmail.com <span aria-hidden="true">↗</span></a>
        <div className="contact-base">
          <span>Gourav Maurya © 2026</span>
          <nav aria-label="Social links">{socials.map((link) => <a key={link.label} href={link.href} target={link.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">{link.label}</a>)}</nav>
          <button type="button" onClick={() => openCase("colophon")}>Colophon</button>
          <a href="#top">Back to north ↑</a>
        </div>
      </footer>
    </main>
    <CaseOverlay active={activeCase} onClose={closeCase} />
  </>;
}

function ProjectChapter({ scene, onOpen, meta, reverse = false }: { scene: (typeof scenes)[number]; onOpen: () => void; meta: string; reverse?: boolean }) {
  const project = projects.find((item) => item.slug === scene.id)!;
  return <section className={`story-chapter ${reverse ? "reverse" : ""}`} id={`${scene.id}-chapter`} data-atlas-scene>
    <div className="chapter-sticky atlas-grid">
      <div className="chapter-visual">
        <img className="chapter-plate" src={scene.layers[0].src} alt={scene.layers[0].alt} loading="lazy" />
        <div className="chapter-map-ui" aria-hidden="true"><i /><i /><span>{scene.index}</span></div>
        <p className="chapter-caption">Original atlas artwork / Concept visualisation</p>
      </div>
      <div className="chapter-copy">
        <p className="atlas-label">{scene.index} / {scene.chapter}</p>
        <span className="chapter-meta">{meta}</span>
        <h2>{scene.title}</h2>
        <p>{scene.copy}</p>
        <ol>{project.workflow.map((step, index) => <li key={step}><span>0{index + 1}</span>{step}</li>)}</ol>
        <button type="button" onClick={onOpen}>Open field file <span aria-hidden="true">↗</span></button>
      </div>
    </div>
  </section>;
}
