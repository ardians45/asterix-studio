import B2BServices from "@/components/sections/b2b/B2BServices";
import B2BAudience from "@/components/sections/b2b/B2BAudience";
import B2BFooter from "@/components/sections/b2b/B2BFooter";

export default function ServicesPage() {
  return (
    <main className="min-h-screen">
      <B2BServices />
      <B2BAudience />
      <B2BFooter />
    </main>
  );
}
