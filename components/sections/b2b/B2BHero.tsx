"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FaStar } from "react-icons/fa";

export default function B2BHero() {
  return (
    <section className="bg-[#F8F9FA] pt-20 md:pt-24 pb-12 px-4 md:px-6">
      {/* Outer rounded container mimicking the soft image frame */}
      <div className="relative rounded-[24px] md:rounded-[40px] overflow-hidden w-full max-w-7xl mx-auto border border-gray-200/50 shadow-sm min-h-[600px] md:min-h-[800px]">
        
        {/* Soft landscape background image */}
        <div 
           className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-90 blur-[2px] transform scale-105"
           style={{
             backgroundImage: "url('https://images.unsplash.com/photo-1497215842964-222b430dc094?auto=format&fit=crop&q=80&w=2000')", 
           }} 
        />
        {/* Soft white gradient overlay to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/70 to-white/10" />
        
        <div className="relative z-10 flex flex-col items-center text-center pt-16 md:pt-24 px-4 md:px-6">
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
                   <img className="w-6 h-6 md:w-8 md:h-8 rounded-full border-2 border-white/80 object-cover" src="https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&q=80&w=400" alt="User 1"/>
                   <img className="w-6 h-6 md:w-8 md:h-8 rounded-full border-2 border-white/80 object-cover" src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400" alt="User 2"/>
                   <img className="w-6 h-6 md:w-8 md:h-8 rounded-full border-2 border-white/80 object-cover" src="https://images.unsplash.com/photo-1582213723385-dce61a6671a1?auto=format&fit=crop&q=80&w=400" alt="User 3"/>
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
            <h1 className="text-3xl md:text-[5rem] font-bold text-gray-900 tracking-tighter leading-[1.1] mb-6 md:mb-8 max-w-5xl mx-auto px-2">
              Jasa Website Perusahaan & <span className="text-[#10b981] italic">Landing Page Konversi Tinggi.</span>
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
            Berhenti membakar budget iklan pada website yang tidak menjual. Kami menyediakan solusi web design bisnis dan website company profile yang fokus menghasilkan client baru untuk perusahaan Anda.
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
              className="px-8 py-3.5 bg-[#1A1A2E] text-white font-medium rounded-full hover:bg-black transition-colors shadow-lg shadow-black/20 w-fit text-sm md:text-base"
            >
              Konsultasi WA
            </Link>
            <Link
              href="#problem"
              className="px-8 py-3.5 bg-white text-gray-900 font-medium rounded-full hover:bg-gray-50 transition-colors shadow-md border border-gray-100 w-fit text-sm md:text-base"
            >
              Lihat Cara Kerjanya
            </Link>
          </motion.div>

          {/* Elaborate CSS Mockup inserted cleanly */}
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
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Efficiency</p>
                  <p className="text-lg font-black text-gray-900">3.5x ROI Ads</p>
                </div>
              </div>
            </motion.div>
            <div className="bg-white/95 backdrop-blur-3xl rounded-t-[32px] md:rounded-t-[40px] shadow-[0_-20px_60px_rgba(0,0,0,0.08)] border border-white/50 overflow-hidden flex flex-col relative translate-y-8">
              {/* Top Bar matching image */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-white/50">
                 <div className="flex items-center gap-3">
                    <img src="/logo-black.svg" alt="AsterixHQ" className="w-8 h-8 object-contain rounded" />
                    <div>
                       <p className="text-xs font-bold text-gray-900">AsterixHQ</p>
                       <p className="text-[10px] text-[#10b981] flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-[#10b981] inline-block"></span> Online</p>
                    </div>
                 </div>
                 
                 <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-full border border-gray-100 min-w-[200px]">
                    <svg className="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                    <span className="text-xs text-gray-400">Search leads...</span>
                 </div>

                 <div className="flex items-center gap-4">
                    <div className="flex -space-x-2">
                       <img className="w-7 h-7 rounded-full border border-white" src="https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&q=80&w=400" alt=""/>
                       <img className="w-7 h-7 rounded-full border border-white" src="https://images.unsplash.com/photo-1582213723385-dce61a6671a1?auto=format&fit=crop&q=80&w=400" alt=""/>
                    </div>
                    <button className="bg-gray-900 text-white text-xs font-bold px-4 py-2 rounded-full">Invite</button>
                 </div>
              </div>

              {/* Main Dashboard Body */}
              <div className="flex flex-col md:flex-row p-6 md:p-8 gap-6 h-[500px]">
                 {/* Main Chart Area */}
                 <div className="flex-1 space-y-6">
                    <div className="flex justify-between items-end">
                       <div>
                         <p className="text-lg md:text-xl font-bold text-gray-900 flex items-center gap-2">
                            <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                            Total Inquiry Growth
                         </p>
                         <div className="mt-4 flex items-end gap-3">
                            <span className="text-3xl md:text-4xl font-bold text-gray-900">4,250</span>
                            <span className="text-[10px] md:text-xs font-bold text-[#10b981] bg-[#10b981]/10 px-2 py-1 rounded-md mb-1">+24.5%</span>
                         </div>
                       </div>
                       <select className="bg-gray-50 border border-gray-100 rounded-full px-4 py-2 text-[10px] md:text-xs font-bold text-gray-600 outline-none">
                          <option>This Month</option>
                       </select>
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
                 <div className="hidden md:flex w-72 flex-col gap-6">
                    <div className="bg-[#F8F9FB] rounded-2xl p-6 border border-gray-100">
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

                    <div className="bg-[#F8F9FB] rounded-2xl p-6 border border-gray-100 flex-1">
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
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
