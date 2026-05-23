import { FadeUp } from "@/components/motion";
import { siteConfig } from "@/content/site-config";

export default function Manifesto() {
  const m = siteConfig.manifesto;
  return (
    <section className="bg-ink-800 section-pad border-t border-bone-50/5">
      <div className="container-narrow">
        <FadeUp>
          <p className="eyebrow mb-12 text-center">{m.eyebrow}</p>
        </FadeUp>
        <FadeUp delay={0.1}>
          <blockquote className="font-display text-[clamp(2rem,5.6vw,5rem)] leading-[1.05] tracking-tight text-bone-50 text-center max-w-5xl mx-auto">
            {m.h2.map((seg, i) => (
              <span
                key={i}
                className={
                  seg.weight === "italic" ? "italic font-light text-bone-100" :
                  seg.weight === "bold" ? "font-semibold text-champagne" :
                  seg.weight === "light" ? "font-light text-bone-100/85" :
                  "font-normal"
                }
              >
                {seg.text}{" "}
              </span>
            ))}
          </blockquote>
        </FadeUp>
        <FadeUp delay={0.2}>
          <p className="mt-10 text-center text-[0.8rem] tracking-[0.22em] uppercase text-bone-200/55">
            {m.attribution}
          </p>
        </FadeUp>
      </div>
    </section>
  );
}
