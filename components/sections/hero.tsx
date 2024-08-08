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
import { useInitContext } from '../context/init-context';
import { useNavContext } from '../context/nav-context';

const cascadia = localFont({ src: '../../public/fonts/cascadia.ttf' });

const porterSansBlock = localFont({
	src: '../../public/fonts/porter-sans-inline-block.ttf',
});

const HeroSection = () => {
	// animation refs
	const targetRef = useRef(null);
	const navWidthRef = useRef(0);

	const { scrollYProgress } = useScroll({
		target: targetRef,
		offset: ["start end", "end start"],
	});

	// trigger for animations
	const { initialize } = useInitContext();
	const { route, setCLIvisible } = useNavContext();

	// nav state (when nav shows then we are in about section)
	const {  setRoute } = useNavContext();

	const [navActive, setNavActive] = useState(false);
	const [hideMarquee, setHideMarquee] = useState(false);

	useMotionValueEvent(scrollYProgress, 'change', (value) => {
		if (value > 0.5) {
			setHideMarquee(true);
		} else {
			setHideMarquee(false);
		}

		if (value >= 0.7) {
			setNavActive(true);
		} else {
			setNavActive(false);
		}
	});

	useEffect(() => {
		if (navActive) {
			setRoute('about');
		} else {
			setRoute('main');
		}
	}, [navActive]);

	const widthTransform = useTransform(scrollYProgress, [0.2, 0.5], ['30vw', '100vw']);
	const yTransform = useTransform(scrollYProgress, [0.5, 0.7], ['50vh', '0vh']);
	const fontSizeTransform = useTransform(scrollYProgress, [0.5, 0.7], ['6em', '2em']);
	const textAlignmentTransform = useTransform(scrollYProgress, [0.5, 0.7], ['right', 'center']);
	const translateYTransform = useTransform(scrollYProgress, [0.5, 0.7], ['-50%', '0%']);

	// const 

	const marqueeTextList = ['developer.', 'designer.', 'creator.'];

	return (
		<motion.section ref={targetRef} className='h-[400vh] overflow-x-hidden relative'
			style={{
				backgroundSize: '100px 100px',
				backgroundPosition: 'center',
				backgroundImage: 'linear-gradient(to right, grey 1px, transparent 1px), linear-gradient(to bottom, grey 1px, transparent 1px)'
			}}
			initial={{
				opacity: 0,
			}}
			animate={initialize && {
				opacity: 1,
			}}

		>
			{/* HOME */}
			< div >
				{initialize &&
					<div>
						{/* top bottom text parallaxes */}
						<ParallaxText baseVelocity={3} className='text-[5em] fixed top-[10%]' exit={hideMarquee} transitionParams={{
							duration: 0.75,
							ease: 'circInOut',
							delay: 0.5,
						}}>
							{marqueeTextList}
						</ParallaxText>
						<ParallaxText baseVelocity={-2} className='text-[5em] fixed bottom-[10%]' exit={hideMarquee} transitionParams={{
							duration: 0.75,
							ease: 'circInOut',
							delay: 0.5,
						}}>
							{marqueeTextList}
						</ParallaxText>

						{/* hero text and NAVBAR */}
						<motion.div className={cn('fixed text-[--text-inverse] bg-[--foreground] z-20 items-center px-10 max-sm:px-2', righteous.className)}
							style={{
								translateY: translateYTransform,
								y: yTransform,
								width: widthTransform,
								display: navActive ? 'flex' : 'block',
							}}
							initial={{
								x: '-100%',
							}}
							animate={{
								x: 0,
								width: '30vw',
							}}
							transition={{
								duration: 0.5,
								delay: 1,
								ease: 'anticipate'
							}}
						>

							{navActive &&(
								<div className={cn('cursor-pointer w-[20%]',cascadia.className)} onClick={() => setCLIvisible((prev: boolean) => !prev)}>
									&gt;_
								</div>
							)}
							
							<motion.div style={{
								textAlign: textAlignmentTransform,
								fontSize: fontSizeTransform,
								width: navActive ? '60%' : '100%',
							}}>
								nitish.
								{/* <Typewriter trigger={navActive}>
									maindoliya.
								</Typewriter> */}
							</motion.div>

							{navActive &&(
								<div className={cn('w-[20%] text-right', cascadia.className)}>
									/{route}
								</div>
							)}
						</motion.div>
					</div>
				}
			</div >

			{/* ABOUT */}
			< div className='bg-[--background] absolute bottom-0 h-[100vh] py-10 w-full'>
				<div className='w-full h-full flex max-sm:flex-col'>
					<div className='w-2/5 h-full flex flex-col justify-evenly max-sm:w-full'>
							<div className={cn('text-[3.5em] text-[--text-primary] text-center max-sm:text-[2em]', porterSansBlock.className)}>
								&gt;_whoami
							</div>
							
							<div className='h-2/3 flex justify-center max-sm:justify-start max-sm:px-10'>
								<div className='w-full aspect-square bg-[rgba(255,255,255,0.8)]'>
									{/* PARTICLE PIC */}
								</div>
							</div>
					</div>
					
					<div className='w-3/5 h-full text-[--text-primary] flex flex-col justify-center px-10 max-sm:w-full'>
						<div>
							<h1 className='text-[2.5em] font-bold font-mono'>I'm Nitish Maindoliya</h1>
							<h2 className='text-[1.5em] font-bold'>a developer, designer and creator</h2>
						</div>
						{
							[...Array(1)].map((_, i) => (
								<p key={i} className={cn('text-[1em] py-1 font-mono text-[--text-secondary]')}> Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sequi quos nisi quidem quod reprehenderit facere impedit minima officiis sapiente, accusamus eveniet voluptatem modi veritatis quas deleniti labore sunt voluptate quia. </p>
							))
						}

						<div className='flex mt-[2em]'>
							<motion.button className={cn('bg-[--foreground] text-[--text-inverse] px-4 py-2', cascadia.className)}
								whileHover={{
									background: 'var(--background)',
									color: 'var(--text-primary)',
									boxShadow: '3px 3px 0 var(--text-primary)',
								}}
								transition={{
									duration: 0,
								}}
							>Contact Me
							</motion.button>
						</div>
					</div>
				</div>
			</div >

		</motion.section >
	)
}

export default HeroSection;