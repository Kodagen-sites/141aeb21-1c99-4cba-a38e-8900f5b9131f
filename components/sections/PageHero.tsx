import { FadeUp } from "@/components/motion";

type Props = {
  eyebrow: string;
  title: string;
  image: string;
  intro?: string;
};

export default function PageHero({ eyebrow, title, image, intro }: Props) {
  return (
    <section className="relative h-[78svh] min-h-[520px] w-full overflow-hidden">
      <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-b from-ink-900/55 via-ink-900/30 to-ink-900" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(11,10,8,0.5)_100%)]" />

      <div className="relative h-full container-narrow flex flex-col justify-end pb-20 md:pb-24">
        <FadeUp>
          <span className="eyebrow">{eyebrow}</span>
        </FadeUp>
        <FadeUp delay={0.1}>
          <h1 className="mt-6 font-display text-[clamp(2.6rem,7vw,6rem)] leading-[1] tracking-[-0.012em] text-bone-50 max-w-[18ch]">
            {title}
          </h1>
        </FadeUp>
        {intro && (
          <FadeUp delay={0.2}>
            <p className="mt-8 max-w-2xl text-[1.05rem] leading-relaxed font-light text-bone-100/75">
              {intro}
            </p>
          </FadeUp>
        )}
      </div>
    </section>
  );
}
