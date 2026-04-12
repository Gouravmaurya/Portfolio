"use client";

import { useEffect, useRef } from "react";
import { FaBriefcase } from "react-icons/fa";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  const experienceData = [
    {
      role: "Full-Stack AI Engineer",
      company: "Persist Ventures",
      duration: "Jan 2026 – Present",
      location: "Remote",
      points: [
        "Architecting end-to-end AI solutions, integrating LLMs into full stack applications.",
        "Developing 'Haven', a real-time real estate platform with intelligent data filtering.",
        "Optimizing system performance for AI features, ensuring low latency.",
        "Collaborating on Safar AI Trip Planner with advanced prompt engineering.",
      ],
      tags: ["AI", "Next.js", "LLMs", "React"],
    },
    {
      role: "Full-Stack Developer",
      company: "Kite Info",
      duration: "Aug 2025 – Feb 2026",
      location: "India",
      points: [
        "Engineered high-conversion landing pages with cinematic animations.",
        "Developed and deployed custom CMS for non-technical clients.",
        "Bridged design and code using modern frameworks for high performance.",
        "Streamlined development workflows for rapid marketing site deployment.",
      ],
      tags: ["Frontend", "CMS", "Animations", "UI/UX"],
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Main Heading reveal
      gsap.from(".exp-heading", {
        opacity: 0,
        y: 60,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".exp-heading",
          start: "top 90%",
        },
      });

      // Cards reveal and hover effect
      cardsRef.current.forEach((card, i) => {
        gsap.from(card, {
          opacity: 0,
          y: 80,
          scale: 0.95,
          duration: 1,
          delay: i * 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
          },
        });

        // 3D Tilt Effect logic
        const shine = card.querySelector(".card-shine");
        
        const onMouseMove = (e) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          
          const xc = rect.width / 2;
          const yc = rect.height / 2;
          
          const dx = x - xc;
          const dy = y - yc;
          
          gsap.to(card, {
            rotateY: dx / 25,
            rotateX: -dy / 25,
            duration: 0.5,
            ease: "power2.out",
          });

          if (shine) {
            gsap.to(shine, {
              opacity: 1,
              x: x - 50,
              y: y - 50,
              duration: 0.2,
            });
          }
        };

        const onMouseLeave = () => {
          gsap.to(card, {
            rotateY: 0,
            rotateX: 0,
            duration: 0.8,
            ease: "elastic.out(1, 0.5)",
          });
          if (shine) {
            gsap.to(shine, { opacity: 0, duration: 0.5 });
          }
        };

        card.addEventListener("mousemove", onMouseMove);
        card.addEventListener("mouseleave", onMouseLeave);

        return () => {
          card.removeEventListener("mousemove", onMouseMove);
          card.removeEventListener("mouseleave", onMouseLeave);
        };
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative bg-[rgb(var(--bg))] text-[rgb(var(--fg))] py-32 md:py-48 overflow-hidden"
    >
      {/* Dynamic Background Noise/Gradient */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 blur-[120px] rounded-full animate-bounce" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 z-10">
        <div className="exp-heading mb-24 space-y-4">
          <div className="flex items-center gap-4 text-primary font-mono text-sm tracking-[.3em] uppercase">
            <span className="w-12 h-[1px] bg-primary/50" />
            My Career Path
          </div>
          <h2 className="text-5xl md:text-8xl font-bold tracking-tighter">
            Where I've <span className="text-primary italic">built</span>.
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {experienceData.map((exp, index) => (
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              className="group relative bg-[rgb(var(--fg))]/5 border border-[rgb(var(--fg))]/10 p-8 md:p-12 rounded-[2.5rem] backdrop-blur-md overflow-hidden transition-colors hover:bg-[rgb(var(--fg))]/8 shadow-2xl"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="card-shine absolute w-32 h-32 bg-primary/30 blur-3xl pointer-events-none opacity-0 transition-opacity" />
              
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-10">
                  <div className="p-4 bg-primary/10 rounded-2xl border border-primary/20 group-hover:scale-110 transition-transform duration-500">
                    <FaBriefcase className="text-primary text-2xl" />
                  </div>
                  <div className="text-right">
                    <p className="text-primary font-mono text-sm mb-1">{exp.duration}</p>
                    <p className="text-[rgb(var(--fg))]/40 text-xs uppercase tracking-widest">{exp.location}</p>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  <h3 className="text-3xl md:text-4xl font-bold group-hover:text-primary transition-colors">
                    {exp.role}
                  </h3>
                  <h4 className="text-xl text-[rgb(var(--fg))]/60 font-medium">
                    {exp.company}
                  </h4>
                </div>
                
                <ul className="space-y-4 mb-10">
                  {exp.points.map((point, pIndex) => (
                    <li key={pIndex} className="flex gap-4 text-[rgb(var(--fg))]/70 leading-relaxed text-sm md:text-base group/li">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary/40 mt-2 shrink-0 group-hover/li:scale-150 transition-transform" />
                      {point}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2">
                  {exp.tags.map((tag, tIndex) => (
                    <span 
                      key={tIndex} 
                      className="px-4 py-1.5 rounded-full bg-[rgb(var(--fg))]/5 border border-[rgb(var(--fg))]/10 text-xs font-mono text-[rgb(var(--fg))]/60"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
