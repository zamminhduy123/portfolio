import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Github,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Play,
  ImageIcon,
  Zap,
  ArrowUpRight,
} from "lucide-react";
import type { Project } from "@/const/projects";

interface ProjectDetailModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectDetailModal({
  project,
  isOpen,
  onClose,
}: ProjectDetailModalProps) {
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);

  useEffect(() => {
    setActiveMediaIndex(0);
  }, [project?.id]);

  const media = project?.media ?? [];

  const nextMedia = useCallback(() => {
    if (media.length > 0) {
      setActiveMediaIndex((i) => (i + 1) % media.length);
    }
  }, [media.length]);

  const prevMedia = useCallback(() => {
    if (media.length > 0) {
      setActiveMediaIndex((i) => (i - 1 + media.length) % media.length);
    }
  }, [media.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prevMedia();
      if (e.key === "ArrowRight") nextMedia();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [isOpen, onClose, prevMedia, nextMedia]);

  if (!project) return null;

  const description = project.longDescription || project.description;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-100 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-101 flex items-center justify-center p-4 md:p-8 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative w-full max-w-6xl max-h-[90vh] bg-white rounded-3xl overflow-hidden pointer-events-auto"
              initial={{ scale: 0.9, y: 40, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 40, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <motion.button
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/10 hover:bg-black/20 transition-colors"
                onClick={onClose}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-5 h-5" />
              </motion.button>

              {/* Left-Right layout (column on mobile) */}
              <div className="flex flex-col md:flex-row max-h-[90vh]">
                {/* LEFT: Media */}
                <div className="w-full md:w-3/5 bg-black shrink-0">
                  {media.length > 0 ? (
                    <div className="relative w-full h-64 md:h-full min-h-60 md:min-h-125">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={activeMediaIndex}
                          className="absolute inset-0"
                          initial={{ opacity: 0, x: 30 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -30 }}
                          transition={{ duration: 0.25 }}
                        >
                          {media[activeMediaIndex].type === "video" ? (
                            media[activeMediaIndex].useEmbed ? (
                              <div className="flex items-center justify-center w-full h-full bg-black">
                                <iframe
                                  src={media[activeMediaIndex].src}
                                  className="w-full aspect-video max-h-full"
                                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                  allowFullScreen
                                  title={media[activeMediaIndex].alt || project.title}
                                />
                              </div>
                            ) : (
                              <video
                                src={media[activeMediaIndex].src}
                                className="w-full h-full object-contain bg-black"
                                controls
                                autoPlay
                                muted
                                playsInline
                              />
                            )
                          ) : (
                            <img
                              src={media[activeMediaIndex].src}
                              alt={media[activeMediaIndex].alt || project.title}
                              className="w-full h-full object-contain bg-black"
                            />
                          )}
                        </motion.div>
                      </AnimatePresence>

                      {/* Navigation arrows */}
                      {media.length > 1 && (
                        <>
                          <motion.button
                            className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 shadow-lg hover:bg-white transition-colors"
                            onClick={prevMedia}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <ChevronLeft className="w-5 h-5" />
                          </motion.button>
                          <motion.button
                            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 shadow-lg hover:bg-white transition-colors"
                            onClick={nextMedia}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <ChevronRight className="w-5 h-5" />
                          </motion.button>
                        </>
                      )}

                      {/* Dots */}
                      {media.length > 1 && (
                        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                          {media.map((_, i) => (
                            <button
                              key={i}
                              onClick={() => setActiveMediaIndex(i)}
                              className={`
                                h-2 rounded-full transition-all duration-300
                                ${i === activeMediaIndex
                                  ? "bg-white w-6"
                                  : "bg-white/40 hover:bg-white/60 w-2"
                                }
                              `}
                            />
                          ))}
                        </div>
                      )}

                      {/* Media type badge */}
                      <div className="absolute top-3 left-3 flex gap-2">
                        {media[activeMediaIndex].type === "video" ? (
                          <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-black/60 text-white text-xs font-mono">
                            <Play className="w-3 h-3" /> Video
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-black/60 text-white text-xs font-mono">
                            <ImageIcon className="w-3 h-3" /> Image
                          </span>
                        )}
                        <span className="px-2 py-1 rounded-full bg-black/60 text-white text-xs font-mono">
                          {activeMediaIndex + 1}/{media.length}
                        </span>
                      </div>
                    </div>
                  ) : (
                    /* Placeholder when no media */
                    <div className="relative w-full h-48 md:h-full min-h-50 md:min-h-125 flex items-center justify-center overflow-hidden">
                      <motion.div
                        className="text-8xl md:text-9xl"
                        animate={{
                          rotate: [0, -5, 5, 0],
                          scale: [1, 1.05, 1],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        {project.emoji}
                      </motion.div>

                      {/* Animated background dots */}
                      <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        {Array.from({ length: 20 }).map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute w-1 h-1 rounded-full bg-white/10"
                            style={{
                              left: `${Math.random() * 100}%`,
                              top: `${Math.random() * 100}%`,
                            }}
                            animate={{
                              opacity: [0, 0.5, 0],
                              scale: [0, 1.5, 0],
                            }}
                            transition={{
                              duration: 2 + Math.random() * 3,
                              repeat: Infinity,
                              delay: Math.random() * 2,
                            }}
                          />
                        ))}
                      </div>

                      {/* Featured badge */}
                      {project.featured && (
                        <motion.div
                          className="absolute top-4 right-4 bg-[hsl(0,84%,60%)] text-white px-3 py-1 rounded-full text-xs font-mono font-bold flex items-center gap-1.5"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", delay: 0.2 }}
                        >
                          <Zap className="w-3 h-3" />
                          HOT
                        </motion.div>
                      )}

                      {/* Thumbnail strip at bottom */}
                      {media.length > 1 && (
                        <div className="absolute bottom-3 left-3 right-3 flex gap-2 overflow-x-auto pb-1">
                          {media.map((m, i) => (
                            <motion.button
                              key={i}
                              onClick={() => setActiveMediaIndex(i)}
                              className={`
                                relative shrink-0 w-16 h-11 rounded-lg overflow-hidden border-2 transition-all
                                ${i === activeMediaIndex
                                  ? "border-white"
                                  : "border-transparent opacity-50 hover:opacity-80"
                                }
                              `}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              {m.type === "video" ? (
                                <div className="w-full h-full bg-white/10 flex items-center justify-center">
                                  <Play className="w-3 h-3 text-white/60" />
                                </div>
                              ) : (
                                <img
                                  src={m.src}
                                  alt={m.alt || `${project.title} ${i + 1}`}
                                  className="w-full h-full object-cover"
                                />
                              )}
                            </motion.button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* RIGHT: Compact Info */}
                <div className="w-full md:w-2/5 overflow-y-auto max-h-[50vh] md:max-h-[90vh] p-5 md:p-8 flex flex-col">
                  {/* Title + Emoji */}
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="mb-4"
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{project.emoji}</span>
                      <div className="flex-1 min-w-0 pr-6">
                        <h2 className="text-xl md:text-2xl font-bold tracking-tight leading-tight">
                          {project.title}
                        </h2>
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {project.category
                            .filter((c) => c !== "all")
                            .map((cat) => (
                              <span
                                key={cat}
                                className="px-2 py-0.5 rounded-md bg-black/5 text-black/50 text-[10px] font-mono uppercase"
                              >
                                {cat}
                              </span>
                            ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Divider */}
                  <motion.div
                    className="h-px bg-black/10 mb-4"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.15, duration: 0.5 }}
                    style={{ transformOrigin: "left" }}
                  />

                  {/* Description */}
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-5"
                  >
                    <h3 className="font-mono text-[10px] text-black/40 uppercase tracking-wider mb-2">
                      About
                    </h3>
                    <p className="text-sm leading-relaxed text-black/70">
                      {description}
                    </p>
                  </motion.div>

                  {/* Tech stack */}
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                    className="mb-5"
                  >
                    <h3 className="font-mono text-[10px] text-black/40 uppercase tracking-wider mb-2">
                      Tech Stack
                    </h3>
                    <div className="flex flex-wrap gap-1.5">
                      {project.tech.map((tech, i) => (
                        <motion.span
                          key={tech}
                          className="px-3 py-1.5 rounded-lg bg-black/5 text-black/70 text-xs font-mono hover:bg-black hover:text-white transition-colors cursor-default"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.3 + i * 0.04 }}
                          whileHover={{ scale: 1.05, y: -1 }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>

                  {/* Metrics */}
                  {project.metrics.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="mb-5"
                    >
                      <h3 className="font-mono text-[10px] text-black/40 uppercase tracking-wider mb-2">
                        Key Metrics
                      </h3>
                      <div className="space-y-2">
                        {project.metrics.map((metric, i) => (
                          <motion.div
                            key={i}
                            className="flex items-center gap-2 p-2.5 rounded-lg bg-black/5"
                            initial={{ opacity: 0, x: -15 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.35 + i * 0.06 }}
                          >
                            <div className="w-1.5 h-1.5 rounded-full bg-[hsl(0,84%,60%)] shrink-0" />
                            <span className="font-mono text-xs text-black/70">
                              {metric}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Links (pinned to bottom) */}
                  <motion.div
                    className="mt-auto flex flex-wrap gap-2 pt-4 border-t border-black/10"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 }}
                  >
                    {project.links.github && project.links.github !== "#" && (
                      <motion.a
                        href={project.links.github}
                        target="_blank"
                        rel="noreferrer"
                        className="group/link flex items-center gap-2 px-4 py-2 rounded-xl bg-black text-white text-xs font-medium hover:bg-[hsl(0,84%,60%)] transition-colors"
                        whileHover={{ scale: 1.03, y: -1 }}
                        whileTap={{ scale: 0.97 }}
                      >
                        <Github className="w-3.5 h-3.5" />
                        GitHub
                        <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all" />
                      </motion.a>
                    )}
                    {project.links.live && project.links.live !== "#" && (
                      <motion.a
                        href={project.links.live}
                        target="_blank"
                        rel="noreferrer"
                        className="group/link flex items-center gap-2 px-4 py-2 rounded-xl border-2 border-black text-black text-xs font-medium hover:bg-black hover:text-white transition-colors"
                        whileHover={{ scale: 1.03, y: -1 }}
                        whileTap={{ scale: 0.97 }}
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        Live Demo
                        <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all" />
                      </motion.a>
                    )}
                    {project.links.caseStudy &&
                      project.links.caseStudy !== "#" && (
                        <motion.a
                          href={project.links.caseStudy}
                          target="_blank"
                          rel="noreferrer"
                          className="group/link flex items-center gap-2 px-4 py-2 rounded-xl border-2 border-black/20 text-black/60 text-xs font-medium hover:border-black hover:text-black transition-colors"
                          whileHover={{ scale: 1.03, y: -1 }}
                          whileTap={{ scale: 0.97 }}
                        >
                          Case Study
                          <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all" />
                        </motion.a>
                      )}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
