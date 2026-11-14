"use client";

import Image from "next/image";
import { useRef } from "react";
import { m, useScroll, useTransform, useReducedMotion } from "framer-motion";

export default function PortfolioAbout() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start start"] });
  const scale = useTransform(scrollYProgress, [0, 1], reduced ? [1, 1] : [0.7, 1]);
  const radius = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [48, 0]);

  return (
    <section ref={ref} id="about" className="pf-ripple relative bg-[var(--pf-butter)] text-[var(--pf-ink)] pb-16 md:pb-24">
      {/* media panel grows to the full width of the page as it scrolls in */}
      <m.div style={{ scale, borderRadius: radius }} className="relative h-[62svh] md:h-[86svh] w-full overflow-hidden bg-[var(--pf-ink)] origin-top">
        <Image src="/profile.webp" alt="Ardian Setiawan at work" fill sizes="100vw" className="object-cover object-[50%_32%]" />
        <div className="absolute inset-0 pf-holo mix-blend-overlay opacity-40" aria-hidden="true" />
      </m.div>

      <div className="pf-wrap relative pt-10 md:pt-14">
        <h2 className="pf-label pf-label--tiny md:absolute md:left-8 md:top-[4.4rem] mb-4 md:mb-0">About</h2>
        <p className="pf-statement">
          <span className="pf-statement-indent" aria-hidden="true" />
          Ardian is a designer who ships the code too. Research, interface, Next.js build and SEO — one person, one desk, nothing lost in a handoff.
        </p>
      </div>
    </section>
  );
}
