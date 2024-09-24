import localFont from 'next/font/local';
import { Righteous } from "next/font/google";
import { Plaster } from 'next/font/google';

export const cascadia = localFont({ src: '../public/fonts/cascadia.ttf' });
export const porterSansBlock = localFont({
	src: '../public/fonts/porter-sans-inline-block.ttf',
});
export const righteous = Righteous({ subsets: ["latin"], weight: '400' });
export const plaster = Plaster({
	weight: '400',
	subsets: ['latin'],
});