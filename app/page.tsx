import B2BHero from "@/components/b2b/B2BHero";
import B2BProblem from "@/components/b2b/B2BProblem";
import B2BStats from "@/components/b2b/B2BStats";
import B2BAudience from "@/components/b2b/B2BAudience";
import B2BTestimonial from "@/components/b2b/B2BTestimonial";
import B2BFAQ from "@/components/b2b/B2BFAQ";
import B2BCTA from "@/components/b2b/B2BCTA";

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
    </main>
  );
}
