"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function B2BFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "Apakah website saya nanti bisa ranking di Google?",
      a: "Tentu. Setiap website yang kami buat sudah dilengkapi dengan arsitektur SEO-ready, optimasi meta tags, Google Search Console setup, dan struktur HTML yang ramah mesin pencari untuk mempercepat proses indexing dan meningkatkan peluang ranking halaman pertama."
    },
    {
      q: "Bagaimana jika saya belum memiliki domain dan hosting?",
      a: "Tenang saja, kami akan membantu memproses pembelian dan setup domain (.com, .id, dll) serta cloud hosting berkinerja tinggi yang disesuaikan dengan kapasitas pengunjung website Anda."
    },
    {
      q: "Apakah websitenya bisa saya edit sendiri setelah selesai?",
      a: "Ya. Kami menggunakan CMS (Content Management System) modern yang sangat mudah digunakan bahkan bagi orang awam. Anda bisa mengubah teks, menambahkan foto portofolio, atau mempublikasikan artikel blog baru secara instan."
    },
    {
      q: "Apakah pembayaran jasanya bisa dicicil?",
      a: "Bisa. Untuk menjaga arus kas bisnis Anda tetap sehat, kami memberlakukan sistem pembayaran bertahap (Down Payment 50% di awal dan pelunasan 50% setelah website selesai dideploy dan disetujui)."
    },
    {
      q: "Apakah layanannya sudah termasuk penulisan konten (copywriting)?",
      a: "Benar. Kami menyediakan layanan penulisan copywriting profesional yang disesuaikan dengan psikologi target pelanggan industri B2B Anda, untuk memastikan setiap pengunjung tertarik menghubungi sales Anda."
    },
    {
      q: "Bagaimana jika bisnis saya belum memiliki logo resmi?",
      a: "Kami bisa membantu merancang logo minimalis/modern standar perusahaan di awal proyek sebagai bagian dari identitas visual baru website Anda."
    },
    {
      q: "Apakah website bisa diintegrasikan dengan WhatsApp dan CRM?",
      a: "Tentu. Semua form inquiry bisa diintegrasikan langsung ke WhatsApp nomor sales Anda, email perusahaan, maupun sistem CRM populer seperti HubSpot, Salesforce, atau Zoho."
    },
    {
      q: "Apakah ada biaya tersembunyi setelah website diluncurkan?",
      a: "Tidak ada. Semua rincian biaya (domain, hosting tahunan, lisensi tools) akan kami paparkan secara transparan di awal kontrak. Kami juga menyertakan garansi support teknis gratis selama 3 bulan pertama."
    }
  ];

  return (
    <section className="py-20 md:py-24 bg-[#f8fafc]">
      <div className="container mx-auto px-4 md:px-6 max-w-5xl">
        <div className="text-center mb-12 md:mb-16">
          <p className="text-emerald-600 font-bold mb-2 uppercase text-[10px] md:text-sm tracking-widest">FAQ</p>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight">
            Pertanyaan Mengenai <br className="md:hidden" /> <span className="text-emerald-600">Jasa Website Perusahaan.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div 
                key={idx} 
                className={`border rounded-xl md:rounded-2xl transition-all h-fit ${isOpen ? 'border-[#10b981]/20 shadow-[0_4px_20px_rgba(16,185,129,0.05)] bg-white' : 'border-gray-200 bg-white hover:bg-gray-50'}`}
              >
                <button 
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full text-left px-5 md:px-6 py-5 md:py-6 flex justify-between items-start outline-none focus:ring-0 gap-4"
                >
                   <span className={`text-sm md:text-base font-bold leading-snug ${isOpen ? 'text-gray-900' : 'text-gray-900'}`}>{faq.q}</span>
                   <span className={`text-xl transition-transform duration-300 font-light mt-0.5 ${isOpen ? 'rotate-45 text-emerald-600' : 'text-gray-500'}`}>+</span>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 md:px-6 pb-5 md:pb-6 pt-0 text-gray-500 text-[13px] md:text-sm font-medium leading-relaxed">
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
