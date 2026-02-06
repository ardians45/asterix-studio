"use client";

import Image from "next/image";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import { MdGroup, MdOutlinePsychology, MdPayment } from "react-icons/md";
import { BsShieldFillCheck } from "react-icons/bs";

export default function LinkAjaKasPage() {
  
  const features = [
    { 
        title: "Multi-Akses Role System", 
        desc: "Granular access control: Owner (Full Control), Admin (Manage), Contributor (Request Only), and Viewer (Passive).",
        icon: MdGroup
    },
    { 
        title: "AI Financial Assistant", 
        desc: "Smart chatbot for instant insights: 'Who hasn't paid?', 'Total expenses this month?', plus automated recommendations.",
        icon: MdOutlinePsychology
    },
    { 
        title: "Integrated Payments", 
        desc: "Directly use Kas balance for LinkAja services (Electricity, Data, Merchants) without withdrawing.",
        icon: MdPayment
    },
    { 
        title: "Auto-Transparency", 
        desc: "Real-time transaction logs, multi-level approval system, and automated audit trails for total trust.",
        icon: BsShieldFillCheck
    }
  ];

  return (
    <main className="bg-black min-h-screen text-white pb-20">
      
      {/* Cinematic Hero - Standard Layout */}
      <section className="relative w-full h-[70vh] md:h-[85vh] flex items-end pb-20 overflow-hidden">
         <Image 
            src="/projects/link-aja-kas/thumbnail.webp" 
            alt="LinkAja Kas Hero" 
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
                         LinkAja
                     </h1>
                     <p className="text-xl md:text-2xl font-mono text-gray-400 max-w-2xl">
                         Collective Finance Management
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
                    <h3 className="text-2xl font-bold mb-6 text-white border-l-4 border-[#E11931] pl-4">The Problem: Manual Management</h3>
                    <p className="text-gray-300 leading-loose text-lg mb-6">
                        Indonesians love "Gotong Royong", but managing collective funds (Arisan, Kas RT, Joint Accounts) is often manual, prone to errors, and lacks transparency. 
                        WhatsApp groups and personal bank accounts mix personal and shared money, leading to confusion.
                    </p>
                </section>

                {/* Features Grid */}
                <section>
                    <h3 className="text-2xl font-bold mb-8 text-white border-l-4 border-[#E11931] pl-4">Smart Features</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {features.map((f, i) => (
                            <div key={i} className="bg-[#111] p-6 rounded-2xl border border-white/5 hover:border-[#E11931]/50 transition-colors group">
                                <f.icon className="text-[#E11931] text-3xl mb-4 group-hover:scale-110 transition-transform" />
                                <h4 className="text-xl font-bold text-white mb-2">{f.title}</h4>
                                <p className="text-sm text-gray-400 leading-relaxed">{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Gallery */}
                <section>
                    <h3 className="text-2xl font-bold mb-8 text-white border-l-4 border-[#E11931] pl-4">Design Process & Wireframes</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                         <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-white/10 group">
                            <Image src="/projects/link-aja-kas/dashboard-wireframe.webp" alt="Wireframe Process" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                            <div className="absolute bottom-6 left-6">
                                <span className="bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-white text-xs font-bold border border-white/10">Wireframe</span>
                            </div>
                        </div>
                         <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-white/10 group">
                            <Image src="/projects/link-aja-kas/dashboard-hifi.webp" alt="High Fidelity Design" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                             <div className="absolute bottom-6 left-6">
                                <span className="bg-[#E11931]/80 backdrop-blur-md px-3 py-1 rounded-full text-white text-xs font-bold border border-white/10">Hi-Fi</span>
                            </div>
                        </div>
                    </div>
                </section>

            </div>

            {/* Right Sidebar */}
            <div className="space-y-12">
                 <div className="bg-[#111] p-8 rounded-3xl border border-white/10 sticky top-24">
                    <h3 className="text-xl font-bold mb-6 text-white">Project Impact</h3>
                    <ul className="space-y-4 text-sm text-gray-400">
                        <li className="flex justify-between border-b border-white/5 pb-3">
                            <span>Client</span>
                            <span className="text-white">Fintech National</span>
                        </li>
                        <li className="flex justify-between border-b border-white/5 pb-3">
                            <span>Category</span>
                            <span className="text-white">Community Wallet</span>
                        </li>
                    </ul>

                    <div className="mt-8">
                        <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-widest">Key Impact</h4>
                         <div className="space-y-3">
                             <div>
                                 <h5 className="text-[#E11931] text-xs font-bold uppercase mb-1">For Users</h5>
                                 <p className="text-gray-400 text-xs leading-relaxed">Transparency, trust, and ease of management without switching apps.</p>
                             </div>
                             <div>
                                 <h5 className="text-[#E11931] text-xs font-bold uppercase mb-1">For Business</h5>
                                 <p className="text-gray-400 text-xs leading-relaxed">Increases engagement & transaction volume (float fund).</p>
                             </div>
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
