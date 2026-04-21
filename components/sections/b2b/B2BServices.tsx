"use client";

import { motion } from "framer-motion";
import { FaWrench, FaArrowRight } from "react-icons/fa";
import { FiArrowUpRight } from "react-icons/fi";
import Link from "next/link";

import { b2bServices } from "@/data/services";

export default function B2BServices() {

  return (
    <section className="py-20 md:py-32 bg-[#F8F9FA] relative overflow-hidden min-h-screen flex items-center">
      {/* Decorative Shadow Overlay */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 right-0 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-emerald-500/10 blur-[80px] md:blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-[400px] md:w-[800px] h-[400px] md:h-[800px] bg-emerald-500/5 blur-[100px] md:blur-[150px] rounded-full -translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-10">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-12 md:mb-20 gap-6 md:gap-8">
          <div className="max-w-xl">
             <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-emerald-100 rounded-full mb-4 md:mb-6 font-bold text-[9px] md:text-[10px] uppercase tracking-widest text-[#10b981] shadow-sm">
                <FaWrench />
                Layanan Kami
             </div>
             <h2 className="text-4xl md:text-7xl font-bold text-gray-900 leading-[1.1] tracking-tighter">
                Solusi Digital <br/> Untuk Bisnis Anda
             </h2>
          </div>
          
          <div className="max-w-md">
             <p className="text-base md:text-lg text-gray-500 font-medium leading-relaxed mb-6 md:mb-8">
                Mulai dari desain website hingga pembuatan logo profesional, kami menyediakan solusi digital berkualitas tinggi untuk pertumbuhan bisnis Anda.
             </p>
             <Link
               href="https://wa.me/6285129488941"
               target="_blank"
               className="inline-flex items-center gap-4 px-6 md:px-8 py-3 md:py-4 bg-[#1A1A2E] hover:bg-black text-white font-bold rounded-full transition-all group shadow-xl shadow-[#1A1A2E]/20 text-sm md:text-base"
             >
               Mulai Konsultasi
               <span className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-[#10b981] text-white flex items-center justify-center group-hover:scale-110 transition-all">
                  <FiArrowUpRight />
               </span>
             </Link>
          </div>
        </div>

        {/* Services Cards Grid - Dynamic Layout */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 md:gap-6">
          {b2bServices.map((service, idx) => {
            const themes = [
              { bg: "bg-rose-50/40", text: "text-red-900", accent: "border-red-100",   span: "md:col-span-3 min-h-[280px] md:h-[340px]" },
              { bg: "bg-sky-50/40",  text: "text-sky-900", accent: "border-sky-100",   span: "md:col-span-3 min-h-[280px] md:h-[340px]" },
              { bg: "bg-indigo-50/40", text: "text-indigo-900", accent: "border-indigo-100",  span: "md:col-span-2 min-h-[280px] md:h-[340px]" },
              { bg: "bg-amber-50/40", text: "text-amber-900", accent: "border-amber-100",  span: "md:col-span-2 min-h-[280px] md:h-[340px]" },
              { bg: "bg-emerald-50/40", text: "text-emerald-900", accent: "border-emerald-100", span: "md:col-span-2 min-h-[280px] md:h-[340px]" }
            ];
            const theme = themes[idx % themes.length];

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`group relative ${theme.span} rounded-[32px] md:rounded-[48px] overflow-hidden cursor-pointer border border-white ${theme.bg} p-8 md:p-12 flex items-center shadow-sm hover:shadow-xl transition-all duration-500`}
              >
                {/* Background Pattern - Softer & Thinner */}
                <div className="absolute top-0 right-0 w-full h-full pointer-events-none opacity-15">
                   <div className={`absolute -top-10 -right-10 w-40 md:w-64 h-40 md:h-64 border-[4px] md:border-[6px] rounded-full ${theme.accent}`} />
                   <div className={`absolute top-20 right-20 w-32 md:w-48 h-32 md:h-48 border-[4px] md:border-[6px] rounded-full ${theme.accent}`} />
                </div>

                <div className="relative z-10 w-full flex flex-row justify-between items-center gap-6">
                   <div className="max-w-[55%] md:max-w-[50%]">
                      <p className={`text-[9px] font-black uppercase tracking-[0.3em] opacity-30 mb-2 md:mb-4 ${theme.text}`}>Layanan Kami</p>
                      <h3 className={`text-2xl md:text-5xl font-black leading-[1] tracking-tighter mb-4 md:mb-6 ${theme.text}`}>
                        {service.title.split(' ').map((word, i) => (
                          <span key={i} className="block">{word}</span>
                        ))}
                      </h3>
                      <p className={`text-xs font-bold leading-relaxed max-w-[200px] opacity-40 ${theme.text}`}>
                        {service.desc}
                      </p>
                   </div>
                   
                   <div className="flex-1 flex justify-end items-center translate-x-4 md:translate-x-8">
                      <img 
                        src={service.img} 
                        alt={service.title} 
                        className="w-full max-w-[150px] md:max-w-[260px] h-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.1)] group-hover:scale-110 transition-transform duration-700" 
                      />
                   </div>
                </div>

                {/* Arrow CTA */}
                <div className={`absolute bottom-6 md:bottom-10 right-6 md:right-10 w-10 md:w-12 h-10 md:h-12 rounded-full border border-black/5 bg-white flex items-center justify-center text-lg md:text-xl transition-all duration-300 opacity-0 md:group-hover:opacity-100 ${theme.text}`}>
                   <FiArrowUpRight />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
