import { AboutSection } from "./sections/AboutSection";
import { SkillsSection } from "./sections/SkillsSection";
import { ProjectsSection } from "./sections/ProjectsSection";
import { ExperienceSection } from "./sections/ExperienceSection";
import { ContactSection } from "./sections/ContactSection";
import { Section } from "./sections/Section";

export const Interface = (props) => {
  const { setSection } = props;
  return (
    <div className="flex flex-col items-center w-screen">
      <AboutSection setSection={setSection} />
      <SkillsSection />
      <ExperienceSection isDoubleHeight={true} />
      <ProjectsSection />
      <ContactSection />
    </div>
  );
};
