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
} from "react-icons/fa";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import B2BFooter from "@/components/sections/b2b/B2BFooter";

export default function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = React.use(params);
  const slug = resolvedParams.slug;
  const [post, setPost] = useState<any>(null);
  const [relatedPosts, setRelatedPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!slug) return;
        const res = await fetch(`/api/blog/by-slug/${slug}`, { cache: 'no-store' });
        const data = await res.json();
        setPost(data.error ? null : data);

        const relRes = await fetch("/api/blog");
        const relData = await relRes.json();
        setRelatedPosts(relData.filter((p: any) => p.slug !== slug).slice(0, 3));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (slug) fetchData();
  }, [slug]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareWhatsApp = () => {
    const text = `Baca artikel menarik: ${post?.title}\n${window.location.href}`;
    window.open(
      `https://wa.me/?text=${encodeURIComponent(text)}`,
      "_blank"
    );
  };

  if (loading) {
    return (
        <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
    );
  }

  if (!post) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-[#F8F9FA] flex items-center justify-center px-6 pt-20">
          <div className="text-center max-w-md mx-auto">
             <div className="text-[100px] font-black text-slate-900/10 leading-none mb-4">404</div>
             <div className="-mt-12">
                <h1 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">Artikel Tidak Ditemukan</h1>
                <p className="text-gray-500 font-medium mb-10">
                  Maaf, artikel yang Anda cari tidak tersedia. Mungkin slug URL telah berubah atau artikel telah dihapus.
                </p>
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 bg-slate-900 text-white px-10 py-4 rounded-full text-sm font-black hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10"
                >
                  <FaArrowLeft className="text-xs" />
                  Kembali ke Blog
                </Link>
             </div>
          </div>
        </main>
        <B2BFooter />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#F8F9FA] selection:bg-emerald-200 selection:text-emerald-900 pt-24 md:pt-32 pb-20">
        {/* Background Decor */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-[10%] -right-[10%] w-[40%] h-[40%] bg-emerald-100/20 blur-[120px] rounded-full"></div>
        </div>

        <div className="relative z-10">
          {/* Back Button */}
          <div className="max-w-4xl mx-auto px-6 mb-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-gray-400 hover:text-slate-900 text-xs md:text-sm font-bold transition-colors group"
              >
                <FaArrowLeft className="text-[10px] md:text-xs group-hover:-translate-x-1 transition-transform" />
                Kembali ke Blog
              </Link>
            </motion.div>
          </div>

          {/* Cover Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto px-0 md:px-6 mb-8 md:mb-16"
          >
            <div className="aspect-[16/9] md:aspect-[21/9] rounded-none md:rounded-[48px] overflow-hidden shadow-2xl shadow-slate-900/10">
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Article Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="max-w-3xl mx-auto px-6 mb-12"
          >
            {/* Meta */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="flex items-center gap-1.5 text-[9px] md:text-[10px] font-black text-emerald-600 bg-emerald-50 py-1.5 px-3 rounded-lg tracking-widest uppercase">
                <FaTag className="text-[8px]" />
                {post.category}
              </span>
              <span className="flex items-center gap-1.5 text-[9px] md:text-[10px] font-bold text-gray-400">
                <FaCalendarAlt className="text-[9px]" />
                {post.publishedAt}
              </span>
              <span className="flex items-center gap-1.5 text-[9px] md:text-[10px] font-bold text-gray-400">
                <FaClock className="text-[9px]" />
                {post.readTime}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-2xl md:text-5xl font-black text-slate-900 tracking-tight leading-[1.2] md:leading-[1.1] mb-8">
              {post.title}
            </h1>

            {/* Author & Share */}
            <div className="flex items-center justify-between py-6 border-y border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white text-sm font-black">
                  A
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">
                    {post.author}
                  </p>
                  <p className="text-[10px] md:text-[11px] text-gray-400 font-medium">
                    Asterix Studio Agency
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={shareWhatsApp}
                  className="w-9 h-9 rounded-full bg-green-50 text-green-600 flex items-center justify-center hover:bg-green-100 transition-colors cursor-pointer"
                  title="Share via WhatsApp"
                >
                  <FaWhatsapp className="text-sm" />
                </button>
                <button
                  onClick={handleCopyLink}
                  className={`w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                    copied
                      ? "bg-emerald-500 text-white"
                      : "bg-gray-50 text-gray-400 hover:bg-gray-100"
                  }`}
                  title="Copy Link"
                >
                  <FaLink className="text-xs" />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Article Content */}
          <motion.article
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="max-w-3xl mx-auto px-6 mb-20"
          >
            <div
              className="prose prose-sm md:prose-lg prose-slate max-w-none
                prose-headings:font-black prose-headings:tracking-tight prose-headings:text-slate-900
                prose-h2:text-xl md:text-2xl prose-h2:mt-12 prose-h2:mb-4
                prose-h3:text-lg md:text-xl prose-h3:mt-8 prose-h3:mb-3
                prose-p:text-gray-600 prose-p:leading-[1.8] prose-p:font-medium prose-p:text-[14px] md:text-[16px]
                prose-li:text-gray-600 prose-li:font-medium prose-li:text-[14px] md:text-[16px]
                prose-strong:text-slate-900 prose-strong:font-extrabold
                prose-em:text-gray-500
                prose-ul:space-y-2
                prose-a:text-emerald-600 prose-a:font-bold prose-a:no-underline hover:prose-a:underline
                prose-table:text-xs md:text-sm prose-table:font-medium
                prose-th:bg-slate-900 prose-th:text-white prose-th:font-bold prose-th:py-3 prose-th:px-4 prose-th:text-left
                prose-td:py-3 prose-td:px-4 prose-td:border-b prose-td:border-gray-100
              "
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </motion.article>

          {/* CTA after article */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="max-w-3xl mx-auto px-6 mb-20"
          >
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-[32px] p-8 md:p-14 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-transparent"></div>
              <div className="relative z-10">
                <h3 className="text-2xl md:text-4xl font-black text-white tracking-tight mb-4 leading-tight">
                  Tertarik Membangun <br className="hidden md:block" /> Website Profesional?
                </h3>
                <p className="text-gray-400 font-medium mb-10 text-sm md:text-base max-w-lg mx-auto leading-relaxed">
                  Konsultasikan kebutuhan website bisnis Anda dengan tim Asterix
                  Studio. Gratis dan tanpa komitmen.
                </p>
                <Link
                  href="https://wa.me/6285129488941?text=Halo%20Asterix%20Studio,%20saya%20mau%20konsultasi%20setelah%20baca%20artikel%20blog."
                  target="_blank"
                  className="inline-flex items-center gap-3 bg-emerald-500 text-white px-10 py-5 rounded-full text-sm md:text-base font-black tracking-wider hover:bg-emerald-600 transition-all duration-300 shadow-xl shadow-emerald-500/20"
                >
                  <FaWhatsapp className="text-lg" />
                  Konsultasi Sekarang
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Related Posts */}
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-10 text-center md:text-left">
              Artikel Lainnya
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((rel, idx) => (
                <motion.div
                  key={rel.slug}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * idx, duration: 0.7 }}
                >
                  <Link
                    href={`/blog/${rel.slug}`}
                    className="group block h-full"
                  >
                    <article className="flex flex-col h-full bg-white rounded-[32px] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.03)] border-2 border-white hover:border-emerald-100 transition-all duration-500 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)]">
                      <div className="aspect-[16/10] overflow-hidden">
                        <img
                          src={rel.coverImage}
                          alt={rel.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                      </div>
                      <div className="flex flex-col flex-1 p-8">
                        <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 py-1.5 px-3 rounded-lg tracking-widest uppercase self-start mb-4">
                          {rel.category}
                        </span>
                        <h3 className="text-lg font-black text-slate-900 tracking-tight leading-tight mb-4 group-hover:text-emerald-600 transition-colors">
                          {rel.title}
                        </h3>
                        <div className="mt-auto flex items-center justify-between pt-6 border-t border-gray-50">
                          <span className="text-[11px] text-gray-400 font-bold">
                            {rel.readTime}
                          </span>
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
          </div>
        </div>
      </main>
      <B2BFooter />
    </>
  );
}
