"use client";

import { useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore } from "react";
import { useScroll, useTransform, useMotionValueEvent, m } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useLenis } from "lenis/react";
import Image from "next/image";
import Link from "next/link";
import Lanyard from "./lanyard/Lanyard";
import HeroTitle from "./HeroTitle";

// Hero artwork is served through next/image so it gets resized + converted to AVIF/WebP
// (the raw files are ~5.5 MB of JPG/PNG when loaded as CSS backgrounds).
const BG_IMAGE_1 = "/kapal-mural-1.jpg";
const BG_IMAGE_2 = "/kapal-mural-1-metalix.jpeg";
const BG_PARALLAX_SKY = "/sky-dan-ombak-bawah.jpeg";
const PNG_SHIP = "/kapal-only-no-bg.png";
const JPG_WAVES_FG = "/ombak-atas.png";
const PNG_CLOUDS_TOP = "/sky-atas-no-bg.png";

const SPOTLIGHT_R = 260;

// Same falloff as the old canvas gradient, but done natively by the compositor via a CSS mask.
// Cursor position is pushed through CSS variables, so moving the mouse never re-renders React.
const SPOTLIGHT_MASK = `radial-gradient(circle ${SPOTLIGHT_R}px at var(--spot-x, -999px) var(--spot-y, -999px), #000 0%, #000 40%, rgba(0,0,0,0.75) 60%, rgba(0,0,0,0.4) 75%, rgba(0,0,0,0.12) 88%, transparent 100%)`;

const REVEAL_QUERY = "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)";
const subscribeReveal = (cb: () => void) => {
  const mq = window.matchMedia(REVEAL_QUERY);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};
const getRevealSnapshot = () => window.matchMedia(REVEAL_QUERY).matches;
const getRevealServerSnapshot = () => false;

const NAV_ITEMS = [
  { name: "About", id: "about", href: "#about" },
  { name: "Skills", id: "skills", href: "#skills" },
  { name: "Certificates", id: "certificates", href: "#certificates" },
  { name: "Projects", id: "projects", href: "#projects" },
  { name: "Achievements", id: "achievement", href: "#achievement" },
];

export default function LithosHero() {
  const heroRef = useRef<HTMLElement | null>(null);
  const revealRef = useRef<HTMLDivElement | null>(null);
  // Spotlight only makes sense with a real mouse (and is skipped for reduced-motion users)
  const enableReveal = useSyncExternalStore(subscribeReveal, getRevealSnapshot, getRevealServerSnapshot);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("about");
  const [isLightHeader, setIsLightHeader] = useState(false);

  useEffect(() => {
    let ticking = false;
    const update = () => {
      ticking = false;
      const triggerPoint = window.innerHeight * 0.45;
      const sectionIds = ["achievement", "projects", "certificates", "skills", "about"];

      for (const id of sectionIds) {
        const element = document.getElementById(id);
        if (element && element.getBoundingClientRect().top <= triggerPoint) {
          setActiveSection(id);
          break;
        }
      }

      // Everything after the hero (cloud voyage + alabaster sections) is light, so switch the
      // header to light mode as soon as the hero has scrolled out from under it.
      const hero = heroRef.current;
      if (hero) {
        setIsLightHeader(window.scrollY > 10 && hero.getBoundingClientRect().bottom <= 80);
      }
    };
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    update();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Section 2 Parallax Scroll Target
  const targetRef = useRef<HTMLDivElement | null>(null);

  // The voyage stage sits just below the fold, but Chrome still counted its (lazy) cloud layer
  // as the Largest Contentful Paint on phones (LCP 3.5s). Keep the stage unpainted until the
  // section actually enters the viewport; its images are still fetched ahead by native lazy loading.
  const [voyageShown, setVoyageShown] = useState(false);
  useEffect(() => {
    const el = targetRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVoyageShown(true);
        io.disconnect();
      }
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  // "About" lives inside the sticky parallax stage (fully shown between ~68% and ~92% progress),
  // so a plain anchor jump lands on an invisible card. Scroll to where it is fully shown instead.
  const lenis = useLenis();
  const scrollToSection = (id: string) => {
    let top: number | null = null;
    if (id === "about" && targetRef.current) {
      const section = targetRef.current;
      top = section.offsetTop + (section.offsetHeight - window.innerHeight) * 0.78;
    } else {
      const el = document.getElementById(id);
      if (el) top = el.getBoundingClientRect().top + window.scrollY;
    }
    if (top === null) return;
    if (lenis) {
      // long, eased glide; duration scales a little with distance
      const distance = Math.abs(top - window.scrollY);
      lenis.scrollTo(top, { duration: Math.min(2.2, 0.9 + distance / 4000), easing: (t) => 1 - Math.pow(1 - t, 4) });
    } else {
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  // Sliding active pill in the desktop nav
  const pillRef = useRef<HTMLDivElement | null>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const [indicator, setIndicator] = useState<{ x: number; w: number } | null>(null);
  useLayoutEffect(() => {
    const el = linkRefs.current[activeSection];
    if (!el) return;
    const measure = () => setIndicator({ x: el.offsetLeft, w: el.offsetWidth });
    measure();
    // re-measure when the web font swaps in or the layout changes
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    if (pillRef.current) ro.observe(pillRef.current);
    return () => ro.disconnect();
  }, [activeSection]);

  // Parallax Layer Transformations (Ship voyage completes first: 0.0 -> 0.55)
  const skyScale = useTransform(scrollYProgress, [0, 0.55], [1, 1.15]);
  const skyOpacity = useTransform(scrollYProgress, [0, 0.55], [0.7, 1]);

  const cloudsScale = useTransform(scrollYProgress, [0, 0.55], [1.1, 0.85]);
  const cloudsY = useTransform(scrollYProgress, [0, 0.55], [-120, -280]);

  const shipScale = useTransform(scrollYProgress, [0, 0.55], [0.85, 1.4]);
  const shipRotate = useTransform(scrollYProgress, [0, 0.55], [-2, 3]);
  const shipY = useTransform(scrollYProgress, [0, 0.55], [40, -30]);

  const wavesScale = useTransform(scrollYProgress, [0, 0.55], [1, 1.3]);
  const wavesY = useTransform(scrollYProgress, [0, 0.55], [-40, 60]);

  // About Card appears ONLY AFTER ship voyage completes (0.55 -> 0.68, stays until 0.92)
  const textOpacity = useTransform(scrollYProgress, [0.55, 0.68, 0.92, 0.98], [0, 1, 1, 0]);
  const textY = useTransform(scrollYProgress, [0.55, 0.68], [60, 0]);

  // 3D lanyard: start loading once the voyage is underway, run only while the About card is visible
  const [lanyardMount, setLanyardMount] = useState(false);
  const [lanyardActive, setLanyardActive] = useState(false);
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    if (p > 0.25 && !lanyardMount) setLanyardMount(true);
    const visible = p > 0.56 && p < 0.985;
    if (visible !== lanyardActive) setLanyardActive(visible);
  });

  // Spotlight reveal: only on devices with a real mouse, and only while the hero is on screen.
  useEffect(() => {
    if (!enableReveal) return;

    const hero = heroRef.current;
    if (!hero) return;

    const target = { x: -999, y: -999 };
    const smooth = { x: -999, y: -999 };
    let raf: number | null = null;
    let heroVisible = true;

    const paint = () => {
      const el = revealRef.current;
      if (!el) return;
      el.style.setProperty("--spot-x", `${smooth.x}px`);
      el.style.setProperty("--spot-y", `${smooth.y}px`);
    };

    const step = () => {
      if (smooth.x === -999) {
        smooth.x = target.x;
        smooth.y = target.y;
      } else {
        smooth.x += (target.x - smooth.x) * 0.1;
        smooth.y += (target.y - smooth.y) * 0.1;
      }
      paint();
      // Stop the loop once the spotlight has caught up with the cursor
      if (Math.abs(target.x - smooth.x) < 0.3 && Math.abs(target.y - smooth.y) < 0.3) {
        raf = null;
        return;
      }
      raf = requestAnimationFrame(step);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!heroVisible) return;
      const rect = hero.getBoundingClientRect();
      target.x = e.clientX - rect.left;
      target.y = e.clientY - rect.top;
      if (raf === null) raf = requestAnimationFrame(step);
    };

    const io = new IntersectionObserver(([entry]) => {
      heroVisible = entry.isIntersecting;
      if (!heroVisible && raf !== null) {
        cancelAnimationFrame(raf);
        raf = null;
      }
    });
    io.observe(hero);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      io.disconnect();
      if (raf !== null) cancelAnimationFrame(raf);
    };
  }, [enableReveal]);

  return (
    <div
      className="min-h-screen bg-black tracking-[-0.02em] text-white"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* Navigation (fixed, persistent over page) */}
      <nav className={`fixed top-0 left-0 right-0 z-[100] flex items-center justify-between p-4 sm:p-5 transition-all duration-500 ${
        isLightHeader 
          ? "bg-[#F5F4F0]/95 border-b border-gray-300/80 shadow-sm" 
          : "bg-transparent"
      }`}>
        <Link href="/" className="flex items-center gap-3 group">
          <Image 
            src={isLightHeader ? "/logo-black.svg" : "/logo-white.svg"} 
            alt="Asterix Studio Logo" 
            width={150}
            height={36}
            className="h-7 sm:h-9 w-auto object-contain transform group-hover:scale-105 transition-transform" 
            priority
          />
          <span className={`hidden sm:inline-block text-[10px] uppercase font-mono tracking-widest px-2 py-0.5 rounded-md border transition-all ${
            isLightHeader ? "bg-gray-900/10 text-gray-900 border-gray-900/20" : "bg-white/15 text-white/90 border-white/20"
          }`}>
            Portfolio
          </span>
        </Link>

        {/* Center Pill */}
        <div ref={pillRef} className={`hidden md:flex absolute left-1/2 -translate-x-1/2 rounded-full px-2 py-2 items-center gap-1 transition-colors duration-500 ${
          isLightHeader
            ? "bg-gray-200/95 border border-gray-300 shadow-inner"
            : "bg-black/30 border border-white/25"
        }`}>
          {/* One pill that glides to the active link */}
          <span
            aria-hidden="true"
            className={`absolute top-2 bottom-2 left-0 rounded-full shadow-md transition-[transform,width,background-color,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isLightHeader ? "bg-gray-900" : "bg-white"
            }`}
            style={{
              width: indicator?.w ?? 0,
              transform: `translateX(${indicator?.x ?? 0}px)`,
              opacity: indicator ? 1 : 0,
            }}
          />
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.name}
                ref={(el) => {
                  linkRefs.current[item.id] = el;
                }}
                aria-current={isActive ? "true" : undefined}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveSection(item.id);
                  scrollToSection(item.id);
                }}
                className={`relative z-10 px-4 py-1.5 rounded-full text-sm font-medium transition-colors duration-300 ${
                  isActive
                    ? isLightHeader
                      ? "text-white"
                      : "text-gray-900"
                    : isLightHeader
                      ? "text-gray-700 hover:text-gray-900"
                      : "text-white/85 hover:text-white"
                }`}
              >
                {item.name}
              </a>
            );
          })}
        </div>

        {/* Right Desktop Action */}
        <a
          href="#footer"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection("footer");
          }}
          className={`hidden md:block text-sm font-semibold px-6 py-2.5 rounded-full transition-all shadow-sm ${
            isLightHeader 
              ? "bg-gray-900 text-white hover:bg-gray-800" 
              : "bg-white text-gray-900 hover:bg-gray-100"
          }`}
        >
          Contact Me
        </a>

        {/* Mobile menu toggle */}
        <button
          className={`md:hidden p-2 focus:outline-none transition-colors ${
            isLightHeader ? "text-gray-900" : "text-white"
          }`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile dropdown */}
        {mobileMenuOpen && (
          <div className={`md:hidden absolute top-full left-4 right-4 mt-2 border rounded-2xl p-4 flex flex-col gap-3 z-[100] shadow-2xl transition-all ${
            isLightHeader
              ? "bg-[#F5F4F0]/95 border-gray-300 text-gray-900"
              : "bg-black/90 border-white/20 text-white"
          }`}>
            {NAV_ITEMS.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  setMobileMenuOpen(false);
                  setActiveSection(item.id);
                  scrollToSection(item.id);
                }}
                className={`px-4 py-2 rounded-xl text-sm font-medium text-left transition-colors ${
                  activeSection === item.id
                    ? isLightHeader
                      ? "bg-gray-900 text-white font-semibold"
                      : "bg-white/20 text-white font-semibold"
                    : isLightHeader
                      ? "text-gray-700 hover:text-gray-900"
                      : "text-white/80 hover:text-white"
                }`}
              >
                {item.name}
              </a>
            ))}
            <div className={`pt-2 border-t ${isLightHeader ? "border-gray-300" : "border-white/10"}`}>
              <a
                href="#footer"
                onClick={(e) => {
                  e.preventDefault();
                  setMobileMenuOpen(false);
                  scrollToSection("footer");
                }}
                className={`block text-center w-full text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors ${
                  isLightHeader ? "bg-gray-900 text-white hover:bg-gray-800" : "bg-white text-gray-900 hover:bg-gray-100"
                }`}
              >
                Contact Me
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* SECTION 1: HERO SECTION (Spotlight Reveal) */}
      <section
        ref={heroRef}
        className="relative w-full overflow-hidden h-screen bg-black"
        style={{ height: "100dvh" }}
      >
        {/* 1. Base Image (z-10) — LCP image, loaded with priority */}
        <div className="absolute inset-0 hero-zoom z-10">
          <Image
            src={BG_IMAGE_1}
            alt=""
            fill
            priority
            sizes="100vw"
           
            className="object-cover object-center"
          />
        </div>

        {/* 2. Reveal Layer (z-30) — metallic version shown through a cursor spotlight (desktop only) */}
        {enableReveal && (
          <div
            ref={revealRef}
            className="absolute inset-0 z-30 pointer-events-none"
            style={{ maskImage: SPOTLIGHT_MASK, WebkitMaskImage: SPOTLIGHT_MASK }}
            aria-hidden="true"
          >
            <Image
              src={BG_IMAGE_2}
              alt=""
              fill
              sizes="100vw"
             
              className="object-cover object-center"
            />
          </div>
        )}

        {/* Legibility scrims: the light mural made the white copy hard to read */}
        <div className="absolute inset-x-0 top-0 h-[55%] bg-gradient-to-b from-black/35 via-black/10 to-transparent pointer-events-none z-[35]" />
        <div className="absolute inset-x-0 bottom-0 h-[50%] bg-gradient-to-t from-black/55 via-black/20 to-transparent pointer-events-none z-[35]" />

        {/* 3. Heading (z-50) */}
        <div className="absolute top-[14%] left-0 right-0 flex flex-col items-center text-center px-5 pointer-events-none z-50">
          <HeroTitle />
        </div>

        {/* 4. Bottom-left paragraph (z-50) */}
        <div
          className="hidden sm:block absolute bottom-32 left-10 md:left-14 max-w-[320px] z-50 hero-anim hero-fade"
          style={{ animationDelay: "0.7s" }}
        >
          <p className="text-sm text-white/95 leading-relaxed font-medium" style={{ textShadow: "0 2px 8px rgba(0,0,0,0.7)" }}>
            Building scalable web products and high-converting landing pages through seamless design and fullstack execution.
          </p>
        </div>

        {/* 5. Bottom-right block (z-50) */}
        <div
          className="absolute bottom-20 sm:bottom-32 left-5 right-5 sm:left-auto sm:right-10 md:right-14 max-w-full sm:max-w-[280px] flex flex-col items-start gap-4 sm:gap-5 z-50 hero-anim hero-fade"
          style={{ animationDelay: "0.85s" }}
        >
          <p className="text-xs sm:text-sm text-white/95 leading-relaxed font-medium" style={{ textShadow: "0 2px 8px rgba(0,0,0,0.7)" }}>
            Scroll down to explore my background, technical expertise, and featured works.
          </p>
          <a
            href="#about"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("about");
            }}
            className="bg-[#e8702a] hover:bg-[#d2611f] text-white text-sm font-semibold px-7 py-3 rounded-full transition-all hover:scale-[1.03] active:scale-95 hover:shadow-lg hover:shadow-[#e8702a]/30">
            Explore Portfolio
          </a>
        </div>

        {/* Bottom Fade to Alabaster Light Gradient Overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-16 sm:h-24 bg-gradient-to-t from-[#F5F4F0] via-[#F5F4F0]/70 to-transparent pointer-events-none z-40" />
      </section>

      {/* Warm Alabaster Breathing Room Spacer */}
      <div className="w-full h-4 sm:h-8 bg-[#F5F4F0] relative z-30 pointer-events-none" />

      {/* SECTION 2: 2.5D PARALLAX SCROLL VOYAGE SECTION */}
      <section ref={targetRef} className="relative h-[270vh] bg-black">
        <div className={`sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-black ${voyageShown ? "" : "invisible"}`}>
          {/* Top Fade from Alabaster Light Gradient Overlay */}
          <div className="absolute top-0 left-0 right-0 h-16 sm:h-24 bg-gradient-to-b from-[#F5F4F0] via-[#F5F4F0]/70 to-transparent pointer-events-none z-30" />

          {/* Layer 1: Background Sky & Sea (z-10) */}
          <m.div
            className="absolute inset-0 z-10 will-change-transform"
            style={{ scale: skyScale, opacity: skyOpacity }}
          >
            <Image src={BG_PARALLAX_SKY} alt="" fill sizes="100vw" className="object-cover object-center" />
          </m.div>

          {/* Layer 1.5: Top Clouds Layer (z-15) */}
          <m.div
            className="absolute -top-12 sm:-top-20 left-0 right-0 h-[90vh] sm:h-[100vh] pointer-events-none z-15 will-change-transform"
            style={{ scale: cloudsScale, y: cloudsY }}
          >
            <Image src={PNG_CLOUDS_TOP} alt="" fill sizes="100vw" className="object-cover object-top" />
          </m.div>

          {/* Layer 2: Ship Layer (z-20) */}
          <m.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none z-20 will-change-transform"
            style={{
              scale: shipScale,
              rotate: shipRotate,
              y: shipY,
            }}
          >
            <Image
              src={PNG_SHIP}
              alt="Sailing ship sculpture"
              width={1376}
              height={768}
              sizes="(min-width: 1024px) 80vw, 100vw"
             
              className="w-auto max-h-[70vh] object-contain drop-shadow-2xl"
            />
          </m.div>

          {/* Layer 3: Foreground Waves Layer (z-30) */}
          <m.div
            className="absolute bottom-0 left-0 right-0 h-[55vh] sm:h-[65vh] pointer-events-none z-30 will-change-transform"
            style={{ scale: wavesScale, y: wavesY }}
          >
            <Image src={JPG_WAVES_FG} alt="" fill sizes="100vw" className="object-cover object-top" />
          </m.div>

          {/* Layer 4: Complete Floating About Card Overlay over Ship (z-45) */}
          <m.div
            id="about"
            className="absolute z-45 w-[94%] sm:w-[88%] max-w-5xl px-6 py-6 sm:px-10 sm:py-10 bg-[#18181b]/[0.88] border border-white/30 border-t-white/50 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] pointer-events-auto overflow-hidden group"
            style={{
              opacity: textOpacity,
              y: textY,
            }}
          >
            {/* Subtle Glossy Ambient Light */}
            <div className="absolute -top-24 -left-24 w-72 h-72 bg-white/10 blur-[60px] rounded-full pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-[#e8702a]/15 blur-[60px] rounded-full pointer-events-none" />

            <div className="relative flex flex-col md:flex-row gap-6 md:gap-10 items-stretch">
              {/* 3D lanyard ID card — hangs from the top edge of the glass card (desktop) */}
              <div className="hidden md:block w-[300px] lg:w-[340px] shrink-0 -mt-10 -mb-10 h-[480px]">
                <Lanyard mount={lanyardMount} active={lanyardActive} />
              </div>

              {/* Bio & Details Column */}
              <div className="w-full md:flex-1 flex flex-col justify-center text-left">
                <div className="flex items-center gap-4 mb-6">
                  {/* Compact portrait on phones, where the 3D card is not shown */}
                  <div className="md:hidden relative w-14 h-14 shrink-0 overflow-hidden rounded-full border border-white/30">
                    <Image src="/profile.webp" alt="Ardian Setiawan" fill sizes="56px" className="object-cover" />
                  </div>
                  <h2 className="text-xs sm:text-sm text-[#e8702a] uppercase tracking-[0.3em] font-cinzel border-l-2 border-[#e8702a] pl-4 text-left font-bold">
                    Who I Am
                  </h2>
                </div>
                <div className="mb-6">
                  <p className="text-lg sm:text-2xl md:text-3xl font-display font-medium text-white leading-snug mb-4">
                    Hi, I&apos;m <span className="text-[#e8702a] font-bold">Ardian Setiawan</span> — UI/UX Designer &amp; Web Developer dedicated to designing and building intuitive landing pages, dashboards, and scalable web applications.
                  </p>
                  <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-sans">
                    Skilled in translating user needs and business objectives into intuitive, visually consistent, and developer-ready interfaces.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 border-t border-white/15 pt-6 font-sans">
                  <div>
                    <h3 className="text-white text-base font-bold font-display mb-1">Location</h3>
                    <p className="text-gray-400 font-mono text-xs sm:text-sm">Indonesia, Remote</p>
                  </div>
                  <div>
                    <h3 className="text-white text-base font-bold font-display mb-1">Experience</h3>
                    <p className="text-gray-400 font-mono text-xs sm:text-sm">3+ Years in Field</p>
                  </div>
                </div>
              </div>
            </div>
          </m.div>

          {/* Bottom Fade to Alabaster Transition (z-50) */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent via-[#F5F4F0]/60 to-[#F5F4F0] pointer-events-none z-50" />
        </div>
      </section>
    </div>
  );
}


