"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import Image from "next/image";
import { BentoProjectDetail } from "@/types/projects";

interface ProjectBentoSectionProps {
  project: BentoProjectDetail;
}

export default function ProjectBentoSection({ project }: ProjectBentoSectionProps) {
  const [showAfter, setShowAfter] = useState(true);

  return (
    <section className="mb-40">
      {/* Project Info Header */}
      <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="max-w-2xl">
           <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#10b981] bg-[#10b981]/10 px-4 py-1.5 rounded-full mb-4 inline-block">
              {project.category}
           </span>
           <h2 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tighter mb-4 leading-none">
              {project.title}
           </h2>
           <p className="text-gray-500 font-medium text-lg max-w-xl">
              {project.description}
           </p>
        </div>
        <div className="flex items-center gap-4 border-t border-gray-100 pt-6 md:pt-0 md:border-t-0">
           <div className="text-right">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Client</p>
              <p className="text-lg font-bold text-gray-900">{project.client}</p>
           </div>
           <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center p-2">
               <Image 
                 src={project.logoUrl} 
                 alt={project.client} 
                 width={48} 
                 height={48} 
                 className="w-full h-full object-contain mix-blend-multiply opacity-50" 
                 sizes="48px"
               />
           </div>
        </div>
      </div>

      {/* The Bento Grid Cluster - Grouped for ONE project */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-auto lg:h-[720px]">
        
        {/* 1. MAIN LARGE CARD: The Final Result (After) */}
        <div className="lg:col-span-2 bg-white rounded-[32px] md:rounded-[40px] border border-gray-100 shadow-sm overflow-hidden relative group cursor-ns-resize h-[450px] lg:h-full">
           <AnimatePresence mode="wait">
              <motion.div 
                key={showAfter ? "after" : "before"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full h-full p-3 md:p-8"
              >
                <div className="w-full h-full relative overflow-hidden rounded-2xl bg-gray-50 border border-gray-100 shadow-inner">
                   <Image 
                     src={showAfter ? project.mockupLaptop : project.beforeImage} 
                     alt={project.title}
                     width={1000}
                     height={2000}
                     priority={true}
                     className="w-full h-auto absolute top-0 left-0 transition-transform duration-[8s] ease-in-out group-hover:translate-y-[calc(-100%+400px)] lg:group-hover:translate-y-[calc(-100%+620px)]" 
                     sizes="(max-width: 768px) 100vw, 800px"
                     style={{ height: 'auto' }}
                    />
                   
                   {/* Scroll Indicator Overlay */}
                   <div className="absolute inset-0 bg-black/0 md:group-hover:bg-black/20 transition-colors pointer-events-none flex items-center justify-center">
                      <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-xl opacity-0 md:group-hover:opacity-100 transition-opacity flex items-center gap-2 scale-90 md:group-hover:scale-100 duration-300">
                         <div className="w-1.5 h-1.5 bg-[#10b981] rounded-full animate-bounce" />
                         <span className="text-[10px] font-black uppercase tracking-widest text-gray-900">Hover to Preview</span>
                      </div>
                   </div>
                </div>
              </motion.div>
           </AnimatePresence>
           
           {/* Slider / Toggle UI */}
           <div className="absolute bottom-6 md:bottom-12 left-1/2 -translate-x-1/2 flex justify-center items-center z-20">
              <div className="flex gap-1 bg-white/80 backdrop-blur-xl p-1 rounded-full shadow-2xl border border-white/50">
                 <button 
                   onClick={() => setShowAfter(false)}
                   className={`px-4 md:px-6 py-2 md:py-2.5 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-widest transition-all ${!showAfter ? "bg-[#10b981] text-white shadow-lg" : "text-gray-400 hover:text-gray-600"}`}
                 >
                   Before
                 </button>
                 <button 
                  onClick={() => setShowAfter(true)}
                  className={`px-4 md:px-6 py-2 md:py-2.5 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-widest transition-all ${showAfter ? "bg-[#10b981] text-white shadow-lg" : "text-gray-400 hover:text-gray-600"}`}
                 >
                   After
                 </button>
              </div>
           </div>
        </div>

        {/* 2. MERGED CARD: Mobile, Palette & View Live */}
        <div className="lg:col-span-1 bg-[#1A1A2E] rounded-[32px] md:rounded-[40px] overflow-hidden relative group flex flex-col justify-between p-6 md:p-8 h-[500px] lg:h-full">
           {/* Color Palette & Live Site header */}
           <div className="flex justify-between items-center z-20">
              <div>
                 <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-2">Color Palette</p>
                 <div className="flex gap-1.5">
                    {project.palette.map(color => (
                       <div key={color} className="w-5 h-5 rounded-full border border-white/10 shadow-sm" style={{ backgroundColor: color }} />
                    ))}
                 </div>
              </div>
              {project.liveUrl && (
                 <a 
                   href={project.liveUrl} 
                   target="_blank" 
                   rel="noopener noreferrer" 
                   className="flex items-center gap-1.5 text-white font-black group text-xs bg-white/10 hover:bg-[#10b981] hover:text-white px-4 py-2 rounded-full transition-all duration-300"
                 >
                    <span>View Live</span>
                    <FaArrowRight className="group-hover:translate-x-0.5 transition-transform text-[10px]" />
                 </a>
              )}
           </div>

           {/* Mobile screen mock container */}
           <div className="relative w-full h-[280px] lg:h-[380px] mt-4 flex items-end justify-center z-10 overflow-hidden">
              <Image 
                src={project.mockupMobile} 
                alt={`${project.title} mobile`}
                fill
                className="w-full h-full object-contain object-bottom drop-shadow-[0_20px_50px_rgba(0,0,0,0.6)] group-hover:scale-105 transition-transform duration-700" 
                sizes="(max-width: 768px) 100vw, 400px"
              />
           </div>

           {/* Title & Description footer */}
           <div className="z-20 pt-4 border-t border-white/5">
              <h3 className="text-lg md:text-xl font-black text-white mb-1">Mobile Ready</h3>
              <p className="text-white/40 text-[10px] md:text-xs font-medium leading-relaxed">Responsif di semua perangkat untuk menjangkau pengguna di mana saja.</p>
           </div>
        </div>

      </div>
    </section>
  );
}
