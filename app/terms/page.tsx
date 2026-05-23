import type { Metadata } from "next";
import { siteConfig } from "@/content/site-config";

export const metadata: Metadata = {
  title: "Terms",
  description: "Terms of engagement with the Naija Watch atelier.",
};

export default function TermsPage() {
  return (
    <section className="section-pad bg-ink-900 pt-40">
      <div className="container-narrow max-w-3xl">
        <p className="eyebrow mb-4">Notice</p>
        <h1 className="font-display text-[clamp(2.4rem,5vw,4rem)] leading-tight tracking-tight text-bone-50 mb-12">
          Terms of engagement.
        </h1>

        <div className="space-y-6 text-bone-100/80 font-light leading-relaxed text-[1.02rem]">
          <p>
            The atelier accepts engagements by written correspondence only. Verbal agreements
            are not binding upon the house; nor are quotations made before an inspection of the
            piece in question.
          </p>
          <p>
            All work is undertaken at the bench at <em>{siteConfig.contact.address}</em>. The atelier
            may decline to take on a commission at its discretion and is not obliged to give
            reason.
          </p>
          <p>
            Restoration and movement work is invoiced upon completion. Deposits, when requested,
            are refundable up to the moment the bench is opened on the piece.
          </p>
          <p>
            The atelier maintains photographic records of every piece that passes through its
            care. These records are held in confidence and may be released to the owner — or to
            an estate, where one exists — upon request.
          </p>
          <p className="text-bone-200/55 text-sm pt-8 border-t border-bone-50/10">
            Last revised — January 2026 · {siteConfig.brand.name}, Lagos.
          </p>
        </div>
      </div>
    </section>
  );
}
