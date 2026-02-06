"use client";

import Image from "next/image";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import { MdEco, MdSpeed, MdAccessibility, MdDevices } from "react-icons/md";
import { BsLightningChargeFill } from "react-icons/bs";

export default function GreenifyPage() {
  
  // Design-Focused Metrics (Requested vs Business Metrics)
  const designMetrics = [
    { label: "Accessibility Score", value: "98/100", icon: MdAccessibility, desc: "Lighthouse Audit" },
    { label: "Click Depth", value: "< 3", icon: MdSpeed, desc: "To reach any service" },
    { label: "Design System", value: "Atomic", icon: MdDevices, desc: "100% Component Reuse" },
    { label: "Visual Clarity", value: "4.9/5", icon: BsLightningChargeFill, desc: "User Testing Score" },
  ];

  const connections = [
    { title: "Individuals", desc: "Connects with eco-solutions & services." },
    { title: "Schools", desc: "Access to green programs & curriculum." },
    { title: "Businesses", desc: "Hire clean energy consultants." },
    { title: "Communities", desc: "Collab on local sustainability projects." }
  ];

  return (
    <main className="bg-black min-h-screen text-white pb-20">
      
      {/* Cinematic Hero */}
      <section className="relative w-full h-[70vh] md:h-[85vh] flex items-end pb-20 overflow-hidden">
         <Image 
            src="/projects/greenify/macbook-monitor.webp" 
            alt="Greenify Hero" 
            fill 
            className="object-cover object-center opacity-80"
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
                         Greenify
                     </h1>
                     <p className="text-xl md:text-2xl font-mono text-gray-400 max-w-2xl">
                         Sustainability Transition Platform
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
                    <h3 className="text-2xl font-bold mb-6 text-white border-l-4 border-green-400 pl-4">The Mission</h3>
                    <p className="text-gray-300 leading-loose text-lg mb-6">
                        Greenify aims to be the digital bridge accelerating the transition to a sustainable lifestyle. 
                        It connects four key pillars of society—Individuals, Schools, Businesses, and Communities—facilitating easier access to green services, education, and collaborative projects.
                    </p>
                    {/* Connection Grid */}
                    <div className="grid grid-cols-2 gap-4 mt-8">
                        {connections.map((c, i) => (
                            <div key={i} className="bg-[#111] p-4 rounded-xl border border-white/5">
                                <h4 className="text-lg font-bold text-white mb-1">{c.title}</h4>
                                <p className="text-sm text-gray-400">{c.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Design Efficiency Metrics */}
                <section>
                    <h3 className="text-2xl font-bold mb-8 text-white border-l-4 border-green-400 pl-4">Design Efficiency Matrix</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {designMetrics.map((m, i) => (
                            <div key={i} className="bg-[#111] p-6 rounded-2xl border border-white/5 flex flex-col items-center text-center group hover:border-green-500/30 transition-colors">
                                <m.icon className="text-green-400 text-3xl mb-3 group-hover:scale-110 transition-transform" />
                                <span className="text-3xl font-bold text-white mb-1">{m.value}</span>
                                <span className="text-gray-300 font-bold text-xs uppercase tracking-wider mb-1">{m.label}</span>
                                <span className="text-gray-600 text-[10px]">{m.desc}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Gallery */}
                <section>
                    <h3 className="text-2xl font-bold mb-8 text-white border-l-4 border-green-400 pl-4">Interface Preview</h3>
                    <div className="space-y-8">
                        <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10 group">
                            <Image src="/projects/greenify/thumbnail.webp" alt="Dashboard Design" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                        </div>
                         <div className="relative aspect-[3/4] md:aspect-video rounded-xl overflow-hidden border border-white/10 group">
                            <Image src="/projects/greenify/full-preview.webp" alt="Full Page Preview" fill className="object-cover object-top group-hover:scale-105 transition-transform duration-700 hover:object-bottom duration-[3s] ease-in-out" />
                            <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-0 transition-opacity pointer-events-none">
                                <span className="text-white">Scrolls on Hover</span>
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
                            <span className="text-white">Eco-Initiative</span>
                        </li>
                        <li className="flex justify-between border-b border-white/5 pb-3">
                            <span>Category</span>
                            <span className="text-white">Sustainability / Soc-Tech</span>
                        </li>
                    </ul>

                    <div className="mt-8">
                        <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-widest">Brand Colors</h4>
                        <div className="grid grid-cols-4 gap-2">
                             <div className="h-8 rounded bg-[#1A4D2E]" />
                             <div className="h-8 rounded bg-[#4F6F52]" />
                             <div className="h-8 rounded bg-[#E8DFCA]" />
                             <div className="h-8 rounded bg-[#F5EFE6]" />
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
