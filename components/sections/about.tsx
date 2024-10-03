import { cn } from "@/lib/utils";
import { motion } from 'framer-motion'

import { porterSansBlock } from '@/lib/fonts';
import { cascadia } from "@/lib/fonts";

import { useNavContext } from "@/components/context/nav-context";
import { ExternalLink, Github, LinkedinIcon } from "lucide-react";
import { Button } from "@/components/button";

import { fileSystem } from "@/lib/file-system";

export const About = () => {
  const { setRoute } = useNavContext();


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
            <h2 className={cn('text-[1.5em] italic font-extralight',)}>Innovating solutions, one project a time</h2>
          </div>
          {
            fileSystem.about.description.map((desc, index) => (
              <p key={index} className={cn('text-[1em] mt-2', cascadia.className)}>
                {desc}
              </p>
            ))
          }

          <div className='flex mt-[2em] gap-2'>
            <Button
              onClick={() => {
                window.scrollTo({
                  top: document.body.scrollHeight,
                  behavior: 'smooth'
                });
              }}
            >
              Get in touch
            </Button>
            <Button
              onClick={() => {
                window.open('/resume.pdf', '_blank');
              }}
              className="flex items-center gap-2"
            >
              Resume <ExternalLink size={20} />
            </Button>
            <Button 
              onClick={() => { 
                window.open('https://www.linkedin.com/in/nmaindoliya/', '_blank');
              }}
              hoverStyle={{
                background: '#0a66c2',
              }}
            >
              <LinkedinIcon size={20} />
            </Button>
            <Button 
              onClick={() => {
                window.open('https://github.com/ze-ntsh', '_blank');
              }}
              hoverStyle={{
                background: '#24292e',
              }}
            >
              <Github size={20} />
            </Button>
          </div>
        </div>
      </div>
    </motion.section >
  )
}