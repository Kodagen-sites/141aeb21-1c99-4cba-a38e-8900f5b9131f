import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import PageHero from "@/components/sections/PageHero";
import { FadeUp, MagneticButton } from "@/components/motion";
import { siteConfig } from "@/content/site-config";
import manifest from "@/content/asset-manifest.json";

const m = manifest as { images: Record<string, string> };

export function generateStaticParams() {
  return siteConfig.services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
): Promise<Metadata> {
  const { slug } = await params;
  const s = siteConfig.services.find((x) => x.slug === slug);
  if (!s) return { title: "Service" };
  return { title: s.name, description: s.summary };
}

export default async function ServiceDetailPage(
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const s = siteConfig.services.find((x) => x.slug === slug);
  if (!s) notFound();

  const idx = siteConfig.services.findIndex((x) => x.slug === slug);
  const next = siteConfig.services[(idx + 1) % siteConfig.services.length];

  return (
    <>
      <PageHero
        eyebrow={`${s.eyebrow} · House discipline`}
        title={s.name}
        image={m.images?.[s.imageSlot] || s.imageFallback}
        intro={s.summary}
      />

      <section className="section-pad bg-ink-900">
        <div className="container-narrow grid grid-cols-1 md:grid-cols-12 gap-12">
          <FadeUp className="md:col-span-7">
            <p className="eyebrow mb-6">On the bench</p>
            {s.body.map((p, i) => (
              <p
                key={i}
                className="mb-6 text-[1.06rem] leading-relaxed font-light text-bone-100/80 max-w-[58ch] last:mb-0"
              >
                {p}
              </p>
            ))}
          </FadeUp>

          <FadeUp delay={0.1} className="md:col-span-4 md:col-start-9">
            <div className="border-t border-bone-50/15 pt-6">
              <p className="eyebrow mb-6">Particulars</p>
              <dl className="space-y-5">
                {s.detail.map((d) => (
                  <div key={d.label} className="flex flex-col">
                    <dt className="text-[0.7rem] uppercase tracking-[0.22em] text-bone-200/55">
                      {d.label}
                    </dt>
                    <dd className="mt-1 font-display text-xl text-bone-50">{d.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </FadeUp>
        </div>
      </section>

      <section className="section-pad bg-ink-800 border-t border-bone-50/5">
        <div className="container-narrow text-center">
          <FadeUp>
            <p className="eyebrow mb-8">By appointment</p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="font-display text-[clamp(2rem,5vw,4rem)] leading-tight tracking-tight text-bone-50 max-w-3xl mx-auto">
              <span className="font-light italic">If this</span> is the kind of work{" "}
              <span className="font-semibold text-champagne">you mean to begin,</span> write to us.
            </h2>
          </FadeUp>
          <FadeUp delay={0.2}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-8">
              <MagneticButton
                href="/contact"
                className="group inline-flex items-center gap-3 border border-champagne px-9 py-5 text-[0.78rem] tracking-[0.22em] uppercase text-bone-50 hover:bg-champagne hover:text-ink-900 transition-colors duration-500"
              >
                Request an audience
                <span className="block h-px w-6 bg-current transition-all duration-500 group-hover:w-12" />
              </MagneticButton>
              <Link
                href={`/services/${next.slug}`}
                className="text-[0.78rem] tracking-[0.22em] uppercase text-bone-200/75 underline-offset-8 hover:text-bone-50 hover:underline"
              >
                Next · {next.name}
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
