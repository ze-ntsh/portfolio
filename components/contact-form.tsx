import { cascadia, righteous } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { contact } from "@/actions/contactEmail";
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as z from 'zod';

interface ContactFormStageProps {
  stage: number;
  formData: string[];
  setFormData: (data: string[]) => void;
}

const ContactFormStageStepper = ({ stage, formData, setFormData }: ContactFormStageProps) => {
  switch (stage) {
    case 0:
      return (
        <div className="flex flex-col gap-2">
          <div className="text-2xl">Do you have a name ?</div>
          <input
            type='text'
            className={cn("text-5xl leading-snug outline-none border-b-[--background] border-b-2", righteous.className)}
            placeholder="John Doe"
            value={formData[0]}
            onChange={(e) => {
              formData[0] = e.target.value;
              setFormData([...formData]);
            }}
          ></input>
        </div>
      );

    case 1:
      return (
        <div className="flex flex-col gap-2">
          <div className="text-2xl">Where can I reach you ?</div>
          <input type='email'
            className={cn("text-3xl leading-snug outline-none border-b-[--background] border-b-2", righteous.className)}
            placeholder={'johndoe@gmail.com'}
            value={formData[1]}
            onChange={(e) => {
              formData[1] = e.target.value;
              setFormData([...formData]);
            }}
          ></input>
        </div>
      );

    case 2:
      return (
        <div className="flex flex-col gap-2">
          <div className="text-2xl" >Let&apos;s talk</div>
          <textarea
            className={cn("text-xl outline-none border-b-[--background] border-b-2 leading-snug", righteous.className)}
            placeholder="Hey, I wanted to talk about..."
            value={formData[2]}
            onChange={(e) => {
              formData[2] = e.target.value;
              setFormData([...formData]);
            }}
          ></textarea>
        </div>
      );

    case 3:
      return (
        <div className="flex flex-col gap-2">
          <div className="text-2xl">Thanks for reaching out</div>
          <div className="text-xl">I&apos;ll get back to you soon</div>
        </div>
      );
  }
};

export const ContactForm = () => {
  const [stage, setStage] = useState(0);
  const [formData, setFormData] = useState(['', '', '']);

  const [error, setError] = useState('');

  // 0: Name
  // 1: Email
  // 2: Message
  // 3: Success

  const schemas = useMemo(() => ([
    z.string().min(1, 'Cmon, I know you have a name'),
    z.string().email('You wanna hear from me, right?').max(50, 'Didn\'t know emails could be that long'),
    z.string().min(15, 'You can do better than that').max(500, 'Let\'s keep it a bit shorter')
  ]), []);

  useEffect(() => {
    // Validate on formdata change
    if (stage == 3) return;
    
    const schema = schemas[stage];
    const result = schema.safeParse(formData[stage]);
    if (stage == 2) {
      if (error) {
        if (result.success) {
          setError('');
        }
      }
      return;
    }

    if (!result.success) {
      setError(result.error.errors[0].message);
    } else {
      setError('');
    }
  }, [error, formData, schemas, stage]);

  useEffect(() => {
    setError('');
  }, [stage])

  const nextStage = () => {
    // Validate
    const schema = schemas[stage];
    const result = schema.safeParse(formData[stage]);
    if (!result.success) {
      setError(result.error.errors[0].message);
      return;
    }

    // Submit
    if (stage == formData.length - 1) {
      contact(formData[0], formData[1], formData[2]).catch((err) => {
        setError('Something went wrong. Please try again later');
      });
    }

    if (!error) {
      setStage(stage + 1);
    }
  }

  const prevStage = () => {
    if (stage == 0) return;
    setStage(stage - 1);
  }

  return (
    <div className={cn("h-[25em] w-[25em] bg-white rounded-sm z-10 text-[--text-inverse] flex flex-col justify-between p-4", cascadia.className)}>
      <div className="overflow-auto h-[80%]">
        <div className="flex flex-col gap-2 h-full justify-center">

          <ContactFormStageStepper stage={stage} formData={formData} setFormData={setFormData} />

          {error && <div className="text-sm text-red-500">{error}</div>}

          <AnimatePresence>
            {stage < 3 && stage >= 0 &&
              <motion.div className="w-full flex relative"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.2,
                  delay: 0.3,
                }}
              >
                <button type="submit" onClick={prevStage} className="rounded-md w-fit bg-[--background] text-[--text-primary] p-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="size-5 font-bold">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                  </svg>
                </button>

                <motion.button onClick={nextStage} className="rounded-md w-fit bg-[--background] text-[--text-primary] p-2 absolute"
                  initial={{ x: 0 }}
                  animate={stage > 0 ? {
                    x: '-100%',
                    left: '100%'
                  } : {
                    x: 0,
                    left: 0,
                  }}
                  transition={{
                    duration: 0.2,
                    ease: 'easeInOut'
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="size-5 font-bold">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </motion.button>
              </motion.div>
            }
          </AnimatePresence>
        </div>
      </div>

      <div className="bg-[--foreground] w-full h-[15%]">Hate forms? Connect at <br /> <a href="mailto:nitish@nitish.info">nitish@nitish.info</a></div>
    </div>
  )
};