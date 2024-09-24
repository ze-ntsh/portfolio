import { cn } from '@/lib/utils';

import { AnimatePresence, delay, motion, progress, useAnimationFrame, useMotionValue, useMotionValueEvent, useScroll, useSpring, useTransform, useVelocity, wrap } from 'framer-motion';
import { use, useEffect, useRef, useState } from 'react';

type ParallaxTextTypes = {
    className?: string | undefined;
    children?: any;
    style?: any;
    baseVelocity?: number;
    exit?: boolean;
    transitionParams?: Object;
}

import { porterSansBlock } from '@/lib/fonts';



export const ParallaxText = ({ children, className, style, baseVelocity=5, exit = false, transitionParams = {
    duration: 0.75,
    ease: 'circInOut',
    delay: 0,
}} : ParallaxTextTypes) => {
    const [ready, setReady] = useState(false);

    const baseX = useMotionValue(0);
    const {scrollY} = useScroll();
    const scrollVelocity = useVelocity(scrollY);
    // const smoothVelocity = useSpring(scrollVelocity, {stiffness: 50, damping: 400});
    const velocityFactor = useTransform(scrollVelocity, [0, 1000], [0, 5], {clamp: false});

    // the difference between the wrap value is the 100 / number of children (-50, -25 -> 100/4 = 25).
    const x = useTransform(baseX, (v) => `${wrap(-25, -50, v)}%`);

    const directionFactor = useRef<number>(1);
    
    useEffect(() => {
        if(exit){
            setReady(false);
        }
    }, [exit])

    useAnimationFrame((t, dt) => {
        if(!ready) {
            return;
        }

        let moveBy = directionFactor.current * baseVelocity * dt / 1000;

        if(velocityFactor.get() < 0) {
            directionFactor.current = -1;
        } else if (velocityFactor.get() > 0) {
            directionFactor.current = 1;
        }

        moveBy += directionFactor.current * moveBy * velocityFactor.get();

        baseX.set(baseX.get() + moveBy);
    });

    return (
        <div className={cn(
            'parallax overflow-hidden leading-[0.8] m-0 whitespace-nowrap flex flex-nowrap text-[--text-primary]',
            className, 
            porterSansBlock.className
        )} style={style}>
            <motion.div className="scroller uppercase flex whitespace-nowrap flex-nowrap"
                style={{x}}
                animate = {exit ? {
                    x: [x.get(), baseVelocity > 0 ? '25%' : '-100%'],
                    display: 'none',
                    transition: {
                        ...transitionParams,
                        delay: 0,
                    }
                } : {
                    x: [baseVelocity > 0 ? '25%' : '-100%', x.get()],
                    display: 'flex',
                    transition: {...transitionParams},
                }}
                onAnimationComplete = {() => {
                    if(!exit) {
                        setReady(true);
                    }
                }}
            >
                {...Array(4).fill(children).map((child, index) => (
                    <span key={index} className="block">{child}</span>
                ))}
            </motion.div>
        </div>
    )
};

export default ParallaxText;