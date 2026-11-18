"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * A link that leans toward the pointer while it is near (GSAP quickTo), and springs back.
 * Fine pointers only; reduced motion keeps it still.
 */
export default function MagneticButton({
  href,
  children,
  className = "",
  strength = 0.35,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)").matches) return;

    // GSAP is loaded on demand (first hover) so it stays out of the initial bundle
    let gsap: typeof import("gsap").gsap | null = null;
    let xTo: ((v: number) => void) | null = null;
    let yTo: ((v: number) => void) | null = null;
    let loading = false;
    const ensure = async () => {
      if (gsap || loading) return;
      loading = true;
      gsap = (await import("gsap")).gsap;
      xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3.out" });
      yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3.out" });
    };

    const onEnter = () => void ensure();
    const onMove = (e: PointerEvent) => {
      if (!xTo || !yTo) return;
      const r = el.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width / 2)) * strength);
      yTo((e.clientY - (r.top + r.height / 2)) * strength);
    };
    const onLeave = () => {
      gsap?.to(el, { x: 0, y: 0, duration: 0.8, ease: "elastic.out(1, 0.4)" });
    };

    el.addEventListener("pointerenter", onEnter);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointerenter", onEnter);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      gsap?.killTweensOf(el);
    };
  }, [strength]);

  return (
    <a ref={ref} href={href} className={className}>
      {children}
    </a>
  );
}
