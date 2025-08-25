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
  const [theme, setTheme] = useState("dark");

  // Initialize theme from localStorage; default to dark
  useEffect(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('theme') : null;
    const initial = saved === 'light' ? 'light' : 'dark';
    setTheme(initial);
    document.documentElement.classList.toggle('dark', initial === 'dark');
  }, []);

  const toggleTheme = (e) => {
    const next = theme === 'dark' ? 'light' : 'dark';

    // Compute center from the clicked button (fallback to viewport center)
    const btn = e?.currentTarget;
    const rect = btn ? btn.getBoundingClientRect() : { left: window.innerWidth / 2, top: 40, width: 0, height: 0 };
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    // Calculate radius to cover the viewport from (cx, cy)
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const r = Math.max(
      Math.hypot(cx - 0, cy - 0),
      Math.hypot(cx - vw, cy - 0),
      Math.hypot(cx - 0, cy - vh),
      Math.hypot(cx - vw, cy - vh)
    );

    // Prepare overlay with target theme variables
    const themeVars = next === 'dark'
      ? { bg: '0 0 0', fg: '255 255 255', primary: '0 196 209', secondary: '92 31 158' }
      : { bg: '255 255 255', fg: '0 0 0', primary: '0 240 255', secondary: '121 40 202' };

    const overlay = document.createElement('div');
    overlay.className = 'theme-reveal';
    overlay.style.setProperty('--cx', `${cx}px`);
    overlay.style.setProperty('--cy', `${cy}px`);
    overlay.style.setProperty('--r', `${r}px`);
    overlay.style.setProperty('--bg', themeVars.bg);
    overlay.style.setProperty('--fg', themeVars.fg);
    overlay.style.setProperty('--primary', themeVars.primary);
    overlay.style.setProperty('--secondary', themeVars.secondary);

    document.body.appendChild(overlay);

    // Notify listeners (e.g., sections like Hero) to blend animations
    const durationMs = 460;
    window.dispatchEvent(new CustomEvent('theme-reveal-start', { detail: { duration: durationMs, nextTheme: next, cx, cy, r } }));
    document.documentElement.classList.add('theme-reveal-active');

    // Toggle theme after animation completes and clean up
    window.setTimeout(() => {
      const root = document.documentElement;
      // Keep the smooth color transition for elements appearing post-overlay
      root.classList.add('theme-transition');
      root.classList.toggle('dark', next === 'dark');
      localStorage.setItem('theme', next);
      setTheme(next);
      // Remove overlay and transition helper a bit later
      window.setTimeout(() => {
        overlay.remove();
        root.classList.remove('theme-transition');
        document.documentElement.classList.remove('theme-reveal-active');
        // Notify listeners that reveal finished
        window.dispatchEvent(new CustomEvent('theme-reveal-end', { detail: { nextTheme: next } }));
      }, 300);
    }, durationMs); // slightly longer than CSS animation (450ms)
  };

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
        <div className="flex items-center justify-between h-12 px-4 bg-[rgb(var(--bg))] backdrop-blur">
          <span className="text-[rgb(var(--fg))] tracking-[0.25em] font-semibold text-sm">
            {brand}
          </span>
          <button
            aria-label="Open navigation"
            onClick={() => setMenuOpen((v) => !v)}
            className="p-2 rounded-md hover:bg-[rgb(var(--fg))]/10 text-[rgb(var(--fg))]"
          >
            {/* 2x2 grid icon */}
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <rect x="3" y="3" width="7" height="7" rx="1" />
              <rect x="14" y="3" width="7" height="7" rx="1" />
              <rect x="3" y="14" width="7" height="7" rx="1" />
              <rect x="14" y="14" width="7" height="7" rx="1" />
            </svg>
          </button>
          <button
            aria-label="Toggle theme"
            onClick={(e) => toggleTheme(e)}
            className="ml-2 p-2 rounded-md text-[rgb(var(--fg))] hover:bg-[rgb(var(--fg))]/10"
            title={theme === 'dark' ? 'Switch to light' : 'Switch to dark'}
          >
            {theme === 'dark' ? (
              // Outlined sun icon (cleaner)
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-5 h-5">
                <circle cx="12" cy="12" r="4" strokeWidth="1.8" />
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            ) : (
              // Keep existing moon icon
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M21.64 13.01A9 9 0 1 1 10.99 2.36 7 7 0 1 0 21.64 13Z"/></svg>
            )}
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
              className="absolute top-12 left-0 right-0 bg-[rgb(var(--bg))/0.95] backdrop-blur px-2 py-2"
            >
              <nav className="flex flex-col">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={`px-3 py-2 rounded-md text-sm transition-colors ${
                      activeSection === link.href.substring(1)
                        ? "text-[rgb(var(--fg))] bg-[rgb(var(--fg))]/10"
                        : "text-[rgb(var(--fg))]/70 hover:text-[rgb(var(--fg))] hover:bg-[rgb(var(--fg))]/5"
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
            border border-[rgb(var(--fg))]/20
            bg-[rgb(var(--fg))]/10 backdrop-blur-2xl 
            shadow-lg shadow-[rgb(var(--bg))]/20 
            transition-all duration-300"
          style={{
            WebkitBackdropFilter: "blur(20px) saturate(180%)",
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0.05))",
          }}
        >
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => {
                const el = document.getElementById(link.href.substring(1));
                if (el) {
                  el.scrollIntoView({ behavior: "smooth", block: "start" });
                }
                setMenuOpen(false); // close mobile menu
              }}
              className={`relative text-sm font-medium px-2 py-1 transition-all duration-200 ${
                activeSection === link.href.substring(1)
                  ? "text-[rgb(var(--fg))]"
                  : "text-[rgb(var(--fg))]/60 hover:text-[rgb(var(--fg))]"
              }`}
            >
              {activeSection === link.href.substring(1) && (
                <motion.span
                  layoutId="active-pill"
                  className="absolute inset-0 rounded-full bg-[rgb(var(--fg))]/20 -z-10"
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                />
              )}
              {link.name}
            </button>
          ))}
          <button
            aria-label="Toggle theme"
            onClick={toggleTheme}
            className="ml-2 p-2 rounded-md text-[rgb(var(--fg))] hover:bg-[rgb(var(--fg))]/10"
            title={theme === 'dark' ? 'Switch to light' : 'Switch to dark'}
          >
            {theme === 'dark' ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-5 h-5">
                <circle cx="12" cy="12" r="4" strokeWidth="1.8" />
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M21.64 13.01A9 9 0 1 1 10.99 2.36 7 7 0 1 0 21.64 13Z"/></svg>
            )}
          </button>
        </div>
      </motion.nav>
    </>
  );
}
