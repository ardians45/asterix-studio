"use client";

import { motion } from "framer-motion";

export default function B2BStats() {
  const stats = [
    {
      title: "Infrastruktur Kecepatan Maksimal",
      value: "100",
      change: "Optimal",
      desc: "Kecepatan maksimal berarti tidak ada lagi client yang kabur karena loading lambat.",
      type: "speed",
    },
    {
      title: "Arsitektur Navigasi Berbasis Konversi",
      value: "8.5%",
      change: "+2.4x",
      desc: "Desain yang memandu pengunjung melakukan aksi nyata menghubungi Anda.",
      type: "conversion",
    },
    {
      title: "Strategi Konten untuk Traffic Tertarget",
      value: "45K",
      change: "+150%",
      desc: "Struktur SEO yang rapi menarik pengunjung yang siap membeli solusi Anda.",
      type: "traffic",
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-[#f8fafc]">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        <div className="text-center mb-12 md:mb-20">
          <p className="text-[10px] md:text-sm font-semibold text-gray-400 uppercase tracking-widest mb-2">Metrik Performa</p>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight">
            Performa Nyata yang Bisa <span className="text-[#10b981]">Diukur.</span>
          </h2>
          <p className="text-sm md:text-lg text-gray-500 mt-4 md:mt-6 max-w-2xl mx-auto font-medium leading-relaxed px-4">
            Kami tidak hanya membuat website yang terlihat cantik, tapi memastikan website menjadi aset digital produktif bagi bisnis Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white rounded-[24px] p-6 md:p-8 border border-gray-100 shadow-[0_5px_20px_rgba(0,0,0,0.02)] md:shadow-[0_10px_40px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_40px_rgba(0,0,0,0.06)] transition-shadow relative overflow-hidden flex flex-col h-full"
            >
              <div className="flex justify-between items-start mb-6 md:mb-8">
                 <div className="flex-1">
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">{stat.title}</h3>
                    <p className="text-xs md:text-sm text-gray-500 leading-relaxed font-medium">{stat.desc}</p>
                 </div>
                 <div className="bg-[#10b981]/10 text-[#10b981] px-2 md:px-3 py-1 rounded-[8px] text-[10px] md:text-xs font-bold whitespace-nowrap ml-4">
                    {stat.change}
                 </div>
              </div>

              <div className="mt-auto pt-6 md:pt-8 flex items-end justify-center h-40 md:h-48 relative border-t border-gray-50">
                 {stat.type === 'speed' && (
                    <div className="relative w-32 md:w-40 h-32 md:h-40 flex items-center justify-center">
                       <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                          <circle cx="50" cy="50" r="40" stroke="#f1f5f9" strokeWidth="10" fill="none" />
                          <circle cx="50" cy="50" r="40" stroke="#10b981" strokeWidth="10" fill="none" strokeDasharray="251" strokeDashoffset="0" />
                       </svg>
                       <span className="absolute inset-0 flex items-center justify-center text-4xl md:text-5xl font-black text-[#10b981]">{stat.value}</span>
                    </div>
                 )}
                 {stat.type === 'conversion' && (
                    <div className="w-full flex items-end justify-between gap-2 md:gap-3 h-full">
                       {[30, 45, 60, 50, 75, 90, 100].map((h, i) => (
                          <div key={i} className={`flex-1 rounded-t-lg relative transition-all duration-500 ${i === 6 ? 'bg-[#10b981]' : 'bg-[#e0f2fe]'}`} style={{ height: `${h}%` }}>
                             {i === 6 && <div className="absolute -top-6 md:-top-8 left-1/2 -translate-x-1/2 text-xs md:text-sm font-black text-[#10b981]">{stat.value}</div>}
                          </div>
                       ))}
                    </div>
                 )}
                 {stat.type === 'traffic' && (
                    <div className="w-full h-full relative flex items-end justify-center pb-2 md:pb-4">
                       <div className="absolute inset-0 overflow-hidden rounded-xl">
                           <svg viewBox="0 0 200 100" preserveAspectRatio="none" className="w-full h-full text-[#dbeafe]">
                              <path d="M0 100 L 0 80 C 50 80, 80 90, 120 50 C 160 10, 180 20, 200 10 L 200 100 Z" fill="currentColor" />
                           </svg>
                           <svg viewBox="0 0 200 100" preserveAspectRatio="none" className="w-full h-full absolute inset-0 text-[#2563eb]">
                              <path d="M0 80 C 50 80, 80 90, 120 50 C 160 10, 180 20, 200 10" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                           </svg>
                       </div>
                       <div className="relative z-10 bg-white shadow-lg border border-gray-100 rounded-xl px-3 md:px-4 py-1.5 md:py-2 mt-auto">
                          <span className="text-xl md:text-2xl font-black text-[#2563eb]">{stat.value}</span>
                          <span className="text-[10px] text-gray-500 ml-1 font-bold">Visits</span>
                       </div>
                    </div>
                 )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
