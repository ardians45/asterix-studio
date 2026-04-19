export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#F8F9FA] flex flex-col items-center justify-center p-6 text-center">
      <div className="w-full max-w-4xl bg-white rounded-[40px] shadow-sm border border-gray-100 p-8 md:p-16 flex flex-col md:flex-row gap-12 items-center text-left">
        <div className="flex-1">
          <h1 className="text-4xl md:text-5xl font-black text-slate-800 uppercase tracking-tighter mb-6 leading-tight">
            Let's Start Your <span className="text-emerald-500">Project</span>
          </h1>
          <p className="text-gray-600 mb-8">
            Siap untuk transformasi digital? Hubungi kami sekarang dan konsultasikan kebutuhan website Anda secara gratis.
          </p>
          <div className="space-y-4">
            <div className="flex items-center gap-4 text-gray-700">
               <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">📍</div>
               <span>Asterix Studio, Indonesia</span>
            </div>
            <div className="flex items-center gap-4 text-gray-700">
               <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">✉️</div>
               <span>hello@asterix.studio</span>
            </div>
          </div>
        </div>
        
        <div className="w-full md:w-1/2 space-y-4">
           <input type="text" placeholder="Your Name" className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-emerald-500 transition-all outline-none" />
           <input type="email" placeholder="Your Email" className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-emerald-500 transition-all outline-none" />
           <textarea placeholder="Tell us about your project" rows={4} className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-emerald-500 transition-all outline-none resize-none"></textarea>
           <button className="w-full bg-gray-900 text-white font-bold py-4 rounded-2xl hover:bg-gray-800 transition-colors">Send Message</button>
        </div>
      </div>
    </main>
  );
}
