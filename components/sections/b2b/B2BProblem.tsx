"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function B2BProblem() {
  return (
    <section id="problem" className="py-20 md:py-32 bg-white relative">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        
        {/* ROW 1: Centered Text (Opsi A) */}
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-20 md:mb-40">
          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-4 md:space-y-6"
          >
            <div className="inline-flex items-center gap-2 text-[10px] md:text-sm font-semibold text-gray-500 uppercase tracking-widest mb-2">
               Masalah
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 leading-[1.1] tracking-tight">
              Website Anda Mungkin <span className="text-red-500 italic">Kehilangan</span> <br className="hidden md:block" />
              Calon Pelanggan <span className="text-[#FF6B00]">Setiap Hari</span>
            </h2>
            <p className="text-base md:text-lg text-gray-600 leading-relaxed font-medium mt-4 md:mt-6 text-balance max-w-2xl mx-auto">
              Kami merancang website dengan struktur yang memudahkan pengunjung memahami bisnis Anda, membangun kepercayaan, dan mendorong mereka untuk segera menghubungi Anda.
            </p>
          </motion.div>
        </div>

        {/* ROW 2: Visual Left, Text Right */}
        <div className="flex flex-col lg:flex-row-reverse items-center gap-10 md:gap-16">
          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex-1 space-y-4 md:space-y-6 text-center flex flex-col items-center justify-center"
          >
            <div className="inline-flex items-center gap-2 text-[10px] md:text-sm font-semibold text-gray-500 uppercase tracking-widest mb-2">
               Solusi
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 leading-[1.1] tracking-tight">
              Website Secepat Kilat untuk <span className="text-emerald-600">Indexing & Ranking Maksimal.</span>
            </h2>
            <p className="text-base md:text-lg text-gray-600 leading-relaxed font-medium mt-4 md:mt-6 text-balance mx-auto">
              Kami membangun fondasi digital modern menggunakan Next.js yang menjamin loading cepat di bawah 1.5 detik, menekan bounce rate, dan menempatkan bisnis Anda di halaman pertama Google.
            </p>
          </motion.div>

          {/* Visual Content */}
           <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex-1 w-full relative z-10"
          >
             {/* Dynamic Vector Background Elements */}
             <div className="absolute -inset-6 md:-inset-20 z-0 pointer-events-none overflow-visible">
                {/* Main Soft Blob */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-emerald-100/60 rounded-full blur-[60px] md:blur-[100px]" />
                
                {/* Dotted Paths (SVG) - Hidden on smallest mobile for cleaner look */}
                <svg className="absolute inset-0 w-full h-full opacity-40 md:opacity-70 hidden sm:block" viewBox="0 0 400 400" fill="none">
                  <path d="M50 50C150 20 350 100 380 200" stroke="#10b981" strokeWidth="4" strokeDasharray="12 12" />
                  <path d="M20 350C100 380 300 320 380 150" stroke="#10b981" strokeWidth="4" strokeDasharray="12 12" />
                  <path d="M350 20C250 150 150 250 50 350" stroke="#10b981" strokeWidth="4" strokeDasharray="12 12" />
                </svg>

                {/* Floating Elements */}
                <motion.div 
                  animate={{ y: [0, -20, 0], x: [0, 10, 0], rotate: [-15, 10, -15] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-0 left-0 text-emerald-500 drop-shadow-[0_5px_15px_rgba(16,185,129,0.3)] hidden md:block"
                >
                   <svg width="40" height="40" className="md:w-[80px] md:h-[80px]" viewBox="0 0 24 24" fill="currentColor"><path d="M21 3L3 10.53V11.5L9.84 13.79L12.13 20.63L13.1 21L21 3Z"/></svg>
                </motion.div>

                <motion.div 
                  animate={{ y: [0, 20, 0], x: [0, -10, 0], rotate: [45, 65, 45] }}
                  transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute bottom-0 right-0 text-sky-500 drop-shadow-[0_5px_15px_rgba(14,165,233,0.3)] hidden md:block"
                >
                   <svg width="35" height="35" className="md:w-[70px] md:h-[70px]" viewBox="0 0 24 24" fill="currentColor"><path d="M21 3L3 10.53V11.5L9.84 13.79L12.13 20.63L13.1 21L21 3Z"/></svg>
                </motion.div>
             </div>

             {/* Main Image Container */}
             <div className="relative w-full aspect-video md:aspect-[4/3] z-10 group bg-white rounded-[24px] md:rounded-[32px] shadow-xl md:shadow-2xl overflow-hidden border border-gray-100">
                <Image 
                  src="/portfolio/pagespeed.png" 
                  alt="Solution Visualization" 
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 576px"
                  className="object-cover transform group-hover:scale-105 transition-transform duration-700" 
                />
             </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
