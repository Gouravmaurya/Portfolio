"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import type { MotionProfile } from "@/types/content";

type ExperienceContextValue = {
  motion: MotionProfile;
  soundEnabled: boolean;
  toggleSound: () => void;
};

const ExperienceContext = createContext<ExperienceContextValue | null>(null);

export function ExperienceProvider({ children }: { children: React.ReactNode }) {
  const [motion, setMotion] = useState<MotionProfile>("static");
  const [soundEnabled, setSoundEnabled] = useState(false);
  const audioRef = useRef<{ context: AudioContext; gain: GainNode; source: AudioBufferSourceNode; tick: number } | null>(null);

  useEffect(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = matchMedia("(pointer: coarse)").matches;
    setMotion(reduced ? "static" : coarse ? "reduced" : "full");
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

  useEffect(() => {
    if (!soundEnabled) {
      if (audioRef.current) {
        window.clearInterval(audioRef.current.tick);
        audioRef.current.source.stop();
        void audioRef.current.context.close();
        audioRef.current = null;
      }
      return;
    }

    const AudioCtor = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtor) return;
    const context = new AudioCtor();
    const gain = context.createGain();
    const filter = context.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 620;
    gain.gain.value = 0.018;
    filter.connect(gain).connect(context.destination);

    const buffer = context.createBuffer(1, context.sampleRate * 2, context.sampleRate);
    const data = buffer.getChannelData(0);
    for (let index = 0; index < data.length; index += 1) data[index] = (Math.random() * 2 - 1) * 0.17;
    const source = context.createBufferSource();
    source.buffer = buffer;
    source.loop = true;
    source.connect(filter);
    source.start();

    const tick = window.setInterval(() => {
      if (context.state !== "running") return;
      const oscillator = context.createOscillator();
      const tickGain = context.createGain();
      oscillator.type = "sine";
      oscillator.frequency.value = 820;
      tickGain.gain.setValueAtTime(0, context.currentTime);
      tickGain.gain.linearRampToValueAtTime(0.018, context.currentTime + 0.008);
      tickGain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.16);
      oscillator.connect(tickGain).connect(context.destination);
      oscillator.start();
      oscillator.stop(context.currentTime + 0.18);
    }, 5200);

    const onVisibility = () => {
      const level = document.hidden ? 0.0001 : 0.018;
      gain.gain.cancelScheduledValues(context.currentTime);
      gain.gain.setTargetAtTime(level, context.currentTime, 0.12);
    };
    document.addEventListener("visibilitychange", onVisibility);
    audioRef.current = { context, gain, source, tick };

    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      window.clearInterval(tick);
      try { source.stop(); } catch {}
      void context.close();
      audioRef.current = null;
    };
  }, [soundEnabled]);

  const toggleSound = useCallback(() => setSoundEnabled((enabled) => !enabled), []);
  const value = useMemo(() => ({ motion, soundEnabled, toggleSound }), [motion, soundEnabled, toggleSound]);

  return <ExperienceContext.Provider value={value}><div data-motion={motion}>{children}</div></ExperienceContext.Provider>;
}

export function useExperience() {
  const context = useContext(ExperienceContext);
  if (!context) throw new Error("useExperience must be used inside ExperienceProvider");
  return context;
}

declare global {
  interface Window { webkitAudioContext?: typeof AudioContext }
}
