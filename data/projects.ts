import { BentoProjectDetail } from "@/types/projects";

export const bentoProjects: BentoProjectDetail[] = [
  {
    id: "paletindo",
    title: "E-Catalog & Admin Panel Paletindo",
    client: "Paletindo",
    category: "Web Development",
    description: "Pembangunan e-catalog produk digital lengkap dengan admin panel untuk manajemen inventaris. Sistem modern dengan fokus pada kecepatan dan kemudahan kelola data.",
    mockupLaptop: "/projects/showcase/paletindo/after.png",
    mockupMobile: "/projects/showcase/paletindo/iPhone-13-PRO-paletindo.id.webp",
    beforeImage: "/projects/showcase/paletindo/before.png",
    logoUrl: "/logopaletindo.png",
    palette: ["#f59e0b", "#1e293b", "#ffffff", "#f8fafc"],
    results: [
      { label: "Management", value: "Realtime", detail: "Inventory Sync" },
      { label: "Performance", value: "100/100", detail: "Page Speed Score" }
    ],
    liveUrl: "https://paletindo.id/"
  },
  {
    id: "srlaundry",
    title: "SR Laundry Landing Page",
    client: "SR Laundry",
    category: "Conversion Optimization",
    description: "Transformasi landing page yang fokus pada 'Direct Booking'. Mengoptimalkan alur navigasi dari traffic iklan langsung ke WhatsApp.",
    mockupLaptop: "/projects/showcase/srlaundry/after.png",
    mockupMobile: "/projects/showcase/srlaundry/mobile.webp",
    beforeImage: "/projects/showcase/srlaundry/before.png",
    logoUrl: "/logosrlaundry.png",
    palette: ["#BA0000", "#450a0a", "#ffffff", "#f8fafc"],
    results: [
      { label: "Leads", value: "+180%", detail: "WhatsApp Inquiry" },
      { label: "Speed", value: "1.2s", detail: "Load Time" }
    ],
    liveUrl: "https://srlaundry.site/"
  }
];
