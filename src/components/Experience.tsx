export function Experience() {
  const experiences = [
    {
      role: 'Graduate Researcher',
      company: 'Soonchunhyang University @ IoT Lab',
      period: '2019 - 2021',
      highlights: [
        'Published 3 papers at top-tier conferences (NeurIPS, ICML) on efficient neural architectures',
        'Developed novel architecture search algorithm reducing compute requirements by 70%',
        'Collaborated with industry partners to deploy research prototypes in production systems'
      ],
      skills: ['Python', 'PyTorch', 'Research', 'Publishing']
    },
    {
      role: 'Software Engineering',
      company: 'Zalo @ VNG Corporation',
      period: 'May 2022 - Aug 2024',
      highlights: [
        'Implemented microservice for user analytics processing 5M events/day',
        'Designed and built internal dashboard for monitoring service health and performance',
        'Contributed to open-source internal tooling used by 200+ engineers'
      ],
      skills: ['Javascript', 'React', 'Electronjs', 'Typescript']
    }
  ];

  return (
    <section id="experience" className="border-t border-[#E6E6E6] dark:border-[#222222]">
      <div className="max-w-7xl mx-auto px-6 md:px-20 py-16 md:py-32">
        <h2 className="text-2xl md:text-3xl mb-8 md:mb-12">Experience</h2>

        <div className="max-w-4xl space-y-8 md:space-y-12">
          {experiences.map((exp, index) => (
            <div key={index} className="relative pl-6 md:pl-8 border-l-2 border-[#E6E6E6] dark:border-[#222222]">
              {/* Timeline Dot */}
              <div className="absolute left-0 top-0 w-2 h-2 -translate-x-1.25 bg-[#E11D48] rounded-full"></div>
              
              <div className="space-y-3 md:space-y-4">
                {/* Header */}
                <div>
                  <h3 className="text-lg md:text-xl mb-1">{exp.role}</h3>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-sm text-[#666666] dark:text-[#999999]">
                    <span>{exp.company}</span>
                    <span className="hidden sm:inline text-[#E11D48]">•</span>
                    <span className="font-mono text-xs md:text-sm">{exp.period}</span>
                  </div>
                </div>

                {/* Highlights */}
                <ul className="space-y-2">
                  {exp.highlights.map((highlight, i) => (
                    <li key={i} className="text-sm leading-relaxed text-[#333333] dark:text-[#CCCCCC] flex gap-2 md:gap-3">
                      <span className="text-[#E11D48] mt-1.5 shrink-0">▸</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>

                {/* Skills */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {exp.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 md:px-3 py-1 bg-[#FAFAFA] dark:bg-[#1a1a1a] text-xs rounded-md font-mono border border-[#E6E6E6] dark:border-[#222222]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}