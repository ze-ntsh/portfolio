import { use, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { m, motion } from 'framer-motion';

import { cn } from '@/lib/utils';
import { useNavContext } from './context/nav-context';
import { useInitContext } from './context/init-context';
import { cascadia } from '@/lib/fonts';

export const CLI = () => {

	// size
	const [minimized, setMinimized] = useState(false);

	// text area
	const inputRef = useRef<HTMLInputElement>(null);
	const [command, setCommand] = useState('');
	const [output, setOutput] = useState<string[]>([]);
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
				setMinimized(false);
				setCLIvisible((prev) => !prev);
			}
		};

		window.addEventListener('keydown', handleKeyDown);

		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, []);

	// FILE SYSTEM
	const fileSystem = {
		'home': {},
		'about.txt': 'This is about me',
		'projects': {
			'project-1': {
				'info.txt': 'This is project 1',
			},
			'project-2': {
				'info.txt': 'This is project 2',
			},
			'project-3': {
				'info.txt': 'This is project 3',
			},
		},
	};

	// COMMANDS
	const commandList: { [key: string]: { action: () => void } } = {
		[initializeCommand]: {
			action: () => {
				setInitialize(true);
				setTimeout(() => {
					setDelayInit(true);
				}, 300);
			},
		},
		'clear': {
			action: () => {
				setOutput([]);
			},
		},
		// 'ls': {
		// 	action: () => {
		// 		const path = dir.split('/').filter((p) => p);
		// 		let current = fileSystem;
		// 		path.forEach((p) => {
		// 			current = current[p];
		// 		});
		// 		setOutput((prev) => [...prev, ...Object.keys(current)]);
		// 	},
		// },
		// 'cd': {
		// 	action: () => {
		// 		const path = command.split(' ')[1];
		// 		if (path === '..') {
		// 			const pathSplit = dir.split('/');
		// 			pathSplit.pop();
		// 			setDir(pathSplit.join('/'));

		// 			// @ts-ignore
		// 		} else if (fileSystem[path]) {
		// 			setDir((prev) => `${prev}/${path}`);
		// 		} else {
		// 			setOutput((prev) => [...prev, `${path}: No such file or directory`]);
		// 		}
		// 	},
		// },
	};

	const handleCommand = (e: React.KeyboardEvent<HTMLInputElement>) => {
		// enter key
		if (e.key === 'Enter') {
			// add to output
			setOutput((prev) => [...prev, `nitish@nitish:${dir}$ ${command}`]);

			// check if command is empty
			if (!command) return;

			// add to command history
			if (commandHistory.current[commandHistory.current.length - 1] !== command) {
				commandHistory.current.push(command);
				commandIndex.current = commandHistory.current.length - 1;
			}

			// execute command
			if (commandList[command.split(' ')[0]]) {
				commandList[command.split(' ')[0]].action();
			} else {
				// invalid command
				setOutput((prev) => [...prev, `${command}: command not found`]);
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
	}, [command]);

	// INITAL ANIMATION (OUTPUT / MINIMIZE)
	useEffect(() => {
		if (initialize) {
			const timeout = setTimeout(() => { setMinimized(true) }, 200);
			setOutput((prev) => [...prev, 'Welcome to Nitish Maindoliya\'s portfolio']);

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
			<div className='bg-gray-200 w-full h-6 flex items-center'>
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
			</div>

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