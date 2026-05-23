"use client";
import { useEffect, useRef } from "react";

export default function FilmGrain({ intensity = 0.04 }: { intensity?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let raf = 0;
    let stopped = false;

    const resize = () => {
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      if (stopped) return;
      const { width, height } = canvas;
      const img = ctx.createImageData(width, height);
      const d = img.data;
      const amt = intensity * 255;
      for (let i = 0; i < d.length; i += 4) {
        const v = (Math.random() * amt) | 0;
        d[i] = v;
        d[i + 1] = v;
        d[i + 2] = v;
        d[i + 3] = v;
      }
      ctx.putImageData(img, 0, 0);
      raf = window.setTimeout(() => requestAnimationFrame(draw), 120) as unknown as number;
    };
    draw();

    return () => {
      stopped = true;
      window.removeEventListener("resize", resize);
      window.clearTimeout(raf);
    };
  }, [intensity]);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[60] mix-blend-overlay opacity-[0.35]"
    />
  );
}
