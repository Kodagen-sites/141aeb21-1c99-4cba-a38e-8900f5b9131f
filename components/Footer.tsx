import Link from "next/link";
import { siteConfig } from "@/content/site-config";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-ink-900 border-t border-bone-50/5 mt-12">
      {/* FT2 — Asymmetric Editorial */}
      <div className="container-narrow section-pad">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-10">
          <div className="md:col-span-7">
            <p className="eyebrow mb-4">House statement</p>
            <h3 className="font-display text-3xl md:text-5xl leading-[1.05] tracking-tight text-bone-50">
              <span className="font-light italic">A watch </span>
              <span>is the slow </span>
              <span className="font-light italic">company </span>
              <span>of a working life. </span>
              <span className="text-bone-200/60">We are simply the bench that keeps it.</span>
            </h3>
          </div>
          <div className="md:col-span-5 md:pl-10 md:border-l md:border-bone-50/10">
            <p className="eyebrow mb-4">Atelier</p>
            <address className="not-italic text-bone-100/80 text-[0.95rem] leading-relaxed font-light">
              {siteConfig.contact.address}
              <br />
              <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-champagne transition-colors">
                {siteConfig.contact.email}
              </a>
              <br />
              <span className="text-bone-200/55">{siteConfig.contact.hours}</span>
            </address>
            <div className="mt-8 flex flex-col gap-2">
              {Object.entries(siteConfig.socials).map(([k, v]) => (
                <a
                  key={k}
                  href={v}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[0.78rem] tracking-widest uppercase text-bone-200/70 hover:text-champagne transition-colors"
                >
                  {k}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-bone-50/5 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="flex items-baseline gap-6">
            <span className="font-display text-2xl tracking-[0.34em] text-bone-50">
              {siteConfig.brand.wordmark}
            </span>
            <span className="text-[0.6rem] uppercase tracking-[0.32em] text-bone-200/50">
              Est. MCMLXXIII
            </span>
          </div>
          <div className="flex items-center gap-8 text-[0.7rem] tracking-widest uppercase text-bone-200/55">
            {siteConfig.legal.map((l) => (
              <Link key={l.href} href={l.href} className="hover:text-bone-50 transition-colors">
                {l.label}
              </Link>
            ))}
            <span className="text-bone-200/40">© {year} {siteConfig.brand.name}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
