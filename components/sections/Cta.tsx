"use client";
import Link from "next/link";
import { FadeUp, MagneticButton } from "@/components/motion";
import { siteConfig } from "@/content/site-config";
import manifest from "@/content/asset-manifest.json";

const m = manifest as { images: Record<string, string> };

// CTA1 — Centered Oversized Type on T11 atmosphere
export default function Cta() {
  const c = siteConfig.cta;
  const bg = m.images?.["section-cta"];
  return (
    <section className="relative bg-ink-800 section-pad border-t border-bone-50/5 overflow-hidden">
      {bg && (
        <img
          src={bg}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-25 grayscale"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-ink-900/40 via-ink-900/30 to-ink-900/70" />
      <div className="relative container-narrow text-center">
        <FadeUp>
          <p className="eyebrow mb-10">{c.eyebrow}</p>
        </FadeUp>
        <FadeUp delay={0.1}>
          <h2 className="font-display text-[clamp(2.6rem,7vw,6.5rem)] leading-[0.98] tracking-[-0.012em] text-bone-50 max-w-5xl mx-auto">
            <span className="font-light italic text-bone-100">An appointment </span>
            <span className="font-normal">is the only </span>
            <span className="font-semibold text-champagne">catalogue.</span>
          </h2>
        </FadeUp>
        <FadeUp delay={0.2}>
          <p className="mt-8 max-w-xl mx-auto text-[1.02rem] leading-relaxed font-light text-bone-100/75">
            {c.body}
          </p>
        </FadeUp>
        <FadeUp delay={0.3}>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-8">
            <MagneticButton
              href={c.primary.href}
              className="group inline-flex items-center gap-3 border border-champagne px-9 py-5 text-[0.78rem] tracking-[0.22em] uppercase text-bone-50 hover:bg-champagne hover:text-ink-900 transition-colors duration-500"
            >
              {c.primary.label}
              <span className="block h-px w-6 bg-current transition-all duration-500 group-hover:w-12" />
            </MagneticButton>
            <Link
              href={c.secondary.href}
              className="text-[0.78rem] tracking-[0.22em] uppercase text-bone-200/75 underline-offset-8 hover:text-bone-50 hover:underline"
            >
              {c.secondary.label}
            </Link>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
