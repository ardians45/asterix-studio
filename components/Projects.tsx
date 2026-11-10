"use client";

import { m, AnimatePresence, useSpring } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";

type Project = {
  title: string;
  description: string;
  role: string;
  tech: string[];
  impact?: string;
  year: string;
  image: string;
  link: string;
};

const projects: Project[] = [
  {
    title: "Paletindo E-Catalog",
    description: "Complete digital product e-catalog built with an admin panel for inventory management. Proven to dominate Page #1 on Google organically.",
    role: "Fullstack Developer & SEO Specialist",
    tech: ["Next.js", "React", "SEO Optimization", "Tailwind CSS"],
    impact: "PageSpeed 100/100 & Google Rank #1",
    year: "2025",
    image: "/projects/showcase/paletindo/after.png",
    link: "https://paletindo.id/"
  },
  {
    title: "SR Laundry Landing Page",
    description: "Landing page transformation focused on 'Direct Booking'. Optimized user flow converting ad traffic & organic searches directly to WhatsApp inquiries.",
    role: "UI/UX & Web Developer",
    tech: ["React", "Conversion Optimization", "SEO Local", "Tailwind CSS"],
    impact: "+180% WhatsApp Inquiry & 1.2s Load",
    year: "2025",
    image: "/projects/showcase/srlaundry/after.png",
    link: "https://srlaundry.site/"
  },
  {
    title: "CareerConnect",
    description: "A centralized web platform for student career guidance, academic tracking, and school activity information. Built to bridge the gap between students and academic resources.",
    role: "Fullstack Developer",
    tech: ["React", "Tailwind CSS", "Frontend Architecture"],
    impact: "Centralized academic data access for students.",
    year: "2025",
    image: "/projects/career-connect/cc1.webp",
    link: "/projects/career-connect"
  },
  {
    title: "3D Tetris - Grunge",
    description: "A brutally aesthetic 3D Tetris game built with React, Three.js, and Tailwind CSS. Features touch controls and local persistence.",
    role: "Creative Developer",
    tech: ["React", "Three.js", "Tailwind CSS"],
    year: "2025",
    image: "/projects/3d-tetris-grunge/tetris1.webp",
    link: "/projects/3d-tetris-grunge"
  },
];

type DesignWork = {
  title: string;
  label: string;
  description: string;
  image: string;
  href: string;
  accent: string;
  hoverTitle: string;
  layout: "half" | "wide";
};

const designWorks: DesignWork[] = [
  {
    title: "BANTU Platform",
    label: "Case Study",
    description: "Empowering Indonesia's informal workforce through a transparent digital ecosystem.",
    image: "/projects/bantu-platform/bantu.webp",
    href: "/projects/bantu-platform",
    accent: "text-[#e8702a]",
    hoverTitle: "group-hover:text-amber-200",
    layout: "half",
  },
  {
    title: "Cactastic",
    label: "Case Study",
    description: "A specialized e-commerce experience for cactus enthusiasts with AI plant ID.",
    image: "/projects/cactastic/cactastic.webp",
    href: "/projects/cactastic",
    accent: "text-emerald-400",
    hoverTitle: "group-hover:text-emerald-200",
    layout: "half",
  },
  {
    title: "Greenify",
    label: "Featured Case Study",
    description: "A digital platform bridging individuals, businesses, and schools for a sustainable future.",
    image: "/projects/greenify/thumbnail.webp",
    href: "/projects/greenify",
    accent: "text-emerald-400",
    hoverTitle: "group-hover:text-emerald-200",
    layout: "wide",
  },
  {
    title: "GoGo Groceries",
    label: "Featured",
    description: "Instant quick-commerce with real-time tracking.",
    image: "/projects/gogo-groceries/thumbnail.webp",
    href: "/projects/gogo-groceries",
    accent: "text-orange-400",
    hoverTitle: "group-hover:text-orange-200",
    layout: "half",
  },
  {
    title: "LinkAja Kas",
    label: "Featured",
    description: "Collective finance management for communities.",
    image: "/projects/link-aja-kas/thumbnail.webp",
    href: "/projects/link-aja-kas",
    accent: "text-red-400",
    hoverTitle: "group-hover:text-red-200",
    layout: "half",
  },
];

const PREVIEW_W = 480;
const PREVIEW_H = 330; // header bar + 290px viewport
const PREVIEW_GAP = 28;

const isExternal = (href: string) => /^https?:\/\//.test(href);
const displayUrl = (href: string) =>
  isExternal(href) ? href.replace(/^https?:\/\//, "").replace(/\/$/, "") : `asterixstudio.site${href}`;
const linkProps = (href: string) =>
  isExternal(href) ? { target: "_blank", rel: "noopener noreferrer" } : {};

export default function Projects() {
  const [activeProject, setActiveProject] = useState<number | null>(null);
  const canHover = useRef(false);

  // Spring physics for smooth cursor following
  const mouseX = useSpring(0, { stiffness: 150, damping: 15 });
  const mouseY = useSpring(0, { stiffness: 150, damping: 15 });

  useEffect(() => {
    // Floating preview only makes sense for real pointers (not touch tablets)
    canHover.current = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  }, []);

  // Place the preview beside the cursor (not on top of it) and keep it inside the viewport
  const previewPosition = (clientX: number, clientY: number) => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    let x = clientX + PREVIEW_GAP;
    if (x + PREVIEW_W > vw - 16) x = clientX - PREVIEW_GAP - PREVIEW_W;
    const y = Math.min(Math.max(clientY - PREVIEW_H / 2, 16), vh - PREVIEW_H - 16);
    return { x, y };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (activeProject === null) return;
    const { x, y } = previewPosition(e.clientX, e.clientY);
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleEnter = (index: number, e: React.MouseEvent) => {
    if (!canHover.current) return;
    // Jump to the cursor first so the preview doesn't fly in from the corner
    const { x, y } = previewPosition(e.clientX, e.clientY);
    if (activeProject === null) {
      mouseX.jump(x);
      mouseY.jump(y);
    }
    setActiveProject(index);
  };

  return (
    <section
        id="projects"
        className="py-32 px-4 md:px-12 max-w-7xl mx-auto relative"
        onMouseMove={handleMouseMove}
    >

      {/* Floating Image Preview */}
      <AnimatePresence>
        {activeProject !== null && (
          <m.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
            className="fixed top-0 left-0 z-50 pointer-events-none hidden md:block rounded-2xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.35)] border border-gray-300/90 bg-white/95 backdrop-blur-xl"
            style={{ x: mouseX, y: mouseY, width: PREVIEW_W }}
            aria-hidden="true"
          >
            {/* Browser Window Mockup Frame Header */}
            <div className="bg-gray-100/95 border-b border-gray-200 px-4 py-2.5 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56] inline-block shadow-xs" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e] inline-block shadow-xs" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f] inline-block shadow-xs" />
              </div>
              <div className="bg-white border border-gray-200/90 rounded-md px-3 py-0.5 text-[11px] font-mono text-gray-600 truncate max-w-[250px] shadow-2xs font-medium">
                {displayUrl(projects[activeProject].link)}
              </div>
              <div className="w-10 text-right font-mono text-[10px] text-gray-400 font-semibold">
                0{activeProject + 1}
              </div>
            </div>

            {/* Image Preview Container (Crisp, readable browser viewport preview) */}
            <div className="relative w-full h-[290px] bg-white overflow-hidden">
              <Image
                src={projects[activeProject].image}
                alt=""
                fill
                sizes={`${PREVIEW_W}px`}
                className="object-cover object-top"
              />
            </div>
          </m.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col md:flex-row gap-6 md:gap-12 mb-12 md:mb-20">
        <div className="md:w-1/3">
           <h2 data-reveal="mask" className="text-xl text-[#e8702a] uppercase tracking-widest font-cinzel"><span>Selected Works</span></h2>
        </div>
        <div className="md:w-2/3">
             <h3 data-reveal="up" style={{ ["--rd" as string]: "120ms" }} className="text-3xl sm:text-4xl md:text-6xl font-display font-medium md:mb-12 text-gray-900">
                 Building functional, scalable & high-impact digital experiences.
             </h3>
        </div>
      </div>

      <div className="flex flex-col md:gap-20 gap-0">
        {projects.map((project, index) => (
          <div
             key={project.title}
             onMouseEnter={(e) => handleEnter(index, e)}
             onMouseLeave={() => setActiveProject(null)}
             className="group relative"
          >
             {/* --- MOBILE UI --- */}
             <div className="md:hidden flex flex-col w-full pt-8">
                 {/* Header */}
                 <div className="flex items-baseline gap-4 mb-4">
                     <span className="text-xs font-mono text-gray-500 shrink-0">0{index + 1} / {project.year}</span>
                     <h4 className="text-2xl font-display font-bold text-gray-900 leading-tight">{project.title}</h4>
                 </div>

                 {/* Image */}
                 <Link href={project.link} {...linkProps(project.link)} className="block w-full group/mob" aria-label={`View ${project.title}`}>
                     <div data-reveal="clip" className="relative h-[220px] sm:h-[300px] w-full bg-gray-100 overflow-hidden mb-4 rounded-md border border-gray-200">
                         <Image
                             src={project.image}
                             alt={project.title}
                             fill
                             sizes="100vw"
                             className="object-cover object-top transition-transform duration-700 group-hover/mob:scale-[1.03]"
                         />
                     </div>
                 </Link>

                 <p className="text-sm text-gray-600 leading-relaxed mb-4">{project.description}</p>

                 {project.impact && (
                     <p className="text-xs font-medium text-[#e8702a] mb-4">{project.impact}</p>
                 )}

                 {/* Footer */}
                 <div className="flex justify-between items-center gap-4 text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] text-gray-500 border-b border-gray-300 pb-10">
                     <span>{project.role}</span>
                     <Link
                         href={project.link}
                         {...linkProps(project.link)}
                         className="shrink-0 flex items-center gap-2 p-2 -mr-2 text-gray-700 hover:text-[#e8702a] transition-colors"
                     >
                          View <FaArrowRight className="text-sm" />
                     </Link>
                 </div>
             </div>

             {/* --- DESKTOP UI --- */}
             <div data-reveal="up" className="relative hidden md:flex gap-12 pt-12">
                 <div data-reveal="line" aria-hidden="true" className="absolute left-0 right-0 top-0 h-px bg-gray-300 transition-colors duration-300 group-hover:bg-[#e8702a]/60" />
                 <div className="relative z-10 md:w-1/3 mb-6 md:mb-0">
                     <span className="text-sm font-mono text-gray-500 transition-colors group-hover:text-gray-900">0{index + 1} / {project.year}</span>
                     <h4 className="text-3xl font-bold mt-2 font-display text-gray-900 transition-colors group-hover:text-[#e8702a]">{project.title}</h4>
                     <div className="mt-4 flex flex-wrap gap-2">
                         {project.tech.map((t) => (
                             <span key={t} className="text-xs border border-gray-300 bg-white/80 px-2 py-1 rounded-full text-gray-700 group-hover:border-[#e8702a]/40 transition-colors">
                                 {t}
                             </span>
                         ))}
                     </div>
                 </div>
                 <div className="relative z-10 md:w-2/3">
                    <p className="text-xl text-gray-600 mb-6 max-w-2xl leading-relaxed group-hover:text-gray-900 transition-colors">
                        {project.description}
                    </p>
                    <div className={`grid ${project.impact ? "grid-cols-2" : "grid-cols-1"} gap-6 mb-8 text-sm text-gray-900`}>
                        <div>
                            <span className="block text-gray-500 uppercase tracking-wider text-xs mb-1">Role</span>
                            {project.role}
                        </div>
                        {project.impact && (
                            <div>
                                <span className="block text-gray-500 uppercase tracking-wider text-xs mb-1">Impact</span>
                                {project.impact}
                            </div>
                        )}
                    </div>

                    <Link
                        href={project.link}
                        {...linkProps(project.link)}
                        className="relative inline-flex items-center gap-2 uppercase tracking-widest text-sm text-gray-900 hover:text-[#e8702a] transition-all duration-300 group-hover:translate-x-2 after:absolute after:left-0 after:-bottom-1 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 hover:after:scale-x-100 active:scale-[0.98]"
                    >
                        {isExternal(project.link) ? "Visit Live Site" : "View Project"} <FaArrowRight />
                    </Link>
                </div>
             </div>
          </div>
        ))}
      </div>

      {/* Selected UI/UX Works */}
      <div className="mt-24 md:mt-32 border-t border-gray-300 pt-16 md:pt-20">
           <div className="flex flex-col md:flex-row gap-8 md:gap-12">
               <div className="md:w-1/3">
                    <h2 data-reveal="mask" className="text-xl text-[#e8702a] uppercase tracking-widest font-cinzel"><span>UI/UX &amp; Design</span></h2>
               </div>
               <div className="md:w-2/3">
                    {/* Featured Case Studies Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {designWorks.map((work) => {
                            const wide = work.layout === "wide";
                            return (
                                <Link
                                    key={work.title}
                                    href={work.href}
                                    className={`group relative block rounded-xl transition-transform duration-300 hover:-translate-y-0.5 active:translate-y-0 ${wide ? "md:col-span-2" : ""}`}
                                >
                                    <div data-reveal="clip" className={`relative ${wide ? "aspect-[4/3] md:aspect-[21/9]" : "aspect-[4/3]"} w-full overflow-hidden rounded-xl border border-gray-200 bg-gray-900 shadow-sm transition-all duration-500 group-hover:border-[#e8702a]/60 group-hover:shadow-md`}>
                                        <Image
                                            src={work.image}
                                            alt={work.title}
                                            fill
                                            sizes={wide ? "(min-width: 768px) 66vw, 100vw" : "(min-width: 768px) 33vw, 100vw"}
                                            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent transition-opacity duration-500 group-hover:from-black/70" />
                                        <div className={`absolute bottom-0 left-0 ${wide ? "p-6 md:p-8" : "p-6"}`}>
                                            <span className={`mb-2 block text-xs font-mono uppercase tracking-widest ${work.accent}`}>{work.label}</span>
                                            <h3 className={`mb-2 ${wide ? "text-2xl md:text-3xl" : "text-2xl"} font-display font-bold text-white ${work.hoverTitle} transition-colors`}>{work.title}</h3>
                                            {/* Always visible on touch screens, revealed on hover for desktop */}
                                            <p className={`text-sm ${wide ? "md:text-base max-w-xl" : ""} text-gray-200 line-clamp-3 transition-all duration-500 md:opacity-0 md:translate-y-4 md:group-hover:opacity-100 md:group-hover:translate-y-0`}>
                                                {work.description}
                                            </p>
                                        </div>
                                        <div className="absolute top-6 right-6 rounded-full bg-black/30 p-3 backdrop-blur-md opacity-0 scale-75 transition-all duration-500 group-hover:opacity-100 group-hover:scale-100">
                                            <FaArrowRight className="text-white text-sm -rotate-45" />
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
               </div>
           </div>
      </div>
    </section>
  );
}
