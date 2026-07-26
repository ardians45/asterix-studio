"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";

const BG_IMAGE_1 = "/kapal-mural-1.jpg";
const BG_IMAGE_2 = "/kapal-mural-1-metalix.jpeg";
const BG_PARALLAX_SKY = "/sky-dan-ombak-bawah.jpeg";
const PNG_SHIP = "/kapal-only-no-bg.png";
const JPG_WAVES_FG = "/ombak-atas.png";
const PNG_CLOUDS_TOP = "/sky-atas-no-bg.png";

const SPOTLIGHT_R = 260;

interface RevealLayerProps {
  image: string;
  cursorX: number;
  cursorY: number;
}

function RevealLayer({ image, cursorX, cursorY }: RevealLayerProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const revealDivRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const revealDiv = revealDivRef.current;
    if (!canvas || !revealDiv) return;

    const width = window.innerWidth;
    const height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, width, height);

    if (cursorX >= 0 && cursorY >= 0) {
      const grad = ctx.createRadialGradient(
        cursorX,
        cursorY,
        0,
        cursorX,
        cursorY,
        SPOTLIGHT_R
      );
      grad.addColorStop(0, "rgba(255, 255, 255, 1)");
      grad.addColorStop(0.4, "rgba(255, 255, 255, 1)");
      grad.addColorStop(0.6, "rgba(255, 255, 255, 0.75)");
      grad.addColorStop(0.75, "rgba(255, 255, 255, 0.4)");
      grad.addColorStop(0.88, "rgba(255, 255, 255, 0.12)");
      grad.addColorStop(1, "rgba(255, 255, 255, 0)");

      ctx.beginPath();
      ctx.arc(cursorX, cursorY, SPOTLIGHT_R, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();

      const maskDataUrl = canvas.toDataURL();
      revealDiv.style.maskImage = `url("${maskDataUrl}")`;
      revealDiv.style.webkitMaskImage = `url("${maskDataUrl}")`;
      revealDiv.style.maskSize = "100% 100%";
      revealDiv.style.webkitMaskSize = "100% 100%";
    }
  }, [cursorX, cursorY]);

  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ display: "none" }}
      />
      <div
        ref={revealDivRef}
        className="absolute inset-0 bg-center bg-cover bg-no-repeat z-30 pointer-events-none"
        style={{ backgroundImage: `url(${image})` }}
      />
    </>
  );
}

export default function LithosHero() {
  // Mouse tracking & smooth lerp
  const mouse = useRef({ x: -999, y: -999 });
  const smooth = useRef({ x: -999, y: -999 });
  const rafRef = useRef<number | null>(null);
  const [cursorPos, setCursorPos] = useState({ x: -999, y: -999 });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("about");
  const [isLightHeader, setIsLightHeader] = useState(false);

  useEffect(() => {
    const handleScrollObserver = () => {
      const triggerPoint = window.innerHeight * 0.45;
      const sectionIds = ["achievement", "projects", "certificates", "skills", "about"];
      
      for (const id of sectionIds) {
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= triggerPoint) {
            setActiveSection(id);
            break;
          }
        }
      }

      // Check header light mode threshold (when scrolled past hero voyage to #skills)
      const skillsElem = document.getElementById("skills");
      if (skillsElem) {
        const top = skillsElem.getBoundingClientRect().top;
        if (top <= 120) {
          setIsLightHeader(true);
        } else {
          setIsLightHeader(false);
        }
      }
    };

    window.addEventListener("scroll", handleScrollObserver, { passive: true });
    handleScrollObserver();
    return () => window.removeEventListener("scroll", handleScrollObserver);
  }, []);

  // Section 2 Parallax Scroll Target
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

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

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      if (mouse.current.x !== -999 && mouse.current.y !== -999) {
        if (smooth.current.x === -999) {
          smooth.current.x = mouse.current.x;
          smooth.current.y = mouse.current.y;
        } else {
          smooth.current.x += (mouse.current.x - smooth.current.x) * 0.1;
          smooth.current.y += (mouse.current.y - smooth.current.y) * 0.1;
        }
        setCursorPos({ x: smooth.current.x, y: smooth.current.y });
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      className="min-h-screen bg-black tracking-[-0.02em] text-white"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* Navigation (fixed, persistent over page) */}
      <nav className={`fixed top-0 left-0 right-0 z-[100] flex items-center justify-between p-4 sm:p-5 transition-all duration-500 ${
        isLightHeader 
          ? "bg-[#F5F4F0]/85 backdrop-blur-xl border-b border-gray-300/80 shadow-sm" 
          : "bg-transparent"
      }`}>
        <a href="/" className="flex items-center gap-3 group">
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
        </a>

        {/* Center Pill */}
        <div className={`hidden md:flex absolute left-1/2 -translate-x-1/2 rounded-full px-2 py-2 items-center gap-1 transition-all duration-300 ${
          isLightHeader
            ? "bg-gray-200/90 backdrop-blur-md border border-gray-300 shadow-inner"
            : "bg-white/20 backdrop-blur-md border border-white/30"
        }`}>
          {[
            { name: "About", id: "about", href: "#about" },
            { name: "Skills", id: "skills", href: "#skills" },
            { name: "Certificates", id: "certificates", href: "#certificates" },
            { name: "Projects", id: "projects", href: "#projects" },
            { name: "Achievements", id: "achievement", href: "#achievement" },
          ].map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveSection(item.id);
                  if (item.id === "about" && targetRef.current) {
                    const top = targetRef.current.offsetTop + targetRef.current.offsetHeight * 0.7;
                    window.scrollTo({ top, behavior: "smooth" });
                  } else {
                    const el = document.getElementById(item.id);
                    if (el) {
                      el.scrollIntoView({ behavior: "smooth" });
                    }
                  }
                }}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? isLightHeader 
                      ? "bg-gray-900 text-white shadow-md font-semibold"
                      : "bg-white text-gray-900 shadow-md font-semibold"
                    : isLightHeader
                      ? "text-gray-700 hover:bg-gray-300/80 hover:text-gray-900 font-medium"
                      : "text-white/80 hover:bg-white/20 hover:text-white"
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
            const el = document.getElementById("footer");
            if (el) el.scrollIntoView({ behavior: "smooth" });
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
          <div className={`md:hidden absolute top-full left-4 right-4 mt-2 backdrop-blur-xl border rounded-2xl p-4 flex flex-col gap-3 z-[100] shadow-2xl transition-all ${
            isLightHeader
              ? "bg-[#F5F4F0]/95 border-gray-300 text-gray-900"
              : "bg-black/90 border-white/20 text-white"
          }`}>
            {[
              { name: "About", id: "about", href: "#about" },
              { name: "Skills", id: "skills", href: "#skills" },
              { name: "Certificates", id: "certificates", href: "#certificates" },
              { name: "Projects", id: "projects", href: "#projects" },
              { name: "Achievements", id: "achievement", href: "#achievement" },
            ].map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  setMobileMenuOpen(false);
                  setActiveSection(item.id);
                  if (item.id === "about" && targetRef.current) {
                    const top = targetRef.current.offsetTop + targetRef.current.offsetHeight * 0.7;
                    window.scrollTo({ top, behavior: "smooth" });
                  } else {
                    const el = document.getElementById(item.id);
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }
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
            <div className="pt-2 border-t border-white/10">
              <a
                href="#footer"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-center w-full bg-white text-gray-900 text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-gray-100 transition-colors"
              >
                Contact Me
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* SECTION 1: HERO SECTION (Spotlight Reveal) */}
      <section
        className="relative w-full overflow-hidden h-screen bg-black"
        style={{ height: "100dvh" }}
      >
        {/* 1. Base Image (z-10) */}
        <div
          className="absolute inset-0 bg-center bg-cover bg-no-repeat hero-zoom z-10"
          style={{ backgroundImage: `url(${BG_IMAGE_1})` }}
        />

        {/* 2. Reveal Layer (z-30) */}
        <RevealLayer
          image={BG_IMAGE_2}
          cursorX={cursorPos.x}
          cursorY={cursorPos.y}
        />

        {/* 3. Heading (z-50) */}
        <div className="absolute top-[14%] left-0 right-0 flex flex-col items-center text-center px-5 pointer-events-none z-50">
          <h1 className="text-white leading-[0.95]">
            <span
              className="block font-cinzel font-normal text-5xl sm:text-7xl md:text-8xl hero-anim hero-reveal"
              style={{ letterSpacing: "-0.05em", animationDelay: "0.25s", textShadow: "0 2px 12px rgba(0,0,0,0.75)" }}
            >
              Design with Purpose
            </span>
            <span
              className="block font-normal text-5xl sm:text-7xl md:text-8xl -mt-1 hero-anim hero-reveal"
              style={{ letterSpacing: "-0.08em", animationDelay: "0.42s", textShadow: "0 2px 12px rgba(0,0,0,0.75)" }}
            >
              code with precision
            </span>
          </h1>
        </div>

        {/* 4. Bottom-left paragraph (z-50) */}
        <div
          className="hidden sm:block absolute bottom-14 left-10 md:left-14 max-w-[320px] z-50 hero-anim hero-fade"
          style={{ animationDelay: "0.7s" }}
        >
          <p className="text-sm text-white/95 leading-relaxed font-medium" style={{ textShadow: "0 2px 8px rgba(0,0,0,0.7)" }}>
            Building scalable web products and high-converting landing pages through seamless design and fullstack execution.
          </p>
        </div>

        {/* 5. Bottom-right block (z-50) */}
        <div
          className="absolute bottom-10 sm:bottom-24 left-5 right-5 sm:left-auto sm:right-10 md:right-14 max-w-full sm:max-w-[280px] flex flex-col items-start gap-4 sm:gap-5 z-50 hero-anim hero-fade"
          style={{ animationDelay: "0.85s" }}
        >
          <p className="text-xs sm:text-sm text-white/95 leading-relaxed font-medium" style={{ textShadow: "0 2px 8px rgba(0,0,0,0.7)" }}>
            Scroll down to explore my background, technical expertise, and featured works.
          </p>
          <a href="#about" className="bg-[#e8702a] hover:bg-[#d2611f] text-white text-sm font-semibold px-7 py-3 rounded-full transition-all hover:scale-[1.03] active:scale-95 hover:shadow-lg hover:shadow-[#e8702a]/30">
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
        <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-black">
          {/* Top Fade from Alabaster Light Gradient Overlay */}
          <div className="absolute top-0 left-0 right-0 h-16 sm:h-24 bg-gradient-to-b from-[#F5F4F0] via-[#F5F4F0]/70 to-transparent pointer-events-none z-30" />

          {/* Layer 1: Background Sky & Sea (z-10) */}
          <motion.div
            className="absolute inset-0 bg-cover bg-center z-10"
            style={{
              backgroundImage: `url(${BG_PARALLAX_SKY})`,
              scale: skyScale,
              opacity: skyOpacity,
            }}
          />

          {/* Layer 1.5: Top Clouds Layer (z-15) */}
          <motion.div
            className="absolute -top-12 sm:-top-20 left-0 right-0 h-[90vh] sm:h-[100vh] bg-cover bg-top bg-no-repeat pointer-events-none z-15"
            style={{
              backgroundImage: `url(${PNG_CLOUDS_TOP})`,
              scale: cloudsScale,
              y: cloudsY,
            }}
          />

          {/* Layer 2: Ship Layer (z-20) */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
            style={{
              scale: shipScale,
              rotate: shipRotate,
              y: shipY,
            }}
          >
            <img
              src={PNG_SHIP}
              alt="Lithos Voyage Vessel"
              className="max-h-[70vh] object-contain drop-shadow-2xl"
            />
          </motion.div>

          {/* Layer 3: Foreground Waves Layer (z-30) */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-[55vh] sm:h-[65vh] bg-cover bg-top pointer-events-none z-30 drop-shadow-2xl"
            style={{
              backgroundImage: `url(${JPG_WAVES_FG})`,
              scale: wavesScale,
              y: wavesY,
            }}
          />

          {/* Layer 4: Complete Floating About Card Overlay over Ship (z-45) */}
          <motion.div
            id="about"
            className="absolute z-45 w-[94%] sm:w-[88%] max-w-5xl px-6 py-6 sm:px-10 sm:py-10 bg-[#18181b]/55 backdrop-blur-3xl border border-white/30 border-t-white/50 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] pointer-events-auto overflow-hidden group"
            style={{
              opacity: textOpacity,
              y: textY,
            }}
          >
            {/* Subtle Glossy Ambient Light */}
            <div className="absolute -top-24 -left-24 w-72 h-72 bg-white/10 blur-[60px] rounded-full pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-[#e8702a]/15 blur-[60px] rounded-full pointer-events-none" />
            <h2 className="text-xs sm:text-sm text-[#e8702a] uppercase tracking-[0.3em] font-cinzel border-l-2 border-[#e8702a] pl-4 mb-6 text-left font-bold">
              Who I Am
            </h2>

            <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-center md:items-start">
              {/* Profile Image & Rotating Badge */}
              <div className="w-full md:w-1/3 relative group shrink-0">
                <div className="relative w-full aspect-[3/4] max-h-[260px] sm:max-h-[320px] overflow-hidden rounded-2xl border border-white/20 shadow-xl">
                  <Image
                    src="/profile.webp"
                    alt="Ardian Setiawan"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                </div>
                
                {/* Decorative Spinning Badge */}
                <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-[#e8702a] rounded-full flex items-center justify-center animate-[spin_12s_linear_infinite] hidden md:flex shadow-lg shadow-[#e8702a]/30">
                  <svg viewBox="0 0 100 100" className="w-full h-full p-2">
                    <path
                      id="curve-overlay"
                      d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                      fill="transparent"
                    />
                    <text className="text-[10px] uppercase font-bold tracking-widest text-white fill-white">
                      <textPath href="#curve-overlay">
                        Ardian Setiawan • Asterix Studio •
                      </textPath>
                    </text>
                  </svg>
                </div>
              </div>

              {/* Bio & Details Column */}
              <div className="w-full md:w-2/3 flex flex-col justify-between text-left">
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
          </motion.div>

          {/* Bottom Fade to Alabaster Transition (z-50) */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent via-[#F5F4F0]/60 to-[#F5F4F0] pointer-events-none z-50" />
        </div>
      </section>
    </div>
  );
}
