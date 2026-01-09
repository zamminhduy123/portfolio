import { motion } from "framer-motion";
import { Building2, GraduationCap, Rocket, Calendar, MapPin, Briefcase } from "lucide-react";

interface Experience {
  id: string;
  type: "work" | "education" | "project";
  title: string;
  company: string;
  location: string;
  period: string;
  current: boolean;
  description: string;
  skills: string[];
  emoji?: string;
  imgSrc?: string
}

const experiences: Experience[] = [
    {
        id: "1",
        type: "education",
        title: "Master of Engineering",
        company: "Stanford University",
        location: "Stanford, CA",
        period: "2018 — 2022",
        current: true,
        description: "Thesis: Exploring the powerful Graph Neural Networks for Cybersecurity Applications. Survived on coffee and late nights.",
        skills: ["Research", "Writing Papers", "Surviving"],
        imgSrc: "https://uploaded.kcampus.kr/315936716_5905453259517294_1356613674386102687_n_af5c99ddbb.jpg"
    },
    {
        id: "2",
        type: "work",
        title: "Software Engineer II",
        company: "Zalo @ VNG Corporation",
        location: "Ho Chi Minh City, Vietnam",
        period: "2022 — March 2024",
        current: false,
        description: "Deliver over 15+ features for Zalo PC application used by 8M+ users. Incharge of redesigning the core architecture to improve performance and maintainability of search and user related features.",
        skills: ["React", "ElectronJS", "Typescript/Javascript"],
        imgSrc: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Icon_of_Zalo.svg/1024px-Icon_of_Zalo.svg.png"
    },
    {
        id: "3",
        type: "education",
        title: "B.S. in Computer Science",
        company: "MIT",
        location: "Cambridge, MA",
        period: "2014 — 2018",
        current: false,
        description: "Where I learned that sleep is optional and caffeine is mandatory. Minor in Mathematics.",
        skills: ["Algorithms", "Math", "All-nighters"],
        imgSrc: "https://upload.wikimedia.org/wikipedia/commons/1/16/Logo-KHTN.jpg"

    }
];

const typeIcons = {
  work: Building2,
  education: GraduationCap,
  project: Rocket
};

function ExperienceCard({ exp, index }: { exp: Experience; index: number }) {
  const Icon = typeIcons[exp.type];
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.15, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      className="relative"
      data-testid={`card-experience-${exp.id}`}
    >
      <div className={`
        flex flex-col md:flex-row gap-6 md:gap-12 items-start
        ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}
      `}>
        {/* Timeline dot */}
        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 z-10">
          <motion.div 
            className={`
              w-14 h-14 rounded-2xl flex items-center justify-center text-2xl
              ${exp.current 
                ? 'bg-[hsl(0,84%,60%)] shadow-lg shadow-red-200' 
                : exp.emoji ? 'bg-black' : 'bg-transparent'
              }
            `}
            whileHover={{ scale: 1.1, rotate: 5 }}
          >
            {exp.imgSrc ? (
              <img src={exp.imgSrc} alt={exp.company} className="w-14 h-14 rounded-2xl bg-transparent object-contain" />
            ) : (
              <span>{exp.emoji}</span>
            )}
          </motion.div>
        </div>

        {/* Content */}
        <div className={`
          flex-1 md:w-[calc(50%-4rem)]
          ${isEven ? 'md:text-right md:pr-20' : 'md:text-left md:pl-20'}
        `}>
          <motion.div
            whileHover={{ y: -4 }}
            className={`
              p-6 rounded-2xl border-2 border-black/5 bg-linear-to-br
              ${exp.current 
                ? 'from-red-50 to-white border-[hsl(0,84%,60%)]/20' 
                : 'from-gray-50 to-white hover:border-black/10'
              }
              transition-all duration-300
            `}
          >
            {/* Mobile emoji */}
            <div className="md:hidden mb-4">
              <span className="text-3xl">{exp.emoji}</span>
            </div>

            <div className={`flex items-center gap-2 mb-2 ${isEven ? 'md:justify-end' : ''}`}>
              <Icon className="w-4 h-4 text-black/40" />
              <span className="font-mono text-xs text-black/40 uppercase tracking-wider">
                {exp.type}
              </span>
              {exp.current && (
                <span className="px-2 py-0.5 bg-[hsl(0,84%,60%)] text-white text-xs font-mono rounded-full">
                  NOW
                </span>
              )}
            </div>

            <h3 className="text-xl font-bold text-black mb-1">{exp.title}</h3>
            
            <div className={`flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-black/60 mb-3 ${isEven ? 'md:justify-end' : ''}`}>
              <span className="font-medium">{exp.company}</span>
              <span className="text-black/30">•</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {exp.location}
              </span>
            </div>

            <p className={`text-black/70 mb-4 leading-relaxed ${isEven ? 'md:text-right' : ''}`}>
              {exp.description}
            </p>

            <div className={`flex flex-wrap gap-2 ${isEven ? 'md:justify-end' : ''}`}>
              {exp.skills.map((skill, i) => (
                <span 
                  key={i}
                  className="px-3 py-1 bg-black/5 rounded-full text-xs font-mono text-black/60"
                >
                  {skill}
                </span>
              ))}
            </div>

            <div className={`mt-4 flex items-center gap-2 text-xs font-mono text-black/40 ${isEven ? 'md:justify-end' : ''}`}>
              <Calendar className="w-3 h-3" />
              {exp.period}
            </div>
          </motion.div>
        </div>

        {/* Spacer for other side */}
        <div className="hidden md:block flex-1 md:w-[calc(50%-4rem)]" />
      </div>
    </motion.div>
  );
}

export function Experiences() {
  const workCount = experiences.filter(e => e.type === "work").length;
  const eduCount = experiences.filter(e => e.type === "education").length;

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-20 py-16 md:py-32">
        <motion.header 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            className="inline-flex items-center gap-2 px-4 py-2 bg-black text-white rounded-full mb-6"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Briefcase className="w-4 h-4" />
            <span className="font-mono text-sm">The Journey So Far</span>
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4">
            Experience
          </h1>
          
          <p className="text-lg text-black/50 max-w-md mx-auto font-mono">
            {workCount} jobs · {eduCount} degrees · 0 regrets
          </p>

          <div className="flex justify-center gap-6 mt-8">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-[hsl(0,84%,60%)]" />
              <span className="text-xs font-mono text-black/40">current</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-black" />
              <span className="text-xs font-mono text-black/40">past</span>
            </div>
          </div>
        </motion.header>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-linear-to-b from-black/10 via-black/20 to-black/5" />

          <div className="space-y-12 md:space-y-2">
            {experiences.map((exp, index) => (
              <ExperienceCard key={exp.id} exp={exp} index={index} />
            ))}
          </div>

          {/* End dot */}
          <motion.div 
            className="hidden md:flex absolute left-1/2 -translate-x-1/2 -bottom-8"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 }}
          >
            <div className="w-4 h-4 rounded-full bg-black/20" />
          </motion.div>
        </div>

        <motion.footer 
          className="mt-24 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <p className="font-mono text-sm text-black/30">
            ~ still leveling up ~
          </p>
        </motion.footer>
      </div>
    </div>
  );
}
