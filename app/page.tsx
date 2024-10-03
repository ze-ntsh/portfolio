'use client';
import { Projects } from '@/components/sections/projects';
// import Navbar from '@/components/navbar';
import { HeroSection } from '@/components/sections/hero';
import { CLI } from '@/components/command-line';
import { Contact } from '@/components/sections/contact';
import { ReactLenis } from 'lenis/react';

export default function Home() {
  return (
    <ReactLenis root>
      <main className='bg-[--background]'>
        <CLI />
        <HeroSection />
        <Projects />
        <Contact />
      </main>
    </ReactLenis>
  );
}
