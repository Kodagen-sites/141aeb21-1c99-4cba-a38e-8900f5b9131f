import { FadeUp, StaggerChildren, StaggerItem } from "@/components/motion";
import { siteConfig } from "@/content/site-config";
import manifest from "@/content/asset-manifest.json";

const m = manifest as { images: Record<string, string> };

export default function Showcase() {
  const s = siteConfig.showcase;
  return (
    <section className="bg-ink-900 section-pad border-t border-bone-50/5">
      <div className="container-narrow">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-14">
          <FadeUp className="md:col-span-5">
            <p className="eyebrow mb-3">{s.eyebrow}</p>
            <h2 className="font-display text-[clamp(2rem,4.4vw,3.5rem)] leading-[1.05] tracking-tight text-bone-50">
              {s.h2}
            </h2>
          </FadeUp>
          <FadeUp delay={0.1} className="md:col-span-6 md:col-start-7 self-end">
            <p className="text-[1.02rem] leading-relaxed font-light text-bone-100/75 max-w-[50ch]">
              {s.body}
            </p>
          </FadeUp>
        </div>

        <StaggerChildren staggerDelay={0.08} className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
          {s.items.map((item, i) => {
            const span =
              i === 0 ? "md:col-span-7 md:row-span-2 aspect-[4/5] md:aspect-auto" :
              i === 1 ? "md:col-span-5 aspect-[4/3]" :
              i === 2 ? "md:col-span-5 aspect-[4/3]" :
              "md:col-span-7 aspect-[16/9]";
            return (
              <StaggerItem key={i} className={`relative overflow-hidden group ${span}`}>
                <img
                  src={m.images?.[item.slot] || item.fallback}
                  alt={item.caption}
                  className="absolute inset-0 h-full w-full object-cover grayscale-[0.5] transition-all duration-1000 group-hover:scale-[1.03] group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 flex items-end justify-between gap-4">
                  <div>
                    <p className="font-display text-lg md:text-xl text-bone-50 leading-tight">{item.caption}</p>
                  </div>
                  <span className="numeric-roman text-[0.7rem] tracking-widest text-champagne/85">
                    {item.year}
                  </span>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerChildren>
      </div>
    </section>
  );
}
