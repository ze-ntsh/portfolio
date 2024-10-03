import { Project } from "@/components/project";
import { ParallaxText } from "../parallax-text";
import { motion } from 'framer-motion';
import { useNavContext } from "../context/nav-context";

import { fileSystem } from "@/lib/file-system";

export const Projects = () => {
  const { setRoute } = useNavContext();

  return (
    <motion.section className='py-10 snap'
    >
      <ParallaxText baseVelocity={-4} className='text-[5em]'>
        Projects.Projects.Projects.
      </ParallaxText>

      {
        Object.entries(fileSystem.projects).sort((a, b) => b[1].timespan - a[1].timespan).map(([projectName, project], index) => (
          <Project
            key={index}
            name={projectName}
            description={project.description}
            stack={project.stack}
            images={project.images}
            link={project.link}
            timespan={project.timespan}
          />
        ))
      }

    </motion.section>
  )
};