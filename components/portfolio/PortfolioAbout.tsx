"use client";

import Image from "next/image";
import { useRef } from "react";
import { m, useScroll, useTransform, useReducedMotion } from "framer-motion";

const FACTS = [
  { big: "2nd", small: "MIA national UI/UX, out of 200+ teams" },
  { big: "100", small: "PageSpeed score on the Paletindo e-catalog" },
  { big: "#1", small: "Google organic rank for Paletindo's main keyword" },
  { big: "+180%", small: "WhatsApp inquiries after the SR Laundry rebuild" },
];

export default function PortfolioAbout() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start start"] });
  const scale = useTransform(scrollYProgress, [0, 1], reduced ? [1, 1] : [0.72, 1]);
  const radius = useTransform(scrollYProgress, [0, 1], reduced ? [28, 28] : [64, 28]);

  return (
    <section ref={ref} id="about" className="relative bg-[var(--pf-butter)] text-[var(--pf-ink)] py-20 md:py-28">
      <div className="pf-wrap">
        <h2 className="pf-label mb-8">About</h2>

        <m.div style={{ scale, borderRadius: radius }} className="relative aspect-[16/10] md:aspect-[21/9] w-full overflow-hidden bg-[var(--pf-ink)] origin-top">
          <Image src="/profile.webp" alt="Ardian Setiawan at work" fill sizes="(min-width: 1280px) 1200px, 100vw" className="object-cover object-[50%_35%]" />
          <div className="absolute inset-0 pf-holo mix-blend-overlay opacity-40" aria-hidden="true" />
        </m.div>

        <p className="pf-statement mt-12 md:mt-16">
          <span className="pf-statement-indent" aria-hidden="true" />
          Ardian is a designer who ships the code too. Research, interface, Next.js build and SEO — one person, one desk, no handoff lost in between.
        </p>

        <ul className="mt-14 md:mt-20 grid grid-cols-2 lg:grid-cols-4 gap-px bg-[var(--pf-ink)] border border-[var(--pf-ink)]">
          {FACTS.map((f) => (
            <li key={f.big} className="bg-[var(--pf-butter)] p-5 md:p-7">
              <span className="block pf-display text-5xl md:text-6xl font-black tracking-tight">{f.big}</span>
              <span className="mt-2 block text-sm md:text-base leading-snug">{f.small}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
