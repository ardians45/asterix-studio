"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const text = "Hola i,m Ardian Setiawan UI/UX Designer and Web Developer with experience designing and developing landing pages, dashboards, and corporate websites.";

export default function About() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start 0.8", "start 0.2"],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [50, 0]);

  return (
    <section id="about" className="py-20 md:py-32 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row gap-16 md:gap-24 items-center md:items-start" ref={container}>
        
        {/* Profile Image Column */}
        <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8 }}
            className="w-full md:w-1/3 relative group"
        >
            <div className="relative w-full aspect-[3/4] overflow-hidden rounded-2xl md:rounded-3xl">
                <Image 
                    src="/profile.webp" 
                    alt="Ardian Setiawan" 
                    fill
                    className="object-cover transition-all duration-700 filter grayscale group-hover:grayscale-0 group-hover:scale-105"
                />
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
            </div>
            
            {/* Decorative Label */}
             <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-white rounded-full flex items-center justify-center animate-[spin_10s_linear_infinite] hidden md:flex">
                <svg viewBox="0 0 100 100" className="w-full h-full p-2">
                    <path
                        id="curve"
                        d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                        fill="transparent"
                    />
                    <text className="text-[10px] uppercase font-bold tracking-widest text-black">
                        <textPath href="#curve">
                            Creative Developer • Creative Developer •
                        </textPath>
                    </text>
                </svg>
             </div>
        </motion.div>

        {/* Text Content Column */}
        <div className="md:w-2/3 pt-8 md:pt-12">
           <div className="mb-8">
                <h2 className="text-sm md:text-base text-gray-400 uppercase tracking-[0.3em] font-mono border-l-2 border-white pl-4 mb-8">
                    Who I Am
                </h2>
           </div>

          <motion.p 
            style={{ opacity }}
            className="text-xl md:text-3xl lg:text-4xl font-display font-medium leading-tight mb-8"
          >
           {text.split(" ").map((word, i) => (
               <span key={i} className="inline-block mr-2 md:mr-3 text-white/90">
                   {word}
               </span>
           ))}
           <span className="text-gray-500">Skilled in translating user needs and business objectives into intuitive, visually consistent, and developer-ready interfaces.</span>
          </motion.p>
          
           <div className="grid grid-cols-2 gap-8 border-t border-white/10 pt-8">
               <div>
                   <h3 className="text-white text-xl font-display mb-2">Location</h3>
                   <p className="text-gray-400 font-mono text-sm">Indonesia, Remote</p>
               </div>
               <div>
                   <h3 className="text-white text-xl font-display mb-2">Experience</h3>
                   <p className="text-gray-400 font-mono text-sm">3+ Years in Field</p>
               </div>
           </div>
        </div>
      </div>
    </section>
  );
}
