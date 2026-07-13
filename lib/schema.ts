// Schema.org Structured Data Generators for Next.js (JSON-LD)

const BASE_URL = "https://www.asterixstudio.site";

export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Asterix Studio",
    "url": BASE_URL,
    "logo": `${BASE_URL}/logo-black.svg`,
    "description": "Asterix Studio adalah creative agency yang menyediakan jasa pembuatan website profesional, landing page konversi tinggi, & optimasi SEO lokal nasional berbasis Next.js.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Tangerang Selatan",
      "addressRegion": "Banten",
      "addressCountry": "ID"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+62-851-2948-8941",
      "contactType": "sales",
      "areaServed": "ID",
      "availableLanguage": "Indonesian"
    },
    "sameAs": [
      "https://github.com/ardians45/asterix-studio"
    ]
  };
}

export interface BreadcrumbItem {
  name: string;
  item: string;
}

export function getBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.item.startsWith("http") ? item.item : `${BASE_URL}${item.item}`
    }))
  };
}

export interface LocalBusinessParams {
  name: string;
  description: string;
  url: string;
  telephone?: string;
  city: string;
  region: string;
}

export function getLocalBusinessSchema(params: LocalBusinessParams) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": params.name,
    "description": params.description,
    "url": params.url,
    "telephone": params.telephone || "+62-851-2948-8941",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": params.city,
      "addressRegion": params.region,
      "addressCountry": "ID"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -6.2842,
      "longitude": 106.7067
    },
    "areaServed": [
      {
        "@type": "AdministrativeArea",
        "name": params.city
      },
      {
        "@type": "AdministrativeArea",
        "name": "Jabodetabek"
      },
      {
        "@type": "AdministrativeArea",
        "name": "Indonesia"
      }
    ]
  };
}

export interface FAQItem {
  q: string;
  a: string;
}

export function getFAQSchema(faqs: FAQItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  };
}

export interface ServiceParams {
  name: string;
  description: string;
  url: string;
}

export function getServiceSchema(params: ServiceParams) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Web Development",
    "provider": {
      "@type": "LocalBusiness",
      "name": "Asterix Studio",
      "url": BASE_URL,
      "logo": `${BASE_URL}/logo-black.svg`,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Tangerang Selatan",
        "addressRegion": "Banten",
        "addressCountry": "ID"
      }
    },
    "name": params.name,
    "description": params.description,
    "url": params.url,
    "areaServed": {
      "@type": "Country",
      "name": "Indonesia"
    }
  };
}

export interface ArticleParams {
  title: string;
  description: string;
  url: string;
  image: string;
  datePublished: string;
  authorName: string;
}

export function getArticleSchema(params: ArticleParams) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": params.title,
    "description": params.description,
    "image": params.image,
    "url": params.url,
    "datePublished": params.datePublished,
    "author": {
      "@type": "Organization",
      "name": params.authorName,
      "url": BASE_URL
    },
    "publisher": {
      "@type": "Organization",
      "name": "Asterix Studio",
      "logo": {
        "@type": "ImageObject",
        "url": `${BASE_URL}/logo-black.svg`
      }
    }
  };
}
