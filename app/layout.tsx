import type { Metadata } from "next";
import { Syne, Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

import { getOrganizationSchema } from "@/lib/schema";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import MetaPixel from "@/components/MetaPixel";
import LazyMotionProvider from "@/components/LazyMotionProvider";

export const metadata: Metadata = {
  metadataBase: new URL("https://asterixstudio.site"),
  title: "Asterix Studio | Jasa Pembuatan Website & Creative Agency",
  description: "Jasa pembuatan website profesional & berkinerja tinggi. Asterix Studio siap membantu pertumbuhan bisnis digital Anda.",
  keywords: ["Jasa Pembuatan Website", "Web Developer Indonesia", "Creative Agency", "Jasa Web Profesional", "Asterix Studio", "Web Design", "Desain Website", "Pembuatan Website Murah"],
  authors: [{ name: "Asterix Studio", url: "https://asterixstudio.site" }],
  creator: "Asterix Studio",
  publisher: "Asterix Studio",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Asterix Studio | Jasa Pembuatan Website & Creative Agency",
    description: "Jasa pembuatan website profesional & berkinerja tinggi. Asterix Studio siap membantu pertumbuhan bisnis digital Anda.",
    url: "https://asterixstudio.site",
    siteName: "Asterix Studio",
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Asterix Studio | Jasa Pembuatan Website & Creative Agency",
    description: "Jasa pembuatan website profesional & berkinerja tinggi. Asterix Studio siap membantu pertumbuhan bisnis digital Anda.",
  },
  icons: {
    icon: "/logo-white.svg",
    shortcut: "/logo-white.svg",
    apple: "/logo-white.svg",
  },
  verification: {
    google: "q6u15iK8lAlPYRDnnfTaN0JNyIaRYUSOb5Z0mhh545Y",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const orgSchema = getOrganizationSchema();
  
  return (
    <html lang="id">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <MetaPixel />
      </head>
      <body
        className={`${syne.variable} ${inter.variable} antialiased bg-black text-white`}
        suppressHydrationWarning
      >
        <LazyMotionProvider>
          <SmoothScroll>
            <Navbar />
            {children}
            <FloatingWhatsApp />
          </SmoothScroll>
        </LazyMotionProvider>
      </body>
    </html>
  );
}
