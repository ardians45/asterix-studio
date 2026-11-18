export type Work = {
  title: string;
  kind: string;
  year: string;
  image: string;
  href: string;
  /** colour of the liquid blob behind the device on hover */
  blob: string;
  impact?: string;
};

export const works: Work[] = [
  {
    title: "Paletindo",
    kind: "E-catalog · Next.js · SEO",
    year: "2025",
    image: "/portfolio/screens/paletindo.webp",
    href: "https://paletindo.id/",
    blob: "#2B59FF",
    impact: "PageSpeed 100 · Google #1",
  },
  {
    title: "SR Laundry",
    kind: "Landing page · Local SEO",
    year: "2025",
    image: "/portfolio/screens/srlaundry.webp",
    href: "https://srlaundry.site/",
    blob: "#00B3A4",
    impact: "+180% WhatsApp inquiries",
  },
  {
    title: "BANTU Platform",
    kind: "UI/UX case study",
    year: "2025",
    image: "/projects/bantu-platform/bantu.webp",
    href: "/projects/bantu-platform",
    blob: "#FF5A1F",
  },
  {
    title: "CareerConnect",
    kind: "Web platform · React",
    year: "2025",
    image: "/projects/career-connect/cc1.webp",
    href: "/projects/career-connect",
    blob: "#FF3D7F",
  },
  {
    title: "Greenify",
    kind: "UI/UX case study",
    year: "2025",
    image: "/projects/greenify/thumbnail.webp",
    href: "/projects/greenify",
    blob: "#22C55E",
  },
  {
    title: "LinkAja Kas",
    kind: "UI/UX · 2nd place MIA",
    year: "2025",
    image: "/projects/link-aja-kas/thumbnail.webp",
    href: "/projects/link-aja-kas",
    blob: "#E4002B",
  },
  {
    title: "GoGo Groceries",
    kind: "Quick-commerce app",
    year: "2025",
    image: "/projects/gogo-groceries/thumbnail.webp",
    href: "/projects/gogo-groceries",
    blob: "#FF8A00",
  },
  {
    title: "Cactastic",
    kind: "E-commerce · AI plant ID",
    year: "2025",
    image: "/projects/cactastic/cactastic.webp",
    href: "/projects/cactastic",
    blob: "#0EA5E9",
  },
  {
    title: "3D Tetris Grunge",
    kind: "Three.js game",
    year: "2025",
    image: "/projects/3d-tetris-grunge/tetris1.webp",
    href: "/projects/3d-tetris-grunge",
    blob: "#111111",
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
};

export const journey: Chapter[] = [
  {
    id: "s1",
    split: "S1",
    years: "2019–2021",
    lap: "Start line",
    title: "Software engineering, then the real world",
    body: "SMK Negeri 2 Karanganyar, software engineering. Internships in digital content and events, then a 280-hour office competency programme with Kemnaker's SIAPkerja, certified.",
  },
  {
    id: "s2",
    split: "S2",
    years: "2023–2024",
    lap: "Lap one",
    title: "An informatics degree and the first clients",
    body: "Informatics engineering at Universitas Pamulang, GPA 3.57. Asterix Studio from December 2023: websites designed, built and shipped end to end, plus the ads that send them traffic.",
  },
  {
    id: "s3",
    split: "S3",
    years: "2025",
    lap: "Lap two",
    title: "Top intern and a national podium",
    body: "Top intern of batch 1 at PT Kita Bantu Indonesia, designing three core products in Figma. 2nd place at the MIA UI/UX competition, top 3 of 200+ teams.",
  },
  {
    id: "s4",
    split: "S4",
    years: "2026",
    lap: "Lap three",
    title: "Systems that run on race day",
    body: "Race timing developer at 20FIT, streaming RFID reads to live results. Full-stack contract at PT Paletindo: the product e-catalog and internal tools. 3rd place at PRADA UI/UX and a Dicoding full-stack scholarship.",
  },
];

export const journeyFinish = {
  split: "FIN",
  years: "Now",
  lap: "Finish line",
  title: "Next split: your project",
  body: "Design, build and SEO from one desk. Tell me what you're racing toward.",
  primary: { label: "Start a project", href: "#contact" },
  secondary: { label: "See the work", href: "#work" },
};

export const isExternal =(href: string) => /^https?:\/\//.test(href);
