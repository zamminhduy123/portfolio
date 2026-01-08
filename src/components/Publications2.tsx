import { useState } from "react";
import { motion } from "framer-motion";
import { FileText, Quote, Code, Sparkles, ExternalLink, ArrowUpRight, Zap } from "lucide-react";

interface Publication {
  id: string;
  title: string;
  venue: string;
  year: number;
  authors: string[];
  first: boolean;
  vibes: string;
  links: {
    pdf?: string;
    bibtex?: string;
    code?: string;
  };
}

const publications: Publication[] = [
  {
    id: "1",
    title: "Multi-Class Intrusion Detection System for In-Vehicle Networks Using Few-Shot Learning and Convolutional Anomaly Transformer Network",
    venue: "Knowledge Based Systems Journal",
    year: 2025,
    authors: ["Nguyen T. M. Duy", "H. B. T. Huy", "P. Van Phu", "T. D. Le", "D. Kim."],
    first: true,
    vibes: "hmmm this one idk :))",
    links: { pdf: "https://doi.org/10.1016/j.knosys.2025.114436" }
  },
  {
    id: "2",
    title: "Open-Set Recognition with Multi-Objective Graph Neural Network in Controller Area Networks",
    venue: "Submitted to IEEE Transactions",
    year: 2025,
    authors:  ["Nguyen T. M. Duy", "D. Kim", "et al."],
    first: true,
    vibes: "just a submission for now but hoping for the best",
    links: { pdf: "#" }
  },
  {
    id: "3",
    title: "Advanced deep learning-based electricity theft detection in smart grids using multi-dimensional analysis with Convolutional Autoencoder and Transformer",
    venue: "Engineering Applications of Artificial Intelligence Journal",
    year: 2024,
    authors: ["T. D. Le", "N. T. M. Duy", "H. B. T. Huy", "P. Van Phu", "H. T. Doan", "D. Kim."],
    first: false,
    vibes: "lowkey just helped with the model training",
    links: { pdf: "https://doi.org/10.1016/j.engappai.2025.111333", bibtex: "#" }
  },
];

function PublicationCard({ pub, index }: { pub: Publication; index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-testid={`card-publication-${pub.id}`}
    >
      <div className={`
        relative p-6 md:p-8 rounded-2xl border-2 transition-all duration-300
        ${pub.first 
          ? 'border-black bg-black text-white' 
          : 'border-black/10 bg-white hover:border-black/30'
        }
        ${isHovered ? '-translate-y-1' : ''}
      `}>
        {pub.first && (
          <motion.div 
            className="absolute -top-3 -right-3 bg-[hsl(0,84%,60%)] text-white px-3 py-1 rounded-full text-xs font-mono font-bold flex items-center gap-1.5 shadow-lg"
            animate={{ rotate: isHovered ? [0, -3, 3, 0] : 0 }}
            transition={{ duration: 0.4 }}
            data-testid={`badge-first-${pub.id}`}
          >
            <Sparkles className="w-3 h-3" />
            FIRE
          </motion.div>
        )}

        <div className="flex flex-col gap-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className={`font-mono text-xs px-2 py-0.5 rounded ${pub.first ? 'bg-white/20' : 'bg-black/5'}`}>
                  {pub.venue}
                </span>
                <span className={`font-mono text-xs ${pub.first ? 'text-white/60' : 'text-black/40'}`}>
                  {pub.year}
                </span>
              </div>
              
              <h3 className={`font-bold text-lg md:text-xl leading-tight mb-2 ${pub.first ? 'text-white' : 'text-black'}`}>
                {pub.title}
              </h3>
              
              <p className={`text-sm font-mono ${pub.first ? 'text-white/50' : 'text-black/40'}`}>
                "{pub.vibes}"
              </p>
            </div>

            <motion.div
              animate={{ x: isHovered ? 4 : 0, y: isHovered ? -4 : 0 }}
              className={`hidden md:flex ${pub.first ? 'text-white/30' : 'text-black/20'}`}
            >
              <ArrowUpRight className="w-6 h-6" />
            </motion.div>
          </div>

          <div className={`text-sm ${pub.first ? 'text-white/70' : 'text-black/60'}`}>
            {pub.authors.map((author, i) => (
              <span key={i}>
                <span className={author === "Your Name" ? "font-bold" : ""}>
                  {author}
                </span>
                {i < pub.authors.length - 1 && ", "}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            {pub.links.pdf && (
              <motion.a
                href={pub.links.pdf}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`
                  inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium
                  transition-colors duration-200
                  ${pub.first 
                    ? 'bg-white text-black hover:bg-white/90' 
                    : 'bg-black text-white hover:bg-black/80'
                  }
                `}
                data-testid={`link-pdf-${pub.id}`}
              >
                <FileText className="w-3.5 h-3.5" />
                PDF
              </motion.a>
            )}
            {pub.links.bibtex && (
              <motion.a
                href={pub.links.bibtex}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`
                  inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium
                  border transition-colors duration-200
                  ${pub.first 
                    ? 'border-white/30 text-white hover:bg-white/10' 
                    : 'border-black/20 text-black hover:bg-black/5'
                  }
                `}
                data-testid={`link-bibtex-${pub.id}`}
              >
                <Quote className="w-3.5 h-3.5" />
                BibTeX
              </motion.a>
            )}
            {pub.links.code && (
              <motion.a
                href={pub.links.code}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`
                  inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium
                  border transition-colors duration-200
                  ${pub.first 
                    ? 'border-white/30 text-white hover:bg-white/10' 
                    : 'border-black/20 text-black hover:bg-black/5'
                  }
                `}
                data-testid={`link-code-${pub.id}`}
              >
                <Code className="w-3.5 h-3.5" />
                Code
              </motion.a>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export function Publications() {
  const firstCount = publications.filter(p => p.first).length;

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        <motion.header 
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <motion.div 
              className="w-2 h-2 rounded-full bg-[hsl(0,84%,60%)]"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
            <span className="font-mono text-sm text-black/50 uppercase tracking-wider">
              Research output
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
            Publications
          </h1>
          
          <p className="text-lg md:text-xl text-black/60 max-w-xl leading-relaxed">
            Papers I've shipped to the academic world. 
            <span className="text-black/40 block mt-1 font-mono text-sm">
              ({firstCount} bangers, {publications.length - firstCount} solid contributions)
            </span>
          </p>

          <motion.div 
            className="mt-8 flex items-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center gap-2 text-sm">
              <div className="w-4 h-4 rounded bg-black" />
              <span className="text-black/50 font-mono">= first author</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-4 h-4 rounded border-2 border-black/10 bg-white" />
              <span className="text-black/50 font-mono">= support</span>
            </div>
          </motion.div>
        </motion.header>

        <div className="space-y-6">
          {publications.map((pub, index) => (
            <PublicationCard key={pub.id} pub={pub} index={index} />
          ))}
        </div>

        <motion.footer 
          className="mt-16 pt-8 border-t border-black/10 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <p className="font-mono text-sm text-black/40">
            more papers loading... (reviewers willing)
          </p>
        </motion.footer>
      </div>
    </div>
  );
}
