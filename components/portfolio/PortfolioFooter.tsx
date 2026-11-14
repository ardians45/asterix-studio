"use client";

import dynamic from "next/dynamic";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import InkTrail from "./InkTrail";
import { LiquidBlob } from "./LiquidBlob";

const GadgetScene = dynamic(() => import("./GadgetScene"), { ssr: false });

const SOCIALS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/ardian-setiawan45", Icon: FaLinkedin },
  { label: "GitHub", href: "https://github.com/ardians45", Icon: FaGithub },
  { label: "Instagram", href: "https://instagram.com/ardilan_90", Icon: FaInstagram },
];

export default function PortfolioFooter() {
  return (
    <footer id="contact" className="relative isolate overflow-hidden bg-[var(--pf-ink)] text-[var(--pf-butter)]">
      {/* the yellow world drips into the black footer, and yellow ink follows the cursor */}
      <LiquidBlob className="absolute -top-[26%] left-[8%] w-[62vw] max-w-[820px] text-[var(--pf-butter)] -z-10" duration={11} />
      <InkTrail className="-z-10" colors={["#FFD60A"]} shadow={false} size={40} />

      <div className="pf-wrap relative flex min-h-[86svh] flex-col justify-center py-24">
        <div className="relative mx-auto w-fit">
          <h2 className="pf-reach">Reach out</h2>
          <GadgetScene fixedVariant={2} scale={0.95} className="pointer-events-none absolute left-1/2 top-1/2 h-[260%] w-full -translate-x-1/2 -translate-y-1/2" />
        </div>
        <a href="mailto:ardians1945@gmail.com" className="pf-mail mx-auto mt-8 w-fit text-base md:text-lg font-semibold">
          ardians1945@gmail.com
        </a>

        <div className="absolute inset-x-4 md:inset-x-8 bottom-6 flex flex-wrap items-end justify-between gap-4">
          <p className="pf-label pf-label--tiny !text-[var(--pf-butter)]/70">
            South Tangerang, Banten
            <br />© {new Date().getFullYear()} Ardian Setiawan · Asterix Studio
          </p>
          <ul className="flex flex-wrap gap-2 pr-20">
            {SOCIALS.map(({ label, href, Icon }) => (
              <li key={label}>
                <a href={href} target="_blank" rel="noopener noreferrer" className="pf-pill pf-pill--dark pf-pill--sm">
                  <Icon aria-hidden="true" /> {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
