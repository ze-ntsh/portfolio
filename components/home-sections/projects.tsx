import { Project } from "@/components/home-sections/sub-components/project";
import { ParallaxText } from "../ui/parallax-text";
import { motion, useInView } from "framer-motion";
import { useNavContext } from "../context/nav-context";

import { fileSystem } from "@/lib/file-system";
import { useEffect, useRef } from "react";

export const Projects = () => {
  const { setRoute } = useNavContext();
  const projectsRef = useRef(null);

  const isInMajorView = useInView(projectsRef, {
    amount: 0.4,
  });

  useEffect(() => {
    if (isInMajorView) {
      setRoute("projects");
    }
  }, [isInMajorView, setRoute]);

  return (
    <motion.section className="py-10" ref={projectsRef} data-route="projects">
      <ParallaxText baseVelocity={-4} className="text-[5em]">
        Projects.Projects.Projects.
      </ParallaxText>

      {Object.entries(fileSystem.projects)
        .sort((a, b) => b[1].timespan - a[1].timespan)
        .map(([projectName, project], index) => (
          <Project
            key={index}
            name={projectName}
            description={project.description}
            stack={project.stack}
            images={project.images}
            link={project.link}
            timespan={project.timespan}
          />
        ))}
    </motion.section>
  );
};
