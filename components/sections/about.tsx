import { cn } from "@/lib/utils";
import { motion } from 'framer-motion'

import { porterSansBlock } from '@/lib/fonts';
import { cascadia } from "@/lib/fonts";

import { useNavContext } from "../context/nav-context";

export const About = () => {
  const {setRoute} = useNavContext();

  return (
    <motion.section className='bg-[--background] absolute bottom-0 h-[100vh] pb-10 w-full snap'>
      <div className='w-full h-full flex max-sm:flex-col'>
        <div className='w-2/5 h-full flex flex-col justify-evenly max-sm:w-full'>
          <div className={cn('text-[3.5em] text-[--text-primary] text-center max-sm:text-[2em]', porterSansBlock.className)}>
            &gt;_whoami
          </div>

          <div className='h-2/3 flex justify-center max-sm:justify-start max-sm:px-10'>
            <div className='w-full aspect-square bg-[rgba(255,255,255,0.8)]'>
              {/* PARTICLE PIC */}
            </div>
          </div>
        </div>

        <div className='w-3/5 h-full text-[--text-primary] flex flex-col justify-center px-10 max-sm:w-full'>
          <div>
            <h1 className={cn('text-[2.5em] font-bold', cascadia.className)}>I&apos;m Nitish Maindoliya</h1>
            <h2 className='text-[1.5em] font-bold'>and I develop... everything.</h2>
          </div>
          {
            [...Array(1)].map((_, i) => (
              <p key={i} className={cn('text-[1em] py-1 font-mono text-[--text-secondary]')}> Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sequi quos nisi quidem quod reprehenderit facere impedit minima officiis sapiente, accusamus eveniet voluptatem modi veritatis quas deleniti labore sunt voluptate quia. </p>
            ))
          }

          <div className='flex mt-[2em]'>
            <motion.button className={cn('bg-[--foreground] text-[--text-inverse] px-4 py-2', cascadia.className)}
              whileHover={{
                background: 'gray',
                color: 'var(--text-primary)',
                boxShadow: '3px 3px 0 var(--text-primary)',
              }}
              onClick={() => {
                document.getElementsByClassName('contact-section-scroll')[0].scrollIntoView({ behavior: 'smooth' })
              }}
            >Get in touch
            </motion.button>
          </div>
        </div>
      </div>
    </motion.section >
  )
}