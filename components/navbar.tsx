import { motion } from 'framer-motion'

import localFont from 'next/font/local';
import { useState } from 'react';
import CLI from './command-line';
import { cn } from '@/lib/utils';
const cascadia = localFont({src: '../public/fonts/cascadia.ttf'});

const Navbar = () => {

	const [CLIvisible, setCLIvisible] = useState(false);

	const navbarVariants = {
		hide: {
			y: '-100%',
			boxShadow: '0 0 0 rgba(0, 0, 0, 0)',
		},
		show: {
			y: 0,
			boxShadow: '0 0 10px #fff',
			transition: {
				duration: 0.2,
				boxShadow: {
					delay: 0.5,
				}
			}
		},
	}

	return (
		<>
			<motion.div className='w-full bg-[--background] text-[--text-primary] fixed py-1 flex items-center justify-between px-10 z-20'
				initial='hide'
				// animate={ 'show' : 'hide'}
				variants={navbarVariants}
			>
				<span className={cn('cursor-pointer',cascadia.className)} onClick={() => setCLIvisible((prev) => !prev)}>&gt;_</span>
				<div className='text-center font-bold text-[1.8em]'>nitish.</div>
				<span className={cascadia.className}>/test</span>
			</motion.div>

		</>
	)
}

export default Navbar;