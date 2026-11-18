"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Tab = {
  id: string;
  label: string;
  title: string;
  points: string[];
  images?: { src: string; alt: string; w: number; h: number }[];
  video?: { src: string; poster: string };
  link?: { href: string; label: string };
};

const TABS: Tab[] = [
  {
    id: "race-control",
    label: "Race control",
    title: "Race control",
    points: [
      "Five-layer data flow from timing mats to screens",
      "Incidents and judge alerts in one place",
      "Live readings per minute and per station",
    ],
    images: [{ src: "/portfolio/20fit/race-control.webp", alt: "20FIT race control dashboard", w: 1600, h: 898 }],
  },
  {
    id: "leaderboard",
    label: "Live leaderboard",
    title: "Live leaderboard",
    points: [
      "Podium and rankings update as athletes finish",
      "Built for the venue TV",
      "QR code for athletes to find their own result",
    ],
    images: [{ src: "/portfolio/20fit/leaderboard.webp", alt: "20FIT live leaderboard on the venue TV", w: 1600, h: 899 }],
  },
  {
    id: "broadcast",
    label: "Broadcast",
    title: "Broadcast",
    points: [
      "Scene presets for each moment of the race (pre-race, race, finish, recap)",
      "On-camera overlays toggled live",
      "Used for the YouTube live stream",
    ],
    images: [{ src: "/portfolio/20fit/obs-control.webp", alt: "20FIT OBS broadcast control panel", w: 1600, h: 899 }],
    link: { href: "https://www.youtube.com/live/gaASDK_3yA4", label: "Watch the live stream ↗" },
  },
  {
    id: "cctv",
    label: "CCTV review",
    title: "CCTV review",
    points: [
      "Station cameras synced to the timing data",
      "Jump to the moment an athlete crossed each mat",
      "Settles disputed laps with video, not guesswork",
    ],
    // people in the footage are blurred: athletes and visitors never agreed to appear here
    images: [{ src: "/portfolio/20fit/cctv-review.webp", alt: "Race timing screen with station camera footage synced to lap times", w: 1600, h: 904 }],
  },
  {
    id: "infrastructure",
    label: "Infrastructure",
    title: "Infrastructure",
    points: [
      "Mac mini and two VPS servers, monitored every 10 seconds",
      "76 services and 57 websites with health checks",
      "Nightly backups between servers",
    ],
    images: [
      { src: "/portfolio/20fit/observability.webp", alt: "Observability dashboard: servers, services and backups all healthy", w: 1600, h: 738 },
      { src: "/portfolio/20fit/topology.webp", alt: "Service topology map grouped by system, all online", w: 1600, h: 900 },
    ],
  },
  {
    id: "video",
    label: "Video",
    title: "Race Lab in motion",
    points: [
      "The timing system running on a live race day",
      "From check-in to finish line to results",
    ],
    video: { src: "/portfolio/video/racelab.mp4", poster: "/portfolio/video/racelab-poster.webp" },
  },
];

const STATS = [
  { n: "3", l: "servers" },
  { n: "76", l: "services" },
  { n: "57", l: "websites" },
  { n: "448", l: "athletes finished in one event" },
];

export default function Portfolio20fit() {
  const [active, setActive] = useState(TABS[0].id);
  const [fading, setFading] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  const choose = (id: string) => {
    if (id === active) return;
    if (timer.current) clearTimeout(timer.current);
    setFading(true);
    timer.current = setTimeout(() => {
      setActive(id);
      setFading(false);
    }, 200);
  };

  const tab = TABS.find((t) => t.id === active) ?? TABS[0];

  return (
    <section id="20fit" className="pf-fit relative py-20 md:py-32">
      <div className="pf-shell">
        <p className="pf-label text-[var(--pf-butter)]">CLIENT · 20FIT · 2026</p>
        <h2 className="pf-heading mt-4">
          Race-day <span className="pf-script-inline">stack</span>
        </h2>
        <p className="mt-6 max-w-2xl text-base md:text-lg text-white/80">
          Everything that runs on a 20FIT race day, built and maintained by one developer: timing, race control, the live leaderboard, the broadcast and the servers underneath.
        </p>

        <dl className="pf-fit-stats">
          {STATS.map((s) => (
            <div key={s.l}>
              <dt className="sr-only">{s.l}</dt>
              <dd>
                <b>{s.n}</b>
                <span aria-hidden="true">{s.l}</span>
              </dd>
            </div>
          ))}
        </dl>

        <div className="pf-fit-tabs" role="group" aria-label="20FIT systems">
          {TABS.map((t) => (
            <button key={t.id} type="button" className="pf-fit-tab" aria-pressed={active === t.id} onClick={() => choose(t.id)}>
              {t.label}
            </button>
          ))}
        </div>

        <div className="pf-fit-panel" data-fade={fading ? "out" : "in"}>
          {tab.video ? (
            <div className="pf-fit-frame pf-fit-frame--video">
              <video src={tab.video.src} poster={tab.video.poster} muted controls playsInline preload="none" />
            </div>
          ) : (
            <div className="pf-fit-stack">
              {tab.images?.map((img) => (
                <div key={img.src} className="pf-fit-frame">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={img.w}
                    height={img.h}
                    sizes="(min-width: 1280px) 860px, (min-width: 1024px) 55vw, 100vw"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          )}
          <div className="pf-fit-copy">
            <h3>{tab.title}</h3>
            <ul>
              {tab.points.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
            {tab.link && (
              <a href={tab.link.href} target="_blank" rel="noopener noreferrer" className="pf-fit-link">
                {tab.link.label}
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
