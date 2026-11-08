import type { Metadata } from "next";
import LithosHero from "@/components/LithosHero";
import Skills from "@/components/Skills";
import Certificates from "@/components/Certificates";
import Projects from "@/components/Projects";
import SeoProofsSection from "@/components/sections/b2b/SeoProofsSection";
import Achievement from "@/components/Achievement";
import Footer from "@/components/Footer";

const title = "Portfolio Ardian Setiawan | UI/UX Designer & Web Developer";
const description =
  "Portfolio Ardian Setiawan (Asterix Studio): selected web projects, UI/UX case studies, SEO results, certifications, and achievements.";

// Without this the page inherits the root layout's canonical ("/"), telling Google it duplicates the homepage.
export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/portfolio" },
  openGraph: {
    title,
    description,
    url: "https://asterixstudio.site/portfolio",
    siteName: "Asterix Studio",
    type: "profile",
  },
  twitter: { card: "summary_large_image", title, description },
};

export default function PortfolioPage() {
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
