"use client";

import React from "react";
import Link from "next/link";
import { FaWhatsapp, FaEnvelope, FaMapMarkerAlt, FaClock, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function B2BFooter() {
  return (
    <footer className="bg-[#F8F9FA] pt-20 pb-12 relative overflow-hidden border-t border-gray-200/50">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 mb-16">
          {/* Column 1: Info & Brand */}
          <div className="space-y-4 text-left">
            <h3 className="text-lg font-black text-gray-900 tracking-tight">ASTERIX STUDIO</h3>
            <p className="text-xs text-gray-500 leading-relaxed font-medium">
              Mitra pengembangan website perusahaan & landing page berkinerja tinggi yang berorientasi pada ROI dan konversi leads nyata.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="https://wa.me/6285129488941" target="_blank" className="text-gray-400 hover:text-emerald-600 transition-colors text-lg" aria-label="WhatsApp">
                <FaWhatsapp />
              </a>
              <a href="mailto:asterixstudio7@gmail.com" className="text-gray-400 hover:text-emerald-600 transition-colors text-lg" aria-label="Email">
                <FaEnvelope />
              </a>
              <a href="#" className="text-gray-400 hover:text-emerald-600 transition-colors text-lg" aria-label="Instagram">
                <FaInstagram />
              </a>
              <a href="#" className="text-gray-400 hover:text-emerald-600 transition-colors text-lg" aria-label="LinkedIn">
                <FaLinkedin />
              </a>
            </div>
          </div>

          {/* Column 2: Sitemap */}
          <div className="space-y-4 text-left">
            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider">Sitemap</h4>
            <ul className="space-y-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
              <li><Link href="/" className="hover:text-emerald-600 transition-colors">Home</Link></li>
              <li><Link href="/services" className="hover:text-emerald-600 transition-colors">Layanan</Link></li>
              <li><Link href="/projects" className="hover:text-emerald-600 transition-colors">Project</Link></li>
              <li><Link href="/pricing" className="hover:text-emerald-600 transition-colors">Pricing</Link></li>
              <li><Link href="/portfolio" className="hover:text-emerald-600 transition-colors">Portfolio</Link></li>
            </ul>
          </div>

          {/* Column 3: Jam Operasional */}
          <div className="space-y-4 text-left">
            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider">Jam Operasional</h4>
            <div className="space-y-3 text-xs font-medium text-gray-500">
              <div className="flex items-center gap-2">
                <FaClock className="text-emerald-600" />
                <span>Senin - Sabtu: 09:00 - 18:00 WIB</span>
              </div>
              <p className="text-[11px] text-gray-400 italic">
                *Konsultasi online via WhatsApp tersedia di luar jam operasional.
              </p>
            </div>
          </div>

          {/* Column 4: Kontak & Alamat */}
          <div className="space-y-4 text-left">
            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider">Kontak & Lokasi</h4>
            <div className="space-y-3 text-xs font-medium text-gray-500">
              <div className="flex items-start gap-2">
                <FaMapMarkerAlt className="text-emerald-600 mt-0.5 flex-shrink-0" />
                <span>Tangerang Selatan, Banten, Indonesia</span>
              </div>
              <div className="flex items-center gap-2">
                <FaEnvelope className="text-emerald-600 flex-shrink-0" />
                <span>asterixstudio7@gmail.com</span>
              </div>
              <div className="flex items-center gap-2">
                <FaWhatsapp className="text-emerald-600 flex-shrink-0" />
                <span>+62 851-2948-8941</span>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Brand Text */}
        <div className="flex flex-col items-center border-t border-gray-200/60 pt-10">
          <div className="text-[8vw] font-black text-gray-200/50 tracking-tighter uppercase leading-none select-none pointer-events-none mb-8">
            Asterix Studio
          </div>
          <div className="flex flex-col sm:flex-row justify-between w-full text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            <span>&copy; {new Date().getFullYear()} Asterix Studio. All Rights Reserved.</span>
            <div className="flex gap-8 mt-4 sm:mt-0">
              <a href="#" className="hover:text-emerald-500 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-emerald-500 transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
