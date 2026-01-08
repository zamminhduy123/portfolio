import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About2';
import { Projects } from './components/Projects';
import { Experiences } from './components/Experience2';
import { Publications } from './components/Publications2';
import { Skills } from './components/Skills';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { CustomCursor } from './components/CustomCursor';
import { GrainTexture } from './components/GrainTexture';

export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
  }, []);

  return (
    <div className={theme === 'dark' ? 'dark' : ''}>
      <div className="min-h-screen bg-white dark:bg-[#0B0B0C] text-[#0B0B0C] dark:text-[#F5F5F5] transition-colors duration-300 overflow-x-hidden">
        {/* Custom Cursor - hidden on mobile */}
        <div className="hidden md:block">
          <CustomCursor />
        </div>
        
        {/* Grain Texture */}
        <GrainTexture />
        
        <Header theme={theme} toggleTheme={toggleTheme} />
        <main>
          <Hero />
          <About />
          <Projects />
          <Experiences />
          <Publications />
          <Skills />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}