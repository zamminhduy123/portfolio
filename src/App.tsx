import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Footer } from '@/components/Footer';
import { CustomCursor } from '@/components/CustomCursor';
import { GrainTexture } from '@/components/GrainTexture';

import HomePage from '@/pages/HomePage';
import ResearchScroll from '@/pages/PublicationsPage';
import { pageview } from "./ga";
import { useLocation } from "react-router-dom";

export default function App() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");
  const location = useLocation();

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
  }, []);


  useEffect(() => {
    pageview(location.pathname + location.search);
  }, [location]);

  return (
    <div className={theme === "dark" ? "dark" : ""}>
      <div className="min-h-screen bg-white dark:bg-[#0B0B0C] text-[#0B0B0C] dark:text-[#F5F5F5] transition-colors duration-300 relative flex flex-col">
        <div className="hidden md:block">
          <CustomCursor />
        </div>

        <GrainTexture />
        <Header theme={theme} toggleTheme={toggleTheme} />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/publications" element={<ResearchScroll />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        <Footer />
      </div>
    </div>
  );
}