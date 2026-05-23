"use client";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { MagneticButton, ScrollHint } from "@/components/motion";
import { siteConfig } from "@/content/site-config";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  const hero = siteConfig.hero;
  const reduced = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [posterOnly, setPosterOnly] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onError = () => setPosterOnly(true);
    v.addEventListener("error", onError);
    if (!hero.videoUrl) setPosterOnly(true);
    return () => v.removeEventListener("error", onError);
  }, [hero.videoUrl]);

  return (
    <section className="relative h-[100svh] w-full overflow-hidden">
      {/* Background — Veo workshop loop with image fallback */}
      <div className="absolute inset-0">
        {!posterOnly && hero.videoUrl ? (
          <video
            ref={videoRef}
            src={hero.videoUrl}
            poster={hero.poster}
            autoPlay
            muted
            loop
            playsInline
            className="h-full w-full object-cover"
          />
        ) : (
          <img
            src={hero.poster}
            alt=""
            className="h-full w-full object-cover"
          />
        )}
        {/* Cinematic vignette + bottom gradient for HO5 big-stack legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/35 to-ink-900/55" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(11,10,8,0.55)_100%)]" />
      </div>

      {/* HO5 big-stack: H6 multi-weight serif headline, top-left anchored */}
      <div className="relative z-10 flex h-full flex-col">
        <div className="container-narrow flex-1 flex flex-col justify-end pb-24 md:pb-32">
          <motion.div
            initial={reduced ? {} : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: EASE }}
            className="mb-8 md:mb-10"
          >
            <span className="eyebrow">{hero.eyebrow}</span>
          </motion.div>

          {/* H6 multi-weight serif mix, E2 word-split entrance */}
          <h1 className="font-display text-[clamp(3.2rem,9vw,8.2rem)] leading-[0.94] tracking-[-0.01em] text-bone-50 max-w-[14ch]">
            {hero.h1Lines.map((line, i) => (
              <span key={i} className="block overflow-hidden">
                <motion.span
                  initial={reduced ? {} : { y: "100%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1.1, delay: 0.25 + i * 0.16, ease: EASE }}
                  className={
                    line.weight === "italic"
                      ? "inline-block font-light italic text-bone-100/90"
                      : line.weight === "light"
                      ? "inline-block font-light text-bone-100"
                      : line.weight === "bold"
                      ? "inline-block font-semibold text-champagne"
                      : "inline-block"
                  }
                >
                  {line.text}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={reduced ? {} : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.95, ease: EASE }}
            className="mt-10 max-w-xl text-[1.05rem] md:text-[1.12rem] leading-relaxed font-light text-bone-100/75"
          >
            {hero.body}
          </motion.p>

          <motion.div
            initial={reduced ? {} : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 1.15, ease: EASE }}
            className="mt-10 flex flex-wrap items-center gap-8"
          >
            <MagneticButton
              href={hero.primaryCta.href}
              className="group inline-flex items-center gap-3 border border-champagne/70 px-7 py-4 text-[0.78rem] tracking-[0.22em] uppercase text-bone-50 hover:bg-champagne hover:text-ink-900 transition-colors duration-500"
            >
              {hero.primaryCta.label}
              <span className="block h-px w-6 bg-current transition-all duration-500 group-hover:w-10" />
            </MagneticButton>
            <Link
              href={hero.secondaryCta.href}
              className="text-[0.78rem] tracking-[0.22em] uppercase text-bone-200/75 underline-offset-8 hover:text-bone-50 hover:underline"
            >
              {hero.secondaryCta.label}
            </Link>
          </motion.div>
        </div>
      </div>

      <ScrollHint />
    </section>
  );
}
