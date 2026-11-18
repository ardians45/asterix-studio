"use client";

import { useEffect, useRef, useState } from "react";

// Decorative mockup of an agent orchestration workspace (sidebar of sessions + worker updates). HTML/CSS only.
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

  // the window leans a little toward the pointer (desktop, fine pointer only)
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
        el.style.setProperty("--ry", `${(nx * 5).toFixed(2)}deg`);
        el.style.setProperty("--rx", `${(-ny * 5).toFixed(2)}deg`);
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
      aria-label="Orchestration workspace: Ardian running Claude Code, ChatGPT, Gemini and Orca agents on the 20FIT race timing project"
      className={`pf-console ${className}`}
    >
      <div className="pf-console-tilt" aria-hidden="true">
        <div className="pf-console-slab" />
        <div className="pf-console-edge" />
        <div className="pf-console-panel">
          <div className="pf-oc-bar">
            <span className="pf-oc-dots">
              <i />
              <i />
              <i />
            </span>
            <span className="pf-oc-pill">⧉ Orchestration</span>
            <span className="pf-oc-tab">
              <em>✓</em> Ship 20FIT live leaderboard
            </span>
          </div>
          <div className="pf-oc-body">
            <aside className="pf-oc-side">
              <div className="pf-oc-group">
                <b>Local Mac</b>
                <u>1</u>
              </div>
              <div className="pf-oc-proj">asterix-studio</div>
              <div className="pf-oc-branch">
                <div className="pf-oc-row">
                  <s className="pf-oc-live" />
                  <b>portfolio-v3</b>
                  <u>primary</u>
                </div>
                <small>feature/portfolio-v3</small>
                <div className="pf-oc-sess">
                  <i style={{ background: "#D97757" }} />
                  <span>Claude Code · Polish hero layout</span>
                  <em>now</em>
                </div>
              </div>
              <div className="pf-oc-group">
                <b>mac-mini</b>
                <u>2</u>
              </div>
              <div className="pf-oc-proj">racelab</div>
              <div className="pf-oc-branch pf-oc-branch--sel">
                <div className="pf-oc-row">
                  <s className="pf-oc-live" />
                  <b>live-leaderboard</b>
                </div>
                <small>fix/live-leaderboard</small>
                <div className="pf-oc-sess">
                  <i style={{ background: "#D97757" }} />
                  <span>Claude Code · Sync RFID reads</span>
                  <em>now</em>
                </div>
                <div className="pf-oc-sess">
                  <i style={{ background: "#3DDC97" }} />
                  <span>ChatGPT · Research timing edge cases</span>
                  <em>now</em>
                </div>
                <div className="pf-oc-sess">
                  <i style={{ background: "#6AA9FF" }} />
                  <span>Gemini · Review leaderboard UI</span>
                  <em>now</em>
                </div>
              </div>
              <div className="pf-oc-branch">
                <div className="pf-oc-row">
                  <s className="pf-oc-clock" />
                  <b>cctv-review</b>
                </div>
                <small>feature/cctv-review</small>
                <div className="pf-oc-sess">
                  <i style={{ background: "#FFD60A" }} />
                  <span>Orca · Run camera sync agents</span>
                  <em>12m</em>
                </div>
              </div>
            </aside>
            <section className="pf-oc-chat">
              <div className="pf-oc-worked">Worked for 12s ›</div>
              <div className="pf-oc-card">
                <div className="pf-oc-card-h">
                  <i style={{ background: "#D97757" }} />
                  <span>Update from worker</span>
                  <b>claude-code ↗</b>
                  <time>3:09 PM</time>
                </div>
                <p>Fixed. RFID reads now stream to the live leaderboard; finished athletes appear on the TV the moment they cross the mat.</p>
              </div>
              <div className="pf-oc-card pf-oc-card--late">
                <div className="pf-oc-card-h">
                  <i style={{ background: "#6AA9FF" }} />
                  <span>Update from worker</span>
                  <b>gemini ↗</b>
                  <time>3:10 PM</time>
                </div>
                <p>Reviewed the leaderboard on the venue TV and on phones. Contrast and tap targets pass.</p>
              </div>
              <p className="pf-oc-msg">Both workers are done. Want me to ship it to race day?</p>
              <div className="pf-oc-input">
                <div className="pf-oc-ph">
                  Ask anything, @ to mention files, / for commands<span className="pf-oc-caret" />
                </div>
                <div className="pf-oc-tools">
                  <span className="pf-oc-plus">+</span>
                  <span className="pf-oc-warn">⚠ Full access</span>
                  <span className="pf-oc-who">Ardian ⌄</span>
                  <svg viewBox="0 0 24 24" width="1.3em" height="1.3em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                    <rect x="9" y="3" width="6" height="11" rx="3" />
                    <path d="M5 11a7 7 0 0 0 14 0M12 18v3" />
                  </svg>
                  <span className="pf-oc-send">↑</span>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
