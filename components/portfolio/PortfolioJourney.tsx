"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLenis } from "lenis/react";
import { journey, journeyFinish } from "./data";

const JourneyScene = dynamic(() => import("./JourneyScene"), { ssr: false });

const CHAPTERS = [...journey, { id: "fin", ...journeyFinish }];
const LAST = CHAPTERS.length - 1;

/**
 * Career timeline as a race track. On tablets and up the section is tall and its content is pinned
 * while scrolling drives the camera down the track; the left column swaps chapter by chapter.
 * On phones and with reduced motion there is no pin: header, one still frame, then every chapter
 * as a stacked row. All chapter text is in the DOM either way.
 */
export default function PortfolioJourney() {
  const lenis = useLenis();
  const sectionRef = useRef<HTMLElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const progress = useRef(0);
  const activeRef = useRef(0);
  const [active, setActive] = useState(0);
  const [isStill, setIsStill] = useState(false);
  const [mountScene, setMountScene] = useState(false);

  // still mode: narrow screens or reduced motion; re-checked when either changes
  useEffect(() => {
    const narrow = window.matchMedia("(max-width: 767px)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setIsStill(narrow.matches || reduced.matches);
    update();
    narrow.addEventListener("change", update);
    reduced.addEventListener("change", update);
    return () => {
      narrow.removeEventListener("change", update);
      reduced.removeEventListener("change", update);
    };
  }, []);

  // three.js is fetched only when the section is about a screen away
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setMountScene(true);
          io.disconnect();
        }
      },
      { rootMargin: "100% 0px 100% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // scroll position -> progress (ref, no re-render) -> progress line (style) and chapter (state, only on change)
  useEffect(() => {
    if (isStill) return;
    const el = sectionRef.current;
    if (!el) return;
    let raf = 0;
    const compute = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      const p = total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 0;
      progress.current = p;
      if (fillRef.current) fillRef.current.style.transform = `scaleX(${p})`;
      const i = Math.min(LAST, Math.floor(p * CHAPTERS.length));
      if (i !== activeRef.current) {
        activeRef.current = i;
        setActive(i);
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(compute);
    };
    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [isStill]);

  const getProgress = useCallback(() => progress.current, []);

  const scrollToY = (top: number) => {
    if (lenis) lenis.scrollTo(top);
    else window.scrollTo({ top, behavior: "smooth" });
  };

  const goChapter = (i: number) => {
    const el = sectionRef.current;
    if (!el) return;
    const total = el.offsetHeight - window.innerHeight;
    const top = el.getBoundingClientRect().top + window.scrollY + total * ((i + 0.5) / CHAPTERS.length);
    scrollToY(top);
  };

  const goHash = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    const el = document.querySelector(href);
    if (!el) return;
    e.preventDefault();
    if (lenis) lenis.scrollTo(el as HTMLElement, { offset: 0 });
    else el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="journey" ref={sectionRef} data-still={isStill} className="pf-journey relative bg-[var(--pf-ink)] text-white">
      <div className="pf-journey-stick">
        <div className="pf-shell">
          <div className="pf-journey-col">
            <div className="pf-journey-head relative z-10">
              <p className="pf-label text-[var(--pf-butter)]">Career · 2019 to now</p>
              <h2 className="pf-heading mt-5 text-[var(--pf-butter)] md:text-[clamp(2.5rem,4.4vw,4.75rem)]">
                The lap <span className="pf-script-inline">so far</span>
              </h2>
            </div>

            <div className="pf-journey-controls relative z-10">
              <nav aria-label="Career splits" className="flex flex-wrap gap-2">
                {CHAPTERS.map((c, i) => (
                  <button
                    key={c.id}
                    type="button"
                    className="pf-pill pf-pill--dark pf-journey-split"
                    aria-current={i === active ? "true" : undefined}
                    onClick={() => goChapter(i)}
                  >
                    {c.split}
                  </button>
                ))}
              </nav>
              <div className="pf-journey-line" aria-hidden="true">
                <div ref={fillRef} />
              </div>
            </div>

            {/* canvas: the pinned backdrop on desktop, a framed still on phones */}
            <div className="pf-journey-canvas" aria-hidden="true">
              {mountScene && <JourneyScene key={isStill ? "still" : "live"} still={isStill} getProgress={getProgress} className="h-full w-full" />}
            </div>

            <ol className="pf-journey-list relative z-10">
              {CHAPTERS.map((c, i) => (
                <li key={c.id} className="pf-journey-chapter" data-active={i === active} aria-hidden={!isStill && i !== active ? true : undefined}>
                  <p className="pf-label pf-journey-meta text-[var(--pf-butter)]">
                    <span>
                      {c.split} · {c.years}
                    </span>
                    <span className="pf-journey-lap">{c.lap}</span>
                  </p>
                  <div>
                    <h3 className="pf-display pf-journey-title">{c.title}</h3>
                    <p className="pf-journey-body">{c.body}</p>
                    {c.id === "fin" && (
                      <div className="pf-journey-cta">
                        <a href={journeyFinish.primary.href} onClick={(e) => goHash(e, journeyFinish.primary.href)} className="pf-btn text-[var(--pf-ink)]">
                          {journeyFinish.primary.label}
                        </a>
                        <a href={journeyFinish.secondary.href} onClick={(e) => goHash(e, journeyFinish.secondary.href)} className="pf-pill pf-pill--dark">
                          {journeyFinish.secondary.label}
                        </a>
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
