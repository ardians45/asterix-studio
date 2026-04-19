"use client";

import React from "react";

export default function B2BFooter() {
  return (
    <footer className="bg-[#F8F9FA] pt-20 pb-12 relative overflow-hidden">
      {/* Decorative Brand Text */}
      <div className="flex flex-col items-center">
         <div className="text-[12vw] font-black text-gray-200/50 tracking-tighter uppercase leading-none select-none pointer-events-none mb-8">
           Asterix Studio
         </div>
         <div className="container mx-auto px-12 flex flex-col sm:flex-row justify-between w-full text-[10px] font-bold text-gray-400 uppercase tracking-widest border-t border-gray-100 pt-8">
           <span>&copy; {new Date().getFullYear()} Asterix Studio. All Rights Reserved.</span>
           <div className="flex gap-8 mt-4 sm:mt-0">
             <a href="#" className="hover:text-emerald-500 transition-colors">Privacy Policy</a>
             <a href="#" className="hover:text-emerald-500 transition-colors">Terms of Service</a>
           </div>
         </div>
      </div>
    </footer>
  );
}
