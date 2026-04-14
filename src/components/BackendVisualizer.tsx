import { motion } from "framer-motion";
import { Brain, Database, LoaderCircle } from "lucide-react";
import type { AgentState } from "@/hooks/useAgentChat";

type BackendVisualizerProps = {
  agentState: AgentState;
  statusText: string;
  isFlowing: boolean;
};

const NODE_PULSE = {
  idle: { scale: 1, opacity: 0.8 },
  active: {
    scale: [1, 1.04, 1],
    opacity: [0.8, 1, 0.8],
    transition: { repeat: Infinity, duration: 1.2, ease: "easeInOut" as const },
  },
};

export function BackendVisualizer({ agentState, statusText, isFlowing }: BackendVisualizerProps) {
  return (
    <section className="relative rounded-3xl border border-dashed border-[hsl(0,84%,60%)]/40 bg-white p-6 min-h-115 shadow-sm overflow-hidden">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top_right,rgba(239,68,68,0.08),transparent_45%)]" />

      <div className="relative z-10 flex items-start justify-between mb-6">
        <div>
          <p className="font-mono text-xs uppercase tracking-wider text-black/40">Backend</p>
          <h3 className="text-xl font-semibold text-black/90">Agent Runtime</h3>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full border border-black/10 px-3 py-1 text-xs text-black/60">
          <LoaderCircle className={`h-3.5 w-3.5 ${isFlowing ? "animate-spin text-[hsl(0,84%,60%)]" : ""}`} />
          {agentState}
        </div>
      </div>

      <div className="space-y-4 relative z-10">
        <motion.div
          variants={NODE_PULSE}
          animate={isFlowing ? "active" : "idle"}
          className="rounded-2xl border border-black/10 bg-[#fafafa] p-4"
        >
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-black text-white flex items-center justify-center">
              <Brain className="h-5 w-5" />
            </div>
            <div>
              <p className="font-medium text-black">LLM Node</p>
              <p className="text-xs text-black/50">Reasoning + response streaming</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={NODE_PULSE}
          animate={isFlowing ? "active" : "idle"}
          className="rounded-2xl border border-black/10 bg-[#fafafa] p-4"
        >
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-[hsl(0,84%,60%)] text-white flex items-center justify-center">
              <Database className="h-5 w-5" />
            </div>
            <div>
              <p className="font-medium text-black">Wiki Database Node</p>
              <p className="text-xs text-black/50">Index lookups + retrieval</p>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="relative z-10 mt-6 rounded-2xl border border-black/10 bg-white p-4">
        <p className="font-mono text-[11px] uppercase tracking-wider text-black/40 mb-2">Runtime Status</p>
        <p className="text-sm text-black/75">{statusText}</p>
      </div>

      <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <motion.path
          d="M 0 70 C 20 66, 35 40, 55 36"
          fill="none"
          stroke="hsl(0,84%,60%)"
          strokeWidth="1.4"
          strokeDasharray="6 6"
          strokeLinecap="round"
          initial={{ opacity: 0.25 }}
          animate={isFlowing ? { strokeDashoffset: [0, -20], opacity: 1 } : { strokeDashoffset: 0, opacity: 0.25 }}
          transition={isFlowing ? { repeat: Infinity, ease: "linear", duration: 1 } : { duration: 0.3 }}
        />
      </svg>
    </section>
  );
}
