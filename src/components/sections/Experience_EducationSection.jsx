import { Section } from "./Section";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import usc from "../../assets/company/usc.png";
import infosys from "../../assets/company/infosys.jpg";
import proxel from "../../assets/company/proxel.png";
import puneuni from "../../assets/company/puneuni.png";
import "react-vertical-timeline-component/style.min.css";
import { motion } from "framer-motion";

const experiences = [
  {
    title: "Software Developer",
    company_name: "Health Data AI Lab, University of Southern California",
    icon: usc,
    iconBg: "#FFFFFF",
    date: "Dec 2022 - Present",
    points: [
      "Contributed to collaborative research and development of a cutting-edge data analysis tool, achieving 20% higher accuracy in health data analysis.",
      "Developed REST API-driven backend with Node.js and Express, enhancing data processing efficiency and reducing response time.",
      "Achieved 35% increase in average website engagement by significantly enhancing the intuitive Angular-based frontend, improving accessibility and usability for end-users.",
    ],
  },
  {
    title: "Software Engineer",
    company_name: "Infosys",
    icon: infosys,
    iconBg: "#FFFFFF",
    date: "Nov 2020 - May 2022",
    points: [
      "Developed scalable RESTful APIs using Java's Spring framework for Finacle, a global financial solution used by 150 banks in 76 countries, serving over 800 million active accounts.",
      "Transformed product’s architecture from monolith to microservices, boosting scalability by 40% and enhancing performance by 15%",
      "Implemented geofenced strategies, caching, and optimizations to significantly reduce API response times, enhancing the user experience.",
      "Contributed to DevOps activities, including deploying APIs in a Docker environment, managing Jenkins and Spinnaker pipelines.",
    ],
  },
  {
    title: "Software Engineer Intern",
    company_name: "Proxel Solutions",
    icon: proxel,
    iconBg: "#FFFFFF",
    date: "Oct 2019 - Jan 2020",
    points: [
      "Developed scalable RESTful APIs using Developed centralized Inventory Management System for 35-outlet ice-cream franchise reducing manual management time by 45%.",
      "Led backend development with Node.js, integrated React for faster responses and collaborated with cross-functional teams in requirements gathering, system design, and programming the features.",
      "Utilized Git and Jira for version control, work management, and issue tracking, enhancing team productivity.",
    ],
  },
];

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

const ExperienceCard = ({ experience }) => {
  return (
    <VerticalTimelineElement
      contentStyle={{
        background: "#663399",
        color: "#fff",
      }}
      contentArrowStyle={{ borderRight: "7px solid  #232631" }}
      date={experience.date}
      iconStyle={{ background: experience.iconBg }}
      icon={
        <div className="flex justify-center items-center w-full h-full">
          <img
            src={experience.icon}
            alt={experience.company_name}
            className="w-[80%] h-[80%] object-contain"
          />
        </div>
      }
    >
      <div>
        <h3 className="text-white text-[24px] font-bold">{experience.title}</h3>
        <p
          className="text-secondary text-[16px] font-semibold"
          style={{ margin: 0 }}
        >
          {experience.company_name}
        </p>
      </div>

      <ul className="mt-5 list-disc ml-5 space-y-2">
        {experience.points.map((point, index) => (
          <li
            key={`experience-point-${index}`}
            className="text-white-100 text-[14px] pl-1 tracking-wider"
          >
            {point}
          </li>
        ))}
      </ul>
    </VerticalTimelineElement>
  );
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
        <h3 className="text-white text-[24px] font-bold">{education.degree}</h3>
        <p
          className="text-secondary text-[16px] font-semibold"
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

export const Experience_EducationSection = (props) => {
  const { sectionHeight = 1 } = props;

  return (
    <Section sectionHeight={sectionHeight}>
      <div className="flex flex-col justify-between h-full">
        <div>
          <motion.h2
            variants={textVariant()}
            className="text-3xl md:text-5xl font-bold bg-purple-700 p-2 inline-block rounded text-white sectionHeading"
          >
            Work Experience
          </motion.h2>

          <div className="mt-20 flex flex-col">
            <VerticalTimeline>
              {experiences.map((experience, index) => (
                <ExperienceCard
                  key={`experience-${index}`}
                  experience={experience}
                />
              ))}
            </VerticalTimeline>
          </div>
        </div>

        <div className="mb-20">
          <motion.h2
            variants={textVariant()}
            className="text-3xl md:text-5xl font-bold bg-purple-700 p-2 inline-block rounded text-white sectionHeading"
          >
            Education
          </motion.h2>

          <div className="mt-10 flex flex-col">
            <VerticalTimeline>
              {educations.map((education, index) => (
                <EducationCard
                  key={`education-${index}`}
                  education={education}
                />
              ))}
            </VerticalTimeline>
          </div>
        </div>
      </div>
    </Section>
  );
};
