import { motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion';
import { RefObject, useEffect, useRef, useState } from 'react';
import { Projects } from '@/components/sections/projects';
import { ParallaxText } from '@/components/parallax-text';


import { cn } from '@/lib/utils';
import { useInitContext } from '../context/init-context';
import { useNavContext } from '../context/nav-context';
import { cascadia } from '@/lib/fonts';
import { righteous } from '@/lib/fonts';
import { About } from './about';

/**
 * Represents the HeroSection component.
 * 
 * @component
 * @param {Object} props - The component props.
 * @param {RefObject} props.snapRef - The reference to the snap element.
 * @returns {JSX.Element} The rendered HeroSection component.
 */

export const HeroSection = () => {
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

	const emToPx = (em: number) => em * parseFloat(getComputedStyle(document.documentElement).fontSize);
	const pxToVw = (px: number) => (px / window.innerWidth) * 100;
	// const num = pxToVw

	const initalWidth = '30vw';
	const widthTransform = useTransform(scrollYProgress, [0.2, 0.5], [initalWidth, '100vw']);
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
						<motion.div className={cn('fixed text-[--text-inverse] bg-[--foreground] z-20 items-center px-10', righteous.className)}
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
								width: initalWidth,
							}}
							transition={{
								duration: 0.5,
								delay: 1,
								ease: 'anticipate'
							}}
						>

							{navActive && (
								<div className={cn('cursor-pointer w-[20%]', cascadia.className)} onClick={() => setCLIvisible((prev: boolean) => !prev)}>
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

							{navActive && (
								<div className={cn('w-[20%] text-right', cascadia.className)}>
									/{route}
								</div>
							)}
						</motion.div>
					</div>
				}
			</div >

			<About />

		</motion.section >
	)
}
