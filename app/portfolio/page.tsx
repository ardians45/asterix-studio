import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Certificates from "@/components/Certificates";
import Projects from "@/components/Projects";
import Achievement from "@/components/Achievement";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-black text-white selection:bg-white selection:text-black">
      <Hero />
      <div className="relative z-10 -mt-[100vh] bg-black">
        <About />
        <Skills />
        <Certificates />
        <Projects />
        <Achievement />
        <Footer />
      </div>
    </main>
  );
}
