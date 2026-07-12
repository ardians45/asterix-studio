"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { FaGoogle, FaCheckCircle } from "react-icons/fa";

interface KeywordProof {
  keyword: string;
  location: string;
  position: string;
  image: string;
  snippet: string;
}

export default function SeoProofsSection() {
  const categories = [
    { id: "paletindo", label: "Paletindo" },
    { id: "srlaundry", label: "SR Laundry" }
  ];

  const proofsData: Record<string, KeywordProof[]> = {
    paletindo: [
      {
        keyword: "palet plastik serpong",
        location: "Serpong, Tangerang Selatan",
        position: "Peringkat #1 Organik",
        image: "/seo-google/palet plastik serpong.png",
        snippet: "Dominasi total untuk pencarian area Serpong, mengarahkan pembeli industri langsung ke kontak sales."
      },
      {
        keyword: "palet plastik bsd city",
        location: "BSD City",
        position: "Halaman 1 Google",
        image: "/seo-google/palet plastik bsd city.png",
        snippet: "Menjaring traffic premium dari kawasan industri dan komersial BSD City."
      },
      {
        keyword: "palet plastik ciputat",
        location: "Ciputat",
        position: "Halaman 1 Google",
        image: "/seo-google/palet plastik ciputat.png",
        snippet: "Mengoptimalkan pencarian lokal area Ciputat dengan optimasi on-page yang presisi."
      },
      {
        keyword: "palet plastik pamulang",
        location: "Pamulang",
        position: "Halaman 1 Google",
        image: "/seo-google/palet plastik pamulang.png",
        snippet: "Target kata kunci wilayah Pamulang terindeks sempurna di posisi teratas hasil pencarian."
      },
      {
        keyword: "palet plastik pondok aren",
        location: "Pondok Aren",
        position: "Halaman 1 Google",
        image: "/seo-google/palet plastik pondok aren.png",
        snippet: "Menghubungkan bisnis palet dengan pembeli potensial di wilayah Pondok Aren secara langsung."
      },
      {
        keyword: "palet plastik serpong utara",
        location: "Serpong Utara",
        position: "Halaman 1 Google",
        image: "/seo-google/palet plastik serpong utara.png",
        snippet: "Hasil SEO lokal yang konsisten dan stabil untuk kawasan Serpong Utara."
      }
    ],
    srlaundry: [
      {
        keyword: "laundry coin ciledug",
        location: "Ciledug, Tangerang",
        position: "Peringkat #1 Organik",
        image: "/seo-google/laundry coin ciledug.png",
        snippet: "Mendominasi pasar retail local laundry coin di Ciledug dengan menduduki ranking teratas di Google."
      }
    ]
  };

  const [activeCategory, setActiveCategory] = useState("paletindo");
  const [selectedProofIndex, setSelectedProofIndex] = useState(0);

  const currentProofs = proofsData[activeCategory] || [];
  const selectedProof = currentProofs[selectedProofIndex] || currentProofs[0];

  const handleCategoryChange = (catId: string) => {
    setActiveCategory(catId);
    setSelectedProofIndex(0);
  };

  return (
    <section className="py-20 bg-gray-50 border-t border-gray-100/60">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 py-1.5 px-4 bg-emerald-50 border border-emerald-100 rounded-full text-[10px] font-black tracking-[0.2em] text-[#10b981] uppercase mb-6 shadow-sm">
            <FaGoogle className="text-xs" />
            SEO Google Rank Proof
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight">
            Mendominasi Halaman #1 <span className="text-emerald-600">Google.</span>
          </h2>
          <p className="text-sm md:text-lg text-gray-500 mt-4 max-w-2xl mx-auto font-medium leading-relaxed">
            Struktur arsitektur informasi dan optimasi SEO lokal yang kami rancang terbukti menempatkan bisnis klien di posisi teratas Google secara organik.
          </p>
        </div>

        {/* Category Selector Tabs */}
        <div className="flex justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.id)}
              className={`px-5 py-2.5 rounded-full text-xs md:text-sm font-black uppercase tracking-wider transition-all border ${
                activeCategory === cat.id
                  ? "bg-emerald-600 border-emerald-600 text-white shadow-lg shadow-emerald-600/20"
                  : "bg-white border-gray-200 text-gray-500 hover:text-gray-900"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Mobile view: custom dropdown select menu */}
          <div className="lg:hidden col-span-1 w-full mb-4">
            <label className="block text-[10px] font-black uppercase tracking-wider text-gray-400 mb-2">
              Pilih Kata Kunci Target
            </label>
            <div className="relative">
              <select
                value={selectedProofIndex}
                onChange={(e) => setSelectedProofIndex(Number(e.target.value))}
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 text-xs font-black uppercase tracking-wider text-slate-800 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 appearance-none shadow-sm cursor-pointer"
              >
                {currentProofs.map((proof, idx) => (
                  <option key={idx} value={idx}>
                    "{proof.keyword}" — {proof.position}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-slate-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Desktop view: Left Column scrollable Keywords List */}
          <div className="hidden lg:block lg:col-span-5 max-h-[460px] overflow-y-auto pr-2 space-y-4 custom-scrollbar">
            {currentProofs.map((proof, idx) => {
              const isSelected = selectedProofIndex === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setSelectedProofIndex(idx)}
                  className={`w-full text-left p-5 rounded-2xl border transition-all flex flex-col justify-between items-start gap-2 relative overflow-hidden group ${
                    isSelected
                      ? "bg-white border-emerald-500/30 shadow-[0_10px_30px_rgba(0,0,0,0.04)]"
                      : "bg-white/50 border-gray-100 hover:bg-white hover:border-gray-200"
                  }`}
                >
                  {isSelected && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500" />
                  )}
                  <div className="flex justify-between items-center w-full">
                    <span className="font-mono text-[10px] text-gray-400 uppercase tracking-wider">
                      {proof.location}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                      <FaCheckCircle className="text-xs" />
                      {proof.position}
                    </span>
                  </div>
                  <h3 className={`text-lg font-black transition-colors ${
                    isSelected ? "text-emerald-700" : "text-slate-800 group-hover:text-slate-900"
                  }`}>
                    "{proof.keyword}"
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed mt-1">
                    {proof.snippet}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Right Column: Google Result Image Frame */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-[32px] border border-gray-200/60 shadow-[0_20px_50px_rgba(0,0,0,0.04)] overflow-hidden">
              
              {/* Browser Mockup Top Bar */}
              <div className="bg-gray-50/80 border-b border-gray-100 px-6 py-4 flex items-center gap-3">
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-red-400/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-yellow-400/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-green-400/80 inline-block" />
                </div>
                <div className="bg-white border border-gray-100 rounded-lg px-3 py-1 flex items-center gap-2 text-gray-400 text-xs flex-1 max-w-md ml-4 shadow-sm font-medium">
                  <FaGoogle className="text-gray-400" />
                  <span className="text-gray-600 truncate">google.co.id/search?q={encodeURIComponent(selectedProof.keyword)}</span>
                </div>
              </div>

              {/* Screenshot Wrapper */}
              <div className="p-4 md:p-6 bg-slate-950 flex justify-center items-center relative overflow-hidden group/screenshot min-h-[380px] md:min-h-[460px]">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-slate-900/50 opacity-20 pointer-events-none z-10" />
                
                <div className="relative w-full h-[360px] md:h-[420px] rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-slate-900 flex items-center justify-center">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={selectedProof.keyword}
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.3 }}
                      className="w-full h-full relative"
                    >
                      <Image
                        src={selectedProof.image}
                        alt={`Bukti Ranking Google ${selectedProof.keyword}`}
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 100vw, 800px"
                        priority
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Caption overlay */}
                <div className="absolute bottom-8 left-8 right-8 bg-black/60 backdrop-blur-md border border-white/10 rounded-2xl p-4 z-20 shadow-xl pointer-events-none">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-[10px] font-black tracking-widest text-[#10b981] uppercase">Keyword Target</p>
                      <h4 className="text-white font-bold text-sm md:text-base">"{selectedProof.keyword}"</h4>
                    </div>
                    <div className="flex items-center gap-1 bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-xs font-black">
                      Page 1
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
        .scrollbar-none::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-none {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </section>
  );
}
