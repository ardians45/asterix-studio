"use client";

import { FaWhatsapp } from "react-icons/fa";

export default function FloatingWhatsApp() {
  const whatsappUrl = "https://wa.me/6285129488941?text=Halo%20Asterix%20Studio,%20saya%20tertarik%20untuk%20konsultasi%20pembuatan%20website.";

  return (
    <>
      <div
        className="fixed bottom-6 right-6 z-50 flex items-center gap-3 group"
        style={{ animation: "fadeInScale 0.5s ease-out 1s both" }}
      >
        {/* Tooltip / Label */}
        <span className="hidden md:inline-block px-3 py-1.5 bg-slate-900 text-white text-xs font-semibold rounded-xl shadow-lg border border-slate-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
          Konsultasi WhatsApp
        </span>

        {/* Floating Button */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat WhatsApp Asterix Studio"
          onClick={() => {
            if (typeof window !== "undefined" && (window as any).fbq) {
              (window as any).fbq("track", "ClickWhatsApp", { location: "Floating Button" });
              (window as any).fbq("track", "Lead", { channel: "WhatsApp" });
            }
          }}
          className="relative flex items-center justify-center w-14 h-14 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full shadow-2xl shadow-emerald-500/40 transition-all duration-300 hover:scale-110 active:scale-95 group"
        >
          {/* Pulsing ring background */}
          <span className="absolute inset-0 rounded-full bg-emerald-400 opacity-75 animate-ping group-hover:animate-none"></span>
          
          <FaWhatsapp className="w-8 h-8 relative z-10" />
        </a>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeInScale {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
      `}} />
    </>
  );
}
