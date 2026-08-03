"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { MotionProfile, WebGLTier } from "@/types/content";

type ExperienceContextValue = { motion: MotionProfile; webgl: WebGLTier };
const ExperienceContext = createContext<ExperienceContextValue | null>(null);

export function ExperienceProvider({ children }: { children: React.ReactNode }) {
  const [motion, setMotion] = useState<MotionProfile>("static");
  const [webgl, setWebgl] = useState<WebGLTier>("none");

  useEffect(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = matchMedia("(pointer: coarse)").matches;
    setMotion(reduced ? "static" : coarse ? "reduced" : "full");
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
      setWebgl(gl ? (coarse ? "low" : "high") : "none");
    } catch { setWebgl("none"); }
  }, []);

  useEffect(() => {
    if (motion !== "full") return;
    let cancelled = false;
    let destroy = () => {};
    import("lenis").then(({ default: Lenis }) => {
      if (cancelled) return;
      const lenis = new Lenis({ lerp: 0.075, wheelMultiplier: 0.82, smoothWheel: true, anchors: true });
      let rafId = 0;
      const raf = (time: number) => { lenis.raf(time); rafId = requestAnimationFrame(raf); };
      rafId = requestAnimationFrame(raf);
      destroy = () => { cancelAnimationFrame(rafId); lenis.destroy(); };
    });
    return () => { cancelled = true; destroy(); };
  }, [motion]);

  const value = useMemo(() => ({ motion, webgl }), [motion, webgl]);
  return <ExperienceContext.Provider value={value}><div data-motion={motion}>{children}</div></ExperienceContext.Provider>;
}

export function useExperience() {
  const context = useContext(ExperienceContext);
  if (!context) throw new Error("useExperience must be used inside ExperienceProvider");
  return context;
}
