"use client";

import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  return (
    <footer id="contact" className="bg-zinc-950 py-32 px-4 md:px-12 border-t border-white/5 relative z-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
        <div className="md:w-1/2">
            <h2 className="text-5xl md:text-8xl font-display font-bold leading-tight mb-8">
                Let's build immersive web experiences.
            </h2>
            <div className="flex gap-6">
                <a href="mailto:ardians1945@gmail.com" className="px-8 py-4 bg-white text-black font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors rounded-sm">
                    Contact Me
                </a>
            </div>
        </div>

        <div className="md:w-1/2 flex flex-col items-start md:items-end text-right">
             <div className="mb-10 text-xl text-gray-400">
                <p>Tangerang Selatan, Banten</p>
                <p>ardians1945@gmail.com</p>
             </div>

             <div className="flex gap-6 text-3xl">
                 <a href="https://www.linkedin.com/in/ardian-setiawan45" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors" aria-label="LinkedIn Profile"><FaLinkedin /></a>
                 <a href="https://github.com/ardians45" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" aria-label="GitHub Profile"><FaGithub /></a>
                 <a href="https://instagram.com/ardilan_90" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500 transition-colors" aria-label="Instagram Profile"><FaInstagram /></a>
                 <a href="mailto:ardians1945@gmail.com" className="hover:text-yellow-500 transition-colors" aria-label="Send Email"><FaEnvelope /></a>
             </div>
             
             <div className="mt-12 text-sm text-gray-400 font-mono">
                 &copy; {new Date().getFullYear()} Ardian Setiawan. All rights reserved.
             </div>
        </div>
      </div>
    </footer>
  );
}
