export interface BentoProjectDetail {
  id: string;
  title: string;
  client: string;
  category: string;
  description: string;
  mockupLaptop: string;
  mockupMobile: string;
  beforeImage: string;
  logoUrl: string;
  palette: string[];
  results: { label: string; value: string; detail: string }[];
}
