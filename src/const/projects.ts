export type ProjectCategory = "all" | "swe" | "aiml" | "research";

export type ProjectMedia = {
  type: "image" | "video";
  src: string;
  alt?: string;
  /** When true, render as an iframe embed instead of a native <video> element */
  useEmbed?: boolean;
};

export type Project = {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  category: ProjectCategory[];
  tech: string[];
  metrics: string[];
  featured: boolean;
  emoji: string;
  links: {
    caseStudy?: string;
    github?: string;
    live?: string;
  };
  media?: ProjectMedia[];
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
    title: "Bé Đậu (daucv.com) - AI Career Assistant & Mock Interviewer",
    description:
      "Built a localized AI career SaaS that evaluates CV-JD matches, rewrites bullet points for ATS readiness, and conducts real-time voice mock interviews.",
    longDescription:
      "Developed a full-stack AI platform tailored for the Vietnamese job market. The system parses PDF resumes and utilizes OpenAI Structured Outputs (Pydantic) to generate deep analytics, side-by-side CV rewrites, and evidence strength tables. Engineered a highly scalable, stateless FastAPI backend featuring a 'Waterfall Fallback' LLM router (auto-switching between Gemini, Groq, and OpenRouter) to ensure 100% uptime with $0 server costs. The flagship feature is a gamified Mock Interview room featuring real-time speech-to-text (Web Speech API), premium Vietnamese text-to-speech (Edge-TTS), and dynamic interviewer personas (HR, Tech Lead) with live confidence scoring.",
      category: ["aiml", "swe", "all"],
      tech:["Next.js", "FastAPI", "OpenAI SDK", "Pydantic", "Web Speech API", "Edge-TTS", "LLM Routing"],
      metrics:["$0 Server Cost Architecture", "Real-time Voice Processing", "Stateless API Design"],
      featured: true,
      emoji: "🌱",
      links: { caseStudy: "https://daucv.com", github: "https://github.com/zamminhduy123/daucv" },
      media:[
        { type: "image", src: "/demo/landing.webp", alt: "Landing page" },
        { type: "image", src: "/demo/cv-match.webp", alt: "CV Analyzer" },
        { type: "image", src: "/demo/interview.webp", alt: "Live Voice Mock Interview Room UI" }
      ],
  },
  {
    id: "2",
    title: "Interactive Video Retrieval System (HCMC AI Competition)",
    description:
      "Built a multimodal (text/image) video search system using CLIP/SigLIP embeddings + FAISS indexing, with an interactive ranked-results UI.",
    longDescription:
      "Developed a full-stack video retrieval system for the HCMC AI Competition. The system processes video files by extracting keyframes using TransNet, generates embeddings with CLIP/SigLIP models, and indexes them with FAISS for efficient similarity search. Users can search using natural language queries or reference images. The interactive UI presents ranked results with temporal navigation and confidence scores.",
    category: ["aiml", "swe"],
    tech: ["CLIP/SigLIP", "FAISS", "ffmpeg", "TransNet", "Vector Search"],
    metrics:["Under 1s response time"],
    featured: true,
    emoji: "🎬",
    links: { caseStudy: "#", github: "https://github.com/El-Psy-Kongr00/aihcm-backend" },
    media: [{ type: "video", src: "/demo/CLIP.mp4", alt: "Demo video" },
      { type: "image", src: "/demo/clip2.webp", alt: "Demo screenshot" }
    ],
  },
  {
    id: "3",
    title: "Domain RAG Support Chatbots (Web + Facebook)",
    description:
      "Shipped support chatbots for web + Facebook with session management, KB crawling, and a RAG pipeline (vector search + LLM).",
    category: ["aiml", "swe"],
    tech: ["FastAPI", "RAG", "Embeddings", "Vector Search", "Facebook API"],
    metrics:["Hallucination Reduction by 40%"],
    featured: true,
    emoji: "💬",
    links: {
      caseStudy: "#",
      github: "https://github.com/zamminhduy123/social-media-chatbot-python",
    },
  },
  {
    id: "4",
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
    featured: false,
    emoji: "💬",
    links: {
      caseStudy: "#",
      github: "https://github.com/zamminhduy123/dm-chat-app",
    },
    media: [{ type: "image", src: "/demo/dm.webp", alt: "demo image" }],
  },
  {
    id: "5",
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
      github: "https://github.com/Sumhappy1608/IDO-platform",
    },
    media: [{ type: "video", src: "https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2FDreamLauncher21%2Fvideos%2F479977666724634%2F&show_text=false&width=560&t=0", alt: "Demo video", useEmbed: true },
      { type: "image", src: "/demo/IDO2.webp", alt: "IDO Platform screenshot" }
    ],
  },
    {
    id: "6",
    title: "Manga OCR WebApp",
    description:
      "Developed a web application that utilizes OCR technology to directly translate text on manga images, providing authors with copies of their works in different languages.",
    category: ["swe", "aiml"],
    tech: [
      "OCR",
      "React",
      "FastAPI",
      "Tesseract",
    ],
    metrics: [],
    featured: false,
    emoji: "⛩️",
    links: {
      caseStudy: "#",
      github: "https://github.com/darkhunterLearning/MangaAutoTranslator",
    },
    media: [
      { type: "image", src: "/demo/MANGA.webp", alt: "Manga OCR WebApp screenshot" }
    ],
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