import { useState } from "react";
import { Github, Linkedin, BookOpen, ArrowRight, Sparkles } from 'lucide-react';
import { NAME, EMAIL, SOCIAL_LINKS } from "@/const/my-info";

export function Hero() {
  const [statusClicks, setStatusClicks] = useState(0);
  const [isWaving, setIsWaving] = useState(false);
  const statusMessages = [
    "Open to opportunities",
    "probably debugging rn 🐛",
    "training models at 3am ☕",
    "touch grass? never heard of it",
    'git commit -m "yolo"',
    "Open to opportunities",
  ];
  const handleWave = () => {
    setIsWaving(true);
    setTimeout(() => setIsWaving(false), 600);
  };
  return (
    <section className="max-w-7xl mx-auto px-6 md:px-20 py-16 md:py-32 relative overflow-hidden">
      {/* Floating tech-themed elements */}
{/* Floating tech-themed elements */}
      <div className="absolute top-10 right-10 opacity-30 animate-float hidden lg:block">
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none" className="stroke-[#E11D48]">
          {/* Neural Network Node */}
          <circle cx="10" cy="10" r="4" strokeWidth="2" fill="#E11D48" />
          <circle cx="50" cy="10" r="4" strokeWidth="2" fill="#E11D48" />
          <circle cx="10" cy="50" r="4" strokeWidth="2" fill="#E11D48" />
          <circle cx="50" cy="50" r="4" strokeWidth="2" fill="#E11D48" />
          <circle cx="30" cy="30" r="6" strokeWidth="2" fill="#E11D48" />
          <line x1="10" y1="10" x2="30" y2="30" strokeWidth="1.5" />
          <line x1="50" y1="10" x2="30" y2="30" strokeWidth="1.5" />
          <line x1="10" y1="50" x2="30" y2="30" strokeWidth="1.5" />
          <line x1="50" y1="50" x2="30" y2="30" strokeWidth="1.5" />
        </svg>
      </div>

      <div className="absolute top-32 right-32 opacity-20 animate-float-delayed hidden lg:block">
        <div className="font-mono text-[#E11D48] text-2xl">{`</>`}</div>
      </div>

      <div className="absolute bottom-20 left-10 opacity-25 animate-float hidden lg:block">
        <svg width="50" height="50" viewBox="0 0 50 50" fill="none" className="stroke-[#E11D48]">
          {/* Car icon */}
          <path d="M10 25 L15 15 L35 15 L40 25 M10 25 L10 35 L15 35 M40 25 L40 35 L35 35 M15 35 L35 35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="17" cy="35" r="3" strokeWidth="2" />
          <circle cx="33" cy="35" r="3" strokeWidth="2" />
          <path d="M20 15 L20 25 M30 15 L30 25" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>

      <div className="absolute top-1/2 right-20 opacity-20 animate-float-delayed hidden lg:block">
        <div className="flex flex-col gap-1 font-mono text-[#E11D48] text-xs">
          <div>1 0 1 0</div>
          <div>0 1 1 0</div>
          <div>1 1 0 1</div>
        </div>
      </div>

      <div className="absolute bottom-40 right-1/4 opacity-25 animate-float hidden lg:block">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="stroke-[#E11D48]">
          {/* Chip/Processor icon */}
          <rect x="10" y="10" width="20" height="20" strokeWidth="2" rx="2" />
          <rect x="14" y="14" width="12" height="12" strokeWidth="1.5" fill="#E11D48" fillOpacity="0.2" />
          <line x1="5" y1="13" x2="10" y2="13" strokeWidth="1.5" />
          <line x1="5" y1="20" x2="10" y2="20" strokeWidth="1.5" />
          <line x1="5" y1="27" x2="10" y2="27" strokeWidth="1.5" />
          <line x1="30" y1="13" x2="35" y2="13" strokeWidth="1.5" />
          <line x1="30" y1="20" x2="35" y2="20" strokeWidth="1.5" />
          <line x1="30" y1="27" x2="35" y2="27" strokeWidth="1.5" />
        </svg>
      </div>

      <div className="absolute top-1/3 left-20 opacity-20 animate-float-delayed hidden lg:block">
        <div className="font-mono text-[#E11D48] text-xl">{'{ }'}</div>
      </div>

      <div className="absolute bottom-1/3 left-1/2 opacity-25 animate-float hidden lg:block">
        <svg width="45" height="45" viewBox="0 0 45 45" fill="none" className="stroke-[#E11D48]">
          {/* Terminal/Command Prompt */}
          <rect x="5" y="8" width="35" height="28" strokeWidth="2" rx="2" />
          <line x1="5" y1="14" x2="40" y2="14" strokeWidth="2" />
          <path d="M12 20 L16 24 L12 28" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="20" y1="28" x2="30" y2="28" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>

      <div className="absolute top-32 right-32 opacity-20 animate-float-delayed hidden lg:block">
        <div className="font-mono text-[#E11D48] text-2xl">{`</>`}</div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-20 items-center">
        {/* Left Column */}
        <div className="space-y-8 lg:col-span-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <h1 className="text-6xl tracking-tight">{NAME}</h1>
              <button
                onClick={handleWave}
                className={`text-4xl md:text-5xl ${
                  isWaving ? "animate-wave" : ""
                } hover:scale-110 transition-transform cursor-pointer`}
              >
                👋
              </button>
            </div>
            <div className="text-xl md:text-2xl text-[#666666] dark:text-[#999999] flex items-center gap-2">
              <span>Software Engineer</span>
              <span className="text-[#E11D48] animate-pulse">•</span>
              <span>AI/ML</span>
              <Sparkles className="text-[#E11D48] animate-spin-slow" size={20} />
            </div>
          </div>

          <p className="text-lg leading-relaxed text-[#333333] dark:text-[#CCCCCC] max-w-xl">
            I build reliable software and applied ML systems, with a focus on
            practical impact, clean architecture, and measurable results.
            Bridging research and production to deliver scalable,
            high-performance solutions.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 md:gap-4 pt-4">
            <a
              href="#projects"
              className="flex items-center justify-center gap-2 px-6 md:px-8 py-3 md:py-3.5 bg-[#0B0B0C] dark:bg-[#F5F5F5] text-[#F5F5F5] dark:text-[#0B0B0C] hover:bg-[#E11D48] dark:hover:bg-[#E11D48] dark:hover:text-[#F5F5F5] transition-colors rounded-lg text-sm md:text-base"
            >
              View Projects
              <ArrowRight size={18} />
            </a>
            <a
              href={`mailto:${EMAIL}`}
              className="flex items-center justify-center px-6 md:px-8 py-3 md:py-3.5 border border-[#E6E6E6] dark:border-[#222222] hover:border-[#E11D48] dark:hover:border-[#E11D48] transition-colors rounded-lg text-sm md:text-base"
            >
              Contact
            </a>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3 md:gap-4 pt-4">
            <a
               href={SOCIAL_LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-2.5 md:p-3 border border-[#E6E6E6] dark:border-[#222222] hover:border-[#E11D48] dark:hover:border-[#E11D48] rounded-lg transition-all hover:scale-110 hover:rotate-6"
              aria-label="GitHub"
            >
              <Github size={20} className="group-hover:scale-110 transition-transform" />
            </a>
            <a
              href={SOCIAL_LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-2.5 md:p-3 border border-[#E6E6E6] dark:border-[#222222] hover:border-[#E11D48] dark:hover:border-[#E11D48] rounded-lg transition-all hover:scale-110 hover:rotate-6"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} className="group-hover:scale-110 transition-transform" />
            </a>
            <a
              href={SOCIAL_LINKS.googleScholar}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-2.5 md:p-3 border border-[#E6E6E6] dark:border-[#222222] hover:border-[#E11D48] dark:hover:border-[#E11D48] rounded-lg transition-all hover:scale-110 hover:rotate-6"
              aria-label="Google Scholar"
            >
              <BookOpen size={20} className="group-hover:scale-110 transition-transform" />
            </a>
          </div>
        </div>

        {/* Right Column - Photo */}
        <div className="flex justify-center lg:justify-end order-first lg:order-last animate-fade-in-up animation-delay-200 lg:col-span-4">
          <div className="relative group">
            <div className="w-70 h-70 md:w-100 md:h-100 rounded-2xl border-2 border-[#E6E6E6] dark:border-[#222222] overflow-hidden bg-[#FAFAFA] dark:bg-[#1a1a1a] transition-all duration-500 group-hover:scale-105 group-hover:rotate-2 group-hover:border-[#E11D48]">
              <div className="w-full h-full flex items-center justify-center text-[#CCCCCC] dark:text-[#333333] text-sm md:text-base">
                <img
                  src={
                    "https://scontent-nrt1-2.xx.fbcdn.net/v/t39.30808-6/483997449_24110687841853199_7216295891009470189_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=a5f93a&_nc_ohc=KPzCXz3zaecQ7kNvwHbOAns&_nc_oc=AdnzSNbG9mJMx838fz_I620HKq6bLgw0XpvnKdfYjIB87G404u5BBAJOHmcp3cybt9U&_nc_zt=23&_nc_ht=scontent-nrt1-2.xx&_nc_gid=AmxmsDmO7IvCwqoGr5A5Bg&oh=00_AfoNbXdOu3tFmtknfTJ-kucAOx1xyUJo64POhS6xZ1ElkQ&oe=69643827"
                  }
                  alt={`${NAME} profile photo`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
            {/* Status Badge */}
            <button
              onClick={() => setStatusClicks((prev) => (prev + 1) % statusMessages.length)}
              className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 bg-white dark:bg-[#0B0B0C] border border-[#E6E6E6] dark:border-[#222222] rounded-full shadow-lg hover:scale-105 transition-all cursor-pointer hover:border-[#E11D48] group/status"
            >
              <span className="w-2 h-2 bg-[#E11D48] rounded-full animate-pulse"></span>
              <span className="text-xs md:text-sm whitespace-nowrap">
                {statusMessages[statusClicks]}
              </span>
            </button>
          </div>
        </div>

        {/* Right Column - Photo */}
        {/* <div className="flex justify-center lg:justify-end order-first lg:order-last lg:col-span-4">
          <div className="relative">
            <div className="w-70 h-70 md:w-100 md:h-100 rounded-2xl border-2 border-[#E6E6E6] dark:border-[#222222] overflow-hidden bg-[#FAFAFA] dark:bg-[#1a1a1a]">
              <div className="w-full h-full flex items-center justify-center text-[#CCCCCC] dark:text-[#333333] text-sm md:text-base">
                <img
                  src={
                    "https://scontent-nrt1-2.xx.fbcdn.net/v/t39.30808-6/483997449_24110687841853199_7216295891009470189_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=a5f93a&_nc_ohc=KPzCXz3zaecQ7kNvwHbOAns&_nc_oc=AdnzSNbG9mJMx838fz_I620HKq6bLgw0XpvnKdfYjIB87G404u5BBAJOHmcp3cybt9U&_nc_zt=23&_nc_ht=scontent-nrt1-2.xx&_nc_gid=AmxmsDmO7IvCwqoGr5A5Bg&oh=00_AfoNbXdOu3tFmtknfTJ-kucAOx1xyUJo64POhS6xZ1ElkQ&oe=69643827"
                  }
                  alt={`${NAME} profile photo`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 bg-white dark:bg-[#0B0B0C] border border-[#E6E6E6] dark:border-[#222222] rounded-full shadow-lg">
              <span className="w-2 h-2 bg-[#E11D48] rounded-full animate-pulse"></span>
              <span className="text-xs md:text-sm whitespace-nowrap">
                Open to opportunities
              </span>
            </div>
          </div>
        </div> */}
      </div>
    </section>
  );
}
