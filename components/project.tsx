import Image from "next/image";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Typewriter from "./typewriter";
import { cn } from "@/lib/utils";
import { cascadia } from "@/lib/fonts";
import { useLenis } from "lenis/react";

export const Project = ({
	name = 'Project Name',
	description = [
		"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc malesuada, massa vel molestie interdum, urna arcu feugiat lectus, eu lacinia enim nibh non lacus. Morbi erat erat, dapibus eget odio a, tempus venenatis elit.",
		"Donec semper sodales enim, scelerisque consectetur neque accumsan sit amet. In eu faucibus odio, ac commodo nisl. Aenean quam urna, efficitur in ligula vestibulum, facilisis mollis nunc. Duis in congue leo. Nullam accumsan a nisi id ornare. In lacinia eu leo et lobortis. Morbi eleifend a erat eget elementum. Maecenas egestas velit at sem fermentum, quis venenatis urna dignissim. Sed sed metus molestie felis tristique feugiat vel eu lectus. "
	],
	stack = ['React', 'Next.js', 'TailwindCSS'],
	images = [{
		src: '/images/project1/1.jpg',
		desc: [
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc malesuada, massa vel molestie interdum, urna arcu feugiat lectus, eu lacinia enim nibh non lacus. Morbi erat erat, dapibus eget odio a, tempus venenatis elit.",
			"Donec semper sodales enim, scelerisque consectetur neque accumsan sit amet. In eu faucibus odio, ac commodo nisl. Aenean quam urna, efficitur in ligula vestibulum, facilisis mollis nunc. Duis in congue leo. Nullam accumsan a nisi id ornare. In lacinia eu leo et lobortis. Morbi eleifend a erat eget elementum. Maecenas egestas velit at sem fermentum, quis venenatis urna dignissim. Sed sed metus molestie felis tristique feugiat vel eu lectus. "
		],
		alt: 'image',
	}, {
		src: '/images/project1/1.jpg',
		desc: [],
		alt: 'image',
	}, {
		src: '/images/project1/1.jpg',
		desc: [],
		alt: 'image',
	}],
	link = '',
	timespan = 2024,
}) => {

	const [elementInView, setElementInView] = useState(false);
	const [expanded, setExpanded] = useState(false);
	const [galleryScrolled, setGalleryScrolled] = useState(false);

	const scrollRef = useRef(null);
	const galleryScrollRef = useRef(null);
	const scrollerContainerRef = useRef(null);

	const { scrollY } = useScroll({
		target: scrollRef,
	});

	const { scrollYProgress: galleryScrollYProgress } = useScroll({
		target: galleryScrollRef,
		offset: ["start end", "end start"],
	});

	const toggleExpanded = () => {
		if (images.length === 0) return;
		setExpanded((prev) => !prev);
	}

	useMotionValueEvent(galleryScrollYProgress, 'change', (value) => {
		if (scrollerContainerRef.current) {
			// @ts-ignore
			scrollerContainerRef.current.scrollLeft = value * scrollerContainerRef.current.scrollWidth;
		}

		if (value === 1) {
			setGalleryScrolled(true);
		} else {
			setGalleryScrolled(false);
		}
	});

	const yBeforeExpand = useRef(0);

	const lenis = useLenis();

	useEffect(() => {
		if (expanded) {
			yBeforeExpand.current = scrollY.get();
		} else {
			lenis?.stop();
			window.scrollTo(0, yBeforeExpand.current);
			lenis?.start();
		}
	}, [expanded, scrollY, lenis]);

	return (
		<>
			<div ref={scrollRef} className="z-0 relative max-sm:h-[100vh] bg-[--background] pt-5 max-sm:pt-10"
				style={{
					position: expanded ? 'sticky' : 'relative',
					top: expanded ? '3em' : 'auto',
					height: expanded ? '100vh' : 'auto',
				}}
			>
				{/* flex */}
				<div className="flex flex-col h-[80%] max-sm:h-[95%]">
					{/* information section */}
					<motion.div layout className="flex max-sm:flex-col max-sm:h-full justify-evenly"
						onViewportEnter={() => setElementInView(true)}
						transition={{ duration: 0 }}
					>
						<div className="w-1/4 max-sm:w-full max-sm:mb-5">
							<div className="w-[60%] h-full max-sm:w-full text-right max-sm:text-center">
								{/* typewriter animation */}
								<span className={cn("text-[--text-primary] text-xl", cascadia.className)}>
									/
									<Typewriter
										trigger={elementInView}
									>
										{name.toLowerCase().replace(' ', '_')}
									</Typewriter>
								</span>
								<div className="text-[--text-primary] text-2xl mr-4 italic font-light">
									{timespan}
								</div>
							</div>
						</div>

						<div className="text-[--text-secondary] text-md w-1/2 max-sm:w-full max-sm:px-10">
							<div className={cn("bg-[--foreground] text-[--text-inverse] mb-2 pl-2", cascadia.className)}>
								<span>&gt;_ </span>
								<Typewriter trigger={elementInView}>
									cat info.txt
								</Typewriter>
							</div>

							<div>
								{
									description.map((desc, index) => (
										<motion.p
											key={index}
											className="mb-2 max-sm:w-full"
											style={{
												display: expanded ? 'none' : 'block',
											}}
											initial={{ opacity: 0 }}
											animate={elementInView ? { opacity: 1 } : { opacity: 0 }}
											transition={{ duration: 0.3, delay: 0.6 + index * 0.3 }}
										>
											{desc}
										</motion.p>
									))
								}

								{
									<motion.p className="mb-2 max-sm:w-full"
										style={{
											display: expanded ? 'block' : 'none',
										}}
									>
										{description[0] + '...'}
									</motion.p>
								}

								<motion.div className="text-[--text-primary] items-center italic my-2"
									initial={{ opacity: 0 }}
									animate={elementInView ? { opacity: 1 } : { opacity: 0 }}
									transition={{ duration: 0.3, delay: 0.6 + description.length * 0.3 }}
								>
									<span className="font-bold">Tech used: </span>
									{stack.map((tech, index) => (
										<>{tech + (index === stack.length - 1 ? " " : ", ")}</>
									))}
								</motion.div>
							</div>
						</div>

						<div className="w-1/4 max-sm:w-full text-[--text-primary]">
							<div className="w-full h-full flex flex-col max-sm:flex-row">
								<div className="h-1/2 grid place-items-center max-sm:w-1/2">
									<span className={cn("hover:text-[--text-inverse] hover:bg-white", images.length === 0 ? 'cursor-not-allowed' : 'cursor-pointer')}
										onClick={toggleExpanded}
										title={images.length === 0 ? 'Coming soon!' : 'Expand gallery'}
									>
										gallery &lt;-
									</span>
								</div>
								<motion.div className="h-1/2 grid place-items-center max-sm:w-1/2">
									<span className="hover:text-[--text-inverse] hover:bg-white hover:cursor-pointer"
										onClick={() => {
											window.open(link, '_blank');
										}}
									>
										visit -&gt;
									</span>
								</motion.div>
							</div>
						</div>
					</motion.div>

					{/* image section */}
					{expanded &&
						(
							<motion.div className="h-full w-full flex items-center overflow-hidden"
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ duration: 0.5 }}
							>
								{/* scroller */}
								<div className="scroller h-[80%] w-full overflow-x-auto flex" style={{
									scrollbarWidth: 'none',
									msOverflowStyle: 'none',
								}}
									ref={scrollerContainerRef}
								>
									{images.map((image, index) => (
										<div key={index} className="w-[100vw] h-full max-w-full flex gap-5 justify-center flex-shrink-0 px-10 max-sm:flex-col">
											{/* <div className="flex flex-col"> */}
											<Image src={image.src} alt="image" width={0} height={0} sizes="100vw" className={cn("h-full object-cover w-auto", image?.desc && image.desc.length > 0 && 'sm:max-w-[60%]')} />
											{/* <div className="text-[--text-primary] text-xl">
														{image.caption}
													</div> */}
											{/* </div> */}
											{image.desc && image.desc.length > 0 &&
												<div className="text-[--text-secondary] w-2/5 max-sm:w-full max-sm:first:block h-full flex flex-col justify-center max-sm:hidden">
													{image.desc.map((desc, index) => (
														<p key={index} className="mb-5 max-sm:hidden">
															{desc}
														</p>
													))}
												</div>
											}
										</div>
									))}
								</div>
							</motion.div>
						)
					}
				</div>
			</div>


			<motion.div onClick={toggleExpanded}
				// initial={{height: 0}}
				// animate={{height: '500vh', transition: {
				//     duration: 1,
				//     ease: 'easeIn',
				// }}}
				ref={galleryScrollRef}
				style={{
					height: images.length * 100 + 'vh',
					display: expanded ? 'block' : 'none',
				}}
			>
			</motion.div>

		</>
	);
};

export default Project;