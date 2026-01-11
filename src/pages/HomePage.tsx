import { useState, useEffect } from 'react';
import { Hero } from '@/components/Hero2';
import { About } from '@/components/About2';
import { Projects } from '@/components/Projects2';
import { Experiences } from '@/components/Experience2';
import { Publications } from '@/components/Publications2';
import { Skills } from '@/components/Skills';
import { Contact } from '@/components/Contact';

export default function HomePage() {
  return (
    <main>
      <Hero />
      <About />
      <Projects />
      <Experiences />
      <Publications />
      <Skills />
      <Contact />
    </main>
  );
}