import dynamic from 'next/dynamic';
import B2BHero from "@/components/sections/b2b/B2BHero";
import B2BProblem from "@/components/sections/b2b/B2BProblem";
import ClientLogos from "@/components/sections/b2b/ClientLogos";
import WhyChooseUs from "@/components/sections/b2b/WhyChooseUs";
import ProjectBentoSection from "@/components/sections/ProjectBentoSection";
import { bentoProjects } from "@/data/projects";
import { Metadata } from 'next';

const B2BStats = dynamic(() => import("@/components/sections/b2b/B2BStats"), { ssr: true });
const B2BAudience = dynamic(() => import("@/components/sections/b2b/B2BAudience"), { ssr: true });
const B2BTestimonial = dynamic(() => import("@/components/sections/b2b/B2BTestimonial"), { ssr: true });
const B2BFAQ = dynamic(() => import("@/components/sections/b2b/B2BFAQ"), { ssr: true });
const B2BCTA = dynamic(() => import("@/components/sections/b2b/B2BCTA"), { ssr: true });
const B2BFooter = dynamic(() => import("@/components/sections/b2b/B2BFooter"), { ssr: true });

function formatSlug(slug: string): string {
  const mapping: { [key: string]: string } = {
    "jasa-pembuatan-website-perusahaan": "Jasa Pembuatan Website Perusahaan",
    "jasa-website-company-profile": "Jasa Website Company Profile",
    "jasa-landing-page": "Jasa Pembuatan Landing Page",
    "jasa-website-custom": "Jasa Website Custom",
    "jasa-web-design": "Jasa Web Design",
    "jasa-website-nextjs": "Jasa Website Next.js",
    "jasa-ui-ux-design": "Jasa UI UX Design",
    "jasa-redesign-website": "Jasa Redesign Website",
    "website-untuk-kontraktor": "Website untuk Kontraktor",
    "website-untuk-klinik": "Website untuk Klinik",
    "website-untuk-sekolah": "Website untuk Sekolah",
    "website-untuk-startup": "Website untuk Startup",
    "website-untuk-umkm": "Website untuk UMKM"
  };

  if (mapping[slug]) {
    return mapping[slug];
  }

  return slug
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

interface PageProps {
  params: Promise<{ service: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const serviceTitle = formatSlug(resolvedParams.service);
  return {
    title: `${serviceTitle} Premium | Asterix Studio`,
    description: `Butuh ${serviceTitle} profesional dengan performa tinggi & berorientasi konversi? Asterix Studio siap membantu meningkatkan leads bisnis Anda.`,
    alternates: {
      canonical: `/${resolvedParams.service}`,
    }
  };
}

export default async function ServicePage({ params }: PageProps) {
  const resolvedParams = await params;
  const seoTitle = formatSlug(resolvedParams.service);

  return (
    <main className="bg-[#F8F9FA] text-gray-900 selection:bg-emerald-200 selection:text-gray-900 font-sans min-h-screen">
      <B2BHero seoTitle={seoTitle} />
      <ClientLogos />
      <B2BProblem />
      <WhyChooseUs />
      <B2BStats />
      
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

      <B2BAudience />
      <B2BTestimonial />
      <B2BFAQ />
      <B2BCTA />
      <B2BFooter />
    </main>
  );
}
