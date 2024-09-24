import { motion } from 'framer-motion'

import { useState } from 'react';
import CLI from './command-line';
import { cn } from '@/lib/utils';
import { useNavContext } from './context/nav-context';
import Typewriter from './typewriter';
import { cascadia } from '@/lib/fonts';

const Navbar = () => {

	const { setCLIvisible, route } = useNavContext();

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
					<Typewriter>
						maindoliya.
					</Typewriter>
				</div>
				<div className={cn(cascadia.className, 'w-1/4 text-right')}>/{route}</div>
			</motion.div>
		</>
	)
}

export default Navbar;