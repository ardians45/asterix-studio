"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaArrowRight, FaClock, FaTag } from "react-icons/fa";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import B2BFooter from "@/components/sections/b2b/B2BFooter";
import { blogCategories } from "@/data/blogPosts"; // Keep categories for now

export default function BlogPage() {
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("Semua");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/blog");
        const data = await res.json();
        setBlogPosts(data);
      } catch (err) {
        console.error("Failed to fetch posts", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const filteredPosts =
    activeCategory === "Semua"
      ? blogPosts
      : blogPosts.filter((p) => p.category === activeCategory);

  const featuredPost = blogPosts[0];
  const gridPosts =
    activeCategory === "Semua" ? filteredPosts.slice(1) : filteredPosts;

  return (
    <>
      <main className="min-h-screen bg-[#F8F9FA] selection:bg-emerald-200 selection:text-emerald-900 pt-28 pb-20 px-4">
        {/* Background Decor */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-[10%] -right-[10%] w-[40%] h-[40%] bg-emerald-100/20 blur-[120px] rounded-full"></div>
          <div className="absolute bottom-[10%] -left-[10%] w-[30%] h-[40%] bg-sky-100/20 blur-[120px] rounded-full"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <span className="inline-block py-1.5 px-4 bg-white/80 backdrop-blur-sm border border-gray-100 rounded-full text-[10px] font-black tracking-[0.2em] text-gray-500 uppercase mb-6 shadow-sm">
              Insights & Artikel
            </span>
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-[0.95] tracking-tighter mb-6 italic">
              BLOG{" "}
              <span className="text-emerald-500">&</span>{" "}
              INSIGHTS
            </h1>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto font-medium leading-relaxed">
              Wawasan, tips, dan fakta menarik tentang dunia website dan bisnis
              digital untuk membantu pertumbuhan usaha Anda.
            </p>
          </motion.div>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-3 mb-16"
          >
            {blogCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`py-2.5 px-6 rounded-full text-xs font-bold tracking-wide transition-all duration-300 cursor-pointer ${
                  activeCategory === cat
                    ? "bg-slate-900 text-white shadow-lg shadow-slate-900/20"
                    : "bg-white text-gray-500 border border-gray-100 hover:border-gray-300 hover:text-gray-800"
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>

          {/* Loader */}
          {loading && (
            <div className="flex justify-center py-20">
                <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}

          {/* Featured Post (only when showing "Semua" and not loading) */}
          {!loading && blogPosts.length > 0 && activeCategory === "Semua" && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="mb-16"
            >
              <Link href={`/blog/${featuredPost.slug}`} className="group block">
                <div className="relative bg-white rounded-[40px] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.04)] border-2 border-white hover:border-gray-100 transition-all duration-500 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)]">
                  <div className="grid grid-cols-1 lg:grid-cols-2">
                    {/* Image */}
                    <div className="aspect-[16/10] lg:aspect-auto overflow-hidden">
                      <img
                        src={featuredPost.coverImage}
                        alt={featuredPost.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                    {/* Content */}
                    <div className="p-8 md:p-12 lg:p-14 flex flex-col justify-center">
                      <div className="flex items-center gap-3 mb-6">
                        <span className="text-[10px] font-black text-white bg-emerald-500 py-1.5 px-3 rounded-lg tracking-widest uppercase shadow-lg shadow-emerald-500/20">
                          Artikel Utama
                        </span>
                        <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 py-1.5 px-3 rounded-lg tracking-widest uppercase">
                          {featuredPost.category}
                        </span>
                      </div>
                      <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-tight mb-4 group-hover:text-emerald-600 transition-colors duration-300">
                        {featuredPost.title}
                      </h2>
                      <p className="text-gray-500 font-medium leading-relaxed mb-8 text-sm md:text-base">
                        {featuredPost.excerpt}
                      </p>
                      <div className="flex items-center gap-6 text-xs text-gray-400 font-bold mb-8">
                        <span className="flex items-center gap-2">
                          <FaClock className="text-emerald-500" />
                          {featuredPost.readTime}
                        </span>
                        <span>{featuredPost.publishedAt}</span>
                      </div>
                      <div className="flex items-center gap-2 text-emerald-600 font-black text-sm group-hover:gap-4 transition-all duration-300">
                        Baca Selengkapnya
                        <FaArrowRight className="text-xs" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          )}

          {/* Article Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {gridPosts.map((post, idx) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * idx, duration: 0.7 }}
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="group block h-full"
                >
                  <article className="flex flex-col h-full bg-white rounded-[32px] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.03)] border-2 border-white hover:border-gray-100 transition-all duration-500 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)]">
                    {/* Cover Image */}
                    <div className="aspect-[16/10] overflow-hidden">
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex flex-col flex-1 p-7">
                      {/* Meta */}
                      <div className="flex items-center gap-3 mb-4">
                        <span className="flex items-center gap-1.5 text-[10px] font-black text-emerald-600 bg-emerald-50 py-1 px-2.5 rounded-md tracking-widest uppercase">
                          <FaTag className="text-[8px]" />
                          {post.category}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-lg font-black text-slate-900 tracking-tight leading-snug mb-3 group-hover:text-emerald-600 transition-colors duration-300">
                        {post.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-sm text-gray-500 font-medium leading-relaxed mb-6 flex-1">
                        {post.excerpt}
                      </p>

                      {/* Footer */}
                      <div className="flex items-center justify-between pt-5 border-t border-gray-50">
                        <div className="flex items-center gap-4 text-[11px] text-gray-400 font-bold">
                          <span className="flex items-center gap-1.5">
                            <FaClock className="text-emerald-500 text-[9px]" />
                            {post.readTime}
                          </span>
                          <span>{post.publishedAt}</span>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white text-gray-400 transition-all duration-300">
                          <FaArrowRight className="text-[10px]" />
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Empty State */}
          {gridPosts.length === 0 && activeCategory !== "Semua" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-gray-400 text-lg font-medium">
                Belum ada artikel untuk kategori ini.
              </p>
            </motion.div>
          )}

          {/* Blog CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-20 text-center"
          >
            <div className="bg-gray-900 rounded-[32px] md:rounded-[60px] p-10 md:p-16 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-transparent"></div>
              <div className="relative z-10">
                <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter mb-4 italic">
                  Siap Go Digital?
                </h2>
                <p className="text-gray-400 font-medium max-w-xl mx-auto mb-8 text-sm md:text-base">
                  Konsultasikan kebutuhan website bisnis Anda dengan tim kami.
                  Gratis, tanpa biaya, tanpa komitmen.
                </p>
                <Link
                  href="https://wa.me/6285129488941?text=Halo%20Asterix%20Studio,%20saya%20tertarik%20setelah%20membaca%20blog%20Anda."
                  target="_blank"
                  className="inline-flex items-center gap-3 bg-emerald-500 text-white px-8 py-4 rounded-full text-sm font-black tracking-wider hover:bg-emerald-600 transition-all duration-300 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40"
                >
                  Konsultasi Gratis
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
