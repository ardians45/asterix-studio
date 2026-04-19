"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function B2BFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "Berapa lama proses pembuatan website B2B ini?",
      a: "Umumnya memakan waktu 3-4 minggu tergantung pada kompleksitas. Kami fokus pada kualitas struktur SEO dan performa sebelum peluncuran untuk memastikan website siap menghasilkan prospek."
    },
    {
      q: "Apakah layanan ini termasuk pembuatan konten?",
      a: "Ya, kami membantu merumuskan copywriting bisnis yang mengkonversi. Strategi konten disusun berdasarkan analisis keyword dan identitas target audiens Anda."
    },
    {
      q: "Apakah website ini bisa diintegrasikan ke CRM?",
      a: "Tentu. Kami dapat mengintegrasikan formulir leads langsung ke WhatsApp, email perusahaan, atau CRM spesifik seperti HubSpot maupun Salesforce yang Anda gunakan."
    },
    {
      q: "Bagaimana cara kerja maintenance dan garansi?",
      a: "Kami menyediakan dukungan maintenance 3 bulan gratis paska rilis untuk memastikan PageSpeed tetap optimal dan sistem form/inquiry berjalan tanpa kendala."
    },
    {
      q: "Bagaimana jika saya ingin custom fitur interaktif?",
      a: "Sangat memungkinkan. Kami ahlinya dalam pembuatan komponen interaktif khusus untuk memberikan pengalaman premium, mirip dengan visual 3D atau animasi data."
    },
    {
      q: "Apakah ada biaya tersembunyi setelah selesai?",
      a: "Semua dijelaskan di awal kontrak kerja. Biaya jangka panjang umumnya hanya terkait server atau layanan pihak ketiga yang Anda perlukan untuk operasional web."
    }
  ];

  return (
    <section className="py-24 bg-[#f8fafc]">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="text-center mb-16">
          <p className="text-[#10b981] font-bold mb-2 uppercase text-sm tracking-widest">FAQ</p>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight">
            Hal yang Sering <span className="text-[#10b981]">Ditanyakan.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div 
                key={idx} 
                className={`border rounded-2xl transition-all h-fit ${isOpen ? 'border-[#10b981]/20 shadow-[0_4px_20px_rgba(16,185,129,0.05)] bg-white' : 'border-gray-200 bg-white hover:bg-gray-50'}`}
              >
                <button 
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full text-left px-6 py-6 flex justify-between items-start outline-none focus:ring-0 gap-4"
                >
                   <span className={`font-bold leading-snug ${isOpen ? 'text-gray-900' : 'text-gray-900'}`}>{faq.q}</span>
                   <span className={`text-xl transition-transform duration-300 font-light mt-0.5 ${isOpen ? 'rotate-45 text-[#10b981]' : 'text-gray-400'}`}>+</span>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-0 text-gray-500 text-sm font-medium leading-relaxed">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
