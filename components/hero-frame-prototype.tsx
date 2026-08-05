"use client";

import { useEffect, useRef, useState } from "react";
import type { MotionProfile } from "@/types/content";

const FRAME_COUNT = 12;
const routePoints = [
  [0.08, 0.76], [0.22, 0.69], [0.37, 0.73], [0.48, 0.59],
  [0.61, 0.62], [0.72, 0.47], [0.87, 0.39], [0.94, 0.26],
] as const;

function clamp(value: number, min = 0, max = 1) {
  return Math.min(Math.max(value, min), max);
}

function drawCover(context: CanvasRenderingContext2D, image: HTMLImageElement, width: number, height: number, progress: number) {
  const baseScale = Math.max(width / image.naturalWidth, height / image.naturalHeight);
  const scale = baseScale * (1.09 - progress * 0.045);
  const drawWidth = image.naturalWidth * scale;
  const drawHeight = image.naturalHeight * scale;
  const panX = width * (0.018 - progress * 0.035);
  const panY = height * (0.02 - progress * 0.025);
  context.drawImage(image, (width - drawWidth) / 2 + panX, (height - drawHeight) / 2 + panY, drawWidth, drawHeight);
}

function drawRoute(context: CanvasRenderingContext2D, width: number, height: number, progress: number) {
  const routeProgress = clamp((progress - 0.2) / 0.72);
  if (routeProgress <= 0) return;

  const scaled = routePoints.map(([x, y]) => [x * width, y * height] as const);
  const completed = routeProgress * (scaled.length - 1);
  const wholeSegments = Math.floor(completed);
  const segmentProgress = completed - wholeSegments;

  context.save();
  context.lineCap = "round";
  context.lineJoin = "round";
  context.lineWidth = Math.max(2, width * 0.0017);
  context.strokeStyle = "rgba(41,59,120,.92)";
  context.shadowColor = "rgba(242,238,228,.7)";
  context.shadowBlur = 7;
  context.beginPath();
  context.moveTo(scaled[0][0], scaled[0][1]);
  for (let index = 1; index <= wholeSegments; index += 1) context.lineTo(scaled[index][0], scaled[index][1]);
  if (wholeSegments < scaled.length - 1) {
    const [fromX, fromY] = scaled[wholeSegments];
    const [toX, toY] = scaled[wholeSegments + 1];
    context.lineTo(fromX + (toX - fromX) * segmentProgress, fromY + (toY - fromY) * segmentProgress);
  }
  context.stroke();
  context.shadowBlur = 0;

  scaled.forEach(([x, y], index) => {
    if (index > completed) return;
    context.fillStyle = "#293b78";
    context.beginPath();
    context.arc(x, y, Math.max(3, width * 0.003), 0, Math.PI * 2);
    context.fill();
    context.strokeStyle = "rgba(242,238,228,.9)";
    context.lineWidth = 2;
    context.beginPath();
    context.arc(x, y, Math.max(7, width * 0.006), 0, Math.PI * 2);
    context.stroke();
  });
  context.restore();
}

function drawContours(context: CanvasRenderingContext2D, width: number, height: number, progress: number) {
  const reveal = clamp((progress - 0.42) / 0.42);
  if (!reveal) return;
  context.save();
  context.globalAlpha = reveal * 0.55;
  context.strokeStyle = "#293b78";
  context.lineWidth = 1;
  for (let index = 0; index < 5; index += 1) {
    context.beginPath();
    context.ellipse(width * 0.72, height * 0.5, width * (0.05 + index * 0.032), height * (0.035 + index * 0.024), index * 0.12, 0, Math.PI * 2);
    context.stroke();
  }
  context.restore();
}

export function HeroFramePrototype({ motion }: { motion: MotionProfile }) {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const frameRef = useRef(-1);
  const rafRef = useRef(0);
  const [frame, setFrame] = useState(motion === "static" ? FRAME_COUNT - 1 : 0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    if (!section || !canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const image = new Image();
    image.decoding = "async";
    image.src = "/atlas/cartographer-hero.webp";
    imageRef.current = image;

    const render = (nextFrame: number) => {
      if (!imageRef.current?.complete || !imageRef.current.naturalWidth) return;
      const rect = canvas.getBoundingClientRect();
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
      const width = Math.max(Math.round(rect.width), 1);
      const height = Math.max(Math.round(rect.height), 1);
      const targetWidth = Math.round(width * pixelRatio);
      const targetHeight = Math.round(height * pixelRatio);
      if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
        canvas.width = targetWidth;
        canvas.height = targetHeight;
      }
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      context.clearRect(0, 0, width, height);
      context.fillStyle = "#f2eee4";
      context.fillRect(0, 0, width, height);

      const progress = nextFrame / (FRAME_COUNT - 1);
      context.save();
      const reveal = clamp((progress - 0.02) / 0.43);
      context.globalAlpha = 0.08 + reveal * 0.92;
      if (progress < 0.48) {
        context.beginPath();
        context.ellipse(width * 0.7, height * 0.55, width * (0.06 + reveal * 0.78), height * (0.05 + reveal * 0.76), -0.08, 0, Math.PI * 2);
        context.clip();
      }
      drawCover(context, imageRef.current, width, height, progress);
      context.restore();

      const wash = context.createLinearGradient(0, 0, width * 0.68, 0);
      wash.addColorStop(0, "rgba(242,238,228,.99)");
      wash.addColorStop(0.34, `rgba(242,238,228,${0.96 - progress * 0.18})`);
      wash.addColorStop(0.72, "rgba(242,238,228,.08)");
      wash.addColorStop(1, "rgba(242,238,228,0)");
      context.fillStyle = wash;
      context.fillRect(0, 0, width, height);
      drawContours(context, width, height, progress);
      drawRoute(context, width, height, progress);

      context.fillStyle = "rgba(41,59,120,.65)";
      context.font = `${Math.max(8, width * 0.006)}px monospace`;
      context.fillText(`FRAME ${String(nextFrame + 1).padStart(2, "0")} / ${FRAME_COUNT}`, width - Math.max(118, width * 0.095), height - 34);
      setReady(true);
    };

    const update = () => {
      const maxScroll = Math.max(section.offsetHeight - window.innerHeight, 1);
      const sectionTop = section.getBoundingClientRect().top + window.scrollY;
      const progress = motion === "static" ? 1 : clamp((window.scrollY - sectionTop) / maxScroll);
      const nextFrame = Math.round(progress * (FRAME_COUNT - 1));
      if (nextFrame !== frameRef.current) {
        frameRef.current = nextFrame;
        setFrame(nextFrame);
        render(nextFrame);
      }
    };

    const schedule = () => {
      window.cancelAnimationFrame(rafRef.current);
      rafRef.current = window.requestAnimationFrame(update);
    };
    image.onload = () => { frameRef.current = -1; schedule(); };
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    schedule();
    return () => {
      image.onload = null;
      window.cancelAnimationFrame(rafRef.current);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      imageRef.current = null;
    };
  }, [motion]);

  return <section ref={sectionRef} className={`hero-sequence ${motion === "static" ? "is-static" : ""}`} id="top" aria-labelledby="atlas-title" data-frame={frame + 1}>
    <div className="hero-sequence-sticky atlas-grid">
      <img className="hero-sequence-fallback" src="/atlas/cartographer-hero.webp" alt="" aria-hidden="true" />
      <canvas ref={canvasRef} className={`hero-sequence-canvas ${ready ? "is-ready" : ""}`} role="img" aria-label="A faceless cartographer and technical atlas progressively revealed as the page scrolls" />
      <p className="hero-coordinate">28.6139° N<br />77.2090° E</p>
      <div className="hero-title" id="atlas-title">
        <p className="atlas-label">Gourav Maurya / Portfolio 2026</p>
        <h1><span className="atlas-hero-line"><span>The atlas of</span></span><span className="atlas-hero-line italic"><span>useful</span></span><span className="atlas-hero-line"><span>intelligence</span></span></h1>
        <p className="hero-sequence-copy">I map complex ideas into useful intelligent products.</p>
      </div>
      <div className="hero-frame-rail" aria-hidden="true"><span style={{ transform: `scaleX(${(frame + 1) / FRAME_COUNT})` }} /></div>
      <div className="hero-foot">
        <p>12-frame prototype<br />Scroll in either direction</p>
        <a href="#coordinates">Enter the atlas <span aria-hidden="true">↓</span></a>
      </div>
    </div>
  </section>;
}
