import B2BServices from "@/components/sections/b2b/B2BServices";
import Navbar from "@/components/Navbar";
import B2BFooter from "@/components/sections/b2b/B2BFooter";

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <B2BServices />
      </main>
      <B2BFooter />
    </>
  );
}
