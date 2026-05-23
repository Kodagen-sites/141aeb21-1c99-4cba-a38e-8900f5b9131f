"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { CardTiltLayer } from "@/components/motion";
import { cn } from "@/lib/cn";

type Props = {
  href: string;
  eyebrow: string;
  name: string;
  summary: string;
  imageUrl: string;
};

// CV4 Liquid Glass — premium luxury card
export default function ServiceCard({ href, eyebrow, name, summary, imageUrl }: Props) {
  return (
    <CardTiltLayer className="group relative">
      <Link
        href={href}
        className="relative block h-full rounded-sm border border-bone-50/8 bg-ink-800/60 backdrop-blur-xl overflow-hidden transition-all duration-700 hover:border-champagne/50"
      >
        <div className="relative aspect-[4/5] overflow-hidden">
          <img
            src={imageUrl}
            alt={name}
            className="h-full w-full object-cover grayscale-[0.4] transition-all duration-1000 group-hover:scale-[1.04] group-hover:grayscale-0"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/40 to-ink-900/10" />
          <div className="absolute top-6 left-6 text-bone-50/65 font-display italic text-2xl tracking-wide">
            {eyebrow}
          </div>
        </div>

        <div className="relative p-8 md:p-10">
          <h3 className="font-display text-[1.6rem] md:text-[1.85rem] leading-tight tracking-tight text-bone-50 transition-colors duration-500 group-hover:text-champagne">
            {name}
          </h3>
          <p className="mt-4 text-[0.95rem] leading-relaxed font-light text-bone-100/75 max-w-[40ch]">
            {summary}
          </p>
          <div className="mt-8 inline-flex items-center gap-3 text-[0.72rem] tracking-[0.24em] uppercase text-champagne/85">
            Read further
            <span className="block h-px w-8 bg-champagne/85 transition-all duration-500 group-hover:w-16" />
          </div>
        </div>
      </Link>
    </CardTiltLayer>
  );
}
