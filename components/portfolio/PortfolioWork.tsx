"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { LiquidBlob } from "./LiquidBlob";
import { works, isExternal } from "./data";

export default function PortfolioWork() {
  const gridRef = useRef<HTMLDivElement>(null);
  const [blob, setBlob] = useState<{ x: number; y: number; color: string } | null>(null);

  const enter = (e: React.PointerEvent<HTMLElement>, color: string) => {
    if (e.pointerType !== "mouse" || !gridRef.current) return;
    const g = gridRef.current.getBoundingClientRect();
    const c = e.currentTarget.getBoundingClientRect();
    setBlob({ x: c.left - g.left + c.width / 2, y: c.top - g.top + c.height * 0.42, color });
  };

  // Gentle tilt toward the cursor, written straight to CSS variables (no re-render).
  const move = (e: React.PointerEvent<HTMLElement>) => {
    if (e.pointerType !== "mouse") return;
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--rx", `${((e.clientY - r.top) / r.height - 0.5) * -10}deg`);
    el.style.setProperty("--ry", `${((e.clientX - r.left) / r.width - 0.5) * 12}deg`);
  };
  const leave = (e: React.PointerEvent<HTMLElement>) => {
    e.currentTarget.style.setProperty("--rx", "0deg");
    e.currentTarget.style.setProperty("--ry", "0deg");
  };

  return (
    <section id="work" className="relative bg-[var(--pf-butter)] text-[var(--pf-ink)] py-20 md:py-28 overflow-hidden">
      <div className="pf-wrap">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-12 md:mb-16">
          <h2 className="pf-heading">
            Selected <span className="pf-script-inline">work</span>
          </h2>
          <p className="max-w-sm text-base leading-snug">Live client sites and UI/UX case studies, 2025–2026. Hover a device to wake it up.</p>
        </div>

        <div ref={gridRef} className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14 md:gap-y-20" onPointerLeave={() => setBlob(null)}>
          <LiquidBlob
            className="pf-work-blob pointer-events-none absolute left-0 top-0 w-[560px] max-w-none -z-0"
            fill={blob?.color ?? "#111"}
            duration={6}
            style={{
              transform: `translate(${(blob?.x ?? 0) - 280}px, ${(blob?.y ?? 0) - 180}px) scale(${blob ? 1 : 0.4})`,
              opacity: blob ? 1 : 0,
            }}
          />

          {works.map((w, i) => {
            const ext = isExternal(w.href);
            return (
              <Link
                key={w.title}
                href={w.href}
                {...(ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="pf-card group relative z-10 block"
                onPointerEnter={(e) => enter(e, w.blob)}
                onPointerMove={move}
                onPointerLeave={leave}
              >
                <div className="pf-device">
                  <div className="pf-device-screen">
                    <Image src={w.image} alt={`${w.title} screen`} fill sizes="(min-width: 1024px) 380px, (min-width: 640px) 45vw, 92vw" className="object-cover object-top" />
                    <span className="pf-device-sheen" aria-hidden="true" />
                  </div>
                  <div className="pf-device-controls" aria-hidden="true">
                    <span className="pf-dpad" />
                    <span className="pf-grille" />
                    <span className="pf-ab"><i /><i /></span>
                  </div>
                </div>

                <div className="mt-5 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="pf-display text-2xl font-extrabold tracking-tight">
                      {w.title}
                      <span className="pf-arrow" aria-hidden="true">{ext ? " ↗" : " →"}</span>
                    </h3>
                    <p className="pf-label mt-1 !tracking-[0.12em]">{w.kind}</p>
                  </div>
                  <span className="pf-index" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                </div>
                {w.impact && <p className="mt-2 text-sm font-medium">{w.impact}</p>}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
