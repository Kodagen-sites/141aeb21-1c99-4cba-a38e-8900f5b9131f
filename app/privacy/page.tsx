import type { Metadata } from "next";
import { siteConfig } from "@/content/site-config";

export const metadata: Metadata = {
  title: "Privacy",
  description: "Privacy notice for the Naija Watch atelier.",
};

export default function PrivacyPage() {
  return (
    <section className="section-pad bg-ink-900 pt-40">
      <div className="container-narrow max-w-3xl">
        <p className="eyebrow mb-4">Notice</p>
        <h1 className="font-display text-[clamp(2.4rem,5vw,4rem)] leading-tight tracking-tight text-bone-50 mb-12">
          Privacy at the atelier.
        </h1>

        <div className="prose-naija space-y-6 text-bone-100/80 font-light leading-relaxed text-[1.02rem]">
          <p>
            The atelier collects only the information a correspondent provides — your name, contact
            details, and the substance of the matter you write to us about. We do not place tracking
            cookies on this website. We do not sell, share, or syndicate visitor data.
          </p>
          <p>
            Correspondence with the atelier is held in confidence. Information shared during an
            audience or restoration is treated as the property of its owner, and is not discussed
            outside the bench without permission.
          </p>
          <p>
            If you would like a copy of the records we hold about you, or wish them removed, write
            to us at <a className="text-champagne hover:underline" href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a>.
            We will reply within five working days.
          </p>
          <p className="text-bone-200/55 text-sm pt-8 border-t border-bone-50/10">
            Last revised — January 2026 · {siteConfig.brand.name}, Lagos.
          </p>
        </div>
      </div>
    </section>
  );
}
