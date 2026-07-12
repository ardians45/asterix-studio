export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  initial: string;
  color: string;
  image?: string;
}

export interface Service {
  title: string;
  desc: string;
  img: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}
