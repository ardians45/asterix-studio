"use client";

import { useEffect, useRef, useState } from "react";

const PATHS = [
  "M310 165 C250 165 240 52 192 52",
  "M310 165 C370 165 380 52 428 52",
  "M310 165 C250 165 240 278 192 278",
  "M310 165 C370 165 380 278 428 278",
];
const PULSE_BEGIN = ["-.3s", "-1.1s", "-1.8s", "-.7s"];

const AGENTS = [
  { x: 16, y: 22, name: "Claude Code", role: "— build", color: "#FF9F5A" },
  { x: 428, y: 22, name: "ChatGPT", role: "— research", color: "#3DDC97" },
  { x: 16, y: 248, name: "Gemini", role: "— review", color: "#6AA9FF" },
  { x: 428, y: 248, name: "Orca", role: "— run agents", color: "#FFD60A" },
];

// Decorative console: AI agents orchestrated from one centre node. No three.js, SVG + CSS only.
export default function AgentConsole({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [still, setStill] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setStill(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  // the panel leans a little toward the pointer (desktop, fine pointer only)
  useEffect(() => {
    const el = ref.current;
    if (!el || still) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const nx = Math.max(-1, Math.min(1, ((e.clientX - r.left) / r.width - 0.5) * 2));
        const ny = Math.max(-1, Math.min(1, ((e.clientY - r.top) / r.height - 0.5) * 2));
        el.style.setProperty("--ry", `${(nx * 6).toFixed(2)}deg`);
        el.style.setProperty("--rx", `${(-ny * 6).toFixed(2)}deg`);
      });
    };
    const onLeave = () => {
      el.style.setProperty("--ry", "0deg");
      el.style.setProperty("--rx", "0deg");
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [still]);

  return (
    <div
      ref={ref}
      role="img"
      aria-label="AI agents orchestrated by Ardian: Claude Code, ChatGPT, Gemini, Orca"
      className={`pf-console ${className}`}
    >
      <div className="pf-console-tilt" aria-hidden="true">
        <div className="pf-console-slab" />
        <div className="pf-console-edge" />
        <div className="pf-console-panel">
          <div className="pf-console-bar">
            <i />
            <i />
            <i />
            <span>orchestrator.session · 0427</span>
            <b>● LIVE</b>
          </div>
          <svg viewBox="0 0 620 330" xmlns="http://www.w3.org/2000/svg" className="pf-console-svg">
            <defs>
              <radialGradient id="pfc-cg" cx="38%" cy="30%" r="80%">
                <stop offset="0" stopColor="#FFF08A" />
                <stop offset=".45" stopColor="#FFD60A" />
                <stop offset="1" stopColor="#C79E00" />
              </radialGradient>
              <pattern id="pfc-dots" width="22" height="22" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1.1" fill="#2c2c2c" />
              </pattern>
              <linearGradient id="pfc-ng" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#2e2e2e" />
                <stop offset="1" stopColor="#1a1a1a" />
              </linearGradient>
              <filter id="pfc-gl">
                <feGaussianBlur stdDeviation="6" />
              </filter>
              {PATHS.map((d, i) => (
                <path key={i} id={`pfc-p${i}`} d={d} />
              ))}
            </defs>
            <rect width="620" height="330" fill="url(#pfc-dots)" />
            <g fill="none" stroke="#FFD60A" strokeOpacity=".55" strokeWidth="2" strokeDasharray="3 7" strokeLinecap="round">
              {PATHS.map((_, i) => (
                <use key={i} href={`#pfc-p${i}`} />
              ))}
            </g>
            <g fill="#FFE766">
              {PATHS.map((_, i) =>
                still ? (
                  <circle key={i} r="5" cx={i % 2 ? 370 : 250} cy={i < 2 ? 108 : 222} />
                ) : (
                  <circle key={i} r="5">
                    <animateMotion dur="2.4s" repeatCount="indefinite" begin={PULSE_BEGIN[i]}>
                      <mpath href={`#pfc-p${i}`} />
                    </animateMotion>
                  </circle>
                )
              )}
            </g>
            <circle cx="310" cy="165" r="86" fill="#FFD60A" opacity=".22" filter="url(#pfc-gl)" />
            <circle cx="310" cy="165" r="78" fill="none" stroke="#FFD60A" strokeOpacity=".4" strokeDasharray="4 6" />
            <circle cx="310" cy="165" r="62" fill="url(#pfc-cg)" />
            <circle cx="310" cy="165" r="62" fill="none" stroke="#fff" strokeOpacity=".5" />
            <text x="310" y="162" textAnchor="middle" fontWeight="900" fontSize="19" letterSpacing="-.5" fill="#0E0E0E">
              ARDIAN
            </text>
            <text x="310" y="182" textAnchor="middle" className="pf-console-mono" fontSize="11.5" fill="#0E0E0E" opacity=".75">
              orchestrator
            </text>
            {AGENTS.map((a) => (
              <g key={a.name}>
                <rect x={a.x} y={a.y} width="176" height="60" rx="16" fill="url(#pfc-ng)" stroke="#444" />
                <circle cx={a.x + 24} cy={a.y + 30} r="12" fill={a.color} opacity=".22" />
                <circle cx={a.x + 24} cy={a.y + 30} r="7" fill={a.color} />
                <text x={a.x + 46} y={a.y + 28} fontWeight="700" fontSize="15" fill="#fff">
                  {a.name}
                </text>
                <text x={a.x + 46} y={a.y + 46} className="pf-console-mono" fontSize="11.5" fill="#9a9a9a">
                  {a.role}
                </text>
              </g>
            ))}
          </svg>
          <div className="pf-console-log">
            <div>› plan: landing page + SEO</div>
            <div>
              › agents: <span className="y">4</span> running
            </div>
            <div className="g">› ship: deployed ✓</div>
          </div>
        </div>
      </div>
    </div>
  );
}
