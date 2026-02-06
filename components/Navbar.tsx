"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";
import Link from "next/link";
import FlowingMenu from "./FlowingMenu";

const navItems = [
  { link: '#about', text: 'About', image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop' },
  { link: '#skills', text: 'Skills', image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop' },
  { link: '#projects', text: 'Projects', image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1964&auto=format&fit=crop' },
  { link: '#contact', text: 'Contact', image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070&auto=format&fit=crop' }
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-6 md:px-12 mix-blend-difference text-white">
        <Link href="/" className="text-xl font-bold font-display tracking-widest uppercase">
          AS
        </Link>
        <button
          onClick={() => setIsOpen(true)}
          className="text-2xl hover:text-gray-300 transition-colors"
          aria-label="Open Menu"
        >
          <FaBars />
        </button>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-[#060010] flex flex-col"
          >
             <div className="flex items-center justify-end px-6 py-6 md:px-12">
                <button
                onClick={() => setIsOpen(false)}
                className="text-2xl text-white hover:text-gray-300 transition-colors z-50"
                aria-label="Close Menu"
                >
                <FaTimes />
                </button>
             </div>

            <div className="flex-1 w-full h-full">
                <FlowingMenu 
                    items={navItems}
                    bgColor="#000000"
                    textColor="#ffffff"
                    marqueeBgColor="#ffffff"
                    marqueeTextColor="#000000"
                    onItemClick={() => setIsOpen(false)}
                />
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
