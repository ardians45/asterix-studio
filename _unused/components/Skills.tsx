import { 
  SiNextdotjs, SiReact, SiTailwindcss, SiTypescript, SiThreedotjs, SiFramer, 
  SiFigma, SiGit, SiHtml5, SiCss3, SiJavascript, SiVuedotjs, SiPython, SiDocker, SiCanva, SiGithub,
  SiOpenai, SiAnthropic
} from "react-icons/si";
import { FaLaptopCode, FaMobileAlt, FaRocket, FaLayerGroup, FaBrain, FaRobot, FaTerminal } from "react-icons/fa";

const skills = [
  {
    category: "Frontend Development",
    items: [
      { name: "Next.js", icon: <SiNextdotjs className="text-gray-900" /> },
      { name: "React.js", icon: <SiReact className="text-[#61DAFB]" /> },
      { name: "Vue.js", icon: <SiVuedotjs className="text-[#4FC08D]" /> },
      { name: "JavaScript", icon: <SiJavascript className="text-[#F7DF1E]" /> },
      { name: "Tailwind CSS", icon: <SiTailwindcss className="text-[#06B6D4]" /> },
      { name: "TypeScript", icon: <SiTypescript className="text-[#3178C6]" /> },
      { name: "Three.js", icon: <SiThreedotjs className="text-gray-900" /> },
      { name: "Framer Motion", icon: <SiFramer className="text-[#0055FF]" /> },
    ],
  },
  {
    category: "Design & Interaction",
    items: [
      { name: "Figma", icon: <SiFigma className="text-[#F24E1E]" /> },
      { name: "Framer", icon: <SiFramer className="text-[#0055FF]" /> },
      { name: "Canva", icon: <SiCanva className="text-[#00C4CC]" /> },
      { name: "UI/UX Architecture", icon: <FaLayerGroup className="text-[#8B5CF6]" /> },
      { name: "Wireframing", icon: <FaLaptopCode className="text-[#e8702a]" /> },
    ],
  },
  {
    category: "AI Tools & Workflow Acceleration",
    items: [
      { name: "Antigravity", icon: <FaBrain className="text-[#34A853]" /> },
      { name: "Claude AI", icon: <SiAnthropic className="text-[#D97757]" /> },
      { name: "Qwen Code", icon: <FaTerminal className="text-[#6366F1]" /> },
      { name: "ChatGPT & Prompting", icon: <SiOpenai className="text-[#10A37F]" /> },
      { name: "AI Engineering", icon: <FaRobot className="text-[#e8702a]" /> },
    ],
  },
  {
    category: "Core & Tools",
    items: [
      { name: "Python", icon: <SiPython className="text-[#3776AB]" /> },
      { name: "Docker", icon: <SiDocker className="text-[#2496ED]" /> },
      { name: "GitHub", icon: <SiGithub className="text-gray-900" /> },
      { name: "HTML5 / CSS3", icon: <div className="flex gap-1"><SiHtml5 className="text-[#E34F26]" /><SiCss3 className="text-[#1572B6]" /></div> },
      { name: "Responsive Design", icon: <FaMobileAlt className="text-[#10B981]" /> },
      { name: "Performance", icon: <FaRocket className="text-[#EF4444]" /> },
      { name: "Git", icon: <SiGit className="text-[#F05032]" /> },
    ],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="pt-16 md:pt-24 pb-28 md:pb-32 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row gap-10 md:gap-12">
        <div className="md:w-1/3">
          <div className="md:sticky md:top-32">
            <h2 data-reveal="mask" className="text-xl text-[#e8702a] uppercase tracking-widest font-cinzel">
              <span>Expertise</span>
            </h2>
            <div data-reveal="line" style={{ ["--rd" as string]: "150ms" }} className="mt-4 h-px w-24 bg-[#e8702a]/60" />
          </div>
        </div>
        <div className="md:w-2/3 flex flex-col gap-14">
          {skills.map((group) => (
            <div key={group.category}>
              <h3 data-reveal="mask" className="text-xl text-gray-900 font-cinzel mb-6 border-l-2 border-[#e8702a] pl-4">
                <span>{group.category}</span>
              </h3>
              <ul data-reveal="stagger" className="flex flex-wrap gap-3">
                {group.items.map((skill, idx) => (
                  <li
                    key={skill.name}
                    style={{ ["--i" as string]: idx }}
                    className="group flex items-center gap-3 px-5 py-3 rounded-full border border-gray-200 bg-white shadow-sm transition-[transform,border-color,box-shadow,background-color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:border-[#e8702a] hover:bg-[#FAF9F5] hover:shadow-[0_10px_25px_-8px_rgba(232,112,42,0.25)]"
                  >
                    <div className="text-xl transition-transform duration-300 group-hover:scale-110">
                      {skill.icon}
                    </div>
                    <span className="text-gray-700 text-sm font-medium group-hover:text-gray-900 transition-colors tracking-wide">
                      {skill.name}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
