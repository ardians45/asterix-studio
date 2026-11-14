"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import InkTrail from "./InkTrail";
import { works, isExternal } from "./data";

const SHAPES = ["handheld", "frame", "pager", "tv"] as const;
const INK = "#0E0E0E";

export default function PortfolioWork() {
  const [color, setColor] = useState("#FF5A1F");

  // Gentle tilt toward the cursor, written straight to CSS variables (no re-render).
  const move = (e: React.PointerEvent<HTMLElement>) => {
    if (e.pointerType !== "mouse") return;
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--rx", `${((e.clientY - r.top) / r.height - 0.5) * -14}deg`);
    el.style.setProperty("--ry", `${((e.clientX - r.left) / r.width - 0.5) * 18}deg`);
  };
  const leave = (e: React.PointerEvent<HTMLElement>) => {
    e.currentTarget.style.setProperty("--rx", "0deg");
    e.currentTarget.style.setProperty("--ry", "0deg");
  };

  return (
    <section id="work" className="pf-ripple relative isolate bg-[var(--pf-butter)] text-[var(--pf-ink)] pt-6 pb-20 md:pb-28 overflow-hidden">
      {/* the ink picks up the hovered project's colour */}
      <InkTrail className="-z-10" colors={[INK, color, "#FFD60A"]} size={64} />

      <div className="pf-wrap">
        <h2 className="pf-label pf-label--tiny mb-10 md:mb-14">Selected work — 2025/26</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16 md:gap-y-24">
          {works.map((w, i) => {
            const ext = isExternal(w.href);
            return (
              <Link
                key={w.title}
                href={w.href}
                {...(ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="pf-card group relative block"
                onPointerEnter={(e) => e.pointerType === "mouse" && setColor(w.blob === INK || w.blob === "#111111" ? "#8B5CF6" : w.blob)}
                onPointerMove={move}
                onPointerLeave={leave}
              >
                <div className="pf-object" style={{ ["--float" as string]: `${(i % 3) * -1.3}s` }}>
                  <div className="pf-device" data-shape={SHAPES[i % SHAPES.length]}>
                    <div className="pf-device-screen">
                      <Image src={w.image} alt={`${w.title} screen`} fill sizes="(min-width: 1024px) 320px, (min-width: 640px) 40vw, 80vw" className="object-cover object-top" />
                      <span className="pf-device-sheen" aria-hidden="true" />
                    </div>
                    <div className="pf-device-controls" aria-hidden="true">
                      <span className="pf-dpad" />
                      <span className="pf-grille" />
                      <span className="pf-ab"><i /><i /></span>
                    </div>
                  </div>
                </div>

                <div className="pf-card-label">
                  <h3>
                    {w.title}
                    <sup>{ext ? "↗" : "→"}</sup>
                  </h3>
                  <span className="pf-index" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                  <p>{w.impact ?? w.kind}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
