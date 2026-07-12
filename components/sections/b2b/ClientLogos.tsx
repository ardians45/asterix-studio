"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function ClientLogos() {
  const logos = [
    { name: "Paletindo", src: "/logopaletindo.png", url: "#" },
    { name: "SR Laundry", src: "/logosrlaundry.png", url: "#" },
    { name: "Bantu", src: "/LogoBantu.jpeg", url: "#" },
    { name: "Dadi Jaya Kontraktor", src: "/logomendingrental.jpg", url: "#" }
  ];

  const doubleLogos = [...logos, ...logos, ...logos, ...logos];

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50/30 border-y border-gray-100/80 overflow-hidden">
      <div className="container mx-auto text-center px-4">
        <p className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-10">
          Dipercaya oleh Bisnis B2B & Lokal Berkembang
        </p>
      </div>
      
      {/* Marquee Wrapper Container */}
      <div className="relative w-full overflow-hidden flex items-center py-4">
        {/* Soft edge blur overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />

        <div className="animate-marquee-scroll flex gap-6 md:gap-10">
          {doubleLogos.map((logo, index) => (
            <div
              key={index}
              className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-36 md:h-36 bg-white rounded-full border border-gray-100/80 shadow-[0_4px_15px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)] hover:scale-105 transition-all duration-300 cursor-pointer flex items-center justify-center p-4 md:p-6 flex-shrink-0 group"
            >
              <div className="relative w-full h-full rounded-full overflow-hidden flex items-center justify-center">
                <Image
                  src={logo.src}
                  alt={`${logo.name} Logo`}
                  fill
                  className="object-contain p-0.5"
                  sizes="(max-width: 768px) 96px, 144px"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marqueeScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee-scroll {
          display: flex;
          width: max-content;
          animation: marqueeScroll 25s linear infinite;
        }
        .animate-marquee-scroll:hover {
          animation-play-state: paused;
        }
      `}} />
    </section>
  );
}
