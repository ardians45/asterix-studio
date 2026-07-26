"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const text = "Hi, I'm Ardian Setiawan — UI/UX Designer & Web Developer dedicated to designing and building intuitive landing pages, dashboards, and scalable web applications.";

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
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            whileHover={{ y: -6, scale: 1.01 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="w-full md:w-1/3 relative group cursor-pointer"
        >
            <div className="relative w-full aspect-[3/4] overflow-hidden rounded-2xl md:rounded-3xl border border-gray-200 shadow-md group-hover:shadow-xl transition-all duration-500">
                <Image 
                    src="/profile.webp" 
                    alt="Ardian Setiawan" 
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity duration-500" />
            </div>
            
            {/* Decorative Label */}
             <motion.div 
                whileHover={{ scale: 1.1, rotate: 180 }}
                transition={{ duration: 0.5 }}
                className="absolute -bottom-6 -right-6 w-24 h-24 bg-[#e8702a] rounded-full flex items-center justify-center animate-[spin_12s_linear_infinite] hidden md:flex shadow-lg shadow-[#e8702a]/30"
             >
                <svg viewBox="0 0 100 100" className="w-full h-full p-2">
                    <path
                        id="curve"
                        d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                        fill="transparent"
                    />
                    <text className="text-[10px] uppercase font-bold tracking-widest text-white fill-white">
                        <textPath href="#curve">
                            Ardian Setiawan • Asterix Studio •
                        </textPath>
                    </text>
                </svg>
             </motion.div>
        </motion.div>

        {/* Text Content Column */}
        <div className="md:w-2/3 pt-8 md:pt-12">
           <motion.div 
             initial={{ opacity: 0, x: -20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.6 }}
             className="mb-8"
           >
                <h2 className="text-sm md:text-base text-[#e8702a] uppercase tracking-[0.3em] font-cinzel border-l-2 border-[#e8702a] pl-4 mb-8">
                    Who I Am
                </h2>
           </motion.div>

          <motion.p 
            className="text-xl md:text-3xl lg:text-4xl font-display font-medium leading-tight mb-8"
          >
           {text.split(" ").map((word, i) => (
               <motion.span 
                   key={i} 
                   initial={{ opacity: 0, y: 15 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ delay: i * 0.02, duration: 0.4 }}
                   className="inline-block mr-2 md:mr-3 text-gray-900"
               >
                   {word}
               </motion.span>
           ))}
           <motion.span 
               initial={{ opacity: 0 }}
               whileInView={{ opacity: 1 }}
               viewport={{ once: true }}
               transition={{ delay: 0.5, duration: 0.8 }}
               className="text-gray-500 block mt-3 text-lg md:text-2xl"
           >
               Skilled in translating user needs and business objectives into intuitive, visually consistent, and developer-ready interfaces.
           </motion.span>
          </motion.p>
          
           <motion.div 
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.6, delay: 0.3 }}
               className="grid grid-cols-2 gap-8 border-t border-gray-300 pt-8"
           >
               <motion.div whileHover={{ x: 4 }} transition={{ type: "spring", stiffness: 300 }}>
                   <h3 className="text-gray-900 text-xl font-display mb-2">Location</h3>
                   <p className="text-gray-600 font-mono text-sm">Indonesia, Remote</p>
               </motion.div>
               <motion.div whileHover={{ x: 4 }} transition={{ type: "spring", stiffness: 300 }}>
                   <h3 className="text-gray-900 text-xl font-display mb-2">Experience</h3>
                   <p className="text-gray-600 font-mono text-sm">3+ Years in Field</p>
               </motion.div>
           </motion.div>
        </div>
      </div>
    </section>
  );
}
