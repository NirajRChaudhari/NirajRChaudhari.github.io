import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import usc from "../../assets/logo/usc.png";
import puneuni from "../../assets/logo/puneuni.png";
import "react-vertical-timeline-component/style.min.css";
import { motion, AnimatePresence } from "framer-motion";
import { Section } from "./Section";

const educations = [
  {
    degree: "Master's in Computer Science",
    universityName: "University of Southern California",
    icon: usc,
    iconBg: "#FFFFFF",
    date: "Aug 2022 - Apr 2024",
    gpa: "GPA :  3.95 / 4",
    transcriptLink:
      "https://drive.google.com/file/d/11o3gMahTKPwHmUZthwbwQ3iC4g6hnWvP/view?usp=sharing",
  },
  {
    degree: "Bachelor's in Computer Engineering",
    universityName: "University of Pune",
    icon: puneuni,
    iconBg: "#FFFFFF",
    date: "Jun 2016 - Jun 2020",
    gpa: "GPA :  9.4 / 10",
    transcriptLink:
      "https://drive.google.com/file/d/1qI_myU_bNIGfezo_DxOphC-NKs3lN1Sd/view?usp=sharing",
  },
];

const textVariant = (delay) => {
  return {
    hidden: {
      y: -50,
      opacity: 0,
    },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        duration: 1.25,
        delay: delay,
      },
    },
  };
};

const EducationCard = ({ education }) => {
  return (
    <VerticalTimelineElement
      contentStyle={{
        background: "#663399",
        color: "#fff",
      }}
      contentArrowStyle={{ borderRight: "7px solid  #232631" }}
      date={education.date}
      iconStyle={{ background: education.iconBg }}
      icon={
        <div className="flex justify-center items-center w-full h-full">
          <img
            src={education.icon}
            alt={education.company_name}
            className="w-[80%] h-[80%] object-contain"
          />
        </div>
      }
    >
      <div>
        <h3 className="text-white text-[18px] md:text-[24px] font-bold">
          {education.degree}
        </h3>
        <p className="text-[18px] font-semibold" style={{ margin: 0 }}>
          {education.universityName}
        </p>
        <p className="text-[18px] md:text-[20px] font-semibold mt-2">
          {education.gpa}
        </p>
        <a
          className="view-transcript-link text-slate-200 text-[14px] font-normal"
          href={education.transcriptLink}
          target="_blank"
          rel="noreferrer"
          style={{
            cursor: "pointer",
          }}
        >
          View Transcript
        </a>
      </div>
    </VerticalTimelineElement>
  );
};

export const EducationSection = (props) => {
  const { section } = props;

  return (
    <Section fullWidth={true} addClasses="education-section">
      <div className="flex flex-col">
        <motion.h2
          variants={textVariant()}
          className="text-2xl md:text-5xl font-bold bg-purple-700 p-2 ml-6 inline-block rounded text-white sectionHeading mb-5 md:mb-20 mt-6 w-fit"
        >
          Education
        </motion.h2>

        <AnimatePresence>
          {section == 3 && (
            <motion.div
              className="my-auto flex flex-col"
              style={{
                height: "60%",
                justifyContent: "center",
              }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 3 }}
            >
              <VerticalTimeline>
                {educations.map((education, index) => (
                  <EducationCard
                    key={`education-${index}`}
                    education={education}
                  />
                ))}
              </VerticalTimeline>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Section>
  );
};
