export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-[#F8F9FA] pt-32 p-6">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-[0.95] tracking-tighter mb-8 italic uppercase">
          Layanan <span className="text-emerald-500">Kami</span>
        </h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto font-medium mb-20">
          Solusi digital end-to-end untuk membantu skala bisnis B2B Anda.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          {[
            { title: "Web Development", desc: "Membangun website yang cepat, aman, dan responsif." },
            { title: "UI/UX Design", desc: "Desain antarmuka yang intuitif dan memikat user." },
            { title: "Digital Strategy", desc: "Strategi pemasaran dan branding untuk pertumbuhan." }
          ].map((service, i) => (
            <div key={i} className="bg-white p-10 rounded-[40px] shadow-sm border border-gray-100 hover:shadow-xl transition-all">
              <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-500 font-bold mb-6">
                0{i+1}
              </div>
              <h3 className="text-2xl font-black text-slate-800 mb-4">{service.title}</h3>
              <p className="text-gray-500 leading-relaxed">{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
