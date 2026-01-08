export function Skills() {
  const skillCategories = [
    {
      category: 'Languages',
      skills: ['Python', 'Go', 'TypeScript', 'Java', 'C++', 'SQL']
    },
    {
      category: 'ML & Data',
      skills: ['PyTorch', 'TensorFlow', 'scikit-learn', 'Pandas', 'NumPy', 'MLflow']
    },
    {
      category: 'Infrastructure',
      skills: ['Kubernetes', 'Docker', 'AWS', 'GCP', 'Terraform', 'GitHub Actions']
    },
    {
      category: 'Backend & Data',
      skills: ['PostgreSQL', 'Redis', 'Kafka', 'gRPC', 'REST', 'GraphQL']
    },
    {
      category: 'Tools',
      skills: ['Git', 'Linux', 'Airflow', 'Spark', 'Ray', 'Prometheus']
    }
  ];

  const focusAreas = [
    'Model Deployment',
    'Security & Auth',
    'Performance Optimization',
    'Data Pipelines',
    'Distributed Systems',
    'API Design',
    'ML Infrastructure',
    'System Architecture'
  ];

  return (
    <section id="skills" className="border-t border-[#E6E6E6] dark:border-[#222222]">
      <div className="max-w-7xl mx-auto px-6 md:px-20 py-16 md:py-32">
        <h2 className="text-2xl md:text-3xl mb-8 md:mb-12">Skills & Expertise</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20">
          {/* Left: Technical Skills */}
          <div className="space-y-6 md:space-y-8">
            {skillCategories.map((category) => (
              <div key={category.category} className="space-y-3">
                <h3 className="text-xs uppercase tracking-wider text-[#666666] dark:text-[#999999] font-mono">
                  {category.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 md:px-3 py-1.5 md:py-2 bg-[#FAFAFA] dark:bg-[#1a1a1a] border border-[#E6E6E6] dark:border-[#222222] rounded-md text-xs md:text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Right: Focus Areas */}
          <div className="space-y-6">
            <h3 className="text-xs uppercase tracking-wider text-[#666666] dark:text-[#999999] font-mono">
              Focus Areas
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
              {focusAreas.map((area) => (
                <div
                  key={area}
                  className="p-3 md:p-4 border border-[#E6E6E6] dark:border-[#222222] hover:border-[#E11D48] dark:hover:border-[#E11D48] rounded-lg transition-colors cursor-default group"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-[#E11D48] shrink-0 group-hover:scale-110 transition-transform">▸</span>
                    <span className="text-xs md:text-sm">{area}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Additional Info */}
            <div className="pt-6 md:pt-8 space-y-4">
              <div className="p-5 md:p-6 bg-[#FAFAFA] dark:bg-[#1a1a1a] border border-[#E6E6E6] dark:border-[#222222] rounded-lg">
                <div className="text-xs uppercase tracking-wider text-[#666666] dark:text-[#999999] font-mono mb-3">
                  Current Focus
                </div>
                <p className="text-sm leading-relaxed text-[#333333] dark:text-[#CCCCCC]">
                  Exploring efficient model serving at scale, LLM fine-tuning strategies, 
                  and building robust ML infrastructure that bridges research and production.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}