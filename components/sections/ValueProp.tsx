import { FadeUp } from "@/components/motion";
import { siteConfig } from "@/content/site-config";

export default function ValueProp() {
  const v = siteConfig.valueProp;
  return (
    <section className="bg-ink-900 section-pad">
      <div className="container-narrow">
        <FadeUp>
          <p className="eyebrow mb-8">{v.eyebrow}</p>
        </FadeUp>
        <FadeUp delay={0.1}>
          <h2 className="font-display text-[clamp(2rem,5vw,4.2rem)] leading-[1.05] tracking-tight text-bone-50 max-w-5xl">
            <span className="font-light italic">{v.statement.split(". ")[0]}.</span>{" "}
            <span className="text-bone-100/75 font-light">{v.statement.split(". ").slice(1).join(". ")}</span>
          </h2>
        </FadeUp>
      </div>
    </section>
  );
}
