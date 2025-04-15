'use client';
import { Projects } from '@/components/home-sections/projects';
// import Navbar from '@/components/navbar';
import { HeroSection } from '@/components/home-sections/hero';
import { CLI } from '@/components/home-sections/sub-components/command-line';
import { Contact } from '@/components/home-sections/contact';
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
