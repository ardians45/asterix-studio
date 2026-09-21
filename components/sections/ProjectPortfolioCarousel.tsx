"use client";

import { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { FaArrowRight, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Image from "next/image";
import { BentoProjectDetail } from "@/types/projects";

interface ProjectPortfolioCarouselProps {
  projects: BentoProjectDetail[];
}

export default function ProjectPortfolioCarousel({ projects }: ProjectPortfolioCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAfter, setShowAfter] = useState(true);
  const [direction, setDirection] = useState(1);

  if (!projects || projects.length === 0) return null;

  const currentProject = projects[currentIndex];

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
    setShowAfter(true);
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
    setShowAfter(true);
  };

  const handleDotClick = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
    setShowAfter(true);
  };

  return (
    <div className="relative">
      {/* Navigation Bar & Indicators */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8 bg-gray-50/80 p-3 md:p-4 rounded-2xl border border-gray-100">
        {/* Project Switcher Tabs / Dots */}
        <div className="flex items-center gap-2">
          {projects.map((proj, idx) => (
            <button
              key={proj.id}
              onClick={() => handleDotClick(idx)}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all duration-300 ${
                idx === currentIndex
                  ? "bg-gray-900 text-white shadow-md shadow-gray-900/10"
                  : "bg-white text-gray-500 hover:text-gray-900 border border-gray-200/60 hover:border-gray-300"
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${idx === currentIndex ? "bg-emerald-400" : "bg-gray-300"}`} />
              <span className="hidden sm:inline">{proj.client}</span>
              <span className="sm:hidden">{idx + 1}</span>
            </button>
          ))}
        </div>

        {/* Next / Prev Controls */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-gray-400 mr-2">
            <span className="text-gray-900 font-bold">{currentIndex + 1}</span> / {projects.length}
          </span>
          <button
            onClick={handlePrev}
            aria-label="Previous Project"
            className="w-10 h-10 rounded-xl bg-white hover:bg-emerald-50 text-gray-700 hover:text-emerald-600 border border-gray-200/80 flex items-center justify-center transition-all duration-200 active:scale-95 shadow-sm"
          >
            <FaChevronLeft className="text-xs" />
          </button>
          <button
            onClick={handleNext}
            aria-label="Next Project"
            className="w-10 h-10 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center transition-all duration-200 active:scale-95 shadow-md shadow-emerald-500/20"
          >
            <FaChevronRight className="text-xs" />
          </button>
        </div>
      </div>

      {/* Slide Container */}
      <div className="overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          <m.div
            key={currentProject.id}
            initial={{ opacity: 0, x: direction > 0 ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction > 0 ? -50 : 50 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Project Info Header */}
            <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="max-w-2xl">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-800 bg-emerald-100 px-4 py-1.5 rounded-full mb-4 inline-block">
                  {currentProject.category}
                </span>
                <h3 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight mb-4 leading-tight">
                  {currentProject.title}
                </h3>
                <p className="text-gray-600 font-medium text-base md:text-lg max-w-xl leading-relaxed">
                  {currentProject.description}
                </p>
              </div>

              <div className="flex items-center gap-4 border-t border-gray-100 pt-6 md:pt-0 md:border-t-0">
                <div className="text-right">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Client</p>
                  <p className="text-lg font-bold text-gray-900">{currentProject.client}</p>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center p-2 border border-gray-100 shadow-sm">
                  <Image
                    src={currentProject.logoUrl}
                    alt={currentProject.client}
                    width={48}
                    height={48}
                    className="w-full h-full object-contain mix-blend-multiply opacity-70"
                    sizes="48px"
                  />
                </div>
              </div>
            </div>

            {/* Bento Grid Cluster */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-auto lg:h-[720px]">
              {/* 1. MAIN CARD: Before / After Laptop */}
              <div className="lg:col-span-2 bg-white rounded-[32px] md:rounded-[40px] border border-gray-100 shadow-sm overflow-hidden relative group cursor-ns-resize h-[450px] lg:h-full">
                <AnimatePresence mode="wait">
                  <m.div
                    key={`${currentProject.id}-${showAfter ? "after" : "before"}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="w-full h-full p-3 md:p-8"
                  >
                    <div className="w-full h-full relative overflow-hidden rounded-2xl bg-gray-50 border border-gray-100 shadow-inner">
                      <Image
                        src={showAfter ? currentProject.mockupLaptop : currentProject.beforeImage}
                        alt={currentProject.title}
                        width={1000}
                        height={2000}
                        priority={true}
                        className="w-full h-auto absolute top-0 left-0 transition-transform duration-[8s] ease-in-out group-hover:translate-y-[calc(-100%+400px)] lg:group-hover:translate-y-[calc(-100%+620px)]"
                        sizes="(max-width: 640px) 360px, (max-width: 1024px) 640px, 800px"
                        style={{ height: "auto" }}
                      />

                      {/* Scroll Indicator Overlay */}
                      <div className="absolute inset-0 bg-black/0 md:group-hover:bg-black/20 transition-colors pointer-events-none flex items-center justify-center">
                        <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-xl opacity-0 md:group-hover:opacity-100 transition-opacity flex items-center gap-2 scale-90 md:group-hover:scale-100 duration-300">
                          <div className="w-1.5 h-1.5 bg-[#10b981] rounded-full animate-bounce" />
                          <span className="text-[10px] font-black uppercase tracking-widest text-gray-900">
                            Hover to Preview
                          </span>
                        </div>
                      </div>
                    </div>
                  </m.div>
                </AnimatePresence>

                {/* Toggle Before/After */}
                <div className="absolute bottom-6 md:bottom-12 left-1/2 -translate-x-1/2 flex justify-center items-center z-20">
                  <div className="flex gap-1 bg-white/85 backdrop-blur-xl p-1 rounded-full shadow-2xl border border-white/60">
                    <button
                      onClick={() => setShowAfter(false)}
                      className={`px-4 md:px-6 py-2 md:py-2.5 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-widest transition-all ${
                        !showAfter ? "bg-[#10b981] text-white shadow-lg" : "text-gray-400 hover:text-gray-600"
                      }`}
                    >
                      Before
                    </button>
                    <button
                      onClick={() => setShowAfter(true)}
                      className={`px-4 md:px-6 py-2 md:py-2.5 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-widest transition-all ${
                        showAfter ? "bg-[#10b981] text-white shadow-lg" : "text-gray-400 hover:text-gray-600"
                      }`}
                    >
                      After
                    </button>
                  </div>
                </div>
              </div>

              {/* 2. SIDE CARD: Mobile & Details */}
              <div className="lg:col-span-1 bg-[#1A1A2E] rounded-[32px] md:rounded-[40px] overflow-hidden relative group flex flex-col justify-between p-6 md:p-8 h-[500px] lg:h-full">
                {/* Color Palette & Live Site */}
                <div className="flex justify-between items-center z-20">
                  <div>
                    <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest mb-2">Color Palette</p>
                    <div className="flex gap-1.5">
                      {currentProject.palette.map((color) => (
                        <div
                          key={color}
                          className="w-5 h-5 rounded-full border border-white/10 shadow-sm"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>
                  {currentProject.liveUrl && (
                    <a
                      href={currentProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-white font-black group text-xs bg-white/10 hover:bg-[#10b981] hover:text-white px-4 py-2 rounded-full transition-all duration-300"
                    >
                      <span>View Live</span>
                      <FaArrowRight className="group-hover:translate-x-0.5 transition-transform text-[10px]" />
                    </a>
                  )}
                </div>

                {/* Mobile screen mockup */}
                <div className="relative w-full h-[280px] lg:h-[380px] mt-4 flex items-end justify-center z-10 overflow-hidden">
                  <Image
                    src={currentProject.mockupMobile}
                    alt={`${currentProject.title} mobile`}
                    fill
                    className="w-full h-full object-contain object-bottom drop-shadow-[0_20px_50px_rgba(0,0,0,0.6)] group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 640px) 160px, (max-width: 768px) 250px, 400px"
                  />
                </div>

                {/* Footer */}
                <div className="z-20 pt-4 border-t border-white/5">
                  <h4 className="text-lg md:text-xl font-black text-white mb-1">Mobile Ready</h4>
                  <p className="text-gray-300 text-[10px] md:text-xs font-medium leading-relaxed">
                    Responsif di semua perangkat untuk menjangkau pengguna di mana saja.
                  </p>
                </div>
              </div>
            </div>
          </m.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
