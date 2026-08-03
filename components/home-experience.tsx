"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { experience, practiceAreas, projects, sharedMedia, socials } from "@/data/content";
import { EditorialProject } from "./editorial-project";
import { LivingReel } from "./living-reel";
import { MediaSlot } from "./media-slot";
import { useExperience } from "./experience-provider";

const heroFrames = [projects[0].reelFrames[0], projects[1].reelFrames[0], sharedMedia.code, sharedMedia.portrait];

export function HomeExperience() {
  const root = useRef<HTMLElement>(null);
  const { motion } = useExperience();

  useEffect(() => {
    if (motion === "static" || !root.current) return;
    let dispose = () => {};
    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([gsapModule, triggerModule]) => {
      const gsap = gsapModule.default;
      const ScrollTrigger = triggerModule.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);
      const context = gsap.context(() => {
        gsap.from(".hero-word > span", { yPercent: 110, rotate: 2, duration: 1.05, stagger: .09, ease: "power4.out" });
        gsap.from(".editorial-hero .reel-frame", { y: 90, opacity: 0, duration: 1, stagger: .06, ease: "expo.out", delay: .25 });
        gsap.to(".editorial-hero .reel-track", { xPercent: -18, ease: "none", scrollTrigger: { trigger: ".editorial-hero", start: "top top", end: "bottom top", scrub: .7 } });
        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => gsap.from(element, { y: 60, opacity: 0, duration: .9, ease: "power3.out", scrollTrigger: { trigger: element, start: "top 88%" } }));
        gsap.utils.toArray<HTMLElement>(".chapter-hero-media").forEach((media) => gsap.from(media, { clipPath: "inset(20% 8% 20% 8%)", scale: .94, scrollTrigger: { trigger: media, start: "top 85%", end: "center 55%", scrub: .6 } }));
        gsap.to(".reel-divider .reel-track", { xPercent: -28, ease: "none", scrollTrigger: { trigger: ".reel-divider", start: "top bottom", end: "bottom top", scrub: .8 } });
      }, root);
      dispose = () => context.revert();
    });
    return () => dispose();
  }, [motion]);

  return <main id="main" ref={root}>
    <section className="editorial-hero editorial-grid" aria-labelledby="hero-title">
      <div className="hero-intro"><span>PORTFOLIO / 2026</span><p>FULL-STACK AI ENGINEER<br />CREATIVE DEVELOPER</p></div>
      <h1 id="hero-title"><span className="hero-word"><span>GOURAV</span></span><span className="hero-word serif-word"><span>MAURYA</span></span></h1>
      <p className="hero-note">Engineering useful intelligence<br />into digital products.</p>
      <LivingReel frames={heroFrames} />
      <a className="editorial-scroll" href="#statement">SCROLL TO READ <span>↓</span></a>
    </section>

    <section className="editorial-statement editorial-grid" id="statement">
      <p className="section-label">01 / POSITION</p>
      <h2 data-reveal>I BUILD <span>INTELLIGENT</span><br />PRODUCTS FROM<br /><em>INTERFACE</em> TO<br />INFRASTRUCTURE.</h2>
      <p className="statement-copy" data-reveal>I work across product, interface, application logic, data and AI—connecting each layer into a clear, useful experience.</p>
      <LivingReel frames={heroFrames} variant="divider" />
    </section>

    <section className="selected-work" id="work">
      <div className="work-intro editorial-grid"><p className="section-label">02 / SELECTED WORK</p><h2 data-reveal>TWO PRODUCTS.<br /><em>TWO KINDS</em> OF<br />INTELLIGENCE.</h2><p>Selected systems built across product thinking, engineering and interaction.</p></div>
      <EditorialProject project={projects[0]} layout="precise" /><EditorialProject project={projects[1]} layout="organic" />
    </section>

    <section className="practice editorial-grid" id="practice">
      <div className="practice-heading"><p className="section-label">03 / PRACTICE</p><h2 data-reveal>ONE PRACTICE.<br /><em>THREE LENSES.</em></h2></div>
      <div className="practice-columns">{practiceAreas.map((area) => <details key={area.index} data-reveal><summary><span>{area.index}</span><h3>{area.title}</h3><i>+</i></summary><p>{area.description}</p><ul>{area.tools.map((tool) => <li key={tool}>{tool}</li>)}</ul></details>)}</div>
    </section>

    <section className="profile editorial-grid" id="about">
      <div className="profile-intro"><p className="section-label">04 / PROFILE</p><h2 data-reveal>ENGINEERING<br />WITH A <em>POINT<br />OF VIEW.</em></h2><p>I build where product engineering, AI systems and creative development meet. The goal is not merely to make software work—it is to make complexity feel clear and memorable.</p><div className="profile-facts"><span>BASED IN INDIA</span><span>AI + INTERACTION</span><a href="/Gourav-Maurya-Resume.pdf">DOWNLOAD RÉSUMÉ ↗</a></div></div>
      <MediaSlot asset={sharedMedia.portrait} className="portrait-slot" />
      <div className="experience-index"><p className="section-label">EXPERIENCE / INDEX</p>{experience.map((item, index) => <details key={item.company} open={index === 0}><summary><span>{item.year}</span><strong>{item.company}</strong><i>+</i></summary><div><em>{item.role}</em><p>{item.description}</p></div></details>)}</div>
    </section>

    <footer className="editorial-contact editorial-grid" id="contact">
      <p className="section-label">05 / NEXT FRAME</p><h2 data-reveal>LET’S MAKE THE<br />NEXT FRAME <em>MATTER.</em></h2>
      <LivingReel frames={heroFrames} variant="final" />
      <a className="contact-email" href="mailto:gouravmaurya351@gmail.com">GOURAVMAURYA351@GMAIL.COM <span>↗</span></a>
      <div className="contact-footer"><span>GOURAV MAURYA © 2026</span><nav aria-label="Social links">{socials.map((link) => <a href={link.href} target={link.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" key={link.label}>{link.label}</a>)}<Link href="/colophon">COLOPHON</Link></nav><a href="#main">BACK TO TOP ↑</a></div>
    </footer>
  </main>;
}
