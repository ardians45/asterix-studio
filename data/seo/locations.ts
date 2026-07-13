// Target Locations Database for Local SEO & Programmatic Pages
// Focus: Jabodetabek Area & National Major Cities

export interface Area {
  name: string;
  slug: string;
}

export interface CityGroup {
  name: string;
  slug: string;
  areas: Area[];
}

export const locationData: CityGroup[] = [
  {
    name: "Tangerang Selatan",
    slug: "tangerang-selatan",
    areas: [
      { name: "Tangerang Selatan", slug: "tangerang-selatan" },
      { name: "BSD City", slug: "bsd" },
      { name: "Serpong", slug: "serpong" },
      { name: "Gading Serpong", slug: "gading-serpong" },
      { name: "Alam Sutera", slug: "alam-sutera" },
      { name: "Bintaro", slug: "bintaro" },
      { name: "Pamulang", slug: "pamulang" },
      { name: "Ciputat", slug: "ciputat" },
      { name: "Pondok Aren", slug: "pondok-aren" }
    ]
  },
  {
    name: "Jakarta",
    slug: "jakarta",
    areas: [
      { name: "Jakarta", slug: "jakarta" },
      { name: "Jakarta Selatan", slug: "jakarta-selatan" },
      { name: "Jakarta Barat", slug: "jakarta-barat" },
      { name: "Jakarta Pusat", slug: "jakarta-pusat" },
      { name: "Jakarta Timur", slug: "jakarta-timur" },
      { name: "Jakarta Utara", slug: "jakarta-utara" }
    ]
  },
  {
    name: "Tangerang",
    slug: "tangerang",
    areas: [
      { name: "Tangerang", slug: "tangerang" },
      { name: "Ciledug", slug: "ciledug" },
      { name: "Karawaci", slug: "karawaci" },
      { name: "Cikokol", slug: "cikokol" },
      { name: "Cipondoh", slug: "cipondoh" }
    ]
  },
  {
    name: "Bekasi",
    slug: "bekasi",
    areas: [
      { name: "Bekasi", slug: "bekasi" },
      { name: "Cikarang", slug: "cikarang" },
      { name: "Cibubur", slug: "cibubur" }
    ]
  },
  {
    name: "Depok",
    slug: "depok",
    areas: [
      { name: "Depok", slug: "depok" },
      { name: "Margonda", slug: "margonda" }
    ]
  },
  {
    name: "Bogor",
    slug: "bogor",
    areas: [
      { name: "Bogor", slug: "bogor" },
      { name: "Sentul", slug: "sentul" }
    ]
  },
  {
    name: "Bandung",
    slug: "bandung",
    areas: [
      { name: "Bandung", slug: "bandung" }
    ]
  },
  {
    name: "Surabaya",
    slug: "surabaya",
    areas: [
      { name: "Surabaya", slug: "surabaya" }
    ]
  },
  {
    name: "Indonesia",
    slug: "indonesia",
    areas: [
      { name: "Indonesia", slug: "indonesia" }
    ]
  }
];
