/**
 * Naija Watch — Generation Fingerprint
 * archetype: G (premium tier — T1 8s Veo workshop hero)
 * style: S12 Luxury Horology · voice: V1 Heritage Understated
 * scene: V2 · motion: M3_cinematic · card: CV4 · header: center-logo-split
 * footer: FT2 · hero: HO5/H6/E2 · contact: CT3 · about: AB3 · stats: ST2 · cta: CTA1
 * narrative_shape: craft-process · industry_tone: watchmaker-meditative
 */

import manifest from "./asset-manifest.json";

const m = manifest as { images: Record<string, string>; videos: Record<string, string> };

const fb = {
  hero: "https://images.unsplash.com/photo-1518131945814-25c47cd09fd5?auto=format&fit=crop&w=2400&q=80",
  workshop: "https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&w=1800&q=80",
  movement: "https://images.unsplash.com/photo-1606112218979-25b2b9b6b96e?auto=format&fit=crop&w=1800&q=80",
  vintage: "https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&w=1800&q=80",
  bench: "https://images.unsplash.com/photo-1565462900346-13d0d33e8a3e?auto=format&fit=crop&w=1800&q=80",
  founder: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1200&q=80",
  collector: "https://images.unsplash.com/photo-1611843467160-25afb8df1074?auto=format&fit=crop&w=1800&q=80",
};

const img = (slot: string, fallback: string) => m.images?.[slot] || fallback;
const vid = (slot: string) => m.videos?.[slot] || "";

export type Service = {
  slug: string;
  name: string;
  eyebrow: string;
  summary: string;
  body: string[];
  detail: { label: string; value: string }[];
  imageUrl: string;
};

export const siteConfig = {
  brand: {
    name: "Naija Watch",
    wordmark: "NAIJA WATCH",
    tagline: "Atelier horloger · Lagos, since 1973",
    accent: "#c8a96a",
  },
  headerVariant: "center-logo-split",
  footer: { variant: "FT2" },
  legal: [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
  ],
  socials: {
    instagram: "https://instagram.com/naijawatch",
    linkedin: "https://linkedin.com/company/naijawatch",
  },
  contact: {
    email: "atelier@naijawatch.com",
    phone: "+234 1 277 0840",
    address: "12 Marina, Lagos Island, Lagos, Nigeria",
    hours: "By appointment · Monday — Saturday",
  },
  seo: {
    siteUrl: "https://naijawatch.com",
    title: "Naija Watch · Atelier horloger, Lagos since 1973",
    description:
      "Custom calibres, vintage restoration, and private collector services from the Naija Watch atelier in Lagos. Quiet horology since 1973.",
  },
  hero: {
    videoSlot: "scene-1",
    posterSlot: "scene-1-end",
    posterFallback: fb.hero,
    eyebrow: "Lagos · 1973",
    h1Lines: [
      { text: "Hands", weight: "light" },
      { text: "that remember", weight: "italic" },
      { text: "time.", weight: "bold" },
    ],
    body: "Three rooms above Marina. A small bench. A few collectors, fewer pieces. We make calibres, restore the dead, and keep what cannot be replaced.",
    primaryCta: { label: "Request an audience", href: "/contact" },
    secondaryCta: { label: "Read the house", href: "/about" },
    get videoUrl() { return vid("scene-1"); },
    get poster() { return img("scene-1-end", fb.hero); },
  },
  valueProp: {
    eyebrow: "House discipline",
    statement:
      "Naija Watch was founded in 1973 by Adekunle Bashorun upon his return from Glashütte. Fifty-two years later we still answer the bench in person.",
  },
  services: [
    {
      slug: "custom-movements",
      name: "Custom movements",
      eyebrow: "I",
      summary: "Calibres designed and assembled in-house, one piece at a time.",
      body: [
        "We design and assemble custom mechanical movements in our Lagos workshop. Each calibre begins with a conversation about wrist, weight, and the way you read the day.",
        "Three calibres a year. No more. The bench produces what the bench can answer for.",
      ],
      detail: [
        { label: "Lead time", value: "18 — 24 months" },
        { label: "Pieces per year", value: "Three" },
        { label: "Service", value: "Lifetime, in-house" },
      ],
      imageSlot: "service-movements",
      imageFallback: fb.movement,
    },
    {
      slug: "vintage-restoration",
      name: "Vintage restoration",
      eyebrow: "II",
      summary: "Patient restoration of mid-century pieces, returned exactly as found.",
      body: [
        "We restore mid-century pieces — primarily 1940 — 1975 — to running order without disguising the years they have lived.",
        "We do not polish dials. We do not over-restore. We return the piece exactly as we found it, now keeping time.",
      ],
      detail: [
        { label: "House preference", value: "1940 — 1975" },
        { label: "Average duration", value: "9 — 14 months" },
        { label: "Documentation", value: "Photographic, full" },
      ],
      imageSlot: "service-vintage",
      imageFallback: fb.vintage,
    },
    {
      slug: "private-collector-services",
      name: "Private collector services",
      eyebrow: "III",
      summary: "Quiet acquisition, valuation, and stewardship for serious cabinets.",
      body: [
        "We act on behalf of a small number of private cabinets — sourcing, valuing, and stewarding pieces across Europe, Japan, and West Africa.",
        "Discretion is non-negotiable. References on request, after meeting.",
      ],
      detail: [
        { label: "Clients", value: "Maximum twelve" },
        { label: "Engagement", value: "Annual retainer" },
        { label: "Scope", value: "Sourcing · stewardship · valuation" },
      ],
      imageSlot: "service-collector",
      imageFallback: fb.collector,
    },
  ] as (Service & { imageSlot: string; imageFallback: string })[],
  showcase: {
    eyebrow: "From the bench",
    h2: "Recent work, in order of departure.",
    body: "A small inventory of pieces that have passed through the atelier this year. None are for sale; some may be visited by appointment.",
    items: [
      { slot: "section-showcase-1", fallback: fb.workshop, caption: "Calibre 12.73 — second sample", year: "2025" },
      { slot: "section-showcase-2", fallback: fb.bench, caption: "1956 chronograph, full restoration", year: "2025" },
      { slot: "section-showcase-3", fallback: fb.movement, caption: "Manual wind, gilt finishing", year: "2024" },
      { slot: "section-showcase-4", fallback: fb.vintage, caption: "Owner archive, third inspection", year: "2024" },
    ],
  },
  manifesto: {
    eyebrow: "What the bench answers for",
    h2: [
      { text: "A watch", weight: "light" },
      { text: "is a quiet", weight: "italic" },
      { text: "promise", weight: "regular" },
      { text: "between", weight: "light" },
      { text: "two hands.", weight: "bold" },
    ],
    attribution: "— A. Bashorun, founder, 1973",
  },
  stats: {
    variant: "ST2",
    items: [
      { label: "Founded", value: "1973", note: "Marina, Lagos" },
      { label: "Pieces per year", value: "3", note: "Custom calibres" },
      { label: "Restorations completed", value: "412", note: "Since 1973" },
      { label: "Master watchmakers", value: "4", note: "On the bench" },
    ],
  },
  cta: {
    variant: "CTA1",
    eyebrow: "Audience",
    h2: "An appointment is the only catalogue.",
    body: "Write, and we will write back. Most matters do not require a meeting; some do. The atelier prefers to know what you carry before we open the door.",
    primary: { label: "Request an audience", href: "/contact" },
    secondary: { label: "Letter to the house", href: "mailto:atelier@naijawatch.com" },
  },
  about: {
    variant: "AB3",
    eyebrow: "The house",
    h1: "Three rooms above Marina, since 1973.",
    intro:
      "Adekunle Bashorun returned from Glashütte in 1971 with two suitcases of tools and the unfinished sketch of a calibre. He opened the atelier on Marina, Lagos, in 1973 — three rooms, four benches, no shopfront. The arrangement has not changed.",
    body: [
      "Naija Watch has never sold watches in a window. We do not advertise. We answer the door because someone has written to us.",
      "Today the bench is held by four watchmakers — Adekunle, his daughter Tomilola, and two apprentices who have been with us nine and fourteen years. We deliver three custom calibres a year. We restore between thirty and forty pieces. We do not take on more.",
      "We do not believe a watch is a possession. We believe it is something a person is willing to spend a part of their life next to. Our work is to be deserving of that.",
    ],
    timeline: [
      { year: "1971", note: "Founder returns from Glashütte to Lagos." },
      { year: "1973", note: "Atelier opens on Marina, Lagos Island." },
      { year: "1984", note: "First custom calibre delivered to a private cabinet." },
      { year: "1997", note: "Vintage restoration formalised as second house service." },
      { year: "2009", note: "Private collector services introduced — twelve cabinets, fixed." },
      { year: "2024", note: "Calibre 12.73 enters its first production sample." },
    ],
    portraitSlot: "section-founder",
    portraitFallback: fb.founder,
  },
  benefits: {
    variant: "BN4",
    eyebrow: "House discipline",
    h2: "Six things we do not negotiate.",
    items: [
      { n: "01", title: "We do not polish dials.", body: "Mid-century pieces carry the marks of their years. We will not erase them." },
      { n: "02", title: "We do not over-restore.", body: "Every replaced component is documented. If a part can be saved, it is saved." },
      { n: "03", title: "We do not sell from a window.", body: "The atelier has no retail front. Pieces are visited by appointment only." },
      { n: "04", title: "We deliver three calibres a year.", body: "More is not better. The bench produces what the bench can answer for." },
      { n: "05", title: "We answer the door in person.", body: "Adekunle, Tomilola, or one of two apprentices. No reception desk. No middlemen." },
      { n: "06", title: "We do not advertise.", body: "Our clients have written to us, or written on behalf of someone who did." },
    ],
  },
  contactPage: {
    variant: "CT3",
    eyebrow: "Audience",
    h1: "Write before you visit.",
    body: [
      "The atelier is on Marina, Lagos Island. The door opens by appointment only — most often Tuesday through Saturday, late morning.",
      "Write to the address below. We will reply within five working days. If the matter is urgent, please mark it so in the subject line and we will read it sooner.",
    ],
    addressLines: ["Naija Watch · Atelier", "12 Marina, Lagos Island", "Lagos, Nigeria"],
    email: "atelier@naijawatch.com",
    phone: "+234 1 277 0840",
    note: "Atelier visits are private. We do not maintain a public reception area.",
  },
};

export type SiteConfig = typeof siteConfig;
