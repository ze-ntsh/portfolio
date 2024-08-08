import Project from "@/components/project";
import ParallaxText from "../parallax-text";

const Projects = () => {    
    return(
        <section>
            <ParallaxText baseVelocity={-4} className='py-5 text-[5em]'>
                Projects.Projects.Projects.
            </ParallaxText>
            <Project />
            <Project />
            <Project />
        </section>
    )
};

export default Projects;