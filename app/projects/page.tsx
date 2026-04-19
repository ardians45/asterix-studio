"use client";

import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import B2BFooter from "@/components/sections/b2b/B2BFooter";
import ProjectBentoSection from "@/components/sections/ProjectBentoSection";
import { bentoProjects } from "@/data/projects";

export default function ProjectsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#F8F9FA] pt-32 pb-20 px-4">
        {/* Background Decor */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-[10%] -right-[10%] w-[40%] h-[40%] bg-emerald-100/20 blur-[120px] rounded-full"></div>
          <div className="absolute top-[50%] -left-[10%] w-[30%] h-[50%] bg-sky-100/20 blur-[120px] rounded-full"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-32 text-center md:text-left"
          >
            <span className="inline-block py-1.5 px-4 bg-white border border-gray-100 rounded-full text-[10px] font-black tracking-[0.2em] text-[#10b981] uppercase mb-6 shadow-sm">
              Featured Showcase
            </span>
            <h1 className="text-6xl md:text-9xl font-black text-slate-900 leading-[0.9] tracking-tighter mb-8 max-w-4xl">
              Hasil Nyata <br/> Transformasi <span className="text-[#10b981] italic">Digital.</span>
            </h1>
            <p className="text-lg md:text-2xl text-gray-500 max-w-2xl font-medium leading-relaxed">
              Kami membawa ide bisnis Anda ke level berikutnya dengan desain 
              yang presisi dan teknologi yang mumpuni.
            </p>
          </motion.div>

          {/* Bento Group Sections - Each project is a cluster */}
          {bentoProjects.map((project) => (
            <ProjectBentoSection key={project.id} project={project} />
          ))}

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-32 p-12 md:p-20 bg-gray-900 rounded-[60px] text-center text-white relative overflow-hidden group shadow-2xl shadow-black/20"
          >
            <div className="absolute inset-0 bg-[#10b981] opacity-0 group-hover:opacity-[0.05] transition-opacity duration-700" />
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-4xl md:text-6xl font-black mb-8 leading-[1.1] tracking-tighter">
                Mulai Transformasi <br/> Bisnis Anda Sekarang.
              </h2>
              <p className="text-gray-400 mb-12 text-lg font-medium">
                Punya tantangan digital? Mari kita temukan solusinya bersama tim Asterix Studio.
              </p>
              <Link
                href="https://wa.me/6285129488941"
                target="_blank"
                className="inline-flex items-center gap-4 bg-[#10b981] text-white px-10 py-5 rounded-full font-black hover:scale-105 transition-all shadow-xl shadow-[#10b981]/20"
              >
                Konsultasi Gratis
                <FaArrowRight />
              </Link>
            </div>
          </motion.div>
        </div>
      </main>
      <B2BFooter />
    </>
  );
}
