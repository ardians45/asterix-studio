"use client";

import { motion } from "framer-motion";
import { FaWhatsapp, FaEnvelope, FaMapMarkerAlt, FaPaperPlane } from "react-icons/fa";
import Navbar from "@/components/Navbar";
import B2BFooter from "@/components/sections/b2b/B2BFooter";

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#F8F9FA] selection:bg-emerald-200 selection:text-emerald-900 pt-28 pb-20">
        {/* Background Decor */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[10%] left-[10%] w-[30%] h-[30%] bg-emerald-100/30 blur-[100px] rounded-full"></div>
          <div className="absolute bottom-[10%] right-[10%] w-[40%] h-[40%] bg-sky-100/20 blur-[120px] rounded-full"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            
            {/* Left Content */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-5"
            >
              <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-600 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 border border-emerald-100/50">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                Hubungi Asterix Studio
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter leading-[0.9] mb-8 uppercase italic">
                Ayo Bangun <br />
                <span className="text-emerald-500">Masa Depan</span> <br />
                Digital Anda
              </h1>
              <p className="text-gray-500 font-medium text-lg leading-relaxed mb-12 max-w-md">
                Konsultasikan kebutuhan website dan sistem digital bisnis Anda dengan tim ahli Asterix Studio.
              </p>

              <div className="space-y-6">
                {[
                  { icon: <FaEnvelope />, label: "Email Kami", value: "asterixstudio7@gmail.com", color: "bg-sky-50 text-sky-600" },
                  { icon: <FaWhatsapp />, label: "WhatsApp Chat", value: "+62 851-2948-8941", color: "bg-green-50 text-green-600" },
                  { icon: <FaMapMarkerAlt />, label: "Lokasi", value: "Tangerang, Indonesia", color: "bg-red-50 text-red-500" },
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + (i * 0.1) }}
                    className="flex items-center gap-6 group"
                  >
                    <div className={`w-14 h-14 rounded-2xl ${item.color} flex items-center justify-center text-xl transition-transform group-hover:scale-110 duration-500 shadow-sm`}>
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-0.5">{item.label}</p>
                      <p className="text-lg font-black text-slate-900 tracking-tight">{item.value}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right Form */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-7"
            >
              <div className="bg-white rounded-[48px] p-8 md:p-12 shadow-2xl shadow-slate-900/5 border border-white">
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Nama Lengkap</label>
                      <input 
                        type="text"
                        placeholder="Asterix User"
                        className="w-full bg-gray-50 border-none rounded-2xl py-5 px-6 font-bold text-slate-900 focus:ring-2 focus:ring-emerald-500 transition-all outline-none"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Alamat Email</label>
                      <input 
                        type="email"
                        placeholder="user@asterix.studio"
                        className="w-full bg-gray-50 border-none rounded-2xl py-5 px-6 font-bold text-slate-900 focus:ring-2 focus:ring-emerald-500 transition-all outline-none"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Subjek Pesan</label>
                    <select className="w-full bg-gray-50 border-none rounded-2xl py-5 px-6 font-bold text-slate-900 focus:ring-2 focus:ring-emerald-500 transition-all outline-none appearance-none">
                      <option>Pembuatan Website Baru</option>
                      <option>Pengembangan Aplikasi Web</option>
                      <option>Optimasi SEO</option>
                      <option>Lainnya</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Pesan Anda</label>
                    <textarea 
                      rows={4}
                      placeholder="Ceritakan sedikit tentang proyek atau tantangan bisnis Anda..."
                      className="w-full bg-gray-50 border-none rounded-2xl py-6 px-6 font-medium text-slate-900 focus:ring-2 focus:ring-emerald-500 transition-all outline-none resize-none"
                    ></textarea>
                  </div>

                  <button className="w-full bg-slate-900 text-white font-black py-6 rounded-2xl text-xs uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-emerald-500 transition-all shadow-xl shadow-slate-900/10 group active:scale-[0.98]">
                    KIRIM PESAN SEKARANG
                    <FaPaperPlane className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </button>
                </form>
                
                <div className="mt-10 pt-10 border-t border-gray-50 text-center">
                  <p className="text-gray-400 text-xs font-bold mb-4">Pilihan pengerjaan kilat? Hubungi via WhatsApp</p>
                  <a 
                    href="https://wa.me/6285129488941" 
                    target="_blank"
                    className="inline-flex items-center gap-3 text-emerald-500 font-black uppercase tracking-widest text-xs hover:text-emerald-600 transition-colors"
                  >
                    <FaWhatsapp className="text-lg" />
                    Chat dengan Admin Kami
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      <B2BFooter />
    </>
  );
}
