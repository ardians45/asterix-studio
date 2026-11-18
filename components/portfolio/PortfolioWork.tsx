"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { works, isExternal } from "./data";

const SHAPES = ["handheld", "frame", "pager", "tv"] as const;
// what the lens shows behind each gadget: [cell colour, colour of the big project name]
const LENS: [string, string][] = [
  ["#FF5A4A", "#0E0E0E"],
  ["#B8FF8A", "#0E0E0E"],
  ["#0E0E0E", "#FFD60A"],
  ["#0E0E0E", "#3DDC84"],
  ["#C9A8FF", "#0E0E0E"],
  ["#5B9BFF", "#0E0E0E"],
  ["#5B9BFF", "#FFFFFF"],
  ["#A8E4FF", "#0E0E0E"],
  ["#FF8A00", "#0E0E0E"],
];

export default function PortfolioWork() {
  const gridRef = useRef<HTMLDivElement>(null);

  // The lens position is written straight to CSS variables, so moving the mouse never re-renders.
  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = gridRef.current;
    if (!el || e.pointerType !== "mouse") return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
    el.dataset.lens = "on";
  };
  const onLeave = () => {
    if (gridRef.current) gridRef.current.dataset.lens = "off";
  };

  const tilt = (e: React.PointerEvent<HTMLElement>) => {
    if (e.pointerType !== "mouse") return;
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--rx", `${((e.clientY - r.top) / r.height - 0.5) * -16}deg`);
    el.style.setProperty("--ry", `${((e.clientX - r.left) / r.width - 0.5) * 20}deg`);
  };
  const untilt = (e: React.PointerEvent<HTMLElement>) => {
    e.currentTarget.style.setProperty("--rx", "0deg");
    e.currentTarget.style.setProperty("--ry", "0deg");
  };

  return (
    <section id="work" className="relative bg-[var(--pf-butter)] text-[var(--pf-ink)] pt-16 md:pt-24 pb-24 md:pb-36">
      <div className="pf-shell">
        <div className="pf-work-head">
          <h2 className="pf-heading">
            Selected <span className="pf-script-inline">work</span>
          </h2>
          <p className="pf-label hidden md:block">
            {String(works.length).padStart(2, "0")} projects · 2025
          </p>
        </div>
        <div ref={gridRef} className="pf-grid" data-lens="off" onPointerMove={onMove} onPointerLeave={onLeave}>
          {/* colour layer, only visible through the round lens under the cursor */}
          <div className="pf-lens" aria-hidden="true">
            {works.map((w, i) => (
              <div key={w.title} style={{ background: LENS[i % LENS.length][0], color: LENS[i % LENS.length][1] }}>
                <span>{w.title}</span>
              </div>
            ))}
          </div>

          {works.map((w, i) => {
            const ext = isExternal(w.href);
            return (
              <Link
                key={w.title}
                href={w.href}
                {...(ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="pf-card pf-cell group"
                onPointerMove={tilt}
                onPointerLeave={untilt}
              >
                <div className="pf-object" style={{ ["--float" as string]: `${(i % 3) * -1.3}s` }}>
                  <div className="pf-device" data-shape={SHAPES[i % SHAPES.length]}>
                    <div className="pf-device-screen">
                      <Image src={w.image} alt={`${w.title} screen`} fill sizes="(min-width: 1024px) 300px, (min-width: 640px) 40vw, 80vw" className="object-cover object-top" />
                      <span className="pf-device-sheen" aria-hidden="true" />
                    </div>
                    <div className="pf-device-controls" aria-hidden="true">
                      <span className="pf-dpad" />
                      <span className="pf-grille" />
                      <span className="pf-ab"><i /><i /></span>
                    </div>
                  </div>
                </div>

                <div className="pf-cell-label">
                  <h3>
                    {w.title}
                    <sup>({w.year})</sup>
                  </h3>
                  <span className="pf-cell-icon" aria-hidden="true">{ext ? "↗" : "→"}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
