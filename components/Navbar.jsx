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
  const [menuOpen, setMenuOpen] = useState(false);
  const brand = "GM"; // change as needed

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
    <>
      {/* Mobile top bar */}
      <div className="fixed top-0 left-0 right-0 z-50 md:hidden">
        <div className="flex items-center justify-between h-12 px-4 bg-black backdrop-blur">
          <span className="text-white tracking-[0.25em] font-semibold text-sm">{brand}</span>
          <button
            aria-label="Open navigation"
            onClick={() => setMenuOpen((v) => !v)}
            className="p-2 rounded-md hover:bg-white/10 text-white"
          >
            {/* 2x2 grid icon */}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <rect x="3" y="3" width="7" height="7" rx="1" />
              <rect x="14" y="3" width="7" height="7" rx="1" />
              <rect x="3" y="14" width="7" height="7" rx="1" />
              <rect x="14" y="14" width="7" height="7" rx="1" />
            </svg>
          </button>
        </div>
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              key="mobile-menu"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
              className="absolute top-12 left-0 right-0 bg-black/95 backdrop-blur px-2 py-2"
            >
              <nav className="flex flex-col">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={`px-3 py-2 rounded-md text-sm transition-colors ${
                      activeSection === link.href.substring(1)
                        ? "text-white bg-white/10"
                        : "text-white/70 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Desktop floating dock (md and up) */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="hidden md:block fixed top-4 left-1/2 -translate-x-1/2 z-40"
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
    </>
  );
}

