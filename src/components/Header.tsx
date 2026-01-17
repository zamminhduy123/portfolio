import { Sun, Moon, Download, Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { NAME } from "@/const/my-info";

interface HeaderProps {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

export function Header({ theme, toggleTheme }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "About me", to: "/" },
    { label: "Publications", to: "/publications" },
  ];

  const linkBase =
    "text-sm hover:text-[#E11D48] transition-colors relative group";

  const linkActive = "text-[#E11D48]";

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-[#0B0B0C]/80 border-b border-[#E6E6E6] dark:border-[#222222] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 md:px-20">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="text-lg md:text-xl tracking-tight font-medium">
            {NAME}
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) =>
                  `${linkBase} ${isActive ? linkActive : ""}`
                }
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#E11D48] group-hover:w-full transition-all duration-300"></span>
              </NavLink>
            ))}
          </nav>

          {/* Controls */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* <button
              onClick={toggleTheme}
              className="p-2 hover:bg-[#FAFAFA] dark:hover:bg-[#1a1a1a] rounded-lg transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
            </button> */}

            <a
              href="/cv.pdf"
              target="_blank"
              rel="noreferrer"
              className="hidden md:flex items-center gap-2 px-4 md:px-6 py-2 md:py-2.5 bg-[#0B0B0C] dark:bg-[#F5F5F5] text-[#F5F5F5] dark:text-[#0B0B0C] hover:bg-[#E11D48] dark:hover:bg-[#E11D48] dark:hover:text-[#F5F5F5] transition-colors text-sm rounded-lg"
            >
              <Download size={16} />
              <span className="hidden lg:inline">Download Résumé</span>
              <span className="lg:hidden">Résumé</span>
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 hover:bg-[#FAFAFA] dark:hover:bg-[#1a1a1a] rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-[#E6E6E6] dark:border-[#222222] py-4">
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === "/"}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `text-sm transition-colors py-2 hover:text-[#E11D48] ${
                      isActive ? linkActive : ""
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}

              <a
                href="#"
                className="flex items-center gap-2 px-4 py-2.5 bg-[#0B0B0C] dark:bg-[#F5F5F5] text-[#F5F5F5] dark:text-[#0B0B0C] hover:bg-[#E11D48] dark:hover:bg-[#E11D48] dark:hover:text-[#F5F5F5] transition-colors text-sm rounded-lg justify-center"
              >
                <Download size={16} />
                Download Résumé
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}