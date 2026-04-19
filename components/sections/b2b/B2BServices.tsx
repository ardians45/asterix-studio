"use client";

import { motion } from "framer-motion";
import { FaWrench, FaArrowRight } from "react-icons/fa";
import { FiArrowUpRight } from "react-icons/fi";
import Link from "next/link";

import { b2bServices } from "@/data/services";

export default function B2BServices() {

  return (
    <section className="py-32 bg-[#F8F9FA] relative overflow-hidden min-h-screen flex items-center">
      {/* Decorative Shadow Overlay */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500/10 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-emerald-500/5 blur-[150px] rounded-full -translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
          <div className="max-w-xl">
             <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-emerald-100 rounded-full mb-6 font-bold text-[10px] uppercase tracking-widest text-[#10b981] shadow-sm">
                <FaWrench />
                Layanan Kami
             </div>
             <h2 className="text-5xl md:text-7xl font-bold text-gray-900 leading-[1.1] tracking-tighter">
                Solusi Digital <br/> Untuk Bisnis Anda
             </h2>
          </div>
          
          <div className="max-w-md">
             <p className="text-lg text-gray-500 font-medium leading-relaxed mb-8">
                Mulai dari desain website hingga pembuatan logo profesional, kami menyediakan solusi digital berkualitas tinggi untuk pertumbuhan bisnis Anda.
             </p>
             <Link
               href="https://wa.me/6285129488941"
               target="_blank"
               className="inline-flex items-center gap-4 px-8 py-4 bg-[#1A1A2E] hover:bg-black text-white font-bold rounded-full transition-all group shadow-xl shadow-[#1A1A2E]/20"
             >
               Mulai Konsultasi
               <span className="w-8 h-8 rounded-full bg-[#10b981] text-white flex items-center justify-center group-hover:scale-110 transition-all">
                  <FiArrowUpRight />
               </span>
             </Link>
          </div>
        </div>

        {/* Services Cards Grid - Dynamic Layout like Reference */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
          {b2bServices.map((service, idx) => {
            // Colors and spans based on index to match the reference look
            const themes = [
              { bg: "bg-rose-50/50", text: "text-rose-950", accent: "bg-rose-200/40", span: "md:col-span-3 h-[320px]" }, // Top Left (Wide)
              { bg: "bg-sky-50", text: "text-sky-950", accent: "bg-sky-200/40", span: "md:col-span-3 h-[320px]" },  // Top Right (Wide)
              { bg: "bg-indigo-50", text: "text-indigo-950", accent: "bg-indigo-200/40", span: "md:col-span-2 h-[320px]" }, // Bottom Left
              { bg: "bg-amber-50", text: "text-amber-950", accent: "bg-amber-200/40", span: "md:col-span-2 h-[320px]" },  // Bottom Middle
              { bg: "bg-emerald-50", text: "text-emerald-950", accent: "bg-emerald-200/40", span: "md:col-span-2 h-[320px]" } // Bottom Right
            ];
            const theme = themes[idx % themes.length];

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`group relative ${theme.span} rounded-[40px] overflow-hidden cursor-pointer shadow-sm border border-black/5 ${theme.bg} p-10 flex items-center`}
              >
                {/* Background Pattern (Circles) */}
                <div className="absolute top-0 right-0 w-full h-full pointer-events-none opacity-40">
                   <div className={`absolute -top-10 -right-10 w-48 h-48 border-[12px] rounded-full ${theme.accent.replace('/40', '/20')}`} />
                   <div className={`absolute top-20 right-20 w-32 h-32 border-[12px] rounded-full ${theme.accent.replace('/40', '/20')}`} />
                </div>

                <div className="relative z-10 w-full flex justify-between items-center gap-6">
                   <div className="max-w-[60%]">
                      <p className={`text-[10px] font-black uppercase tracking-[0.2em] opacity-40 mb-2 ${theme.text}`}>Layanan Kami</p>
                      <h3 className={`text-3xl md:text-5xl font-black leading-[1] tracking-tighter mb-4 ${theme.text}`}>
                        {service.title.split(' ').map((word, i) => (
                          <span key={i} className="block">{word}</span>
                        ))}
                      </h3>
                      <p className={`text-xs font-semibold leading-relaxed max-w-xs opacity-60 ${theme.text}`}>
                        {service.desc}
                      </p>
                   </div>
                   
                   <div className="flex-1 flex justify-end transition-transform duration-500 group-hover:scale-110">
                      <img 
                        src={service.img} 
                        alt={service.title} 
                        className="w-full max-w-[180px] h-auto object-contain drop-shadow-2xl" 
                      />
                   </div>
                </div>

                {/* Arrow CTA */}
                <div className={`absolute bottom-10 right-10 w-12 h-12 rounded-full border border-black/5 bg-white flex items-center justify-center text-xl transition-all duration-300 opacity-0 group-hover:opacity-100 ${theme.text}`}>
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
