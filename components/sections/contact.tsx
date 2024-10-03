import ParallaxText from "@/components/parallax-text";
import { Cube } from "@/components/cube";
import { useMemo } from "react";
import { ContactForm } from "@/components/contact-form";
import { motion } from "framer-motion";
import { useNavContext } from "@/components/context/nav-context";

export const Contact = () => {
  const { setRoute } = useNavContext();

  const cubes = useMemo(() => {
    return (
      <>
        {/* left-right */}
        <div className="absolute top-0 h-full w-full overflow-hidden max-sm:hidden contact-section-scroll">
          {Array.from({ length: 40 }).map((val, index) => {
            return <Cube key={index} className={`absolute`}
              size={Math.random() * 3 + 2}
              style={{
                top: `${Math.random() * 90}%`,
                left: `${Math.random() * 20 - 10}%`
              }} />
          })}

          {Array.from({ length: 40 }).map((val, index) => {
            return <Cube key={index} className={`absolute`}
              size={Math.random() * 3 + 2}
              style={{
                top: `${Math.random() * 90}%`,
                right: `${Math.random() * 20 - 10}%`
              }} />
          })}
        </div>
        
        {/* bottom-mobile */}
        <div className="absolute top-0 h-full w-full overflow-hidden sm:hidden">
          {Array.from({ length: 30 }).map((val, index) => {
            return <Cube key={index} className={`absolute`}
              size={Math.random() * 3 + 2}
              style={{
                left: `${Math.random() * 120 - 10}%`,
                bottom: `${Math.random() * 20 - 10}%`,
              }} />
          })}
        </div>
      </>
    );
  }, [])

  // const size = 10;
  // const unit = 'em';
  // const sizeStr = `${size}${unit}`;
  // const cubeSytles = {
  //   "cubeContainer": { width: sizeStr, height: sizeStr, perspective: `${size * 5}${unit}` },
  //   "cube": {
  //     position: "relative",
  //     width: sizeStr,
  //     height: sizeStr,
  //     transformStyle: "preserve-3d",
  //     transform: "rotate3d(1, 1, 0, 0)"
  //   },
  //   "face": {
  //     width: sizeStr,
  //     height: sizeStr,
  //     background: "white",
  //     border: "1px solid black",
  //     position: "absolute",
  //     display: "flex",
  //     alignItems: "center",
  //     justifyContent: "center",
  //     fontFamily: "Arial, sans-serif",
  //     fontSize: "2rem"
  //   },
  //   "front": { transform: `translateZ(${size / 2}${unit})` },
  //   "back": { transform: `translateZ(-${size / 2}${unit}) rotateY(180deg)` },
  //   "left": { transform: `translateX(-${size / 2}${unit}) rotateY(-90deg)` },
  //   "right": { transform: `translateX(${size / 2}${unit}) rotateY(90deg)` },
  //   "top": { transform: `translateY(-${size / 2}${unit}) rotateX(90deg)` },
  //   "bottom": { transform: `translateY(${size / 2}${unit}) rotateX(-90deg)` }
  // }

  return (
    <motion.section className="h-screen relative overflow-x-hidden"
      style={{
        backgroundSize: '100px 100px',
        backgroundPosition: 'center',
        backgroundImage: 'linear-gradient(to right, grey 1px, transparent 1px), linear-gradient(to bottom, grey 1px, transparent 1px)'
      }}
    >
      <div className="h-full flex flex-col">
        <div className="h-1/3 flex items-center text-[--text-primary] pt-10">
          <ParallaxText baseVelocity={4} className='text-[5em]'>CONTACT.CONNECT.COLLAB.</ParallaxText>
        </div>

        <div className="flex justify-center">
          <ContactForm />
        </div>
      </div>

      {cubes}

    </motion.section>
  )
}