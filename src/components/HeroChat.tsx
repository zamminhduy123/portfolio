import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Bot, Github, Linkedin, BookOpen, Terminal, Sparkles, Code2, Search, Database, CheckCircle2, Cpu } from "lucide-react";
import { NAME } from "@/const/my-info";
import { useAgentChat } from "@/hooks/useAgentChat";

const roles = ["Software Engineer", "ML Researcher", "System Builder"];

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
  const { messages, input, setInput, sendMessage, retryConnection, agentState, statusText, processHistory, isFlowing } = useAgentChat();
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [messages, agentState]);

  const letterVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.5 + i * 0.05, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const }
    })
  };

  const socialLinks = [
    { icon: Github, href: "https://github.com/zamminhduy123", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com/in/hzduy", label: "LinkedIn" },
    { icon: BookOpen, href: "#publications", label: "Publications" },
  ];

  return (
    <div className="min-h-screen bg-white overflow-hidden relative">
      {/* Floating decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <FloatingElement delay={1.5} duration={4} y={-15}>
          <div className="absolute top-20 right-20 text-[hsl(0,84%,60%)]/50">
            <Sparkles className="w-8 h-8" />
          </div>
        </FloatingElement>
        <FloatingElement delay={1.8} duration={5} y={10}>
          <div className="absolute top-32 right-1/2 text-[hsl(0,84%,70%)]/30 font-mono text-lg">
            {"</>"}
          </div>
        </FloatingElement>
        <FloatingElement delay={2} duration={3.5} y={-12}>
          <div className="absolute bottom-40 left-20 text-black/5">
            <Terminal className="w-10 h-10" />
          </div>
        </FloatingElement>
        <FloatingElement delay={2.2} duration={4.5} y={8}>
          <div className="absolute bottom-60 right-32 text-black/5">
            <Code2 className="w-16 h-16" />
          </div>
        </FloatingElement>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-20 py-16 md:py-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center min-h-[80vh]">
          
          {/* Left content - Compact hero info */}
          <div className="lg:pr-10 flex flex-col items-center text-center md:items-start md:text-left">
            
            {/* Desktop Avatar & Status - Flex instead of Absolute to prevent overflow */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.1 }}
              className="hidden md:flex items-center gap-6 mb-8"
            >
              <div className="relative group">
                <div className="absolute inset-0 bg-black rounded-3xl rotate-6 group-hover:rotate-12 transition-transform duration-300"></div>
                <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-3xl overflow-hidden border-4 border-white shadow-xl bg-[hsl(0,84%,60%)]">
                  <img src="/me.webp" alt={NAME} className="w-full h-full object-cover" />
                </div>
                <motion.div 
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5, type: "spring" }}
                  className="absolute -bottom-3 -right-3 bg-white text-black text-xs font-bold px-2 py-1 rounded-lg border-2 border-black shadow-sm transform rotate-12"
                >
                  Hi! 👋
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex items-center gap-2 self-end pb-4"
              >
                <motion.div 
                  className="w-2 h-2 rounded-full bg-[hsl(0,84%,60%)]"
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="font-mono text-sm text-black/50">Open to opportunities</span>
              </motion.div>
            </motion.div>

            {/* Mobile Avatar and Status */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="md:hidden flex flex-col items-center gap-4 mb-6"
            >
              <div className="relative group w-24 h-24">
                <div className="absolute inset-0 bg-black rounded-2xl rotate-6"></div>
                <div className="relative w-full h-full rounded-2xl overflow-hidden border-2 border-white shadow-md bg-[hsl(0,84%,60%)]">
                   <img src="/me.webp" alt={NAME} className="w-full h-full object-cover" />
                </div>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex items-center gap-2 mt-2 border border-black/5 bg-black/5 rounded-full px-3 py-1"
              >
                <motion.div 
                  className="w-2 h-2 rounded-full bg-[hsl(0,84%,60%)]"
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="font-mono text-xs text-black/60">Open to opportunities</span>
              </motion.div>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-2 flex items-center justify-center md:justify-start flex-wrap">
              {NAME.split("").map((letter, i) => (
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
                className="inline-block ml-3 md:ml-4"
              >
                👋
              </motion.span>
            </h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3 }}
              className="text-xl md:text-2xl mb-6 h-8 flex items-center justify-center md:justify-start"
            >
              <TypingRole />
              <span className="text-black/40 mx-2">•</span>
              <span className="text-[hsl(0,84%,60%)]">AI/ML ✨</span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.8 }}
              className="text-lg text-black/60 leading-relaxed mb-10 max-w-lg mx-auto md:mx-0"
            >
              I build reliable software and applied ML systems, bridging research and production to deliver scalable, high-performance solutions.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8, duration: 0.5 }}
              className="flex justify-center md:justify-start flex-wrap gap-4 mb-10"
            >
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.02, x: 4 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-xl font-medium group shadow-xl shadow-black/10"
              >
                View Projects
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.a>
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 px-6 py-3 border-2 border-black/10 text-black rounded-xl font-medium hover:border-black/30 transition-colors bg-white"
              >
                Contact
              </motion.a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
              className="flex justify-center md:justify-start items-center gap-4"
            >
              <span className="font-mono text-xs text-black/30 uppercase tracking-wider">find me</span>
              {socialLinks.map((social, i) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel={social.href.startsWith("http") ? "noreferrer" : undefined}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.1 + i * 0.1 }}
                  whileHover={{ scale: 1.2, y: -2 }}
                  className="w-10 h-10 rounded-xl bg-black/5 flex items-center justify-center text-black/50 hover:text-black hover:bg-black/10 transition-colors"
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Right - Chatbot AI Demo */}
          <div className="relative flex flex-col items-center lg:items-end w-full">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.8, type: "spring" }}
              className="w-full max-w-2xl bg-white border-2 border-black/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col h-[600px] relative z-10"
            >
              {/* Header */}
              <div className="bg-black text-white px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full overflow-hidden bg-[hsl(0,84%,60%)] border border-white/20">
                    <img src="/me.webp" alt="Agent" className="w-full h-full object-cover" />
                  </div>
                  <span className="font-medium font-mono text-xs tracking-tight">duy_agent_v1.0</span>
                </div>
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/20" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                </div>
              </div>
              
              {/* Split Pane Container */}
              <div className="flex-1 flex overflow-hidden">
                {/* Left: Chat Messages */}
                <div className="flex-1 p-5 overflow-y-auto flex flex-col gap-4 bg-gray-50/50 border-r border-black/5">
                  <AnimatePresence mode="popLayout">
                    {messages.map((msg, idx) => (
                      msg.role !== "pipeline" && (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          className={msg.role === "user" ? "self-end" : "self-start w-full"}
                        >
                          {msg.role === "user" ? (
                            <div className="bg-black text-white px-4 py-2.5 rounded-2xl rounded-tr-sm max-w-[85%] font-sans text-[13px] shadow-sm">
                              {msg.content}
                            </div>
                          ) : (
                            <div className="flex gap-3 max-w-[90%]">
                              <div className="w-7 h-7 rounded-full overflow-hidden bg-[hsl(0,84%,60%)] border-2 border-white shrink-0 mt-1 shadow-md">
                                <img src="/me.webp" alt="Agent" className="w-full h-full object-cover" />
                              </div>
                              <div className="bg-white border-2 border-black/10 text-black px-4 py-2.5 rounded-2xl rounded-tl-sm shadow-sm font-sans text-[13px] leading-relaxed">
                                {msg.content}
                              </div>
                            </div>
                          )}
                        </motion.div>
                      )
                    ))}
                  </AnimatePresence>
                  <div ref={messagesEndRef} />
                </div>

                {/* Right: Console Pipeline Viewer */}
                <div className="w-[35%] bg-gray-950 text-green-400 p-2.5 font-mono text-[10px] overflow-y-auto flex flex-col gap-1 border-l border-black/20">
                  <div className="text-gray-500 mb-1 text-[9px]">~ pipeline</div>
                  
                  {messages
                    .filter((msg) => msg.role === "pipeline")
                    .map((msg, idx) => (
                      <div key={idx} className="space-y-0.5">
                        {msg.steps?.map((step, i) => (
                          <motion.div 
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-green-400 flex items-start gap-1.5 text-[9px] leading-tight"
                          >
                            <span className="text-green-600 shrink-0 text-[8px]">▸</span>
                            <span className="line-clamp-2">{step}</span>
                          </motion.div>
                        ))}
                        {idx < messages.filter((m) => m.role === "pipeline").length - 1 && (
                          <div className="text-gray-700 my-0.5 text-[8px]">---</div>
                        )}
                      </div>
                    ))}
                  
                  {isFlowing && (
                    <div className="mt-2 pt-2 border-t border-gray-700">
                      <div className="text-green-400 flex items-center gap-1.5 text-[9px]">
                        <span>processing</span>
                        <motion.span
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{ repeat: Infinity, duration: 1 }}
                          className="flex gap-0.5 text-[8px]"
                        >
                          <span>.</span>
                          <span>.</span>
                          <span>.</span>
                        </motion.span>
                      </div>
                      <div className="mt-1 space-y-0.5">
                        {processHistory.map((step, i) => (
                          <motion.div 
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-green-400 flex items-start gap-1.5 text-[9px] leading-tight"
                          >
                            <span className="text-green-600 shrink-0 text-[8px]">▸</span>
                            <span className="line-clamp-2">{step}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Input Bar */}
              <div className="p-3 border-t-2 border-black/5 bg-white z-10">
                <div className={`rounded-xl px-4 py-2 flex items-center justify-between transition-all ${
                  agentState === "offline" 
                    ? "bg-red-50 border border-red-200" 
                    : "bg-black/5 focus-within:ring-1 focus-within:ring-black/10"
                }`}>
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    disabled={agentState === "offline"}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        sendMessage();
                      }
                    }}
                    placeholder={agentState === "offline" ? "Chat disconnected..." : "Ask anything..."}
                    className="flex-1 bg-transparent text-black outline-none placeholder:text-black/40 h-7 text-xs disabled:cursor-not-allowed"
                  />
                  <div className="mx-3 flex items-center gap-1.5 px-2 py-0.5 bg-black/10 border border-black/5 rounded-md">
                    <div className="w-1.5 h-1.5 rounded-full bg-[hsl(229,96%,65%)] animate-pulse" />
                    <span className="text-[9px] font-bold text-black/60 tracking-wider">GEMMA4</span>
                  </div>
                  {agentState === "offline" ? (
                    <button 
                      onClick={retryConnection}
                      className="flex items-center gap-1.5 px-3 py-1 bg-red-500 text-white text-[10px] font-bold uppercase tracking-wider rounded-lg hover:bg-red-600 transition-colors"
                    >
                      <Sparkles className="w-3 h-3" />
                      Retry
                    </button>
                  ) : (
                    <button 
                      onClick={sendMessage} 
                      disabled={!input.trim()}
                      className="bg-black text-white rounded-md p-1.5 hover:bg-black/80 transition-colors ml-2 shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            </motion.div>

            {/* AI Architecture Note */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="mt-6 w-full max-w-2xl p-4 rounded-xl bg-black/2 border border-black/5"
            >
              <div className="flex items-start gap-3">
                <div className="p-1.5 rounded-lg bg-black text-white mt-0.5">
                  <Bot className="w-3.5 h-3.5" />
                </div>
                <div className="space-y-1.5">
                  <p className="text-xs font-semibold text-black/80">Architecture Note</p>
                  <p className="text-[11px] leading-relaxed text-black/50 font-medium">
                    Built using <span className="text-black/70 font-semibold">Wiki-LLM</span> style inspired by Andrej Karpathy. Wiki is organized by Agent.<br />
                    The agent is <span className="text-black/70 font-semibold">hallucination-free</span>. No vector DB or embedding model needed.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-linear-to-tr from-[hsl(0,84%,60%)]/5 to-transparent rounded-full blur-3xl -z-10 pointer-events-none"
            />
          </div>
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

