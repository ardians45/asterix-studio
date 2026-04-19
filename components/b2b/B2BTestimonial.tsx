"use client";

import { FaStar } from "react-icons/fa";
import { motion } from "framer-motion";

export default function B2BTestimonial() {
  return (
    <section className="py-32 bg-[#f8fafc] border-y border-gray-100">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-20 relative">
          {/* Subtle Laurel Wreath icon from Image 1 */}
          <div className="flex justify-center mb-6 opacity-30">
             <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 12C4 8.68629 5.34315 5.68629 7.65685 3.34315" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                <path d="M20 12C20 8.68629 18.6569 5.68629 16.3431 3.34315" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
             </svg>
          </div>
          <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-2">Testimoni</p>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight max-w-4xl mx-auto">
            Dipercaya oleh Perusahaan yang Menuntut <span className="text-[#10b981]">Transparansi Hasil.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              quote: "Kerjanya rapi dan sesuai sama yang kami butuhin. Komunikasinya enak, prosesnya jelas, dan hasil akhirnya bikin tampilan bisnis kami jadi lebih profesional.",
              name: "Owner SRLaundry",
              role: "Business Owner • SRLaundry",
              img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=600"
            },
            {
              quote: "Puas banget kerja bareng Ardian. Dia nggak cuma sekadar desain, tapi juga ngasih masukan logis soal user flow sistem rapor ini biar lebih efektif. Hasilnya melampaui ekspektasi, proses revisinya juga cepet dan nggak bertele-tele.",
              name: "Satria",
              role: "Lead Developer • Sistem Akademik Rapor",
              img: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=600"
            },
            {
              quote: "Puas banget sama hasil kerja Ardian. Sekarang customer kami nggak bingung lagi pas mau pilih-pilih kostum karena navigasinya jauh lebih simpel. Prosesnya transparan dan Ardian juga sering kasih masukan yang oke dari sisi desain.",
              name: "Rey",
              role: "Business Partner • Mending Rental",
              img: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80&w=600"
            },
            {
              quote: "Sebagai intern, Ardian memberikan kontribusi yang signifikan dalam pengembangan desain website dan dashboard. Workflow rapi, desain konsisten, dan mudah diimplementasikan ke development.",
              name: "BANTU Startup Team",
              role: "Internal Review",
              img: "https://images.unsplash.com/photo-1542744094-24638eff58bb?auto=format&fit=crop&q=80&w=600"
            }
          ]
.map((testimonial, idx) => (
             <motion.div 
               key={idx}
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.5, delay: idx * 0.1 }}
               className="bg-white rounded-3xl p-8 border border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.03)] flex flex-col justify-between hover:shadow-[0_20px_60px_rgba(0,0,0,0.06)] transition-all group"
             >
                <div>
                  <div className="text-[#10b981] mb-6 flex gap-0.5">
                    <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                  </div>
                  <p className="text-xl text-gray-900 font-bold mb-8 leading-relaxed">
                    "{testimonial.quote}"
                  </p>
                </div>
                <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
                   <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 border-2 border-white shadow-sm">
                      <img src={testimonial.img} alt={testimonial.name} className="w-full h-full object-cover" />
                   </div>
                   <div>
                     <p className="font-bold text-gray-900 leading-none mb-1">{testimonial.name}</p>
                     <p className="text-xs text-gray-500 font-medium">{testimonial.role}</p>
                   </div>
                </div>
             </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
