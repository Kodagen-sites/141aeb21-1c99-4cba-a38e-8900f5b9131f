import type { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import { FadeUp, MagneticButton } from "@/components/motion";
import { siteConfig } from "@/content/site-config";
import manifest from "@/content/asset-manifest.json";

const m = manifest as { images: Record<string, string> };

export const metadata: Metadata = {
  title: "Audience",
  description:
    "Visits to the Naija Watch atelier are by appointment only. Write to us before you come.",
};

// CT3 — Type-Only No-Map
export default function ContactPage() {
  const c = siteConfig.contactPage;
  return (
    <>
      <PageHero
        eyebrow={c.eyebrow}
        title={c.h1}
        image={m.images?.["section-contact-hero"] || siteConfig.services[0].imageFallback}
        intro={c.body[0]}
      />

      <section className="section-pad bg-ink-900">
        <div className="container-narrow grid grid-cols-1 md:grid-cols-12 gap-14">
          <FadeUp className="md:col-span-7">
            <p className="eyebrow mb-6">Notes for visitors</p>
            {c.body.map((p, i) => (
              <p
                key={i}
                className="mb-6 text-[1.06rem] leading-relaxed font-light text-bone-100/85 max-w-[58ch] last:mb-0"
              >
                {p}
              </p>
            ))}

            <p className="mt-12 mb-6 eyebrow">Write to us</p>
            <a
              href={`mailto:${c.email}`}
              className="block font-display text-[clamp(2rem,4.6vw,3.6rem)] leading-tight tracking-tight text-bone-50 hover:text-champagne transition-colors duration-500 underline-offset-[12px] hover:underline"
            >
              {c.email}
            </a>

            <div className="mt-12">
              <MagneticButton
                href={`mailto:${c.email}?subject=Audience%20request`}
                className="group inline-flex items-center gap-3 border border-champagne px-9 py-5 text-[0.78rem] tracking-[0.22em] uppercase text-bone-50 hover:bg-champagne hover:text-ink-900 transition-colors duration-500"
              >
                Write directly
                <span className="block h-px w-6 bg-current transition-all duration-500 group-hover:w-12" />
              </MagneticButton>
            </div>
          </FadeUp>

          <FadeUp delay={0.15} className="md:col-span-4 md:col-start-9 md:pt-2">
            <div className="space-y-10">
              <div className="border-t border-bone-50/15 pt-6">
                <p className="eyebrow mb-3">Atelier</p>
                <address className="not-italic font-display text-xl text-bone-50 leading-relaxed">
                  {c.addressLines.map((l) => <span key={l} className="block">{l}</span>)}
                </address>
              </div>

              <div className="border-t border-bone-50/15 pt-6">
                <p className="eyebrow mb-3">Hours</p>
                <p className="font-light text-bone-100/85">{siteConfig.contact.hours}</p>
              </div>

              <div className="border-t border-bone-50/15 pt-6">
                <p className="eyebrow mb-3">Telephone</p>
                <a
                  href={`tel:${c.phone.replace(/\s/g, "")}`}
                  className="font-display text-xl text-bone-50 hover:text-champagne transition-colors"
                >
                  {c.phone}
                </a>
              </div>

              <div className="border-t border-bone-50/15 pt-6">
                <p className="eyebrow mb-3">Note</p>
                <p className="text-[0.95rem] font-light italic text-bone-100/75 leading-relaxed">
                  {c.note}
                </p>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
