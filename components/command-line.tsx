import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion';

import { cn } from '@/lib/utils';
import { useNavContext } from './context/nav-context';
import { useInitContext } from './context/init-context';
import { cascadia } from '@/lib/fonts';

import { fileSystem } from '@/lib/file-system';

export const CLI = () => {

	// size
	const [minimized, setMinimized] = useState(false);

	// text area
	const inputRef = useRef<HTMLInputElement>(null);
	const [command, setCommand] = useState('');
	const [output, setOutput] = useState<string[]>([]);
	const cout = (text: string[] | string) => {
		setOutput((prev) => [...prev, ...(Array.isArray(text) ? text : [text])]);
	};

	const initializeCommand = 'initialize';

	// file system
	const [dir, setDir] = useState<string>('');

	// command history
	const commandHistory = useRef<string[]>([]);
	const commandIndex = useRef<number>(0);

	// context
	const { cliVisible, setCLIvisible } = useNavContext();
	const { initialize, setInitialize } = useInitContext();
	const [delayInit, setDelayInit] = useState(false);

	// ctrl + ` to toggle
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === '`' && e.ctrlKey) {
				if (!cliVisible) {
					setMinimized(false);
					setCLIvisible(true);
				} else {
					setMinimized((prev) => !prev);
				}
			}
		};

		window.addEventListener('keydown', handleKeyDown);

		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, [setCLIvisible, minimized, cliVisible]);

	// COMMANDS
	const commandList: { [key: string]: { action: (args: string[]) => void, description?: string } } = {
		[initializeCommand]: {
			action: (args: string[]) => {
				setInitialize(true);
				cout('Welcome to Nitish Maindoliya\'s portfolio');
				cout('Type help to list all commands');
			},
			description: 'Initialize the portfolio',
		},
		'clear': {
			action: (args: string[]) => {
				setOutput([]);
			},
			description: 'Clear the terminal',
		},
		'help': {
			action: (args: string[]) => {
				cout(Object.keys(commandList).map((key) => `${key} - ${commandList[key].description}`));
			},
			description: 'List all commands',
		},
		'ls': {
			action: (args: string[]) => {
				if (!dir) {
					cout(Object.keys(fileSystem).join(' '));
				} else {
					const currentDir = fileSystem[dir];
					if (currentDir) {
						cout(Object.keys(currentDir).join(' '));
					} else {
						cout('ls: No such file or directory');
					}
				}
			},
			description: 'List all directories',
		},
		'cd': {
			action: (args: string[]) => {
				if (args[0] in fileSystem) {
					setDir(args[0]);
					cout(`Changed directory to ${args[0]}`);
				} else {
					cout(`cd: ${args[0]}: No such file or directory`);
				}
			},
			description: 'Change directory',
		},
	};

	const handleCommand = (e: React.KeyboardEvent<HTMLInputElement>) => {
		// enter key
		if (e.key === 'Enter') {
			// add to output
			cout(`nitish@nitish:${dir}$ ${command}`);

			// check if command is empty
			if (!command) return;

			// add to command history
			if (commandHistory.current[commandHistory.current.length - 1] !== command) {
				commandHistory.current.push(command);
				commandIndex.current = commandHistory.current.length - 1;
			}

			// execute command
			const args = command.split(' ');
			if (args[0] in commandList) {
				commandList[args[0]].action(args.slice(1));
			} else {
				// invalid command
				cout(`${command}: command not found`);
			}

			// clear input
			setCommand('');
		}

		// autocomplete
		if (e.key === 'Tab') {
			Object.keys(commandList).forEach((key) => {
				if (key.startsWith(command)) {
					setCommand(key);
				}
			});
		}

		// command history
		if (e.key === 'ArrowUp') {
			setCommand(commandHistory.current[commandIndex.current] || '');
			commandIndex.current = Math.max(commandIndex.current - 1, 0);
		}

		// command history
		if (e.key === 'ArrowDown') {
			setCommand(commandHistory.current[commandIndex.current] || '');
			commandIndex.current = Math.min(commandIndex.current + 1, commandHistory.current.length - 1);
		}
	};

	// INITAL ANIMATION
	useEffect(() => {
		let timeoutIds: NodeJS.Timeout[] = [];
		// INITAL ANIMATION TRIGGER
		if (!initialize && cliVisible) {
			// write in input letter by letter
			initializeCommand.split('').forEach((letter, index) => {
				const timeout = setTimeout(() => {
					setCommand((prev) => prev + letter);
				}, 100 * index);
				timeoutIds.push(timeout);
			});
		}

		return () => {
			timeoutIds.forEach((timeout) => clearTimeout(timeout));
		};
	}, [initialize, cliVisible]);

	// INITAL ANIMATION TRIGGER (ENTER)
	useEffect(() => {
		let timeout: NodeJS.Timeout;
		if (!initialize && command === initializeCommand) {
			timeout = setTimeout(() => {
				handleCommand({ key: 'Enter' } as React.KeyboardEvent<HTMLInputElement>);
			}, 150);
		}

		return () => {
			clearTimeout(timeout);
		};
	}, [command, initialize]);

	// INITAL ANIMATION (OUTPUT / MINIMIZE)
	useEffect(() => {
		if (initialize) {
			const timeout = setTimeout(() => { setMinimized(true) }, 200);

			return () => {
				clearTimeout(timeout);
			};
		}
	}, [initialize]);

	const CLIVariants = {
		minimized: {
			height: '1.5rem',
		},
		show: {
			height: '45%',
		}
	};

	const { scrollYProgress } = useScroll();

	const [scrollBarWidth, setScrollBarWidth] = useState(0);
	const remToPx = (rem: number) => rem * parseFloat(getComputedStyle(document.documentElement).fontSize);

	const progress = useTransform(scrollYProgress, [0, 1], [-2, 102]);

	useMotionValueEvent(scrollYProgress, 'change', (progress) => {
		const elments = (Math.trunc(progress * window.innerWidth / remToPx(0.75)) - 1);
		setScrollBarWidth(elments < 0 ? 0 : elments);
	});

	if (!cliVisible) {
		return null;
	}

	return (
		<motion.div
			className={cn(
				'fixed bottom-0 bg-black z-50 w-full',
				cascadia.className,
			)}
			variants={CLIVariants}
			initial='minimized'
			animate={minimized ? 'minimized' : 'show'}
			transition={{
				duration: delayInit ? 0 : 0.2,
				ease: 'anticipate',
			}}
			onClick={() => {
				inputRef.current?.focus();
			}}
		>
			{/* control bar */}
			<motion.div className='bg-gray-200 w-full h-6 flex items-center'
				style={{
					backgroundImage: `linear-gradient(to right, #c6e0c5 0%, #c6e0c5 ${progress.get()}%, rgb(229 231 235) ${progress.get()}%,  rgb(229 231 235) 100% )`,
				}}
			>
				<div className='flex gap-2 ml-2'>
					<div className='h-3.5 aspect-square bg-red-500 rounded-full hover:cursor-pointer'
						onClick={() => {
							setCLIvisible(false)
							setMinimized(false)
						}}
					></div>
					<div className='h-3.5 aspect-square bg-yellow-500 rounded-full hover:cursor-pointer'
						onClick={() => {
							setMinimized((prev) => !prev);
						}}
					></div>
					<div className='h-3.5 aspect-square bg-green-500 rounded-full hover:cursor-pointer'
						onClick={() => {
							setMinimized(false);
						}}
					></div>
				</div>

				<div className='w-full text-center'>
					--terminal--
				</div>

				<div className='flex gap-2 mr-2 invisible'>
					<div className='h-3.5 aspect-square'></div>
					<div className='h-3.5 aspect-square'></div>
					<div className='h-3.5 aspect-square'></div>
				</div>
			</motion.div>

			{/* <div className='h-6 flex items-center gap-1'>
				{Array(scrollBarWidth).fill(0).map((_, index) => (
					<div className='h-4 w-2 bg-white' key={index}></div>
				))}
			</div> */}

			{/* text area */}

			<div className='h-full overflow-y-auto pb-10 text-[--text-primary]'
				style={{
					scrollbarWidth: 'thin',
				}}
				ref={(el) => el?.scrollTo(0, el.scrollHeight)}
			>
				{/* output */}
				{output.map((line, index) => (
					<div key={index}>
						<span className='pl-2'>{line}</span>
					</div>
				))}

				{/* input */}
				<div className='flex pl-2'>
					<span className=''>
						{`nitish@nitish:${dir}$`}
					</span>
					<input
						className='w-full bg-transparent borer-none outline-none pl-2'
						type="text"
						value={command}
						onChange={(e) => setCommand(e.target.value)}
						onKeyDown={handleCommand}
						ref={inputRef}
						autoFocus
					/>
				</div>
			</div>
		</motion.div>
	);
}