"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Education", href: "#education" },
  { name: "Contact", href: "#contact" },
];

export default function FloatingDock({ isScrolled }) {
  const [activeSection, setActiveSection] = useState("home");

  // Active section detection
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "home",
        "about",
        "skills",
        "projects",
        "education",
        "contact",
      ];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const { offsetTop, offsetHeight } = el;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50"
    >
      <div
        className="flex items-center gap-6 px-6 py-3 
          rounded-full 
          border border-white/20
          bg-white/10 backdrop-blur-2xl 
          shadow-lg shadow-black/20 
          transition-all duration-300"
        style={{
          WebkitBackdropFilter: "blur(20px) saturate(180%)",
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0.05))",
        }}
      >
        {navLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className={`relative text-sm font-medium px-2 py-1 transition-all duration-200 ${
              activeSection === link.href.substring(1)
                ? "text-white"
                : "text-white/60 hover:text-white"
            }`}
          >
            {activeSection === link.href.substring(1) && (
              <motion.span
                layoutId="active-pill"
                className="absolute inset-0 rounded-full bg-white/20 -z-10"
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              />
            )}
            {link.name}
          </Link>
        ))}
      </div>
    </motion.nav>
  );
}
