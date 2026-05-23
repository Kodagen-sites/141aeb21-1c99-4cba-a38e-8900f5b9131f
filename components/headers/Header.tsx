"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { siteConfig } from "@/content/site-config";
import { cn } from "@/lib/cn";

const links = [
  { label: "Services", href: "/services" },
  { label: "The house", href: "/about" },
];
const rightLinks = [
  { label: "Audience", href: "/contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-500",
        scrolled ? "bg-ink-900/80 backdrop-blur-xl border-b border-bone-50/5" : "bg-transparent"
      )}
    >
      <div className="grid grid-cols-3 items-center px-6 md:px-12 py-5">
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => {
            const active = pathname === l.href || pathname?.startsWith(l.href + "/");
            return (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  "text-[0.78rem] tracking-widest uppercase transition-colors",
                  active ? "text-champagne" : "text-bone-100/70 hover:text-bone-50"
                )}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <Link href="/" className="justify-self-center text-center group">
          <span className="block font-display text-[1.05rem] tracking-[0.34em] text-bone-50">
            {siteConfig.brand.wordmark}
          </span>
          <span className="block mt-0.5 text-[0.55rem] tracking-[0.32em] uppercase text-bone-200/55">
            Lagos · Atelier · 1973
          </span>
        </Link>

        <nav className="hidden md:flex items-center justify-end gap-6">
          {rightLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-[0.78rem] tracking-widest uppercase text-champagne hover:text-bone-50 transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <button
          className="md:hidden col-start-3 justify-self-end text-bone-50"
          aria-label="Open menu"
        >
          <span className="block w-6 h-px bg-bone-100 mb-1.5" />
          <span className="block w-6 h-px bg-bone-100" />
        </button>
      </div>
    </header>
  );
}
