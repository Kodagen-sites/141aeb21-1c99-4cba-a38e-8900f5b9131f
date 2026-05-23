import type { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import { FadeUp, StaggerChildren, StaggerItem } from "@/components/motion";
import { siteConfig } from "@/content/site-config";
import manifest from "@/content/asset-manifest.json";

const m = manifest as { images: Record<string, string> };

export const metadata: Metadata = {
  title: "The house",
  description: siteConfig.about.intro,
};

export default function AboutPage() {
  const a = siteConfig.about;
  const portraitImg = m.images?.[a.portraitSlot] || a.portraitFallback;
  return (
    <>
      <PageHero
        eyebrow={a.eyebrow}
        title={a.h1}
        image={m.images?.["section-about-hero"] || a.portraitFallback}
        intro={a.intro}
      />

      {/* AB3 — Founder portrait + timeline */}
      <section className="section-pad bg-ink-900">
        <div className="container-narrow grid grid-cols-1 md:grid-cols-12 gap-12">
          <FadeUp className="md:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden border border-bone-50/8">
              <img
                src={portraitImg}
                alt="Adekunle Bashorun, founder"
                className="absolute inset-0 h-full w-full object-cover grayscale-[0.3]"
              />
            </div>
            <div className="mt-6 pt-6 border-t border-bone-50/10">
              <p className="font-display italic text-bone-100/85 text-lg">Adekunle Bashorun</p>
              <p className="mt-1 text-[0.78rem] tracking-widest uppercase text-bone-200/55">
                Founder · Master watchmaker
              </p>
            </div>
          </FadeUp>

          <FadeUp className="md:col-span-7 md:pl-10" delay={0.1}>
            <p className="eyebrow mb-6">Notes on the house</p>
            {a.body.map((p, i) => (
              <p
                key={i}
                className="mb-6 text-[1.06rem] leading-relaxed font-light text-bone-100/80 max-w-[58ch] last:mb-0"
              >
                {p}
              </p>
            ))}
          </FadeUp>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-pad bg-ink-800 border-t border-bone-50/5">
        <div className="container-narrow">
          <FadeUp>
            <p className="eyebrow mb-12">A timeline, kept simply</p>
          </FadeUp>
          <StaggerChildren staggerDelay={0.07} className="grid grid-cols-1 gap-0">
            {a.timeline.map((t) => (
              <StaggerItem
                key={t.year}
                className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 py-6 md:py-7 border-t border-bone-50/8 last:border-b last:border-bone-50/8"
              >
                <div className="md:col-span-2 numeric-roman font-display text-2xl md:text-3xl text-champagne tracking-wider">
                  {t.year}
                </div>
                <p className="md:col-span-9 md:col-start-4 text-[1.05rem] font-light leading-relaxed text-bone-100/85">
                  {t.note}
                </p>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Benefits — BN4 numbered list */}
      <section className="section-pad bg-ink-900 border-t border-bone-50/5">
        <div className="container-narrow">
          <FadeUp>
            <p className="eyebrow mb-3">{siteConfig.benefits.eyebrow}</p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="font-display text-[clamp(2rem,4.5vw,3.6rem)] leading-[1.05] tracking-tight text-bone-50 mb-16 max-w-3xl">
              {siteConfig.benefits.h2}
            </h2>
          </FadeUp>
          <StaggerChildren staggerDelay={0.08} className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
            {siteConfig.benefits.items.map((item) => (
              <StaggerItem
                key={item.n}
                className="grid grid-cols-[auto_1fr] gap-6 items-start pt-6 border-t border-bone-50/10"
              >
                <span className="numeric-roman text-champagne/85 text-sm tracking-widest pt-1">
                  {item.n}
                </span>
                <div>
                  <h3 className="font-display text-xl md:text-2xl text-bone-50 leading-snug">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-[0.98rem] leading-relaxed font-light text-bone-100/70">
                    {item.body}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>
    </>
  );
}
