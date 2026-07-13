import dynamic from 'next/dynamic';
import { Metadata } from 'next';
import B2BHero from "@/components/sections/b2b/B2BHero";
import B2BProblem from "@/components/sections/b2b/B2BProblem";
import ClientLogos from "@/components/sections/b2b/ClientLogos";
import WhyChooseUs from "@/components/sections/b2b/WhyChooseUs";
import ProjectBentoSection from "@/components/sections/ProjectBentoSection";
import { bentoProjects } from "@/data/projects";
import { locationData } from "@/data/seo/locations";
import { getLocalBusinessSchema, getFAQSchema, getBreadcrumbSchema } from "@/lib/schema";

const B2BAudience = dynamic(() => import("@/components/sections/b2b/B2BAudience"), { ssr: true });
const B2BTestimonial = dynamic(() => import("@/components/sections/b2b/B2BTestimonial"), { ssr: true });
const B2BFAQ = dynamic(() => import("@/components/sections/b2b/B2BFAQ"), { ssr: true });
const B2BCTA = dynamic(() => import("@/components/sections/b2b/B2BCTA"), { ssr: true });
const B2BFooter = dynamic(() => import("@/components/sections/b2b/B2BFooter"), { ssr: true });
const SeoProofsSection = dynamic(() => import("@/components/sections/b2b/SeoProofsSection"), { ssr: true });

function formatLocation(slug?: string): string {
  if (!slug) return "Indonesia";
  // Find location name from the locationData DB
  for (const group of locationData) {
    if (group.slug === slug) return group.name;
    const area = group.areas.find(a => a.slug === slug);
    if (area) return area.name;
  }
  
  return slug
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

interface PageProps {
  params: Promise<{ location: string }>;
}

export async function generateStaticParams() {
  const params: { location: string }[] = [];
  
  locationData.forEach(group => {
    // Add city/group slug itself
    params.push({ location: group.slug });
    
    // Add sub-areas
    group.areas.forEach(area => {
      if (area.slug !== group.slug) {
        params.push({ location: area.slug });
      }
    });
  });
  
  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const locationSlug = resolvedParams?.location;
  const locationName = formatLocation(locationSlug);
  
  return {
    title: `Jasa Pembuatan Website ${locationName} Premium | Asterix Studio`,
    description: `Jasa pembuatan website profesional di ${locationName}. Didesain custom, cepat (PageSpeed 95+), SEO-ready, & siap mendatangkan banyak leads untuk bisnis Anda.`,
    alternates: {
      canonical: `/jasa-website-${locationSlug || ""}`,
    }
  };
}

export default async function LocalSeoPage({ params }: PageProps) {
  const resolvedParams = await params;
  const locationSlug = resolvedParams?.location;
  const locationName = formatLocation(locationSlug);

  const localBusinessSchema = getLocalBusinessSchema({
    name: `Jasa Pembuatan Website ${locationName} - Asterix Studio`,
    description: `Jasa pembuatan website profesional & agency web design berkinerja tinggi di wilayah ${locationName} dan sekitarnya.`,
    url: `https://www.asterixstudio.site/jasa-website-${locationSlug || ""}`,
    city: locationName,
    region: "Banten / DKI Jakarta / Jawa Barat"
  });

  const localFaqs = [
    {
      q: `Apakah Asterix Studio melayani jasa pembuatan website langsung di ${locationName}?`,
      a: `Ya. Kami melayani jasa pembuatan website profesional untuk perusahaan, bisnis, toko online, dan UMKM di wilayah ${locationName} secara online maupun pertemuan langsung.`
    },
    {
      q: `Berapa biaya pembuatan website di ${locationName}?`,
      a: `Biaya pembuatan website bervariasi mulai dari Rp 1.350.000 untuk paket Landing Page hingga paket Professional & Custom yang disesuaikan dengan kebutuhan kompleksitas bisnis Anda.`
    },
    {
      q: `Apakah website kami nantinya dioptimasi untuk pencarian lokal di ${locationName}?`,
      a: `Tentu saja. Kami mengimplementasikan teknik Local SEO yang presisi agar bisnis Anda mudah ditemukan oleh calon pelanggan di area ${locationName} saat mereka melakukan pencarian di Google.`
    }
  ];

  const faqSchema = getFAQSchema(localFaqs);
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Beranda", item: "/" },
    { name: `Jasa Website ${locationName}`, item: `/jasa-website-${locationSlug || ""}` }
  ]);

  return (
    <main className="bg-[#F8F9FA] text-gray-900 selection:bg-emerald-200 selection:text-gray-900 font-sans min-h-screen">
      {/* Schema Markups */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <B2BHero seoTitle={`Jasa Pembuatan Website ${locationName} Premium & SEO Ready`} />
      <ClientLogos />
      
      {/* Localized Intro Snippet */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl text-center">
          <span className="text-[10px] md:text-xs font-black tracking-[0.2em] text-emerald-600 uppercase bg-emerald-50 px-4 py-1.5 rounded-full border border-emerald-100/50 mb-4 inline-block">
            Local SEO Service
          </span>
          <h2 className="text-2xl md:text-4xl font-bold text-slate-900 tracking-tight mt-3">
            Meningkatkan Visibilitas Bisnis Anda di Wilayah <span className="text-emerald-600">{locationName}.</span>
          </h2>
          <p className="text-sm md:text-base text-gray-500 mt-6 leading-relaxed font-medium max-w-2xl mx-auto">
            Asterix Studio hadir membantu pemilik bisnis di {locationName} membangun website berkecepatan tinggi berbasis Next.js. Kami merancang arsitektur informasi website Anda agar ramah mesin pencari, cepat diindeks Google, dan siap bersaing di hasil pencarian lokal.
          </p>
        </div>
      </section>

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
      <B2BFAQ customFaqs={localFaqs} />
      <B2BCTA />
      <B2BFooter />
    </main>
  );
}
