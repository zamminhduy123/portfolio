import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowRight, Github, Linkedin, BookOpen, Terminal, Sparkles, Code2 } from "lucide-react";
import { NAME, EMAIL, SOCIAL_LINKS } from "@/const/my-info";

const socialLinks = [
  { icon: Github, href: "#", label: "GitHub" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: BookOpen, href: "#", label: "Blog" },
];

const roles = ["Software Engineer", "ML Researcher", "Body Builder"];

function TypingRole() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (text.length < currentRole.length) {
          setText(currentRole.slice(0, text.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (text.length > 0) {
          setText(text.slice(0, -1));
        } else {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [text, isDeleting, roleIndex]);

  return (
    <span className="text-black">
      {text}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity }}
        className="inline-block w-0.5 h-6 bg-[hsl(0,84%,60%)] ml-1 align-middle"
      />
    </span>
  );
}

function FloatingElement({ children, delay, duration, y }: { children: React.ReactNode; delay: number; duration: number; y: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        y: [0, y, 0]
      }}
      transition={{
        opacity: { delay, duration: 0.5 },
        scale: { delay, duration: 0.5, type: "spring" },
        y: { delay: delay + 0.5, duration, repeat: Infinity, ease: "easeInOut" }
      }}
    >
      {children}
    </motion.div>
  );
}

export function Hero() {
  const letterVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.5 + i * 0.05,
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1] as const
      }
    })
  };

  const name = "Duy Nguyen";

  return (
    <div className="bg-white overflow-hidden relative">
      {/* Floating decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <FloatingElement delay={1.5} duration={4} y={-15}>
          <div className="absolute top-20 right-20 text-[hsl(0,84%,60%)]">
            <Sparkles className="w-8 h-8" />
          </div>
        </FloatingElement>
        <FloatingElement delay={1.8} duration={5} y={10}>
          <div className="absolute top-32 right-48 text-[hsl(0,84%,70%)] font-mono text-lg">
            {"</>"}
          </div>
        </FloatingElement>
        <FloatingElement delay={2} duration={3.5} y={-12}>
          <div className="absolute bottom-40 left-20 text-black/10">
            <Terminal className="w-10 h-10" />
          </div>
        </FloatingElement>
        <FloatingElement delay={2.2} duration={4.5} y={8}>
          <div className="absolute bottom-60 right-32 text-black/5">
            <Code2 className="w-16 h-16" />
          </div>
        </FloatingElement>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-20 relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center min-h-[80vh]">
          {/* Left content */}
          <div>
            {/* Intro line */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center gap-2 mb-6"
            >
              <motion.div
                className="ml-2 w-2 h-2 rounded-full bg-[hsl(0,84%,60%)]"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="font-mono text-sm text-black/50">
                Open to opportunities
              </span>
            </motion.div>

            {/* Name with letter animation */}
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-2">
              {name.split("").map((letter, i) => (
                <motion.span
                  key={i}
                  custom={i}
                  variants={letterVariants}
                  initial="hidden"
                  animate="visible"
                  className="inline-block"
                  style={{ marginRight: letter === " " ? "0.3em" : "0" }}
                >
                  {letter === " " ? "\u00A0" : letter}
                </motion.span>
              ))}
              <motion.span
                initial={{ opacity: 0, scale: 0, rotate: -45 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ delay: 1.2, type: "spring", stiffness: 300 }}
                className="inline-block ml-3"
              >
                👋
              </motion.span>
            </h1>

            {/* Typing role */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3 }}
              className="text-xl md:text-2xl mb-6 h-8"
            >
              <TypingRole />
              <span className="text-black/40 mx-2">•</span>
              <span className="text-[hsl(0,84%,60%)]">AI/ML ✨</span>
            </motion.div>

            {/* Description with word reveal */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.8 }}
              className="text-lg text-black/60 leading-relaxed mb-8 max-w-lg"
            >
              I build reliable software and applied ML systems, with a focus on
              practical impact, clean architecture, and measurable results.
              Bridging research and production to deliver scalable,
              high-performance solutions.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8, duration: 0.5 }}
              className="flex flex-wrap gap-4 mb-10"
            >
              <motion.a
                href="/projects"
                whileHover={{ scale: 1.02, x: 4 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-xl font-medium group"
                data-testid="button-projects"
              >
                View Projects
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.a>
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 px-6 py-3 border-2 border-black/10 text-black rounded-xl font-medium hover:border-black/30 transition-colors"
                data-testid="button-contact"
              >
                Contact
              </motion.a>
            </motion.div>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
              className="flex items-center gap-4"
            >
              <span className="font-mono text-xs text-black/30 uppercase tracking-wider">
                find me
              </span>
              {socialLinks.map((social, i) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.1 + i * 0.1 }}
                  whileHover={{ scale: 1.2, y: -2 }}
                  className="w-10 h-10 rounded-xl bg-black/5 flex items-center justify-center text-black/50 hover:text-black hover:bg-black/10 transition-colors"
                  data-testid={`link-${social.label.toLowerCase()}`}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Right - Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ delay: 0.8, duration: 0.8, type: "spring" }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Decorative elements around photo */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="absolute -top-4 -left-4 w-full h-full rounded-3xl border-2 border-dashed border-[hsl(0,84%,60%)]/30"
              />

              {/* Photo container */}
              <motion.div
                whileHover={{ rotate: -2, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="relative rounded-3xl overflow-hidden shadow-2xl shadow-black/10"
              >
                <div className="w-72 h-96 md:w-80 md:h-105 bg-linear-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                  <img
                    src={
                      "https://scontent-nrt1-2.xx.fbcdn.net/v/t39.30808-6/483997449_24110687841853199_7216295891009470189_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=a5f93a&_nc_ohc=KPzCXz3zaecQ7kNvwHbOAns&_nc_oc=AdnzSNbG9mJMx838fz_I620HKq6bLgw0XpvnKdfYjIB87G404u5BBAJOHmcp3cybt9U&_nc_zt=23&_nc_ht=scontent-nrt1-2.xx&_nc_gid=AmxmsDmO7IvCwqoGr5A5Bg&oh=00_AfoNbXdOu3tFmtknfTJ-kucAOx1xyUJo64POhS6xZ1ElkQ&oe=69643827"
                    }
                    alt={`${NAME} profile photo`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>

                {/* Open to opportunities badge */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.5 }}
                  className="absolute bottom-4 left-4 right-4"
                >
                  <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-xl flex items-center gap-2 shadow-lg">
                    <motion.div
                      className="w-2 h-2 rounded-full bg-green-500"
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                    <span className="text-sm font-medium text-black/80">
                      Open to opportunities
                    </span>
                  </div>
                </motion.div>
              </motion.div>

              {/* Terminal decoration */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.4 }}
                className="absolute -right-8 top-1/2 -translate-y-1/2 bg-black text-white p-3 rounded-xl font-mono text-xs shadow-xl"
              >
                <span className="text-green-400">$</span> ./build.sh
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex flex-col items-center gap-2 text-black/30"
          >
            <span className="font-mono text-xs">scroll</span>
            <div className="w-5 h-8 rounded-full border-2 border-black/20 flex justify-center pt-1">
              <motion.div
                animate={{ y: [0, 8, 0], opacity: [1, 0, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1 h-2 rounded-full bg-black/30"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
