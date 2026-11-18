"use client";

import { useEffect, useRef, useState } from "react";

const TAPE_ONE = [
  "Software Engineering",
  "AI Orchestration",
  "UI/UX Design",
  "Next.js Builds",
  "SEO That Ranks",
  "Race Timing Systems",
];
const TAPE_TWO = ["Let's build something", "Open for projects", "South Tangerang → Worldwide"];

const COPIES = 4;
const BASE_SPEED = 40; // px per second, drift in the direction of the last scroll
const SCROLL_GAIN = 0.9; // extra px of tape travel per px scrolled

function Unit({ words, outlineOdd }: { words: string[]; outlineOdd?: boolean }) {
  return (
    <span className="pf-mq-unit">
      {words.map((w, i) => (
        <span key={w} className="pf-mq-item">
          <span className={outlineOdd && i % 2 === 0 ? "pf-mq-outline" : undefined}>{w}</span>
          <span className="pf-mq-star" aria-hidden="true">
            ✦
          </span>
        </span>
      ))}
    </span>
  );
}

function Tape({ words, outlineOdd, trackRef }: { words: string[]; outlineOdd?: boolean; trackRef: React.RefObject<HTMLDivElement | null> }) {
  return (
    <div ref={trackRef} className="pf-mq-track">
      {Array.from({ length: COPIES }, (_, i) => (
        <span key={i} className="pf-mq-copy" aria-hidden={i === 0 ? undefined : true}>
          <Unit words={words} outlineOdd={outlineOdd} />
        </span>
      ))}
    </div>
  );
}

export default function PortfolioMarquee() {
  const sectionRef = useRef<HTMLElement>(null);
  const t1 = useRef<HTMLDivElement>(null);
  const t2 = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const hoverRef = useRef(false);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  useEffect(() => {
    if (reduced) return;
    const section = sectionRef.current;
    const a = t1.current;
    const b = t2.current;
    if (!section || !a || !b) return;

    let raf = 0;
    let last = 0;
    let lastY = window.scrollY;
    let dir = 1; // 1 = last scroll was down
    let x1 = 0;
    let x2 = 0;
    let w1 = 1;
    let w2 = 1;
    let visible = false;

    const measure = () => {
      const c1 = a.firstElementChild as HTMLElement | null;
      const c2 = b.firstElementChild as HTMLElement | null;
      if (c1) w1 = c1.offsetWidth || 1;
      if (c2) w2 = c2.offsetWidth || 1;
    };
    const wrap = (x: number, w: number) => ((x % w) + w) % w - w;

    const tick = (now: number) => {
      const dt = last ? Math.min((now - last) / 1000, 0.05) : 0;
      last = now;
      const y = window.scrollY;
      const dy = y - lastY;
      lastY = y;
      if (dy !== 0) dir = dy > 0 ? 1 : -1;
      if (!pausedRef.current) {
        const base = BASE_SPEED * (hoverRef.current ? 0.4 : 1) * dt * dir;
        const move = base + dy * SCROLL_GAIN;
        x1 -= move;
        x2 += move * 0.85;
        a.style.transform = `translate3d(${wrap(x1, w1)}px,0,0)`;
        b.style.transform = `translate3d(${wrap(x2, w2)}px,0,0)`;
      }
      raf = requestAnimationFrame(tick);
    };

    const start = () => {
      if (raf) return;
      last = 0;
      lastY = window.scrollY;
      measure();
      raf = requestAnimationFrame(tick);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) start();
        else stop();
      },
      { rootMargin: "100px 0px" },
    );
    io.observe(section);
    const onResize = () => {
      if (visible) measure();
    };
    window.addEventListener("resize", onResize);
    return () => {
      io.disconnect();
      stop();
      window.removeEventListener("resize", onResize);
    };
  }, [reduced]);

  return (
    <section
      ref={sectionRef}
      aria-label="Services: software engineering, AI orchestration, UI/UX design, Next.js builds, SEO, race timing systems"
      className="pf-mq"
      onMouseEnter={() => (hoverRef.current = true)}
      onMouseLeave={() => (hoverRef.current = false)}
    >
      <div className="pf-mq-tape pf-mq-tape--one" aria-hidden="true">
        <Tape words={TAPE_ONE} trackRef={t1} />
      </div>
      <div className="pf-mq-tape pf-mq-tape--two" aria-hidden="true">
        <Tape words={TAPE_TWO} outlineOdd trackRef={t2} />
      </div>
      {!reduced && (
        <button
          type="button"
          className="pf-mq-btn"
          aria-label={paused ? "Play marquee" : "Pause marquee"}
          aria-pressed={paused}
          onClick={() => setPaused((p) => !p)}
        >
          {paused ? (
            <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
              <path d="M8 5v14l11-7z" fill="currentColor" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
              <path d="M7 5h4v14H7zM13 5h4v14h-4z" fill="currentColor" />
            </svg>
          )}
        </button>
      )}
    </section>
  );
}
