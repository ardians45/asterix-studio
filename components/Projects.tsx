"use client";

import { motion, AnimatePresence, useSpring } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { useState, useRef } from "react";

const projects = [
  {
    title: "CareerConnect",
    description: "A centralized web platform for student career guidance, academic tracking, and school activity information. Built to bridge the gap between students and academic resources.",
    role: "Fullstack Developer",
    tech: ["React", "Tailwind CSS", "Frontend Architecture"],
    impact: "Centralized academic data access for students.",
    year: "2025",
    image: "/projects/career-connect/cc1.png",
    link: "/projects/career-connect"
  },
  {
    title: "Rapor Lamaholot",
    description: "Custom-built academic grade management system for Sekolah Dasar Lamaholot. Features automated report generation, role-based access control, and student data management.",
    role: "Fullstack Developer",
    tech: ["PHP Native", "MySQL", "Tailwind CSS", "FPDF"],
    impact: "Streamlined report card generation for teachers.",
    year: "2025",
    image: "/projects/rapor-lamaholot/rapor1.webp",
    link: "/projects/rapor-lamaholot"
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
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1, x: mouseX.get(), y: mouseY.get() }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ type: "tween", ease: "backOut", duration: 0.2 }}
            className="fixed top-0 left-0 w-[400px] h-[250px] z-50 pointer-events-none -translate-x-1/2 -translate-y-1/2 hidden md:block rounded-xl overflow-hidden shadow-2xl border border-white/20 bg-black"
            style={{ x: mouseX, y: mouseY, translateX: "-50%", translateY: "-50%" }} // Override animate prop for direct spring usage
          >
             <Image 
                src={projects[activeProject].image} 
                alt="Project Preview" 
                fill 
                className="object-cover"
             />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col md:flex-row gap-12 mb-20">
        <div className="md:w-1/3">
           <h2 className="text-xl text-gray-400 uppercase tracking-widest font-mono">Selected Works</h2>
        </div>
        <div className="md:w-2/3">
             <h3 className="text-4xl md:text-6xl font-display font-medium mb-12">
                 building functional & scaleable web systems.
             </h3>
        </div>
      </div>

      <div className="flex flex-col gap-20">
        {projects.map((project, index) => (
          <div 
             key={index} 
             onMouseEnter={() => setActiveProject(index)}
             onMouseLeave={() => setActiveProject(null)}
             className="group relative border-t border-gray-800 pt-12 md:flex gap-12 transition-all duration-300 hover:border-white/40 overflow-hidden"
          >
             {/* Mobile Minimalist Background */}
             <div className="absolute inset-0 z-0 md:hidden pointer-events-none select-none">
                <Image
                    src={project.image}
                    alt="" 
                    fill
                    className="object-cover grayscale opacity-20 blur-[2px] scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
             </div>

             <div className="relative z-10 md:w-1/3 mb-6 md:mb-0">
                 <span className="text-sm font-mono text-gray-500 transition-colors group-hover:text-white">0{index + 1} / {project.year}</span>
                 <h4 className="text-3xl font-bold mt-2 font-display transition-colors group-hover:text-blue-400">{project.title}</h4>
                 <div className="mt-4 flex flex-wrap gap-2">
                     {project.tech.map((t) => (
                         <span key={t} className="text-xs border border-gray-800 px-2 py-1 rounded-full text-gray-400 group-hover:border-gray-600 transition-colors">
                             {t}
                         </span>
                     ))}
                 </div>
             </div>
             <div className="relative z-10 md:w-2/3">
                <p className="text-xl text-gray-300 mb-6 max-w-2xl leading-relaxed group-hover:text-white transition-colors">
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
                                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-gray-800 transition-all duration-500 group-hover:border-white/30 h-full">
                                    <Image 
                                        src="/projects/bantu-platform/bantu.webp" 
                                        alt="Bantu Platform" 
                                        fill 
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-black/60 transition-opacity duration-500 group-hover:bg-black/40" />
                                    <div className="absolute bottom-0 left-0 p-6">
                                        <span className="mb-2 block text-xs font-mono uppercase tracking-widest text-blue-400">Case Study</span>
                                        <h3 className="mb-2 text-2xl font-display font-bold text-white group-hover:text-blue-200 transition-colors">BANTU Platform</h3>
                                        <p className="text-sm text-gray-300 opacity-0 transform translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0 line-clamp-3">
                                            Empowering Indonesia's informal workforce through a transparent digital ecosystem.
                                        </p>
                                    </div>
                                    <div className="absolute top-6 right-6 rounded-full bg-white/10 p-3 backdrop-blur-md opacity-0 transform scale-75 transition-all duration-500 group-hover:opacity-100 group-hover:scale-100">
                                        <FaArrowRight className="text-white text-sm -rotate-45" />
                                    </div>
                                </div>
                            </Link>
                        </div>

                        {/* Cactastic */}
                        <div className="group relative block">
                            <Link href="/projects/cactastic" className="block h-full">
                                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-gray-800 transition-all duration-500 group-hover:border-white/30 h-full">
                                    <Image 
                                        src="/projects/cactastic/cactastic.webp" 
                                        alt="Cactastic" 
                                        fill 
                                        className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-80"
                                    />
                                    <div className="absolute inset-0 bg-black/60 transition-opacity duration-500 group-hover:bg-black/40" />
                                    <div className="absolute bottom-0 left-0 p-6">
                                        <span className="mb-2 block text-xs font-mono uppercase tracking-widest text-green-400">Case Study</span>
                                        <h3 className="mb-2 text-2xl font-display font-bold text-white group-hover:text-green-200 transition-colors">Cactastic</h3>
                                        <p className="text-sm text-gray-300 opacity-0 transform translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0 line-clamp-3">
                                            A specialized e-commerce experience for cactus enthusiasts with AI plant ID.
                                        </p>
                                    </div>
                                    <div className="absolute top-6 right-6 rounded-full bg-white/10 p-3 backdrop-blur-md opacity-0 transform scale-75 transition-all duration-500 group-hover:opacity-100 group-hover:scale-100">
                                        <FaArrowRight className="text-white text-sm -rotate-45" />
                                    </div>
                                </div>
                            </Link>
                        </div>

                        {/* Greenify */}
                        <div className="group relative block md:col-span-2">
                            <Link href="/projects/greenify" className="block h-full">
                                <div className="relative aspect-[21/9] w-full overflow-hidden rounded-xl border border-gray-800 transition-all duration-500 group-hover:border-white/30 h-full">
                                    <Image 
                                        src="/projects/greenify/thumbnail.webp" 
                                        alt="Greenify" 
                                        fill 
                                        className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-80"
                                    />
                                    <div className="absolute inset-0 bg-black/60 transition-opacity duration-500 group-hover:bg-black/40" />
                                    <div className="absolute bottom-0 left-0 p-8">
                                        <span className="mb-2 block text-xs font-mono uppercase tracking-widest text-emerald-400">Featured Case Study</span>
                                        <h3 className="mb-2 text-3xl font-display font-bold text-white group-hover:text-emerald-200 transition-colors">Greenify</h3>
                                        <p className="max-w-xl text-gray-300 opacity-0 transform translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
                                            A digital platform bridging individuals, businesses, and schools for a sustainable future.
                                        </p>
                                    </div>
                                    <div className="absolute top-8 right-8 rounded-full bg-white/10 p-4 backdrop-blur-md opacity-0 transform scale-75 transition-all duration-500 group-hover:opacity-100 group-hover:scale-100">
                                        <FaArrowRight className="text-white -rotate-45" />
                                    </div>
                                </div>
                            </Link>
                        </div>

                         {/* GoGo Groceries */}
                        <div className="group relative block md:col-span-1">
                             <Link href="/projects/gogo-groceries" className="block h-full">
                                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-gray-800 transition-all duration-500 group-hover:border-white/30 h-full">
                                    <Image 
                                        src="/projects/gogo-groceries/thumbnail.webp" 
                                        alt="GoGo Groceries" 
                                        fill 
                                        className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-80"
                                    />
                                    <div className="absolute inset-0 bg-black/60 transition-opacity duration-500 group-hover:bg-black/40" />
                                    <div className="absolute bottom-0 left-0 p-6">
                                        <span className="mb-2 block text-xs font-mono uppercase tracking-widest text-orange-400">Featured</span>
                                        <h3 className="mb-1 text-2xl font-display font-bold text-white group-hover:text-orange-200 transition-colors">GoGo</h3>
                                        <p className="text-sm text-gray-300 opacity-80 line-clamp-2">
                                            Instant quick-commerce with real-time tracking.
                                        </p>
                                    </div>
                                    <div className="absolute top-6 right-6 rounded-full bg-white/10 p-3 backdrop-blur-md opacity-0 transform scale-75 transition-all duration-500 group-hover:opacity-100 group-hover:scale-100">
                                        <FaArrowRight className="text-white -rotate-45 text-sm" />
                                    </div>
                                </div>
                            </Link>
                        </div>

                        {/* LinkAja Kas */}
                        <div className="group relative block md:col-span-1">
                             <Link href="/projects/link-aja-kas" className="block h-full">
                                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-gray-800 transition-all duration-500 group-hover:border-white/30 h-full">
                                    <Image 
                                        src="/projects/link-aja-kas/thumbnail.webp" 
                                        alt="LinkAja Kas" 
                                        fill 
                                        className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-80"
                                    />
                                    <div className="absolute inset-0 bg-black/60 transition-opacity duration-500 group-hover:bg-black/40" />
                                    <div className="absolute bottom-0 left-0 p-6">
                                        <span className="mb-2 block text-xs font-mono uppercase tracking-widest text-[#E11931]">Featured</span>
                                        <h3 className="mb-1 text-2xl font-display font-bold text-white group-hover:text-red-300 transition-colors">LinkAja Kas</h3>
                                        <p className="text-sm text-gray-300 opacity-80 line-clamp-2">
                                            Collective finance management for communities.
                                        </p>
                                    </div>
                                    <div className="absolute top-6 right-6 rounded-full bg-white/10 p-3 backdrop-blur-md opacity-0 transform scale-75 transition-all duration-500 group-hover:opacity-100 group-hover:scale-100">
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
