import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import usc from "../../assets/company/usc.png";
import puneuni from "../../assets/company/puneuni.png";
import "react-vertical-timeline-component/style.min.css";
import { motion } from "framer-motion";
import { Section } from "./Section";

const educations = [
  {
    degree: "Master's in Computer Science",
    universityName: "University of Southern California",
    icon: usc,
    iconBg: "#FFFFFF",
    date: "Aug 2022 - Apr 2024",
    gpa: "3.9 / 4",
  },
  {
    degree: "Bachelor's in Computer Engineering",
    universityName: "University of Pune",
    icon: puneuni,
    iconBg: "#FFFFFF",
    date: "Jun 2016 - Jun 2020",
    gpa: "9.4 / 10",
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
        <h3 className="text-white text-[15px] md:text-[24px] font-bold">
          {education.degree}
        </h3>
        <p
          className="text-secondary text-[12px] md:text-[16px] font-semibold"
          style={{ margin: 0 }}
        >
          {education.universityName}
        </p>
        <p
          className="text-secondary text-[16px] font-semibold"
          style={{ margin: 0 }}
        >
          {education.gpa}
        </p>
      </div>
    </VerticalTimelineElement>
  );
};

export const EducationSection = () => {
  return (
    <Section fullWidth={true} className="my-auto">
      <motion.h2
        variants={textVariant()}
        className="text-3xl md:text-5xl font-bold bg-purple-700 p-2 ml-6 inline-block rounded text-white sectionHeading mb-20"
      >
        Education
      </motion.h2>

      <VerticalTimeline>
        {educations.map((education, index) => (
          <EducationCard key={`education-${index}`} education={education} />
        ))}
      </VerticalTimeline>
    </Section>
  );
};
