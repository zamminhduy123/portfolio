import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, Zap, ArrowUpRight } from "lucide-react";

import {
  PROJECTS,
  PROJECT_CATEGORIES,
  type Project,
  type ProjectCategory,
} from "@/const/projects";


function ProjectCard({ project, index, isFeatured }: { project: Project; index: number; isFeatured: boolean }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.08,
        layout: { duration: 0.4 }
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        group relative overflow-hidden rounded-3xl p-2
        ${isFeatured ? 'md:col-span-1' : ''}
      `}
      data-testid={`card-project-${project.id}`}
    >
      <motion.div
        className={`
          relative h-full p-6 md:p-8 border-2 rounded-3xl
          transition-all duration-500 ease-out flex flex-col
          ${project.featured 
            ? 'bg-black text-white border-black' 
            : 'bg-white border-black/10 hover:border-black/30'
          }
        `}
        animate={{
          y: isHovered ? -8 : 0,
          boxShadow: isHovered 
            ? "0 25px 50px -12px rgba(0, 0, 0, 0.25)" 
            : "0 0 0 0 rgba(0, 0, 0, 0)"
        }}
      >
        {/* Glow effect for featured */}
        {project.featured && (
          <motion.div
            className="absolute -inset-px rounded-3xl bg-linear-to-br from-[hsl(0,84%,60%)] via-transparent to-[hsl(0,84%,60%)] opacity-0 blur-xl"
            animate={{ opacity: isHovered ? 0.3 : 0 }}
            transition={{ duration: 0.3 }}
          />
        )}

        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <motion.div 
            className="text-4xl"
            animate={{ 
              rotate: isHovered ? [0, -10, 10, 0] : 0,
              scale: isHovered ? 1.1 : 1
            }}
            transition={{ duration: 0.4 }}
          >
            {project.emoji}
          </motion.div>
          
          <motion.div
            animate={{ x: isHovered ? 0 : 10, opacity: isHovered ? 1 : 0 }}
            className={project.featured ? 'text-white/50' : 'text-black/30'}
          >
            <ArrowUpRight className="w-6 h-6" />
          </motion.div>
        </div>

        {/* Title */}
        <h3 className={`
          text-xl md:text-2xl font-bold mb-3 leading-tight
          ${project.featured ? 'text-white' : 'text-black'}
        `}>
          {project.title}
        </h3>

        {/* Description */}
        <p className={`
          text-sm leading-relaxed mb-5
          ${project.featured ? 'text-white/70' : 'text-black/60'}
        `}>
          {project.description}
        </p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-2 mb-5">
          {project.tech.map((tech, i) => (
            <motion.span
              key={tech}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + i * 0.05 }}
              className={`
                px-3 py-1 rounded-lg text-xs font-mono
                ${project.featured 
                  ? 'bg-white/10 text-white/80' 
                  : 'bg-black/5 text-black/60'
                }
              `}
            >
              {tech}
            </motion.span>
          ))}
        </div>

        {/* Metrics - THE STAR */}
        <div className="mb-6">
          {project.metrics.map((metric, i) => (
            <motion.p
              key={i}
              className={`
                font-mono text-sm font-medium text-left
                ${project.featured 
                  ? 'text-[hsl(0,84%,65%)]' 
                  : 'text-[hsl(0,84%,50%)]'
                }
              `}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + i * 0.1 }}
            >
              {/* {i > 0 && <span className="text-black/20 dark:text-white/20 mr-1">•</span>} */}
              {metric}
            </motion.p>
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-4">
            {project.links.github && (
                <motion.a
                    href={project.links.github}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`
                    group/github relative flex items-center gap-2 text-sm font-medium
                    ${project.featured ? "text-white/60 hover:text-white" : "text-black/50 hover:text-black"}
                    transition-colors
                    `}
                    data-testid={`link-github-${project.id}`}
                >
                    <Github className="w-4 h-4" />
                    <span className="relative">
                    GitHub
                    <span
                        className={`
                        pointer-events-none absolute -bottom-0.5 left-0 h-0.5 w-0 transition-all duration-300
                        ${project.featured ? "bg-white" : "bg-black"}
                        group-hover/github:w-full
                        `}
                    />
                    </span>
                </motion.a>
                )}
        </div>

        {/* Featured badge */}
        {project.featured && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", delay: 0.3 }}
            className="absolute top-4 right-4 bg-[hsl(0,84%,60%)] text-white px-3 py-1 rounded-full text-xs font-mono font-bold flex items-center gap-1.5"
          >
            <Zap className="w-3 h-3" />
            HOT
          </motion.div>
        )}
      </motion.div>
    </motion.article>
  );
}

export function Projects() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("all");

  const filteredProjects = PROJECTS.filter(
    p => activeCategory === "all" || p.category.includes(activeCategory)
  );

  const featuredProjects = filteredProjects.filter(p => p.featured);
  const regularProjects = filteredProjects.filter(p => !p.featured);

  return (
    <div className="min-h-screen bg-white" id="projects">
      <div className="max-w-7xl mx-auto px-6 md:px-20 py-16 md:py-32">
        {/* Header */}
        <motion.header 
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8">
            <div>
              <motion.div 
                className="flex items-center gap-3 mb-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="w-3 h-3 rounded-full bg-linear-to-r from-[hsl(0,84%,60%)] to-black"
                />
                <span className="font-mono text-sm text-black/50 uppercase tracking-wider">
                  What I've Built
                </span>
              </motion.div>

              <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
                Featured{" "}
                <span className="relative">
                  Projects
                  <motion.svg
                    className="absolute -bottom-2 left-0 w-full"
                    viewBox="0 0 200 12"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                  >
                    <motion.path
                      d="M0 6 Q50 0 100 6 T200 6"
                      fill="none"
                      stroke="hsl(0, 84%, 60%)"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                  </motion.svg>
                </span>
              </h1>
            </div>

            {/* Filter tabs */}
            <motion.div 
              className="flex gap-2 bg-black/5 p-1.5 rounded-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {PROJECT_CATEGORIES.map((cat) => (
                <motion.button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`
                    relative px-4 py-2 rounded-xl text-sm font-medium
                    transition-colors duration-200
                    ${activeCategory === cat.id 
                      ? 'text-white' 
                      : 'text-black/60 hover:text-black'
                    }
                  `}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  data-testid={`filter-${cat.id}`}
                >
                  {activeCategory === cat.id && (
                    <motion.div
                      layoutId="activeFilter"
                      className="absolute inset-0 bg-black rounded-xl"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    <cat.icon className="w-4 h-4" />
                    {cat.label}
                  </span>
                </motion.button>
              ))}
            </motion.div>
          </div>

          <motion.p 
            className="text-lg text-black/50 max-w-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Systems that scale. Code that ships. Research that publishes.{" "}
            <span className="font-mono text-sm text-black/30">
              ({filteredProjects.length} projects)
            </span>
          </motion.p>
        </motion.header>

        {/* Projects Grid */}
        <motion.div layout className="space-y-8">
          {/* Featured projects - larger cards */}
          {featuredProjects.length > 0 && (
            <motion.div 
              layout 
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              <AnimatePresence mode="popLayout">
                {featuredProjects.map((project, i) => (
                  <ProjectCard 
                    key={project.id} 
                    project={project} 
                    index={i} 
                    isFeatured={true}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          )}

          {/* Regular projects */}
          {regularProjects.length > 0 && (
            <motion.div 
              layout 
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              <AnimatePresence mode="popLayout">
                {regularProjects.map((project, i) => (
                  <ProjectCard 
                    key={project.id} 
                    project={project} 
                    index={featuredProjects.length + i}
                    isFeatured={false}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </motion.div>

        {/* Stats bar */}
        <motion.div 
          className="mt-16 p-6 bg-black rounded-2xl flex flex-wrap justify-center gap-8 md:gap-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
            {[
            { value: "12+", label: "Projects Shipped", icon: "🚀" },
            { value: "1000+", label: "Git Commits", icon: "📦" },
            { value: "3+", label: "Years Coding", icon: "⏳" },
            { value: "∞", label: "Learning", icon: "🧠" },
            ].map((stat, i) => (
            <motion.div 
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 + i * 0.1 }}
            >
              <div className="text-2xl mb-1">{stat.icon}</div>
              <div className="text-2xl md:text-3xl font-bold text-white">{stat.value}</div>
              <div className="text-xs font-mono text-white/50">{stat.label}</div>
            </motion.div>
            ))}
        </motion.div>

        {/* Footer */}
        <motion.footer 
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <p className="font-mono text-sm text-black/30">
            always building something new ✨
          </p>
        </motion.footer>
      </div>
    </div>
  );
}
