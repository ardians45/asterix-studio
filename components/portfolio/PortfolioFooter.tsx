import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import InkTrail from "./InkTrail";
import { LiquidBlob } from "./LiquidBlob";

const SOCIALS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/ardian-setiawan45", Icon: FaLinkedin },
  { label: "GitHub", href: "https://github.com/ardians45", Icon: FaGithub },
  { label: "Instagram", href: "https://instagram.com/ardilan_90", Icon: FaInstagram },
];

const PINS = ["left-[14px] top-[14px]", "right-[14px] top-[14px]", "left-[14px] bottom-[14px]", "right-[14px] bottom-[14px]"];

const btn =
  "inline-flex min-h-[48px] w-full items-center justify-center rounded-full border-2 border-[var(--pf-butter)] px-6 text-[15px] font-semibold transition-[background-color,color,transform] duration-200 hover:-translate-y-0.5 sm:w-auto";

export default function PortfolioFooter() {
  return (
    <footer id="contact" className="relative isolate overflow-hidden bg-[var(--pf-ink)] text-[var(--pf-butter)]">
      {/* the yellow world drips into the black footer (kept to the top band), and yellow ink follows the cursor */}
      <LiquidBlob className="pf-reach-blob absolute left-[8%]" duration={11} />
      <InkTrail color="#FFD60A" />

      <div className="relative flex flex-col justify-center py-14 lg:min-h-[86svh] lg:py-24">
        <div className="pf-shell grid items-center gap-10 lg:grid-cols-[3fr_2fr] lg:gap-12">
          {/* race bib: pure HTML/CSS */}
          <div className="pf-bib-wrap flex justify-center lg:order-2 lg:justify-self-center" aria-hidden="true">
            <div className="pf-bib-scale">
              <div className="pf-bib">
                {PINS.map((p) => (
                  <i key={p} className={`pf-bib-pin absolute ${p}`} />
                ))}
                <div className="pf-bib-paper">
                  <p className="pf-bib-next">Next lap</p>
                  <p className="pf-bib-year">2026</p>
                  <p className="pf-bib-name">Ardian Setiawan</p>
                  <p className="pf-bib-role">Software Engineer · AI Orchestrator</p>
                  <p className="pf-bib-strip">No finish line</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-start lg:order-1">
            <h2 className="pf-reach">
              Reach
              <br />
              Out
            </h2>
            <a href="mailto:ardians1945@gmail.com" className="pf-mail mt-6 w-fit text-lg font-semibold lg:mt-9">
              ardians1945@gmail.com
            </a>
            <div className="mt-7 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <a
                href="mailto:ardians1945@gmail.com?subject=Project%20inquiry"
                className={`${btn} bg-[var(--pf-butter)] text-[var(--pf-ink)] hover:bg-transparent hover:text-[var(--pf-butter)]`}
              >
                Start a project
              </a>
              <a
                href="https://wa.me/6285129488941"
                target="_blank"
                rel="noopener noreferrer"
                className={`${btn} text-[var(--pf-butter)] hover:bg-[var(--pf-butter)] hover:text-[var(--pf-ink)]`}
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>

        <div className="pf-shell mt-12 flex flex-col items-start gap-4 lg:absolute lg:inset-x-0 lg:bottom-6 lg:mt-0 lg:flex-row lg:flex-wrap lg:items-end lg:justify-between">
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
