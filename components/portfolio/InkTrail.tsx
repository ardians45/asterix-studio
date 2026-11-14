"use client";

import { useEffect, useRef } from "react";

type Pt = { x: number; y: number; t: number; w: number };

/**
 * Liquid ink that follows the cursor. Resting, it is a small drop under the pointer; the faster
 * the pointer moves, the fatter the stroke it leaves, which then thins and dries out. Fills its
 * (positioned) parent and never takes pointer events. Mouse only; skipped for touch and for
 * reduced motion.
 */
export default function InkTrail({
  color = "#0E0E0E",
  size = 70,
  life = 1900,
  className = "",
}: {
  color?: string;
  /** widest half-stroke, reached at high pointer speed */
  size?: number;
  /** ms a stroke stays on the page */
  life?: number;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    if (!canvas || !host) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)").matches) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const REST = 13; // radius of the drop when the pointer is still
    let w = 0;
    let h = 0;
    const resize = () => {
      w = host.clientWidth;
      h = host.clientHeight;
      canvas.width = w;
      canvas.height = h;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(host);

    const pts: Pt[] = [];
    const target = { x: 0, y: 0 };
    const head = { x: 0, y: 0 };
    let headR = REST;
    let inside = false;
    let presence = 0; // 0..1, eases the drop in and out
    let raf = 0;
    let running = false;

    const frame = (now: number) => {
      const px = head.x;
      const py = head.y;
      head.x += (target.x - head.x) * 0.22;
      head.y += (target.y - head.y) * 0.22;
      const speed = Math.hypot(head.x - px, head.y - py);
      presence += ((inside ? 1 : 0) - presence) * 0.12;

      // stroke width follows speed, with a little wobble so the edge reads as liquid
      const want = Math.min(size, REST + speed * 2.4);
      headR += (want - headR) * (want > headR ? 0.35 : 0.08);
      const last = pts[pts.length - 1];
      if (!last || Math.hypot(head.x - last.x, head.y - last.y) > 4) {
        pts.push({ x: head.x, y: head.y, t: now, w: headR * (0.82 + Math.random() * 0.36) });
      }
      while (pts.length && now - pts[0].t > life) pts.shift();

      ctx.clearRect(0, 0, w, h);
      if (presence > 0.01) {
        ctx.strokeStyle = color;
        ctx.fillStyle = color;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        for (let i = 1; i < pts.length; i++) {
          const a = pts[i - 1];
          const b = pts[i];
          const k = Math.max(0, 1 - (now - b.t) / life);
          // ease-out so a stroke holds its body, then closes quickly at the end
          ctx.lineWidth = Math.max(0.5, (a.w + b.w) * Math.pow(k, 0.45) * presence);
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
        ctx.beginPath();
        ctx.arc(head.x, head.y, headR * presence, 0, Math.PI * 2);
        ctx.fill();
      }

      if (inside || presence > 0.01 || pts.length > 1) raf = requestAnimationFrame(frame);
      else running = false;
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const r = canvas.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      const nowInside = x >= 0 && y >= 0 && x <= r.width && y <= r.height;
      if (nowInside && !inside && presence < 0.05) {
        head.x = x;
        head.y = y;
        pts.length = 0;
      }
      inside = nowInside;
      target.x = x;
      target.y = y;
      if (inside && !running) {
        running = true;
        raf = requestAnimationFrame(frame);
      }
    };
    const onLeave = () => {
      inside = false;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [color, size, life]);

  return <canvas ref={canvasRef} aria-hidden="true" className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} />;
}
