"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLenis } from "lenis/react";

const LINKS = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Awards", href: "#awards" },
  { label: "Contact", href: "#contact" },
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

  const go = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setOpen(false);
    const el = document.querySelector(href);
    if (!el) return;
    if (lenis) lenis.scrollTo(el as HTMLElement, { offset: 0 });
    else el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <header className="pf-nav fixed inset-x-0 top-0 z-50 px-4 md:px-8 pt-4 md:pt-5 pointer-events-none">
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/"
            aria-label="Asterix Studio home"
            className="pointer-events-auto pf-pill grid h-11 w-11 place-items-center !p-0"
          >
            <Image src="/logo-black.svg" alt="" width={20} height={20} className="h-5 w-5" />
          </Link>

          <a
            href="#top"
            onClick={(e) => go(e, "#top")}
            className="pointer-events-auto pf-pill pf-oval pf-display font-extrabold tracking-tight text-sm"
          >
            ARDIAN<span className="align-super text-[0.6em]">®</span>
          </a>

          <nav aria-label="Portfolio" className="pointer-events-auto hidden md:flex items-center gap-2">
            {LINKS.map((l) => (
              <a key={l.href} href={l.href} onClick={(e) => go(e, l.href)} className="pf-pill">
                {l.label}
              </a>
            ))}
          </nav>

          <button
            type="button"
            className="pointer-events-auto pf-pill md:hidden"
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
        className="fixed inset-0 z-40 bg-[#0E0E0E] text-[#FFD60A] px-6 pt-28 pb-10 md:hidden"
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
      </div>
    </>
  );
}
