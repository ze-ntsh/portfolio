import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ParallaxText } from "@/components/ui/parallax-text";

import { cn } from "@/lib/utils";
import { useInitContext } from "../context/init-context";
import { useNavContext } from "../context/nav-context";
import { cascadia } from "@/lib/fonts";
import { righteous } from "@/lib/fonts";
import { About } from "./about";
import { Navigation } from "./sub-components/navigation";

export const HeroSection = () => {
  // animation refs
  const targetRef = useRef(null);
  const navWidthRef = useRef(0);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  // trigger for animations
  const { initialize } = useInitContext();
  const { route, setCLIvisible } = useNavContext();

  const [navActive, setNavActive] = useState(false);
  const [hideMarquee, setHideMarquee] = useState(false);
  const [showNav, setShowNav] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    if (value > 0.5) {
      setHideMarquee(true);
    } else {
      setHideMarquee(false);
    }

    if (value >= 0.7) {
      setNavActive(true);
    } else {
      setNavActive(false);
    }
  });

  const emToPx = (em: number) => em * parseFloat(getComputedStyle(document.documentElement).fontSize);
  const pxToVw = (px: number) => (px / window.innerWidth) * 100;
  // const num = pxToVw

  // animations
  let initalWidth = useRef("30vw");

  useEffect(() => {
    const breakPoint = 768;
    if (window.innerWidth <= breakPoint) {
      initalWidth.current = "100vw";
    } else {
      let extraWidth = ((1130 - window.innerWidth) / breakPoint) * 15;
      if (extraWidth > 15) {
        extraWidth = 15;
      }
      if (extraWidth < 0) {
        extraWidth = 0;
      }

      initalWidth.current = `${30 + extraWidth}vw`;
    }
  }, []);

  const widthTransform = useTransform(scrollYProgress, [0.2, 0.5], [initalWidth.current, "100vw"]);
  const yTransform = useTransform(scrollYProgress, [0.5, 0.7], ["50vh", "0vh"]);
  const fontSizeTransform = useTransform(scrollYProgress, [0.5, 0.7], ["6em", "2em"]);
  const textAlignmentTransform = useTransform(scrollYProgress, [0.5, 0.7], ["right", "center"]);
  const translateYTransform = useTransform(scrollYProgress, [0.5, 0.7], ["-50%", "0%"]);

  // const

  const marqueeTextList = ["developer.", "designer.", "creator."];

  return (
    <motion.section
      ref={targetRef}
      className="h-[400vh] overflow-x-hidden relative"
			data-route="home"
      style={{
        backgroundSize: "100px 100px",
        backgroundPosition: "center",
        backgroundImage: "linear-gradient(to right, grey 1px, transparent 1px), linear-gradient(to bottom, grey 1px, transparent 1px)",
      }}
      initial={{
        opacity: 0,
      }}
      animate={
        initialize && {
          opacity: 1,
        }
      }
    >
      {/* HOME */}
      <div>
        {initialize && (
          <div>
            {/* top bottom text parallaxes */}
            <ParallaxText
              baseVelocity={3}
              className="text-[5em] fixed top-[10%]"
              exit={hideMarquee}
              transitionParams={{
                duration: 0.75,
                ease: "circInOut",
                delay: 0.5,
              }}
            >
              {marqueeTextList}
            </ParallaxText>
            <ParallaxText
              baseVelocity={-2}
              className="text-[5em] fixed bottom-[10%]"
              exit={hideMarquee}
              transitionParams={{
                duration: 0.75,
                ease: "circInOut",
                delay: 0.5,
              }}
            >
              {marqueeTextList}
            </ParallaxText>

            {/* hero text and NAVBAR */}
            <motion.div
              className={cn("fixed text-[--text-inverse] bg-[--foreground] z-20 items-center px-10", righteous.className)}
              style={{
                translateY: translateYTransform,
                y: yTransform,
                width: widthTransform,
                display: navActive ? "flex" : "block",
              }}
              initial={{
                x: "-100%",
              }}
              animate={{
                x: 0,
                width: initalWidth.current,
              }}
              transition={{
                duration: 0.5,
                delay: 1,
                ease: "anticipate",
              }}
            >
              {navActive && (
                <div className={cn("cursor-pointer w-[20%]", cascadia.className)} onClick={() => setCLIvisible((prev: boolean) => !prev)}>
                  &gt;_
                </div>
              )}

              <motion.div
                style={{
                  textAlign: textAlignmentTransform,
                  fontSize: fontSizeTransform,
                  width: navActive ? "60%" : "100%",
                }}
              >
                nitish.
                {/* <Typewriter trigger={navActive}>
									maindoliya.
								</Typewriter> */}
              </motion.div>

              {navActive && (
                <div className={cn("w-[20%] text-right", cascadia.className)}>
                  <div className="cursor-pointer" onClick={() => setShowNav((prev) => !prev)}>
                    /{route}
                  </div>
                  <Navigation show={showNav} />
                </div>
              )}
            </motion.div>
          </div>
        )}
      </div>

      <About />
    </motion.section>
  );
};
