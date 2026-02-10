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
    title: "Interactive Video Retrieval System (HCMC AI Competition)",
    description:
      "Built a multimodal (text/image) video search system using CLIP/SigLIP embeddings + FAISS indexing, with an interactive ranked-results UI.",
    longDescription:
      "Developed a full-stack video retrieval system for the HCMC AI Competition. The system processes video files by extracting keyframes using TransNet, generates embeddings with CLIP/SigLIP models, and indexes them with FAISS for efficient similarity search. Users can search using natural language queries or reference images. The interactive UI presents ranked results with temporal navigation and confidence scores.",
    category: ["aiml", "swe"],
    tech: ["CLIP/SigLIP", "FAISS", "ffmpeg", "TransNet", "Vector Search"],
    metrics: [],
    featured: true,
    emoji: "🎬",
    links: { caseStudy: "#", github: "https://github.com/El-Psy-Kongr00/aihcm-backend" },
    media: [{ type: "video", src: "/demo/CLIP.mp4", alt: "Demo video" },
      { type: "image", src: "/demo/clip2.webp", alt: "Demo screenshot" }
    ],
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
    featured: false,
    emoji: "💬",
    links: {
      caseStudy: "#",
      github: "https://github.com/zamminhduy123/dm-chat-app",
    },
    media: [{ type: "image", src: "/demo/dm.webp", alt: "demo image" }],
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
      github: "https://github.com/Sumhappy1608/IDO-platform",
    },
    media: [{ type: "video", src: "https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2FDreamLauncher21%2Fvideos%2F479977666724634%2F&show_text=false&width=560&t=0", alt: "Demo video", useEmbed: true },
      { type: "image", src: "/demo/IDO2.webp", alt: "IDO Platform screenshot" }
    ],
  },
    {
    id: "5",
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
    featured: true,
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