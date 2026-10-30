"use client";

import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import {
  FaArrowLeft,
  FaArrowRight,
  FaClock,
  FaTag,
  FaWhatsapp,
  FaLink,
  FaCalendarAlt,
  FaUserGraduate,
  FaCheck,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import B2BFooter from "@/components/sections/b2b/B2BFooter";
import { formatIndonesianDate, getCategoryTheme } from "@/lib/blogUtils";

export default function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = React.use(params);
  const slug = resolvedParams.slug;
  const [post, setPost] = useState<any>(null);
  const [relatedPosts, setRelatedPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Track scroll progress for reading progress bar
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!slug) return;
        const res = await fetch(`/api/blog/by-slug/${slug}`, {
          cache: "no-store",
        });
        const data = await res.json();
        setPost(data.error ? null : data);

        const relRes = await fetch("/api/blog");
        const relData = await relRes.json();
        if (Array.isArray(relData)) {
          // Find posts in the same category first, then other categories
          const sameCat = relData.filter(
            (p: any) => p.slug !== slug && p.category === data.category
          );
          const otherCat = relData.filter(
            (p: any) => p.slug !== slug && p.category !== data.category
          );
          const combined = [...sameCat, ...otherCat].slice(0, 3);
          setRelatedPosts(combined);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (slug) fetchData();
  }, [slug]);

  useEffect(() => {
    if (post?.title) {
      document.title = `${post.title} | Asterix Studio Blog`;
    }
  }, [post]);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  const shareWhatsApp = () => {
    if (typeof window !== "undefined") {
      const text = `Baca artikel menarik: "${post?.title}"\n${window.location.href}`;
      window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
    }
  };

  const shareTwitter = () => {
    if (typeof window !== "undefined") {
      const text = `"${post?.title}" oleh ${post?.author}`;
      window.open(
        `https://twitter.com/intent/tweet?text=${encodeURIComponent(
          text
        )}&url=${encodeURIComponent(window.location.href)}`,
        "_blank"
      );
    }
  };

  const shareLinkedIn = () => {
    if (typeof window !== "undefined") {
      window.open(
        `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
          window.location.href
        )}`,
        "_blank"
      );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] flex flex-col items-center justify-center gap-4">
        <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-sm font-semibold text-slate-500">Memuat artikel...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-[#F8F9FA] flex items-center justify-center px-6 pt-24 pb-20">
          <div className="text-center max-w-md mx-auto">
            <div className="text-[90px] font-black text-slate-900/10 leading-none mb-2">
              404
            </div>
            <h1 className="text-3xl font-black text-slate-900 mb-3 tracking-tight">
              Artikel Tidak Ditemukan
            </h1>
            <p className="text-slate-500 font-medium mb-8 text-sm">
              Maaf, artikel yang Anda cari tidak tersedia atau URL slug telah berubah.
            </p>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 bg-slate-900 text-white px-8 py-3.5 rounded-full text-xs font-black uppercase tracking-wider hover:bg-slate-800 transition-all shadow-lg"
            >
              <FaArrowLeft className="text-xs" />
              Kembali ke Blog
            </Link>
          </div>
        </main>
        <B2BFooter />
      </>
    );
  }

  const theme = getCategoryTheme(post.category);
  const isArdian = post.author?.toLowerCase().includes("ardian");

  return (
    <>
      {/* Top Reading Progress Bar */}
      <div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-600 z-[100] transition-all duration-150"
        style={{ width: `${scrollProgress}%` }}
      />

      <Navbar />

      <main className="min-h-screen bg-[#F8F9FA] selection:bg-emerald-200 selection:text-emerald-900 pt-28 md:pt-36 pb-24">
        {/* Subtle Ambient Background Gradient */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute -top-[10%] -right-[10%] w-[40%] h-[40%] bg-emerald-100/20 blur-[130px] rounded-full"></div>
          <div className="absolute bottom-[20%] -left-[10%] w-[35%] h-[40%] bg-sky-100/20 blur-[130px] rounded-full"></div>
        </div>

        <div className="relative z-10">
          {/* Breadcrumb & Back Navigation */}
          <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-8">
            <motion.div
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="flex items-center justify-between"
            >
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 text-xs sm:text-sm font-bold transition-colors group"
              >
                <FaArrowLeft className="text-[10px] sm:text-xs group-hover:-translate-x-1 transition-transform" />
                Kembali ke Semua Artikel
              </Link>

              <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-slate-400">
                <Link href="/" className="hover:text-slate-600">Beranda</Link>
                <span>/</span>
                <Link href="/blog" className="hover:text-slate-600">Blog</Link>
                <span>/</span>
                <span className="text-slate-700 truncate max-w-[200px]">
                  {post.category}
                </span>
              </div>
            </motion.div>
          </div>

          {/* Article Header */}
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto px-4 sm:px-6 mb-8"
          >
            {/* Meta Tags */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-5">
              <span
                className={`flex items-center gap-1.5 text-[10px] font-black py-1.5 px-3 rounded-lg tracking-wider uppercase shadow-sm ${theme.badge}`}
              >
                <FaTag className="text-[8px]" />
                {post.category}
              </span>
              <span className="flex items-center gap-1.5 text-xs font-bold text-slate-500 bg-white border border-slate-200/80 py-1.5 px-3 rounded-lg">
                <FaCalendarAlt className="text-slate-400 text-[11px]" />
                {formatIndonesianDate(post.publishedAt)}
              </span>
              <span className="flex items-center gap-1.5 text-xs font-bold text-slate-500 bg-white border border-slate-200/80 py-1.5 px-3 rounded-lg">
                <FaClock className="text-emerald-500 text-[11px]" />
                {post.readTime}
              </span>
            </div>

            {/* Main Title */}
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-[1.2] mb-6">
              {post.title}
            </h1>

            {/* Author Bar & Share Icons */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 py-5 border-y border-slate-200 bg-white/60 backdrop-blur-sm rounded-2xl px-5 shadow-xs">
              {/* Author Info */}
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center font-black text-base shadow-md shadow-emerald-500/20">
                  {post.author?.charAt(0) || "A"}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-black text-slate-900">
                      {post.author}
                    </p>
                    <span className="text-[10px] font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                      Penulis
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 font-medium flex items-center gap-1.5 mt-0.5">
                    <FaUserGraduate className="text-[10px] text-emerald-600" />
                    {post.authorRole || (isArdian ? "Mahasiswa Teknik Informatika, Universitas Pamulang" : "Asterix Studio Agency")}
                  </p>
                </div>
              </div>

              {/* Share Buttons */}
              <div className="flex items-center gap-2 self-end sm:self-auto">
                <span className="text-xs font-bold text-slate-400 mr-1 hidden sm:inline">
                  Bagikan:
                </span>
                <button
                  onClick={shareWhatsApp}
                  className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 hover:bg-emerald-500 hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-xs"
                  title="Bagikan via WhatsApp"
                >
                  <FaWhatsapp className="text-sm" />
                </button>
                <button
                  onClick={shareTwitter}
                  className="w-9 h-9 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-900 hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-xs"
                  title="Bagikan ke X / Twitter"
                >
                  <FaTwitter className="text-xs" />
                </button>
                <button
                  onClick={shareLinkedIn}
                  className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-xs"
                  title="Bagikan ke LinkedIn"
                >
                  <FaLinkedinIn className="text-xs" />
                </button>
                <button
                  onClick={handleCopyLink}
                  className={`px-3 h-9 rounded-xl flex items-center gap-1.5 text-xs font-bold transition-all cursor-pointer shadow-xs ${
                    copied
                      ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/20"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                  title="Salin Tautan"
                >
                  {copied ? (
                    <>
                      <FaCheck className="text-[11px]" />
                      <span>Tersalin!</span>
                    </>
                  ) : (
                    <>
                      <FaLink className="text-[11px]" />
                      <span className="hidden sm:inline">Salin Link</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.header>

          {/* Featured Cover Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.7 }}
            className="max-w-4xl mx-auto px-4 sm:px-6 mb-12"
          >
            <div className="aspect-[16/9] md:aspect-[21/10] rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-slate-100 relative">
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Article Body Content */}
          <motion.article
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="max-w-3xl mx-auto px-4 sm:px-6 mb-16"
          >
            <div
              className="prose prose-base sm:prose-lg prose-slate max-w-none
                prose-headings:font-black prose-headings:tracking-tight prose-headings:text-slate-900
                prose-h2:text-2xl sm:prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-5 prose-h2:pb-2 prose-h2:border-b prose-h2:border-slate-100
                prose-h3:text-xl sm:prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-3
                prose-p:text-slate-700 prose-p:leading-[1.85] prose-p:font-normal prose-p:text-[15px] sm:prose-p:text-[17px]
                prose-li:text-slate-700 prose-li:font-normal prose-li:leading-[1.75] prose-li:text-[15px] sm:prose-li:text-[17px]
                prose-strong:text-slate-900 prose-strong:font-bold
                prose-em:text-slate-600
                prose-ul:space-y-3 prose-ul:my-6
                prose-ol:space-y-3 prose-ol:my-6
                prose-blockquote:border-l-4 prose-blockquote:border-emerald-500 prose-blockquote:bg-emerald-50/60 prose-blockquote:py-3 prose-blockquote:px-5 prose-blockquote:rounded-r-2xl prose-blockquote:italic prose-blockquote:text-slate-700
                prose-a:text-emerald-600 prose-a:font-bold prose-a:no-underline hover:prose-a:underline
                prose-img:rounded-2xl prose-img:shadow-md
                prose-table:text-sm prose-table:my-8
                prose-th:bg-slate-900 prose-th:text-white prose-th:font-bold prose-th:py-3.5 prose-th:px-4 prose-th:text-left prose-th:rounded-t-lg
                prose-td:py-3 prose-td:px-4 prose-td:border-b prose-td:border-slate-100
              "
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Tags Section */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-12 pt-6 border-t border-slate-200">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold text-slate-400 mr-2">
                    Tag Terkait:
                  </span>
                  {post.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="text-xs font-semibold text-slate-700 bg-white border border-slate-200 py-1 px-3 rounded-full hover:border-emerald-400 hover:text-emerald-600 transition-colors"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Author Bio Box */}
            <div className="mt-12 p-6 sm:p-8 bg-white rounded-3xl border border-slate-200/80 shadow-sm flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center font-black text-2xl shadow-md shrink-0">
                {post.author?.charAt(0) || "A"}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="text-base font-black text-slate-900">
                    {post.author}
                  </h4>
                  <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                    Penulis Konten
                  </span>
                </div>
                <p className="text-xs font-bold text-emerald-600 mb-2">
                  {post.authorRole || (isArdian ? "Mahasiswa Teknik Informatika, Universitas Pamulang" : "Asterix Studio Agency")}
                </p>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {isArdian
                    ? "Ardian Setiawan adalah mahasiswa Teknik Informatika di Universitas Pamulang yang aktif mendalami topik etika komputasi, literasi digital masyarakat, rekayasa web modern, dan keamanan informasi."
                    : "Asterix Studio adalah studio pengembangan website dan solusi digital modern yang membantu bisnis dan UMKM tumbuh pesat melalui website berkinerja tinggi dan teroptimasi SEO."}
                </p>
              </div>
            </div>
          </motion.article>

          {/* Post Action CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="max-w-3xl mx-auto px-4 sm:px-6 mb-20"
          >
            <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden border border-slate-800 shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/15 to-transparent"></div>
              <div className="relative z-10">
                <span className="inline-block py-1 px-3 bg-emerald-500/20 text-emerald-300 rounded-full text-[10px] font-black uppercase tracking-widest mb-3">
                  Konsultasi Asterix Studio
                </span>
                <h3 className="text-xl sm:text-3xl font-black text-white tracking-tight mb-3">
                  Ingin Membangun Website Bisnis Profesional?
                </h3>
                <p className="text-slate-400 font-medium mb-8 text-xs sm:text-sm max-w-lg mx-auto leading-relaxed">
                  Konsultasikan kebutuhan website, landing page, atau transformasi digital bisnis Anda bersama tim Asterix Studio secara gratis.
                </p>
                <Link
                  href="https://wa.me/6285129488941?text=Halo%20Asterix%20Studio,%20saya%20tertarik%20konsultasi%20website%20setelah%20membaca%20artikel%20blog."
                  target="_blank"
                  className="inline-flex items-center gap-2.5 bg-emerald-500 text-white px-8 py-3.5 rounded-full text-xs sm:text-sm font-black tracking-wider hover:bg-emerald-400 transition-all duration-300 shadow-lg shadow-emerald-500/25 cursor-pointer"
                >
                  <FaWhatsapp className="text-base" />
                  Konsultasi via WhatsApp
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Related Articles Section */}
          {relatedPosts.length > 0 && (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 border-t border-slate-200">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                    Artikel Terkait Lainnya
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 font-medium">
                    Jelajahi wawasan menarik lainnya seputar dunia digital dan teknologi
                  </p>
                </div>
                <Link
                  href="/blog"
                  className="text-xs sm:text-sm font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
                >
                  Lihat Semua
                  <FaArrowRight className="text-[10px]" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((rel, idx) => {
                  const relTheme = getCategoryTheme(rel.category);
                  return (
                    <motion.div
                      key={rel.slug}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * idx, duration: 0.5 }}
                    >
                      <Link href={`/blog/${rel.slug}`} className="group block h-full">
                        <article className="flex flex-col h-full bg-white rounded-3xl overflow-hidden shadow-xs border border-slate-200/80 hover:border-slate-300 transition-all duration-400 hover:shadow-md hover:-translate-y-1">
                          <div className="aspect-[16/10] overflow-hidden bg-slate-100">
                            <img
                              src={rel.coverImage}
                              alt={rel.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-600"
                              loading="lazy"
                            />
                          </div>
                          <div className="flex flex-col flex-1 p-6">
                            <span
                              className={`text-[9px] font-black py-1 px-2.5 rounded-md tracking-wider uppercase self-start mb-3 ${relTheme.badge}`}
                            >
                              {rel.category}
                            </span>
                            <h3 className="text-base font-black text-slate-900 tracking-tight leading-snug mb-3 group-hover:text-emerald-600 transition-colors line-clamp-2">
                              {rel.title}
                            </h3>
                            <p className="text-xs text-slate-500 leading-relaxed mb-4 flex-1 line-clamp-2">
                              {rel.excerpt}
                            </p>
                            <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-100 text-[11px] text-slate-400 font-bold">
                              <span>{formatIndonesianDate(rel.publishedAt)}</span>
                              <div className="w-7 h-7 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white text-slate-400 transition-all">
                                <FaArrowRight className="text-[9px]" />
                              </div>
                            </div>
                          </div>
                        </article>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </main>
      <B2BFooter />
    </>
  );
}
