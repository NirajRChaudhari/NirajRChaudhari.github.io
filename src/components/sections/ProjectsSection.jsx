import { Section } from "./Section";
import { useAtom } from "jotai";
import { currentProjectAtom, projects } from "./Projects";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";

export const ProjectsSection = (props) => {
  const { section, isMobile } = props;
  const [currentProject, setCurrentProject] = useAtom(currentProjectAtom);

  const nextProject = () => {
    setCurrentProject((currentProject + 1) % projects.length);
  };

  const previousProject = () => {
    setCurrentProject((currentProject - 1 + projects.length) % projects.length);
  };

  return (
    <Section addClasses="projects-section">
      <AnimatePresence>
        {section == 4 && (
          <motion.div
            className="flex flex-col w-full h-full justify-between"
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 3 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold bg-purple-700 p-2 rounded text-white sectionHeading w-fit mt-4">
              Projects
            </h2>
            <div className="flex w-full gap-14 pb-11 md:pb-3 justify-center">
              <button
                className={`bg-purple-500 hover:bg-purple-700 text-white transition-colors py-1 px-3 rounded-lg font-bold text-lg mt-4 md:mt-16`}
                onClick={previousProject}
              >
                ← Previous
              </button>

              <button
                className={`bg-purple-500 hover:bg-purple-700 text-white transition-colors py-1 px-3 rounded-lg font-bold text-lg mt-4 md:mt-16`}
                onClick={nextProject}
              >
                Next →
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
};
