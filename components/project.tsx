import Image from "next/image";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Typewriter from "./typewriter";
import { cn } from "@/lib/utils";

import localFont from 'next/font/local';
const cascadia = localFont({src: '../public/fonts/cascadia.ttf'});

const Project = ({
	name = 'Project Name',
	description = [
		"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc malesuada, massa vel molestie interdum, urna arcu feugiat lectus, eu lacinia enim nibh non lacus. Morbi erat erat, dapibus eget odio a, tempus venenatis elit.",
		"Donec semper sodales enim, scelerisque consectetur neque accumsan sit amet. In eu faucibus odio, ac commodo nisl. Aenean quam urna, efficitur in ligula vestibulum, facilisis mollis nunc. Duis in congue leo. Nullam accumsan a nisi id ornare. In lacinia eu leo et lobortis. Morbi eleifend a erat eget elementum. Maecenas egestas velit at sem fermentum, quis venenatis urna dignissim. Sed sed metus molestie felis tristique feugiat vel eu lectus. "
	],
	images = ['/images/project1/1.jpg', '/images/project1/1.jpg', '/images/project1/1.jpg'],
}) => {

	const [elementInView, setElementInView] = useState(false);
	const [expanded, setExpanded] = useState(false);

	const scrollRef = useRef(null);
	const galleryScrollRef = useRef(null);
	const scrollerContainerRef = useRef(null);

	const {scrollY} = useScroll({
		target: scrollRef,
	});

	const {scrollYProgress: galleryScrollYProgress} = useScroll({
		target: galleryScrollRef,
		offset: ["start start", "end start"],
	});

	useMotionValueEvent(galleryScrollYProgress, 'change', (value) => {
		if (scrollerContainerRef.current) {
			// @ts-ignore
			scrollerContainerRef.current.scrollLeft = value * scrollerContainerRef.current.scrollWidth;
		}
	});

	const toggleExpanded = () => {
		setExpanded((prev) => !prev);
	}

	const yBeforeExpand = useRef(0);
	useEffect(() => {
		if(expanded) {
			yBeforeExpand.current = scrollY.get();
		} else {
			window.scrollTo(0, yBeforeExpand.current);
		}
	}, [expanded, scrollY]);
	
	return (
		<>
			<div ref={scrollRef} className="pt-5 z-0 relative max-sm:h-[100vh] bg-[--background]"
				style={{
					position: expanded ? 'sticky' : 'relative',
					top: expanded ? '3em' : 'auto',
					height: expanded ? '100vh' : 'auto',
				}}
			>	
				{/* flex */}
				<div className={
					cn(
						"flex flex-col", 
						expanded ? 'h-[75vh] max-sm:h-[90vh]' : "auto",
					)
				}
				>
					{/* information section */}
					<motion.div layout className="flex max-sm:flex-col max-sm:h-full justify-evenly"
						onViewportEnter={() => setElementInView(true)}
						transition={{duration: 0}}
					>
						<div className="w-1/4 max-sm:w-full">
							<div className="w-[60%] h-full max-sm:w-full text-right max-sm:text-center">
								{/* typewriter animation */}
								<span className={cn("text-[--text-primary] text-xl", cascadia.className)}>
									\
									<Typewriter
										trigger={elementInView}
									>
										{name.toLowerCase().replace(' ', '_')}
									</Typewriter>
								</span>
								<div className="text-[--text-primary] text-2xl mr-4 italic font-light">
									2024
								</div>
							</div>
						</div>

						<div className="text-[--text-secondary] text-md w-1/2 max-sm:w-full max-sm:px-10">
							<div className={cn("bg-white text-black mb-2 pl-2", cascadia.className)}>
								<span>&gt;_ </span>
								<Typewriter trigger={elementInView}>
									cat info.txt
								</Typewriter>
							</div>
							
							{ !expanded ?
								description.map((desc, index) => (
									<p key={index} className="mb-2 max-sm:w-full">
										{desc}
									</p>
								))
								: description[0] + '...'
							}
						</div>

						<div className="w-1/4 max-sm:w-full text-[--text-primary]">	
							<div className="w-full h-full flex flex-col max-sm:flex-row">
								<div className="h-1/2 grid place-items-center max-sm:w-1/2">
									<span className="hover:text-[--text-inverse] hover:bg-white hover:cursor-pointer" onClick={toggleExpanded}>
										gallery &lt;-
									</span>
								</div>
								<motion.div className="h-1/2 grid place-items-center max-sm:w-1/2">
									<span className="hover:text-[--text-inverse] hover:bg-white hover:cursor-pointer">
										visit -&gt;
									</span>
								</motion.div>
							</div>	
						</div>
					</motion.div>

					{/* image section */}
					{expanded && 
						(
							<div className="h-full w-full flex items-center">
								{/* scroller */}
								<div className="scroller h-[70%] w-full overflow-x-auto flex" style={{
									scrollbarWidth: 'none',
									msOverflowStyle: 'none',
								}}
								ref={scrollerContainerRef}
								>
									{images.map((image, index) => (
										<div key={index} className="w-[100vw] h-full max-w-full flex justify-center flex-shrink-0">
											<Image src={image} alt="image" width={0} height={0} sizes="100vw" className="h-full w-auto" />
										</div>
									))}
								</div>
							</div>
						)
					}
				</div>
			</div>
					

			<motion.div onClick={toggleExpanded} className="h-[400vh]"
				// initial={{height: 0}}
				// animate={{height: '500vh', transition: {
				//     duration: 1,
				//     ease: 'easeIn',
				// }}}
				ref={galleryScrollRef}
				style={{
					display: expanded ? 'block' : 'none',
				}}
			>

			</motion.div> 

		</>
	);
};

export default Project;