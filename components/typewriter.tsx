"use client";

import { motion, useMotionValue, useTransform, useAnimate } from "framer-motion";
import { useEffect, useState } from "react";

type TypewriterTypes = {
	className?: string | undefined;
	children?: any;
	trigger?: boolean;
}

const Typewriter = ({
	className,
	children,
	trigger,
}: TypewriterTypes) => {

	const count = useMotionValue(0);
	
	const displayText = useTransform(count, (value) => {
		return children.slice(0, Math.round(value));
	});

	const [animationComplete, setAnimationComplete] = useState(false);

	const [scope, animate] = useAnimate();

	useEffect(() => {
		if(!trigger) return;

		const controls = animate(count, children.length, {
			type: 'spring',
			duration: 3,
			ease: 'linear',
			onUpdate: (value) => {
				if(value == children.length) {
					setAnimationComplete(true);
				}
			},
		});

		return controls.stop;
	}, [animate, children.length, count, trigger]);

	return (
		<motion.span className={className} ref={scope}>
			{displayText}
		</motion.span>
	)
};

export default Typewriter;