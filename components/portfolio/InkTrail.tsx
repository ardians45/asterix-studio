"use client";

import { useEffect, useRef } from "react";

type Pt = { x: number; y: number; t: number };

const LIFE = 1100; // ms a stroke stays on the page

/**
 * Liquid ink that follows the cursor: a fat round blob at the pointer dragging a tapering trail
 * behind it, with a soft cast shadow. Fills its (positioned) parent and never takes pointer events.
 * Mouse only; skipped for touch and for reduced motion.
 */
export default function InkTrail({
  colors = ["#0E0E0E"],
  size = 44,
  shadow = true,
  className = "",
}: {
  /** outer colour first; extra colours are drawn as thinner cores inside it */
  colors?: string[];
  size?: number;
  shadow?: boolean;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const colorsRef = useRef(colors);
  useEffect(() => {
    colorsRef.current = colors;
  }, [colors]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    if (!canvas || !host) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)").matches) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

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
    let inside = false;
    let presence = 0; // 0..1, eases the blob in and out
    let raf = 0;
    let running = false;

    const stroke = (color: string, k: number, now: number) => {
      ctx.strokeStyle = color;
      ctx.fillStyle = color;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      for (let i = 1; i < pts.length; i++) {
        const a = pts[i - 1];
        const b = pts[i];
        const life = Math.max(0, 1 - (now - b.t) / LIFE);
        ctx.lineWidth = Math.max(0.5, size * 2 * k * Math.pow(life, 0.7) * presence);
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
      const wobble = 1 + Math.sin(now / 420) * 0.05;
      ctx.beginPath();
      ctx.arc(head.x, head.y, size * k * wobble * presence, 0, Math.PI * 2);
      ctx.fill();
    };

    const frame = (now: number) => {
      head.x += (target.x - head.x) * 0.2;
      head.y += (target.y - head.y) * 0.2;
      presence += ((inside ? 1 : 0) - presence) * 0.12;

      const last = pts[pts.length - 1];
      if (!last || Math.hypot(head.x - last.x, head.y - last.y) > 3) pts.push({ x: head.x, y: head.y, t: now });
      while (pts.length && now - pts[0].t > LIFE) pts.shift();

      ctx.clearRect(0, 0, w, h);
      if (presence > 0.01) {
        const cs = colorsRef.current;
        if (shadow) {
          ctx.save();
          ctx.filter = "blur(16px)";
          ctx.translate(20, 30);
          stroke("rgba(0,0,0,0.3)", 1, now);
          ctx.restore();
        }
        cs.forEach((c, i) => stroke(c, Math.max(0.2, 1 - i * 0.38), now));
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
  }, [size, shadow]);

  return <canvas ref={canvasRef} aria-hidden="true" className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} />;
}
