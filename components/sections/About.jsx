"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading fade in
      gsap.from(headingRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 80%",
        },
      });

      // Profile image zoom in
      gsap.from(imageRef.current, {
        scale: 0.9,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: imageRef.current,
          start: "top 80%",
        },
      });

      // Paragraphs stagger
      gsap.from(contentRef.current.children, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 85%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative bg-black text-white py-24 md:py-28 overflow-hidden"
    >
      {/* Big faded background text - static now */}
      <h1
        className="absolute inset-0 font-mono flex items-start top-16 sm:top-4 justify-center text-[5rem] sm:text-[7rem] md:text-[12rem] font-bold 
                   bg-gradient-to-r from-gray-600/60 via-gray-200 to-white 
                   bg-clip-text text-transparent tracking-tighter select-none pointer-events-none z-0"
        style={{
          opacity: 0.12,
          WebkitTextStroke: "1px rgba(192,192,192,0.5)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
          maskImage: "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
        }}
      >
        ABOUT ME
      </h1>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-16">
          <h2 className="text-[3rem] md:text-[6rem] font-bold">About Me</h2>
          <p className="text-gray-400 tracking-widest text-sm mt-2">
            GET TO KNOW ME
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
          {/* Right Column - Content */}
          <div ref={contentRef} className="lg:col-span-2 px-6 space-y-6">
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
              Hello! I'm a passionate{" "}
              <span className="text-white font-semibold">
                Full-Stack Developer
              </span>{" "}
              with expertise in building exceptional digital experiences. I
              specialize in creating modern, responsive, and performant web
              applications using cutting-edge technologies.
            </p>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
              With a strong foundation in both frontend and backend development,
              I bring ideas to life through clean, efficient code and thoughtful
              user experiences. My approach combines technical excellence with a
              keen eye for design and usability.
            </p>
          </div>
          {/* Left Column - Image */}
          <div ref={imageRef} className="flex justify-center">
            <div className="relative w-64 h-64 md:w-72 md:h-72 rounded-full overflow-hidden border-4 border-gray-700 shadow-lg group">
              <Image
                src="/profile.webp" // Replace with your actual profile image
                alt="Profile"
                fill
                className="object-cover transition-all duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-black/10 to-black/30"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
