import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { 
  Shield, 
  AlertTriangle, 
  Car, 
  Cpu, 
  Network, 
  FileText, 
  ExternalLink, 
  ChevronDown,
  Zap,
  Lock,
  Brain,
  BarChart3,
  Github,
  Linkedin,
  Mail
} from "lucide-react";

import { FEATURED_PUBLICATIONS } from "@/const/publications";

const publications = FEATURED_PUBLICATIONS;

import heroImage from "@/assets/pub-bg.jpg";
import can from "@/assets/IVN.png";
import can_attacked from "@/assets/IVN_ATTACKED.png";

function AnimatedSection({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function IDSVisualization() {
  const layers = [
    { name: "Input Layer", neurons: 8, desc: "CAN Frame Features" },
    { name: "LSTM Layer 1", neurons: 6, desc: "Temporal Patterns" },
    { name: "LSTM Layer 2", neurons: 6, desc: "Sequence Memory" },
    { name: "Dense Layer", neurons: 4, desc: "Feature Extraction" },
    { name: "Output", neurons: 2, desc: "Classification" },
  ];

  return (
    <div className="relative w-full bg-card rounded-2xl border border-border overflow-hidden">
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-red-200 rounded-xl flex items-center justify-center">
            <Brain className="w-5 h-5 text-[hsl(0,84%,60%)]" />
          </div>
          <div>
            <h4 className="font-semibold">Neural Network Architecture</h4>
            <p className="text-sm text-muted-foreground">Real-time CAN message classification</p>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center justify-between gap-2 mb-8">
          {layers.map((layer, layerIdx) => (
            <div key={layer.name} className="flex flex-col items-center flex-1">
              <div className="flex flex-col gap-1 items-center mb-2">
                {Array.from({ length: layer.neurons }).map((_, i) => (
                  <motion.div
                    key={i}
                    className={`w-3 h-3 rounded-full ${layerIdx === layers.length - 1 && i === 0 ? 'bg-emerald-500' : layerIdx === layers.length - 1 && i === 1 ? 'bg-[hsl(0,84%,60%)]' : 'bg-foreground/20'}`}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: layerIdx * 0.1 + i * 0.02 }}
                  />
                ))}
              </div>
              <span className="text-[10px] font-mono text-muted-foreground text-center">{layer.name}</span>
            </div>
          ))}
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
            <div className="w-2 h-2 rounded-full bg-foreground/40" />
            <span className="text-xs text-muted-foreground font-mono flex-1">0x7DF 02 01 0C 00 00 00 00 00</span>
            <span className="text-xs text-emerald-600 font-medium">NORMAL</span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
            <div className="w-2 h-2 rounded-full bg-foreground/40" />
            <span className="text-xs text-muted-foreground font-mono flex-1">0x7E8 03 41 0C 1A F8 00 00 00</span>
            <span className="text-xs text-emerald-600 font-medium">NORMAL</span>
          </div>
          <motion.div 
            className="flex items-center gap-3 p-3 bg-[hsl(0,84%,60%)]/5 rounded-lg border border-[hsl(0,84%,60%)]/20"
            animate={{ backgroundColor: ["rgba(220,60,60,0.05)", "rgba(220,60,60,0.1)", "rgba(220,60,60,0.05)"] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <motion.div 
              className="w-2 h-2 rounded-full bg-[hsl(0,84%,60%)]"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 0.5, repeat: Infinity }}
            />
            <span className="text-xs text-muted-foreground font-mono flex-1">0x000 FF FF FF FF FF FF FF FF</span>
            <span className="text-xs text-[hsl(0,84%,60%)] font-semibold">ATTACK BLOCKED</span>
          </motion.div>
          <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
            <div className="w-2 h-2 rounded-full bg-foreground/40" />
            <span className="text-xs text-muted-foreground font-mono flex-1">0x7DF 02 01 05 00 00 00 00 00</span>
            <span className="text-xs text-emerald-600 font-medium">NORMAL</span>
          </div>
        </div>
      </div>
      
      <div className="p-4 border-t border-border bg-muted/30">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-muted-foreground">Normal</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[hsl(0,84%,60%)]" />
              <span className="text-muted-foreground">Attack</span>
            </span>
          </div>
          <span className="font-mono text-muted-foreground">Processing: 10,000 msg/s</span>
        </div>
      </div>
    </div>
  );
}

const attackTypes = [
  { name: "DoS Attack", description: "Flooding the CAN bus with high-priority messages", icon: Zap },
  { name: "Spoofing", description: "Injecting fake messages to manipulate vehicle behavior", icon: AlertTriangle },
  { name: "Replay Attack", description: "Recording and replaying legitimate CAN messages", icon: Network },
  { name: "Fuzzing", description: "Sending random data to discover vulnerabilities", icon: BarChart3 },
];

export default function PublicationsPage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  return (
    <div className="min-h-screen bg-background">
      <motion.section 
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
      >
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Vehicle Network Visualization" 
            className="w-full h-full object-cover opacity-20 grayscale"
          />
          <div className="absolute inset-0 bg-linear-to-b from-background/30 via-background/70 to-background" />
        </div>
        
        <div className="absolute inset-0 bg-grid opacity-30" />
        
        <div className="relative z-10 container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-200 border border-[hsl(0,84%,60%)]/30 rounded-full mb-8">
              <Shield className="w-4 h-4 text-[hsl(0,84%,60%)]" />
              <span className="text-sm font-mono text-[hsl(0,84%,60%)]">Research Publications</span>
            </div>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
          >
            <span className="text-[hsl(0,84%,60%)] glow-text-cyber">Deep Learning</span>
            <br />
            <span className="text-foreground">for Vehicle Security</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12"
          >
            Advancing intrusion detection in vehicle networks through applied machine learning and deep neural architectures
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="flex flex-col items-center gap-4"
          >
            <span className="text-sm text-muted-foreground">Scroll to explore</span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ChevronDown className="w-6 h-6 text-[hsl(0,84%,60%)]" />
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      <section className="py-12 relative" data-testid="section-ivn">
        <div className="container mx-auto px-6">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                What is an <span className="text-[hsl(0,84%,60%)]">In-Vehicle Network</span>?
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Modern vehicles contain dozens of Electronic Control Units (ECUs) that communicate over the Controller Area Network (CAN) bus
              </p>
            </div>
          </AnimatedSection>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection delay={0.2}>
              <img src={can} alt="In-Vehicle Network Illustration" />
              {/* <CANBusVisualization /> */}
            </AnimatedSection>
            
            <AnimatedSection delay={0.4}>
              <div className="space-y-6">
                <div className="flex items-start gap-4 p-4 bg-card/50 rounded-xl border border-border">
                  <div className="w-12 h-12 bg-red-200 rounded-lg flex items-center justify-center shrink-0">
                    <Car className="w-6 h-6 text-[hsl(0,84%,60%)]" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Modern Vehicle Architecture</h3>
                    <p className="text-sm text-muted-foreground">Up to 100+ ECUs controlling everything from engine to infotainment</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 p-4 bg-card/50 rounded-xl border border-border">
                  <div className="w-12 h-12 bg-red-200 rounded-lg flex items-center justify-center shrink-0">
                    <Network className="w-6 h-6 text-[hsl(0,84%,60%)]" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">CAN Bus Protocol</h3>
                    <p className="text-sm text-muted-foreground">Broadcast-based communication with no built-in authentication</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 p-4 bg-card/50 rounded-xl border border-border">
                  <div className="w-12 h-12 bg-red-200 rounded-lg flex items-center justify-center shrink-0">
                    <Lock className="w-6 h-6 text-[hsl(0,84%,60%)]" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Security Challenge</h3>
                    <p className="text-sm text-muted-foreground">Legacy design prioritized reliability over security</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="py-32 bg-card/30 relative" data-testid="section-attacks">
        <div className="absolute inset-0 bg-circuit opacity-20" />
        <div className="container mx-auto px-6 relative z-10">
          <AnimatedSection>
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-danger/10 border border-danger/30 rounded-full mb-6">
                <AlertTriangle className="w-4 h-4 text-danger" />
                <span className="text-sm font-mono text-danger">Threat Landscape</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                How Vehicles <span className="text-danger">Get Attacked</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Attackers can exploit the lack of authentication in CAN bus to inject malicious messages
              </p>
            </div>
          </AnimatedSection>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <AnimatedSection delay={0.2}>
              <img src={can_attacked} alt="In-Vehicle Network Illustration" />
            </AnimatedSection>
            
            <AnimatedSection delay={0.3}>
              <div className="grid grid-cols-2 gap-4">
                {attackTypes.map((attack, i) => (
                  <motion.div
                    key={attack.name}
                    className="p-4 bg-card/50 rounded-xl border border-danger/20 hover:border-danger/40 transition-colors"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <attack.icon className="w-8 h-8 text-[hsl(0,84%,60%)] mb-3" />
                    <h3 className="font-semibold mb-1">{attack.name}</h3>
                    <p className="text-xs text-muted-foreground">{attack.description}</p>
                  </motion.div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="py-32 relative" data-testid="section-ids">
        <div className="container mx-auto px-6">
          <AnimatedSection>
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-success/10 border border-success/30 rounded-full mb-6">
                <Shield className="w-4 h-4 text-success" />
                <span className="text-sm font-mono text-success">Defense Mechanism</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Deep Learning <span className="bg-red-200">IDS Protection</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Our research applies advanced neural networks to detect and prevent attacks in real-time
              </p>
            </div>
          </AnimatedSection>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection delay={0.2} className="order-2 lg:order-1">
              <div className="space-y-6">
                <div className="p-6 bg-card/50 rounded-xl border border-[hsl(0,84%,60%)]/20">
                  <div className="flex items-center gap-3 mb-4">
                    <Brain className="w-8 h-8 text-[hsl(0,84%,60%)]" />
                    <h3 className="text-xl font-semibold">Neural Network Architecture</h3>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    LSTM and CNN-based models trained on millions of CAN messages to learn normal vehicle behavior patterns
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 text-xs bg-red-200 text-[hsl(0,84%,60%)] rounded-md font-mono">LSTM</span>
                    <span className="px-2 py-1 text-xs bg-red-200 text-[hsl(0,84%,60%)] rounded-md font-mono">CNN</span>
                    <span className="px-2 py-1 text-xs bg-red-200 text-[hsl(0,84%,60%)] rounded-md font-mono">Attention</span>
                    <span className="px-2 py-1 text-xs bg-red-200 text-[hsl(0,84%,60%)] rounded-md font-mono">Transformer</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-4 bg-card/50 rounded-xl border border-border text-center">
                    <div className="text-3xl font-bold text-[hsl(0,84%,60%)] mb-1">99.2%</div>
                    <div className="text-xs text-muted-foreground">Detection Rate</div>
                  </div>
                  <div className="p-4 bg-card/50 rounded-xl border border-border text-center">
                    <div className="text-3xl font-bold text-[hsl(0,84%,60%)] mb-1">&lt;1ms</div>
                    <div className="text-xs text-muted-foreground">Latency</div>
                  </div>
                  <div className="p-4 bg-card/50 rounded-xl border border-border text-center">
                    <div className="text-3xl font-bold text-[hsl(0,84%,60%)] mb-1">0.1%</div>
                    <div className="text-xs text-muted-foreground">False Positives</div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
            
            <AnimatedSection delay={0.3} className="order-1 lg:order-2">
              <IDSVisualization />
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="py-32 bg-card/30 relative" data-testid="section-publications">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="container mx-auto px-6 relative z-10">
          <AnimatedSection>
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-200 border border-[hsl(0,84%,60%)]/30 rounded-full mb-6">
                <FileText className="w-4 h-4 text-[hsl(0,84%,60%)]" />
                <span className="text-sm font-mono text-[hsl(0,84%,60%)]">Research Output</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Featured <span className="bg-red-200">Publications</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Peer-reviewed papers published in top security and automotive venues
              </p>
            </div>
          </AnimatedSection>
          
          <div className="grid md:grid-cols-2 gap-6">
            {publications.map((pub, i) => (
              <AnimatedSection key={pub.id} delay={i * 0.1}>
                <motion.a
                  href={pub.link}
                  className="block p-6 bg-card/80 backdrop-blur-sm rounded-xl border border-border hover:border-[hsl(0,84%,60%)]/50 transition-all group"
                  whileHover={{ y: -4 }}
                  data-testid={`publication-card-${pub.id}`}
                >
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <span className="text-xs font-mono text-[hsl(0,84%,60%)]">{pub.year}</span>
                      <h3 className="text-lg font-semibold mt-1 group-hover:text-[hsl(0,84%,60%)] transition-colors">
                        {pub.title}
                      </h3>
                    </div>
                    <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-[hsl(0,84%,60%)] transition-colors shrink-0" />
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 italic">{pub.venue}</p>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{pub.abstract}</p>
                  <div className="flex flex-wrap gap-2">
                    {pub.tags.map(tag => (
                      <span key={tag} className="px-2 py-1 text-xs bg-muted rounded-md text-muted-foreground">
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.a>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 relative" data-testid="section-research">
        <div className="container mx-auto px-6">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Research <span className="bg-red-200">Areas</span>
              </h2>
            </div>
          </AnimatedSection>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { 
                icon: Brain, 
                title: "Deep Learning Models", 
                desc: "Developing novel architectures for temporal pattern recognition in CAN traffic" 
              },
              { 
                icon: Shield, 
                title: "Anomaly Detection", 
                desc: "Unsupervised learning for detecting zero-day attacks without labeled data" 
              },
              { 
                icon: Cpu, 
                title: "Edge Deployment", 
                desc: "Optimizing models for real-time inference on automotive-grade hardware" 
              },
            ].map((item, i) => (
              <AnimatedSection key={item.title} delay={i * 0.1}>
                <div className="p-8 bg-card/50 rounded-xl border border-border hover:border-[hsl(0,84%,60%)]/30 transition-colors text-center group">
                  <div className="w-16 h-16 mx-auto bg-red-200 rounded-xl flex items-center justify-center mb-6 group-hover:glow-cyber transition-all">
                    <item.icon className="w-8 h-8 text-[hsl(0,84%,60%)]" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* <footer className="py-16 border-t border-border" data-testid="footer">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h3 className="text-xl font-bold mb-2">Vehicle Network IDS Research</h3>
              <p className="text-sm text-muted-foreground">Advancing automotive cybersecurity through deep learning</p>
            </div>
            <div className="flex items-center gap-4">
              <a 
                href="#" 
                className="w-10 h-10 bg-card rounded-lg flex items-center justify-center border border-border hover:border-[hsl(0,84%,60%)]/50 transition-colors"
                data-testid="link-github"
              >
                <Github className="w-5 h-5 text-muted-foreground hover:text-[hsl(0,84%,60%)]" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-card rounded-lg flex items-center justify-center border border-border hover:border-[hsl(0,84%,60%)]/50 transition-colors"
                data-testid="link-linkedin"
              >
                <Linkedin className="w-5 h-5 text-muted-foreground hover:text-[hsl(0,84%,60%)]" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-card rounded-lg flex items-center justify-center border border-border hover:border-[hsl(0,84%,60%)]/50 transition-colors"
                data-testid="link-email"
              >
                <Mail className="w-5 h-5 text-muted-foreground hover:text-[hsl(0,84%,60%)]" />
              </a>
            </div>
          </div>
        </div>
      </footer> */}
    </div>
  );
}
