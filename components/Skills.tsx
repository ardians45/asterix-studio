"use client";

import { motion } from "framer-motion";
import { 
  SiNextdotjs, SiReact, SiTailwindcss, SiTypescript, SiThreedotjs, SiFramer, 
  SiFigma, SiGit, SiHtml5, SiCss3, SiJavascript, SiVuedotjs, SiPython, SiDocker, SiCanva, SiGithub
} from "react-icons/si";
import { FaLaptopCode, FaMobileAlt, FaRocket, FaLayerGroup } from "react-icons/fa";

const skills = [
  {
    category: "Frontend Development",
    items: [
      { name: "Next.js", icon: <SiNextdotjs className="text-white" /> },
      { name: "React.js", icon: <SiReact className="text-[#61DAFB]" /> },
      { name: "Vue.js", icon: <SiVuedotjs className="text-[#4FC08D]" /> },
      { name: "JavaScript", icon: <SiJavascript className="text-[#F7DF1E]" /> },
      { name: "Tailwind CSS", icon: <SiTailwindcss className="text-[#38B2AC]" /> },
      { name: "TypeScript", icon: <SiTypescript className="text-[#3178C6]" /> },
      { name: "Three.js", icon: <SiThreedotjs className="text-white" /> },
      { name: "Framer Motion", icon: <SiFramer className="text-white" /> },
    ],
  },
  {
    category: "Design & Interaction",
    items: [
      { name: "Figma", icon: <SiFigma className="text-[#F24E1E]" /> },
      { name: "Framer", icon: <SiFramer className="text-white" /> },
      { name: "Canva", icon: <SiCanva className="text-[#00C4CC]" /> },
      { name: "UI/UX Architecture", icon: <FaLayerGroup className="text-purple-400" /> },
      { name: "Wireframing", icon: <FaLaptopCode className="text-gray-400" /> },
    ],
  },
  {
    category: "Core & Tools",
    items: [
      { name: "Python", icon: <SiPython className="text-[#3776AB]" /> },
      { name: "Docker", icon: <SiDocker className="text-[#2496ED]" /> },
      { name: "GitHub", icon: <SiGithub className="text-white" /> },
      { name: "HTML5 / CSS3", icon: <div className="flex gap-1"><SiHtml5 className="text-[#E34F26]" /><SiCss3 className="text-[#1572B6]" /></div> },
      { name: "Responsive Design", icon: <FaMobileAlt className="text-green-400" /> },
      { name: "Performance", icon: <FaRocket className="text-red-500" /> },
      { name: "Git", icon: <SiGit className="text-[#F05032]" /> },
    ],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="py-32 px-6 md:px-12 max-w-7xl mx-auto mb-20">
      <div className="flex flex-col md:flex-row gap-12">
        <div className="md:w-1/3">
          <h2 className="text-xl text-gray-400 uppercase tracking-widest font-mono sticky top-32">Expertise</h2>
        </div>
        <div className="md:w-2/3 flex flex-col gap-16">
            {skills.map((group, index) => (
                <div key={index}>
                    <h3 className="text-xl text-white font-display mb-6 border-l-2 border-white pl-4">
                        {group.category}
                    </h3>
                    <ul className="flex flex-wrap gap-3">
                        {group.items.map((skill, idx) => (
                            <motion.li 
                                key={idx}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: idx * 0.02 }}
                                viewport={{ once: true }}
                                className="group flex items-center gap-3 px-5 py-3 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/30 transition-all cursor-default"
                            >
                                <div className="text-xl filter grayscale group-hover:grayscale-0 transition-all duration-300 opacity-70 group-hover:opacity-100 group-hover:scale-110">
                                    {skill.icon}
                                </div>
                                <span className="text-gray-400 text-sm font-medium group-hover:text-white transition-colors tracking-wide">
                                    {skill.name}
                                </span>
                            </motion.li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
}
