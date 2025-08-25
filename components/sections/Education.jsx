"use client";

import { useEffect, useRef } from "react";
import { FaGraduationCap } from "react-icons/fa";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Education() {
  const sectionRef = useRef(null);
  const itemsRef = useRef([]);

  const educationData = [
    {
      degree: "B.Tech in Computer Science & Engineering",
      duration: "2021 – 2025",
      institution:
        "International Institute of Technology and Management, Sonipat",
    },
    {
      degree: "Senior Secondary",
      duration: "2020 – 2021",
      institution: "Tagore International School",
    },
    {
      degree: "Secondary",
      duration: "2018 – 2019",
      institution: "Tagore International School",
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate big text
      gsap.fromTo(
        ".bg-education-text",
        { opacity: 0, y: -40 },
        {
          opacity: 0.12,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );

      // Animate each timeline item
      itemsRef.current.forEach((el, index) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: index * 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="education"
      ref={sectionRef}
      className="relative bg-[rgb(var(--bg))] text-[rgb(var(--fg))] py-20 md:py-28 overflow-hidden"
    >
      {/* Big faded text background */}
      <h1
        className="absolute inset-0 font-mono flex items-start top-12 sm:-top-2 justify-center text-[5rem] sm:text-[7rem] md:text-[12rem] font-bold 
        bg-gradient-to-r from-[rgb(var(--fg))]/60 via-[rgb(var(--fg))]/35 to-[rgb(var(--fg))]/80 
        bg-clip-text text-transparent tracking-tighter select-none pointer-events-none z-0"
        style={{
          opacity: 0.18,
          WebkitTextStroke: "1px rgba(var(--fg),0.45)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
          maskImage:
            "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
        }}
      >
        EDUCATION
      </h1>

      <div className="relative max-w-4xl mx-auto z-10">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-[3rem] sm:text-5xl md:text-[6rem] font-bold">
            Education
          </h2>
          <p className="text-xs tracking-widest text-[rgb(var(--fg))]/60 mt-2">
            ACADEMIC MILESTONES
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Center line */}
          <div className="absolute left-1/2 top-0 w-px h-full bg-[rgb(var(--fg))]/30 -translate-x-1/2"></div>

          {educationData.map((edu, index) => (
            <div
              key={index}
              ref={(el) => (itemsRef.current[index] = el)}
              className="relative flex flex-col items-center text-center mb-16"
            >
              {/* Icon */}
              <div className="bg-[rgb(var(--bg))] z-10 p-3 rounded-full border border-[rgb(var(--fg))]/30">
                <FaGraduationCap className="text-[rgb(var(--fg))] text-2xl" />
              </div>

              {/* Text */}
              <div className="bg-[rgb(var(--bg))] px-4 mt-4">
                <h3 className="text-xl md:text-2xl font-semibold">
                  {edu.degree}
                </h3>
                <p className="text-sm md:text-lg text-[rgb(var(--fg))]/60">
                  {edu.duration}
                </p>
                <p className="text-sm md:text-lg text-[rgb(var(--fg))]/50 mt-1">
                  {edu.institution}
                </p>
              </div>

              {/* Connector line */}
              {index !== educationData.length - 1 && (
                <div className="w-px h-14 bg-[rgb(var(--fg))]/30 mt-4"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
