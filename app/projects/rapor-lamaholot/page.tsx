"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FaArrowLeft, FaExternalLinkAlt } from "react-icons/fa";
import { 
  SiPhp, 
  SiMysql, 
  SiHtml5, 
  SiCss3, 
  SiJavascript, 
  SiTailwindcss 
} from "react-icons/si";
import { BsFileEarmarkPdfFill } from "react-icons/bs";

export default function RaporLamaholotPage() {
  const techStack = [
    { name: "PHP Native", icon: SiPhp },
    { name: "MySQL", icon: SiMysql },
    { name: "Tailwind CSS", icon: SiTailwindcss },
    { name: "FPDF", icon: BsFileEarmarkPdfFill },
    { name: "HTML5", icon: SiHtml5 },
    { name: "CSS3", icon: SiCss3 },
    { name: "JavaScript", icon: SiJavascript },
  ];

  return (
    <main className="bg-black min-h-screen text-white pb-20">
      
       {/* Cinematic Hero */}
      <section className="relative w-full h-[80vh] md:h-screen flex items-end pb-20 overflow-hidden">
         {/* Background Image */}
         <Image 
             src="/projects/rapor-lamaholot/rapor1.webp" 
             alt="Rapor Lamaholot Background" 
             fill 
             className="object-cover object-top opacity-50"
             priority
         />
         
         {/* Overlay */}
         <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
         
         {/* Back Button (Floating) */}
         <div className="absolute top-8 left-6 md:top-12 md:left-12 z-20">
            <Link href="/#projects" className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-white/20 bg-black/50 backdrop-blur-md text-white hover:bg-white hover:text-black transition-all duration-300 group">
                <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
            </Link>
         </div>

         {/* Hero Content */}
         <div className="container mx-auto px-6 md:px-12 relative z-10 w-full">
             <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-end gap-8">
                <div className="w-full">
                     <h1 className="text-[10vw] md:text-[8vw] font-display font-black leading-none uppercase tracking-tighter mb-4 mix-blend-overlay text-white opacity-90">
                         RAPOR
                         <br />
                         LAMAHOLOT
                     </h1>
                </div>
                
                <div className="flex flex-col gap-6 md:min-w-[300px] text-right md:text-left">
                     <div>
                        <span className="font-mono text-xs uppercase tracking-widest text-gray-500 block mb-1">Category</span>
                        <span className="text-xl font-bold">School System</span>
                     </div>
                     <div>
                        <span className="font-mono text-xs uppercase tracking-widest text-gray-500 block mb-1">Year</span>
                        <span className="text-xl font-bold">2025</span>
                     </div>
                     <a 
                        href="http://raporlamaholot.kesug.com/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm uppercase tracking-widest hover:text-blue-400 transition-colors mt-4 md:mt-0 justify-end md:justify-start"
                    >
                        Visit Live Site <FaExternalLinkAlt className="text-xs" />
                    </a>
                </div>
             </div>
         </div>
      </section>

      <div className="container mx-auto px-6 md:px-12 max-w-7xl pt-20">

        {/* Content Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            
            {/* Left: Description */}
            <div className="md:col-span-2 space-y-12">
                <div>
                    <h3 className="text-2xl font-bold mb-6 text-white border-l-4 border-yellow-500 pl-4">Overview</h3>
                    <p className="text-gray-300 leading-loose text-lg">
                        This system tackles the inefficiency of manual report card processing. By digitizing the entire workflow—from teacher grade input to final report generation—it ensures accuracy, security, and ease of access for all stakeholders involved in the school's academic reporting process.
                    </p>
                </div>
                
                <div>
                    <h3 className="text-2xl font-bold mb-6 text-white border-l-4 border-yellow-500 pl-4">Key Features</h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                            "Multi-layer Authentication (Admin, Teacher, Student)",
                            "CRUD User Management (Teachers/Students)",
                            "Subject-based Grade Input",
                            "Auto-generated PDF Reports (FPDF)",
                            "Student Access Portal"
                        ].map((feature, i) => (
                            <li key={i} className="flex items-center gap-3 text-gray-300">
                                <span className="w-2 h-2 bg-yellow-500 rounded-full" />
                                {feature}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Metrics & Achievements */}
                <div>
                    <h3 className="text-2xl font-bold mb-6 text-white border-l-4 border-yellow-500 pl-4">Metrics & Achievements</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="bg-[#111] p-6 rounded-2xl border border-white/5">
                            <span className="block text-3xl font-bold text-yellow-500 mb-2">100%</span>
                            <span className="text-gray-400 text-sm">Digitization of manual records</span>
                        </div>
                        <div className="bg-[#111] p-6 rounded-2xl border border-white/5">
                            <span className="block text-3xl font-bold text-yellow-500 mb-2">PDF</span>
                            <span className="text-gray-400 text-sm">Instant report generation</span>
                        </div>
                    </div>
                </div>

                {/* Challenges & Solutions */}
                <div>
                    <h3 className="text-2xl font-bold mb-6 text-white border-l-4 border-yellow-500 pl-4">Challenges & Solutions</h3>
                    <ul className="space-y-6">
                        <li>
                            <h4 className="text-lg font-bold text-white mb-2">Challenge: Precise Layout for Printing</h4>
                            <p className="text-gray-400">
                                Generating standard report cards that match physical formats using HTML was inconsistent across browsers.
                            </p>
                            <p className="text-gray-300 mt-2 italic border-l-2 border-white/20 pl-3">
                                Solution: Implemented FPDF library to programmatically draw the report card pixel-perfectly, ensuring the PDF output is identical to official requirements.
                            </p>
                        </li>
                         <li>
                            <h4 className="text-lg font-bold text-white mb-2">Challenge: Secure Role Management</h4>
                            <p className="text-gray-400">
                                Ensuring students cannot access other students' grades or modify teacher data.
                            </p>
                            <p className="text-gray-300 mt-2 italic border-l-2 border-white/20 pl-3">
                                Solution: Implemented session-based authentication with strict role checks on every controller action, redirecting unauthorized access attempts immediately.
                            </p>
                        </li>
                    </ul>
                </div>

                {/* Additional Screenshots Placeholders */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8">
                     <div className="aspect-video relative bg-[#111] rounded-2xl border border-white/10 overflow-hidden group">
                        <Image 
                            src="/projects/rapor-lamaholot/rapor2.webp" 
                            alt="Feature Screenshot" 
                            fill 
                            className="object-cover object-top transition-transform duration-500 group-hover:scale-105" 
                        />
                     </div>
                     <div className="aspect-video relative bg-[#111] rounded-2xl border border-white/10 overflow-hidden group">
                        <Image 
                            src="/projects/rapor-lamaholot/rapor3.webp" 
                            alt="Report PDF Screenshot" 
                            fill 
                            className="object-cover object-top transition-transform duration-500 group-hover:scale-105" 
                        />
                     </div>
                </div>
            </div>

            {/* Right: Tech Stack & Info */}
            <div className="space-y-12">
                <div className="bg-[#111] p-8 rounded-3xl border border-white/10">
                    <h3 className="text-xl font-bold mb-8 text-white">Tech Stack</h3>
                    <div className="flex flex-wrap gap-3">
                        {techStack.map((tech, i) => (
                            <div key={i} className="flex items-center gap-2 bg-black/50 border border-white/10 px-3 py-2 rounded-lg text-sm text-gray-300 hover:text-white hover:border-white/30 transition-colors">
                                <tech.icon className="w-4 h-4" />
                                {tech.name}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-[#111] p-8 rounded-3xl border border-white/10">
                    <h3 className="text-xl font-bold mb-6 text-white">Project Info</h3>
                    <ul className="space-y-4 text-sm text-gray-400">
                        <li className="flex justify-between border-b border-white/5 pb-3">
                            <span>Year</span>
                            <span className="text-white">2025</span>
                        </li>
                        <li className="flex justify-between border-b border-white/5 pb-3">
                            <span>Role</span>
                            <span className="text-white">Fullstack Developer</span>
                        </li>
                         <li className="flex justify-between border-b border-white/5 pb-3">
                            <span>Status</span>
                            <span className="text-green-400 flex items-center gap-2">
                                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                                Live
                            </span>
                        </li>
                    </ul>
                </div>
            </div>

        </div>
      </div>
    </main>
  );
}
