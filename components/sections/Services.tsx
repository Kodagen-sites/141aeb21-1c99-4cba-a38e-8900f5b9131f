import { FadeUp, StaggerChildren } from "@/components/motion";
import ServiceCard from "@/components/ServiceCard";
import { siteConfig } from "@/content/site-config";
import manifest from "@/content/asset-manifest.json";

const m = manifest as { images: Record<string, string> };

export default function Services() {
  return (
    <section className="bg-ink-800 section-pad border-t border-bone-50/5">
      <div className="container-narrow">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-16 md:mb-24">
          <FadeUp className="md:col-span-4">
            <p className="eyebrow mb-3">House services</p>
            <h2 className="font-display text-[clamp(2rem,4.5vw,3.6rem)] leading-[1.05] tracking-tight text-bone-50">
              Three things,<br />
              <span className="font-light italic text-bone-100/75">attended to slowly.</span>
            </h2>
          </FadeUp>
          <FadeUp delay={0.1} className="md:col-span-7 md:col-start-6 self-end">
            <p className="text-[1.02rem] leading-relaxed font-light text-bone-100/75 max-w-[55ch]">
              The atelier answers for three disciplines. They are the same three disciplines we
              answered for in 1973 — only the bench has changed hands. Each is taken on by appointment,
              and each is finished before the next is begun.
            </p>
          </FadeUp>
        </div>

        <StaggerChildren staggerDelay={0.1} className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {siteConfig.services.map((s) => (
            <ServiceCard
              key={s.slug}
              href={`/services/${s.slug}`}
              eyebrow={s.eyebrow}
              name={s.name}
              summary={s.summary}
              imageUrl={m.images?.[s.imageSlot] || s.imageFallback}
            />
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
