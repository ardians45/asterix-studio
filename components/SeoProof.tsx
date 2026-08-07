"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FaGoogle, FaExternalLinkAlt, FaChartLine, FaCheckCircle, FaRocket } from "react-icons/fa";

const seoCases = [
  {
    id: "paletindo",
    client: "Paletindo",
    domain: "paletindo.id",
    title: "E-Catalog & Admin Panel Paletindo",
    keyword: "Jasa Pembuatan Palet / E-Catalog Palet Digital",
    rank: "Halaman #1 Google (Organik)",
    description: "Pembangunan e-catalog produk digital lengkap dengan admin panel untuk manajemen inventaris. Struktur SEO teknis dirancang presisi hingga mencapai skor kecepatan sempurna 100/100.",
    image: "/projects/showcase/paletindo/after.png",
    logo: "/logopaletindo.png",
    liveUrl: "https://paletindo.id/",
    metrics: [
      { icon: <FaGoogle className="text-[#4285F4]" />, label: "Rank #1 Google", detail: "Keyword Organik" },
      { icon: <FaRocket className="text-[#e8702a]" />, label: "100/100", detail: "PageSpeed Score" },
      { icon: <FaCheckCircle className="text-[#10b981]" />, label: "Realtime", detail: "Admin Sync" }
    ]
  },
  {
    id: "srlaundry",
    client: "SR Laundry",
    domain: "srlaundry.site",
    title: "SR Laundry Landing Page Direct Booking",
    keyword: "Jasa Laundry Terdekat & Layanan Cuci Express",
    rank: "Halaman #1 Google (Organik)",
    description: "Transformasi landing page yang fokus pada 'Direct Booking'. Mengoptimalkan alur navigasi dari traffic iklan & pencarian lokal Google langsung ke WhatsApp.",
    image: "/projects/showcase/srlaundry/after.png",
    logo: "/logosrlaundry.png",
    liveUrl: "https://srlaundry.site/",
    metrics: [
      { icon: <FaGoogle className="text-[#4285F4]" />, label: "Rank #1 Google", detail: "Pencarian Lokal" },
      { icon: <FaChartLine className="text-[#10b981]" />, label: "+180%", detail: "WhatsApp Inquiry" },
      { icon: <FaRocket className="text-[#e8702a]" />, label: "1.2 detik", detail: "Waktu Muat" }
    ]
  }
];

export default function SeoProof() {
  return (
    <section id="seo-proof" className="py-24 md:py-32 px-4 md:px-12 max-w-7xl mx-auto border-t border-gray-300/70">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row gap-8 md:gap-16 mb-20">
        <div className="md:w-1/3">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-xl text-[#e8702a] uppercase tracking-widest font-cinzel border-l-2 border-[#e8702a] pl-4">
              SEO Google Rank Proof
            </h2>
          </motion.div>
        </div>

        <div className="md:w-2/3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 text-xs font-mono font-bold uppercase tracking-widest mb-4">
              <FaGoogle className="text-[#4285F4]" /> Top Search Organic Performance
            </span>
            <h3 className="text-4xl md:text-6xl font-cinzel font-bold text-gray-900 leading-tight mb-6">
              Mendominasi Halaman #1 Google.
            </h3>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed font-sans max-w-3xl">
              Struktur arsitektur informasi dan optimasi SEO lokal yang kami rancang terbukti menempatkan bisnis klien di posisi teratas Google secara organik.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Proof Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {seoCases.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: idx * 0.15 }}
            whileHover={{ y: -6 }}
            className="bg-white rounded-2xl md:rounded-3xl border border-gray-200 shadow-md hover:shadow-xl hover:border-[#e8702a]/60 transition-all duration-500 overflow-hidden flex flex-col justify-between group"
          >
            {/* Header & Logo */}
            <div className="p-8 pb-4">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-xl bg-gray-100 p-2 border border-gray-200 flex items-center justify-center overflow-hidden">
                    <Image 
                      src={item.logo} 
                      alt={item.client} 
                      fill 
                      className="object-contain p-1"
                    />
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold font-display text-gray-900">{item.client}</h4>
                    <span className="text-xs font-mono text-gray-500">{item.domain}</span>
                  </div>
                </div>

                <Link
                  href={item.liveUrl}
                  target="_blank"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 hover:bg-[#e8702a] hover:text-white text-gray-700 text-xs font-mono font-medium transition-all"
                >
                  Visit Site <FaExternalLinkAlt className="text-[10px]" />
                </Link>
              </div>

              {/* Rank Banner */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-800 text-xs font-mono font-bold tracking-wide mb-4">
                <FaGoogle className="text-[#4285F4]" /> {item.rank}
              </div>

              <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-6">
                {item.description}
              </p>

              {/* Performance Metrics Pills */}
              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-gray-100 mb-6">
                {item.metrics.map((m, mIdx) => (
                  <div key={mIdx} className="flex flex-col items-center text-center p-3 rounded-xl bg-[#FAF9F5] border border-gray-100">
                    <div className="text-base mb-1">{m.icon}</div>
                    <span className="text-xs font-bold text-gray-900 font-mono">{m.label}</span>
                    <span className="text-[10px] text-gray-500 font-mono">{m.detail}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Showcase Image */}
            <div className="relative aspect-[16/9] w-full bg-gray-100 overflow-hidden border-t border-gray-200">
              <Image 
                src={item.image} 
                alt={`${item.client} SEO Proof`} 
                fill 
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-black/70 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/20 text-white text-xs font-mono flex items-center justify-between">
                <span className="truncate">Keyword: {item.keyword}</span>
                <span className="text-[#10b981] font-bold shrink-0 ml-2">#1 Google</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
