"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FaArrowLeft, FaExternalLinkAlt } from "react-icons/fa";
import { 
  SiNextdotjs, 
  SiTypescript, 
  SiPostgresql, 
  SiTailwindcss, 
  SiDrizzle,
  SiReact,
  SiFigma,
  SiAdobephotoshop
} from "react-icons/si";
import { BsCheckCircleFill, BsLightningChargeFill, BsPeopleFill } from "react-icons/bs";
import { MdMonetizationOn, MdVerifiedUser } from "react-icons/md";

export default function BantuPlatformPage() {
  const features = [
    { title: "Direct Hiring", desc: "Employers can directly browse and hire freelancers without complex intermediaries." },
    { title: "Secure Payments", desc: "Escrow-like system ensures freelancers get paid upon job completion." },
    { title: "Multi-Role Accounts", desc: "Users can switch between being an employer and a freelancer seamlessly." },
    { title: "Real-time Chat", desc: "Integrated messaging for instant negotiation and updates." },
    { title: "Review System", desc: "Transparent rating and review system to build trust." },
    { title: "Diverse Categories", desc: "From graphic design to blue-collar jobs like construction and nursing." }
  ];

  const metrics = [
    { label: "Active Users", value: "2,000+", icon: BsPeopleFill },
    { label: "Jobs Completed", value: "850+", icon: BsCheckCircleFill },
    { label: "Transaction Vol", value: "$50k+", icon: MdMonetizationOn },
    { label: "Satisfaction", value: "4.8/5", icon: MdVerifiedUser },
  ];

  return (
    <main className="bg-black min-h-screen text-white pb-20">
      
      {/* Cinematic Hero */}
      <section className="relative w-full h-[70vh] md:h-[85vh] flex items-end pb-20 overflow-hidden">
         <Image 
            src="/projects/bantu-platform/bantu.webp" 
            alt="Bantu Platform Hero" 
            fill 
            className="object-cover object-top opacity-60"
            priority
         />
         <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
         
         <div className="absolute top-8 left-6 md:top-12 md:left-12 z-20">
            <Link href="/#projects" className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-white/20 bg-black/50 backdrop-blur-md text-white hover:bg-white hover:text-black transition-all duration-300 group">
                <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
            </Link>
         </div>

         <div className="container mx-auto px-6 md:px-12 relative z-10 w-full">
             <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-end gap-8">
                <div className="w-full">
                     <h1 className="text-[10vw] md:text-[8vw] font-display font-black leading-none uppercase tracking-tighter mb-4 mix-blend-overlay text-white opacity-90">
                         BANTU
                     </h1>
                     <p className="text-xl md:text-2xl font-mono text-gray-400 max-w-2xl">
                         Empowering Indonesia's Informal Workforce
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
                    <h3 className="text-2xl font-bold mb-6 text-white border-l-4 border-blue-500 pl-4">The Challenge</h3>
                    <p className="text-gray-300 leading-loose text-lg mb-6">
                        Indonesia has a massive informal workforce, but connecting with clients remains difficult. Traditional methods are inefficient, and trust is a major barrier. 
                        BANTU aims to bridge this gap by providing a reliable digital platform for freelancers ranging from creative professionals to manual laborers.
                    </p>
                </section>

                {/* Key Metrics / Matrix Capaian */}
                <section>
                    <h3 className="text-2xl font-bold mb-8 text-white border-l-4 border-blue-500 pl-4">Impact & Metrics</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {metrics.map((m, i) => (
                            <div key={i} className="bg-[#111] p-6 rounded-2xl border border-white/5 flex flex-col items-center text-center">
                                <m.icon className="text-blue-500 text-3xl mb-3" />
                                <span className="text-3xl font-bold text-white mb-1">{m.value}</span>
                                <span className="text-gray-500 text-xs uppercase tracking-wider">{m.label}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* User Personas */}
                <section>
                    <h3 className="text-2xl font-bold mb-8 text-white border-l-4 border-blue-500 pl-4">User Ecosystem</h3>
                    <div className="grid gap-6">
                        <div className="bg-[#111] p-8 rounded-2xl border border-white/5 hover:border-blue-500/30 transition-colors">
                            <h4 className="text-xl font-bold text-white mb-2">1. The Employer (Company/Individual)</h4>
                            <p className="text-gray-400">Needs to hire staff quickly. Pain point: Verification and trust. <br/> <span className="text-blue-400">Solution:</span> Clear profile ratings and portfolio verification.</p>
                        </div>
                        <div className="bg-[#111] p-8 rounded-2xl border border-white/5 hover:border-purple-500/30 transition-colors">
                            <h4 className="text-xl font-bold text-white mb-2">2. The Freelancer</h4>
                            <p className="text-gray-400">Needs consistent work and guaranteed pay. Pain point: Payment security. <br/> <span className="text-purple-400">Solution:</span> Secure checkout and escrow system.</p>
                        </div>
                    </div>
                </section>

                {/* Gallery */}
                <section>
                    <h3 className="text-2xl font-bold mb-8 text-white border-l-4 border-blue-500 pl-4">Visual Journey</h3>
                    <div className="space-y-8">
                        <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10 group">
                            <Image src="/projects/bantu-platform/explore-job-page-updated.webp" alt="Job Explorer Interface" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black to-transparent">
                                <span className="text-white font-bold">Job Exploration Interface</span>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                             <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-white/10 group">
                                <Image src="/projects/bantu-platform/cari-artikel.webp" alt="Search Interface" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                             </div>
                             <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-white/10 group">
                                <Image src="/projects/bantu-platform/eror-404.webp" alt="Empty State Design" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
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
                            <span className="text-white">BANTU Ind.</span>
                        </li>
                        <li className="flex justify-between border-b border-white/5 pb-3">
                            <span>Industry</span>
                            <span className="text-white">Gig Economy</span>
                        </li>
                        <li className="flex justify-between border-b border-white/5 pb-3">
                            <span>Focus</span>
                            <span className="text-white">UI/UX, prototyping</span>
                        </li>
                    </ul>

                    <div className="mt-8">
                        <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-widest">Tools Used</h4>
                        <div className="flex flex-wrap gap-2">
                            <span className="px-3 py-1 bg-white/5 rounded-full text-xs text-blue-300 border border-blue-500/20">Figma</span>
                            <span className="px-3 py-1 bg-white/5 rounded-full text-xs text-blue-300 border border-blue-500/20">Adobe XD</span>
                            <span className="px-3 py-1 bg-white/5 rounded-full text-xs text-blue-300 border border-blue-500/20">Miro</span>
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
