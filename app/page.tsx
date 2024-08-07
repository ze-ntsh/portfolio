'use client';
import Projects from '@/components/sections/projects';
import Navbar from '@/components/navbar';
import HeroSection from '@/components/sections/hero';
import { useState } from 'react';

export default function Home() {
  const [initialize, setInitialize] = useState<boolean>(false);

  return (
    <main className='bg-[--background]'>
      <Navbar/>
      <HeroSection trigger = {initialize} />
      <Projects />
      <div className='h-[100vh]'></div>
    </main>
  );
}
