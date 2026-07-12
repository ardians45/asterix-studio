import dynamic from 'next/dynamic';
import B2BHero from "@/components/sections/b2b/B2BHero";
import B2BProblem from "@/components/sections/b2b/B2BProblem";
import ClientLogos from "@/components/sections/b2b/ClientLogos";
import WhyChooseUs from "@/components/sections/b2b/WhyChooseUs";
import ProjectBentoSection from "@/components/sections/ProjectBentoSection";
import { bentoProjects } from "@/data/projects";

// Deferring heavy client-side sections to reduce initial main-thread work
const B2BAudience = dynamic(() => import("@/components/sections/b2b/B2BAudience"), { ssr: true });
const B2BTestimonial = dynamic(() => import("@/components/sections/b2b/B2BTestimonial"), { ssr: true });
const B2BFAQ = dynamic(() => import("@/components/sections/b2b/B2BFAQ"), { ssr: true });
const B2BCTA = dynamic(() => import("@/components/sections/b2b/B2BCTA"), { ssr: true });
const B2BFooter = dynamic(() => import("@/components/sections/b2b/B2BFooter"), { ssr: true });
const SeoProofsSection = dynamic(() => import("@/components/sections/b2b/SeoProofsSection"), { ssr: true });

export default function Home() {
  return (
    <main className="bg-[#F8F9FA] text-gray-900 selection:bg-emerald-200 selection:text-gray-900 font-sans min-h-screen">
      <B2BHero />
      <ClientLogos />
      <B2BProblem />
      
      {/* Portfolio Showcase Section */}
      <section id="projects" className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <div className="text-center mb-16 md:mb-24">
            <p className="text-[10px] md:text-sm font-semibold text-gray-500 uppercase tracking-widest mb-2">Portofolio Kami</p>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight">
              Studi Kasus & <span className="text-emerald-600">Sebelum vs Sesudah.</span>
            </h2>
            <p className="text-sm md:text-lg text-gray-500 mt-4 md:mt-6 max-w-2xl mx-auto font-medium leading-relaxed">
              Lihat bagaimana kami mentransformasi website klien kami dari berkinerja buruk menjadi penghasil inquiry konversi tinggi.
            </p>
          </div>
          {bentoProjects.map((project) => (
            <ProjectBentoSection key={project.id} project={project} />
          ))}
        </div>
      </section>

      <SeoProofsSection />

      <B2BAudience />
      <WhyChooseUs />
      <B2BTestimonial />
      <B2BFAQ />
      <B2BCTA />
      <B2BFooter />
    </main>
  );
}
