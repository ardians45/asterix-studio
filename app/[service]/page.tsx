import dynamic from 'next/dynamic';
import B2BHero from "@/components/sections/b2b/B2BHero";
import B2BProblem from "@/components/sections/b2b/B2BProblem";
import ClientLogos from "@/components/sections/b2b/ClientLogos";
import WhyChooseUs from "@/components/sections/b2b/WhyChooseUs";
import ProjectBentoSection from "@/components/sections/ProjectBentoSection";
import { bentoProjects } from "@/data/projects";
import { Metadata } from 'next';
import { servicesSEOMeta } from "@/data/seo/services";
import { getServiceSchema, getFAQSchema, getBreadcrumbSchema } from "@/lib/schema";

const B2BAudience = dynamic(() => import("@/components/sections/b2b/B2BAudience"), { ssr: true });
const B2BTestimonial = dynamic(() => import("@/components/sections/b2b/B2BTestimonial"), { ssr: true });
const B2BFAQ = dynamic(() => import("@/components/sections/b2b/B2BFAQ"), { ssr: true });
const B2BCTA = dynamic(() => import("@/components/sections/b2b/B2BCTA"), { ssr: true });
const B2BFooter = dynamic(() => import("@/components/sections/b2b/B2BFooter"), { ssr: true });
const SeoProofsSection = dynamic(() => import("@/components/sections/b2b/SeoProofsSection"), { ssr: true });

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

export async function generateStaticParams() {
  return Object.keys(servicesSEOMeta).map((slug) => ({
    service: slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams.service;
  const meta = servicesSEOMeta[slug];

  if (meta) {
    return {
      title: meta.seoTitle,
      description: meta.metaDesc,
      alternates: {
        canonical: `/${slug}`,
      }
    };
  }

  const serviceTitle = formatSlug(slug);
  return {
    title: `${serviceTitle} Premium | Asterix Studio`,
    description: `Butuh ${serviceTitle} profesional dengan performa tinggi & berorientasi konversi? Asterix Studio siap membantu meningkatkan leads bisnis Anda.`,
    alternates: {
      canonical: `/${slug}`,
    }
  };
}

export default async function ServicePage({ params }: PageProps) {
  const resolvedParams = await params;
  const slug = resolvedParams.service;
  const seoTitle = formatSlug(slug);
  const meta = servicesSEOMeta[slug];

  const serviceSchema = meta ? getServiceSchema({
    name: meta.title,
    description: meta.metaDesc,
    url: `https://www.asterixstudio.site/${slug}`
  }) : null;

  const faqSchema = meta ? getFAQSchema(meta.faqs) : null;
  
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Beranda", item: "/" },
    { name: meta ? meta.title : seoTitle, item: `/${slug}` }
  ]);

  return (
    <main className="bg-[#F8F9FA] text-gray-900 selection:bg-emerald-200 selection:text-gray-900 font-sans min-h-screen">
      {/* JSON-LD Schemas */}
      {serviceSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
        />
      )}
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <B2BHero seoTitle={meta ? meta.h1 : seoTitle} />
      <ClientLogos />
      
      {meta && meta.snippets && (
        <section className="py-12 bg-white border-b border-gray-100">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl text-center">
            <h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-6">Keunggulan Layanan Kami</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              {meta.snippets.map((snippet, idx) => (
                <div key={idx} className="p-5 bg-slate-50 rounded-2xl border border-gray-100 flex flex-col justify-between">
                  <span className="text-emerald-500 font-black text-2xl mb-3">0{idx + 1}</span>
                  <p className="text-sm text-gray-600 leading-relaxed font-medium">{snippet}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

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
      <B2BFAQ customFaqs={meta?.faqs} />
      <B2BCTA />
      <B2BFooter />
    </main>
  );
}
