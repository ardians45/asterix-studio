"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { useState, useEffect } from "react";

export default function HeroContent({ seoTitle }: { seoTitle?: string }) {
  const [showMockup, setShowMockup] = useState(false);
  const [activeTab, setActiveTab] = useState<"analytics" | "paletindo" | "srlaundry">("analytics");

  useEffect(() => {
    const checkSize = () => {
      if (window.innerWidth >= 640) setShowMockup(true);
      else setShowMockup(false);
    };
    checkSize();
    window.addEventListener('resize', checkSize);
    return () => window.removeEventListener('resize', checkSize);
  }, []);

  return (
    <div className="relative z-10 flex flex-col items-center text-center pt-16 md:pt-24 px-4 md:px-6 w-full">
      {/* Top Badge matching "3K+ Already Joined" */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex items-center gap-2 md:gap-4 mb-6 md:mb-8"
      >
         {/* Laurel Wreath Left */}
         <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-gray-400 md:w-6 md:h-6">
            <path d="M7 19C7 19 3 15 3 10C3 5 7 3 7 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
         </svg>
         
         <div className="flex items-center gap-3 md:gap-4">
            {/* Overlapping Avatars */}
            <div className="flex -space-x-2">
               <div className="relative w-6 h-6 md:w-8 md:h-8 rounded-full border-2 border-white/80 overflow-hidden">
                  <Image fill src="https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&q=80" alt="User 1" className="object-cover" sizes="(max-width: 768px) 24px, 32px" />
               </div>
               <div className="relative w-6 h-6 md:w-8 md:h-8 rounded-full border-2 border-white/80 overflow-hidden">
                  <Image fill src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80" alt="User 2" className="object-cover" sizes="(max-width: 768px) 24px, 32px" />
               </div>
               <div className="relative w-6 h-6 md:w-8 md:h-8 rounded-full border-2 border-white/80 overflow-hidden">
                  <Image fill src="https://images.unsplash.com/photo-1582213723385-dce61a6671a1?auto=format&fit=crop&q=80" alt="User 3" className="object-cover" sizes="(max-width: 768px) 24px, 32px" />
               </div>
            </div>
            <div className="flex flex-col items-start gap-0 md:gap-0.5 mt-1">
               <div className="flex text-[#FF6B00] space-x-[1px] text-[8px] md:text-[10px]">
                  <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
               </div>
               <span className="text-[9px] md:text-xs font-semibold text-gray-700 tracking-tight">Kepuasan 5 Bintang</span>
            </div>
         </div>

         {/* Laurel Wreath Right */}
         <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-gray-400 md:w-6 md:h-6 transform scale-x-[-1]">
            <path d="M7 19C7 19 3 15 3 10C3 5 7 3 7 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
         </svg>
      </motion.div>

      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
      >
        <h1 className="text-3xl md:text-[4.5rem] font-bold text-gray-900 tracking-tighter leading-[1.1] mb-6 md:mb-8 max-w-5xl mx-auto px-2">
          {seoTitle ? (
            <>
              {seoTitle} yang <span className="text-emerald-600 italic">akan Membantu</span> Bisnis Anda Mendapatkan Lebih Banyak Client.
            </>
          ) : (
            <>
              Website yang <span className="text-emerald-600 italic">akan Membantu</span> Bisnis Anda Mendapatkan Lebih Banyak Client, Bukan Sekadar Cantik.
            </>
          )}
        </h1>
        <p className="sr-only">Jasa Web Design Bisnis & Pembuatan Website Company Profile — Asterix Studio</p>
      </motion.div>

      {/* Subheading */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-sm md:text-xl text-gray-600 mb-8 md:mb-12 max-w-2xl md:max-w-3xl leading-relaxed font-medium mx-auto px-4"
      >
        Kami merancang website cepat, SEO-ready, dan berorientasi konversi sehingga setiap pengunjung memiliki alasan kuat untuk menghubungi bisnis Anda.
      </motion.p>

      {/* CTA Buttons - Matching Image Style (One dark, one light pill) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="flex flex-col sm:flex-row items-center gap-3 md:gap-4 w-full justify-center lg:mb-20 mb-8 z-20 px-4"
      >
        <Link
          href="https://wa.me/6285129488941?text=Halo%20Asterix%20Studio,%20saya%20ingin%20konsultasikan%20website%20saya%20sekarang."
          target="_blank"
          className="px-8 py-3.5 bg-[#1A1A2E] text-white font-semibold rounded-full hover:bg-black transition-all shadow-lg shadow-black/20 w-fit text-sm md:text-base hover:scale-105"
        >
          Konsultasi Gratis
        </Link>
        <Link
          href="#projects"
          className="px-8 py-3.5 bg-white text-gray-900 font-semibold rounded-full hover:bg-gray-50 transition-all shadow-md border border-gray-100 w-fit text-sm md:text-base hover:scale-105"
        >
          Lihat Studi Kasus
        </Link>
      </motion.div>

      {/* Elaborate CSS Mockup inserted cleanly */}
      {showMockup && (
        <motion.div
           initial={{ opacity: 0, y: 40 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
           className="relative mx-auto w-full max-w-[1100px] mt-4 z-10 hidden sm:block"
        >
          {/* Floating Hook Cards */}
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-10 -left-6 md:-left-20 bg-white p-4 rounded-2xl shadow-xl border border-emerald-100 z-30 hidden md:block"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Growth</p>
                <p className="text-lg font-black text-gray-900">+180% Leads</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute top-20 -right-6 md:-right-16 bg-white p-4 rounded-2xl shadow-xl border border-blue-100 z-30 hidden md:block"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Performance</p>
                <p className="text-lg font-black text-gray-900">PageSpeed 95+</p>
              </div>
            </div>
          </motion.div>

          <div className="bg-white/95 backdrop-blur-3xl rounded-t-[32px] md:rounded-t-[40px] shadow-[0_-20px_60px_rgba(0,0,0,0.08)] border border-white/50 overflow-hidden flex flex-col relative translate-y-8">
            {/* Top Bar matching image */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-white/50">
               <div className="flex items-center gap-3">
                  <Image src="/logo-black.svg" alt="AsterixHQ" width={32} height={32} className="object-contain rounded" />
                  <div>
                     <p className="text-xs font-bold text-gray-900">AsterixHQ</p>
                     <p className="text-[10px] text-emerald-600 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-600 inline-block"></span> Live Preview</p>
                  </div>
               </div>
               
               {/* Interactive Tabs */}
               <div className="flex items-center bg-gray-100/80 p-1 rounded-full border border-gray-200/50">
                  <button 
                    onClick={() => setActiveTab("analytics")} 
                    className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${activeTab === "analytics" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-900"}`}
                  >
                     Dashboard Performa
                  </button>
                  <button 
                    onClick={() => setActiveTab("paletindo")} 
                    className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${activeTab === "paletindo" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-900"}`}
                  >
                     Website Paletindo
                  </button>
                  <button 
                    onClick={() => setActiveTab("srlaundry")} 
                    className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${activeTab === "srlaundry" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-900"}`}
                  >
                     Website SR Laundry
                  </button>
               </div>

               <div className="flex items-center gap-4">
                  <div className="flex -space-x-2">
                     <div className="relative w-7 h-7 rounded-full border border-white overflow-hidden">
                        <Image fill src="https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&q=80" alt="" className="object-cover" sizes="28px" />
                     </div>
                     <div className="relative w-7 h-7 rounded-full border border-white overflow-hidden">
                        <Image fill src="https://images.unsplash.com/photo-1582213723385-dce61a6671a1?auto=format&fit=crop&q=80" alt="" className="object-cover" sizes="28px" />
                     </div>
                  </div>
                  <Link href="https://wa.me/6285129488941" target="_blank" className="bg-gray-900 text-white text-xs font-bold px-4 py-2 rounded-full hover:bg-black transition-colors">Hubungi Kami</Link>
               </div>
            </div>

            {/* Main Dashboard Body / Website Showcase */}
            <div className="relative p-0 h-[480px] bg-[#f8fafc] overflow-hidden">
               {activeTab === "analytics" && (
                 <div className="flex flex-col md:flex-row p-6 md:p-8 gap-6 h-full animate-fadeIn">
                    {/* Main Chart Area */}
                    <div className="flex-1 space-y-6">
                       <div className="flex justify-between items-end">
                          <div className="text-left">
                            <p className="text-lg md:text-xl font-bold text-gray-900 flex items-center gap-2">
                               <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                               Total Inquiry Growth
                            </p>
                            <div className="mt-4 flex items-end gap-3">
                               <span className="text-3xl md:text-4xl font-bold text-gray-900">4,250</span>
                               <span className="text-[10px] md:text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-md mb-1">+24.5%</span>
                            </div>
                          </div>
                          <span className="bg-gray-50 border border-gray-100 rounded-full px-4 py-2 text-[10px] md:text-xs font-bold text-gray-600">
                             Bulan Ini
                          </span>
                       </div>

                       <div className="pt-8 h-48 md:h-64 flex items-end justify-between gap-2 md:gap-6 relative border-t border-gray-100">
                          {[30, 45, 25, 60, 80, 50, 40, 75].map((h, i) => (
                             <div key={i} className="flex-1 flex flex-col justify-end items-center group relative h-full">
                                {/* Floating Tooltip Mockup */}
                                {i === 4 && (
                                  <div className="absolute -top-12 bg-gray-900 text-white text-[10px] font-bold px-3 py-2 rounded-lg shadow-xl z-20 whitespace-nowrap">
                                     +80 Leads
                                  </div>
                                )}
                                <div className={`w-full rounded-t-xl transition-all ${i === 4 ? 'bg-gray-900' : 'bg-[#e0f2fe]'}`} style={{ height: `${h}%` }}></div>
                                <span className="text-[8px] md:text-[10px] text-gray-400 font-bold mt-2">W{i+1}</span>
                             </div>
                          ))}
                       </div>
                    </div>

                    {/* Right Sidebar Charts */}
                    <div className="hidden md:flex w-72 flex-col gap-6 text-left">
                       <div className="bg-white rounded-2xl p-6 border border-gray-100">
                          <p className="text-sm font-bold text-gray-900 mb-6 flex items-center gap-2">
                             <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" /></svg>
                             Conversion Rate
                          </p>
                          <div className="relative w-full aspect-square max-h-[160px] mx-auto flex items-center justify-center">
                             <svg className="w-full h-full transform -rotate-180" viewBox="0 0 100 100">
                                <circle cx="50" cy="50" r="40" stroke="#f1f5f9" strokeWidth="15" fill="none" strokeDasharray="125" strokeDashoffset="0" />
                                <circle cx="50" cy="50" r="40" stroke="#10b981" strokeWidth="15" fill="none" strokeDasharray="125" strokeDashoffset="25" />
                             </svg>
                             <div className="absolute flex flex-col items-center translate-y-4">
                                <span className="text-3xl font-black text-gray-900">80%</span>
                                <span className="text-[10px] font-bold text-gray-400">Target Reached</span>
                             </div>
                          </div>
                       </div>

                       <div className="bg-white rounded-2xl p-6 border border-gray-100 flex-1">
                          <p className="text-sm font-bold text-gray-900 mb-4">Traffic Source</p>
                          <div className="space-y-4">
                             <div className="flex justify-between items-center">
                                <span className="text-xs font-bold text-gray-500">Organic (SEO)</span>
                                <span className="text-xs font-bold text-gray-900">85%</span>
                             </div>
                             <div className="w-full bg-gray-200 h-2 rounded-full"><div className="bg-[#10b981] h-2 rounded-full" style={{width: '85%'}}></div></div>
                             
                             <div className="flex justify-between items-center pt-2">
                                <span className="text-xs font-bold text-gray-500">Direct</span>
                                <span className="text-xs font-bold text-gray-900">15%</span>
                             </div>
                             <div className="w-full bg-gray-200 h-2 rounded-full"><div className="bg-[#FF6B00] h-2 rounded-full" style={{width: '15%'}}></div></div>
                          </div>
                       </div>
                    </div>
                 </div>
               )}

               {activeTab === "paletindo" && (
                 <div className="w-full h-full relative animate-fadeIn">
                    <Image 
                      src="/projects/showcase/paletindo/after.png" 
                      alt="Paletindo E-Catalog Preview"
                      fill
                      className="object-cover object-top"
                    />
                    <div className="absolute bottom-4 left-4 bg-gray-900/90 backdrop-blur-md text-white text-xs px-4 py-2 rounded-xl border border-white/10 flex items-center gap-3">
                       <span className="font-bold">E-Catalog & Admin Panel Paletindo</span>
                       <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                       <span className="text-gray-300">Fast load & Realtime Sync</span>
                    </div>
                 </div>
               )}

               {activeTab === "srlaundry" && (
                 <div className="w-full h-full relative animate-fadeIn">
                    <Image 
                      src="/projects/showcase/srlaundry/after.png" 
                      alt="SR Laundry Landing Page Preview"
                      fill
                      className="object-cover object-top"
                    />
                    <div className="absolute bottom-4 left-4 bg-gray-900/90 backdrop-blur-md text-white text-xs px-4 py-2 rounded-xl border border-white/10 flex items-center gap-3">
                       <span className="font-bold">SR Laundry Landing Page</span>
                       <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                       <span className="text-gray-300">Conversion Rate +180%</span>
                    </div>
                 </div>
               )}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
