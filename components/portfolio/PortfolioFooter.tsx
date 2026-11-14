import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { LiquidBlob, InkCurl } from "./LiquidBlob";

const SOCIALS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/ardian-setiawan45", Icon: FaLinkedin },
  { label: "GitHub", href: "https://github.com/ardians45", Icon: FaGithub },
  { label: "Instagram", href: "https://instagram.com/ardilan_90", Icon: FaInstagram },
];

export default function PortfolioFooter() {
  return (
    <footer id="contact" className="relative isolate overflow-hidden bg-[var(--pf-ink)] text-[var(--pf-butter)]">
      {/* the yellow world drips into the black footer */}
      <LiquidBlob className="absolute -top-[18%] right-[-10%] w-[70vw] max-w-[900px] text-[var(--pf-butter)] -z-10 rotate-180" duration={11} />
      <InkCurl className="absolute top-[2%] left-[30%] w-[20vw] max-w-[280px] text-[var(--pf-butter)] -z-10 hidden md:block" />

      <div className="pf-wrap flex min-h-[100svh] flex-col justify-end pt-40 pb-10">
        <p className="pf-label mb-4">Got a project? Let&apos;s talk.</p>
        <h2 className="pf-reach">Reach out</h2>

        <div className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <a href="mailto:ardians1945@gmail.com" className="pf-mail pf-display text-2xl md:text-4xl font-extrabold tracking-tight">
            ardians1945@gmail.com
          </a>
          <ul className="flex flex-wrap gap-2">
            {SOCIALS.map(({ label, href, Icon }) => (
              <li key={label}>
                <a href={href} target="_blank" rel="noopener noreferrer" className="pf-pill pf-pill--dark">
                  <Icon aria-hidden="true" /> {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-14 flex flex-wrap justify-between gap-4 border-t border-[var(--pf-butter)]/30 pt-6 pf-label !text-[var(--pf-butter)]/70">
          <span>South Tangerang, Banten</span>
          <span>© {new Date().getFullYear()} Ardian Setiawan · Asterix Studio</span>
        </div>
      </div>
    </footer>
  );
}
