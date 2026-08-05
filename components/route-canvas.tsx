"use client";

import { useEffect, useRef } from "react";
import { useExperience } from "./experience-provider";

export function RouteCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { motion } = useExperience();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    let raf = 0;

    const points = [
      [0.06, 0.16], [0.22, 0.26], [0.15, 0.43], [0.44, 0.52],
      [0.72, 0.34], [0.91, 0.56], [0.64, 0.78], [0.89, 0.9],
    ];

    const draw = () => {
      const scale = Math.min(window.devicePixelRatio || 1, 2);
      const width = window.innerWidth;
      const height = window.innerHeight;
      if (canvas.width !== width * scale || canvas.height !== height * scale) {
        canvas.width = width * scale;
        canvas.height = height * scale;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
      }
      context.setTransform(scale, 0, 0, scale, 0, 0);
      context.clearRect(0, 0, width, height);
      const scrollMax = Math.max(document.documentElement.scrollHeight - height, 1);
      const progress = motion === "static" ? 1 : Math.min(window.scrollY / scrollMax * 1.16, 1);

      context.strokeStyle = "rgba(41,59,120,.22)";
      context.lineWidth = 1;
      context.setLineDash([4, 9]);
      context.beginPath();
      points.forEach(([x, y], index) => index === 0 ? context.moveTo(x * width, y * height) : context.lineTo(x * width, y * height));
      const routeLength = width * 2.8;
      context.lineDashOffset = routeLength * (1 - progress);
      context.stroke();

      context.setLineDash([]);
      points.forEach(([x, y], index) => {
        if (index / (points.length - 1) > progress) return;
        context.beginPath();
        context.arc(x * width, y * height, index % 2 ? 3 : 5, 0, Math.PI * 2);
        context.fillStyle = index % 2 ? "rgba(41,59,120,.42)" : "rgba(41,59,120,.82)";
        context.fill();
        context.beginPath();
        context.arc(x * width, y * height, 11, 0, Math.PI * 2);
        context.strokeStyle = "rgba(41,59,120,.24)";
        context.stroke();
      });
    };

    const schedule = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(draw); };
    draw();
    window.addEventListener("resize", schedule, { passive: true });
    window.addEventListener("scroll", schedule, { passive: true });
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", schedule); window.removeEventListener("scroll", schedule); };
  }, [motion]);

  return <canvas ref={canvasRef} className="route-canvas" aria-hidden="true" />;
}
