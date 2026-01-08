import { useState } from 'react';
import { ExternalLink, Github } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  metrics: string;
  category: 'swe' | 'ai' | 'research';
  featured: boolean;
}

export function Projects() {
  const [filter, setFilter] = useState<'all' | 'swe' | 'ai' | 'research'>('all');

  const projects: Project[] = [
    {
      id: 1,
      title: 'Distributed ML Training Pipeline',
      description: 'Production-grade training infrastructure supporting multi-node distributed training with automated hyperparameter optimization and experiment tracking.',
      tags: ['Python', 'PyTorch', 'Kubernetes', 'Ray'],
      metrics: 'Reduced training time by 67% • Scaled to 128 GPUs',
      category: 'ai',
      featured: true
    },
    {
      id: 2,
      title: 'Real-time Recommendation Engine',
      description: 'Low-latency recommendation system serving 10M+ requests/day with sub-50ms p99 latency. Built with clean architecture and comprehensive testing.',
      tags: ['Go', 'Redis', 'gRPC', 'PostgreSQL'],
      metrics: 'Reduced latency by 32% • 99.99% uptime',
      category: 'swe',
      featured: true
    },
    {
      id: 3,
      title: 'Neural Architecture Search Framework',
      description: 'Automated NAS framework for discovering optimal model architectures under deployment constraints. Published at NeurIPS 2025.',
      tags: ['Python', 'TensorFlow', 'Docker', 'AWS'],
      metrics: 'F1 +0.08 • Model size -40%',
      category: 'research',
      featured: true
    },
    {
      id: 4,
      title: 'API Gateway & Service Mesh',
      description: 'Scalable API gateway with rate limiting, authentication, and observability for microservices architecture.',
      tags: ['TypeScript', 'Node.js', 'Envoy', 'Prometheus'],
      metrics: 'Handles 50K req/s • 15ms avg latency',
      category: 'swe',
      featured: false
    },
    {
      id: 5,
      title: 'Computer Vision Deployment Tool',
      description: 'Optimized CV model deployment pipeline with quantization and edge device support.',
      tags: ['Python', 'ONNX', 'TensorRT', 'C++'],
      metrics: 'Inference 3x faster • 50% memory reduction',
      category: 'ai',
      featured: false
    },
    {
      id: 6,
      title: 'Data Pipeline Orchestration',
      description: 'Event-driven data processing system with automatic retry logic and comprehensive monitoring.',
      tags: ['Python', 'Airflow', 'Kafka', 'Spark'],
      metrics: 'Processes 2TB/day • Zero data loss',
      category: 'swe',
      featured: false
    }
  ];

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(p => p.category === filter);

  const featuredProjects = filteredProjects.filter(p => p.featured);
  const otherProjects = filteredProjects.filter(p => !p.featured);

  return (
    <section id="projects" className="border-t border-[#E6E6E6] dark:border-[#222222]">
      <div className="max-w-7xl mx-auto px-6 md:px-20 py-16 md:py-32">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-0 mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl">Featured Projects</h2>
          
          {/* Filter Chips */}
          <div className="flex flex-wrap gap-2">
            {[
              { label: 'All', value: 'all' as const },
              { label: 'SWE', value: 'swe' as const },
              { label: 'AI/ML', value: 'ai' as const },
              { label: 'Research', value: 'research' as const }
            ].map(({ label, value }) => (
              <button
                key={value}
                onClick={() => setFilter(value)}
                className={`px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm rounded-lg transition-colors ${
                  filter === value
                    ? 'bg-[#0B0B0C] dark:bg-[#F5F5F5] text-[#F5F5F5] dark:text-[#0B0B0C]'
                    : 'border border-[#E6E6E6] dark:border-[#222222] hover:border-[#E11D48] dark:hover:border-[#E11D48]'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-4 md:mb-6">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* Other Projects */}
        {otherProjects.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {otherProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="group p-6 md:p-8 border border-[#E6E6E6] dark:border-[#222222] hover:border-[#E11D48] dark:hover:border-[#E11D48] rounded-lg transition-all hover:shadow-lg relative">
      <div className="pb-6">
        <div className="space-y-3 md:space-y-4">
          <h3 className="text-lg md:text-xl">{project.title}</h3>
          
          <p className="text-sm leading-relaxed text-[#333333] dark:text-[#CCCCCC]">
            {project.description}
          </p>

          {/* Tech Stack Tags */}
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 md:px-3 py-1 bg-[#FAFAFA] dark:bg-[#1a1a1a] text-xs rounded-md font-mono"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Metrics */}
          <div className="text-xs md:text-sm text-[#E11D48] font-mono">
            {project.metrics}
          </div>
        </div>
        {/* Links */}
        <div className="flex items-center gap-3 md:gap-4 pt-2 absolute bottom-4">
          <a
            href="#"
            className="flex items-center gap-1.5 text-xs md:text-sm hover:text-[#E11D48] transition-colors"
          >
            <ExternalLink size={14} />
            Case Study
          </a>
          <a
            href="#"
            className="flex items-center gap-1.5 text-xs md:text-sm hover:text-[#E11D48] transition-colors"
          >
            <Github size={14} />
            GitHub
          </a>
        </div>
      </div>
    </div>
  );
}