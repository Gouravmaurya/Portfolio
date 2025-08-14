"use client";

import { motion } from "framer-motion";
import * as SiIcons from "react-icons/si";
import * as TbIcons from "react-icons/tb";

const skillsData = [
  { name: "JavaScript", icon: "SiJavascript", color: "#F7DF1E" },
  { name: "Python", icon: "SiPython", color: "#3776AB" },
  { name: "React.js", icon: "SiReact", color: "#61DAFB" },
  { name: "Tailwind CSS", icon: "SiTailwindcss", color: "#06B6D4" },
  { name: "Next.js", icon: "SiNextdotjs", color: "#ffffff" },
  { name: "HTML", icon: "SiHtml5", color: "#E34F26" },
  { name: "CSS", icon: "SiCss3", color: "#1572B6" },
  { name: "Firebase", icon: "SiFirebase", color: "#FFCA28" },
  { name: "Node.js", icon: "SiNodedotjs", color: "#339933" },
  { name: "REST APIs", icon: "TbApi", color: "#ffffff" },
  { name: "Express.js", icon: "SiExpress", color: "#ffffff" },
  { name: "JWT", icon: "SiJsonwebtokens", color: "#000000" },
  { name: "React-Bit", icon: "SiReact", color: "#61DAFB" },
  { name: "Hero-UI", icon: "TbBrandReact", color: "#61DAFB" },
  { name: "Shadcn-UI", icon: "TbBrandReact", color: "#61DAFB" },
  { name: "Framer Motion", icon: "SiFramer", color: "#0055FF" },
  { name: "Lenis", icon: "TbWaveSine", color: "#ffffff" },
  { name: "GSAP", icon: "SiGreensock", color: "#88CE02" },
  { name: "MongoDB", icon: "SiMongodb", color: "#47A248" },
  { name: "Git", icon: "SiGit", color: "#F05032" },
  { name: "GitHub", icon: "SiGithub", color: "#ffffff" },
  { name: "Docker", icon: "SiDocker", color: "#2496ED" },
  { name: "Postman", icon: "SiPostman", color: "#FF6C37" },
  { name: "VS Code", icon: "SiVisualstudiocode", color: "#007ACC" },
  { name: "Bootstrap", icon: "SiBootstrap", color: "#7952B3" },
];

const Icon = ({ name, color, size }) => {
  const IconComponent = SiIcons[name] || TbIcons[name];
  if (!IconComponent) {
    console.warn(`Icon ${name} not found`);
    return <span className="w-5 h-5"></span>;
  }
  return <IconComponent color={color} size={size} />;
};

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.2 },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100, damping: 10 },
  },
};

export default function Skills() {
  return (
    <section
      id="skills"
      className="py-24 bg-black text-white relative overflow-hidden"
    >
      {/* Big faded text background */}
      <h1
        className="absolute inset-0 font-mono flex items-start top-16 sm:-top-8 justify-center text-[5rem] sm:text-[7rem] md:text-[12rem] font-bold 
       bg-gradient-to-r from-gray-600/60 via-gray-200 to-white 
       bg-clip-text text-transparent tracking-tighter select-none pointer-events-none z-0"
        style={{
          opacity: 0.12,
          WebkitTextStroke: "1px rgba(192,192,192,0.5)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
          maskImage:
            "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
        }}
      >
        SKILLS
      </h1>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Heading */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-[3rem] sm:text-5xl md:text-[6rem] font-bold">
            Skills
          </h2>
          <p className="text-gray-400 mt-4 tracking-widest">
            I CONSTANTLY TRY TO IMPROVE
          </p>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 px-4"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {skillsData.map(({ name, icon, color }, index) => (
            <motion.div
              key={index}
              variants={item}
              className="flex items-center gap-2 px-4 py-2 bg-neutral-900 rounded-lg border border-neutral-800 hover:border-neutral-600 transition-all duration-300 cursor-pointer"
              whileHover={{ y: -3, scale: 1.05 }}
            >
              <Icon name={icon} color={color} size={20} />
              <span className="text-sm font-medium">{name}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
