"use client";

import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  return (
    <footer id="footer" className="bg-[#111111] text-white py-32 px-4 md:px-12 border-t border-[#e8702a]/30 relative z-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="md:w-1/2"
        >
            <h2 className="text-4xl md:text-6xl font-cinzel font-bold leading-tight mb-8 text-white">
                Ready to build something extraordinary together?
            </h2>
            <div className="flex gap-6">
                <motion.a 
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    href="mailto:ardians1945@gmail.com" 
                    className="px-8 py-4 bg-[#e8702a] text-white font-bold uppercase tracking-widest hover:bg-[#d2611f] transition-all rounded-full shadow-lg shadow-[#e8702a]/20 inline-block"
                >
                    Contact Me
                </motion.a>
            </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="md:w-1/2 flex flex-col items-start md:items-end text-right"
        >
             <div className="mb-10 text-xl text-gray-400">
                <p>South Tangerang, Banten, Indonesia</p>
                <p>ardians1945@gmail.com</p>
             </div>

             <div className="flex gap-6 text-3xl">
                 <motion.a whileHover={{ scale: 1.2, y: -4 }} transition={{ type: "spring", stiffness: 400 }} href="https://www.linkedin.com/in/ardian-setiawan45" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors" aria-label="LinkedIn Profile"><FaLinkedin /></motion.a>
                 <motion.a whileHover={{ scale: 1.2, y: -4 }} transition={{ type: "spring", stiffness: 400 }} href="https://github.com/ardians45" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" aria-label="GitHub Profile"><FaGithub /></motion.a>
                 <motion.a whileHover={{ scale: 1.2, y: -4 }} transition={{ type: "spring", stiffness: 400 }} href="https://instagram.com/ardilan_90" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500 transition-colors" aria-label="Instagram Profile"><FaInstagram /></motion.a>
                 <motion.a whileHover={{ scale: 1.2, y: -4 }} transition={{ type: "spring", stiffness: 400 }} href="mailto:ardians1945@gmail.com" className="hover:text-[#e8702a] transition-colors" aria-label="Send Email"><FaEnvelope /></motion.a>
             </div>
             
             <div className="mt-12 text-sm text-gray-400 font-mono">
                 &copy; {new Date().getFullYear()} Ardian Setiawan. All rights reserved.
             </div>
        </motion.div>
      </div>
    </footer>
  );
}
