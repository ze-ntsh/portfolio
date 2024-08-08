'use client';
import Projects from '@/components/sections/projects';
import Navbar from '@/components/navbar';
import HeroSection from '@/components/sections/hero';
import { NavProvider } from '@/components/context/nav-context';
import { InitProvider, useInitContext } from '@/components/context/init-context';
import CLI from '@/components/command-line';
import Contact from '@/components/sections/contact';

export default function Home() {
  const {initialize} = useInitContext();
  
  return (
    <main className='bg-[--background]'>
      <InitProvider>
        <NavProvider>
          <CLI />
          {
            initialize && (
              <>
                <HeroSection />
                <Projects />
                <Contact />
              </>
            )
          }
        </NavProvider>
      </InitProvider>
    </main>
  );
}
