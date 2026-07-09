"use client";

import { motion } from "framer-motion";
import { FaSearchDollar, FaBullseye, FaDraftingCompass, FaBolt, FaFolderOpen, FaHeadset } from "react-icons/fa";

export default function WhyChooseUs() {
  const reasons = [
    {
      icon: <FaSearchDollar className="w-6 h-6 text-emerald-600" />,
      title: "SEO-First Design",
      desc: "Struktur arsitektur informasi dan penulisan tag dibuat optimal agar website Anda berada di halaman pertama Google."
    },
    {
      icon: <FaBullseye className="w-6 h-6 text-emerald-600" />,
      title: "Conversion Focus",
      desc: "Menyusun tata letak halaman yang logis untuk menuntun audiens Anda melakukan kontak/inquiry tanpa paksaan."
    },
    {
      icon: <FaDraftingCompass className="w-6 h-6 text-emerald-600" />,
      title: "Custom Design",
      desc: "Tidak memakai template pasaran. Desain unik yang disesuaikan secara presisi dengan identitas premium bisnis Anda."
    },
    {
      icon: <FaBolt className="w-6 h-6 text-emerald-600" />,
      title: "Next.js Performance",
      desc: "Teknologi website modern dengan kecepatan loading di bawah 1.5 detik. Memastikan calon client tidak bosan menunggu."
    },
    {
      icon: <FaFolderOpen className="w-6 h-6 text-emerald-600" />,
      title: "CMS Mudah Digunakan",
      desc: "Kelola portofolio, artikel blog, dan layanan produk dengan mandiri dan gampang, tanpa ketergantungan pada developer."
    },
    {
      icon: <FaHeadset className="w-6 h-6 text-emerald-600" />,
      title: "Support Setelah Launch",
      desc: "Dukungan penuh pemeliharaan sistem, server, serta update data selama 3 bulan gratis untuk kelancaran bisnis Anda."
    }
  ];

  return (
    <section className="py-20 md:py-32 bg-white relative">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        <div className="text-center mb-16 md:mb-24">
          <p className="text-[10px] md:text-sm font-semibold text-gray-500 uppercase tracking-widest mb-2">Mengapa Memilih Kami</p>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight">
            Keunggulan Utama <span className="text-emerald-600">Asterix Studio.</span>
          </h2>
          <p className="text-sm md:text-lg text-gray-500 mt-4 md:mt-6 max-w-2xl mx-auto font-medium leading-relaxed">
            Kami tidak hanya membangun website yang tampak indah, kami membangun mesin pertumbuhan bisnis jangka panjang.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {reasons.map((reason, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-6 md:p-8 bg-white border border-gray-100 rounded-3xl shadow-[0_4px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.06)] hover:border-emerald-500/10 transition-all duration-300 flex flex-col items-start text-left group"
            >
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center mb-6 group-hover:bg-emerald-100 transition-colors">
                {reason.icon}
              </div>
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 group-hover:text-emerald-700 transition-colors">
                {reason.title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed font-medium">
                {reason.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
