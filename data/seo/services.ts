// Services SEO Meta Database
// Maps each service slug to its unique, keyword-rich SEO metadata and structured text blocks.

export interface ServiceSEOMeta {
  slug: string;
  title: string;
  keyword: string;
  seoTitle: string;
  metaDesc: string;
  h1: string;
  targetPersona: string;
  estimatedConversion: string;
  faqs: { q: string; a: string }[];
  snippets: string[];
}

export const servicesSEOMeta: Record<string, ServiceSEOMeta> = {
  "jasa-pembuatan-website-perusahaan": {
    slug: "jasa-pembuatan-website-perusahaan",
    title: "Jasa Pembuatan Website Perusahaan",
    keyword: "jasa pembuatan website perusahaan",
    seoTitle: "Jasa Pembuatan Website Perusahaan Premium | Asterix Studio",
    metaDesc: "Jasa pembuatan website perusahaan profesional dengan desain custom, cepat (PageSpeed 95+), SEO-ready, & dioptimasi untuk mendatangkan inquiry/leads B2B.",
    h1: "Jasa Pembuatan Website Perusahaan untuk Kredibilitas & Lead Generation",
    targetPersona: "Direktur, Pemilik Bisnis, Marketing Manager",
    estimatedConversion: "8.5%",
    snippets: [
      "Membangun kredibilitas instan di mata klien dan investor korporat dengan visual premium.",
      "Struktur informasi rapi yang menuntun calon klien langsung ke kontak WhatsApp sales Anda.",
      "Optimasi performa ekstrim menggunakan Next.js untuk akses tanpa delay bagi pembeli potensial."
    ],
    faqs: [
      { q: "Mengapa website perusahaan sangat penting untuk bisnis?", a: "Website perusahaan (corporate website) bertindak sebagai kantor digital 24/7 Anda. Website profesional memvalidasi kredibilitas, memberikan informasi resmi tentang profil perusahaan, serta mengumpulkan inquiry dari calon mitra secara otomatis." },
      { q: "Berapa lama proses pembuatan website perusahaan?", a: "Prosesnya memakan waktu sekitar 2 hingga 4 minggu tergantung kompleksitas struktur informasi dan kesiapan konten (copywriting/gambar) dari pihak Anda." }
    ]
  },
  "jasa-website-company-profile": {
    slug: "jasa-website-company-profile",
    title: "Jasa Website Company Profile",
    keyword: "jasa website company profile",
    seoTitle: "Jasa Website Company Profile Premium & SEO | Asterix Studio",
    metaDesc: "Buat website company profile profesional untuk tingkatkan brand awareness. Cepat, mobile-first, mudah diedit sendiri dengan CMS, & ramah Google.",
    h1: "Jasa Pembuatan Website Company Profile Terpercaya",
    targetPersona: "UMKM, Owner Bisnis Lokal, Startup",
    estimatedConversion: "7.8%",
    snippets: [
      "Hadirkan profil perusahaan secara komprehensif mulai dari sejarah, visi-misi, hingga katalog produk.",
      "Dilengkapi CMS intuitif sehingga Anda bisa dengan mudah memperbarui informasi atau menambah foto portofolio.",
      "Desain mobile-first yang dioptimasi agar tampil memukau di layar smartphone calon pelanggan."
    ],
    faqs: [
      { q: "Apakah website company profile bisa diedit sendiri?", a: "Tentu saja. Kami mengintegrasikan CMS (Content Management System) modern yang sangat mudah digunakan sehingga Anda bisa mengedit teks, gambar, dan menambah postingan baru tanpa perlu paham coding." },
      { q: "Apakah paket ini sudah termasuk domain dan hosting?", a: "Ya, semua paket pembuatan website di Asterix Studio sudah include domain (.com/.id) serta hosting selama 1 tahun pertama." }
    ]
  },
  "jasa-landing-page": {
    slug: "jasa-landing-page",
    title: "Jasa Pembuatan Landing Page",
    keyword: "jasa landing page",
    seoTitle: "Jasa Pembuatan Landing Page Konversi Tinggi | Asterix Studio",
    metaDesc: "Jasa pembuatan landing page premium untuk Google Ads, Facebook Ads & TikTok Ads. Didesain fokus konversi tinggi (inquiry WhatsApp / Form Leads).",
    h1: "Jasa Pembuatan Landing Page yang Menghasilkan Leads & Penjualan",
    targetPersona: "Advertiser, Pelaku UMKM, Sales Manager",
    estimatedConversion: "12.0%",
    snippets: [
      "Struktur psikologi penjualan (AIDA) yang dirancang matang untuk memicu aksi konversi instan.",
      "Kecepatan loading secepat kilat (di bawah 1.5 detik) guna menekan bounce rate iklan berbayar Anda.",
      "Integrasi call-to-action (CTA) langsung ke WhatsApp sales atau formulir database CRM Anda."
    ],
    faqs: [
      { q: "Apa perbedaan landing page dengan website lengkap?", a: "Landing page adalah satu halaman web terfokus yang dirancang khusus untuk kampanye pemasaran (iklan). Hanya ada satu tujuan utama (seperti menghubungi WhatsApp atau mengisi formulir), sementara website lengkap memiliki banyak halaman untuk navigasi info yang lebih luas." },
      { q: "Apakah cocok untuk iklan Google Ads?", a: "Sangat cocok. Landing page kami dioptimasi dari segi PageSpeed dan relevansi struktur kata kunci, yang membantu meningkatkan Quality Score iklan Google Ads Anda agar biaya per klik lebih murah." }
    ]
  },
  "jasa-website-custom": {
    slug: "jasa-website-custom",
    title: "Jasa Website Custom",
    keyword: "jasa website custom",
    seoTitle: "Jasa Pembuatan Website Custom Sistem & Desain | Asterix Studio",
    metaDesc: "Layanan pembuatan website custom dari nol. Desain eksklusif unik, integrasi sistem API, sistem e-catalog kompleks, dan teknologi Next.js handal.",
    h1: "Jasa Pembuatan Website Custom Sesuai Kebutuhan Bisnis Anda",
    targetPersona: "Corporate, Startup, Bisnis dengan Alur Khusus",
    estimatedConversion: "6.5%",
    snippets: [
      "Bebas dari template pasaran — desain visual 100% custom disesuaikan dengan identitas brand Anda.",
      "Arsitektur database kokoh untuk menampung fitur-fitur kompleks seperti e-catalog interaktif atau sistem admin.",
      "Integrasi API pihak ketiga (sistem logistik, payment gateway, CRM, dll) secara mulus."
    ],
    faqs: [
      { q: "Apa keunggulan menggunakan website custom dibanding CMS template?", a: "Website custom memberikan kebebasan penuh pada desain, fitur, dan alur sistem. Selain itu, performanya jauh lebih cepat karena tidak membawa beban kode template yang tidak digunakan, serta memiliki tingkat keamanan yang lebih kuat." }
    ]
  },
  "jasa-web-design": {
    slug: "jasa-web-design",
    title: "Jasa Web Design",
    keyword: "jasa web design",
    seoTitle: "Jasa Web Design Profesional & Modern | Asterix Studio",
    metaDesc: "Layanan desain website kelas dunia. Fokus pada estetika modern, pengalaman pengguna (UX) yang intuitif, serta branding digital yang kuat.",
    h1: "Jasa Web Design Modern untuk Konversi Maksimal",
    targetPersona: "Creative Director, Brand Manager, Business Owner",
    estimatedConversion: "7.0%",
    snippets: [
      "Tata letak estetis menggunakan grid modern dan visual premium untuk membangun kepercayaan.",
      "Navigasi intuitif berdasarkan riset perilaku pengguna agar mempermudah pencarian informasi.",
      "Desain adaptif yang otomatis menyesuaikan estetika di layar desktop, tablet, maupun mobile."
    ],
    faqs: [
      { q: "Apakah jasa ini hanya mencakup desain visual saja?", a: "Kami menyediakan opsi lengkap: hanya desain UI/UX (Figma mockup) atau desain sekaligus proses koding front-end hingga website online sepenuhnya." }
    ]
  },
  "jasa-website-nextjs": {
    slug: "jasa-website-nextjs",
    title: "Jasa Website Next.js",
    keyword: "jasa website nextjs",
    seoTitle: "Jasa Website Next.js Developer Terbaik | Asterix Studio",
    metaDesc: "Jasa pembuatan website menggunakan Next.js & React. Kecepatan load super cepat, Server-Side Rendering (SSR) untuk SEO optimal, & arsitektur modern.",
    h1: "Jasa Pembuatan Website Next.js Premium untuk Kecepatan Ekstrim",
    targetPersona: "Startup, Tech-Savvy Business, Corporate",
    estimatedConversion: "9.2%",
    snippets: [
      "Menggunakan teknologi Next.js terbaru untuk performa super instan dan efisien.",
      "Server-Side Rendering (SSR) & Static Site Generation (SSG) agar konten terindeks Google dengan cepat.",
      "Peningkatan skor Core Web Vitals secara maksimal demi kenyamanan pengunjung."
    ],
    faqs: [
      { q: "Mengapa harus menggunakan Next.js untuk website?", a: "Next.js menawarkan performa loading jauh lebih cepat dibanding platform tradisional seperti WordPress. Kecepatan ini berdampak langsung pada ranking SEO di Google dan kepuasan pengunjung yang meningkatkan konversi penjualan." }
    ]
  },
  "jasa-ui-ux-design": {
    slug: "jasa-ui-ux-design",
    title: "Jasa UI UX Design",
    keyword: "jasa ui ux design",
    seoTitle: "Jasa UI UX Design Website & Aplikasi | Asterix Studio",
    metaDesc: "Layanan desain UI/UX untuk website & dashboard admin. Buat tampilan antarmuka modern, interaktif, fungsional, dan ramah pengguna.",
    h1: "Jasa Desain UI/UX Profesional untuk Pengalaman Pengguna Terbaik",
    targetPersona: "Product Owner, Startup Founder",
    estimatedConversion: "6.0%",
    snippets: [
      "Pembuatan wireframe dan prototipe interaktif untuk memvalidasi alur sebelum proses koding.",
      "Palet warna harmonis dan tipografi modern yang disesuaikan dengan psikologi brand.",
      "Desain antarmuka responsif yang menjamin kemudahan navigasi di semua perangkat."
    ],
    faqs: [
      { q: "Tools apa yang digunakan untuk proses desain UI/UX?", a: "Kami menggunakan Figma sebagai standard industri untuk kolaborasi desain, pembuatan prototipe interaktif, dan penyerahan aset desain." }
    ]
  },
  "jasa-redesign-website": {
    slug: "jasa-redesign-website",
    title: "Jasa Redesign Website",
    keyword: "jasa redesign website",
    seoTitle: "Jasa Redesign Website Perusahaan | Asterix Studio",
    metaDesc: "Ubah website lama Anda menjadi modern, responsif, & berkecepatan tinggi. Perbaiki estetika, struktur navigasi, & optimasi ulang SEO.",
    h1: "Jasa Redesign Website: Transformasi Tampilan & Performa",
    targetPersona: "Marketing Director, Corporate",
    estimatedConversion: "8.0%",
    snippets: [
      "Modernisasi tampilan visual agar kembali relevan dengan standar estetika masa kini.",
      "Migrasi platform lama yang lambat ke teknologi modern untuk kecepatan akses lebih cepat.",
      "Penyelamatan dan optimasi ulang struktur link lama agar peringkat SEO Anda tidak turun."
    ],
    faqs: [
      { q: "Apakah redesign website akan menurunkan peringkat SEO saya?", a: "Jika dilakukan dengan benar, peringkat SEO Anda justru akan meningkat. Kami melakukan teknik 301 redirection dan mempertahankan struktur URL penting agar authority lama tidak hilang." }
    ]
  },
  "website-untuk-kontraktor": {
    slug: "website-untuk-kontraktor",
    title: "Website untuk Kontraktor",
    keyword: "website untuk kontraktor",
    seoTitle: "Jasa Pembuatan Website Kontraktor & Konstruksi | Asterix Studio",
    metaDesc: "Jasa pembuatan website kontraktor & jasa konstruksi profesional. Tampilkan galeri proyek, daftar layanan, & sertifikasi untuk menang tender.",
    h1: "Website Khusus Perusahaan Kontraktor & Konstruksi",
    targetPersona: "Direktur Kontraktor, Estimator Proyek",
    estimatedConversion: "7.5%",
    snippets: [
      "Tampilkan portofolio dokumentasi proyek konstruksi yang rapi dan memukau calon klien.",
      "Halaman khusus untuk sertifikasi, legalitas perusahaan, serta daftar klien besar.",
      "Halaman penawaran kerja sama terstruktur yang memudahkan proses tender proyek baru."
    ],
    faqs: [
      { q: "Apa fitur penting untuk website kontraktor?", a: "Beberapa fitur krusial meliputi galeri portofolio proyek sebelum vs sesudah, halaman detail layanan (sipil, MEP, arsitek), legalitas & sertifikasi perusahaan (SIUJK, Kadin), serta formulir request quotation." }
    ]
  },
  "website-untuk-distributor": {
    slug: "website-untuk-distributor",
    title: "Website untuk Distributor",
    keyword: "website untuk distributor",
    seoTitle: "Jasa Pembuatan Website Distributor Resmi | Asterix Studio",
    metaDesc: "Buat website distributor profesional dengan katalog produk digital lengkap, pendaftaran agen/reseller, & optimasi SEO lokal nasional.",
    h1: "Website Khusus Distributor & Penyalur Resmi",
    targetPersona: "Sales Director, Distributor Owner",
    estimatedConversion: "8.2%",
    snippets: [
      "Katalog digital terstruktur untuk memamerkan ratusan jenis produk tanpa lemot.",
      "Formulir registrasi agen/reseller online guna memperluas jaringan distribusi secara mandiri.",
      "Integrasi tombol chat langsung ke tim sales berdasarkan wilayah distribusi."
    ],
    faqs: [
      { q: "Apakah website distributor ini bisa menampilkan harga khusus grosir?", a: "Ya. Kami bisa merancang sistem multi-level user di mana agen atau reseller terdaftar dapat melihat harga grosir setelah login." }
    ]
  },
  "website-untuk-supplier": {
    slug: "website-untuk-supplier",
    title: "Website untuk Supplier",
    keyword: "website untuk supplier",
    seoTitle: "Jasa Pembuatan Website Supplier Industri | Asterix Studio",
    metaDesc: "Jasa pembuatan website supplier B2B untuk pabrik, bahan baku, & produk industri. Optimasi SEO agar langsung ditemukan oleh departemen purchasing.",
    h1: "Website Khusus Supplier B2B untuk Menjangkau Purchasing Manager",
    targetPersona: "Supplier Owner, B2B Marketing Manager",
    estimatedConversion: "9.0%",
    snippets: [
      "Struktur kata kunci difokuskan pada istilah industri spesifik yang dicari departemen purchasing.",
      "Halaman download katalog PDF, spesifikasi teknis produk, & lembar data keselamatan (MSDS).",
      "Formulir request for quotation (RFQ) yang ramah pengguna."
    ],
    faqs: [
      { q: "Bagaimana website bisa membantu supplier mendapatkan pembeli?", a: "Dengan optimasi SEO lokal & industri yang presisi, website Anda akan muncul saat purchasing manager mencari kata kunci seperti 'supplier pipa besi tangerang' atau 'distributor bahan baku kimia'." }
    ]
  },
  "website-untuk-manufaktur": {
    slug: "website-untuk-manufaktur",
    title: "Website untuk Manufaktur",
    keyword: "website untuk manufaktur",
    seoTitle: "Jasa Pembuatan Website Pabrik & Manufaktur | Asterix Studio",
    metaDesc: "Jasa pembuatan website perusahaan manufaktur & pabrik. Tampilkan kapasitas produksi, fasilitas mesin, standar mutu ISO, & portofolio klien.",
    h1: "Website Perusahaan Manufaktur & Industri Pabrik Modern",
    targetPersona: "Direktur Manufaktur, Business Development",
    estimatedConversion: "8.0%",
    snippets: [
      "Tampilkan video fasilitas pabrik dan penjelasan alur proses produksi yang higienis/standar tinggi.",
      "Halaman khusus sertifikasi mutu (ISO, SNI, BPOM) guna memvalidasi kepatuhan regulasi.",
      "Navigasi katalog produk skala besar yang memudahkan pencarian tipe/seri produk industri."
    ],
    faqs: [
      { q: "Mengapa perusahaan manufaktur membutuhkan website?", a: "Website manufaktur berfungsi membangun reputasi jangka panjang, mempermudah audit dari calon klien besar, dan memamerkan sertifikasi mutu internasional demi mendukung ekspansi ekspor." }
    ]
  },
  "website-untuk-umkm": {
    slug: "website-untuk-umkm",
    title: "Website untuk UMKM",
    keyword: "website untuk umkm",
    seoTitle: "Jasa Pembuatan Website UMKM Murah & SEO | Asterix Studio",
    metaDesc: "Jasa website murah untuk UMKM & usaha lokal. Desain profesional, loading cepat, SEO dasar lengkap, & gratis konsultasi selamanya.",
    h1: "Layanan Pembuatan Website untuk Naik Kelas Usaha UMKM",
    targetPersona: "Pemilik UMKM, Pelaku Usaha Lokal",
    estimatedConversion: "6.8%",
    snippets: [
      "Harga bersahabat dengan fitur lengkap yang dibutuhkan usaha berkembang.",
      "Dioptimasi untuk pencarian Google lokal agar toko Anda cepat dikenal warga sekitar.",
      "Tombol WhatsApp yang terhubung langsung agar transaksi lebih cepat deal."
    ],
    faqs: [
      { q: "Apakah harga website UMKM ini terjangkau?", a: "Sangat terjangkau. Kami menyediakan paket basic khusus UMKM dengan cicilan pembayaran yang fleksibel guna meringankan modal usaha Anda." }
    ]
  },
  "website-untuk-startup": {
    slug: "website-untuk-startup",
    title: "Website untuk Startup",
    keyword: "website untuk startup",
    seoTitle: "Jasa Pembuatan Website Startup Modern | Asterix Studio",
    metaDesc: "Buat website startup modern dengan performa Next.js / React, desain landing page futuristik, & dioptimasi untuk konversi registrasi / download.",
    h1: "Website untuk Startup Berkinerja Tinggi & Desain Futuristik",
    targetPersona: "Startup Founder, Product Owner",
    estimatedConversion: "10.0%",
    snippets: [
      "Visual modern dengan animasi micro-interaction halus untuk memukau calon investor.",
      "Kode bersih dengan performa Lighthouse mendekati 100/100 demi menunjang kenyamanan akses user.",
      "Mudah diintegrasikan dengan tracking analytics (Google Tag Manager, Mixpanel, Hotjar)."
    ],
    faqs: [
      { q: "Apakah bisa diintegrasikan dengan sistem backend buatan tim kami?", a: "Sangat bisa. Kami merancang front-end web yang dinamis sehingga dapat dengan mudah terhubung ke database API atau backend eksternal tim startup Anda." }
    ]
  }
};
