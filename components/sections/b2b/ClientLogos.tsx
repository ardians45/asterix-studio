"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function ClientLogos() {
  const logos = [
    { name: "Paletindo", src: "/logopaletindo.png", url: "#" },
    { name: "SR Laundry", src: "/logosrlaundry.png", url: "#" },
    { name: "Bantu", src: "/LogoBantu.jpeg", url: "#" }
  ];

  return (
    <section className="py-12 bg-white border-y border-gray-100/80">
      <div className="container mx-auto px-4 md:px-6 max-w-5xl text-center">
        <p className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-6">
          Dipercaya oleh Bisnis B2B & Lokal Berkembang
        </p>
        <div className="flex flex-wrap items-center justify-center gap-12 md:gap-20">
          {logos.map((logo, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative h-12 w-40 md:h-16 md:w-48 filter grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300 cursor-pointer flex items-center justify-center"
            >
              <Image
                src={logo.src}
                alt={`${logo.name} Logo`}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 160px, 192px"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
