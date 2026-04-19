"use client";

import Image from "next/image";

export default function Achievement() {
  const achievements = [
    {
      year: "2026",
      title: "3rd Place Winner",
      subtitle: "Ramadan PRADA Competition 1447H",
      description: "Organized by Telkom University. Competed by focusing on UI/UX design via a human-centered approach for Ramadan. Developed a digital application solution tailored to user needs during the fasting month, prioritizing ease of use.",
      image: "/achievement/prada.png",
      tags: ["🏆 3rd Place", "National"],
      objectPosition: "object-left"
    },
    {
      year: "2025",
      title: "2nd Place Winner",
      subtitle: "UI/UX Design Competition (MIA)",
      description: "Outperformed 200+ teams with a research-backed financial management solution. Designed LinkAja Kas, improving transparency for group transactions.",
      image: "/achievement/mia3.webp",
      tags: ["🏆 Top 3 National", "LinkAja Case"]
    },
    {
      year: "2025",
      title: "Top Web Designer Intern — Batch 1",
      subtitle: "BANTU · Internship",
      description: "Shipped designs for 3 core products: Landing Page, Corporate Site, & Dashboard. Built scalable Design Systems to accelerate dev handoff by 20%.",
      image: "/achievement/bantu.webp",
      tags: ["⭐ Top Intern Batch 1", "Remote"]
    },
    {
      year: "2025",
      title: "Project Lead & Full-Stack Developer",
      subtitle: "PKM (Pengabdian kepada Masyarakat)",
      description: "Served as team leader and primary full-stack developer, responsible for defining the project concept, designing system architecture, developing the application end-to-end, and leading UI/UX design decisions.",
      image: "/achievement/pkm.webp",
      tags: ["💡 Research & Dev", "National"]
    },
    {
      year: "2025",
      title: "Dies Natalis HIMTIF",
      subtitle: "University Pamulang",
      description: "Participated in a UI/UX Design Competition held during the Dies Natalis of HIMTIF, contributing design ideas and user experience solutions while strengthening practical skills in interface design and usability principles.",
      image: "/achievement/diesnatalis.png",
      tags: ["🎓 Exhibition", "Campus Event"]
    }
  ];

  return (
    <section className="w-full bg-black py-32 relative overflow-hidden text-white font-serif" id="achievement">
      <div className="container mx-auto px-4 md:px-12 max-w-6xl">
        
        {/* Section Header */}
        <div className="mb-24 relative z-10 flex flex-col items-center text-center">
            <h2 className="text-5xl md:text-7xl font-bold text-white italic tracking-tight border-b border-white/20 pb-6 inline-block">
                Achievements
            </h2>
            <p className="mt-6 text-sm md:text-base text-gray-400 max-w-2xl font-sans leading-relaxed">
                A chronological overview of technical milestones, competitive design awards, and industry recognition. Documenting the ongoing journey of crafting high-end digital experiences and scaling technical foundations.
            </p>
        </div>

        {/* Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24">
            {achievements.map((item, index) => (
                <div 
                    key={index}
                    // Apply top margin to even items on desktop to create the staggered masonry look
                    className={`flex flex-col ${index % 2 !== 0 ? 'md:mt-32' : ''}`} 
                >
                    {/* Year Header */}
                    <div className="border-b border-gray-800 pb-2 mb-6">
                        <span className="text-5xl md:text-6xl font-bold italic text-white tracking-tighter">
                            {item.year}
                        </span>
                    </div>

                    {/* Image Block */}
                    <div className="relative aspect-[4/3] w-full mb-6 bg-[#050505] overflow-hidden group rounded-sm border border-white/5">
                        <Image 
                            src={item.image}
                            alt={item.title}
                            fill
                            className={`object-cover ${item.objectPosition || 'object-center'} lg:grayscale lg:group-hover:grayscale-0 transition-all duration-700 opacity-90 group-hover:opacity-100`}
                        />
                    </div>

                    {/* Content Block */}
                    <div className="font-sans">
                        <h3 className="text-xl font-display font-medium text-white mb-2">{item.title}</h3>
                        <span className="block text-sm font-mono tracking-widest uppercase text-gray-500 mb-4">{item.subtitle}</span>
                        <p className="text-sm text-gray-400 leading-relaxed mb-6">
                            {item.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                             {item.tags.map(tag => (
                                 <span key={tag} className="text-[10px] uppercase tracking-wider border border-gray-800 text-gray-400 px-3 py-1.5 rounded-full">
                                     {tag}
                                 </span>
                             ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>

      </div>
    </section>
  );
}
