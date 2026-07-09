"use client";

import { motion } from "framer-motion";
import { FaFireAlt, FaRoute, FaSitemap, FaTachometerAlt, FaBrain, FaUniversalAccess, FaMobileAlt } from "react-icons/fa";

export default function DataDrivenExpertise() {
  const expertises = [
    {
      icon: <FaFireAlt className="w-5 h-5 text-red-500" />,
      title: "Heatmap Analysis",
      desc: "Menempatkan elemen penting di zona hangat di mana mata dan kursor pengguna paling sering berinteraksi."
    },
    {
      icon: <FaRoute className="w-5 h-5 text-blue-500" />,
      title: "User Flow Optimization",
      desc: "Memastikan jalur navigasi dari masuk halaman hingga konversi berjalan mulus tanpa hambatan."
    },
    {
      icon: <FaSitemap className="w-5 h-5 text-indigo-500" />,
      title: "SEO Architecture",
      desc: "Struktur heading H1-H4 yang hierarkis dan penulisan metadata yang ramah mesin pencari Google."
    },
    {
      icon: <FaTachometerAlt className="w-5 h-5 text-emerald-500" />,
      title: "Page Speed optimization",
      desc: "Kompresi aset visual tingkat tinggi dan minimalisasi blocking scripts untuk load di bawah 1.5 detik."
    },
    {
      icon: <FaBrain className="w-5 h-5 text-pink-500" />,
      title: "Conversion Psychology",
      desc: "Memanfaatkan teknik kontras warna, micro-copywriting penurun keraguan, dan penempatan CTA logis."
    },
    {
      icon: <FaUniversalAccess className="w-5 h-5 text-teal-500" />,
      title: "Accessibility (A11y)",
      desc: "Memastikan website dapat diakses dengan nyaman oleh semua orang, termasuk pembaca layar."
    },
    {
      icon: <FaMobileAlt className="w-5 h-5 text-orange-500" />,
      title: "Mobile Responsive",
      desc: "Desain adaptif yang terlihat sangat menakjubkan baik di layar handphone terkecil maupun monitor desktop lebar."
    }
  ];

  return (
    <section className="py-20 md:py-32 bg-gray-50 border-t border-gray-100">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-12 mb-16 md:mb-24">
          <div className="max-w-xl text-left">
            <p className="text-[10px] md:text-sm font-semibold text-gray-500 uppercase tracking-widest mb-2">Metodologi & Data</p>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight leading-tight">
              Kami Tidak Mendesain Berdasarkan <span className="text-red-500 italic">Selera.</span> <br />
              Kami Mendesain Berdasarkan <span className="text-emerald-600">Data.</span>
            </h2>
          </div>
          <p className="text-sm md:text-lg text-gray-500 max-w-md font-medium leading-relaxed text-left lg:mt-6">
            Di level harga premium, kepuasan subjektif tidaklah cukup. Setiap pixel yang kami pasang bertujuan untuk mempermudah audiens Anda melakukan transaksi.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {expertises.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex flex-col text-left"
            >
              <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center mb-4">
                {item.icon}
              </div>
              <h3 className="text-base font-bold text-gray-900 mb-2">
                {item.title}
              </h3>
              <p className="text-xs md:text-sm text-gray-500 leading-relaxed font-medium">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
