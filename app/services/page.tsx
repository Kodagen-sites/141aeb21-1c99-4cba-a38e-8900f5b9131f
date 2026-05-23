import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/sections/PageHero";
import { FadeUp, StaggerChildren, StaggerItem } from "@/components/motion";
import { siteConfig } from "@/content/site-config";
import manifest from "@/content/asset-manifest.json";

const m = manifest as { images: Record<string, string> };

export const metadata: Metadata = {
  title: "Services",
  description:
    "Custom calibres, vintage restoration, and private collector services from the Naija Watch atelier in Lagos.",
};

export default function ServicesIndexPage() {
  return (
    <>
      <PageHero
        eyebrow="House services"
        title="Three disciplines, attended to slowly."
        image={m.images?.["section-services-hero"] || siteConfig.services[0].imageFallback}
        intro="The atelier answers for three disciplines — the same three we answered for in 1973. Each is undertaken by appointment, and each is finished before the next is begun."
      />

      <section className="section-pad bg-ink-900">
        <div className="container-narrow">
          <StaggerChildren staggerDelay={0.12} className="flex flex-col gap-20 md:gap-32">
            {siteConfig.services.map((s, i) => (
              <StaggerItem key={s.slug}>
                <div className={`grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14 items-center ${i % 2 === 1 ? "md:[direction:rtl]" : ""}`}>
                  <div className="md:col-span-6 [direction:ltr]">
                    <Link href={`/services/${s.slug}`} className="block group relative aspect-[4/5] overflow-hidden border border-bone-50/8">
                      <img
                        src={m.images?.[s.imageSlot] || s.imageFallback}
                        alt={s.name}
                        className="absolute inset-0 h-full w-full object-cover grayscale-[0.4] transition-all duration-1000 group-hover:scale-[1.04] group-hover:grayscale-0"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink-900/60 to-transparent" />
                    </Link>
                  </div>
                  <div className="md:col-span-6 [direction:ltr]">
                    <span className="font-display italic text-3xl text-champagne/85">{s.eyebrow}</span>
                    <h2 className="mt-4 font-display text-[clamp(2rem,4.4vw,3.4rem)] leading-[1.05] tracking-tight text-bone-50">
                      {s.name}
                    </h2>
                    <p className="mt-6 text-[1.06rem] leading-relaxed font-light text-bone-100/80 max-w-[52ch]">
                      {s.summary}
                    </p>
                    <Link
                      href={`/services/${s.slug}`}
                      className="mt-8 inline-flex items-center gap-3 text-[0.78rem] tracking-[0.22em] uppercase text-champagne hover:text-bone-50 transition-colors"
                    >
                      Read further
                      <span className="block h-px w-8 bg-current" />
                    </Link>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>
    </>
  );
}
