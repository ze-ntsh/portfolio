import { motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import Projects from '@/components/sections/projects';
import ParallaxText from '@/components/parallax-text';

import { Righteous } from "next/font/google";
import { cn } from '@/lib/utils';
import Navbar from '@/components/navbar';
import Typewriter from '@/components/typewriter';

const righteous = Righteous({ subsets: ["latin"], weight: '400' });

import localFont from 'next/font/local';
const cascadia = localFont({src: '../../public/fonts/cascadia.ttf'});

type HeroSectionTypes = {
	trigger?: boolean;
}

const HeroSection = ({trigger = false}: HeroSectionTypes) => {
	// animation refs
	const targetRef = useRef(null);

	const { scrollYProgress } = useScroll({
		target: targetRef,
		offset: ["start end", "end start"],
	});

	const [navAtTop, setNavAtTop] = useState(false);

	useMotionValueEvent(scrollYProgress, 'change', (value) => {
		if (value > 0.5) {
			setNavAtTop(true);
		} else {
			setNavAtTop(false);
		}
	});

	const marqueeTextList = ['developer.', 'designer.', 'creator.'];

	return (
		<motion.section ref={targetRef} className='h-[400vh] overflow-x-hidden relative'
			style={{
				backgroundSize: '100px 100px',
				backgroundPosition: 'center',
				backgroundImage: 'linear-gradient(to right, grey 1px, transparent 1px), linear-gradient(to bottom, grey 1px, transparent 1px)',
			}}
		>
			{/* HOME */}
			< div >
				{trigger &&
				<div>
					{/* top bottom text parallaxes */}
					<ParallaxText baseVelocity={3} className='text-[5em] fixed top-[10%]' exit={navAtTop}>
						{marqueeTextList}
					</ParallaxText>
					<ParallaxText baseVelocity={-2} className='text-[5em] fixed bottom-[10%]' exit={navAtTop}>
						{marqueeTextList}
					</ParallaxText>

					{/* hero text */}
					<motion.div className={cn('fixed text-[--text-inverse] text-[6em] font-bold bg-[--foreground] px-10', righteous.className)}
						style={{
							top: '50%',
							right: '0',
							transform: 'translate(0, -50%)',
						}}
					>
						nitish.
					</motion.div>
				</div>
				}
			</div >

			{/* ABOUT */}
			< div className='hidden' >
				<motion.div className='fixed'
					initial={false}

				>
					<Typewriter className={cn('text-[--text-inverse] bg-white text-5xl', cascadia.className)} trigger={navAtTop}>
						/whoami
					</Typewriter>
				</motion.div>
			</div >

		</motion.section >
	)
}

export default HeroSection;