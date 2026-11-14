"use client";

import dynamic from "next/dynamic";
import { LiquidBlob, InkCurl } from "./LiquidBlob";

const GadgetScene = dynamic(() => import("./GadgetScene"), { ssr: false });

export default function PortfolioHero() {
  return (
    <section id="top" className="pf-hero relative isolate min-h-[100svh] overflow-hidden bg-[var(--pf-butter)] text-[var(--pf-ink)]">
      {/* ink blob + curl behind everything, with a soft cast shadow */}
      <LiquidBlob className="pf-enter pf-shadow absolute right-[-18%] bottom-[-4%] w-[120vw] md:right-[-2%] md:bottom-auto md:top-[44%] md:w-[42vw] max-w-[640px] text-[var(--pf-ink)] -z-10" style={{ ["--d" as string]: "250ms" }} />
      <InkCurl className="pf-enter pf-shadow absolute right-[30%] bottom-[-2%] w-[22vw] max-w-[300px] text-[var(--pf-ink)] -z-10 hidden md:block rotate-[200deg]" style={{ ["--d" as string]: "350ms" }} />

      <div className="pf-wrap relative flex min-h-[100svh] flex-col justify-start md:justify-center pt-24 md:pt-28 pb-[46svh] md:pb-24">
        <p className="pf-enter pf-label mb-4 md:mb-6">UI/UX designer &amp; web developer — South Tangerang, ID</p>

        <h1 className="relative leading-none">
          <span className="pf-enter pf-wordmark block">Ardian</span>
          <span className="pf-enter pf-script block -mt-[0.32em] ml-[18%] md:ml-[34%]" style={{ ["--d" as string]: "180ms" }}>
            setiawan
          </span>
          <span className="sr-only"> — UI/UX designer and web developer</span>
        </h1>

        <p className="pf-enter mt-6 md:mt-8 max-w-md text-base md:text-lg font-medium leading-snug" style={{ ["--d" as string]: "320ms" }}>
          I design the interface and write the Next.js that ships it. 2nd place nationally in UI/UX (MIA 2025), sites that score 100 on PageSpeed.
        </p>

        <div className="pf-enter mt-8 flex flex-wrap gap-3" style={{ ["--d" as string]: "420ms" }}>
          <a href="#work" className="pf-btn pf-btn--ink">See the work</a>
          <a href="mailto:ardians1945@gmail.com" className="pf-btn">Email me</a>
        </div>
      </div>

      {/* chrome gadget, overlapping the wordmark like a sticker */}
      <GadgetScene className="pf-enter pf-gadget pointer-events-none absolute inset-y-0 right-0 w-full md:w-[62%] z-10" />

      <a href="#about" aria-label="Scroll to about" className="pf-scroll absolute bottom-6 left-1/2 -translate-x-1/2 z-20 grid h-11 w-11 place-items-center rounded-full">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          <path d="M12 4v16M5 13l7 7 7-7" />
        </svg>
      </a>
      <p className="pf-label absolute bottom-8 left-4 md:left-8 z-20 hidden sm:block">Available for freelance — 2026</p>
    </section>
  );
}
