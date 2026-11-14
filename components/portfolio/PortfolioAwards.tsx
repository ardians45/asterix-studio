"use client";

import Image from "next/image";
import { useState } from "react";
import { achievements } from "./data";

export default function PortfolioAwards() {
  const [active, setActive] = useState(0);

  return (
    <section id="awards" className="relative bg-[var(--pf-butter)] text-[var(--pf-ink)] py-20 md:py-28">
      <div className="pf-wrap">
        <h2 className="pf-heading mb-12 md:mb-16">
          Awards <span className="pf-script-inline">&amp; roles</span>
        </h2>

        <div className="grid gap-10 lg:grid-cols-[1fr_420px] lg:gap-14 items-start">
          <ol className="border-t-2 border-[var(--pf-ink)]">
            {achievements.map((a, i) => (
              <li key={a.title} className="border-b-2 border-[var(--pf-ink)]">
                <button
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  aria-pressed={active === i}
                  className="pf-award-row group grid w-full grid-cols-[4.5rem_1fr] md:grid-cols-[6rem_1fr_auto] items-baseline gap-x-4 py-5 md:py-6 px-3 text-left"
                >
                  <span className="pf-label !text-sm">{a.year}</span>
                  <span>
                    <span className="block pf-display text-2xl md:text-4xl font-black tracking-tight uppercase leading-[1.05]">{a.title}</span>
                    <span className="mt-2 block text-sm md:text-base leading-snug opacity-80">{a.note}</span>
                  </span>
                  <span className="pf-label hidden md:block text-right">{a.org}</span>
                </button>
              </li>
            ))}
          </ol>

          <div className="lg:sticky lg:top-28">
            <div className="pf-device">
              <div className="pf-device-screen !aspect-[4/3]">
                {achievements.map((a, i) => (
                  <Image
                    key={a.image}
                    src={a.image}
                    alt={a.title}
                    fill
                    sizes="(min-width: 1024px) 420px, 92vw"
                    className={`object-cover transition-opacity duration-500 ${active === i ? "opacity-100" : "opacity-0"}`}
                  />
                ))}
                <span className="pf-device-sheen" aria-hidden="true" />
              </div>
              <div className="pf-device-controls" aria-hidden="true">
                <span className="pf-dpad" />
                <span className="pf-grille" />
                <span className="pf-ab"><i /><i /></span>
              </div>
            </div>
            <p className="pf-label mt-4">{achievements[active].org}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
