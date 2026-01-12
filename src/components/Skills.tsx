import { motion } from "framer-motion";
import { Sparkles, Target } from "lucide-react";

const coreSkills = [
  { name: "Python", level: "primary" },
  // { name: "Go", level: "primary" },
  { name: "TypeScript", level: "primary" },
  { name: "PyTorch", level: "primary" },
  // { name: "Kubernetes", level: "secondary" },
  // { name: "PostgreSQL", level: "secondary" },
];

const focusAreas = [
  "Model Deployment",
  "Applied ML Research",
  "Web Development",
  "Saas Products",
];

export function Skills() {
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-20 py-8 md:py-32">
        {/* Header */}
        <motion.header 
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4">
            Skills
          </h1>
          <p className="text-lg text-black/50">
            The tools I actually use every day.
          </p>
        </motion.header>

        {/* Core Skills */}
        <motion.section 
          className="mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="w-4 h-4 text-[hsl(0,84%,60%)]" />
            <span className="font-mono text-xs text-black/40 uppercase tracking-wider">
              Core Stack
            </span>
          </div>

          <div className="flex flex-wrap gap-3">
            {coreSkills.map((skill, i) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + i * 0.05, type: "spring" }}
                whileHover={{ scale: 1.05, y: -2 }}
                className={`
                  px-5 py-3 rounded-2xl font-medium text-sm cursor-default
                  ${skill.level === "primary" 
                    ? 'bg-black text-white' 
                    : 'bg-black/5 text-black/70 border border-black/10'
                  }
                `}
                data-testid={`skill-${skill.name.toLowerCase()}`}
              >
                {skill.name}
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Focus Areas */}
        <motion.section 
          className="mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center gap-2 mb-6">
            <Target className="w-4 h-4 text-[hsl(0,84%,60%)]" />
            <span className="font-mono text-xs text-black/40 uppercase tracking-wider">
              Focus Areas
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {focusAreas.map((area, i) => (
              <motion.div
                key={area}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="flex items-center gap-3 group"
                data-testid={`focus-${i}`}
              >
                <motion.div 
                  className="w-2 h-2 rounded-full bg-[hsl(0,84%,60%)]"
                  whileHover={{ scale: 1.5 }}
                />
                <span className="text-black/80 group-hover:text-black transition-colors">
                  {area}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Current Focus */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="p-6 bg-black/2 rounded-2xl border border-black/5"
        >
          <p className="font-mono text-xs text-black/40 uppercase tracking-wider mb-3">
            Current Focus
          </p>
          <p className="text-black/70 leading-relaxed">
            Applied machine learning research and model deployment, building
            scalable SaaS products, and enhancing web development skills.
          </p>
        </motion.section>

        {/* Footer */}
        <motion.footer 
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          <p className="font-mono text-sm text-black/30">
            leveling up every day.
          </p>
        </motion.footer>
      </div>
    </div>
  );
}
