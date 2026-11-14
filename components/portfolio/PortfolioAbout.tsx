import Image from "next/image";
import InkTrail from "./InkTrail";

export default function PortfolioAbout() {
  return (
    <section id="about" className="relative bg-[#0b0b0b]">
      {/* the media panel pins to the screen; the yellow statement then slides up over it */}
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <Image src="/profile.webp" alt="" fill sizes="100vw" aria-hidden="true" className="scale-125 object-cover object-[50%_32%] opacity-60 blur-2xl" />
        <div className="absolute inset-x-[4%] md:inset-x-[6%] top-[9svh] bottom-0 overflow-hidden">
          <Image src="/profile.webp" alt="Ardian Setiawan at work" fill sizes="(min-width: 768px) 88vw, 92vw" className="object-cover object-[50%_32%]" />
        </div>
      </div>

      <div className="relative isolate z-10 overflow-hidden bg-[var(--pf-butter)] py-20 md:py-32">
        <InkTrail />
        <div className="pf-shell pf-invert relative">
          <h2 className="pf-tagline md:absolute md:left-0 md:top-[0.9em] mb-4 md:mb-0">Who I am</h2>
          <p className="pf-statement">
            <span className="pf-statement-indent" aria-hidden="true" />
            Ardian is a designer who ships the code too. Research, interface, Next.js build and SEO: one person, one desk, nothing lost in a handoff.
          </p>
        </div>
      </div>
    </section>
  );
}
