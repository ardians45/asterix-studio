"use client";

import { m, AnimatePresence, useSpring } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { useState, useRef } from "react";

const projects = [
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



export default function Projects() {
  const [activeProject, setActiveProject] = useState<number | null>(null);
  
  // Spring physics for smooth cursor following
  const mouseX = useSpring(0, { stiffness: 150, damping: 15 });
  const mouseY = useSpring(0, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent) => {
    // Get cursor position relative to viewport or container
    // Using simple clientX/Y for fixed positioning or relative if needed
    // Here we'll use fixed positioning for the floating image
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
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
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
            className="fixed top-0 left-0 w-[480px] z-50 pointer-events-none hidden md:block rounded-2xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.35)] border border-gray-300/90 bg-white/95 backdrop-blur-xl"
            style={{ x: mouseX, y: mouseY, translateX: "-50%", translateY: "-50%" }}
          >
            {/* Browser Window Mockup Frame Header */}
            <div className="bg-gray-100/95 border-b border-gray-200 px-4 py-2.5 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56] inline-block shadow-xs" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e] inline-block shadow-xs" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f] inline-block shadow-xs" />
              </div>
              <div className="bg-white border border-gray-200/90 rounded-md px-3 py-0.5 text-[11px] font-mono text-gray-600 truncate max-w-[250px] shadow-2xs font-medium">
                {projects[activeProject].link.replace(/^https?:\/\//, '')}
              </div>
              <div className="w-10 text-right font-mono text-[10px] text-gray-400 font-semibold">
                0{activeProject + 1}
              </div>
            </div>

            {/* Image Preview Container (Crisp, readable browser viewport preview) */}
            <div className="relative w-full h-[290px] bg-white overflow-hidden">
              <Image 
                src={projects[activeProject].image} 
                alt={projects[activeProject].title} 
                fill 
                className="object-cover object-top"
                priority
              />
            </div>
          </m.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col md:flex-row gap-12 mb-20">
        <div className="md:w-1/3">
           <h2 className="text-xl text-[#e8702a] uppercase tracking-widest font-cinzel">Selected Works</h2>
        </div>
        <div className="md:w-2/3">
             <h3 className="text-4xl md:text-6xl font-display font-medium mb-12 text-gray-900">
                 Building functional, scalable & high-impact digital experiences.
             </h3>
        </div>
      </div>

      <div className="flex flex-col md:gap-20 gap-0">
        {projects.map((project, index) => (
          <div 
             key={index} 
             onMouseEnter={() => setActiveProject(index)}
             onMouseLeave={() => setActiveProject(null)}
             className="group relative"
          >
             {/* --- MOBILE UI --- */}
             <div className="md:hidden flex flex-col w-full pt-8">
                 {/* Header */}
                 <div className="flex items-center gap-4 mb-4">
                     <span className="text-xs font-mono text-gray-500">0{index + 1}</span>
                     <h4 className="text-[28px] font-display font-black uppercase tracking-widest text-gray-900 leading-none">{project.title}</h4>
                 </div>
                 
                 {/* Image */}
                 <Link href={project.link} className="block w-full group/mob">
                     <div className="relative aspect-auto h-[220px] sm:h-[300px] w-full bg-gray-100 overflow-hidden mb-4 rounded-sm border border-gray-200">
                         <Image 
                             src={project.image}
                             alt={project.title}
                             fill
                             className="object-cover transition-transform duration-700 group-hover/mob:scale-105 opacity-90"
                         />
                         <div className="absolute inset-0 bg-black/10 transition-opacity duration-500 group-hover/mob:opacity-0" />
                     </div>
                 </Link>
                 
                 {/* Footer */}
                 <div className="flex justify-between items-center text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] text-gray-500 border-b border-gray-300 pb-12">
                     <span>{project.role}</span>
                     <Link href={project.link} className="p-2 -mr-2 text-gray-600">
                          <FaArrowRight className="text-sm" />
                     </Link>
                 </div>
             </div>

             {/* --- DESKTOP UI --- */}
             <div className="hidden md:flex gap-12 border-t border-gray-300 pt-12 transition-all duration-300 hover:border-[#e8702a]/50">
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
                    <div className="grid grid-cols-2 gap-6 mb-8 text-sm">
                        <div>
                            <span className="block text-gray-500 uppercase tracking-wider text-xs mb-1">Role</span>
                            {project.role}
                        </div>
                         <div>
                            <span className="block text-gray-500 uppercase tracking-wider text-xs mb-1">Impact</span>
                            {project.impact}
                        </div>
                    </div>
                    
                    <Link href={project.link}>
                        <button className="flex items-center gap-2 uppercase tracking-widest text-sm hover:text-blue-400 transition-colors group-hover:translate-x-2 duration-300">
                            View Project <FaArrowRight />
                        </button>
                    </Link>
                </div>
             </div>
          </div>
        ))}
      </div>

      {/* Selected UI/UX Works */}
      <div className="mt-32 border-t border-gray-800 pt-20">
           <div className="flex flex-col md:flex-row gap-12">
               <div className="md:w-1/3">
                    <h2 className="text-xl text-gray-400 uppercase tracking-widest font-mono">UI/UX & Design</h2>
               </div>
               <div className="md:w-2/3">
                    
   
                    {/* Featured Case Studies Grid */}
                    <div className="mb-16 grid grid-cols-1 md:grid-cols-2 gap-6">
                        
                        {/* Bantu Platform */}
                        <div className="group relative block">
                            <Link href="/projects/bantu-platform" className="block h-full">
                                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-500 hover:border-[#e8702a]/60 hover:shadow-md h-full">
                                    <Image 
                                        src="/projects/bantu-platform/bantu.webp" 
                                        alt="Bantu Platform" 
                                        fill 
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent transition-opacity duration-500 group-hover:from-black/70" />
                                    <div className="absolute bottom-0 left-0 p-6">
                                        <span className="mb-2 block text-xs font-mono uppercase tracking-widest text-[#e8702a]">Case Study</span>
                                        <h3 className="mb-2 text-2xl font-display font-bold text-white group-hover:text-amber-200 transition-colors">BANTU Platform</h3>
                                        <p className="text-sm text-gray-200 opacity-0 transform translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0 line-clamp-3">
                                            Empowering Indonesia's informal workforce through a transparent digital ecosystem.
                                        </p>
                                    </div>
                                    <div className="absolute top-6 right-6 rounded-full bg-black/30 p-3 backdrop-blur-md opacity-0 transform scale-75 transition-all duration-500 group-hover:opacity-100 group-hover:scale-100">
                                        <FaArrowRight className="text-white text-sm -rotate-45" />
                                    </div>
                                </div>
                            </Link>
                        </div>

                        {/* Cactastic */}
                        <div className="group relative block">
                            <Link href="/projects/cactastic" className="block h-full">
                                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-500 hover:border-[#e8702a]/60 hover:shadow-md h-full">
                                    <Image 
                                        src="/projects/cactastic/cactastic.webp" 
                                        alt="Cactastic" 
                                        fill 
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent transition-opacity duration-500 group-hover:from-black/70" />
                                    <div className="absolute bottom-0 left-0 p-6">
                                        <span className="mb-2 block text-xs font-mono uppercase tracking-widest text-emerald-400">Case Study</span>
                                        <h3 className="mb-2 text-2xl font-display font-bold text-white group-hover:text-emerald-200 transition-colors">Cactastic</h3>
                                        <p className="text-sm text-gray-200 opacity-0 transform translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0 line-clamp-3">
                                            A specialized e-commerce experience for cactus enthusiasts with AI plant ID.
                                        </p>
                                    </div>
                                    <div className="absolute top-6 right-6 rounded-full bg-black/30 p-3 backdrop-blur-md opacity-0 transform scale-75 transition-all duration-500 group-hover:opacity-100 group-hover:scale-100">
                                        <FaArrowRight className="text-white text-sm -rotate-45" />
                                    </div>
                                </div>
                            </Link>
                        </div>

                        {/* Greenify */}
                        <div className="group relative block md:col-span-2">
                            <Link href="/projects/greenify" className="block h-full">
                                <div className="relative aspect-[21/9] w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-500 hover:border-[#e8702a]/60 hover:shadow-md h-full">
                                    <Image 
                                        src="/projects/greenify/thumbnail.webp" 
                                        alt="Greenify" 
                                        fill 
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent transition-opacity duration-500 group-hover:from-black/70" />
                                    <div className="absolute bottom-0 left-0 p-8">
                                        <span className="mb-2 block text-xs font-mono uppercase tracking-widest text-emerald-400">Featured Case Study</span>
                                        <h3 className="mb-2 text-3xl font-display font-bold text-white group-hover:text-emerald-200 transition-colors">Greenify</h3>
                                        <p className="max-w-xl text-gray-200 opacity-0 transform translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
                                            A digital platform bridging individuals, businesses, and schools for a sustainable future.
                                        </p>
                                    </div>
                                    <div className="absolute top-8 right-8 rounded-full bg-black/30 p-4 backdrop-blur-md opacity-0 transform scale-75 transition-all duration-500 group-hover:opacity-100 group-hover:scale-100">
                                        <FaArrowRight className="text-white -rotate-45" />
                                    </div>
                                </div>
                            </Link>
                        </div>

                         {/* GoGo Groceries */}
                        <div className="group relative block md:col-span-1">
                             <Link href="/projects/gogo-groceries" className="block h-full">
                                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-500 hover:border-[#e8702a]/60 hover:shadow-md h-full">
                                    <Image 
                                        src="/projects/gogo-groceries/thumbnail.webp" 
                                        alt="GoGo Groceries" 
                                        fill 
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent transition-opacity duration-500 group-hover:from-black/70" />
                                    <div className="absolute bottom-0 left-0 p-6">
                                        <span className="mb-2 block text-xs font-mono uppercase tracking-widest text-orange-400">Featured</span>
                                        <h3 className="mb-1 text-2xl font-display font-bold text-white group-hover:text-orange-200 transition-colors">GoGo</h3>
                                        <p className="text-sm text-gray-200 opacity-90 line-clamp-2">
                                            Instant quick-commerce with real-time tracking.
                                        </p>
                                    </div>
                                    <div className="absolute top-6 right-6 rounded-full bg-black/30 p-3 backdrop-blur-md opacity-0 transform scale-75 transition-all duration-500 group-hover:opacity-100 group-hover:scale-100">
                                        <FaArrowRight className="text-white -rotate-45 text-sm" />
                                    </div>
                                </div>
                            </Link>
                        </div>

                        {/* LinkAja Kas */}
                        <div className="group relative block md:col-span-1">
                             <Link href="/projects/link-aja-kas" className="block h-full">
                                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-500 hover:border-[#e8702a]/60 hover:shadow-md h-full">
                                    <Image 
                                        src="/projects/link-aja-kas/thumbnail.webp" 
                                        alt="LinkAja Kas" 
                                        fill 
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent transition-opacity duration-500 group-hover:from-black/70" />
                                    <div className="absolute bottom-0 left-0 p-6">
                                        <span className="mb-2 block text-xs font-mono uppercase tracking-widest text-red-400">Featured</span>
                                        <h3 className="mb-1 text-2xl font-display font-bold text-white group-hover:text-red-200 transition-colors">LinkAja Kas</h3>
                                        <p className="text-sm text-gray-200 opacity-90 line-clamp-2">
                                            Collective finance management for communities.
                                        </p>
                                    </div>
                                    <div className="absolute top-6 right-6 rounded-full bg-black/30 p-3 backdrop-blur-md opacity-0 transform scale-75 transition-all duration-500 group-hover:opacity-100 group-hover:scale-100">
                                        <FaArrowRight className="text-white -rotate-45 text-sm" />
                                    </div>
                                </div>
                            </Link>
                        </div>

                    </div>
               </div>
           </div>
      </div>
    </section>
  );
}

