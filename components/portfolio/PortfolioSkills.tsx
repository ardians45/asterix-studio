import {
  SiNextdotjs, SiReact, SiTailwindcss, SiTypescript, SiThreedotjs, SiFramer, SiFigma, SiGit,
  SiJavascript, SiVuedotjs, SiPython, SiDocker, SiCanva, SiGithub, SiOpenai, SiAnthropic, SiGreensock,
} from "react-icons/si";

const GROUPS = [
  {
    title: "Build",
    items: [
      { name: "Next.js", Icon: SiNextdotjs, color: "#000000" },
      { name: "React", Icon: SiReact, color: "#087EA4" },
      { name: "TypeScript", Icon: SiTypescript, color: "#3178C6" },
      { name: "JavaScript", Icon: SiJavascript, color: "#000000" },
      { name: "Vue.js", Icon: SiVuedotjs, color: "#2F9A6B" },
      { name: "Tailwind CSS", Icon: SiTailwindcss, color: "#0891B2" },
    ],
  },
  {
    title: "Motion & 3D",
    items: [
      { name: "Three.js", Icon: SiThreedotjs, color: "#000000" },
      { name: "GSAP", Icon: SiGreensock, color: "#3F7D00" },
      { name: "Framer Motion", Icon: SiFramer, color: "#0055FF" },
    ],
  },
  {
    title: "Design",
    items: [
      { name: "Figma", Icon: SiFigma, color: "#F24E1E" },
      { name: "Framer", Icon: SiFramer, color: "#0055FF" },
      { name: "Canva", Icon: SiCanva, color: "#00A3AA" },
    ],
  },
  {
    title: "Tools & AI",
    items: [
      { name: "Git", Icon: SiGit, color: "#F05032" },
      { name: "GitHub", Icon: SiGithub, color: "#000000" },
      { name: "Docker", Icon: SiDocker, color: "#1D63ED" },
      { name: "Python", Icon: SiPython, color: "#3776AB" },
      { name: "Claude", Icon: SiAnthropic, color: "#C15F3C" },
      { name: "ChatGPT", Icon: SiOpenai, color: "#000000" },
    ],
  },
];

export default function PortfolioSkills() {
  return (
    <section id="skills" className="relative bg-[var(--pf-butter)] text-[var(--pf-ink)] py-20 md:py-28">
      <div className="pf-wrap">
        <h2 className="pf-heading mb-12 md:mb-16">
          The <span className="pf-script-inline">toolbox</span>
        </h2>
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {GROUPS.map((g) => (
            <div key={g.title}>
              <h3 className="pf-label mb-4 border-b-2 border-[var(--pf-ink)] pb-3">{g.title}</h3>
              <ul className="flex flex-wrap gap-2">
                {g.items.map(({ name, Icon, color }) => (
                  <li key={name} className="pf-chip">
                    <Icon aria-hidden="true" style={{ color }} className="text-lg" />
                    {name}
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
