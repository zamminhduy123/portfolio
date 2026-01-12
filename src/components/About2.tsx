import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { MapPin, Sparkles, Mail, ArrowDown, Zap, Brain, Code2, Coffee, AppWindow } from "lucide-react";

const skills = [
  { name: "AI/ML", icon: Brain, color: "bg-[hsl(0,84%,60%)]" },
  { name: "Web development", icon: AppWindow, color: "bg-black" },
  { name: "Research + Engineering", icon: Code2, color: "bg-black" },
];

const funFacts = [
  { icon: "🇻🇳", label: "LOCATION", value: "Ho Chi Minh City, Vietnam" },
  { icon: "⛹🏻‍♂️", label: "INTERESTS", value: "ML Research, Software Development" },
  { icon: "📧", label: "EMAIL", value: "ntmduy123@gmail.com" },
];

const floatingWords = ["curious", "builder", "researcher", "caffeinated", "optimistic"];

export function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [0.8, 1]);

  return (
    <div ref={containerRef} className="h-fit bg-white overflow-hidden relative">
      {/* Floating background words */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
        {floatingWords.map((word, i) => (
          <motion.span
            key={word}
            className="absolute text-[12vw] font-bold text-black/2 whitespace-nowrap"
            style={{
              top: `${15 + i * 18}%`,
              left: `${-10 + i * 5}%`,
              y: i % 2 === 0 ? y1 : y2,
            }}
          >
            {word}
          </motion.span>
        ))}
      </div>

      <motion.div 
        className="max-w-7xl mx-auto px-6 md:px-20 py-16 md:py-32 relative z-10"
        style={{ opacity, scale }}
      >
        {/* Header with animated reveal */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
            className="h-px bg-linear-to-r from-transparent via-black/20 to-transparent mb-8"
          />

          <div className="flex items-center gap-3 mb-6">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              className="w-12 h-12 rounded-2xl bg-[hsl(0,84%,60%)] flex items-center justify-center"
            >
              <Sparkles className="w-6 h-6 text-white" />
            </motion.div>
            <motion.h1 
              className="text-5xl md:text-7xl font-bold tracking-tight"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              About
            </motion.h1>
          </div>

          {/* Bio with word-by-word animation */}
          <motion.div className="space-y-6">
            <p className="text-xl md:text-2xl leading-relaxed text-black/80">
              {["With", "a", "background", "spanning", "both", "industry", "software", "engineering", "and", "applied", "ML", "research,", "I", "specialize", "in", "building", "production-grade", "systems", "that", "leverage", "machine", "learning", "to", "solve", "real-world", "problems."].map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.4 + i * 0.02 }}
                  className="inline-block mr-[0.3em]"
                >
                  {word}
                </motion.span>
              ))}
            </p>

            <motion.p 
              className="text-lg text-black/60 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              My work focuses on the intersection of{" "}
              <span className="text-black font-medium">clean architecture</span>,{" "}
              <span className="text-black font-medium">model deployment</span>, and{" "}
              <span className="text-[hsl(0,84%,60%)] font-medium">measurable business impact</span>
              —turning research prototypes into scalable, reliable products.
            </motion.p>
          </motion.div>
        </motion.div>

        {/* Skills - Animated tags */}
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex flex-wrap gap-4">
            {skills.map((skill, i) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  type: "spring", 
                  stiffness: 300, 
                  delay: 0.4 + i * 0.1 
                }}
                whileHover={{ 
                  scale: 1.05, 
                  rotate: [-1, 1, -1, 0],
                  transition: { rotate: { repeat: 0, duration: 0.3 } }
                }}
                className={`
                  ${skill.color} text-white px-6 py-3 rounded-2xl
                  flex items-center gap-3 font-medium text-sm
                  cursor-default shadow-lg
                `}
                data-testid={`skill-${skill.name.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <skill.icon className="w-5 h-5" />
                {skill.name}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Divider with animation */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="h-px bg-black/10 mb-12 origin-left"
        />

        {/* Info grid with stagger */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.15
              }
            }
          }}
        >
          {funFacts.map((fact, i) => (
            <motion.div
              key={fact.label}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 }
              }}
              transition={{ duration: 0.5 }}
              className="group"
              data-testid={`info-${fact.label.toLowerCase()}`}
            >
              <motion.div 
                className="text-4xl mb-3"
                whileHover={{ scale: 1.2, rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.4 }}
              >
                {fact.icon}
              </motion.div>
              <p className="text-xs font-mono text-black/40 uppercase tracking-wider mb-1">
                {fact.label}
              </p>
              <p className="font-medium text-black group-hover:text-[hsl(0,84%,60%)] transition-colors duration-300">
                {fact.value}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Decorative elements */}
        <motion.div
          className="mt-20 flex justify-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2 text-black/30"
          >
            <Coffee className="w-5 h-5" />
            <span className="font-mono text-xs">fueled by caffeine</span>
            <ArrowDown className="w-4 h-4" />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
