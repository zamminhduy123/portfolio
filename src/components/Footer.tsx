import { NAME, EMAIL } from "@/const/my-info";

export function Footer() {
  const navLinks = ['About', 'Projects', 'Experience', 'Publications', 'Skills', 'Contact'];
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[#E6E6E6] dark:border-[#222222]">
      <div className="max-w-7xl mx-auto px-6 md:px-20 py-8 md:py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left: Copyright */}
          <div className="flex flex-col sm:flex-row items-center gap-2 text-xs md:text-sm text-[#666666] dark:text-[#999999]">
            <span>© {currentYear} {NAME}</span>
            <span className="hidden sm:inline w-1 h-1 bg-[#E11D48] rounded-full"></span>
            <span className="font-mono text-xs">Software Engineer • AI/ML</span>
          </div>

          {/* Center: Quick Nav */}
          <nav className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
            {navLinks.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-xs md:text-sm text-[#666666] dark:text-[#999999] hover:text-[#E11D48] dark:hover:text-[#E11D48] transition-colors"
              >
                {link}
              </a>
            ))}
          </nav>

          {/* Right: Signature */}
          <div className="flex items-center gap-2">
            <span className="text-xs md:text-sm text-[#666666] dark:text-[#999999] font-mono">
              Built with precision
            </span>
            <div className="w-6 md:w-8 h-0.5 bg-[#E11D48]"></div>
          </div>
        </div>
      </div>
    </footer>
  );
}
