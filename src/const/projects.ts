export type ProjectCategory = "all" | "swe" | "aiml" | "research";

export type Project = {
  id: string;
  title: string;
  description: string;
  category: ProjectCategory[]; // (kept as-is to match your current component)
  tech: string[];
  metrics: string[];
  featured: boolean;
  emoji: string;
  links: {
    caseStudy?: string;
    github?: string;
  };
};

/**
 * Single source of truth for projects.
 * Used by Projects2.tsx and any other page/section that needs projects.
 */
/**
 * Projects sourced from CV (research + industry + listed projects).
 * Keep this as the single source of truth for Projects2.tsx.
 */
export const PROJECTS: Project[] = [
  {
    id: "1",
    title: "Interactive Video Retrieval System (HCMC AI Competition)",
    description:
      "Built a multimodal (text/image) video search system using CLIP/SigLIP embeddings + FAISS indexing, with an interactive ranked-results UI.",
    category: ["aiml", "swe"],
    tech: ["CLIP/SigLIP", "FAISS", "ffmpeg", "TransNet", "Vector Search"],
    metrics: [],
    featured: true,
    emoji: "🎬",
    links: { caseStudy: "#", github: "#" },
  },
  {
    id: "2",
    title: "Domain RAG Support Chatbots (Web + Facebook)",
    description:
      "Shipped support chatbots for web + Facebook with session management, KB crawling, and a RAG pipeline (vector search + LLM).",
    category: ["aiml", "swe"],
    tech: ["FastAPI", "RAG", "Embeddings", "Vector Search", "Facebook API"],
    metrics: [],
    featured: true,
    emoji: "💬",
    links: {
      caseStudy: "#",
      github: "https://github.com/zamminhduy123/social-media-chatbot-python",
    },
  },
  {
    id: "3",
    title: "Encrypted Chat Application",
    description:
      "Developed a secure chat application with end-to-end encryption using RSA and AES algorithms, ensuring user privacy and data security.",
    category: ["swe"],
    tech: [
      "IndexedDB",
      "E2EE",
      "FTS Search",
      "WebSocket",
      "React",
      "ElectronJS",
    ],
    metrics: [],
    featured: true,
    emoji: "💬",
    links: {
      caseStudy: "#",
      github: "https://github.com/zamminhduy123/dm-chat-app",
    },
  },
  {
    id: "4",
    title: "IDO Platform",
    description:
      "Developed a decentralized IDO platform enabling secure token launches with smart contracts, user authentication, and real-time analytics.",
    category: ["swe"],
    tech: [
      "Solidity",
      "Smart Contract",
      "React",
      "NodeJS",
    ],
    metrics: [],
    featured: false,
    emoji: "💬",
    links: {
      caseStudy: "#",
      github: "https://github.com/zamminhduy123/dm-chat-app",
    },
  },
];

import { Award, Layers, Server, Brain } from "lucide-react";

export const PROJECT_CATEGORIES: {
  id: ProjectCategory;
  label: string;
  icon: any; 
}[] = [
  { id: "all", label: "All", icon: Layers },
  { id: "swe", label: "SWE", icon: Server },
  { id: "aiml", label: "AI/ML", icon: Brain },
];