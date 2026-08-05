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
      gsap.from(".atlas-hero-line > span", {
        yPercent: 112,
        rotate: 1.5,
        duration: 1.15,
        stagger: 0.09,
        ease: "power4.out",
      });
      gsap.from(".hero-coordinate, .hero-foot", {
        opacity: 0,
        y: 16,
        duration: 0.75,
        stagger: 0.12,
        delay: 0.65,
      });

      const morphScenes = gsap.utils.toArray<HTMLElement>(".morph-scene");
      const morphCopies = gsap.utils.toArray<HTMLElement>(".morph-copy");
      const phaseItems = gsap.utils.toArray<HTMLElement>(".morph-phase");

      if (morphScenes.length === 4 && morphCopies.length === 4 && phaseItems.length === 4) {
        const fullMask = "polygon(0% 0%, 50% 0%, 100% 0%, 100% 50%, 100% 100%, 50% 100%, 0% 100%, 0% 50%)";
        const focalMasks = [
          "polygon(68% 47%, 73% 48%, 76% 52%, 75% 57%, 71% 61%, 66% 59%, 64% 54%, 65% 50%)",
          "polygon(56% 49%, 61% 48%, 65% 51%, 66% 55%, 62% 60%, 57% 61%, 54% 57%, 53% 53%)",
          "polygon(57% 43%, 62% 42%, 66% 45%, 67% 50%, 63% 54%, 58% 55%, 55% 51%, 54% 47%)",
        ];

        gsap.set(morphScenes.slice(1), { autoAlpha: 1 });
        morphScenes.slice(1).forEach((scene, index) => gsap.set(scene, { clipPath: focalMasks[index] }));
        gsap.set(morphScenes.slice(1).map((scene) => scene.querySelector("img")), {
          filter: "blur(14px)",
          opacity: 0.3,
          scale: 1.075,
        });
        gsap.set(morphCopies.slice(1), { autoAlpha: 0, y: 34 });
        gsap.set(phaseItems.slice(1), { opacity: 0.34 });
        gsap.set(".morph-pulse", { autoAlpha: 0, scale: 0.45 });

        const morphTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: ".scroll-prologue",
            start: "top top",
            end: "bottom bottom",
            scrub: motion === "reduced" ? 0.2 : 0.8,
          },
        });

        morphTimeline.to(morphScenes[0].querySelector("img"), { scale: 1.045, duration: 0.22, ease: "none" }, 0);

        [1, 2, 3].forEach((nextIndex, transitionIndex) => {
          const at = 0.14 + transitionIndex * 0.25;
          const previousIndex = nextIndex - 1;
          morphTimeline
            .to(morphCopies[previousIndex], { autoAlpha: 0, y: -32, duration: 0.07 }, at)
            .to(phaseItems[previousIndex], { opacity: 0.34, duration: 0.05 }, at)
            .to(morphScenes[previousIndex].querySelector("img"), {
              filter: "blur(9px)", opacity: 0.2, scale: 1.065, duration: 0.18, ease: "power1.inOut",
            }, at)
            .to(morphScenes[nextIndex], { clipPath: fullMask, duration: 0.18, ease: "power1.inOut" }, at)
            .to(morphScenes[nextIndex].querySelector("img"), {
              filter: "blur(0px)", opacity: 1, scale: 1, duration: 0.18, ease: "power1.inOut",
            }, at)
            .set(".morph-pulse", { scale: 0.45 }, at)
            .to(".morph-pulse", { autoAlpha: 0.5, scale: 1, duration: 0.07 }, at)
            .to(".morph-pulse", { autoAlpha: 0, scale: 1.75, duration: 0.11 }, at + 0.07)
            .to(morphCopies[nextIndex], { autoAlpha: 1, y: 0, duration: 0.08 }, at + 0.09)
            .to(phaseItems[nextIndex], { opacity: 1, duration: 0.06 }, at + 0.07);
        });

        morphTimeline.to(".prologue-meter span", { scaleY: 1, duration: 1, ease: "none" }, 0);
      }

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
        gsap.from(element, {
          y: motion === "reduced" ? 20 : 54,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: element, start: "top 88%", once: true },
        });
      });

      gsap.to(".coordinate-compass", {
        rotate: 150,
        scale: 1.08,
        ease: "none",
        scrollTrigger: { trigger: "#coordinates", start: "top bottom", end: "bottom top", scrub: 1 },
      });

      if (motion === "full") {
        const track = document.querySelector<HTMLElement>(".work-track");
        if (track) {
          gsap.to(track, {
            x: () => -(track.scrollWidth - window.innerWidth),
            ease: "none",
            scrollTrigger: {
              trigger: ".work-expedition",
              start: "top top",
              end: "bottom bottom",
              scrub: 0.85,
              invalidateOnRefresh: true,
            },
          });
          gsap.to(".work-progress span", {
            scaleX: 1,
            ease: "none",
            scrollTrigger: { trigger: ".work-expedition", start: "top top", end: "bottom bottom", scrub: 0.5 },
          });
          const projectPanels = gsap.utils.toArray<HTMLElement>(".project-panel");
          const depthTimeline = gsap.timeline({
            scrollTrigger: { trigger: ".work-expedition", start: "top top", end: "bottom bottom", scrub: 0.9 },
          });
          projectPanels.forEach((panel, index) => {
            const image = panel.querySelector<HTMLElement>(".project-panel-image img");
            const orbit = panel.querySelector<HTMLElement>(".project-orbit");
            const arrive = 0.18 + index * 0.34;
            depthTimeline
              .fromTo(panel, { rotateY: 7, rotateZ: index ? 1.1 : -1.1, scale: 0.91 }, { rotateY: 0, rotateZ: 0, scale: 1, duration: 0.18, ease: "power1.out" }, arrive)
              .to(panel, { rotateY: -5, rotateZ: index ? -0.7 : 0.7, scale: 0.955, duration: 0.16, ease: "power1.in" }, arrive + 0.2);
            if (image) gsap.fromTo(image, { scale: 1.12, xPercent: index % 2 ? -4 : 4 }, { scale: 1.02, xPercent: index % 2 ? 3 : -3, ease: "none", scrollTrigger: { trigger: ".work-expedition", start: "top top", end: "bottom bottom", scrub: 1 } });
            if (orbit) gsap.to(orbit, { rotate: index % 2 ? -180 : 180, ease: "none", scrollTrigger: { trigger: ".work-expedition", start: "top top", end: "bottom bottom", scrub: 1.2 } });
          });
        }
      }

      gsap.utils.toArray<HTMLElement>(".instrument-card").forEach((card, index) => {
        if (motion !== "full") return;
        gsap.fromTo(card, { yPercent: index === 1 ? 9 : 17 }, {
          yPercent: index === 1 ? -7 : -13,
          ease: "none",
          scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: 0.9 },
        });
      });

      gsap.utils.toArray<HTMLElement>(".field-entry").forEach((entry, index) => {
        gsap.from(entry, {
          x: motion === "reduced" ? 18 : index % 2 ? 100 : -100,
          opacity: 0,
          rotate: motion === "reduced" ? 0 : index % 2 ? 1.5 : -1.5,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: entry, start: "top 84%", once: true },
        });
      });
      gsap.to(".field-line", {
        scaleY: 1,
        transformOrigin: "top",
        ease: "none",
        scrollTrigger: { trigger: "#field-notes", start: "top 70%", end: "bottom 75%", scrub: 0.7 },
      });
    }, root);

    const refreshFrame = window.requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => {
      window.cancelAnimationFrame(refreshFrame);
      context.revert();
    };
  }, [motion]);

  return <>
    <main id="main" ref={root} className="atlas-main" data-page-shell>
      <RouteCanvas />

      <section className="scroll-prologue" id="top" aria-labelledby="atlas-title" data-scroll-story>
        <div className="prologue-sticky atlas-grid">
          <figure className="morph-scene morph-scene-self">
            <img src="/atlas/cartographer-hero.webp" alt="A faceless cartographer beginning a hand-drawn atlas at a drafting table" fetchPriority="high" />
          </figure>
          <figure className="morph-scene morph-scene-projects" aria-hidden="true"><img src="/atlas/projects-morph-v2.webp" alt="" /></figure>
          <figure className="morph-scene morph-scene-skills" aria-hidden="true"><img src="/atlas/skills-morph-v2.webp" alt="" /></figure>
          <figure className="morph-scene morph-scene-experience" aria-hidden="true"><img src="/atlas/experience-morph-v2.webp" alt="" /></figure>
          <div className="morph-wash" aria-hidden="true" />
          <div className="morph-pulse" aria-hidden="true"><i /><i /><i /></div>
          <p className="hero-coordinate">28.6139° N<br />77.2090° E</p>
          <div className="hero-title morph-copy" id="atlas-title">
            <p className="atlas-label">Gourav Maurya / Portfolio 2026</p>
            <h1><span className="atlas-hero-line"><span>The atlas of</span></span><span className="atlas-hero-line italic"><span>useful</span></span><span className="atlas-hero-line"><span>intelligence</span></span></h1>
            <p className="morph-summary">Full-stack AI engineer and creative developer mapping complex ideas into useful products.</p>
          </div>
          <HeroChapter index="01" label="Selected projects" title="Products turn uncertainty into a route people can use." copy="Haven maps property decisions. Safar connects intent, place and itinerary." href="#territory" link="Explore projects" className="morph-chapter-projects" />
          <HeroChapter index="02" label="Skills & practice" title="Interface, systems and intelligence work as one instrument." copy="React and Next.js on the surface. APIs and data underneath. AI shaped around human control." href="#instruments" link="View instruments" className="morph-chapter-skills" />
          <HeroChapter index="03" label="Experience" title="Each role leaves a clearer trail for the next build." copy="Independent product work, software engineering and full-stack AI product delivery." href="#field-notes" link="Follow the trail" className="morph-chapter-experience" />
          <ol className="morph-phases" aria-label="Portfolio chapters">
            <li className="morph-phase"><span>00</span>Self</li><li className="morph-phase"><span>01</span>Projects</li><li className="morph-phase"><span>02</span>Skills</li><li className="morph-phase"><span>03</span>Experience</li>
          </ol>
          <div className="prologue-meter" aria-hidden="true"><span /></div>
          <div className="hero-foot"><p>Full-stack AI engineer<br />Creative developer</p><a href="#coordinates">Enter the detailed atlas <span aria-hidden="true">↓</span></a></div>
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
        <div className="coordinate-depth" aria-hidden="true"><span>DISCOVER</span><span>DESIGN</span><span>DELIVER</span></div>
      </section>

      <section className="work-expedition" id="territory" aria-labelledby="work-title">
        <div className="work-sticky">
          <div className="work-track">
            <article className="work-intro-panel atlas-grid">
              <div className="work-axis" aria-hidden="true"><span>VERTICAL INPUT</span><i /><span>HORIZONTAL ROUTE</span></div>
              <p className="atlas-label">Selected territories / 02–03</p>
              <h2 id="work-title">Two products.<br />Two kinds of <em>orientation.</em></h2>
              <p className="work-intro-copy">Keep scrolling down. The atlas moves sideways to follow each product route, then returns to vertical space.</p>
              <span className="work-cue">Scroll to travel →</span>
            </article>
            {projects.map((project, index) => <ProjectPanel key={project.slug} project={project} index={index} onOpen={() => openCase(project.slug)} />)}
          </div>
          <div className="work-progress" aria-hidden="true"><span /></div>
          <p className="work-counter" aria-hidden="true">02 territories / 01 continuous route</p>
        </div>
      </section>

      <section className="practice-section atlas-grid" id="instruments">
        <div className="practice-heading">
          <p className="atlas-label">04 / Instruments</p>
          <h2 data-reveal>One practice.<br /><em>Three depths.</em></h2>
          <p data-reveal>The interface is what people touch. The system is what holds. Intelligence is what helps—without hiding the route.</p>
        </div>
        <div className="instrument-stage">
          <div className="instrument-contours" aria-hidden="true"><i /><i /><i /></div>
          {practiceAreas.map((area, index) => <article className={`instrument-card instrument-card-${index + 1}`} key={area.index}>
            <span className="instrument-index">{area.index}</span>
            <div><p>Depth 0{index + 1}</p><h3>{area.title}</h3><p>{area.description}</p></div>
            <ul>{area.tools.map((tool) => <li key={tool}>{tool}</li>)}</ul>
          </article>)}
        </div>
      </section>

      <section className="field-section atlas-grid" id="field-notes">
        <div className="field-heading">
          <p className="atlas-label">05 / Field notes</p>
          <h2 data-reveal>Experience leaves<br /><em>a legible trail.</em></h2>
          <p data-reveal>Each stop changed the way I frame a product, connect its layers and ship the final system.</p>
        </div>
        <div className="field-map">
          <i className="field-line" aria-hidden="true" />
          {experience.map((item, index) => <article className={`field-entry field-entry-${index + 1}`} key={item.company}>
            <span className="field-node" aria-hidden="true" />
            <div className="field-year">{item.year}</div>
            <div><h3>{item.company}</h3><em>{item.role}</em><p>{item.description}</p></div>
          </article>)}
        </div>
        <aside className="field-profile" data-reveal><span>Education / 2021–2025</span><strong>B.Tech, Computer Science &amp; Engineering</strong><p>International Institute of Technology and Management, Sonipat.</p></aside>
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

function HeroChapter({ index, label, title, copy, href, link, className }: { index: string; label: string; title: string; copy: string; href: string; link: string; className: string }) {
  return <div className={`morph-copy morph-chapter ${className}`}>
    <span>{index} / {label}</span><h2>{title}</h2><p>{copy}</p><a href={href}>{link} <i aria-hidden="true">→</i></a>
  </div>;
}

function ProjectPanel({ project, index, onOpen }: { project: (typeof projects)[number]; index: number; onOpen: () => void }) {
  return <article className={`project-panel project-panel-${index + 1}`}>
    <div className="project-panel-image">
      <img src={project.image} alt={project.imageAlt} loading="lazy" />
      <div className="project-orbit" aria-hidden="true"><i /><i /><span>{project.index}</span></div>
      <p>Original atlas artwork / Concept visualisation</p>
    </div>
    <div className="project-panel-copy">
      <p className="atlas-label">{project.index} / {project.eyebrow}</p>
      <span>{project.status} / {project.year}</span>
      <h3>{project.title}</h3>
      <p>{project.summary}</p>
      <ol>{project.workflow.map((step, stepIndex) => <li key={step}><span>0{stepIndex + 1}</span>{step}</li>)}</ol>
      <button type="button" onClick={onOpen}>Open field file <span aria-hidden="true">↗</span></button>
    </div>
  </article>;
}
