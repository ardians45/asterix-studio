"use client";

import { useLenis } from "lenis/react";
import AgentConsole from "./AgentConsole";
import InkTrail from "./InkTrail";
import { works } from "./data";

const PROJECTS = String(works.length).padStart(2, "0");

// Callouts around the console (desktop). dx/dy: dot, ax/ay: where the line meets the card, tx/ty: card
// offset from that point. All in percent of the stage; the dots land on the agent nodes / the console edge.
const CALLOUTS = [
  { top: "Now", sub: "Race timing at 20FIT", dx: 76, dy: 27, ax: 76, ay: 12, tx: "-50%", ty: "-100%" },
  { top: `${PROJECTS} Projects`, sub: "shipped", dx: 25, dy: 28, ax: 25, ay: 12, tx: "-50%", ty: "-100%" },
  { top: "2nd place", sub: "MIA UI/UX 2025", dx: 82, dy: 82, ax: 82, ay: 92, tx: "-50%", ty: "0" },
  { top: "Since 2023", sub: "Asterix Studio", dx: 50, dy: 82, ax: 50, ay: 92, tx: "-50%", ty: "0" },
];

const STATS = [
  { value: PROJECTS, label: "projects shipped" },
  { value: "2", label: "UI/UX podiums" },
  { value: "2019 → now", label: "in the lap", href: "#journey" },
];

export default function PortfolioHero() {
  const lenis = useLenis();

  const jump = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (!el) return;
    if (lenis) lenis.scrollTo(el as HTMLElement, { offset: -72 });
    else el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="top" className="pf-hero relative isolate overflow-hidden bg-[var(--pf-butter)] min-h-[100svh] lg:h-[100svh] lg:min-h-[720px]">
      {/* liquid ink follows the cursor (desktop only) */}
      <InkTrail />

      <div className="pf-shell relative grid h-full items-center gap-10 pt-[104px] pb-16 lg:grid-cols-[45fr_55fr] lg:gap-12 lg:pt-[72px] lg:pb-0">
        <div className="flex flex-col items-start gap-6">
          <p className="pf-enter pf-label pf-invert">Software Engineer · AI Orchestrator</p>
          <h1 className="pf-enter pf-invert pf-hero-title" style={{ ["--d" as string]: "120ms" }}>
            <span className="pf-hero-name">Ardian</span>
            <span className="pf-hero-script pf-script">setiawan</span>
            <span className="sr-only"> — software engineer and AI orchestrator</span>
          </h1>
          <p className="pf-enter pf-invert pf-hero-lede" style={{ ["--d" as string]: "240ms" }}>
            Solid fundamentals, a UX eye, and AI agents on my team. I find the real problem first, then ship the fix.
          </p>
          <div className="pf-enter flex flex-wrap gap-3" style={{ ["--d" as string]: "340ms" }}>
            <a href="#contact" onClick={(e) => jump(e, "#contact")} className="pf-hero-btn pf-hero-btn--ink">
              Start a project
            </a>
            <a href="#work" onClick={(e) => jump(e, "#work")} className="pf-hero-btn pf-hero-btn--line">
              See the work
            </a>
          </div>
          <div className="pf-enter pf-stats pf-invert w-full" style={{ ["--d" as string]: "440ms" }}>
            {STATS.map((s) =>
              s.href ? (
                <a key={s.label} href={s.href} onClick={(e) => jump(e, s.href)} className="pf-stat">
                  <b>{s.value}</b>
                  <span>{s.label}</span>
                </a>
              ) : (
                <div key={s.label} className="pf-stat">
                  <b>{s.value}</b>
                  <span>{s.label}</span>
                </div>
              )
            )}
          </div>
        </div>

        <div className="pf-stage">
          <AgentConsole className="pf-stage-console" />
          <svg className="pf-callout-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            {CALLOUTS.map((c) => (
              <line key={c.top} x1={c.dx} y1={c.dy} x2={c.ax} y2={c.ay} />
            ))}
          </svg>
          <ul className="pf-callouts">
            {CALLOUTS.map((c) => (
              <li
                key={c.top}
                className="pf-callout"
                style={{ ["--dx" as string]: `${c.dx}%`, ["--dy" as string]: `${c.dy}%`, ["--ax" as string]: `${c.ax}%`, ["--ay" as string]: `${c.ay}%`, ["--tx" as string]: c.tx, ["--ty" as string]: c.ty }}
              >
                <span className="pf-callout-dot" aria-hidden="true" />
                <span className="pf-callout-card">
                  <b>{c.top}</b>
                  <span>{c.sub}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <a href="#about" aria-label="Scroll to about" className="pf-scroll pf-scroll--end pf-invert absolute bottom-5 right-4 z-20 grid h-11 w-11 place-items-center md:right-8">
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 3v18M5 14l7 7 7-7" />
        </svg>
      </a>
    </section>
  );
}
