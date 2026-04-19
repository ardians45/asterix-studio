import B2BHero from "@/components/sections/b2b/B2BHero";
import B2BProblem from "@/components/sections/b2b/B2BProblem";
import B2BStats from "@/components/sections/b2b/B2BStats";
import B2BAudience from "@/components/sections/b2b/B2BAudience";
import B2BTestimonial from "@/components/sections/b2b/B2BTestimonial";
import B2BFAQ from "@/components/sections/b2b/B2BFAQ";
import B2BCTA from "@/components/sections/b2b/B2BCTA";
import B2BFooter from "@/components/sections/b2b/B2BFooter";

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
