export default function BlogPage() {
  return (
    <main className="min-h-screen bg-[#F8F9FA] flex flex-col items-center pt-32 p-6 text-center">
      <h1 className="text-4xl md:text-6xl font-black text-slate-800 uppercase tracking-tighter mb-4">
        Our Blog
      </h1>
      <p className="text-lg text-gray-600 max-w-2xl">
        Wawasan terbaru tentang pengembangan website dan strategi bisnis B2B.
      </p>
      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 w-full max-w-7xl">
        {[1, 2, 3].map((i) => (
          <div key={i} className="group cursor-pointer">
            <div className="aspect-video bg-gray-200 rounded-3xl mb-6 overflow-hidden">
               <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 group-hover:scale-105 transition-transform duration-500"></div>
            </div>
            <h3 className="text-xl font-bold text-left group-hover:text-emerald-600 transition-colors">Digital Transformation for B2B Success #{i}</h3>
            <p className="text-gray-500 text-sm text-left mt-2">12 April 2026 • 5 min read</p>
          </div>
        ))}
      </div>
    </main>
  );
}
