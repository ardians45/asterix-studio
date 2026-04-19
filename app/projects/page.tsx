"use client";

import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaArrowRight, FaGripLinesVertical } from "react-icons/fa";

interface ShowcaseProject {
  id: string;
  title: string;
  client: string;
  category: string;
  description: string;
  beforeImage: string;
  afterImage: string;
  results: { label: string; value: string }[];
  link?: string;
}

const showcaseProjects: ShowcaseProject[] = [
  {
    id: "paletindo",
    title: "E-Catalog Paletindo",
    client: "Paletindo",
    category: "E-Catalog & Admin Panel",
    description:
      "Pembangunan e-catalog produk digital lengkap dengan admin panel untuk manajemen produk dan artikel. Sistem modern berbasis Next.js dengan performa tinggi dan SEO-ready.",
    beforeImage: "/projects/showcase/paletindo/before.png",
    afterImage: "/projects/showcase/paletindo/after.png",
    results: [
      { label: "Produk", value: "500+" },
      { label: "Speed", value: "98/100" },
      { label: "SEO", value: "Optimal" },
    ],
  },
  {
    id: "srlaundry",
    title: "SR Laundry",
    client: "SR Laundry",
    category: "Landing Page",
    description:
      "Transformasi website laundry dari tampilan standar menjadi halaman modern yang langsung menampilkan layanan, harga, dan tombol order WhatsApp yang jelas.",
    beforeImage: "/projects/showcase/srlaundry/before.png",
    afterImage: "/projects/showcase/srlaundry/after.png",
    results: [
      { label: "Inquiry", value: "+180%" },
      { label: "Bounce Rate", value: "-45%" },
      { label: "Load Time", value: "1.2s" },
    ],
  },
  {
    id: "rapor-lamaholot",
    title: "Sistem Rapor Digital",
    client: "SD Lamaholot",
    category: "Web Application",
    description:
      "Pembangunan sistem akademik rapor digital full-stack dengan dashboard admin, input nilai otomatis, dan cetak rapor PDF profesional.",
    beforeImage: "/projects/showcase/rapor-lamaholot/before.png",
    afterImage: "/projects/showcase/rapor-lamaholot/after.png",
    results: [
      { label: "Efisiensi", value: "10x" },
      { label: "Akurasi", value: "99.9%" },
      { label: "Waktu", value: "-80%" },
    ],
  },
];

function BeforeAfterSlider({
  beforeImage,
  afterImage,
  title,
}: {
  beforeImage: string;
  afterImage: string;
  title: string;
}) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback(
    (clientX: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
      const percent = (x / rect.width) * 100;
      setSliderPosition(percent);
    },
    []
  );

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging) return;
      handleMove(e.clientX);
    },
    [isDragging, handleMove]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      handleMove(e.touches[0].clientX);
    },
    [handleMove]
  );

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden cursor-col-resize select-none bg-gray-100 group"
      onMouseMove={handleMouseMove}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchMove={handleTouchMove}
      onTouchStart={handleMouseDown}
      onTouchEnd={handleMouseUp}
    >
      {/* After Image (Full Background) */}
      <img
        src={afterImage}
        alt={`${title} - After`}
        className="absolute inset-0 w-full h-full object-cover object-top"
        draggable={false}
      />

      {/* Before Image (Clipped) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${sliderPosition}%` }}
      >
        <img
          src={beforeImage}
          alt={`${title} - Before`}
          className="absolute inset-0 w-full h-full object-cover object-top"
          style={{ width: containerRef.current?.offsetWidth || "100%" }}
          draggable={false}
        />
      </div>

      {/* Slider Line */}
      <div
        className="absolute top-0 bottom-0 w-[3px] bg-white shadow-[0_0_12px_rgba(0,0,0,0.4)] z-20"
        style={{ left: `${sliderPosition}%`, transform: "translateX(-50%)" }}
      >
        {/* Slider Handle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center border-2 border-gray-200 group-hover:scale-110 transition-transform">
          <FaGripLinesVertical className="text-gray-400 text-sm" />
        </div>
      </div>

      {/* Labels */}
      <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full z-10">
        Before
      </div>
      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-gray-900 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full z-10">
        After
      </div>
    </div>
  );
}

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-[#F8F9FA] pt-32 pb-20 px-4 selection:bg-emerald-200 selection:text-emerald-900">
      {/* Background Decor */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -right-[10%] w-[40%] h-[40%] bg-emerald-100/20 blur-[120px] rounded-full"></div>
        <div className="absolute top-[50%] -left-[10%] w-[30%] h-[50%] bg-sky-100/20 blur-[120px] rounded-full"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="inline-block py-1.5 px-4 bg-white/80 backdrop-blur-sm border border-gray-100 rounded-full text-[10px] font-black tracking-[0.2em] text-gray-500 uppercase mb-6 shadow-sm">
            Showcase
          </span>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-[0.95] tracking-tighter mb-8">
            Projek <span className="text-[#10b981] italic">Unggulan</span>
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto font-medium leading-relaxed">
            Lihat sendiri transformasi nyata website klien kami. Geser slider
            untuk melihat perbandingan <strong>Before vs After</strong>.
          </p>
        </motion.div>

        {/* Project Showcase Cards */}
        <div className="space-y-32">
          {showcaseProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              {/* Project Header */}
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 border-b border-gray-200 pb-6">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-6xl md:text-7xl font-black text-gray-100 leading-none select-none">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[10px] font-bold text-[#10b981] bg-[#10b981]/10 px-3 py-1 rounded-full uppercase tracking-widest">
                      {project.category}
                    </span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
                    {project.title}
                  </h2>
                  <p className="text-sm text-gray-400 font-medium mt-1">
                    Client: {project.client}
                  </p>
                </div>
              </div>

              {/* Before/After Slider */}
              <BeforeAfterSlider
                beforeImage={project.beforeImage}
                afterImage={project.afterImage}
                title={project.title}
              />

              {/* Description + Results */}
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <p className="flex-1 text-gray-600 font-medium leading-relaxed text-lg">
                  {project.description}
                </p>

                <div className="flex gap-6 md:gap-8 flex-shrink-0">
                  {project.results.map((result, rIdx) => (
                    <div key={rIdx} className="text-center">
                      <p className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">
                        {result.value}
                      </p>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">
                        {result.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-32 text-center"
        >
          <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">
            Siap untuk transformasi yang sama?
          </p>
          <Link
            href="https://wa.me/6285129488941?text=Halo%20Asterix%20Studio,%20saya%20ingin%20konsultasi%20website%20saya."
            target="_blank"
            className="inline-flex items-center gap-3 bg-gray-900 text-white px-8 py-4 rounded-full font-bold hover:bg-black transition-colors shadow-lg group"
          >
            Konsultasi Gratis
            <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
