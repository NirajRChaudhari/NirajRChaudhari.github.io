import { Section } from "./Section";
import { useAtom } from "jotai";
import { currentProjectAtom, projects } from "./Projects";

export const ProjectsSection = () => {
  const [currentProject, setCurrentProject] = useAtom(currentProjectAtom);

  const nextProject = () => {
    setCurrentProject((currentProject + 1) % projects.length);
  };

  const previousProject = () => {
    setCurrentProject((currentProject - 1 + projects.length) % projects.length);
  };

  return (
    <Section>
      <h2 className="text-3xl md:text-5xl font-bold bg-purple-700 p-2 inline-block rounded text-white sectionHeading">
        Projects
      </h2>
      <div className="flex w-full md:w-80 h-full gap-14 items-end mb-10 ml-auto mr-auto justify-center">
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
