import { BentoProjectDetail } from "@/types/projects";

export const bentoProjects: BentoProjectDetail[] = [
  {
    id: "paletindo",
    title: "E-Catalog & Admin Panel Paletindo",
    client: "Paletindo",
    category: "Web Development",
    description: "Pembangunan e-catalog produk digital lengkap dengan admin panel untuk manajemen inventaris. Sistem modern dengan fokus pada kecepatan dan kemudahan kelola data.",
    mockupLaptop: "/projects/showcase/paletindo/after.png",
    mockupMobile: "/projects/showcase/paletindo/mobile.png",
    beforeImage: "/projects/showcase/paletindo/before.png",
    logoUrl: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80&w=400",
    palette: ["#f59e0b", "#1e293b", "#ffffff", "#f8fafc"],
    results: [
      { label: "Management", value: "Realtime", detail: "Inventory Sync" },
      { label: "Performance", value: "100/100", detail: "Page Speed Score" }
    ]
  },
  {
    id: "rapor-digital",
    title: "Sistem Manajemen Rapor Digital",
    client: "SD Lamaholot",
    category: "Web Application",
    description: "Digitalisasi total sistem penilaian akademik. Mengubah proses manual berminggu-minggu menjadi hitungan jam dengan tingkat akurasi 100%.",
    mockupLaptop: "/projects/showcase/rapor-lamaholot/after.png",
    mockupMobile: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=800",
    beforeImage: "/projects/showcase/rapor-lamaholot/before.png",
    logoUrl: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&q=80&w=400",
    palette: ["#10b981", "#1A1A2E", "#F8F9FA", "#E2E8F0"],
    results: [
      { label: "Efficiency", value: "10x", detail: "Faster Processing" },
      { label: "Accuracy", value: "99%", detail: "Error Reduction" }
    ]
  },
  {
    id: "srlaundry",
    title: "SR Laundry Landing Page",
    client: "SR Laundry",
    category: "Conversion Optimization",
    description: "Transformasi landing page yang fokus pada 'Direct Booking'. Mengoptimalkan alur navigasi dari traffic iklan langsung ke WhatsApp.",
    mockupLaptop: "/projects/showcase/srlaundry/after.png",
    mockupMobile: "https://images.unsplash.com/photo-1556740734-7569c4417a7d?auto=format&fit=crop&q=80&w=800",
    beforeImage: "/projects/showcase/srlaundry/before.png",
    logoUrl: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=400",
    palette: ["#3b82f6", "#1e293b", "#ffffff", "#f1f5f9"],
    results: [
      { label: "Leads", value: "+180%", detail: "WhatsApp Inquiry" },
      { label: "Speed", value: "1.2s", detail: "Load Time" }
    ]
  }
];
