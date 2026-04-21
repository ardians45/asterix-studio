"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaPlus, FaRocket, FaTrash, FaEdit, FaEye, FaRobot, FaCog, 
  FaExclamationTriangle, FaCheckCircle, FaTimes 
} from "react-icons/fa";
import Link from "next/link";
import Navbar from "@/components/Navbar";

// Custom Alert Component
const NiceAlert = ({ type, message, onConfirm, onCancel, show }: any) => (
  <AnimatePresence>
    {show && (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          onClick={onCancel}
        />
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative bg-white rounded-[32px] p-8 max-w-sm w-full shadow-2xl border border-gray-100"
        >
          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 mx-auto ${
            type === 'danger' ? 'bg-red-50 text-red-500' : 'bg-emerald-50 text-emerald-500'
          }`}>
            {type === 'danger' ? <FaExclamationTriangle size={24} /> : <FaCheckCircle size={24} />}
          </div>
          <h3 className="text-xl font-black text-slate-900 text-center mb-2">
            {type === 'danger' ? 'Konfirmasi' : 'Berhasil'}
          </h3>
          <p className="text-gray-500 text-center text-sm font-medium mb-8">
            {message}
          </p>
          <div className="flex gap-3">
            {onCancel && (
              <button 
                onClick={onCancel}
                className="flex-1 py-3 px-6 rounded-2xl bg-gray-50 text-gray-400 text-xs font-black uppercase tracking-widest hover:bg-gray-100 transition-colors"
              >
                Batal
              </button>
            )}
            <button 
              onClick={onConfirm}
              className={`flex-1 py-3 px-6 rounded-2xl text-white text-xs font-black uppercase tracking-widest transition-all ${
                type === 'danger' ? 'bg-red-500 hover:bg-red-600' : 'bg-emerald-500 hover:bg-emerald-600'
              }`}
            >
              {type === 'danger' ? 'HAPUS' : 'OK'}
            </button>
          </div>
        </motion.div>
      </div>
    )}
  </AnimatePresence>
);

export default function BlogAdminPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [autopilotLoading, setAutopilotLoading] = useState(false);
  const [topic, setTopic] = useState("");
  const [password, setPassword] = useState("");
  const [isLogged, setIsLogged] = useState(false);
  const [loginError, setLoginError] = useState("");

  // UI States
  const [alert, setAlert] = useState<any>({ show: false, type: '', message: '', onConfirm: null });
  const [editingPost, setEditingPost] = useState<any>(null);

  useEffect(() => {
    if (isLogged) {
        fetchPosts();
    }
  }, [isLogged]);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/blog");
      const data = await res.json();
      setPosts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setLoginError("");
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (data.success) {
        setIsLogged(true);
      } else {
        setLoginError(data.error);
      }
    } catch (err) {
      setLoginError("Gagal menghubungkan ke server.");
    }
  };

  const runAutopilot = async () => {
    if (!topic) return setAlert({ 
      show: true, 
      type: 'danger', 
      message: 'Harap masukkan topik artikel!', 
      onConfirm: () => setAlert({ show: false }) 
    });

    setAutopilotLoading(true);
    try {
      const res = await fetch("/api/blog/autopilot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic }),
      });
      const data = await res.json();
      if (data.success) {
        setAlert({ 
          show: true, 
          type: 'success', 
          message: 'Artikel AI berhasil dibuat dan diposting!', 
          onConfirm: () => setAlert({ show: false }) 
        });
        fetchPosts();
        setTopic("");
      } else {
        setAlert({ 
          show: true, 
          type: 'danger', 
          message: data.error, 
          onConfirm: () => setAlert({ show: false }) 
        });
      }
    } catch (err) {
        setAlert({ 
          show: true, 
          type: 'danger', 
          message: "Terjadi kesalahan sistem.", 
          onConfirm: () => setAlert({ show: false }) 
        });
    } finally {
      setAutopilotLoading(false);
    }
  };

  const handleDelete = (id: string) => {
    setAlert({
      show: true,
      type: 'danger',
      message: 'Apakah Anda yakin ingin menghapus artikel ini permanen?',
      onConfirm: async () => {
        try {
          await fetch(`/api/blog/${id}`, { method: "DELETE" });
          setAlert({ show: false });
          fetchPosts();
        } catch (err) {
          setAlert({ 
            show: true, 
            type: 'danger', 
            message: 'Gagal menghapus artikel.', 
            onConfirm: () => setAlert({ show: false }) 
          });
        }
      },
      onCancel: () => setAlert({ show: false })
    });
  };

  const handleUpdate = async (e: any) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/blog/${editingPost.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingPost),
      });
      if (res.ok) {
        setEditingPost(null);
        fetchPosts();
        setAlert({ 
          show: true, 
          type: 'success', 
          message: 'Artikel berhasil diperbarui!', 
          onConfirm: () => setAlert({ show: false }) 
        });
      }
    } catch (err) {
      setAlert({ 
        show: true, 
        type: 'danger', 
        message: 'Gagal memperbarui artikel.', 
        onConfirm: () => setAlert({ show: false }) 
      });
    }
  };

  if (!isLogged) {
    return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6 text-white font-sans overflow-hidden relative">
            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 blur-[150px] rounded-full -mr-20 -mt-20"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-sky-500/10 blur-[150px] rounded-full -ml-20 -mb-20"></div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full max-w-md bg-white/5 backdrop-blur-2xl p-10 rounded-[48px] border border-white/10 text-center relative z-10"
            >
                <div className="w-20 h-20 bg-emerald-500/20 rounded-3xl flex items-center justify-center mx-auto mb-8">
                  <FaCog className="text-3xl text-emerald-500 animate-[spin_10s_linear_infinite]" />
                </div>
                <h1 className="text-3xl font-black mb-2 uppercase tracking-tighter italic">Asterix Studio</h1>
                <p className="text-gray-400 text-sm mb-10 font-medium">Dashboard Administrasi Blog</p>
                
                <form onSubmit={handleLogin} className="space-y-4">
                    <div className="relative">
                      <input 
                          type="password" 
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Password Admin"
                          className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 px-6 text-center focus:outline-none focus:border-emerald-500 transition-all placeholder:text-gray-600 font-bold"
                      />
                      {loginError && (
                        <p className="text-red-400 text-[10px] font-black uppercase tracking-widest mt-3">
                          {loginError}
                        </p>
                      )}
                    </div>
                    <button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-black py-5 rounded-2xl transition-all shadow-xl shadow-emerald-500/30 active:scale-[0.98] uppercase tracking-widest text-xs">
                        MASUK DASHBOARD
                    </button>
                    <Link href="/" className="block text-[10px] text-gray-500 font-bold hover:text-white transition-colors pt-4">
                      KEMBALI KE WEBSITE
                    </Link>
                </form>
            </motion.div>
        </div>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#F8F9FA] pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h1 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tighter uppercase italic leading-[0.9] mb-4">
                Blog <span className="text-emerald-500">Control</span>
              </h1>
              <p className="text-gray-500 font-bold max-w-md">Kendalikan konten Asterix Studio dengan kekuatan AI Auto-pilot.</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col sm:flex-row bg-white p-3 rounded-[32px] shadow-2xl shadow-slate-900/5 border border-white items-center gap-4"
            >
              <div className="flex items-center gap-3 bg-gray-50 rounded-2xl px-5 py-4 w-full sm:w-auto">
                <FaRobot className="text-emerald-500" />
                <input 
                    type="text" 
                    placeholder="Apa topik hari ini?"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="bg-transparent text-sm focus:outline-none min-w-[200px] font-black text-slate-900"
                />
              </div>
              <button 
                  onClick={runAutopilot}
                  disabled={autopilotLoading}
                  className="bg-slate-900 text-white px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-widest flex items-center gap-3 hover:bg-emerald-500 transition-all disabled:opacity-50 w-full sm:w-auto justify-center active:scale-95"
              >
                  {autopilotLoading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : <FaRocket />}
                  {autopilotLoading ? "MEMPROSES..." : "JALANKAN AI"}
              </button>
            </motion.div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {loading ? (
                  Array(4).fill(0).map((_, i) => (
                      <div key={i} className="h-[400px] bg-white rounded-[40px] animate-pulse"></div>
                  ))
              ) : posts.length > 0 ? (
                  posts.map((post: any, idx) => (
                      <motion.div 
                        key={post.id} 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="bg-white p-2 rounded-[40px] shadow-sm border border-gray-100 group flex flex-col h-full"
                      >
                          <div className="aspect-[4/3] rounded-[32px] overflow-hidden mb-6 relative">
                               <img src={post.coverImage} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                               <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                          </div>
                          <div className="px-6 flex-1 flex flex-col pb-6">
                            <span className="text-[9px] font-black bg-emerald-50 text-emerald-600 px-3 py-1.5 rounded-lg uppercase tracking-widest self-start mb-4">
                                {post.category}
                            </span>
                            <h3 className="font-extrabold text-slate-900 mb-4 line-clamp-2 text-lg leading-tight group-hover:text-emerald-500 transition-colors">
                              {post.title}
                            </h3>
                            
                            <div className="mt-auto flex items-center justify-between pt-6 border-t border-gray-50">
                                <div className="flex gap-2">
                                    <button 
                                      className="w-10 h-10 rounded-2xl bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all shadow-sm"
                                      onClick={() => handleDelete(post.id)}
                                    >
                                        <FaTrash size={12} />
                                    </button>
                                    <button 
                                      className="w-10 h-10 rounded-2xl bg-sky-50 text-sky-500 flex items-center justify-center hover:bg-sky-500 hover:text-white transition-all shadow-sm"
                                      onClick={() => setEditingPost(post)}
                                    >
                                        <FaEdit size={12} />
                                    </button>
                                </div>
                                <Link 
                                  href={`/blog/${post.slug}`} 
                                  target="_blank" 
                                  className="w-10 h-10 rounded-2xl bg-gray-50 text-gray-400 flex items-center justify-center hover:bg-slate-900 hover:text-white transition-all shadow-sm"
                                >
                                    <FaEye size={12} />
                                </Link>
                            </div>
                          </div>
                      </motion.div>
                  ))
              ) : (
                  <div className="col-span-full py-40 text-center bg-white rounded-[40px] border-2 border-dashed border-gray-200">
                      <FaRobot size={40} className="mx-auto text-gray-200 mb-6" />
                      <p className="text-gray-400 font-black uppercase tracking-widest text-sm">
                        Database Artikel Kosong
                      </p>
                      <p className="text-gray-300 text-xs font-bold mt-2">Gunakan fitur AI di atas untuk membuat artikel pertama Anda.</p>
                  </div>
              )}
          </div>
        </div>
      </main>

      {/* Edit Modal */}
      <AnimatePresence>
        {editingPost && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/80 backdrop-blur-md"
              onClick={() => setEditingPost(null)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 40 }}
              className="relative bg-white rounded-[48px] p-10 max-w-3xl w-full shadow-2xl border border-white overflow-y-auto max-h-[90vh]"
            >
              <div className="flex items-center justify-between mb-10">
                <div>
                  <h2 className="text-2xl font-black text-slate-900 tracking-tighter uppercase italic">Edit Artikel</h2>
                  <p className="text-gray-400 text-xs font-bold">Lakukan perubahan pada konten blog Anda.</p>
                </div>
                <button 
                  onClick={() => setEditingPost(null)}
                  className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-slate-900 transition-all"
                >
                  <FaTimes />
                </button>
              </div>

              <form onSubmit={handleUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="col-span-full space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Judul Artikel</label>
                  <input 
                    className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 font-bold text-slate-900 focus:ring-2 focus:ring-emerald-500 transition-all"
                    value={editingPost.title}
                    onChange={(e) => setEditingPost({...editingPost, title: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Kategori</label>
                  <input 
                    className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 font-bold text-slate-900 focus:ring-2 focus:ring-emerald-500 transition-all"
                    value={editingPost.category}
                    onChange={(e) => setEditingPost({...editingPost, category: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Slug URL</label>
                  <input 
                    className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 font-bold text-slate-900 focus:ring-2 focus:ring-emerald-500 transition-all"
                    value={editingPost.slug}
                    onChange={(e) => setEditingPost({...editingPost, slug: e.target.value})}
                  />
                </div>
                <div className="col-span-full space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Isi Konten (HTML)</label>
                  <textarea 
                    className="w-full bg-gray-50 border-none rounded-2xl py-6 px-6 font-medium text-gray-600 focus:ring-2 focus:ring-emerald-500 transition-all min-h-[300px]"
                    value={editingPost.content}
                    onChange={(e) => setEditingPost({...editingPost, content: e.target.value})}
                  ></textarea>
                </div>
                <div className="col-span-full pt-4">
                  <button className="w-full bg-slate-900 text-white font-black py-5 rounded-2xl text-xs uppercase tracking-widest hover:bg-emerald-500 transition-all shadow-xl shadow-slate-900/10 active:scale-95">
                    SIMPAN PERUBAHAN
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <NiceAlert {...alert} onCancel={() => setAlert({ show: false })} />
    </>
  );
}
