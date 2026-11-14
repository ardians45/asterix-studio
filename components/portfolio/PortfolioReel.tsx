"use client";

import { useEffect, useRef, useState } from "react";

const STEPS = [
  ["Check-in", "Name on screen and a live announcement on arrival"],
  ["Time chip", "Accurate timing for every participant"],
  ["Lap tracker", "Know your lap and your next station"],
  ["Leaderboard", "Scan the QR code to see your ranking"],
  ["Race photos", "Found by face recognition"],
];

export default function PortfolioReel() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  // The file is only fetched once the section is near the screen, and it stops when scrolled away.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !still) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.35 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) v.play().catch(() => {});
    else v.pause();
  };

  return (
    <section id="racelab" className="relative overflow-hidden bg-[var(--pf-ink)] py-20 text-[var(--pf-butter)] md:py-32">
      <div className="pf-shell grid items-center gap-12 md:grid-cols-[1fr_auto] md:gap-20">
        <div>
          <p className="pf-label mb-5 opacity-70">In the field · 20FIT</p>
          <h2 className="pf-heading">Race Lab</h2>
          <p className="mt-6 max-w-[34rem] text-base leading-relaxed text-white/75 md:text-lg">
            The race-day system behind 20FIT&apos;s hybrid race: every step from arrival to the finish photo runs on screen.
          </p>
          <ol className="mt-10 border-t border-white/15">
            {STEPS.map(([name, note], i) => (
              <li key={name} className="grid grid-cols-[2.5rem_1fr] items-baseline gap-x-3 border-b border-white/15 py-4 md:grid-cols-[2.5rem_11rem_1fr]">
                <span className="pf-label pf-label--tiny opacity-60">0{i + 1}</span>
                <span className="text-lg font-bold tracking-tight">{name}</span>
                <span className="col-start-2 text-sm text-white/60 md:col-start-3">{note}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="relative mx-auto w-[min(72vw,320px)] md:w-[clamp(260px,24vw,340px)]">
          <div className="relative aspect-[9/16] overflow-hidden rounded-[28px] bg-black ring-1 ring-white/15">
            <video
              ref={videoRef}
              className="h-full w-full object-cover"
              src="/portfolio/video/racelab.mp4"
              poster="/portfolio/video/racelab-poster.webp"
              muted
              loop
              playsInline
              preload="none"
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
              aria-label="20FIT Race Lab: how the race technology works"
            />
            <button
              type="button"
              onClick={toggle}
              aria-label={playing ? "Pause video" : "Play video"}
              className="absolute bottom-3 right-3 grid h-11 w-11 place-items-center rounded-full bg-[var(--pf-butter)] text-[var(--pf-ink)] transition-transform active:scale-95"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                {playing ? <path d="M7 5h4v14H7zM13 5h4v14h-4z" /> : <path d="M8 5v14l11-7z" />}
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
