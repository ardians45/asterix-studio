"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useLenis } from "lenis/react";
import ClientStack from "./ClientStack";
import { works, clients, isExternal, type Work } from "./data";

type Filter = "all" | Work["category"];

const FILTERS: { id: Filter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "web", label: "Websites" },
  { id: "ux", label: "UI/UX case studies" },
  { id: "systems", label: "Systems & 3D" },
];

const years = [...works.map((w) => Number(w.year)), 2024]; // 2024: first client sites
const YEAR_RANGE =
  Math.min(...years) === Math.max(...years) ? `${years[0]}` : `${Math.min(...years)}–${Math.max(...years)}`;

function Featured({ work }: { work: Work }) {
  const lenis = useLenis();
  const [playing, setPlaying] = useState(false);

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    const el = document.getElementById(target.replace(/^#/, ""));
    if (!el) return;
    e.preventDefault();
    if (lenis) lenis.scrollTo(el as HTMLElement, { offset: -72 });
    else el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="pf-wk-feat" data-playing={playing}>
      <Image
        src={work.image}
        alt={`${work.title} race-day dashboard`}
        fill
        sizes="(min-width: 768px) 80vw, 100vw"
        className="object-cover"
      />
      <span className="pf-wk-feat-shade" aria-hidden="true" />
      {playing && work.video && (
        <video src={work.video} poster={work.poster} muted controls playsInline autoPlay preload="none" onEnded={() => setPlaying(false)} />
      )}
      <button
        type="button"
        className="pf-wk-play"
        aria-label={playing ? `Close ${work.title} video` : `Play ${work.title} video`}
        onClick={() => setPlaying((p) => !p)}
      >
        {playing ? (
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 5l14 14M19 5L5 19" stroke="currentColor" strokeWidth="3" strokeLinecap="round" fill="none" /></svg>
        ) : (
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>
        )}
      </button>
      <div className="pf-wk-feat-info">
        <span className="pf-label text-white">Featured · {work.year}</span>
        <h3 className="pf-wk-ftitle">{work.title}</h3>
        <p className="pf-wk-kind">{work.summary ?? work.kind}</p>
        {work.chips && (
          <div className="pf-wk-pills">
            {work.chips.map((c) => (
              <span key={c} className="pf-wk-pill">{c}</span>
            ))}
          </div>
        )}
        <div className="pf-wk-links">
          <a href={work.href} onClick={(e) => scrollTo(e, work.href)} className="pf-wk-link">
            See the full lap →
          </a>
          <a href="#20fit" onClick={(e) => scrollTo(e, "#20fit")} className="pf-wk-link">
            See the 20FIT stack →
          </a>
        </div>
      </div>
    </div>
  );
}

export default function PortfolioWork() {
  const [filter, setFilter] = useState<Filter>("all");
  const [fading, setFading] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  const choose = (next: Filter) => {
    if (next === filter) return;
    if (timer.current) clearTimeout(timer.current);
    setFading(true);
    timer.current = setTimeout(() => {
      setFilter(next);
      setFading(false);
    }, 200);
  };

  const visible = works.filter((w) => filter === "all" || w.category === filter);
  const featured = visible.find((w) => w.featured);
  const rest = visible.filter((w) => !w.featured);
  const showClients = filter === "all" || filter === "web";
  const lastWide = rest.length % 2 === 1;

  return (
    <section id="work" className="relative bg-[var(--pf-butter)] text-[var(--pf-ink)] pt-16 md:pt-24 pb-24 md:pb-36">
      <div className="pf-shell">
        <div className="pf-work-head">
          <h2 className="pf-heading">
            Selected <span className="pf-script-inline">work</span>
          </h2>
          <p className="pf-label hidden md:block" aria-live="polite">
            {visible.length + (showClients ? clients.length : 0)} projects · {YEAR_RANGE}
          </p>
        </div>

        <div className="pf-wk-filters" role="group" aria-label="Filter projects">
          {FILTERS.map((f) => (
            <button key={f.id} type="button" className="pf-wk-chip" aria-pressed={filter === f.id} onClick={() => choose(f.id)}>
              {f.label}
            </button>
          ))}
        </div>

        <div className="pf-wk-list" data-fade={fading ? "out" : "in"}>
          {featured && <Featured key={featured.title} work={featured} />}
          {showClients && <ClientStack />}
          <div className="pf-wk-grid">
            {rest.map((w, i) => {
              const ext = isExternal(w.href);
              const wide = lastWide && i === rest.length - 1;
              return (
                <Link
                  key={w.title}
                  href={w.href}
                  {...(ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  onClick={w.href === "#" ? (e) => e.preventDefault() : undefined}
                  className="pf-wk-card"
                  data-wide={wide}
                >
                  <div className="pf-wk-media">
                    <Image
                      src={w.image}
                      alt={`${w.title} preview`}
                      fill
                      sizes={wide ? "(min-width: 768px) 80vw, 100vw" : "(min-width: 768px) 40vw, 100vw"}
                      className="object-cover object-top"
                    />
                  </div>
                  <div className="pf-wk-row">
                    <h3 className="pf-wk-title">
                      {w.title} <span aria-hidden="true">{ext ? "↗" : "→"}</span>
                    </h3>
                    <span className="pf-wk-year">{w.year}</span>
                  </div>
                  <p className="pf-wk-kind">{w.kind}</p>
                  {w.impact && <span className="pf-wk-impact">{w.impact}</span>}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
