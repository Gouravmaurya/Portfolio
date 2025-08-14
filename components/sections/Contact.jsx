"use client";

import { useEffect, useRef } from "react";
import { FaFacebookF, FaInstagram, FaGithub, FaEnvelope } from "react-icons/fa";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef(null);
  const elementsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate big faded text
      gsap.fromTo(
        ".bg-contact-text",
        { opacity: 0, y: -30 },
        {
          opacity: 0.08,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );

      // Animate content
      elementsRef.current.forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: i * 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative bg-black text-white py-20 md:py-28 overflow-hidden flex flex-col justify-between min-h-screen"
    >
      {/* Big faded background text */}
      <h1
         className="absolute inset-0 font-mono flex items-start top-12 sm:-top-2 justify-center text-[5rem] sm:text-[7rem] md:text-[12rem] font-bold 
         bg-gradient-to-r from-gray-600/60 via-gray-200 to-white 
         bg-clip-text text-transparent tracking-tighter select-none pointer-events-none z-0"
style={{
opacity: 0.12,
WebkitTextStroke: "1px rgba(192,192,192,0.5)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
          maskImage:
            "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
        }}
      >
        CONTACT
      </h1>

      {/* Main content */}
      <div className="relative z-10 text-center max-w-2xl mx-auto">
        <h2
          ref={(el) => (elementsRef.current[0] = el)}
          className="text-[3rem] sm:text-5xl md:text-[6rem] font-bold mb-4"
        >
          Contact
        </h2>
        <p
          ref={(el) => (elementsRef.current[1] = el)}
          className="text-base tracking-widest text-gray-400 mb-14"
        >
          GET IN TOUCH
        </p>

        <div
          ref={(el) => (elementsRef.current[2] = el)}
          className="text-gray-300 leading-relaxed space-y-2 text-lg px-8"
        >
          <p>I'm Available For Full-time Roles & Freelance Projects.</p>
          <p>My Inbox Is Always Open,</p>
          <p>Whether You Have A Question</p>
          <p>Or</p>
          <p>Just Want To Say Hi,</p>
          <p>I'll Try My Best To Get Back To You!</p>
        </div>

        <div ref={(el) => (elementsRef.current[3] = el)} className="mt-8">
          <a
            href="https://www.instagram.com/gourav_maurya1/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 border border-gray-500 rounded-lg hover:bg-gray-800 transition-colors"
          >
            Let&apos;s Chat <FaInstagram className="text-pink-500" />
          </a>
        </div>
      </div>
    </section>
  );
}
