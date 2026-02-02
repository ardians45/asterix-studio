"use client";

import CircularGallery from './CircularGallery';
import { FaTrophy } from "react-icons/fa6"; // Assuming react-icons is installed, as seen in package.json

export default function Achievement() {
  const galleryItems = [
    { image: '/achievement/mia1.png', text: 'MIA 2025' },
    { image: '/achievement/mia2.png', text: 'MIA 2025' },
    { image: '/achievement/mia3.png', text: 'MIA 2025' },
    { image: '/achievement/bantu.png', text: 'BANTU' },
    { image: '/achievement/pkm.png', text: 'PKM' },
  ];

  return (
    <section className="w-full bg-black py-20 relative overflow-hidden" id="achievement">
      <div className="container mx-auto px-4 md:px-8">
        
        {/* Text Content */}
        {/* Section Header */}
        <div className="flex flex-col items-center mb-16 relative z-10">
            <span className="text-yellow-500 uppercase tracking-[0.3em] text-sm font-bold mb-4 animate-pulse">
                Recognition
            </span>
            <h2 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500 mb-6 text-center">
                Honor & Award
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-yellow-500 to-transparent rounded-full"></div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10 mb-20 relative z-10 w-full max-w-7xl mx-auto px-4">
            
            {/* Card 1: Competition Award */}
            <div className="group relative bg-gradient-to-br from-[#111] to-[#0a0a0a] border border-white/5 p-8 lg:p-10 rounded-3xl overflow-hidden hover:border-yellow-500/30 hover:shadow-2xl hover:shadow-yellow-900/10 transition-all duration-500">
                {/* Background Glow */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/5 rounded-full blur-[100px] group-hover:bg-yellow-500/10 transition-colors duration-700"></div>
                <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-10 transition-opacity duration-500 transform translate-x-4 -translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0">
                    <FaTrophy className="w-40 h-40 rotate-12 text-yellow-500" />
                </div>
                
                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="bg-yellow-500/10 p-2.5 rounded-xl border border-yellow-500/20 text-yellow-500">
                             <FaTrophy className="w-5 h-5" />
                        </div>
                        <span className="text-sm font-bold tracking-widest uppercase text-gray-400 group-hover:text-white transition-colors">Competition</span>
                    </div>

                    <h3 className="text-3xl lg:text-4xl font-bold text-white mb-3 leading-tight group-hover:text-yellow-400 transition-colors">
                        2nd Place Winner
                    </h3>
                    <p className="text-lg text-gray-400 mb-8 font-light italic border-l-2 border-yellow-500/30 pl-4 py-1">
                        UI/UX Design Competition (MIA 2025)
                    </p>

                    <div className="space-y-6">
                         <div className="flex flex-wrap gap-2">
                            <span className="bg-white/5 px-3 py-1.5 rounded-lg text-xs font-mono text-yellow-500/80 border border-yellow-500/10">🏆 Top 3 National</span>
                            <span className="bg-white/5 px-3 py-1.5 rounded-lg text-xs font-mono text-gray-400 border border-white/5">LinkAja Case</span>
                         </div>
                         
                         <ul className="space-y-4 text-gray-300">
                            <li className="flex items-start gap-4 group/item">
                                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-yellow-500 flex-shrink-0 group-hover/item:scale-150 transition-transform"></span>
                                <span className="leading-relaxed">Outperformed <strong>200+ teams</strong> with a research-backed financial management solution.</span>
                            </li>
                            <li className="flex items-start gap-4 group/item">
                                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-yellow-500 flex-shrink-0 group-hover/item:scale-150 transition-transform"></span>
                                <span className="leading-relaxed">Designed <strong>LinkAja Kas</strong>, improving transparency for group transactions.</span>
                            </li>
                         </ul>
                    </div>
                </div>
            </div>

            {/* Card 2: Internship */}
            <div className="group relative bg-gradient-to-br from-[#111] to-[#0a0a0a] border border-white/5 p-8 lg:p-10 rounded-3xl overflow-hidden hover:border-blue-500/30 hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-500">
                 {/* Background Glow */}
                 <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 rounded-full blur-[100px] group-hover:bg-blue-500/10 transition-colors duration-700"></div>
                 
                 <div className="relative z-10">
                     <div className="flex items-center gap-3 mb-8">
                        <div className="bg-blue-500/10 p-2.5 rounded-xl border border-blue-500/20 text-blue-400">
                            <span className="text-lg font-bold">💼</span>
                        </div>
                        <span className="text-sm font-bold tracking-widest uppercase text-gray-400 group-hover:text-white transition-colors">Experience</span>
                    </div>

                    <h3 className="text-3xl lg:text-4xl font-bold text-white mb-3 leading-tight group-hover:text-blue-400 transition-colors">
                        Top Web Designer Intern — Batch 1
                    </h3>
                    <p className="text-lg text-gray-400 mb-8 font-light italic border-l-2 border-blue-500/30 pl-4 py-1">
                        BANTU · Internship
                    </p>

                    <div className="space-y-6">
                         <div className="flex flex-wrap gap-2">
                             <span className="bg-blue-500/10 text-blue-300 px-3 py-1.5 rounded-lg text-xs font-mono border border-blue-500/20">⭐ Top Intern Batch 1</span>
                             <span className="bg-white/5 text-gray-400 px-3 py-1.5 rounded-lg text-xs font-mono border border-white/5">Remote</span>
                         </div>
                         
                         <ul className="space-y-4 text-gray-300">
                            <li className="flex items-start gap-4 group/item">
                                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0 group-hover/item:scale-150 transition-transform"></span>
                                <span className="leading-relaxed">Shipped designs for <strong>3 core products</strong>: Landing Page, Corporate Site, & Dashboard.</span>
                            </li>
                            <li className="flex items-start gap-4 group/item">
                                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0 group-hover/item:scale-150 transition-transform"></span>
                                <span className="leading-relaxed">Built scalable <strong>Design Systems</strong> to accelerate dev handoff by 20%.</span>
                            </li>
                         </ul>
                    </div>
                </div>
            </div>

        </div>

        {/* 3D Circular Gallery */}
        <div style={{ height: '600px', position: 'relative' }}>
          <CircularGallery 
             items={galleryItems}
             bend={-1}
             textColor="#ffffff"
             borderRadius={0.05}
             scrollSpeed={2}
             scrollEase={0.05}
          />
        </div>

      </div>
    </section>
  );
}
