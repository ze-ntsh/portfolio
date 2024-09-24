'use client';
import { Projects } from '@/components/sections/projects';
// import Navbar from '@/components/navbar';
import { HeroSection } from '@/components/sections/hero';
import { CLI } from '@/components/command-line';
import { Contact } from '@/components/sections/contact';

import { ReactLenis, useLenis } from 'lenis/react';
import { useEffect, useRef } from 'react';

export default function Home() {
  const emToPx = (em: number) => em * parseFloat(getComputedStyle(document.documentElement).fontSize);

  // useEffect(() => {
  //   const lenis = new Lenis({
  //     // @ts-ignore
  //     direction: 'vertical',
  //   });

  //   function raf(time: number) {
  //     lenis.raf(time);
  //     requestAnimationFrame(raf);
  //   }

  //   requestAnimationFrame(raf);

  //   // const snap = new Snap(lenis, {
  //   //   type: 'proximity',
  //   //   velocityThreshold: 0.5,
  //   // });
  //   // snap.add(0);
  //   // document.querySelectorAll('.snap').forEach((el) => snap.add(el.getBoundingClientRect().top - emToPx(2)));
  // }, []);

  return (
    <ReactLenis root>
      <main className='bg-[--background]'
        style={{
          scrollBehavior: 'smooth',
        }}
      >
        <CLI />
        <HeroSection />
        <Projects />
        <Contact />
      </main>
    </ReactLenis>
  );
}
