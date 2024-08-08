"use client";

import { motion, useMotionValue, useTransform, useAnimate } from "framer-motion";
import { useEffect, useState } from "react";

type TypewriterTypes = {
	className?: string | undefined;
	children?: any;
	trigger?: boolean;
	reverse?: boolean;
	// direction?: number;
	transitionParams?: {
		duration?: number;
		delay?: number;
	}
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

	const displayTextReverse = useTransform(count, (value) => {
		return children.slice(0, children.length-Math.round(value));
	})

	const [scope, animate] = useAnimate();

	useEffect(() => {
		if (!trigger) return;

		const controls = animate(count, children.length, {
			type: 'spring',
			duration: 3,
			ease: 'linear',
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