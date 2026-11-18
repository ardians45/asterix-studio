"use client";

import { useState } from "react";
import { FaPause, FaPlay } from "react-icons/fa";
import {
  SiNextdotjs, SiReact, SiTailwindcss, SiTypescript, SiThreedotjs, SiFramer, SiFigma,
  SiVuedotjs, SiPython, SiDocker, SiGithub, SiJavascript, SiCanva, SiGreensock,
} from "react-icons/si";

// Real tool icons in their own colours (white where the brand mark is black).
const TOOLS = [
  { name: "Next.js", Icon: SiNextdotjs, color: "#ffffff" },
  { name: "React", Icon: SiReact, color: "#61DAFB" },
  { name: "TypeScript", Icon: SiTypescript, color: "#3178C6" },
  { name: "Tailwind CSS", Icon: SiTailwindcss, color: "#06B6D4" },
  { name: "Figma", Icon: SiFigma, color: "#F24E1E" },
  { name: "Framer Motion", Icon: SiFramer, color: "#ffffff" },
  { name: "GSAP", Icon: SiGreensock, color: "#88CE02" },
  { name: "Three.js", Icon: SiThreedotjs, color: "#ffffff" },
  { name: "Vue.js", Icon: SiVuedotjs, color: "#4FC08D" },
  { name: "JavaScript", Icon: SiJavascript, color: "#F7DF1E" },
  { name: "Python", Icon: SiPython, color: "#3776AB" },
  { name: "Docker", Icon: SiDocker, color: "#2496ED" },
  { name: "GitHub", Icon: SiGithub, color: "#ffffff" },
  { name: "Canva", Icon: SiCanva, color: "#00C4CC" },
];

/** A dark brand band with the tools running past (React Bits "LogoLoop" idea, pure CSS). */
export default function ToolsLoop() {
  const [paused, setPaused] = useState(false);
  const row = (hidden: boolean) =>
    TOOLS.map(({ name, Icon, color }) => (
      <li key={`${name}-${hidden}`} className="flex shrink-0 items-center gap-3 px-8" aria-hidden={hidden || undefined}>
        <Icon className="text-3xl md:text-4xl" style={{ color }} aria-hidden />
        <span className="whitespace-nowrap text-sm md:text-base font-medium tracking-wide text-white/80">{name}</span>
      </li>
    ));

  return (
    <section aria-label="Tools I work with" className="relative bg-[#111111] py-10 md:py-14 overflow-hidden">
      <div
        className="logo-loop relative"
        data-paused={paused}
        style={{
          maskImage: "linear-gradient(to right, transparent, #000 10%, #000 90%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, #000 10%, #000 90%, transparent)",
        }}
      >
        <ul className="logo-loop-track flex w-max" style={{ ["--loop-duration" as string]: "45s" }}>
          {row(false)}
          {row(true)}
        </ul>
      </div>
      <button
        type="button"
        onClick={() => setPaused((p) => !p)}
        aria-pressed={paused}
        aria-label={paused ? "Play tools animation" : "Pause tools animation"}
        className="absolute right-4 md:right-12 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white/80 transition hover:border-[#e8702a] hover:text-white active:scale-95"
      >
        {paused ? <FaPlay className="text-xs" /> : <FaPause className="text-xs" />}
      </button>
    </section>
  );
}
