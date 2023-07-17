import { AboutSection } from "./sections/AboutSection";
import { SkillsSection } from "./sections/SkillsSection";
import { ProjectsSection } from "./sections/ProjectsSection";
import { ExperienceSection } from "./sections/ExperienceSection";
import { ContactSection } from "./sections/ContactSection";
import { EducationSection } from "./sections/EducationSection";

export const Interface = (props) => {
  const { section, setSection, isMobile } = props;
  return (
    <div className="flex flex-col items-center w-screen">
      <AboutSection
        section={section}
        setSection={setSection}
        isMobile={isMobile}
      />
      <SkillsSection section={section} isMobile={isMobile} />
      <ExperienceSection section={section} />
      <EducationSection section={section} />
      <ProjectsSection section={section} isMobile={isMobile} />
      <ContactSection section={section} isMobile={isMobile} />
    </div>
  );
};
