import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import usc from "../../assets/logo/usc.png";
import infosys from "../../assets/logo/infosys.jpg";
import proxel from "../../assets/logo/proxel.png";
import "react-vertical-timeline-component/style.min.css";
import { motion, AnimatePresence } from "framer-motion";
import { Section } from "./Section";
import { useState } from "react";

const experiences = [
  {
    title: "Software Developer",
    company_name: "Health Data AI Lab, University of Southern California",
    icon: usc,
    iconBg: "#FFFFFF",
    date: "Dec 2022 - Present",
    laptopPoints: [
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
    laptopPoints: [
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
    laptopPoints: [
      "Developed scalable RESTful APIs using Developed centralized Inventory Management System for 35-outlet ice-cream franchise reducing manual management time by 45%.",
      "Led backend development with Node.js, integrated React for faster responses and collaborated with cross-functional teams in requirements gathering, system design, and programming the features.",
      "Utilized Git and Jira for version control, work management, and issue tracking, enhancing team productivity.",
    ],
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

const ExperienceCard = ({ experience, isMobile }) => {
  const [showAll, setShowAll] = useState(false);

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

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
        {experience.laptopPoints.map((point, index) => (
          <li
            key={`experience-point-${index}`}
            className={`text-white-100 text-[14px] pl-1 tracking-wider ${
              !showAll && isMobile && index > 1 ? "hidden" : ""
            }`}
          >
            {point}
          </li>
        ))}

        {isMobile && experience.laptopPoints.length > 2 && (
          <button
            onClick={toggleShowAll}
            className="text-[15px] text-orange-100 mt-2 underline"
          >
            {showAll ? "Read Less" : "Read More"}
          </button>
        )}
      </ul>
    </VerticalTimelineElement>
  );
};

export const ExperienceSection = (props) => {
  const { section, isMobile } = props;

  return (
    <Section
      fullWidth={true}
      allowOverflow={true}
      addClasses="experience-section hideScrollBar"
    >
      <motion.h2
        variants={textVariant()}
        className="text-2xl md:text-5xl font-bold bg-purple-700 p-2 ml-6 mt-2 inline-block rounded text-white sectionHeading mt-4"
      >
        Work Experience
      </motion.h2>

      <AnimatePresence>
        {section == 2 && (
          <motion.div
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 3 }}
          >
            <VerticalTimeline>
              {experiences.map((experience, index) => (
                <ExperienceCard
                  key={`experience-${index}`}
                  experience={experience}
                  isMobile={isMobile}
                />
              ))}
            </VerticalTimeline>
            <div className="h-10"></div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
};
