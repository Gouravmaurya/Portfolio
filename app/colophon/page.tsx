import Link from "next/link";

export const metadata = { title: "Colophon", description: "Concept, technology, performance and credits behind Gourav Maurya's portfolio." };

export default function ColophonPage() {
  return <main id="main" className="editorial-colophon editorial-grid">
    <Link href="/" className="case-back">← RETURN HOME</Link>
    <p className="section-label">COLOPHON / 2026</p>
    <h1>BUILT AS A<br /><em>SIGNAL</em><br />OBSERVATORY.</h1>
    <div className="colophon-list">
      <section><span>01</span><h2>CONCEPT</h2><p>A cinematic portfolio where products appear as transmissions inside one connected engineering practice. The visual language turns interfaces, infrastructure and AI workflows into a navigable world.</p></section>
      <section><span>02</span><h2>TECHNOLOGY</h2><p>Next.js, TypeScript, GSAP, ScrollTrigger, Three.js and adaptive CSS. Motion enriches the semantic HTML experience instead of replacing it.</p></section>
      <section><span>03</span><h2>PERFORMANCE</h2><p>Reduced-motion and touch profiles remain first-class. Effects scale to the device, and every section stays readable without animation or WebGL.</p></section>
      <section><span>04</span><h2>MEDIA</h2><p>Abstract product views are intentionally presented as concept system frames. They communicate workflow and architecture without pretending to be final product screenshots.</p></section>
    </div>
  </main>;
}
