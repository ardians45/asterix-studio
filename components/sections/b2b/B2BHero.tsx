import Image from "next/image";
import HeroContent from "./HeroContent";

export default function B2BHero() {
  return (
    <section className="bg-[#F8F9FA] pt-20 md:pt-24 pb-12 px-4 md:px-6">
      {/* Outer rounded container mimicking the soft image frame */}
      <div className="relative rounded-[24px] md:rounded-[40px] overflow-hidden w-full max-w-7xl mx-auto border border-gray-200/50 shadow-sm min-h-[600px] md:min-h-[800px]">
        
        {/* Soft landscape background image - Optimized with Next.js Image */}
        <div className="absolute inset-0 opacity-90 blur-[2px] transform scale-105 pointer-events-none">
          <Image
            src="https://images.unsplash.com/photo-1497215842964-222b430dc094?auto=format&fit=crop&q=80"
            alt="Asterix Studio Office background"
            fill
            priority
            fetchPriority="high"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1280px"
            className="object-cover object-center"
          />
        </div>
        {/* Soft white gradient overlay to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/70 to-white/10" />
        
        {/* Client-side motion content */}
        <HeroContent />
        
      </div>
    </section>
  );
}
