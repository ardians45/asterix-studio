"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function B2BAudience() {
  const [activeIndex, setActiveIndex] = useState(0);

  const audiences = [
    {
      role: "Pemilik Bisnis",
      desc: "Tingkatkan ROI dari website Anda. Website bukan sekadar beban biaya, melainkan aset investasi yang bekerja 24/7 menghasilkan client baru untuk bisnis Anda.",
      img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=600"
    },
    {
      role: "Manajer Operasional",
      desc: "Dapatkan platform yang terotomasi, load super cepat, dan SEO-ready sehingga kampanye marketing Anda tidak bocor akibat conversion rate yang buruk.",
      img: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=600"
    },
    {
      role: "Tim Growth",
      desc: "Website yang secara otomatis menyaring leads berkualitas, sehingga tim sales Anda bisa fokus pada closing, bukan mengurus prospek dingin.",
      img: "https://images.unsplash.com/photo-1522202176988-66273c2ea66e?auto=format&fit=crop&q=80&w=600"
    }
  ];

  return (
    <section className="py-32 bg-white relative">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="mb-20">
          <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-2">Target Utama</p>
          <div className="flex justify-between items-end border-b border-gray-200 pb-8">
             <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight tracking-tight max-w-2xl">
               Dirancang untuk perusahaan <br/> yang ingin <span className="text-[#10b981]">website-nya bekerja.</span>
             </h2>
             <button className="hidden md:block bg-gray-900 text-white px-8 py-4 rounded-full font-semibold hover:bg-gray-800 transition-colors">
               Lihat Portofolio
             </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-16 items-center">
          {/* Image Display - Large minimal crop */}
          <div className="flex-1 w-full relative h-[500px] md:h-[600px] rounded-[24px] overflow-hidden shadow-2xl">
            {audiences.map((audience, idx) => (
              <motion.img
                key={idx}
                src={audience.img}
                alt={audience.role}
                initial={{ opacity: 0 }}
                animate={{ opacity: activeIndex === idx ? 1 : 0 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="absolute inset-0 w-full h-full object-cover"
              />
            ))}
          </div>

          {/* Accordion / List directly matching the design reference */}
          <div className="flex-1 w-full flex flex-col justify-center">
             {audiences.map((audience, idx) => {
               const isActive = activeIndex === idx;
               return (
                 <div 
                   key={idx}
                   onClick={() => setActiveIndex(idx)}
                   className={`cursor-pointer border-b border-gray-100 py-8 transition-all group`}
                 >
                    <div className="flex justify-between items-center">
                       <h3 className={`text-3xl font-bold transition-colors ${isActive ? 'text-gray-900' : 'text-gray-400 group-hover:text-gray-600'}`}>
                         {audience.role}
                       </h3>
                       <div className="text-gray-300 transition-colors group-hover:text-gray-900">
                          {/* Chevron icon mimicking the reference */}
                          <svg className={`w-8 h-8 transition-transform duration-500 ${isActive ? 'rotate-90 text-gray-900' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                       </div>
                    </div>
                    {/* Expandable Content */}
                    <motion.div 
                      initial={false}
                      animate={{ height: isActive ? 'auto' : 0, opacity: isActive ? 1 : 0, marginTop: isActive ? 16 : 0 }}
                      className="overflow-hidden"
                    >
                       <p className="text-lg text-gray-600 leading-relaxed max-w-xl font-medium">
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
