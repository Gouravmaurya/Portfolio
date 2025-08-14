import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { FiGithub, FiLinkedin, FiMail, FiDownload, FiCheck } from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger);

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
  const ctaRef = useRef(null);
  const socialRef = useRef(null);
  const [copied, setCopied] = useState(false);
  const EMAIL = "gouravmaurya351@gmail.com";

  useEffect(() => {
    // Intro heading animation (runs once on load)
    const introTl = gsap.timeline({ defaults: { ease: "power3.out" } });
    introTl
      .from(textRef.current.children, {
        y: 50,
        opacity: 0,
        stagger: 0.05,
        duration: 0.8,
      })
      .from(".tagline", { opacity: 0, y: 20, duration: 0.6 }, "-=0.4");

    // CTA buttons scroll-triggered (replay when section comes into view)
    gsap.fromTo(
      ctaRef.current.children,
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.6,
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Social links scroll-triggered
    gsap.fromTo(
      socialRef.current.children,
      { x: 20, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.6,
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Parallax effect for hero background
    if (window.innerWidth > 768) {
      gsap.to(heroRef.current, {
        y: "8%",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    }
  }, []);

  return (
    <section
      id="home"
      ref={heroRef}
      className="flex items-center justify-center min-h-screen relative overflow-hidden bg-black text-white"
    >
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-5xl mx-auto">

          {/* Heading */}
          <h1
            ref={textRef}
            className="text-4xl sm:text-6xl lg:text-7xl font-bold leading-tight tracking-tight mb-6"
          >
            Hi, I’m <span className="text-white">Gourav Maurya</span>
            <br />
            <span className="text-gray-400 font-light">Full-Stack Developer</span>
          </h1>

          {/* Tagline */}
          <p className="tagline text-lg sm:text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
            I build fast, clean, and scalable web applications that put user experience first.
          </p>

          {/* CTA Buttons */}
          <div ref={ctaRef} className="flex flex-wrap justify-center gap-6 mb-16">
           
            <a
              href="/Gourav_Maurya WebDeveloper_Resume.pdf"
              download
              className="px-8 py-4 border border-white/30 text-white font-medium rounded-lg hover:bg-white hover:text-black transition-all duration-300 flex items-center space-x-2"
            >
              <span>View Resume</span>
              <FiDownload className="w-4 h-4" />
            </a>
          </div>

          {/* Social Links on Right Side */}
          <div
            ref={socialRef}
            className="hidden md:flex flex-col items-center space-y-6 fixed right-0 mr-6 top-1/2 -translate-y-1/2 z-50"
          >
            <span className="w-px h-12 bg-gray-500/40"></span>
            {socialLinks.map((social) => (
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
                      // Fallback: open mailto if clipboard not available
                      window.location.href = social.href;
                    }
                  }}
                  title={`Copy ${EMAIL}`}
                  className="text-gray-400 hover:text-white transition-all duration-300 hover:scale-110"
                  aria-label="Copy email to clipboard"
                >
                  {copied ? <FiCheck className="w-6 h-6 text-green-400" /> : social.icon}
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
            ))}
            <span className="w-px h-12 bg-gray-500/40"></span>
          </div>

        </div>
      </div>
    </section>
  );
}
