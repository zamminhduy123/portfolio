import { Mail, Github, Linkedin, BookOpen } from 'lucide-react';

import { NAME } from "@/const/my-info";

export function Contact() {
  return (
    <section id="contact" className="border-t border-[#E6E6E6] dark:border-[#222222]">
      <div className="max-w-7xl mx-auto px-20 py-32">
        <div className="max-w-2xl mx-auto text-center space-y-12">
          {/* Heading */}
          <div className="my-4">
            <h2 className="text-4xl">Let's build something reliable.</h2>
            <p className="text-lg text-[#666666] dark:text-[#999999]">
              Open to engineering roles, consulting, and collaboration on applied ML projects.
            </p>
          </div>

          {/* Highlight Block */}
          <div className="bg-[#E11D48]/10 dark:bg-[#E11D48]/20 border border-[#E11D48]/30 rounded-lg p-6">
            <p className="text-lg font-medium text-[#E11D48]">
              Got an idea but don't know how to code? Contact me to make it come true
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center justify-center gap-4 pt-2">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 border border-[#E6E6E6] dark:border-[#222222] hover:border-[#E11D48] dark:hover:border-[#E11D48] rounded-lg transition-colors"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 border border-[#E6E6E6] dark:border-[#222222] hover:border-[#E11D48] dark:hover:border-[#E11D48] rounded-lg transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="https://scholar.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 border border-[#E6E6E6] dark:border-[#222222] hover:border-[#E11D48] dark:hover:border-[#E11D48] rounded-lg transition-colors"
              aria-label="Google Scholar"
            >
              <BookOpen size={20} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
