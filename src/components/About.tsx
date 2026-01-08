import {LOCATION, EMAIL} from "@/const/my-info";

export function About() {
  const highlights = ['AI/ML', 'Systems', 'Research + Engineering'];
  
  const quickFacts = [
    { label: 'Location', value: LOCATION },
    { label: 'Interests', value: 'ML Infrastructure, Systems Design' },
    { label: 'Email', value: EMAIL }
  ];

  return (
    <section id="about" className="border-t border-[#E6E6E6] dark:border-[#222222]">
      <div className="max-w-7xl mx-auto px-6 md:px-20 py-16 md:py-32">
        <h2 className="text-2xl md:text-3xl mb-8 md:mb-12">About</h2>
        
        <div className="max-w-3xl space-y-6 md:space-y-8">
          <p className="text-base md:text-lg leading-relaxed text-[#333333] dark:text-[#CCCCCC]">
            With a background spanning both industry software engineering and applied ML research, 
            I specialize in building production-grade systems that leverage machine learning to solve 
            real-world problems. My work focuses on the intersection of clean architecture, model 
            deployment, and measurable business impact—turning research prototypes into scalable, 
            reliable products.
          </p>

          {/* Highlight Pills */}
          <div className="flex flex-wrap gap-2 md:gap-3">
            {highlights.map((highlight) => (
              <span
                key={highlight}
                className="px-3 md:px-4 py-1.5 md:py-2 bg-[#FAFAFA] dark:bg-[#1a1a1a] border border-[#E6E6E6] dark:border-[#222222] rounded-full text-xs md:text-sm"
              >
                {highlight}
              </span>
            ))}
          </div>

          {/* Quick Facts */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 pt-6 md:pt-8">
            {quickFacts.map((fact) => (
              <div key={fact.label} className="space-y-1">
                <div className="text-xs uppercase tracking-wider text-[#666666] dark:text-[#999999] font-mono">
                  {fact.label}
                </div>
                <div className="text-sm break-words">
                  {fact.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}