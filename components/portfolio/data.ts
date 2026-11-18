export type Work = {
  title: string;
  kind: string;
  year: string;
  image: string;
  href: string;
  /** colour of the liquid blob behind the device on hover */
  blob: string;
  category: "web" | "ux" | "systems";
  impact?: string;
  summary?: string;
  chips?: string[];
  featured?: boolean;
  video?: string;
  poster?: string;
};

export const works: Work[] = [
  {
    title: "Race Lab · 20FIT",
    kind: "Race timing system · Node.js · Supabase",
    year: "2026",
    category: "systems",
    featured: true,
    image: "/portfolio/video/racelab-poster.webp",
    poster: "/portfolio/video/racelab-poster.webp",
    video: "/portfolio/video/racelab.mp4",
    href: "#journey",
    blob: "#111111",
    summary: "The race-day system behind 20FIT's hybrid race.",
    chips: ["Check-in", "Time chip", "Lap tracker", "Leaderboard", "Race photos"],
  },
  {
    title: "Paletindo",
    kind: "E-catalog · Next.js · SEO",
    year: "2025",
    image: "/portfolio/screens/paletindo.webp",
    href: "https://paletindo.id/",
    blob: "#2B59FF",
    category: "web",
    impact: "PageSpeed 100 · Google #1",
  },
  {
    title: "SR Laundry",
    kind: "Landing page · Local SEO",
    year: "2025",
    image: "/portfolio/screens/srlaundry.webp",
    href: "https://srlaundry.site/",
    blob: "#00B3A4",
    category: "web",
    impact: "+180% WhatsApp inquiries",
  },
  {
    title: "BANTU Platform",
    kind: "UI/UX case study",
    year: "2025",
    image: "/projects/bantu-platform/bantu.webp",
    href: "/projects/bantu-platform",
    blob: "#FF5A1F",
    category: "ux",
  },
  {
    title: "CareerConnect",
    kind: "Web platform · React",
    year: "2025",
    image: "/projects/career-connect/careerconnect-hero.webp",
    href: "/projects/career-connect",
    blob: "#FF3D7F",
    category: "web",
  },
  {
    title: "Greenify",
    kind: "UI/UX case study",
    year: "2025",
    image: "/projects/greenify/thumbnail.webp",
    href: "/projects/greenify",
    blob: "#22C55E",
    category: "ux",
  },
  {
    title: "LinkAja Kas",
    kind: "UI/UX · 2nd place MIA",
    year: "2025",
    image: "/projects/link-aja-kas/thumbnail.webp",
    href: "/projects/link-aja-kas",
    blob: "#E4002B",
    category: "ux",
  },
  {
    title: "GoGo Groceries",
    kind: "Quick-commerce app",
    year: "2025",
    image: "/projects/gogo-groceries/thumbnail.webp",
    href: "/projects/gogo-groceries",
    blob: "#FF8A00",
    category: "ux",
  },
  {
    title: "Cactastic",
    kind: "E-commerce · AI plant ID",
    year: "2025",
    image: "/projects/cactastic/cactastic.webp",
    href: "/projects/cactastic",
    blob: "#0EA5E9",
    category: "web",
  },
  {
    title: "3D Tetris Grunge",
    kind: "Three.js game",
    year: "2025",
    image: "/projects/3d-tetris-grunge/tetris1.webp",
    href: "/projects/3d-tetris-grunge",
    blob: "#111111",
    category: "systems",
  },
];

export const achievements = [
  {
    year: "2026",
    title: "3rd place, Ramadan PRADA",
    org: "Telkom University",
    note: "Human-centred app concept for daily life during the fasting month.",
    image: "/achievement/prada.png",
  },
  {
    year: "2026",
    title: "Progressive Scholarship, full-stack",
    org: "Dicoding × DBS Foundation",
    note: "Selected for the full-stack track of Coding Camp 2026, a national programme.",
    image: "/certificates/dicoding-placeholder.webp",
  },
  {
    year: "2025",
    title: "2nd place, MIA UI/UX",
    org: "National, 200+ teams",
    note: "LinkAja Kas: clearer money management for group transactions.",
    image: "/achievement/mia3.webp",
  },
  {
    year: "2025",
    title: "Top web designer intern",
    org: "BANTU, batch 1",
    note: "Landing page, corporate site and dashboard; a design system that cut handoff time 20%.",
    image: "/achievement/bantu.webp",
  },
  {
    year: "2025",
    title: "Project lead, PKM",
    org: "Community service programme",
    note: "Concept, architecture, UI and the full-stack build, end to end.",
    image: "/achievement/pkm.webp",
  },
  {
    year: "2025",
    title: "Dies Natalis HIMTIF",
    org: "Universitas Pamulang",
    note: "UI/UX design competition entry.",
    image: "/achievement/diesnatalis.png",
  },
];

export type Chapter = {
  id: string;
  split: string;
  years: string;
  lap: string;
  title: string;
  body: string;
  photos: { src?: string; label: string }[];
};

export const journey: Chapter[] = [
  {
    id: "s1",
    split: "S1",
    years: "2019–2021",
    lap: "Start line",
    title: "Software engineering, then the real world",
    body: "SMK Negeri 2 Karanganyar, software engineering. Internships in digital content and events, then a 280-hour office competency programme with Kemnaker's SIAPkerja, certified.",
    photos: [
      { src: "/portfolio/journey/s1-smk.webp", label: "SMK Negeri 2 Karanganyar" },
      { src: "/portfolio/journey/s1-kusuma.webp", label: "Digital content & events internship" },
      { src: "/portfolio/journey/s1-siapkerja.webp", label: "SIAPkerja · 280 hours" },
    ],
  },
  {
    id: "s2",
    split: "S2",
    years: "2023–2024",
    lap: "Lap one",
    title: "An informatics degree and the first clients",
    body: "Informatics engineering at Universitas Pamulang, GPA 3.57. Asterix Studio from December 2023: websites designed, built and shipped end to end, plus the ads that send them traffic.",
    photos: [
      { src: "/portfolio/journey/s2-unpam.webp", label: "Universitas Pamulang" },
      { src: "/portfolio/screens/srlaundry.webp", label: "Asterix Studio · first clients" },
    ],
  },
  {
    id: "s3",
    split: "S3",
    years: "2025",
    lap: "Lap two",
    title: "Top intern and a national podium",
    body: "Top intern of batch 1 at PT Kita Bantu Indonesia, designing three core products in Figma. 2nd place at the MIA UI/UX competition, top 3 of 200+ teams.",
    photos: [
      { src: "/achievement/bantu.webp", label: "Top intern · BANTU" },
      { src: "/achievement/mia3.webp", label: "2nd place · MIA UI/UX" },
      { src: "/achievement/mia1.webp", label: "MIA finals" },
    ],
  },
  {
    id: "s4",
    split: "S4",
    years: "2026",
    lap: "Lap three",
    title: "Systems that run on race day",
    body: "Race timing developer at 20FIT, streaming RFID reads to live results. Full-stack contract at PT Paletindo: the product e-catalog and internal tools. 3rd place at PRADA UI/UX and a Dicoding full-stack scholarship.",
    photos: [
      { src: "/portfolio/video/racelab-poster.webp", label: "Race timing · 20FIT" },
      { src: "/portfolio/screens/paletindo.webp", label: "Paletindo e-catalog" },
      { src: "/achievement/prada.png", label: "3rd place · PRADA" },
      { src: "/certificates/dicoding-placeholder.webp", label: "Dicoding scholarship" },
    ],
  },
];

export const journeyFinish = {
  split: "∞",
  years: "Now",
  lap: "Still running",
  title: "No finish line",
  body: "Every project adds a lap. The next one could be yours.",
  primary: { label: "Start a project", href: "#contact" },
  secondary: { label: "See the work", href: "#work" },
};

export const isExternal =(href: string) => /^https?:\/\//.test(href);
