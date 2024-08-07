import { use, useRef, useState } from 'react';

import localFont from 'next/font/local';
import { cn } from '@/lib/utils';
const cascadia = localFont({src: '../public/fonts/cascadia.ttf'});

const CLI = () => {
    const [fullScreen, setFullScreen] = useState(false);
    const [minimized, setMinimized] = useState(false);

    const [command, setCommand] = useState('');
    const [initialized, setInitialized] = useState(false);
    
    const commandHistory = useRef<string[]>([]);
    const commandIndex = useRef<number>(0);

    const commandList = {
        'intialize': {
            action: () => {
                setInitialized(true);
            },
        }
    }

    const handleCommand = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            // add to command history
            if (!e.currentTarget.value) return;

            if(commandHistory.current[commandHistory.current.length-1] !== e.currentTarget.value){
                commandHistory.current.push(e.currentTarget.value);
                commandIndex.current = commandHistory.current.length-1;
            }

            // execute command
            console.log(e.currentTarget.value);
            e.currentTarget.value = ''; // clear input
        }

        if (e.key === 'ArrowUp') {
            // get previous command
            e.currentTarget.value = commandHistory.current[commandIndex.current];
            commandIndex.current = Math.max(commandIndex.current - 1, 0);
        }

        if (e.key === 'ArrowDown') {
            // get next command
            e.currentTarget.value = commandHistory.current[commandIndex.current];
            commandIndex.current = Math.min(commandIndex.current + 1, commandHistory.current.length-1);
        }
    };
    
    return (
        <div className={cn(
            'fixed bottom-0 bg-black z-50 w-full', 
            cascadia.className, 
            fullScreen ? 'h-[calc(100vh-3.2em)]' : 'h-[45%]',
            minimized && 'h-6',
        )}
        >
            {/* control bar */}
            <div className='bg-gray-200 w-full h-6 flex items-center'>
                <div className='flex gap-2 ml-2'>
                    <div className='h-3.5 aspect-square bg-red-500 rounded-full hover:cursor-pointer'></div>
                    <div className='h-3.5 aspect-square bg-yellow-500 rounded-full hover:cursor-pointer' 
                        onClick={() => setMinimized((prev) => !prev)}
                    ></div>
                    <div className='h-3.5 aspect-square bg-green-500 rounded-full hover:cursor-pointer'
                        onClick={() => setFullScreen((prev) => !prev)}
                    ></div>
                </div>
            </div>

            {/* text area */}

            <div className='h-full p-2'>
                {/* input */}
                <div className='flex text-[--text-primary]'>
                    <span>
                        <span className=''>nitish@nitish:~$</span>
                    </span>
                    <input
                        className='w-full bg-transparent borer-none outline-none pl-2'
                        type="text"
                        value={command}
                        onChange={(e) => setCommand(e.target.value)}
                        onKeyDown={handleCommand}
                        autoFocus
                    />
                </div>
            </div>
        </div>
    );
} 

export default CLI;