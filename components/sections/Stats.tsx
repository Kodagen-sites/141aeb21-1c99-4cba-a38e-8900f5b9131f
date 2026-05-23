import { FadeUp, NumberCounter } from "@/components/motion";
import { siteConfig } from "@/content/site-config";

// ST2 — Big-Number-Per-Scroll
export default function Stats() {
  return (
    <section className="bg-ink-900 section-pad border-t border-bone-50/5">
      <div className="container-narrow">
        <FadeUp>
          <p className="eyebrow mb-16">By the bench, since 1973</p>
        </FadeUp>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-20 md:gap-y-32 gap-x-16">
          {siteConfig.stats.items.map((stat, i) => (
            <FadeUp key={stat.label} delay={i * 0.1}>
              <div className="flex flex-col">
                <span className="font-display text-[clamp(4rem,12vw,9rem)] leading-[0.95] tracking-tight text-bone-50">
                  {/^\d+$/.test(stat.value) ? (
                    <NumberCounter to={parseInt(stat.value, 10)} />
                  ) : (
                    stat.value
                  )}
                </span>
                <div className="mt-4 max-w-sm">
                  <p className="text-[0.78rem] tracking-[0.24em] uppercase text-champagne/85">
                    {stat.label}
                  </p>
                  <p className="mt-2 text-[1rem] font-light text-bone-100/70">
                    {stat.note}
                  </p>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
