"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

const SHADOW = "0 2px 12px rgba(0,0,0,0.75)";

/**
 * Hero heading that enters once on load: each line's characters rise out of a word mask
 * (GSAP SplitText). Under reduced motion it simply shows (handled in CSS + early return).
 */
export default function HeroTitle() {
  const ref = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(el, { autoAlpha: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      const lines = el.querySelectorAll<HTMLElement>("[data-line]");
      const splits = Array.from(lines).map((line, i) =>
        SplitText.create(line, {
          type: "words,chars",
          mask: "words",
          autoSplit: true,
          onSplit(self) {
            return gsap.from(self.chars, {
              yPercent: 115,
              rotate: 6,
              duration: 1.1,
              ease: "expo.out",
              stagger: 0.022,
              delay: 0.2 + i * 0.18,
            });
          },
        })
      );
      gsap.set(el, { autoAlpha: 1 });
      return () => splits.forEach((s) => s.revert());
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <h1 ref={ref} className="hero-split text-white leading-[0.95]">
      <span
        data-line
        className="block font-cinzel font-normal text-5xl sm:text-7xl md:text-8xl pb-[0.08em]"
        style={{ letterSpacing: "-0.05em", textShadow: SHADOW }}
      >
        Design with Purpose
      </span>
      <span
        data-line
        className="block font-normal text-5xl sm:text-7xl md:text-8xl -mt-1 pb-[0.08em]"
        style={{ letterSpacing: "-0.08em", textShadow: SHADOW }}
      >
        code with precision
      </span>
    </h1>
  );
}
