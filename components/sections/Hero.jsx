import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { TextPlugin } from "gsap/dist/TextPlugin";
import {
  FiGithub,
  FiLinkedin,
  FiMail,
  FiDownload,
  FiCheck,
  FiCopy,
} from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger, TextPlugin);

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/Gouravmaurya",
    icon: <FiGithub className="w-6 h-6" />,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/gourav-maurya-a39969226/",
    icon: <FiLinkedin className="w-6 h-6" />,
  },
  {
    name: "Email",
    href: "mailto:gouravmaurya351@gmail.com",
    icon: <FiMail className="w-6 h-6" />,
  },
];

export default function Hero() {
  const heroRef = useRef(null);
  const textRef = useRef(null);
  const nameRef = useRef(null);
  const roleRef = useRef(null);
  const ctaRef = useRef(null);
  const socialRef = useRef(null);
  const [copied, setCopied] = useState(false);
  const EMAIL = "gouravmaurya351@gmail.com";
  const [copiedEmail, setCopiedEmail] = useState(false);

  useEffect(() => {
    // Animate name letters smoothly
    const name = nameRef.current;
    const letters = name.textContent.split("");
    name.innerHTML = letters
      .map(
        (l) => `<span class="inline-block opacity-0 translate-y-6">${l}</span>`
      )
      .join("");

    gsap.to(name.querySelectorAll("span"), {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.08,
      ease: "power3.out",
    });

    // Roles cycle with smoother vanish effect
    const roles = [
      "Full-Stack Developer",
      "MERN Stack Developer",
      "Web Developer",
    ];
    let roleIndex = 0;

    const changeRole = () => {
      const tl = gsap.timeline({
        onComplete: () => {
          roleIndex = (roleIndex + 1) % roles.length;
          setTimeout(changeRole, 2500); // wait before next change
        },
      });

      tl.to(roleRef.current, {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: "power2.inOut",
        onComplete: () => {
          gsap.set(roleRef.current, { text: roles[roleIndex] });
        },
      }).to(roleRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
      });
    };

    changeRole();

    // Intro heading animation
    gsap.from(textRef.current.children, {
      y: 60,
      opacity: 0,
      stagger: 0.1,
      duration: 1.2,
      ease: "power3.out",
    });

    // Tagline fade-in
    gsap.from(".tagline", {
      opacity: 0,
      y: 25,
      duration: 1.2,
      ease: "power3.out",
      delay: 0.6,
    });

    // CTA buttons (smooth fade & rise)
    gsap.fromTo(
      ctaRef.current.children,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.15,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Social links (slide in smoothly)
    gsap.fromTo(
      socialRef.current.children,
      { x: 30, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        stagger: 0.15,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Smooth parallax effect
    if (window.innerWidth > 768) {
      gsap.to(heroRef.current, {
        y: "6%",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
      });
    }
  }, []);

  return (
    <section
      id="home"
      ref={heroRef}
      className="flex items-center justify-center min-h-screen relative overflow-hidden bg-black text-white pt-32"
    >
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-5xl mx-auto">
          {/* Availability Badge */}
          {/* Availability Badge */}
          <div className="flex justify-center mb-6">
            <span className="inline-flex items-center gap-3 text-white/90">
              <span className="relative flex h-3 w-3">
                {/* Outer glowing pulse */}
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75 animate-ping"></span>

                {/* Stronger blurred glow */}
                <span className="absolute inset-0 rounded-full bg-emerald-400 blur-md opacity-80"></span>

                {/* Solid center dot */}
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-400 ring-2 ring-emerald-500 shadow-[0_0_10px_3px_rgba(16,185,129,0.8)]"></span>
              </span>
              <span className="tracking-wide font-semibold">
                Available For Work
              </span>
            </span>
          </div>

          {/* Heading */}
          <h1
            ref={textRef}
            className="text-4xl sm:text-6xl lg:text-7xl font-bold leading-tight tracking-tight mb-6"
          >
            Hi, I’m{" "}
            <span
              ref={nameRef}
              className="inline-block text-white font-bold tracking-wide"
            >
              Gourav Maurya
            </span>
            <br />
            <span ref={roleRef} className="text-gray-400 font-light">
              Full-Stack Developer
            </span>
          </h1>

          {/* Tagline */}
          <p className="tagline text-lg sm:text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
            I build fast, clean, and scalable web applications that put user
            experience first.
          </p>

          {/* CTA Buttons */}
          <div
            ref={ctaRef}
            className="flex flex-wrap justify-center gap-6 mb-16"
          >
            <a
              href="/Gourav_Maurya WebDeveloper_Resume.pdf"
              download
              className="px-8 py-4 border border-white/30 text-white font-medium rounded-full hover:bg-white hover:text-black transition-all duration-300 flex items-center space-x-2"
            >
              <span>View Resume</span>
              <FiDownload className="w-4 h-4" />
            </a>

            {/* Email copy CTA */}
            <button
              type="button"
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(EMAIL);
                  setCopiedEmail(true);
                  setTimeout(() => setCopiedEmail(false), 1500);
                } catch (e) {
                  window.location.href = `mailto:${EMAIL}`;
                }
              }}
              title={`Copy ${EMAIL}`}
              className="group inline-flex items-center gap-3 px-5 py-4 text-white/60 hover:text-white hover:border-white/60 transition-all duration-300"
            >
              <span className="relative grid place-items-center w-4 h-4 rounded-full text-white shadow ring-1 ring-black/10">
                {copiedEmail ? (
                  <FiCheck className="w-4 h-4 text-green-600" />
                ) : (
                  <FiCopy className="w-4 h-4" />
                )}
              </span>
              <span className="tracking-wide font-medium">
                {copiedEmail ? "gouravmaurya351@gmail.com" : EMAIL}
              </span>
            </button>
          </div>

          {/* Social Links */}
          <div
            ref={socialRef}
            className="hidden md:flex flex-col items-center space-y-6 fixed right-0 mr-6 top-1/2 -translate-y-1/2 z-[60]"
          >
            <span className="w-px h-12 bg-gray-500/40"></span>
            {socialLinks.map((social) =>
              social.name === "Email" ? (
                <button
                  key={social.name}
                  type="button"
                  onClick={async () => {
                    try {
                      await navigator.clipboard.writeText(EMAIL);
                      setCopied(true);
                      setTimeout(() => setCopied(false), 1500);
                    } catch (e) {
                      window.location.href = social.href;
                    }
                  }}
                  title={`Copy ${EMAIL}`}
                  className="text-gray-400 hover:text-white transition-all duration-300 hover:scale-110"
                  aria-label="Copy email to clipboard"
                >
                  {copied ? (
                    <FiCheck className="w-6 h-6 text-green-400" />
                  ) : (
                    social.icon
                  )}
                </button>
              ) : (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-all duration-300 hover:scale-110"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              )
            )}
            <span className="w-px h-12 bg-gray-500/40"></span>
          </div>
        </div>
      </div>
    </section>
  );
}
