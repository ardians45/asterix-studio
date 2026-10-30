"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useMemo } from "react";
import {
  FaArrowRight,
  FaClock,
  FaTag,
  FaSearch,
  FaTimes,
  FaCalendarAlt,
  FaUserGraduate,
} from "react-icons/fa";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import B2BFooter from "@/components/sections/b2b/B2BFooter";
import { blogCategories } from "@/data/blogPosts";
import { formatIndonesianDate, getCategoryTheme, isRecentArticle } from "@/lib/blogUtils";

export default function BlogPage() {
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/blog");
        const data = await res.json();
        // Sort descending by publishedAt
        const sorted = Array.isArray(data)
          ? [...data].sort(
              (a, b) =>
                new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
            )
          : [];
        setBlogPosts(sorted);
      } catch (err) {
        console.error("Failed to fetch posts", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  // Compute category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { Semua: blogPosts.length };
    blogPosts.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }, [blogPosts]);

  // Filtered posts based on category and search query
  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchesCategory =
        activeCategory === "Semua" || post.category === activeCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        post.title?.toLowerCase().includes(q) ||
        post.excerpt?.toLowerCase().includes(q) ||
        post.author?.toLowerCase().includes(q) ||
        post.category?.toLowerCase().includes(q) ||
        post.tags?.some((t: string) => t.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [blogPosts, activeCategory, searchQuery]);

  // Featured post is the first article if showing "Semua" and not searching
  const isDefaultView = activeCategory === "Semua" && !searchQuery.trim();
  const featuredPost = isDefaultView ? filteredPosts[0] : null;
  const gridPosts = isDefaultView ? filteredPosts.slice(1) : filteredPosts;

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#F8F9FA] selection:bg-emerald-200 selection:text-emerald-900 pt-28 md:pt-36 pb-24 px-4 sm:px-6 lg:px-8">
        {/* Subtle Ambient Background Gradients */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute -top-[10%] -right-[10%] w-[45%] h-[45%] bg-emerald-100/25 blur-[130px] rounded-full"></div>
          <div className="absolute bottom-[10%] -left-[10%] w-[35%] h-[45%] bg-sky-100/25 blur-[130px] rounded-full"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 py-1.5 px-4 bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-full text-[11px] font-black tracking-[0.2em] text-slate-700 uppercase mb-6 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Insights, Opini & Edukasi Digital
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-slate-900 leading-[1.05] tracking-tight mb-6">
              BLOG <span className="text-emerald-500">&</span> INSIGHTS
            </h1>

            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto font-medium leading-relaxed">
              Kumpulan artikel terkini seputar etika digital, perkembangan teknologi informasi,
              UI/UX modern, keamanan siber, dan strategi pertumbuhan bisnis digital.
            </p>
          </motion.div>

          {/* Search & Filter Controls */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="max-w-3xl mx-auto mb-10"
          >
            {/* Search Input */}
            <div className="relative mb-6">
              <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-400">
                <FaSearch className="text-sm" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari topik artikel, kata kunci, atau penulis..."
                className="w-full pl-12 pr-12 py-4 bg-white rounded-2xl border border-slate-200 text-slate-800 placeholder-slate-400 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 shadow-sm transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute inset-y-0 right-0 pr-5 flex items-center text-slate-400 hover:text-slate-700 transition-colors"
                >
                  <FaTimes className="text-sm" />
                </button>
              )}
            </div>

            {/* Category Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none justify-start sm:justify-center flex-wrap">
              {blogCategories.map((cat) => {
                const count = categoryCounts[cat] || 0;
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`py-2 px-4 rounded-full text-xs font-bold tracking-wide transition-all duration-200 cursor-pointer flex items-center gap-2 whitespace-nowrap ${
                      isActive
                        ? "bg-slate-900 text-white shadow-md shadow-slate-900/15"
                        : "bg-white text-slate-600 border border-slate-200/80 hover:border-slate-300 hover:bg-slate-50"
                    }`}
                  >
                    <span>{cat}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                        isActive
                          ? "bg-white/20 text-white"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* Loader */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-28 gap-4">
              <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-sm font-semibold text-slate-400">Memuat artikel...</p>
            </div>
          )}

          {/* Featured Post (Hero Spotlight for Today's / Latest Post) */}
          {!loading && featuredPost && (
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.7 }}
              className="mb-14"
            >
              <Link href={`/blog/${featuredPost.slug}`} className="group block">
                <div className="relative bg-white rounded-3xl md:rounded-[40px] overflow-hidden shadow-[0_4px_25px_rgba(0,0,0,0.05)] border-2 border-white hover:border-emerald-300 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(16,185,129,0.12)]">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                    {/* Image Column */}
                    <div className="lg:col-span-7 aspect-[16/10] lg:aspect-auto overflow-hidden relative min-h-[280px] lg:min-h-[420px]">
                      <img
                        src={featuredPost.coverImage}
                        alt={featuredPost.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent lg:hidden" />
                      <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-10">
                        {isRecentArticle(featuredPost.publishedAt) && (
                          <span className="flex items-center gap-1.5 text-[11px] font-black text-white bg-gradient-to-r from-emerald-500 to-teal-600 py-1.5 px-3.5 rounded-full tracking-wider uppercase shadow-md">
                            <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
                            Artikel Terbaru
                          </span>
                        )}
                        <span className="text-[11px] font-black text-slate-900 bg-white/95 backdrop-blur-md py-1.5 px-3 rounded-full tracking-wider uppercase shadow-sm">
                          {featuredPost.category}
                        </span>
                      </div>
                    </div>

                    {/* Content Column */}
                    <div className="lg:col-span-5 p-8 sm:p-10 lg:p-12 flex flex-col justify-between bg-white">
                      <div>
                        <div className="hidden lg:flex items-center gap-2 mb-4">
                          {isRecentArticle(featuredPost.publishedAt) && (
                            <span className="text-[10px] font-black text-white bg-emerald-500 py-1 px-2.5 rounded-md tracking-wider uppercase">
                              Terbaru
                            </span>
                          )}
                          <span className="text-[10px] font-black text-emerald-700 bg-emerald-50 py-1 px-2.5 rounded-md tracking-wider uppercase">
                            {featuredPost.category}
                          </span>
                        </div>

                        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-snug mb-4 group-hover:text-emerald-600 transition-colors duration-300">
                          {featuredPost.title}
                        </h2>

                        <p className="text-slate-600 font-medium leading-relaxed mb-6 text-sm sm:text-base line-clamp-3">
                          {featuredPost.excerpt}
                        </p>
                      </div>

                      <div>
                        {/* Author info pill */}
                        <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-100 mb-6">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center font-black text-sm shadow-sm">
                            {featuredPost.author?.charAt(0) || "A"}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-bold text-slate-900 truncate">
                              {featuredPost.author}
                            </p>
                            <p className="text-[10px] text-slate-500 truncate flex items-center gap-1 font-medium">
                              <FaUserGraduate className="text-[9px] text-emerald-600" />
                              {featuredPost.authorRole || "Kontributor"}
                            </p>
                          </div>
                        </div>

                        {/* Meta & CTA */}
                        <div className="flex items-center justify-between text-xs font-bold text-slate-500 pt-3 border-t border-slate-100">
                          <div className="flex items-center gap-4">
                            <span className="flex items-center gap-1.5">
                              <FaClock className="text-emerald-500 text-[11px]" />
                              {featuredPost.readTime}
                            </span>
                            <span className="flex items-center gap-1.5">
                              <FaCalendarAlt className="text-slate-400 text-[10px]" />
                              {formatIndonesianDate(featuredPost.publishedAt)}
                            </span>
                          </div>

                          <div className="flex items-center gap-1.5 text-emerald-600 font-black group-hover:gap-2.5 transition-all duration-300">
                            Baca Artikel
                            <FaArrowRight className="text-[11px]" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          )}

          {/* Search result indicator */}
          {!loading && searchQuery && (
            <div className="mb-6 flex items-center justify-between text-sm font-semibold text-slate-600">
              <p>
                Ditemukan <span className="text-emerald-600 font-bold">{filteredPosts.length}</span> artikel untuk kata kunci "{searchQuery}"
              </p>
              <button
                onClick={() => setSearchQuery("")}
                className="text-xs text-emerald-600 hover:underline font-bold"
              >
                Reset Pencarian
              </button>
            </div>
          )}

          {/* Article Grid */}
          {!loading && gridPosts.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              {gridPosts.map((post, idx) => {
                const theme = getCategoryTheme(post.category);
                const isNew = isRecentArticle(post.publishedAt);
                return (
                  <motion.div
                    key={post.slug}
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * Math.min(idx, 8), duration: 0.5 }}
                  >
                    <Link href={`/blog/${post.slug}`} className="group block h-full">
                      <article className="flex flex-col h-full bg-white rounded-3xl overflow-hidden shadow-[0_3px_20px_rgba(0,0,0,0.03)] border-2 border-white hover:border-slate-200 transition-all duration-500 hover:shadow-[0_15px_35px_rgba(0,0,0,0.08)] hover:-translate-y-1">
                        {/* Cover Image Container */}
                        <div className="aspect-[16/10] overflow-hidden relative bg-slate-100">
                          <img
                            src={post.coverImage}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            loading="lazy"
                          />
                          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                            <span
                              className={`flex items-center gap-1 text-[10px] font-black py-1 px-2.5 rounded-lg tracking-wider uppercase shadow-sm ${theme.badge}`}
                            >
                              <FaTag className="text-[8px]" />
                              {post.category}
                            </span>
                            {isNew && (
                              <span className="text-[10px] font-black text-white bg-emerald-500 py-1 px-2 rounded-lg tracking-wider uppercase shadow-sm">
                                Baru
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Card Body */}
                        <div className="flex flex-col flex-1 p-6 sm:p-7">
                          {/* Title */}
                          <h3 className="text-lg font-black text-slate-900 tracking-tight leading-snug mb-3 group-hover:text-emerald-600 transition-colors duration-300 line-clamp-2">
                            {post.title}
                          </h3>

                          {/* Excerpt */}
                          <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed mb-6 flex-1 line-clamp-3">
                            {post.excerpt}
                          </p>

                          {/* Author & Meta */}
                          <div className="pt-4 border-t border-slate-100">
                            <div className="flex items-center justify-between text-[11px] text-slate-500 font-bold mb-3">
                              <span className="truncate max-w-[150px] text-slate-800">
                                {post.author}
                              </span>
                              <span className="flex items-center gap-1 text-slate-400">
                                <FaCalendarAlt className="text-[9px]" />
                                {formatIndonesianDate(post.publishedAt)}
                              </span>
                            </div>

                            <div className="flex items-center justify-between">
                              <span className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500">
                                <FaClock className="text-emerald-500 text-[10px]" />
                                {post.readTime}
                              </span>

                              <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white text-slate-400 transition-all duration-300">
                                <FaArrowRight className="text-[10px]" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </article>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          )}

          {/* Empty State */}
          {!loading && filteredPosts.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20 bg-white rounded-3xl border border-slate-200 p-8"
            >
              <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-4 text-xl">
                <FaSearch />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Tidak ada artikel yang ditemukan
              </h3>
              <p className="text-slate-500 text-sm max-w-md mx-auto mb-6">
                Tidak ada artikel yang cocok dengan filter atau kata kunci pencarian Anda. Silakan coba kata kunci lain.
              </p>
              <button
                onClick={() => {
                  setActiveCategory("Semua");
                  setSearchQuery("");
                }}
                className="py-2.5 px-6 rounded-full bg-slate-900 text-white text-xs font-black hover:bg-slate-800 transition-all cursor-pointer shadow-md"
              >
                Reset Semua Filter
              </button>
            </motion.div>
          )}

          {/* Consultation CTA Banner */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-20 text-center"
          >
            <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 rounded-3xl md:rounded-[48px] p-8 sm:p-12 md:p-16 relative overflow-hidden border border-slate-800 shadow-2xl">
              <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-sky-500/10 rounded-full blur-[100px] pointer-events-none"></div>

              <div className="relative z-10 max-w-2xl mx-auto">
                <span className="inline-block py-1 px-3 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full text-[10px] font-black tracking-widest uppercase mb-4">
                  Konsultasi Gratis
                </span>
                <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
                  Siap Membangun Kehadiran Digital Bisnis Anda?
                </h2>
                <p className="text-slate-400 font-medium text-sm sm:text-base leading-relaxed mb-8">
                  Dapatkan website profesional, cepat, aman, dan berdesain modern yang dirancang khusus untuk meningkatkan omzet dan kredibilitas usaha Anda.
                </p>
                <Link
                  href="https://wa.me/6285129488941?text=Halo%20Asterix%20Studio,%20saya%20tertarik%20konsultasi%20website%20setelah%20membaca%20blog."
                  target="_blank"
                  className="inline-flex items-center gap-3 bg-emerald-500 text-white px-8 py-4 rounded-full text-sm font-black tracking-wider hover:bg-emerald-400 transition-all duration-300 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 cursor-pointer"
                >
                  Konsultasi WhatsApp Sekarang
                  <FaArrowRight className="text-xs" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      <B2BFooter />
    </>
  );
}
