import LithosHero from "@/components/LithosHero";
import Skills from "@/components/Skills";
import Certificates from "@/components/Certificates";
import Projects from "@/components/Projects";
import SeoProofsSection from "@/components/sections/b2b/SeoProofsSection";
import Achievement from "@/components/Achievement";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-black text-white selection:bg-[#e8702a] selection:text-white">
      <LithosHero />
      <div className="relative z-10 bg-[#F5F4F0] text-gray-900">
        <Skills />
        <Certificates />
        <Projects />
        <SeoProofsSection theme="portfolio" lang="en" />
        <Achievement />
        <Footer />
      </div>
    </main>
  );
}

