"use client";

import Image from "next/image";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import { MdSpeed, MdLocalShipping, MdPayment, MdLocationOn } from "react-icons/md";
import { BsBasket2Fill } from "react-icons/bs";

export default function GoGoGroceriesPage() {
  
  const features = [
    { 
        title: "Daily Essentials Breakdown", 
        desc: "Categorized instant shopping for Fruits, Veggies, Snacks, and Household items. Focused on daily needs, not general e-commerce.",
        icon: BsBasket2Fill
    },
    { 
        title: "Secure Digital Checkout", 
        desc: "Streamlined flow for card details, CVV, and expiry. Designed for speed without compromising security.",
        icon: MdPayment
    },
    { 
        title: "Instant Delivery", 
        desc: "On-demand fleet with real-time status: Processing -> Courier to Store -> Courier to User.",
        icon: MdLocalShipping
    },
    { 
        title: "Live Tracking", 
        desc: "Real-time map view and progress tracking to reduce user anxiety and provide total control.",
        icon: MdLocationOn
    }
  ];

  return (
    <main className="bg-black min-h-screen text-white pb-20">
      
      {/* Cinematic Hero */}
      <section className="relative w-full h-[70vh] md:h-[85vh] flex items-end pb-20 overflow-hidden">
         <Image 
            src="/projects/gogo-groceries/thumbnail.webp" 
            alt="GoGo Groceries Hero" 
            fill 
            className="object-cover object-center opacity-80"
            priority
         />
         <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
         
         <div className="absolute top-8 left-6 md:top-12 md:left-12 z-20">
            <Link href="/#projects" className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-white/20 bg-black/50 backdrop-blur-md text-white hover:bg-white hover:text-black transition-all duration-300 group">
                <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
            </Link>
         </div>

         <div className="container mx-auto px-6 md:px-12 relative z-10 w-full">
             <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-end gap-8">
                <div className="w-full">
                     <h1 className="text-[10vw] md:text-[8vw] font-display font-black leading-none uppercase tracking-tighter mb-4 mix-blend-overlay text-white opacity-90">
                         GoGo
                     </h1>
                     <p className="text-xl md:text-2xl font-mono text-gray-400 max-w-2xl">
                         Instant Quick-Commerce Platform
                     </p>
                </div>
                
                <div className="flex flex-col gap-6 md:min-w-[300px] text-right md:text-left">
                     <div>
                        <span className="font-mono text-xs uppercase tracking-widest text-gray-500 block mb-1">Role</span>
                        <span className="text-xl font-bold">UI/UX Designer</span>
                     </div>
                     <div>
                        <span className="font-mono text-xs uppercase tracking-widest text-gray-500 block mb-1">Year</span>
                        <span className="text-xl font-bold">2024</span>
                     </div>
                </div>
             </div>
         </div>
      </section>

      <div className="container mx-auto px-6 md:px-12 max-w-7xl pt-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            
            {/* Left Content */}
            <div className="md:col-span-2 space-y-16">
                
                {/* Overview */}
                <section>
                    <h3 className="text-2xl font-bold mb-6 text-white border-l-4 border-orange-500 pl-4">The Need for Speed</h3>
                    <p className="text-gray-300 leading-loose text-lg mb-6">
                        GoGo Groceries is designed for the modern lifestyle where time is luxury. 
                        It integrates selection, payment, and instant delivery into a seamless flow.
                        The core philosophy is "Quick-Commerce" - fulfilling daily household needs instantly without the friction of traditional shopping or slow shipping.
                    </p>
                </section>

                {/* Features Grid */}
                <section>
                    <h3 className="text-2xl font-bold mb-8 text-white border-l-4 border-orange-500 pl-4">Core Experience</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {features.map((f, i) => (
                            <div key={i} className="bg-[#111] p-6 rounded-2xl border border-white/5 hover:border-orange-500/30 transition-colors group">
                                <f.icon className="text-orange-500 text-3xl mb-4 group-hover:scale-110 transition-transform" />
                                <h4 className="text-xl font-bold text-white mb-2">{f.title}</h4>
                                <p className="text-sm text-gray-400 leading-relaxed">{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Gallery */}
                <section>
                    <h3 className="text-2xl font-bold mb-8 text-white border-l-4 border-orange-500 pl-4">Interface Preview</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                         <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-white/10 group">
                            <Image src="/projects/gogo-groceries/thumbnail.webp" alt="App Interfaces 1" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                        </div>
                         <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-white/10 group">
                            <Image src="/projects/gogo-groceries/ui-showcase.webp" alt="App Interfaces 2" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                        </div>
                    </div>
                </section>

            </div>

            {/* Right Sidebar */}
            <div className="space-y-12">
                 <div className="bg-[#111] p-8 rounded-3xl border border-white/10 sticky top-24">
                    <h3 className="text-xl font-bold mb-6 text-white">Project Details</h3>
                    <ul className="space-y-4 text-sm text-gray-400">
                        <li className="flex justify-between border-b border-white/5 pb-3">
                            <span>Client</span>
                            <span className="text-white">Q-Commerce Startup</span>
                        </li>
                        <li className="flex justify-between border-b border-white/5 pb-3">
                            <span>Category</span>
                            <span className="text-white">On-Demand Delivery</span>
                        </li>
                    </ul>

                    <div className="mt-8">
                        <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-widest">Speed Metrics</h4>
                        <div className="space-y-3">
                             <div className="flex justify-between text-xs text-gray-400">
                                <span>Order Processing</span>
                                <span className="text-orange-400">&lt; 2 mins</span>
                             </div>
                             <div className="w-full bg-gray-800 h-1 rounded-full overflow-hidden">
                                 <div className="bg-orange-500 h-full w-[90%]" />
                             </div>
                             
                             <div className="flex justify-between text-xs text-gray-400 mt-2">
                                <span>UX Interaction Time</span>
                                <span className="text-orange-400">Fast</span>
                             </div>
                             <div className="w-full bg-gray-800 h-1 rounded-full overflow-hidden">
                                 <div className="bg-orange-500 h-full w-[95%]" />
                             </div>
                        </div>
                    </div>
                    
                    <a href="#" className="block w-full mt-8 py-4 bg-white text-black font-bold text-center rounded-full uppercase tracking-widest hover:bg-gray-200 transition-colors">
                        View Prototype
                    </a>
                 </div>
            </div>

        </div>
      </div>
    </main>
  );
}
