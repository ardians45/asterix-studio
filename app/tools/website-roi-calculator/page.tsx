"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaCalculator, FaRocket, FaClock, FaDollarSign, FaArrowRight, FaWhatsapp } from "react-icons/fa";
import Navbar from "@/components/Navbar";
import B2BFooter from "@/components/sections/b2b/B2BFooter";

export default function RoiCalculatorPage() {
  // Input states
  const [visitors, setVisitors] = useState<number>(5000);
  const [conversionRate, setConversionRate] = useState<number>(1.0);
  const [avgDealValue, setAvgDealValue] = useState<number>(2500000);
  const [loadTime, setLoadTime] = useState<number>(5.0);

  // Result states
  const [currentLeads, setCurrentLeads] = useState<number>(50);
  const [currentRevenue, setCurrentRevenue] = useState<number>(125000000);
  const [lostRevenue, setLostRevenue] = useState<number>(0);
  const [optimizedLeads, setOptimizedLeads] = useState<number>(0);
  const [optimizedRevenue, setOptimizedRevenue] = useState<number>(0);
  const [revenueIncrease, setRevenueIncrease] = useState<number>(0);

  useEffect(() => {
    // Current leads calculation
    const leads = Math.round(visitors * (conversionRate / 100));
    const revenue = leads * avgDealValue;
    setCurrentLeads(leads);
    setCurrentRevenue(revenue);

    // Speed impact: Google research states every 1s delay above 1s reduces conversions by ~7%
    // Asterix Next.js speed target: 1.2s
    const speedDelay = Math.max(0, loadTime - 1.2);
    const conversionLossPercentage = speedDelay * 7; // e.g. 5s - 1.2s = 3.8s * 7% = 26.6% loss
    
    // Optimized conversion rate if speed is 1.2s (recovering the lost conversion)
    // Formula: optimizedRate = currentRate / (1 - lossPercentage)
    const lossDecimal = conversionLossPercentage / 100;
    const optimizedRate = Math.min(10, lossDecimal >= 1 ? conversionRate * 2 : conversionRate / (1 - lossDecimal));
    
    // Extra B2B copywriting & UX optimization boost (est +15% conversion rate boost)
    const finalOptimizedRate = optimizedRate * 1.15;

    const optLeads = Math.round(visitors * (finalOptimizedRate / 100));
    const optRevenue = optLeads * avgDealValue;
    
    setOptimizedLeads(optLeads);
    setOptimizedRevenue(optRevenue);

    const increase = optRevenue - revenue;
    setRevenueIncrease(Math.max(0, increase));
    
    // Lost revenue due to slow loading speed alone
    const lostRev = Math.round(optLeads * (conversionLossPercentage / 100) * avgDealValue);
    setLostRevenue(Math.max(0, lostRev));
  }, [visitors, conversionRate, avgDealValue, loadTime]);

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0
    }).format(val);
  };

  const waText = encodeURIComponent(
    `Halo Asterix Studio, saya sudah mencoba Website ROI Calculator.\n\n` +
    `Detail Website Saya:\n` +
    `- Pengunjung/Bulan: ${visitors.toLocaleString("id-ID")}\n` +
    `- Estimasi Loading: ${loadTime} detik\n` +
    `- Potensi Kenaikan Omzet: ${formatRupiah(revenueIncrease)}/bulan\n\n` +
    `Saya ingin mengajukan Audit Kecepatan & SEO Detail Gratis untuk website saya.`
  );

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#F8F9FA] text-gray-900 selection:bg-emerald-200 selection:text-emerald-900 pt-32 pb-20 px-4 md:px-6">
        {/* Background Decor */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[10%] left-[10%] w-[30%] h-[30%] bg-emerald-100/30 blur-[100px] rounded-full"></div>
          <div className="absolute bottom-[10%] right-[10%] w-[40%] h-[40%] bg-sky-100/20 blur-[120px] rounded-full"></div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Header */}
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 py-1.5 px-4 bg-emerald-50 border border-emerald-100 rounded-full text-[10px] font-black tracking-[0.2em] text-emerald-600 uppercase mb-6 shadow-sm">
              <FaCalculator className="text-xs" />
              Lead Magnet Tool
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter leading-tight max-w-3xl mx-auto">
              Website ROI & <span className="text-emerald-600">PageSpeed Calculator.</span>
            </h1>
            <p className="text-sm md:text-lg text-gray-500 mt-4 max-w-2xl mx-auto font-medium leading-relaxed">
              Hitung berapa banyak calon pelanggan dan omzet yang hilang akibat website yang lambat, serta ketahui potensi kenaikan setelah dioptimasi oleh Asterix Studio.
            </p>
          </div>

          {/* Calculator Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Input Sliders */}
            <div className="lg:col-span-5 bg-white p-6 md:p-8 rounded-[32px] border border-gray-200/60 shadow-[0_10px_30px_rgba(0,0,0,0.03)] space-y-6">
              <h2 className="text-lg font-black text-slate-800 border-b pb-4 mb-2 flex items-center gap-2">
                <span className="p-2 bg-slate-50 rounded-lg text-emerald-600"><FaRocket className="text-sm" /></span>
                Data Website Saat Ini
              </h2>

              {/* Input 1: Traffic */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold text-gray-500 uppercase tracking-wider">
                  <span>Pengunjung/Bulan</span>
                  <span className="text-slate-800 font-mono font-black">{visitors.toLocaleString("id-ID")}</span>
                </div>
                <input
                  type="range"
                  min="500"
                  max="100000"
                  step="500"
                  value={visitors}
                  onChange={(e) => setVisitors(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                />
                <div className="flex justify-between text-[10px] text-gray-400 font-medium">
                  <span>500</span>
                  <span>100K+</span>
                </div>
              </div>

              {/* Input 2: Conversion Rate */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold text-gray-500 uppercase tracking-wider">
                  <span>Conversion Rate (%)</span>
                  <span className="text-slate-800 font-mono font-black">{conversionRate.toFixed(1)}%</span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="10"
                  step="0.1"
                  value={conversionRate}
                  onChange={(e) => setConversionRate(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                />
                <div className="flex justify-between text-[10px] text-gray-400 font-medium">
                  <span>0.1%</span>
                  <span>10%</span>
                </div>
              </div>

              {/* Input 3: Avg Deal Value */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold text-gray-500 uppercase tracking-wider">
                  <span>Rata-rata Nilai Transaksi</span>
                  <span className="text-slate-800 font-mono font-black">{formatRupiah(avgDealValue)}</span>
                </div>
                <input
                  type="range"
                  min="100000"
                  max="50000000"
                  step="100000"
                  value={avgDealValue}
                  onChange={(e) => setAvgDealValue(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                />
                <div className="flex justify-between text-[10px] text-gray-400 font-medium">
                  <span>100rb</span>
                  <span>50jt+</span>
                </div>
              </div>

              {/* Input 4: Loading Speed */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold text-gray-500 uppercase tracking-wider">
                  <span>Kecepatan Loading Website</span>
                  <span className={`font-mono font-black ${loadTime > 3 ? "text-red-500 animate-pulse" : "text-amber-500"}`}>
                    {loadTime.toFixed(1)} detik
                  </span>
                </div>
                <input
                  type="range"
                  min="1.0"
                  max="15.0"
                  step="0.5"
                  value={loadTime}
                  onChange={(e) => setLoadTime(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                />
                <div className="flex justify-between text-[10px] text-gray-400 font-medium">
                  <span>1.0s (Cepat)</span>
                  <span>15s (Sangat Lambat)</span>
                </div>
              </div>
            </div>

            {/* Right Column: Calculations & Results */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Highlight Card: Kenaikan Omzet */}
              <div className="bg-slate-900 rounded-[32px] p-8 text-white relative overflow-hidden shadow-xl shadow-emerald-950/10">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-transparent"></div>
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                  <div>
                    <span className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.22em] mb-2 block">
                      Potensi Kenaikan Omzet Bulanan
                    </span>
                    <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white font-mono">
                      {formatRupiah(revenueIncrease)}
                    </h2>
                    <p className="text-xs text-gray-400 mt-2 font-medium">
                      Estimasi tambahan omzet per bulan setelah website dioptimasi Next.js oleh Asterix Studio.
                    </p>
                  </div>
                  <a
                    href={`https://wa.me/6285129488941?text=${waText}`}
                    target="_blank"
                    className="flex-shrink-0 bg-emerald-500 text-slate-900 font-black text-xs uppercase tracking-widest px-6 py-4 rounded-full hover:bg-emerald-400 transition-colors flex items-center gap-2 hover:scale-105 transform duration-300"
                  >
                    Klaim Audit Gratis
                    <FaArrowRight />
                  </a>
                </div>
              </div>

              {/* Calculations Detail Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Card 1: Kondisi Sekarang */}
                <div className="bg-white p-6 rounded-2xl border border-gray-200/60 shadow-sm space-y-4">
                  <h3 className="text-xs font-black uppercase text-gray-400 tracking-wider flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-red-400 inline-block"></span>
                    Kondisi Website Saat Ini
                  </h3>
                  <div className="space-y-2">
                    <div>
                      <p className="text-[10px] text-gray-400 font-semibold uppercase">Total Leads / Bulan</p>
                      <p className="text-xl font-mono font-black text-slate-800">{currentLeads} Leads</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-400 font-semibold uppercase">Estimasi Omzet / Bulan</p>
                      <p className="text-xl font-mono font-black text-slate-800">{formatRupiah(currentRevenue)}</p>
                    </div>
                  </div>
                </div>

                {/* Card 2: Setelah Optimasi */}
                <div className="bg-white p-6 rounded-2xl border border-gray-200/60 shadow-sm space-y-4">
                  <h3 className="text-xs font-black uppercase text-emerald-600 tracking-wider flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
                    Setelah di-Optimasi Asterix
                  </h3>
                  <div className="space-y-2">
                    <div>
                      <p className="text-[10px] text-gray-400 font-semibold uppercase">Potensi Leads / Bulan</p>
                      <p className="text-xl font-mono font-black text-emerald-600">{optimizedLeads} Leads (+{Math.max(0, optimizedLeads - currentLeads)})</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-400 font-semibold uppercase">Potensi Omzet / Bulan</p>
                      <p className="text-xl font-mono font-black text-emerald-600">{formatRupiah(optimizedRevenue)}</p>
                    </div>
                  </div>
                </div>

              </div>

              {/* Speed Loss Info Banner */}
              {loadTime > 3 && (
                <div className="bg-red-50 border border-red-100 rounded-2xl p-5 flex items-start gap-4">
                  <div className="p-3 bg-red-100 text-red-600 rounded-xl mt-0.5">
                    <FaClock className="text-lg" />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-red-800">Biaya Kerugian Akibat Website Lambat</h4>
                    <p className="text-xs text-red-700/80 leading-relaxed font-medium mt-1">
                      Website Anda memuat dalam {loadTime} detik. Berdasarkan data riset Google, Anda diperkirakan kehilangan sekitar <span className="font-bold font-mono">{Math.round((loadTime - 1.2) * 7)}%</span> potensi calon pembeli yang terpental (*bounce*) sebelum halaman terbuka sepenuhnya. 
                    </p>
                    <p className="text-xs text-red-800 font-black mt-3">
                      Kerugian Omzet Anda: -{formatRupiah(lostRevenue)}/bulan!
                    </p>
                  </div>
                </div>
              )}

              {/* Call-to-Action Bottom Banner */}
              <div className="bg-white p-6 md:p-8 rounded-[32px] border border-gray-200/60 shadow-sm flex flex-col md:flex-row justify-between items-center gap-6">
                <div>
                  <h3 className="text-lg font-black text-slate-800">Siap Menghentikan Kebocoran Leads Anda?</h3>
                  <p className="text-xs text-gray-500 font-medium leading-relaxed mt-1">
                    Hubungi tim engineer dan SEO designer kami di Tangerang Selatan untuk audit performa full 1-on-1 gratis.
                  </p>
                </div>
                <a
                  href={`https://wa.me/6285129488941?text=${waText}`}
                  target="_blank"
                  className="flex items-center gap-2 bg-[#10b981] hover:bg-[#059669] text-white px-6 py-3.5 rounded-full text-xs font-black uppercase tracking-wider transition-colors shadow-lg shadow-emerald-500/10"
                >
                  <FaWhatsapp className="text-sm" />
                  Hubungi WhatsApp
                </a>
              </div>

            </div>

          </div>

        </div>
      </main>
      <B2BFooter />
    </>
  );
}
