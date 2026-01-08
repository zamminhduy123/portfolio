import { FileText, Code, BookOpen } from 'lucide-react';

export function Publications() {
  const publications = [
    {
      title: 'Efficient Neural Architecture Search Under Deployment Constraints',
      venue: 'NeurIPS',
      year: '2025',
      authors: 'Your Name, Researcher B, Professor C',
      featured: true
    },
    {
      title: 'Scaling Distributed Training for Large Language Models',
      venue: 'ICML',
      year: '2024',
      authors: 'Researcher A, Your Name, Professor D',
      featured: true
    },
    {
      title: 'Scaling Distributed Training for Large Language Models',
      venue: 'ICML',
      year: '2024',
      authors: 'Researcher A, Your Name, Professor D',
      featured: true
    },
  ];

  return (
    <section id="publications" className="border-t border-[#E6E6E6] dark:border-[#222222]">
      <div className="max-w-7xl mx-auto px-6 md:px-20 py-16 md:py-32">
        <h2 className="text-2xl md:text-3xl mb-8 md:mb-12">Publications & Research</h2>

        <div className="max-w-4xl space-y-6 md:space-y-8">
          {publications.map((pub, index) => (
            <div
              key={index}
              className="p-5 md:p-6 border border-[#E6E6E6] dark:border-[#222222] hover:border-[#E11D48] dark:hover:border-[#E11D48] rounded-lg transition-colors"
            >
              <div className="space-y-3">
                {/* Title & Featured Badge */}
                <div className="flex items-start gap-3">
                  <h3 className="text-base md:text-lg flex-1 hover:text-[#E11D48] cursor-pointer transition-colors">
                    {pub.title}
                  </h3>
                  {pub.featured && (
                    <span className="px-2 py-1 bg-[#E11D48] text-white text-[10px] md:text-xs rounded uppercase tracking-wider shrink-0">
                      Featured
                    </span>
                  )}
                </div>

                {/* Venue & Year */}
                <div className="flex items-center gap-3 text-xs md:text-sm font-mono text-[#666666] dark:text-[#999999]">
                  <span>{pub.venue} {pub.year}</span>
                </div>

                {/* Authors */}
                <div className="text-xs md:text-sm text-[#666666] dark:text-[#999999]">
                  {pub.authors}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center flex-wrap gap-2 md:gap-3 pt-2">
                  <a
                    href="#"
                    className="flex items-center gap-1.5 px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm border border-[#E6E6E6] dark:border-[#222222] hover:border-[#E11D48] dark:hover:border-[#E11D48] rounded-md transition-colors"
                  >
                    <FileText size={14} />
                    PDF
                  </a>
                  <a
                    href="#"
                    className="flex items-center gap-1.5 px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm border border-[#E6E6E6] dark:border-[#222222] hover:border-[#E11D48] dark:hover:border-[#E11D48] rounded-md transition-colors"
                  >
                    <BookOpen size={14} />
                    BibTeX
                  </a>
                  <a
                    href="#"
                    className="flex items-center gap-1.5 px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm border border-[#E6E6E6] dark:border-[#222222] hover:border-[#E11D48] dark:hover:border-[#E11D48] rounded-md transition-colors"
                  >
                    <Code size={14} />
                    Code
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}