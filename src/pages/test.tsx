import { useEffect, useRef, useState } from "react";
import { Terminal, AlertTriangle, Cpu, Radio, ShieldCheck, ExternalLink, FileText, ChevronDown } from "lucide-react";
import { AnimatePresence, motion, useInView } from "framer-motion";

import { FEATURED_PUBLICATIONS } from "@/const/publications";

const publications = FEATURED_PUBLICATIONS;


// --- STYLES ---
const COLORS = {
  bg: "bg-[#ffffff]",
  text: "text-[#111111]",
  accentRed: "#ff4d4d",
  accentGreen: "#00c853",
  blueprint: "#3b82f6", // A subtle technical blue for the physical layer
};

const FONTS = {
  serif: "font-serif",
  mono: "font-mono",
  sans: "font-sans",
};

type StepId = 0 | 1 | 2 | 3 | 4;

type Step = {
  id: StepId;
  title: string;
  content: React.ReactNode;
};

// --- DATA ---
const steps: Step[] = [
  {
    id: 0,
    title: "1. The Physical Layer",
    content:
      "We start with the physical reality. A vehicle is a complex machine with ECUs (Electronic Control Units) distributed throughout the chassis. They are connected by a physical wire harness woven through the frame.",
  },
  {
    id: 1,
    title: "2. Logical Abstraction",
    content: (
      <>
        To analyze security, we map this physical mess to a{" "}
        <span className="bg-gray-100 px-1 rounded font-mono text-sm">
          Logical Topology
        </span>
        . Notice how the ECUs snap from their physical locations to a unified bus
        line. This is the <b>CAN Bus</b>.
      </>
    ),
  },
  {
    id: 2,
    title: "3. The Attack Surface",
    content: (
      <>
        Because CAN is a broadcast protocol, it is vulnerable. An attacker can
        physically splice into the wiring or use the OBD-II port to inject a
        <span className="text-red-500 bg-red-50 px-1 mx-1 rounded font-mono text-sm">
          Rogue Node
        </span>
        .
      </>
    ),
  },
{
    id: 3,
    title: "4. Intrusion Detection (IDS)",
    content: (
      <>
        To secure the network, we attach an <span className="bg-green-50 text-green-700 px-1 rounded font-mono text-sm">IDS Node</span>. 
        It acts as a "sniffer," capturing a sliding window of messages to analyze the traffic flow in real-time.
      </>
    )
  },
  {
    id: 4,
    title: "5. Deep Learning Defense",
    content: "Inside the IDS, we use a Transformer. We convert the sequence of captured messages into an (N × F) matrix. The model's self-attention mechanism detects complex attack patterns that simple rules miss."
  }
];

// --- COORDINATES (The "Source of Truth") ---

// --- COORDINATES (The "Source of Truth") ---
type XY = { x: number; y: number };
type PositionPair = { physical: XY; logical: XY };
type Positions = {
  engine: PositionPair;
  brake: PositionPair;
  steering: PositionPair;
  gateway: PositionPair;
};

const POSITIONS: Positions = {
  engine: { physical: { x: 160, y: 340 }, logical: { x: 150, y: 200 } },
  brake: { physical: { x: 620, y: 390 }, logical: { x: 350, y: 200 } },
  steering: { physical: { x: 340, y: 290 }, logical: { x: 550, y: 200 } },
  gateway: { physical: { x: 420, y: 320 }, logical: { x: 700, y: 200 } },
};

type UnifiedVisualizationProps = { step: StepId };

// --- VISUALIZATION CANVAS ---
const UnifiedVisualization = ({ step }: UnifiedVisualizationProps) => {
    // State Flags
    const isPhysical = step === 0;
    const isLogical = step >= 1 && step <= 3;
    const showAttacker = step >= 2 && step <= 3; // step 2 & 3
    const showIDS = step === 3;
    const isModel = step === 4;
    const showECU = step >= 0 && step <= 3;

  return (
    <div className="w-full h-full flex items-center justify-center bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] bg-size-[24px_24px]">
      <svg
        viewBox="0 0 800 600"
        className="w-full h-full max-w-4xl overflow-visible"
      >
        {/* 1. CAR BLUEPRINT (Step 0) */}
        <motion.g
          animate={{
            opacity: isPhysical ? 1 : 0.1,
            filter: isPhysical ? "grayscale(0%)" : "grayscale(100%)",
          }}
          transition={{ duration: 1 }}
        >
          <ellipse cx="400" cy="450" rx="320" ry="15" fill="#f3f4f6" />
          <path
            d="M 80,360 L 120,300 L 260,260 L 520,260 L 640,300 L 720,320 L 720,410 L 680,420 L 560,420 L 240,420 L 120,420 L 80,400 Z"
            fill="none"
            stroke="#111"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          <path
            d="M 270,270 L 510,270 L 620,300 L 270,300 Z"
            fill="none"
            stroke="#ccc"
            strokeWidth="2"
          />
          <circle cx="180" cy="420" r="35" fill="white" stroke="#111" strokeWidth="3" />
          <circle cx="620" cy="420" r="35" fill="white" stroke="#111" strokeWidth="3" />
        </motion.g>

        {/* 2. PHYSICAL HARNESS (Step 0 Only) */}
        <motion.path
          d="M 160,340 C 200,340 250,380 340,300 C 400,250 420,320 420,320 L 620,390"
          fill="none"
          stroke={COLORS.blueprint}
          strokeWidth="2"
          strokeDasharray="6,4"
          animate={{ opacity: isPhysical ? 1 : 0 }}
        />

        {/* 3. LOGICAL BUS (Step 1+) */}
        <motion.g animate={{ opacity: isLogical ? 1 : 0 }}>
          <motion.line
            x1="50"
            y1="200"
            x2="750"
            y2="200"
            stroke="#111"
            strokeWidth="6"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: isLogical ? 1 : 0 }}
            transition={{ duration: 1 }}
          />
        </motion.g>

        {/* 4. ECUS (Moving) */}
        {showECU && (
        <>
        <MovingECU
          label="Engine"
          icon={<Cpu size={18} />}
          x={isPhysical ? POSITIONS.engine.physical.x : POSITIONS.engine.logical.x}
          y={isPhysical ? POSITIONS.engine.physical.y : POSITIONS.engine.logical.y}
          busActive={isLogical}
        />
        <MovingECU
          label="Steering"
          icon={<Terminal size={18} />}
          x={isPhysical ? POSITIONS.steering.physical.x : POSITIONS.steering.logical.x}
          y={isPhysical ? POSITIONS.steering.physical.y : POSITIONS.steering.logical.y}
          busActive={isLogical}
        />
        <MovingECU
          label="Gateway"
          icon={<Radio size={18} />}
          x={isPhysical ? POSITIONS.gateway.physical.x : POSITIONS.gateway.logical.x}
          y={isPhysical ? POSITIONS.gateway.physical.y : POSITIONS.gateway.logical.y}
          busActive={isLogical}
        />
        <MovingECU
          label="Brake"
          icon={<AlertTriangle size={18} />}
          x={isPhysical ? POSITIONS.brake.physical.x : POSITIONS.brake.logical.x}
          y={isPhysical ? POSITIONS.brake.physical.y : POSITIONS.brake.logical.y}
          busActive={isLogical}
        />
        </>)}

        {/* 5. ATTACKER (Step 2 & 3) */}
        <motion.g
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: showAttacker ? 1 : 0, y: showAttacker ? 0 : 50 }}
          transition={{ type: "spring" }}
        >
          <line
            x1="450"
            y1="200"
            x2="450"
            y2="340"
            stroke={COLORS.accentRed}
            strokeWidth="2"
            strokeDasharray="4 4"
          />
          <rect
            x="410"
            y="340"
            width="80"
            height="60"
            rx="8"
            fill="white"
            stroke={COLORS.accentRed}
            strokeWidth="2"
          />
          <text
            x="450"
            y="375"
            textAnchor="middle"
            fill={COLORS.accentRed}
            className="text-xs font-bold font-mono"
          >
            Attacker
          </text>
        </motion.g>

        {/* 6. TRAFFIC (Logic Only) */}
        {isLogical && !isModel &&<TrafficSimulator isAttack={step >= 2} />}

        {/* 7. IDS SCANNER (Step 3) */}
        <AnimatePresence>
          {showIDS && (
            <motion.g
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <g transform="translate(250, 80)">
                <line
                  x1="0"
                  y1="20"
                  x2="0"
                  y2="120"
                  stroke={COLORS.accentGreen}
                  strokeWidth="2"
                  strokeDasharray="4 4"
                />
                <rect
                  x="-40"
                  y="-40"
                  width="80"
                  height="60"
                  rx="8"
                  fill="white"
                  stroke={COLORS.accentGreen}
                  strokeWidth="2"
                />
                <foreignObject x="-40" y="-40" width="80" height="60">
                  <div className="w-full h-full flex flex-col items-center justify-center text-green-600">
                    <ShieldCheck size={24} />
                    <span className="text-[10px] font-bold font-mono mt-1">
                      IDS
                    </span>
                  </div>
                </foreignObject>
              </g>

              <motion.rect
                x="180"
                y="170"
                width="200"
                height="60"
                rx="10"
                fill="none"
                stroke={COLORS.accentGreen}
                strokeWidth="2"
                strokeDasharray="8 4"
                animate={{ x: [180, 220, 180] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.text
                x="280"
                y="160"
                textAnchor="middle"
                fill={COLORS.accentGreen}
                className="text-xs font-mono font-bold"
                animate={{ x: [280, 320, 280] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                Scanning (N frames)...
              </motion.text>
            </motion.g>
          )}
        </AnimatePresence>

        <TransformerOverlay visible={isModel} />
      </svg>
    </div>
  );
};

type MovingECUProps = {
  x: number;
  y: number;
  label: string;
  icon: React.ReactNode;
  busActive: boolean;
};

const MovingECU = ({ x, y, label, icon, busActive }: MovingECUProps) => (
  <motion.g
    animate={{ x, y }}
    transition={{ type: "spring", stiffness: 50, damping: 20 }}
  >
    <motion.line
      x1="0"
      y1="0"
      x2="0"
      y2={-40}
      stroke="#111"
      strokeWidth="2"
      animate={{ opacity: busActive ? 1 : 0, scaleY: busActive ? 1 : 0 }}
    />
    <rect
      x="-30"
      y="-30"
      width="60"
      height="60"
      rx="8"
      fill="white"
      stroke="#111"
      strokeWidth="2"
      className="shadow-sm"
    />
    <foreignObject x="-30" y="-30" width="60" height="60">
      <div className="w-full h-full flex flex-col items-center justify-center">
        {icon}
        <span className="text-[9px] font-bold mt-1 font-mono uppercase">
          {label}
        </span>
      </div>
    </foreignObject>
  </motion.g>
);

type TrafficDot = { id: number; isMalicious: boolean };
type TrafficSimulatorProps = { isAttack: boolean };

const TrafficSimulator = ({ isAttack }: TrafficSimulatorProps) => {
  const [dots, setDots] = useState<TrafficDot[]>([]);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      const id = Math.random();
      const isMalicious = isAttack && Math.random() > 0.4;
      setDots((d) => [...d, { id, isMalicious }]);

      window.setTimeout(() => {
        setDots((d) => d.filter((x) => x.id !== id));
      }, 1500);
    }, isAttack ? 150 : 600);

    return () => window.clearInterval(intervalId);
  }, [isAttack]);

  return (
    <g>
      {dots.map((d) => (
        <motion.circle
          key={d.id}
          r={4}
          fill={d.isMalicious ? COLORS.accentRed : "#111"}
          initial={{ cx: 50, cy: 200, opacity: 0 }}
          animate={{ cx: 750, opacity: 1 }}
          transition={{ duration: 1.5, ease: "linear" }}
        />
      ))}
    </g>
  );
};

type TransformerOverlayProps = { visible: boolean };
const TransformerOverlay = ({ visible } : TransformerOverlayProps) => {
    return (
        <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: visible ? 1 : 0 }}
            transition={{ duration: 0.5 }}
        >
            {/* 1. FOCUS BACKDROP */}
            <rect x="0" y="0" width="800" height="600" fill="white" fillOpacity="0.9" />

            {/* 2. INPUT SEQUENCE (The Matrix) */}
            <g transform="translate(80, 180)">
                 <text className="font-mono text-sm font-bold fill-gray-700" y="-20">Input Sequence (N×F)</text>
                 
                 {/* Container Border */}
                 <rect width="120" height="140" rx="4" fill="white" stroke="#333" strokeWidth="2" />
                 
                 {/* Animated Matrix Rows */}
                 <MatrixRows active={visible} />
            </g>

            {/* 3. PATH 1: DATA FLOW (Matrix -> Model) */}
            <DataPath startX={210} startY={250} endX={320} endY={250} active={visible} />


            {/* 4. THE TRANSFORMER (The Brain) */}
            <g transform="translate(340, 160)">
                {/* Glow Effect */}
                <motion.rect 
                    x="-10" y="-10" width="160" height="200" rx="15" fill={COLORS.blueprint} style={{ filter: "blur(20px)" }} opacity="0.2"
                    animate={{ opacity: [0.2, 0.4, 0.2] }} transition={{ duration: 2, repeat: Infinity }}
                />
                
                {/* Main Box */}
                <rect width="140" height="180" rx="10" fill="#111" stroke={COLORS.blueprint} strokeWidth="2" />
                
                {/* Header */}
                <text x="70" y="30" fill="white" textAnchor="middle" className="font-mono text-xs font-bold tracking-widest">TRANSFORMER</text>
                
                {/* Internal "Self-Attention" Visualization */}
                <g transform="translate(20, 50)">
                    <AttentionNetwork active={visible} />
                </g>

                {/* Label */}
                <text x="70" y="165" fill="#888" textAnchor="middle" className="font-mono text-[10px]">Multi-Head Attention</text>
            </g>


            {/* 5. PATH 2: DATA FLOW (Model -> Output) */}
            <DataPath startX={500} startY={250} endX={600} endY={250} active={visible} delay={0.5} />


            {/* 6. CLASSIFICATION OUTPUT */}
            <g transform="translate(620, 215)">
                <OutputPill active={visible} />
            </g>

        </motion.g>
    );
};


// --- SUB-COMPONENTS FOR ANIMATION DETAILS ---

// 1. Matrix Rows: Highlights rows sequentially to simulate "Reading"
const MatrixRows = ({ active } : { active: boolean }) => {
    return (
        <g transform="translate(10, 15)">
            {/* Draw 4 rows */}
            {[0, 1, 2, 3].map((i) => (
                <motion.g key={i} transform={`translate(0, ${i * 30})`}>
                    {/* The Row Background */}
                    <motion.rect
                        width="100" height="20" rx="2"
                        fill="#eee"
                        animate={active ? { fill: ["#eee", "#dbeafe", "#eee"] } : {}}
                        transition={{ 
                            duration: 1.5, 
                            repeat: Infinity, 
                            delay: i * 0.3, // Staggered delay creates "scanning" effect
                            ease: "easeInOut" 
                        }}
                    />
                    {/* Simulated Features (Dots) */}
                    <circle cx="15" cy="10" r="3" fill="#aaa" />
                    <circle cx="35" cy="10" r="3" fill="#aaa" />
                    <circle cx="55" cy="10" r="3" fill="#aaa" />
                    <circle cx="85" cy="10" r="3" fill="#333" />
                </motion.g>
            ))}
        </g>
    );
};

// 2. DataPath: Animated particles traveling along a line
const DataPath = ({ startX, startY, endX, endY, active, delay = 0 } : { startX: number, startY: number, endX: number, endY: number, active: boolean, delay?: number }) => {
    return (
        <g>
            {/* Static Line */}
            <line x1={startX} y1={startY} x2={endX} y2={endY} stroke="#ddd" strokeWidth="2" />
            
            {/* Moving Particle */}
            {active && (
                <motion.circle
                    r="4" fill={COLORS.blueprint}
                    initial={{ cx: startX, cy: startY, opacity: 0 }}
                    animate={{ 
                        cx: [startX, endX], 
                        opacity: [0, 1, 0] 
                    }}
                    transition={{ 
                        duration: 1.5, 
                        repeat: Infinity, 
                        ease: "linear",
                        delay: delay
                    }}
                />
            )}
            
            {/* Arrow Head */}
            <path d={`M ${endX},${endY} L ${endX-10},${endY-5} L ${endX-10},${endY+5} Z`} fill="#ddd" />
        </g>
    );
};

// 3. AttentionNetwork: Nodes connecting randomly inside the box
const AttentionNetwork = ({ active } : { active: boolean }) => {
    // A 3x3 grid of dots
    const nodes = [
        {x: 10, y: 10}, {x: 50, y: 10}, {x: 90, y: 10},
        {x: 10, y: 50}, {x: 50, y: 50}, {x: 90, y: 50},
        {x: 10, y: 90}, {x: 50, y: 90}, {x: 90, y: 90},
    ];

    // Define some random connections to animate
    const connections = [
        { from: 0, to: 4 }, { from: 4, to: 8 }, { from: 2, to: 4 }, 
        { from: 4, to: 6 }, { from: 1, to: 5 }, { from: 3, to: 7 }
    ];

    return (
        <g>
            {/* Draw Links first so they are behind nodes */}
            {connections.map((conn, i) => (
                <motion.line
                    key={i}
                    x1={nodes[conn.from].x} y1={nodes[conn.from].y}
                    x2={nodes[conn.to].x} y2={nodes[conn.to].y}
                    stroke="white" strokeWidth="1"
                    initial={{ opacity: 0 }}
                    animate={active ? { opacity: [0, 0.6, 0] } : {}}
                    transition={{ 
                        duration: 2, 
                        repeat: Infinity, 
                        delay: i * 0.2, // Randomize twinkling
                        ease: "easeInOut" 
                    }}
                />
            ))}

            {/* Draw Nodes */}
            {nodes.map((n, i) => (
                <circle key={i} cx={n.x} cy={n.y} r="3" fill={COLORS.blueprint} />
            ))}
        </g>
    );
};

// 4. OutputPill: Result with a confidence meter
const OutputPill = ({ active } : { active: boolean }) => {
    return (
        <g>
             {/* The Pill Shape */}
             <motion.rect
                width="120" height="60" rx="30" fill={COLORS.accentGreen}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={active ? { scale: 1, opacity: 1 } : {}}
                transition={{ type: "spring", bounce: 0.5, delay: 0.5 }}
                className="shadow-lg"
             />
             
             {/* Text */}
             <text x="60" y="30" fill="white" textAnchor="middle" className="font-mono font-bold text-lg">
                 NORMAL
             </text>
             
             {/* Confidence Meter (Tiny bar below text) */}
             <text x="60" y="48" fill="rgba(255,255,255,0.8)" textAnchor="middle" className="font-mono text-[10px]">
                 CONF: 99.8%
             </text>
        </g>
    );
};

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

const IntroSection = () => {
  return (
    <section className="relative h-[calc(100vh-10rem)] flex flex-col items-center justify-center overflow-hidden bg-white">
      
      {/* Background Decor: Subtle Moving Grids */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] bg-size-[32px_32px] opacity-50"></div>
      
      {/* Animated Decor Circles */}
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.1, 0.3] }} 
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-50 rounded-full blur-3xl"
      />
      <motion.div 
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.1, 0.3] }} 
        transition={{ duration: 6, repeat: Infinity, delay: 1 }}
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-50 rounded-full blur-3xl"
      />

      {/* Main Content */}
      <div className="relative z-10 text-center px-4 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center space-x-2 bg-gray-50 border border-gray-200 rounded-full px-4 py-1.5 mb-6">
            <ShieldCheck size={14} className="text-red-600"/>
            <span className={`text-xs font-bold tracking-wider text-gray-600 uppercase ${FONTS.mono}`}>
              Cybersecurity Research
            </span>
          </div>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className={`text-5xl md:text-7xl font-bold mb-6 text-gray-900 ${FONTS.serif} leading-tight`}
        >
          Securing In-Vehicle Networks
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className={`text-lg md:text-xl text-gray-500 mb-10 leading-relaxed ${FONTS.sans}`}
        >
          Modern vehicles are computers on wheels. I research how <span className="text-red-700 font-semibold">Deep Learning</span> (Transformers) can detect anomalies in CAN Bus traffic to prevent cyberattacks.
        </motion.p>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ delay: 1, duration: 2, repeat: Infinity }}
        className="absolute bottom-12 flex flex-col items-center gap-2 text-gray-400"
      >
        <span className={`text-xs uppercase tracking-widest ${FONTS.mono}`}>Scroll to Explore</span>
        <ChevronDown size={20} />
      </motion.div>
    </section>
  );
};

// --- MAIN COMPONENT ---
export default function ResearchScroll() {
  const [currentStep, setCurrentStep] = useState<StepId>(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;

          const stepAttr = (entry.target as HTMLElement).dataset.step;
          if (!stepAttr) continue;

          const parsed = Number(stepAttr);
          if (parsed === 0 || parsed === 1 || parsed === 2 || parsed === 3 || parsed ===4) {
            setCurrentStep(parsed);
          }
        }
      },
      { threshold: 0.6 }
    );

    const elements = document.querySelectorAll<HTMLElement>(".step-trigger");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className={`${COLORS.bg} ${COLORS.text} font-sans`}>
        <IntroSection />
        <div className="flex flex-col md:flex-row w-full max-w-7xl mx-auto">
            {/* RIGHT: VIZ */}
            <div className="sticky top-0 h-[55vh] md:h-[calc(100vh-5rem)] bg-white flex items-center justify-center w-full md:w-2/3">
                <UnifiedVisualization step={currentStep} />
            </div>
            {/* LEFT: TEXT */}
            <div className="w-full relative z-10 md:w-1/3 md:order-1 md:pb-24">
                {steps.map((step) => (
                    <div
                    key={step.id}
                    data-step={step.id}
                    className="step-trigger min-h-screen flex flex-col justify-center px-8 md:px-12 pointer-events-auto transition-opacity duration-500"
                    style={{ opacity: currentStep === step.id ? 1 : 0.3 }}
                    >
                    <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl border border-gray-100 shadow-sm">
                        <h2 className={`text-3xl mb-4 ${FONTS.serif}`}>{step.title}</h2>
                        <div
                        className={`text-lg leading-relaxed text-gray-600 ${FONTS.sans}`}
                        >
                        {step.content}
                        </div>
                    </div>
                    </div>
                ))}
                <div className="h-64 hidden md:block"></div>
            </div>


        </div>
      <section
        className="py-32 bg-card/30 relative"
        data-testid="section-publications"
      >
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="container mx-auto px-6 relative z-10">
          <AnimatedSection>
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-200 border border-[hsl(0,84%,60%)]/30 rounded-full mb-6">
                <FileText className="w-4 h-4 text-[hsl(0,84%,60%)]" />
                <span className="text-sm font-mono text-[hsl(0,84%,60%)]">
                  Research Output
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Featured <span className="bg-red-200">Publications</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Peer-reviewed papers published in top security and automotive
                venues
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
                      <span className="text-xs font-mono text-[hsl(0,84%,60%)]">
                        {pub.year}
                      </span>
                      <h3 className="text-lg font-semibold mt-1 group-hover:text-[hsl(0,84%,60%)] transition-colors">
                        {pub.title}
                      </h3>
                    </div>
                    <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-[hsl(0,84%,60%)] transition-colors shrink-0" />
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 italic">
                    {pub.venue}
                  </p>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                    {pub.abstract}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {pub.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-xs bg-muted rounded-md text-muted-foreground"
                      >
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
    </div>
  );
}