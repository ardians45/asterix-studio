"use client";

import { useEffect, useState } from "react";
import { useLenis } from "lenis/react";
import { FaGithub, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const LINKS = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Journey", href: "#journey" },
  { label: "Awards", href: "#awards" },
  { label: "Contact", href: "#contact" },
];

// same profiles as the footer
const SOCIALS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/ardian-setiawan45", Icon: FaLinkedinIn },
  { label: "GitHub", href: "https://github.com/ardians45", Icon: FaGithub },
  { label: "Instagram", href: "https://instagram.com/ardilan_90", Icon: FaInstagram },
];

export default function PortfolioNav() {
  const [open, setOpen] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    if (open) lenis?.stop();
    else lenis?.start();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, lenis]);

  // the full-screen menu only exists below 1024px: close it if the window grows past that
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => mq.matches && setOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const go = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setOpen(false);
    const el = document.querySelector(href);
    if (!el) return;
    if (lenis) lenis.scrollTo(el as HTMLElement, { offset: href === "#top" ? 0 : -72 });
    else el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <header className="pf-nav fixed inset-x-0 top-0 z-50">
        <div className="pf-wrap pf-nav-inner">
          <a href="#top" onClick={(e) => go(e, "#top")} aria-label="Ardian, back to top" className="pf-nav-brand">
            <span className="pf-logo-mark" aria-hidden="true" />
          </a>

          <nav aria-label="Portfolio" className="pf-nav-links hidden lg:flex">
            {LINKS.map((l) => (
              <a key={l.href} href={l.href} onClick={(e) => go(e, l.href)} className="pf-nav-link">
                {l.label}
              </a>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <span className="pf-nav-status">
              <i aria-hidden="true" />
              Now building: race timing system
            </span>
            <ul className="flex items-center gap-2">
              {SOCIALS.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="pf-social">
                    <Icon aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
            <a href="#contact" onClick={(e) => go(e, "#contact")} className="pf-nav-cta">
              Contact
            </a>
          </div>

          <button
            type="button"
            className="pf-pill lg:hidden"
            aria-expanded={open}
            aria-controls="pf-menu"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </header>

      <div
        id="pf-menu"
        hidden={!open}
        className="fixed inset-0 z-40 bg-[#0E0E0E] text-[#FFD60A] px-6 pt-28 pb-10 lg:hidden"
      >
        <nav aria-label="Portfolio mobile" className="flex flex-col gap-2">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={(e) => go(e, l.href)}
              className="pf-display text-6xl font-black uppercase tracking-tight leading-[1.05] py-1"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <ul className="mt-8 flex items-center gap-3">
          {SOCIALS.map(({ label, href, Icon }) => (
            <li key={label}>
              <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="pf-social pf-menu-social">
                <Icon aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
