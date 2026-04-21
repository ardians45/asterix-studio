"use client";

import { FaStar } from "react-icons/fa";
import { motion } from "framer-motion";
import { testimonials } from "@/data/testimonials";

export default function B2BTestimonial() {
  return (
    <section className="py-20 md:py-32 bg-[#f8fafc] border-y border-gray-100">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        <div className="text-center mb-12 md:mb-20 relative">
          {/* Subtle Laurel Wreath icon */}
          <div className="flex justify-center mb-6 opacity-30">
             <svg width="40" height="40" className="md:w-12 md:h-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 12C4 8.68629 5.34315 5.68629 7.65685 3.34315" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                <path d="M20 12C20 8.68629 18.6569 5.68629 16.3431 3.34315" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
             </svg>
          </div>
          <p className="text-[10px] md:text-sm font-semibold text-gray-500 uppercase tracking-widest mb-2">Testimoni</p>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight max-w-4xl mx-auto px-4">
            Dipercaya oleh Perusahaan yang Menuntut <span className="text-emerald-600">Transparansi Hasil.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {testimonials
          .map((testimonial, idx) => (
             <motion.div 
               key={idx}
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.5, delay: idx * 0.1 }}
               className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 border border-gray-100 shadow-[0_5px_20px_rgba(0,0,0,0.02)] md:shadow-[0_10px_40px_rgba(0,0,0,0.03)] flex flex-col justify-between hover:shadow-[0_20px_60px_rgba(0,0,0,0.06)] transition-all group"
             >
                <div>
                  <div className="text-emerald-500 mb-5 sm:mb-6 flex gap-0.5 text-sm sm:text-base">
                    <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                  </div>
                  <p className="text-lg md:text-xl text-gray-900 font-bold mb-6 md:mb-8 leading-relaxed">
                    "{testimonial.quote}"
                  </p>
                </div>
                <div className="flex items-center gap-4 pt-5 md:pt-6 border-t border-gray-100">
                   <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center font-black text-base md:text-lg border-2 border-white shadow-sm ${testimonial.color}`}>
                      {testimonial.initial}
                   </div>
                   <div>
                     <p className="font-bold text-gray-900 leading-none mb-1 text-sm md:text-base">{testimonial.name}</p>
                     <p className="text-[10px] md:text-xs text-gray-500 font-medium">{testimonial.role}</p>
                   </div>
                </div>
             </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
