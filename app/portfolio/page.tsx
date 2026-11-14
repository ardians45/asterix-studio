import type { Metadata } from "next";
import "./portfolio.css";
import { pfFontVars } from "@/components/portfolio/fonts";
import PortfolioNav from "@/components/portfolio/PortfolioNav";
import PortfolioHero from "@/components/portfolio/PortfolioHero";
import PortfolioAbout from "@/components/portfolio/PortfolioAbout";
import PortfolioWork from "@/components/portfolio/PortfolioWork";
import PortfolioSkills from "@/components/portfolio/PortfolioSkills";
import PortfolioAwards from "@/components/portfolio/PortfolioAwards";
import PortfolioFooter from "@/components/portfolio/PortfolioFooter";
import ToolsLoop from "@/components/ToolsLoop";
import Certificates from "@/components/Certificates";
import SeoProofsSection from "@/components/sections/b2b/SeoProofsSection";

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
    <main data-portfolio-page className={`pf-root ${pfFontVars}`}>
      <PortfolioNav />
      <PortfolioHero />
      <PortfolioAbout />
      <PortfolioWork />
      <ToolsLoop />
      <PortfolioSkills />
      <PortfolioAwards />
      <Certificates tone="butter" />
      <div className="pf-seo">
        <SeoProofsSection theme="portfolio" lang="en" />
      </div>
      <PortfolioFooter />
    </main>
  );
}
