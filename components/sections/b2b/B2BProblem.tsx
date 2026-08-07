"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function B2BProblem() {
  return (
    <section id="problem" className="py-20 md:py-32 bg-white relative">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        
        {/* ROW 1: Centered Problem Section */}
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-16 md:mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-4 md:space-y-6"
          >
            <div className="inline-flex items-center gap-2 text-[10px] md:text-xs font-bold text-red-500 bg-red-50 px-4 py-1.5 rounded-full uppercase tracking-widest mb-2 border border-red-100">
               Masalah Bisnis Digital
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 leading-[1.15] tracking-tight">
              Bukan Bisnis Anda yang Kurang Bagus. <br className="hidden md:block" />
              Mungkin Mereka Hanya <span className="text-red-500 italic">Tidak Menemukannya.</span>
            </h2>
            <p className="text-base md:text-lg text-gray-600 leading-relaxed font-medium mt-4 text-balance max-w-3xl mx-auto">
              Calon pelanggan bisa saja sedang mencari produk atau layanan seperti yang Anda tawarkan. Tapi tanpa kehadiran digital yang kuat, perhatian mereka bisa jatuh ke bisnis lain yang lebih mudah ditemukan dan dipercaya.
            </p>
          </motion.div>
        </div>

        {/* ROW 2: Solution Title & 3 Key Pillars */}
        <div className="mt-8">
          <div className="text-center mb-12">
            <span className="text-[10px] md:text-xs font-bold text-emerald-700 bg-emerald-50 px-4 py-1.5 rounded-full uppercase tracking-widest border border-emerald-100">
              Solusi Dari Kami
            </span>
            <h3 className="text-2xl md:text-4xl font-bold text-gray-900 mt-4">
              Kami Membantu Memperbaiki <span className="text-emerald-600">Tiga Hal Penting:</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {/* Pillar 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-[#F8F9FA] p-8 rounded-3xl border border-gray-200/80 hover:border-emerald-500/50 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-black text-xl mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                  01
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">Mudah Ditemukan</h4>
                <p className="text-sm md:text-base text-gray-600 leading-relaxed font-medium">
                  Struktur website yang siap untuk mesin pencari dan membantu calon pelanggan menemukan bisnis Anda.
                </p>
              </div>
            </motion.div>

            {/* Pillar 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-[#F8F9FA] p-8 rounded-3xl border border-gray-200/80 hover:border-emerald-500/50 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-black text-xl mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                  02
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">Mudah Dipahami</h4>
                <p className="text-sm md:text-base text-gray-600 leading-relaxed font-medium">
                  Informasi bisnis, layanan, produk, dan keunggulan disusun agar pengunjung langsung memahami apa yang Anda tawarkan.
                </p>
              </div>
            </motion.div>

            {/* Pillar 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-[#F8F9FA] p-8 rounded-3xl border border-gray-200/80 hover:border-emerald-500/50 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-black text-xl mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                  03
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">Mudah Dihubungi</h4>
                <p className="text-sm md:text-base text-gray-600 leading-relaxed font-medium">
                  Alur halaman dan CTA dirancang untuk mengarahkan pengunjung menjadi inquiry tanpa terasa memaksa.
                </p>
              </div>
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
}
