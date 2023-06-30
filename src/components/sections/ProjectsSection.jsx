import { Section } from "./Section";
import { useAtom } from "jotai";
import { currentProjectAtom, projects } from "./Projects";

import { useState, useRef, useEffect } from "react";

export const ProjectsSection = (props) => {
  const { isMobile } = props;
  const [currentProject, setCurrentProject] = useAtom(currentProjectAtom);
  const [marginTop, setMarginTop] = useState(0);
  const childRef = useRef(null);

  useEffect(() => {
    if (childRef.current) {
      const parentHeight = childRef.current.parentElement.offsetHeight;
      const previousSiblingHeight =
        childRef.current.previousElementSibling.offsetHeight;

      const marginValue =
        (parentHeight - previousSiblingHeight) * (isMobile ? 0.75 : 0.7);

      setMarginTop(marginValue);
    }
  }, []);

  const nextProject = () => {
    setCurrentProject((currentProject + 1) % projects.length);
  };

  const previousProject = () => {
    setCurrentProject((currentProject - 1 + projects.length) % projects.length);
  };

  return (
    <Section addClasses="projects-section">
      <h2 className="text-3xl md:text-5xl font-bold bg-purple-700 p-2 rounded text-white sectionHeading w-fit">
        Projects
      </h2>
      <div
        ref={childRef}
        className="flex w-full md:w-80 gap-14 mx-auto justify-center"
        style={{ marginTop: `${marginTop}px` }}
      >
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
    </Section>
  );
};
