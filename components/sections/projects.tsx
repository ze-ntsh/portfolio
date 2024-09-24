import { Project } from "@/components/project";
import { ParallaxText } from "../parallax-text";
import {motion} from 'framer-motion';
import { useNavContext } from "../context/nav-context";

export const Projects = () => {
    const { setRoute } = useNavContext();

    return (
        <motion.section className='py-10 snap'
        >
            <ParallaxText baseVelocity={-4} className='text-[5em]'>
                Projects.Projects.Projects.
            </ParallaxText>
            <Project />
            <Project />
            <Project />
        </motion.section>
    )
};