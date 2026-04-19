import type { Metadata } from "next";
import { Syne, Inter, Montserrat } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://asterixstudio.site"),
  title: "Asterix Studio | Jasa Pembuatan Website & Creative Agency",
  description: "Jasa pembuatan website profesional & berkinerja tinggi. Asterix Studio siap membantu pertumbuhan bisnis digital Anda.",
  keywords: ["Jasa Pembuatan Website", "Web Developer Indonesia", "Creative Agency", "Jasa Web Profesional", "Asterix Studio", "Web Design", "Desain Website", "Pembuatan Website Murah"],
  authors: [{ name: "Asterix Studio", url: "https://asterixstudio.id" }],
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
    icon: "/logo-black.svg",
    shortcut: "/logo-black.svg",
    apple: "/logo-black.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body
        className={`${syne.variable} ${inter.variable} ${montserrat.variable} antialiased bg-black text-white`}
        suppressHydrationWarning
      >
        <SmoothScroll>
          <Navbar />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
