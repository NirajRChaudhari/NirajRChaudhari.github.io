import { AboutSection } from "./sections/AboutSection";
import { SkillsSection } from "./sections/SkillsSection";
import { ProjectsSection } from "./sections/ProjectsSection";
import { ExperienceSection } from "./sections/ExperienceSection";
import { ContactSection } from "./sections/ContactSection";
import { EducationSection } from "./sections/EducationSection";

export const Interface = (props) => {
  const { setSection, isMobile } = props;
  return (
    <div className="flex flex-col items-center w-screen">
      <AboutSection setSection={setSection} />
      <SkillsSection isMobile={isMobile} />
      <ExperienceSection />
      <EducationSection />
      <ProjectsSection isMobile={isMobile} />
      <ContactSection />
    </div>
  );
};
