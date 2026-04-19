"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
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
              <img src={project.logoUrl} alt={project.client} className="w-full h-full object-contain mix-blend-multiply opacity-50" />
           </div>
        </div>
      </div>

      {/* The Bento Grid Cluster - Grouped for ONE project */}
      <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-auto md:grid-rows-2 gap-4 h-auto md:h-[800px]">
        
        {/* 1. MAIN LARGE CARD: The Final Result (After) */}
        <div className="md:col-span-2 md:row-span-2 bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden relative group cursor-ns-resize">
           <AnimatePresence mode="wait">
              <motion.div 
                key={showAfter ? "after" : "before"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full h-full p-4 md:p-8"
              >
                <div className="w-full h-full relative overflow-hidden rounded-2xl bg-gray-50 border border-gray-100 shadow-inner">
                   <img 
                    src={showAfter ? project.mockupLaptop : project.beforeImage} 
                    alt={project.title}
                    className="w-full h-auto absolute top-0 left-0 transition-transform duration-[8s] ease-in-out group-hover:translate-y-[calc(-100%+500px)] md:group-hover:translate-y-[calc(-100%+700px)]" 
                   />
                   
                   {/* Scroll Indicator Overlay */}
                   <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors pointer-events-none flex items-center justify-center">
                      <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2 scale-90 group-hover:scale-100 duration-300">
                         <div className="w-1.5 h-1.5 bg-[#10b981] rounded-full animate-bounce" />
                         <span className="text-[10px] font-black uppercase tracking-widest text-gray-900">Hover to Preview Full Page</span>
                      </div>
                   </div>
                </div>
              </motion.div>
           </AnimatePresence>
           
           {/* Slider / Toggle UI */}
           <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex justify-center items-center z-20">
              <div className="flex gap-1 bg-white/80 backdrop-blur-xl p-1 rounded-full shadow-2xl border border-white/50">
                 <button 
                   onClick={() => setShowAfter(false)}
                   className={`px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${!showAfter ? "bg-[#10b981] text-white shadow-lg" : "text-gray-400 hover:text-gray-600"}`}
                 >
                   Before
                 </button>
                 <button 
                  onClick={() => setShowAfter(true)}
                  className={`px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${showAfter ? "bg-[#10b981] text-white shadow-lg" : "text-gray-400 hover:text-gray-600"}`}
                 >
                   After
                 </button>
              </div>
           </div>
        </div>

        {/* 2. TALL CARD: Mobile Version */}
        <div className="md:col-span-1 md:row-span-2 bg-[#1A1A2E] rounded-[40px] overflow-hidden relative group">
           <div className="absolute inset-0 w-full h-[85%] p-4 md:p-8">
              <img 
                src={project.mockupMobile} 
                className="w-full h-full object-contain object-center drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] group-hover:scale-105 transition-transform duration-700" 
              />
           </div>
           <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-[#1A1A2E] via-[#1A1A2E]/80 to-transparent pt-12">
              <h3 className="text-2xl font-black text-white mb-2">Mobile Ready</h3>
              <p className="text-white/50 text-xs font-medium leading-relaxed">Responsif di semua perangkat untuk menjangkau pengguna di mana saja.</p>
           </div>
        </div>

        {/* 3. SMALL CARD: Palette & Metrics */}
        <div className="md:col-span-1 md:row-span-1 bg-white rounded-[40px] border border-gray-100 p-8 flex flex-col justify-between">
           <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Color Palette</p>
              <div className="flex gap-2">
                 {project.palette.map(color => (
                   <div key={color} className="w-8 h-8 rounded-full border border-gray-100 shadow-sm" style={{ backgroundColor: color }} />
                 ))}
              </div>
           </div>
           
           <div className="flex items-center gap-2 text-[#10b981] font-black group cursor-pointer">
              <span>View Live</span>
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
           </div>
        </div>

        {/* 4. RESULTS CARD */}
        <div className="md:col-span-1 md:row-span-1 bg-gray-50 rounded-[40px] border border-gray-100 p-8 flex flex-col justify-center">
           <div className="space-y-6">
              {project.results.map(res => (
                <div key={res.label}>
                   <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-black text-gray-900 leading-none">{res.value}</span>
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{res.label}</span>
                   </div>
                   <p className="text-[11px] text-[#10b981] font-bold mt-1">{res.detail}</p>
                </div>
              ))}
           </div>
        </div>

      </div>
    </section>
  );
}
