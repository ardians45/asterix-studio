"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useSyncExternalStore } from "react";

// three.js + rapier (~600 KB) are only downloaded when the card is about to be shown,
// and only on screens that get the 3D version.
const LanyardScene = dynamic(() => import("./LanyardScene"), { ssr: false, loading: () => null });

const QUERY = "(min-width: 768px) and (prefers-reduced-motion: no-preference)";
const subscribe = (cb: () => void) => {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};
const canUse3D = () => {
  if (!window.matchMedia(QUERY).matches) return false;
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
};

/** Static card used on phones, reduced motion, no WebGL, and while the 3D chunk loads. */
function StaticCard() {
  return (
    <div className="relative mx-auto w-[220px] sm:w-[240px]">
      {/* strap */}
      <div className="mx-auto h-10 w-6 rounded-b-sm bg-[#e8702a]" />
      <div className="mx-auto -mt-1 h-5 w-12 rounded-sm bg-gradient-to-b from-gray-200 to-gray-400" />
      <div className="mt-1 overflow-hidden rounded-2xl bg-[#F5F4F0] shadow-[0_20px_40px_rgba(0,0,0,0.45)] ring-1 ring-black/10">
        <div className="flex items-center justify-between bg-[#18181b] px-4 py-3 text-[10px] font-semibold tracking-widest text-white">
          <span>ASTERIX STUDIO</span>
          <span className="text-[#e8702a]">PORTFOLIO</span>
        </div>
        <div className="h-1 bg-[#e8702a]" />
        <div className="relative mx-4 mt-4 aspect-[4/3.6] overflow-hidden rounded-xl bg-gray-200">
          <Image src="/profile.webp" alt="Ardian Setiawan" fill sizes="240px" className="object-cover" />
        </div>
        <div className="px-4 pb-4 pt-3 text-left">
          <p className="font-cinzel text-xl font-bold leading-tight text-gray-900">Ardian Setiawan</p>
          <p className="mt-1 text-[10px] font-semibold tracking-wider text-[#e8702a]">UI/UX DESIGNER &amp; WEB DEVELOPER</p>
        </div>
      </div>
    </div>
  );
}

/**
 * @param mount  start downloading/building the 3D scene (the visitor is approaching the section)
 * @param active run the render + physics loop (the card is actually visible)
 */
export default function Lanyard({ mount, active }: { mount: boolean; active: boolean }) {
  const supports3D = useSyncExternalStore(subscribe, canUse3D, () => false);

  if (!supports3D) {
    return (
      <div className="flex h-full w-full items-start justify-center pt-2">
        <StaticCard />
      </div>
    );
  }

  return (
    <div className="relative h-full w-full touch-none select-none">
      {mount && <LanyardScene active={active} />}
      <p className="pointer-events-none absolute bottom-2 left-0 right-0 text-center font-mono text-[10px] uppercase tracking-[0.25em] text-white/50">
        Drag the card
      </p>
    </div>
  );
}
