"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { FaCheck, FaCrown, FaStar, FaGem, FaRocket, FaClock } from "react-icons/fa";
import Link from "next/link";

const pricingData = [
  {
    name: "Paket Basic",
    price: "1.350.000",
    originalPrice: "1.500.000",
    discount: "DISKON 10%",
    icon: <FaRocket className="text-emerald-500" />,
    features: [
      "Website 1 Halaman (Landing Page)",
      "Nama Domain Pilihan (.com/.id)",
      "Sewa Server/Hosting (1 Tahun)",
      "Sertifikat Keamanan (SSL/HTTPS)",
      "Pendaftaran ke Google (SEO Dasar)",
      "Tampilan Rapi di HP & Laptop",
    ],
    cta: "Pilih Paket Ini",
    color: "emerald",
  },
  {
    name: "Paket Advance",
    price: "2.175.000",
    originalPrice: "2.900.000",
    discount: "DISKON 25%",
    popular: true,
    icon: <FaStar className="text-sky-500" />,
    features: [
      "Desain Eksklusif & Modern",
      "Hingga 5 Halaman Dinamis",
      "Sistem Admin (Kelola Isi Website)",
      "Server Performa Standar Plus",
      "Sertifikat Keamanan (SSL/HTTPS)",
      "Optimasi Google Kelanjutan",
      "Tombol Chat WhatsApp Langsung",
      "Dashboard Admin Profesional",
    ],
    cta: "Pilih Paket Ini",
    color: "sky",
  },
  {
    name: "Paket Professional",
    price: "5.400.000",
    originalPrice: "6.000.000",
    discount: "DISKON 10%",
    icon: <FaCrown className="text-amber-500" />,
    features: [
      "Desain Custom Eksklusif & Modern",
      "Halaman Website Maks 15 Halaman",
      "CMS / Dashboard Admin Lengkap",
      "SEO On-Page Menyeluruh",
      "Laporan Google Analytics Bulanan",
      "Integrasi Formulir & WhatsApp",
      "SSL + Hosting Performa Tinggi",
      "Maintenance & Revisi Minor 1 Tahun",
      "Ruang Simpan Data Luas",
    ],
    cta: "Pilih Paket Ini",
    color: "amber",
  },
  {
    name: "Paket Enterprise / Proyek Custom",
    price: "Harga Sesuai Kebutuhan",
    originalPrice: "",
    discount: "",
    icon: <FaGem className="text-purple-500" />,
    features: [],
    description: "Butuh sistem aplikasi, e-commerce, atau infrastruktur khusus? Kami kerjakan sesuai kebutuhan bisnis Anda.",
    cta: "Konsultasi Gratis",
    color: "purple",
    isCustom: true,
    customLink: "https://wa.me/6285129488941?text=Halo%20Asterix%20Studio,%20saya%20ingin%20konsultasi%20gratis.",
  },
];

export default function PricingSection() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [currentMonth, setCurrentMonth] = useState("Bulan Ini");

  useEffect(() => {
    const months = [
      "Januari", "Februari", "Maret", "April", "Mei", "Juni",
      "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];
    setCurrentMonth(months[new Date().getMonth()]);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
      const diff = endOfMonth.getTime() - now.getTime();

      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / 1000 / 60) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="pricing" className="py-20 md:py-24 bg-[#F8F9FA] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        {/* Header section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block py-1.5 px-4 bg-emerald-50 border border-emerald-100 rounded-full text-[10px] font-black tracking-[0.2em] text-emerald-600 uppercase mb-6 shadow-sm">
            Promo {currentMonth}
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 leading-[0.95] tracking-tighter mb-6 italic">
            PAKET HEMAT <br/> 
            <span className="text-emerald-500">& JELAS</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto font-medium leading-relaxed">
            Investasi sekali, manfaat seumur hidup untuk bisnis Anda. Penawaran terbatas Promo {currentMonth}!
          </p>
        </motion.div>

        {/* Big Countdown Section */}
        <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           className="mb-16 bg-gray-900 rounded-[32px] md:rounded-[48px] p-6 md:p-10 text-center relative overflow-hidden shadow-2xl shadow-emerald-900/10"
        >
           <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-transparent"></div>
           <div className="relative z-10">
              <div className="flex items-center justify-center gap-3 text-emerald-400 font-black text-xs uppercase tracking-[0.3em] mb-6">
                 <FaClock className="animate-pulse" />
                 Promo {currentMonth} Selesai Dalam
              </div>
              
              <div className="flex flex-wrap items-center justify-center gap-4 md:gap-10">
                 {[
                   { label: "Hari", value: timeLeft.days },
                   { label: "Jam", value: timeLeft.hours },
                   { label: "Menit", value: timeLeft.minutes },
                   { label: "Detik", value: timeLeft.seconds },
                 ].map((item, i) => (
                   <div key={i} className="flex flex-col items-center">
                      <div className="text-4xl md:text-7xl font-black text-white tabular-nums tracking-tighter">
                         {String(item.value).padStart(2, '0')}
                      </div>
                      <div className="text-[10px] md:text-xs font-black text-gray-400 uppercase tracking-widest mt-1">
                         {item.label}
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </motion.div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 items-stretch">
          {pricingData.map((pkg, idx) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.8 }}
              className={`relative flex flex-col h-full group bg-white rounded-[32px] md:rounded-[40px] p-6 md:p-8 pb-8 md:pb-10 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border-2 transition-all duration-500 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] ${
                pkg.popular ? "border-sky-500 scale-[1.02] z-20" : "border-white hover:border-gray-100"
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-sky-500 text-white text-[10px] font-black py-2 px-6 rounded-full tracking-[0.2em] shadow-lg">
                  POPULER
                </div>
              )}

              {/* Package Meta */}
              <div className="flex justify-between items-start mb-6">
                <div className="p-4 bg-gray-50 rounded-2xl group-hover:scale-110 transition-transform duration-500">
                  {pkg.icon}
                </div>
                {pkg.discount && (
                  <span className="text-[10px] font-black text-white bg-emerald-500 py-1.5 px-3 rounded-lg tracking-widest shadow-lg shadow-emerald-500/20">
                    {pkg.discount}
                  </span>
                )}
              </div>

              <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2">
                {pkg.name}
              </h3>
              
              <div className="mb-6 min-h-[56px] flex flex-col justify-center">
                {pkg.isCustom ? (
                  <span className="text-xl font-black text-slate-900 tracking-tight leading-tight">
                    {pkg.price}
                  </span>
                ) : (
                  <>
                    <div className="flex items-baseline gap-1">
                      <span className="text-sm font-bold text-gray-400">Rp</span>
                      <span className="text-3xl font-black text-slate-900 tracking-tighter">{pkg.price}</span>
                    </div>
                    {pkg.originalPrice && (
                      <div className="text-sm font-medium text-gray-400 line-through">
                        Rp {pkg.originalPrice}
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* Features List or Description */}
              <div className="flex-1 mb-8">
                {pkg.description ? (
                  <p className="text-sm font-medium text-gray-500 leading-relaxed">
                    {pkg.description}
                  </p>
                ) : (
                  <div className="space-y-3 md:space-y-4">
                    {pkg.features.map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-3">
                        <div className="mt-1 flex-shrink-0 w-4 h-4 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center text-[8px]">
                          <FaCheck />
                        </div>
                        <span className="text-xs md:text-sm font-medium text-gray-600 leading-tight">{feature}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* CTA */}
              <Link
                href={
                  pkg.customLink 
                    ? pkg.customLink 
                    : `https://wa.me/6285129488941?text=Halo%20Asterix%20Studio,%20saya%20tertarik%20dengan%20${pkg.name}%20(Promo%20${currentMonth})`
                }
                target="_blank"
                className={`mt-auto flex items-center justify-center w-full py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all duration-300 ${
                  pkg.popular 
                    ? "bg-sky-500 text-white hover:bg-sky-600 shadow-lg shadow-sky-500/20" 
                    : "bg-white border-2 border-gray-100 text-slate-900 hover:border-gray-900 hover:bg-gray-50"
                }`}
              >
                {pkg.cta}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Footer info */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
             Harga sudah termasuk diskon promo
          </p>
          <Link
            href="https://wa.me/6285129488941?text=Halo%20Asterix%20Studio,%20saya%20ingin%20konsultasi%20gratis."
            target="_blank"
            className="inline-flex items-center gap-2 text-emerald-600 font-black text-sm hover:text-emerald-700 transition-colors group"
          >
            Konsultasi gratis tanpa biaya!
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
