"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FaArrowLeft, FaHome } from "react-icons/fa";
import Navbar from "@/components/Navbar";
import B2BFooter from "@/components/sections/b2b/B2BFooter";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#F8F9FA] flex items-center justify-center pt-20">
        {/* Background Decor */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[20%] right-[10%] w-[40%] h-[40%] bg-emerald-100/30 blur-[120px] rounded-full"></div>
          <div className="absolute bottom-[10%] left-[5%] w-[30%] h-[30%] bg-sky-100/30 blur-[120px] rounded-full"></div>
        </div>

        <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-[150px] md:text-[200px] font-black text-slate-900 leading-none tracking-tighter mb-4 opacity-10">
              404
            </h1>
            <div className="-mt-20 md:-mt-32">
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
                Halaman Tidak <span className="text-emerald-500 italic">Ditemukan.</span>
              </h2>
              <p className="text-gray-500 font-medium text-lg mb-10 max-w-md mx-auto">
                Maaf, halaman yang Anda cari mungkin telah dipindahkan atau tidak pernah ada.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/"
                  className="flex items-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-full text-sm font-black hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10 group"
                >
                  <FaHome className="group-hover:-translate-y-0.5 transition-transform" />
                  Kembali ke Beranda
                </Link>
                <Link
                  href="/blog"
                  className="flex items-center gap-2 bg-white border border-gray-100 text-slate-900 px-8 py-4 rounded-full text-sm font-black hover:bg-gray-50 transition-all shadow-sm group"
                >
                  <FaArrowLeft className="text-xs group-hover:-translate-x-1 transition-transform" />
                  Baca Blog Kami
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      <B2BFooter />
    </>
  );
}
