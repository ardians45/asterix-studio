"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function B2BCTA() {
  return (
    <section className="bg-[#050505] text-white pt-24 pb-12 relative overflow-hidden rounded-t-[40px] md:mx-6 md:mb-6 shadow-[0_-20px_40px_rgba(0,0,0,0.1)]">
      {/* Glow Effects inside dark block */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4/5 h-[300px] bg-[#10b981] opacity-5 blur-[150px] pointer-events-none rounded-full" />
      
      <div className="container relative z-10 mx-auto px-6 max-w-4xl flex flex-col items-center">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
           className="text-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#10b981] text-xs font-bold tracking-widest uppercase mb-8 text-balance">
             <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse"></span> Hanya tersedia untuk 3 slot bulan ini
          </div>
          
          <h2 className="text-4xl md:text-6xl font-black text-white leading-[1.1] mb-6 tracking-tight font-sans text-balance">
            Berhenti Membayar Iklan untuk Website yang Bocor. <br/> 
            Mulai <span className="text-[#10b981]">Transformasi Sekarang.</span>
          </h2>
          
          <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto font-medium leading-relaxed text-balance">
            Website Anda seharusnya menjadi investasi yang terus mendatangkan untung, bukan sekadar beban biaya. Mari kita ubah sekarang sebelum kompetitor Anda melakukannya lebih dulu.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
            <Link
              href="https://wa.me/6285129488941?text=Konsultasikan%20website%20Anda%20sekarang%20dan%20temukan%20potensi%20yang%20belum%20dimaksimalkan."
              target="_blank"
              className="px-8 py-4 bg-white text-black text-sm font-bold uppercase tracking-wider rounded-full hover:bg-gray-200 transition-all w-full sm:w-auto"
            >
              Konsultasi Gratis
            </Link>
            <Link
              href="#portfolio"
              className="px-8 py-4 bg-transparent border border-gray-600 text-white text-sm font-bold uppercase tracking-wider rounded-full hover:border-white transition-all w-full sm:w-auto"
            >
              Lihat Portofolio Kami
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Decorative Brand Text */}
      <div className="mt-32 pt-8 flex flex-col items-center border-t border-gray-800/50">
         <div className="text-[12vw] font-black text-gray-800/40 tracking-tighter uppercase leading-none select-none pointer-events-none">Asterix Studio</div>
         <div className="flex flex-col sm:flex-row justify-between w-full px-12 mt-4 text-xs font-medium text-gray-500">
           <span>&copy; {new Date().getFullYear()} Asterix Studio. All Rights Reserved.</span>
           <div className="flex gap-4 mt-2 sm:mt-0">
             <a href="#" className="hover:text-white transition-colors">Privacy</a>
             <a href="#" className="hover:text-white transition-colors">Terms</a>
           </div>
         </div>
      </div>
    </section>
  );
}
