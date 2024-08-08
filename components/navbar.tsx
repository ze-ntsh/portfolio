import { motion } from 'framer-motion'

import localFont from 'next/font/local';
import { useState } from 'react';
import CLI from './command-line';
import { cn } from '@/lib/utils';
import { useNavContext } from './context/nav-context';
import Typewriter from './typewriter';
const cascadia = localFont({src: '../public/fonts/cascadia.ttf'});

const Navbar = () => {

	const { setCLIvisible, route, navActive } = useNavContext();

	const navbarVariants = {
		hide: {
			y: '-100%',
			boxShadow: '0 0 0 rgba(0, 0, 0, 0)',
		},
		show: {
			y: 0,
			boxShadow: '0 0 10px #fff',
		},
	}

	return (
		<>
			<motion.div className='w-full bg-[--background] text-[--text-primary] fixed py-1 px-10 z-20 flex items-center'
				initial='hide'
				// animate={navActive ? 'show' : 'hide'}
				transition={{
					duration: 0.2,
					delay: 0.75,
				}}
				variants={navbarVariants}
			>
				<div className={cn('cursor-pointer w-1/4',cascadia.className)} onClick={() => setCLIvisible((prev: boolean) => !prev)}>&gt;_</div>
				<div className={cn('text-center font-bold text-[1.8em] w-1/2', cascadia.className)}>
					nitish.
					<Typewriter trigger={navActive}>
						maindoliya.
					</Typewriter>
				</div>
				<div className={cn(cascadia.className, 'w-1/4 text-right')}>/{route}</div>
			</motion.div>
		</>
	)
}

export default Navbar;