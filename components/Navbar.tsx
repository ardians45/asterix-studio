"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";
import Link from "next/link";
import FlowingMenu from "./FlowingMenu";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isPortfolio = pathname?.startsWith("/portfolio");

  const navItems = [
    { link: "/services", text: "Layanan", image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop" },
    { link: "/projects", text: "Project", image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1964&auto=format&fit=crop" },
    { link: "/pricing", text: "Pricing", image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop" },
    { link: "/blog", text: "Blog", image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop" },
    { link: "/portfolio", text: "Portfolio", image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070&auto=format&fit=crop" },
    { link: "/contact", text: "Contact", image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1964&auto=format&fit=crop" },
  ];

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isPortfolio 
            ? (scrolled ? 'bg-black/90 backdrop-blur-md shadow-sm py-3 md:py-4' : 'bg-black py-4 md:py-6')
            : (scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3 md:py-4' : 'bg-transparent py-4 md:py-6')
        } px-4 md:px-12 flex items-center justify-between font-sans`}
      >
        <div className="flex-1 flex justify-start">
          <Link href="/" className="flex items-center gap-3 group">
             <img 
               src={isPortfolio ? "/logo-white.svg" : "/logo-black.svg"} 
               alt="Asterix Studio Logo" 
               width={150}
               height={35}
               className="h-[30px] md:h-[38px] w-auto object-contain transform group-hover:scale-105 transition-transform" 
             />
          </Link>
        </div>
          
        <div className="hidden lg:flex flex-none items-center justify-center gap-8 xl:gap-10">
             <Link href="/services" className={`text-[13px] font-medium tracking-wide transition-colors ${isPortfolio ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-black'}`}>Layanan</Link>
             <Link href="/projects" className={`text-[13px] font-medium tracking-wide transition-colors ${isPortfolio ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-black'}`}>Project</Link>
             <Link href="/pricing" className={`text-[13px] font-medium tracking-wide transition-colors ${isPortfolio ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-black'}`}>Pricing</Link>
             <Link href="/blog" className={`text-[13px] font-medium tracking-wide transition-colors ${isPortfolio ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-black'}`}>Blog</Link>
             <Link href="/portfolio" className={`text-[13px] font-medium tracking-wide transition-colors ${isPortfolio ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-black'}`}>Portfolio</Link>
             <Link href="/contact" className={`text-[13px] font-medium tracking-wide transition-colors ${isPortfolio ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-black'}`}>Contact</Link>
        </div>

        <div className="flex flex-1 justify-end items-center gap-3 md:gap-5">
           {/* CTA Button visible on desktop and large mobile */}
           <Link
             href="https://wa.me/6285129488941?text=Halo%20Asterix%20Studio,%20saya%20ingin%20konsultasikan%20website%20saya."
             target="_blank"
             className={`hidden sm:flex ${isPortfolio ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800'} px-5 md:px-6 py-2 md:py-2.5 rounded-full text-[12px] md:text-[13px] font-semibold transition-all items-center gap-2`}
           >
             Konsultasi Gratis
           </Link>

           <button
             onClick={() => setIsOpen(true)}
             className={`text-xl md:text-2xl ${isPortfolio ? 'text-white hover:text-emerald-400' : 'text-gray-900 hover:text-emerald-600'} transition-colors p-2 lg:hidden`}
             aria-label="Open Menu"
           >
             <FaBars />
           </button>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-[#060010] flex flex-col"
          >
             <div className="flex items-center justify-between px-6 py-6 md:px-12 relative z-50">
                <Link href="/" onClick={() => setIsOpen(false)}>
                   <img src="/logo-white.svg" alt="Asterix Logo" className="h-8 w-auto" />
                </Link>
                <button
                onClick={() => setIsOpen(false)}
                className="text-2xl text-white hover:text-emerald-400 transition-colors p-2"
                aria-label="Close Menu"
                >
                <FaTimes />
                </button>
             </div>

            <div className="flex-1 w-full h-full overflow-hidden">
                <FlowingMenu 
                    items={navItems}
                    bgColor="#060010"
                    textColor="#ffffff"
                    marqueeBgColor="#10b981"
                    marqueeTextColor="#ffffff"
                    onItemClick={() => setIsOpen(false)}
                />
            </div>
            
            <div className="p-6 md:p-8 pb-10 md:pb-12 flex justify-center border-t border-white/10 relative z-50 bg-[#060010]">
               <button
                 onClick={() => {
                   setIsOpen(false);
                   window.location.href = "https://wa.me/6285129488941?text=Halo%20Asterix%20Studio,%20saya%20ingin%20konsultasikan%20website%20saya.";
                 }}
                 className="w-full text-center bg-white text-black px-8 py-4 rounded-full text-base md:text-lg font-bold hover:bg-gray-200 transition-colors"
               >
                 Konsultasi Gratis
               </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
