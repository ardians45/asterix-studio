import type { CSSProperties } from "react";

const SHADOW = "0 2px 12px rgba(0,0,0,0.75)";

/**
 * Hero heading that enters once on load: every character rises out of its word's mask.
 *
 * The split happens at render time (server-side) and the motion is pure CSS, so the text
 * is in the first HTML paint with no JavaScript, no hydration wait and no GSAP in the
 * initial bundle. Reduced motion shows it still (see `.hero-title` in globals.css).
 */
function Line({
  text,
  className,
  style,
  delay,
}: {
  text: string;
  className: string;
  style: CSSProperties;
  delay: number;
}) {
  let i = 0;
  const words = text.split(" ");
  return (
    <span className={`block ${className}`} style={style} aria-label={text}>
      {words.map((word, w) => (
        <span key={w} aria-hidden="true">
          <span className="ht-word">
            {Array.from(word).map((ch, c) => (
              <span
                key={c}
                className="ht-char"
                style={{ "--d": `${delay}ms`, "--i": i++ } as CSSProperties}
              >
                {ch}
              </span>
            ))}
          </span>
          {w < words.length - 1 ? " " : null}
        </span>
      ))}
    </span>
  );
}

export default function HeroTitle() {
  return (
    <h1 className="hero-title text-white leading-[0.95]">
      <Line
        text="Design with Purpose"
        className="font-cinzel font-normal text-5xl sm:text-7xl md:text-8xl"
        style={{ letterSpacing: "-0.05em", textShadow: SHADOW }}
        delay={150}
      />
      <Line
        text="code with precision"
        className="font-normal text-5xl sm:text-7xl md:text-8xl -mt-1"
        style={{ letterSpacing: "-0.08em", textShadow: SHADOW }}
        delay={330}
      />
    </h1>
  );
}
