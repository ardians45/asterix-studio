"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import { BsBasket2Fill, BsHeartFill, BsSearch } from "react-icons/bs";
import { MdEco, MdLocalShipping } from "react-icons/md";

export default function CactasticPage() {
  const features = [
    { title: "Plant Identification", desc: "AI-powered plant ID to help hobbyists identify cactus species." },
    { title: "Care Guides", desc: "Specific care instructions for each cactus type bought." },
    { title: "Community Forum", desc: "Space for enthusiasts to share tips and trade rare specimens." },
  ];

  const metrics = [
    { label: "Species Listed", value: "150+", icon: MdEco },
    { label: "Community", value: "5k+", icon: BsHeartFill },
    { label: "Avg Order", value: "$45", icon: BsBasket2Fill },
  ];

  return (
    <main className="bg-black min-h-screen text-white pb-20">
      
      {/* Cinematic Hero */}
      <section className="relative w-full h-[70vh] md:h-[85vh] flex items-end pb-20 overflow-hidden">
         <Image 
            src="/projects/cactastic/cactastic.webp" 
            alt="Cactastic Hero" 
            fill 
            className="object-cover object-center opacity-70"
            priority
         />
         <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
         
         <div className="absolute top-8 left-6 md:top-12 md:left-12 z-20">
            <Link href="/#projects" className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-white/20 bg-black/50 backdrop-blur-md text-white hover:bg-white hover:text-black transition-all duration-300 group">
                <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
            </Link>
         </div>

         <div className="container mx-auto px-6 md:px-12 relative z-10 w-full">
             <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-end gap-8">
                <div className="w-full">
                     <h1 className="text-[10vw] md:text-[8vw] font-display font-black leading-none uppercase tracking-tighter mb-4 mix-blend-overlay text-white opacity-90">
                         Cactastic
                     </h1>
                     <p className="text-xl md:text-2xl font-mono text-gray-400 max-w-2xl">
                         Niche Marketplace for Cactus & Succulent Enthusiasts
                     </p>
                </div>
                
                <div className="flex flex-col gap-6 md:min-w-[300px] text-right md:text-left">
                     <div>
                        <span className="font-mono text-xs uppercase tracking-widest text-gray-500 block mb-1">Role</span>
                        <span className="text-xl font-bold">UI/UX Designer</span>
                     </div>
                     <div>
                        <span className="font-mono text-xs uppercase tracking-widest text-gray-500 block mb-1">Year</span>
                        <span className="text-xl font-bold">2024</span>
                     </div>
                </div>
             </div>
         </div>
      </section>

      <div className="container mx-auto px-6 md:px-12 max-w-7xl pt-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            
            {/* Left Content */}
            <div className="md:col-span-2 space-y-16">
                
                {/* Overview */}
                <section>
                    <h3 className="text-2xl font-bold mb-6 text-white border-l-4 border-green-500 pl-4">The Concept</h3>
                    <p className="text-gray-300 leading-loose text-lg mb-6">
                        Cactastic is designed as a specialized marketplace for the growing community of cactus and succulent lovers. 
                        Unlike general marketplaces, it focuses on the specific needs of plant shipping, care education, and rare species trading.
                        The design aesthetic mimics the clean, minimal, and organic nature of the plants themselves.
                    </p>
                </section>

                {/* Impact & Metrics */}
                <section>
                    <h3 className="text-2xl font-bold mb-8 text-white border-l-4 border-green-500 pl-4">Market Potential</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {metrics.map((m, i) => (
                            <div key={i} className="bg-[#111] p-6 rounded-2xl border border-white/5 flex flex-col items-center text-center">
                                <m.icon className="text-green-500 text-3xl mb-3" />
                                <span className="text-3xl font-bold text-white mb-1">{m.value}</span>
                                <span className="text-gray-500 text-xs uppercase tracking-wider">{m.label}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Features */}
                 <section>
                    <h3 className="text-2xl font-bold mb-8 text-white border-l-4 border-green-500 pl-4">Unique Features</h3>
                    <div className="grid gap-6">
                         {features.map((f, i) => (
                            <div key={i} className="bg-[#111] p-6 rounded-2xl border border-white/5 flex items-start gap-4">
                                <div className="w-2 h-2 mt-2 bg-green-500 rounded-full flex-shrink-0" />
                                <div>
                                    <h4 className="text-lg font-bold text-white mb-1">{f.title}</h4>
                                    <p className="text-gray-400 text-sm">{f.desc}</p>
                                </div>
                            </div>
                         ))}
                    </div>
                 </section>

                {/* Gallery */}
                <section>
                    <h3 className="text-2xl font-bold mb-8 text-white border-l-4 border-green-500 pl-4">Design Showcase</h3>
                    <div className="space-y-8">
                        <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10 group">
                            <Image src="/projects/cactastic/cactastic.webp" alt="Homepage Design" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black to-transparent">
                                <span className="text-white font-bold">Hero & Featured Products</span>
                            </div>
                        </div>
                        <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10 group">
                            <Image src="/projects/cactastic/home-page-mini.webp" alt="Mobile Responsiveness" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                             <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black to-transparent">
                                <span className="text-white font-bold">Mobile View & Catalog</span>
                            </div>
                        </div>
                    </div>
                </section>

            </div>

            {/* Right Sidebar */}
            <div className="space-y-12">
                 <div className="bg-[#111] p-8 rounded-3xl border border-white/10 sticky top-24">
                    <h3 className="text-xl font-bold mb-6 text-white">Project Details</h3>
                    <ul className="space-y-4 text-sm text-gray-400">
                        <li className="flex justify-between border-b border-white/5 pb-3">
                            <span>Client</span>
                            <span className="text-white">Concept / Personal</span>
                        </li>
                        <li className="flex justify-between border-b border-white/5 pb-3">
                            <span>Industry</span>
                            <span className="text-white">E-Commerce / Hobby</span>
                        </li>
                        <li className="flex justify-between border-b border-white/5 pb-3">
                            <span>Focus</span>
                            <span className="text-white">UI Design, Branding</span>
                        </li>
                    </ul>

                    <div className="mt-8">
                        <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-widest">Color Palette</h4>
                        <div className="flex gap-2">
                             <div className="w-8 h-8 rounded-full bg-[#2C5F2D] border border-white/20" title="Forest Green" />
                             <div className="w-8 h-8 rounded-full bg-[#97BC62] border border-white/20" title="Light Green" />
                             <div className="w-8 h-8 rounded-full bg-[#F2EFE9] border border-white/20" title="Off White" />
                        </div>
                    </div>

                    <a href="#" className="block w-full mt-8 py-4 bg-white text-black font-bold text-center rounded-full uppercase tracking-widest hover:bg-gray-200 transition-colors">
                        View Prototype
                    </a>
                 </div>
            </div>

        </div>
      </div>
    </main>
  );
}
