"use client";

import { motion } from "framer-motion";

export default function B2BProblem() {
  return (
    <section id="problem" className="py-32 bg-white relative">
      <div className="container mx-auto px-6 max-w-6xl">
        
        {/* ROW 1: Text Left, Visual Right */}
        <div className="flex flex-col lg:flex-row items-center gap-16 mb-40">
          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex-1 space-y-6"
          >
            <div className="inline-flex items-center gap-2 text-sm font-semibold text-gray-400 uppercase tracking-widest mb-2">
               Masalah
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-[1.1] tracking-tight">
              Mengapa Kebanyakan Website Perusahaan <span className="text-red-500 italic">Gagal</span> <br/>
              Menghasilkan <span className="text-[#10b981]">Inquiry?</span>
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed font-medium mt-6 text-balance">
              Percuma membakar uang untuk iklan jika website Anda tidak mampu mengikat pengunjung. Setiap detik yang terbuang adalah potensi profit yang hilang karena desain yang tidak menjual.
            </p>
          </motion.div>

          {/* Visual Content (Tall vertical card with chart like Image 1) */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex-1 w-full relative flex justify-end"
          >
            <div className="bg-white rounded-2xl md:rounded-[24px] border border-gray-100 shadow-[0_20px_40px_rgba(0,0,0,0.06)] p-8 max-w-sm w-full relative z-20">
               <div className="flex justify-between items-center mb-8 pb-4">
                  <div>
                    <p className="text-[#1A1A2E] font-bold text-xl mb-1">Weekly Visitors</p>
                    <p className="text-sm text-gray-400 font-medium">vs Inquiry generated</p>
                  </div>
                  <div className="flex text-lg font-black text-gray-300">
                     <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M6 12C6 13.1046 5.10457 14 4 14C2.89543 14 2 13.1046 2 12C2 10.8954 2.89543 10 4 10C5.10457 10 6 10.8954 6 12ZM14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12ZM20 14C21.1046 14 22 13.1046 22 12C22 10.8954 21.1046 10 20 10C18.8954 10 18 10.8954 18 12C18 13.1046 18.8954 14 20 14Z" fill="#CBD5E1"/>
                     </svg>
                  </div>
               </div>
               
               <div className="flex items-end justify-between h-48 gap-4 mt-12 mb-8 px-2">
                  {[40, 60, 50, 80, 65, 45].map((h, i) => (
                    <div key={i} className="flex-1 flex flex-col justify-end items-center gap-2 h-full">
                       <div className="w-full rounded-t-lg bg-[#F8F9FB]" style={{ height: `${h}%` }}></div>
                       <span className="text-[11px] text-gray-300 font-bold mb-2 uppercase">{h}k</span>
                    </div>
                  ))}
                  {/* The contrasting drop bar */}
                  <div className="flex-1 flex flex-col justify-end items-center gap-2 relative h-full">
                     <div className="w-full rounded-t-lg bg-[#FF6B00]" style={{ height: `10%` }}></div>
                     <span className="text-[11px] text-[#FF6B00] font-bold mb-2">0</span>
                  </div>
               </div>

               <div className="mt-6 pt-6 border-t border-gray-50/80">
                  <div className="flex justify-between items-center">
                     <div className="flex items-center gap-3">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#FF6B00]"></div>
                        <span className="text-[15px] font-bold text-[#4B5563]">Inquiry Drop</span>
                     </div>
                     <span className="text-base font-black text-[#1A1A2E]">-98.5%</span>
                  </div>
               </div>
            </div>

            {/* Decorative background blur */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-blue-50/50 rounded-full blur-[80px] -z-10" />
          </motion.div>
        </div>

        {/* ROW 2: Visual Left, Text Right */}
        <div className="flex flex-col lg:flex-row-reverse items-center gap-16">
          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex-1 space-y-6"
          >
            <div className="inline-flex items-center gap-2 text-sm font-semibold text-gray-400 uppercase tracking-widest mb-2">
               Solusi
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-[1.1] tracking-tight">
              
              Website Performa Tinggi yang Fokus pada <span className="text-[#10b981]">Kejelasan ROI.</span>
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed font-medium mt-6 text-balance">
              Kami merancang ulang setiap pixel untuk satu tujuan: Memastikan setiap pengunjung yang datang memiliki alasan kuat untuk menghubungi bisnis Anda.
            </p>
            
            <div className="pt-4">
              <button className="bg-gray-900 text-white px-8 py-4 rounded-full font-semibold hover:bg-gray-800 transition-colors shadow-lg">
                Lihat Solusi
              </button>
            </div>
          </motion.div>

          {/* Visual Content (Overlapping Cards like Image 1) */}
           <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex-1 w-full relative z-10"
          >
             {/* Dynamic Vector Background Elements */}
             <div className="absolute -inset-10 md:-inset-20 z-0 pointer-events-none overflow-visible">
                {/* Main Soft Blob */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-emerald-100/60 rounded-full blur-[100px]" />
                
                {/* Dotted Paths (SVG) */}
                <svg className="absolute inset-0 w-full h-full opacity-70" viewBox="0 0 400 400" fill="none">
                  <path d="M50 50C150 20 350 100 380 200" stroke="#10b981" strokeWidth="4" strokeDasharray="12 12" />
                  <path d="M20 350C100 380 300 320 380 150" stroke="#10b981" strokeWidth="4" strokeDasharray="12 12" />
                  <path d="M350 20C250 150 150 250 50 350" stroke="#10b981" strokeWidth="4" strokeDasharray="12 12" />
                </svg>

                {/* Floating Elements (Paper Planes/Icons) */}
                <motion.div 
                  animate={{ y: [0, -40, 0], x: [0, 20, 0], rotate: [-15, 10, -15] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-0 left-0 text-emerald-500 drop-shadow-[0_10px_20px_rgba(16,185,129,0.4)]"
                >
                   <svg width="80" height="80" viewBox="0 0 24 24" fill="currentColor"><path d="M21 3L3 10.53V11.5L9.84 13.79L12.13 20.63L13.1 21L21 3Z"/></svg>
                </motion.div>

                <motion.div 
                  animate={{ y: [0, 40, 0], x: [0, -20, 0], rotate: [45, 65, 45] }}
                  transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute bottom-0 right-0 text-sky-500 drop-shadow-[0_10px_20px_rgba(14,165,233,0.4)]"
                >
                   <svg width="70" height="70" viewBox="0 0 24 24" fill="currentColor"><path d="M21 3L3 10.53V11.5L9.84 13.79L12.13 20.63L13.1 21L21 3Z"/></svg>
                </motion.div>
             </div>

             {/* Main Image Container */}
             <div className="relative w-full aspect-video md:aspect-[4/3] z-10 group bg-white rounded-[32px] shadow-2xl overflow-hidden border border-gray-100">
                <img 
                  src="/portfolio/pagespeed.png" 
                  alt="Solution Visualization" 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" 
                />
             </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
