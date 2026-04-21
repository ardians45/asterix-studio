"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function B2BAudience() {
  const [activeIndex, setActiveIndex] = useState(0);

  const audiences = [
    {
      role: "Pemilik Bisnis (Fokus pada Strategi & Profit)",
      desc: "Tingkatkan ROI dari website Anda. Website bukan sekadar beban biaya, melainkan aset investasi yang bekerja 24/7 menghasilkan client baru untuk bisnis Anda.",
      img: "https://images.unsplash.com/photo-1736939763234-f176517e95ca?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      role: "Manajer Operasional (Fokus pada Efisiensi Sistem)",
      desc: "Dapatkan platform yang terotomasi, load super cepat, dan SEO-ready sehingga kampanye marketing Anda tidak bocor akibat conversion rate yang buruk.",
      img: "https://images.unsplash.com/photo-1606877096964-c306a05f4d6f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      role: "Tim Growth (Fokus pada Data & Eksperimen)",
      desc: "Website yang secara otomatis menyaring leads berkualitas, sehingga tim sales Anda bisa fokus pada closing, bukan mengurus prospek dingin.",
      img: "https://images.unsplash.com/photo-1565598571120-4081876df4f7?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    }
  ];

  return (
    <section className="py-20 md:py-32 bg-white relative">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        <div className="mb-12 md:mb-20">
          <p className="text-[10px] md:text-sm font-semibold text-gray-400 uppercase tracking-widest mb-2">Target Utama</p>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-gray-200 pb-6 md:pb-8">
             <h2 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight tracking-tight max-w-4xl">
               Solusi <span className="text-[#10b981]">Web Design Bisnis</span> <br className="hidden md:block" /> untuk Tim Pertumbuhan Anda.
             </h2>
             <button className="mt-6 md:mt-0 bg-gray-900 text-white px-8 py-4 rounded-full font-semibold hover:bg-gray-800 transition-colors text-sm md:text-base">
               Lihat Portofolio
             </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 md:gap-16 items-center">
          {/* Image Display */}
          <div className="flex-1 w-full relative h-[300px] md:h-[600px] rounded-[24px] overflow-hidden shadow-2xl">
            {audiences.map((audience, idx) => (
              <motion.img
                key={idx}
                src={audience.img}
                alt={audience.role}
                initial={{ opacity: 0 }}
                animate={{ opacity: activeIndex === idx ? 1 : 0 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="absolute inset-0 w-full h-full object-cover object-top"
              />
            ))}
          </div>

          {/* Accordion / List */}
          <div className="flex-1 w-full flex flex-col justify-center mt-6 lg:mt-0">
             {audiences.map((audience, idx) => {
               const isActive = activeIndex === idx;
               return (
                 <div 
                   key={idx}
                   onClick={() => setActiveIndex(idx)}
                   className={`cursor-pointer border-b border-gray-100 py-6 md:py-8 transition-all group`}
                 >
                    <div className="flex justify-between items-start gap-4">
                       <h3 className={`text-xl md:text-3xl font-bold transition-colors ${isActive ? 'text-gray-900' : 'text-gray-400 group-hover:text-gray-600'}`}>
                         {audience.role}
                       </h3>
                       <div className="text-gray-300 transition-colors group-hover:text-gray-900 flex-shrink-0">
                          {/* Chevron icon */}
                          <svg className={`w-6 h-6 md:w-8 md:h-8 transition-transform duration-500 ${isActive ? 'rotate-90 text-gray-900' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                       </div>
                    </div>
                    {/* Expandable Content */}
                    <motion.div 
                      initial={false}
                      animate={{ height: isActive ? 'auto' : 0, opacity: isActive ? 1 : 0, marginTop: isActive ? 12 : 0 }}
                      className="overflow-hidden"
                    >
                       <p className="text-sm md:text-lg text-gray-600 leading-relaxed max-w-xl font-medium">
                         {audience.desc}
                       </p>
                    </motion.div>
                 </div>
               )
             })}
          </div>
        </div>
      </div>
    </section>
  );
}
