// Master Keyword Database for Asterix Studio SEO
// Categorized by Search Intent, Funnel Stage, and Priority

export interface KeywordItem {
  keyword: string;
  intent: 'informational' | 'commercial' | 'transactional' | 'navigational';
  funnel: 'TOFU' | 'MOFU' | 'BOFU';
  volumeEstimasi: number;
  kdEstimasi: number; // Keyword Difficulty (0-100)
  prioritas: 'Quick Wins' | 'High Volume' | 'High Buyer Intent' | 'Easy Ranking' | 'Medium Competition' | 'Long Term Investment';
  conversionRate: number; // Est conversion percentage (0.1 to 10.0)
  cluster: string;
}

export const moneyKeywords: KeywordItem[] = [
  // Cluster: Jasa Pembuatan Website (BOFU / Transactional)
  { keyword: "jasa pembuatan website", intent: "transactional", funnel: "BOFU", volumeEstimasi: 4400, kdEstimasi: 42, prioritas: "High Volume", conversionRate: 5.5, cluster: "Jasa Website" },
  { keyword: "jasa pembuatan website perusahaan", intent: "transactional", funnel: "BOFU", volumeEstimasi: 880, kdEstimasi: 28, prioritas: "High Buyer Intent", conversionRate: 7.2, cluster: "Jasa Website Perusahaan" },
  { keyword: "jasa website company profile", intent: "transactional", funnel: "BOFU", volumeEstimasi: 590, kdEstimasi: 24, prioritas: "Quick Wins", conversionRate: 8.0, cluster: "Company Profile" },
  { keyword: "jasa pembuatan landing page", intent: "transactional", funnel: "BOFU", volumeEstimasi: 720, kdEstimasi: 26, prioritas: "Quick Wins", conversionRate: 8.5, cluster: "Landing Page" },
  { keyword: "jasa website custom", intent: "transactional", funnel: "BOFU", volumeEstimasi: 210, kdEstimasi: 18, prioritas: "High Buyer Intent", conversionRate: 9.0, cluster: "Custom Website" },
  { keyword: "jasa web design", intent: "transactional", funnel: "BOFU", volumeEstimasi: 1300, kdEstimasi: 35, prioritas: "High Volume", conversionRate: 4.8, cluster: "Web Design" },
  { keyword: "jasa website nextjs", intent: "transactional", funnel: "BOFU", volumeEstimasi: 140, kdEstimasi: 12, prioritas: "Easy Ranking", conversionRate: 7.5, cluster: "Next.js/React" },
  { keyword: "jasa website react", intent: "transactional", funnel: "BOFU", volumeEstimasi: 90, kdEstimasi: 14, prioritas: "Easy Ranking", conversionRate: 6.8, cluster: "Next.js/React" },
  { keyword: "jasa website seo", intent: "transactional", funnel: "BOFU", volumeEstimasi: 390, kdEstimasi: 22, prioritas: "Quick Wins", conversionRate: 7.8, cluster: "SEO Website" },
  { keyword: "jasa ui ux design", intent: "transactional", funnel: "BOFU", volumeEstimasi: 480, kdEstimasi: 30, prioritas: "Medium Competition", conversionRate: 5.0, cluster: "UI UX" },
  { keyword: "jasa redesign website", intent: "transactional", funnel: "BOFU", volumeEstimasi: 260, kdEstimasi: 19, prioritas: "Quick Wins", conversionRate: 8.2, cluster: "Redesign Website" },
  
  // Cluster: Website B2B / Industri (BOFU / Transactional)
  { keyword: "jasa website b2b", intent: "transactional", funnel: "BOFU", volumeEstimasi: 170, kdEstimasi: 15, prioritas: "High Buyer Intent", conversionRate: 9.5, cluster: "Website B2B" },
  { keyword: "website untuk kontraktor", intent: "transactional", funnel: "BOFU", volumeEstimasi: 110, kdEstimasi: 10, prioritas: "Easy Ranking", conversionRate: 8.8, cluster: "Website Kontraktor" },
  { keyword: "website untuk distributor", intent: "transactional", funnel: "BOFU", volumeEstimasi: 90, kdEstimasi: 12, prioritas: "Easy Ranking", conversionRate: 8.5, cluster: "Website Distributor" },
  { keyword: "website untuk supplier", intent: "transactional", funnel: "BOFU", volumeEstimasi: 80, kdEstimasi: 8, prioritas: "Easy Ranking", conversionRate: 9.0, cluster: "Website Supplier" },
  { keyword: "website untuk manufaktur", intent: "transactional", funnel: "BOFU", volumeEstimasi: 70, kdEstimasi: 14, prioritas: "Easy Ranking", conversionRate: 8.7, cluster: "Website Manufaktur" },
  
  // Commercial Keywords
  { keyword: "jasa pembuatan website terbaik", intent: "commercial", funnel: "MOFU", volumeEstimasi: 480, kdEstimasi: 36, prioritas: "Medium Competition", conversionRate: 4.5, cluster: "Jasa Website" },
  { keyword: "jasa website perusahaan profesional", intent: "commercial", funnel: "MOFU", volumeEstimasi: 150, kdEstimasi: 20, prioritas: "High Buyer Intent", conversionRate: 6.5, cluster: "Jasa Website Perusahaan" },
  { keyword: "vendor pembuatan website corporate", intent: "transactional", funnel: "BOFU", volumeEstimasi: 90, kdEstimasi: 25, prioritas: "High Buyer Intent", conversionRate: 8.8, cluster: "Website Corporate" },
  { keyword: "jasa website premium", intent: "commercial", funnel: "MOFU", volumeEstimasi: 190, kdEstimasi: 22, prioritas: "Quick Wins", conversionRate: 7.0, cluster: "Jasa Website" },
  { keyword: "jasa website murah", intent: "commercial", funnel: "MOFU", volumeEstimasi: 2900, kdEstimasi: 48, prioritas: "High Volume", conversionRate: 3.5, cluster: "Jasa Website" },
];

export const longTailKeywords: string[] = [
  "jasa pembuatan website company profile untuk kontraktor",
  "jasa website supplier murah tangerang selatan",
  "jasa landing page google ads konversi tinggi",
  "jasa website nextjs berkinerja tinggi",
  "jasa website b2b seo ready indonesia",
  "jasa pembuatan website e-catalog dengan admin panel",
  "jasa ui ux design website company profile",
  "cara meningkatkan leads lewat website perusahaan",
  "jasa pembuatan website sekolah dengan admin panel",
  "jasa website klinik dan rumah sakit profesional",
  "jasa website umkm tangerang selatan bsd",
  "jasa website startup dengan desain custom",
  "jasa buat website cepat pagespeed 95 plus",
  "jasa website corporate premium di jakarta",
  "jasa redesign website perusahaan terpercaya"
];

export const informationalKeywords: string[] = [
  "berapa biaya membuat website perusahaan",
  "apa itu website company profile",
  "perbedaan landing page vs website lengkap",
  "mengapa website bisnis harus cepat",
  "cara memilih jasa pembuatan website terbaik",
  "apa keunggulan website nextjs",
  "cara meningkatkan conversion rate website",
  "apa itu local seo untuk bisnis lokal",
  "cara website muncul di halaman pertama google",
  "mengapa website b2b membutuhkan seo",
  "cara optimasi core web vitals website",
  "apa itu schema markup pada website",
  "cara integrasi whatsapp link di website",
  "apa beda website dinamis dan statis"
];

export const peopleAlsoAsk: string[] = [
  "Berapa harga jasa pembuatan website?",
  "Berapa lama proses pembuatan website company profile?",
  "Apakah pembuatan website sudah termasuk domain dan hosting?",
  "Mengapa website Next.js lebih cepat dari WordPress?",
  "Apa itu SEO-friendly website?",
  "Bagaimana cara mengedit isi website sendiri?",
  "Apakah website dari Asterix Studio mobile-friendly?",
  "Apakah ada biaya tahunan untuk website?"
];

export const entities: string[] = [
  "Website", "SEO", "Landing Page", "Company Profile", "Next.js", "React", "CMS", "Google Search Console",
  "Google Analytics", "Core Web Vitals", "PageSpeed", "Conversion Rate", "UI UX", "Hosting", "Domain",
  "B2B", "Corporate", "Lead Generation", "Google Maps", "WhatsApp", "CRM", "Schema Markup",
  "Internal Linking", "Local SEO", "Search Intent", "Topical Authority", "Tailwind CSS", "TypeScript"
];

export const lsiKeywords: string[] = [
  "pembuatan web", "desain web profesional", "jasa pembuatan situs", "buat web perusahaan",
  "pengembangan website", "layanan seo", "optimasi kecepatan web", "keamanan ssl",
  "sitemap xml", "responsive design", "mobile first web", "inquiry whatsapp",
  "konversi leads", "digital marketing agency", "admin panel cms"
];
