import dynamic from 'next/dynamic';
import B2BHero from "@/components/sections/b2b/B2BHero";
import B2BProblem from "@/components/sections/b2b/B2BProblem";

// Deferring heavy client-side sections to reduce initial main-thread work
const B2BStats = dynamic(() => import("@/components/sections/b2b/B2BStats"), { ssr: true });
const B2BAudience = dynamic(() => import("@/components/sections/b2b/B2BAudience"), { ssr: true });
const B2BTestimonial = dynamic(() => import("@/components/sections/b2b/B2BTestimonial"), { ssr: true });
const B2BFAQ = dynamic(() => import("@/components/sections/b2b/B2BFAQ"), { ssr: true });
const B2BCTA = dynamic(() => import("@/components/sections/b2b/B2BCTA"), { ssr: true });
const B2BFooter = dynamic(() => import("@/components/sections/b2b/B2BFooter"), { ssr: true });

export default function Home() {
  return (
    <main className="bg-[#F8F9FA] text-gray-900 selection:bg-emerald-200 selection:text-gray-900 font-sans min-h-screen">
      <B2BHero />
      <B2BProblem />
      <B2BStats />
      <B2BAudience />
      <B2BTestimonial />
      <B2BFAQ />
      <B2BCTA />
      <B2BFooter />
    </main>
  );
}
