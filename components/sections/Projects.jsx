import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { FiGithub, FiExternalLink } from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger);

const projectsData = [
  {
    id: 1,
    title: "Safar AI – AI Trip Planner",
    description:
      "An intelligent trip planning application that uses AI to create personalized travel itineraries based on user preferences, budget, and interests.",
    tags: ["React.js", "Firebase", "Gemini API", "Google Place API", "Tailwind CSS"],
    image: "/safar.png",
    github: "https://github.com/Gouravmaurya/safar-ai",
    live: "https://safarai.in",
    showGithub: false, // ✅ control visibility
    showLive: true, // ✅ control visibility
    timeline: "NOV 2024 – Present", // ✅ timeline
  },
  {
    id: 2,
    title: "AI Social Media Agent",
    description:
      "An AI-powered social media management tool that automates content creation, scheduling, and engagement across multiple platforms.",
    tags: ["React.js", "Firebase", "Hugging Face", "Twitter API", "Node.js"],
    image: "/ai-agent.webp",
    github: "https://github.com/Gouravmaurya/ai-social-agent",
    live: "https://ai-social-agent.vercel.app",
    showGithub: true, // ❌ GitHub hidden
    showLive: false, // ✅ Live Demo shown
    timeline: "JAN 2025 – FEB 2025",
  },
  {
    id: 3,
    title: "Task Zen – Full-Stack Task Manager",
    description:
      "A collaborative task management application with real-time updates, team collaboration features, and intuitive task organization.",
    tags: ["Next.js", "Express.js", "MongoDB", "Socket.IO", "JWT"],
    image: "/task-zen.jpeg",
    github: "https://github.com/Gouravmaurya/task-zen",
    live: "https://task-zen.vercel.app",
    showGithub: true,
    showLive: false,
    timeline: "MARCH 2025 – April 2025",
  },
  {
    id: 4,
    title: "Portfolio Website (This Site)",
    description:
      "A modern, responsive portfolio website built with Next.js, Tailwind CSS, and GSAP for smooth animations and transitions.",
    tags: ["Next.js", "Tailwind CSS", "GSAP", "Framer Motion", "Responsive Design"],
    image: "/portfolio1.png",
    github: "https://github.com/Gouravmaurya/portfolio",
    live: "https://gouravmaurya.vercel.app",
    showGithub: true,
    showLive: true,
    timeline: "Aug 2025 – Present",
  },
];

export default function Projects() {
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
            delay: i * 0.05,
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" className="bg-black text-white py-20 relative">
      <div className="container mx-auto px-4">
        {/* Big faded background text */}
        <h1
          className="absolute inset-0 flex items-start -top-8 justify-center text-[12rem] font-bold
                   bg-gradient-to-r from-gray-600/60 via-gray-200/ to-white
                   bg-clip-text text-transparent opacity-60 tracking-tighter 
                   select-none pointer-events-none z-0"
          style={{
            color: "silver",
            opacity: 0.1,
            WebkitTextStroke: "1px rgba(192,192,192,0.5)",
          }}
        >
          PROJECTS
        </h1>

        {/* Heading */}
        <div className="text-center mb-14 relative">
          <h2 className="text-4xl md:text-[6rem] font-bold tracking-tight">
            Featured Projects
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto mt-6 text-xl">
            A selection of my recent work, showcasing problem-solving skills,
            creativity, and technical expertise.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid gap-16">
          {projectsData.map((project, index) => (
            <div
              key={project.id}
              ref={(el) => (cardsRef.current[index] = el)}
              className="flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-12"
            >
              {/* Image */}
              <div className="relative w-full lg:w-1/2 h-64 lg:h-80 rounded-xl overflow-hidden border border-gray-800 group shadow-lg">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center gap-4">
                  {project.showGithub && project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-black hover:bg-gray-200 transition-all"
                    >
                      <FiGithub className="w-5 h-5" />
                    </a>
                  )}
                  {project.showLive && project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-black hover:bg-gray-200 transition-all"
                    >
                      <FiExternalLink className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="w-full lg:w-1/2">
                <p className="text-sm font-mono text-gray-400 mb-1">
                  {project.timeline} {/* ✅ Timeline shown here */}
                </p>
                <h3 className="text-2xl md:text-3xl font-bold mb-4">
                  {project.title}
                </h3>
                <p className="text-gray-300 leading-relaxed mb-6">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-gray-900 border border-gray-800 text-xs rounded font-mono text-gray-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-6">
                  {project.showGithub && project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-gray-400 hover:text-white transition-colors"
                    >
                      <FiGithub className="mr-2" />
                      Code
                    </a>
                  )}
                  {project.showLive && project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-gray-400 hover:text-white transition-colors"
                    >
                      <FiExternalLink className="mr-2" />
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-24 text-center">
          <p className="text-gray-400 mb-6">
            Explore more projects and open-source contributions on my GitHub.
          </p>
          <a
            href="https://github.com/Gouravmaurya"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-white text-black font-medium rounded-full hover:bg-gray-200 transition-all"
          >
            <FiGithub className="mr-2" />
            View All Projects
          </a>
        </div>
      </div>
    </section>
  );
}
