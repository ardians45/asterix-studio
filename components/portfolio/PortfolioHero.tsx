"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import InkTrail from "./InkTrail";
import { LiquidBlob } from "./LiquidBlob";

const GadgetScene = dynamic(() => import("./GadgetScene"), { ssr: false });

export default function PortfolioHero() {
  // three.js is the heaviest thing on the page: fetch it only once the browser is idle, so the
  // wordmark paints and the page becomes interactive first.
  const [showGadget, setShowGadget] = useState(false);
  useEffect(() => {
    const go = () => setShowGadget(true);
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(go, { timeout: 2000 });
      return () => window.cancelIdleCallback(id);
    }
    const id = setTimeout(go, 600);
    return () => clearTimeout(id);
  }, []);

  return (
    <section id="top" className="pf-hero relative isolate h-[100svh] min-h-[600px] overflow-hidden bg-[var(--pf-butter)]">
      {/* liquid ink follows the cursor (desktop); phones get a resting blob instead */}
      <InkTrail />
      <LiquidBlob className="pf-enter absolute right-[-30%] bottom-[-8%] w-[120vw] text-[var(--pf-ink)] md:hidden" style={{ ["--d" as string]: "250ms" }} />

      {/* type sits over the ink in "difference", so it flips to yellow wherever ink runs under it */}
      <div className="pf-wrap pf-invert relative pt-[15svh] md:pt-[11svh]">
        <h1 className="pf-lockup">
          <span className="pf-enter pf-wordmark">Ardian</span>
          <span className="pf-enter pf-script" style={{ ["--d" as string]: "160ms" }}>setiawan</span>
          <span className="sr-only"> — UI/UX designer and web developer</span>
        </h1>
        <p className="pf-enter pf-tagline mt-2 md:mt-3" style={{ ["--d" as string]: "300ms" }}>
          UI/UX design, Next.js builds and SEO that ranks — from one desk in South Tangerang.
        </p>
      </div>

      {/* big clear-shell gadget in the middle, overlapping the wordmark */}
      {showGadget && <GadgetScene scale={0.98} className="pf-gadget pointer-events-none absolute inset-0 top-[10svh] z-10" />}

      <span className="pf-dots pf-invert absolute bottom-9 left-5 md:left-12 z-20" aria-hidden="true" />
      <a href="#about" aria-label="Scroll to about" className="pf-scroll pf-invert absolute bottom-5 left-1/2 z-20 grid h-11 w-11 place-items-center">
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 3v18M5 14l7 7 7-7" />
        </svg>
      </a>
    </section>
  );
}
