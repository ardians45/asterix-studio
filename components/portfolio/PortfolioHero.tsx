"use client";

import dynamic from "next/dynamic";
import InkTrail from "./InkTrail";
import { LiquidBlob } from "./LiquidBlob";

const GadgetScene = dynamic(() => import("./GadgetScene"), { ssr: false });

export default function PortfolioHero() {
  return (
    <section id="top" className="pf-hero pf-ripple relative isolate h-[100svh] min-h-[600px] overflow-hidden bg-[var(--pf-butter)] text-[var(--pf-ink)]">
      {/* liquid ink follows the cursor (desktop); phones get a resting blob instead */}
      <InkTrail className="-z-10" size={58} />
      <LiquidBlob className="pf-enter pf-shadow absolute right-[-30%] bottom-[-8%] w-[120vw] text-[var(--pf-ink)] -z-10 md:hidden" style={{ ["--d" as string]: "250ms" }} />

      <div className="pf-wrap relative pt-[17svh] md:pt-[14svh]">
        <h1 className="pf-lockup">
          <span className="pf-enter pf-wordmark">Ardian</span>
          <span className="pf-enter pf-script" style={{ ["--d" as string]: "160ms" }}>setiawan</span>
          <span className="sr-only"> — UI/UX designer and web developer</span>
        </h1>
        <p className="pf-enter pf-label pf-label--tiny mt-3 md:mt-4" style={{ ["--d" as string]: "300ms" }}>
          UI/UX designer &amp; web developer — design, Next.js build and SEO — South Tangerang, ID
        </p>
      </div>

      {/* chrome gadget in the middle, overlapping the wordmark like a sticker */}
      <GadgetScene className="pf-enter pf-gadget pointer-events-none absolute inset-0 top-[8svh] z-10" />

      <a href="#about" aria-label="Scroll to about" className="pf-scroll absolute bottom-5 left-1/2 -translate-x-1/2 z-20 grid h-11 w-11 place-items-center rounded-full">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          <path d="M12 4v16M5 13l7 7 7-7" />
        </svg>
      </a>
      <p className="pf-label pf-label--tiny absolute bottom-8 left-4 md:left-8 z-20 hidden sm:block">Available for freelance — 2026</p>
    </section>
  );
}
