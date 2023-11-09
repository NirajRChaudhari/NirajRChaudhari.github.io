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
      "Developed and deployed backend REST APIs using Node.js, streamlining data processing and reducing response latency by 18%",
      "Integrated a GBM machine learning model to significantly boost data analysis accuracy on a PostgreSQL healthcare database.",
      "Enhanced Angular-based frontend, resulting in a 26% increase in average user engagement through improved accessibility.",
      "Orchestrated deployment to Google Cloud and integrated Prometheus and Grafana to monitor and visualize critical parameters.",
    ],
  },
  {
    title: "Software Engineer",
    company_name: "Infosys",
    icon: infosys,
    iconBg: "#FFFFFF",
    date: "Nov 2020 - May 2022",
    laptopPoints: [
      "Built scalable Java Spring Boot RESTful APIs for Finacle, a global fintech product used by almost 150 banks across 76 countries.",
      "Transformed from a monolith to microservices architecture, scaling peak load capacity by 24% and cutting response times by 15%",
      "Engaged in DevOps activities, such as deploying services in Docker environment, and overseeing Jenkins and Spinnaker pipelines.",
      "Crafted detailed design documentation on Confluence and automated testing processes to achieve faster release cycles.",
    ],
  },
  {
    title: "Software Engineer Intern",
    company_name: "Proxel Solutions",
    icon: proxel,
    iconBg: "#FFFFFF",
    date: "Oct 2019 - Jan 2020",
    laptopPoints: [
      "Developed centralized Inventory Management and Analytics System for 50+ outlet franchise, reduced manual processing by 35%",
      "Contributed to development of user-friendly ReactJS frontend and actively participated in building the Node.js backend for platform.",
      "Designed MySQL database schema, enforced transactional integrity, and optimized performance for faster data retrieval.",
      "Utilized Git for version control, CI automation, and Jira for work management and issue tracking, bolstering team productivity.",
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

  const handleItemClick = () => {
    if (isMobile) {
      setShowAll(!showAll);
    }
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
      <div onClick={handleItemClick}>
        <h3 className="text-white text-[19px] md:text-[24px] font-bold">
          {experience.title}
        </h3>
        <p className="text-[18px] font-semibold" style={{ margin: 0 }}>
          {experience.company_name}
        </p>

        <ul className="mt-5 list-disc ml-1 md:ml-5 space-y-2">
          {experience.laptopPoints.map((point, index) => (
            <li
              key={`experience-point-${index}`}
              className={`text-white-100 text-[14px] md:pl-1 mb-3 tracking-wider ${
                !showAll && isMobile && index > 1 ? "hidden" : ""
              }`}
            >
              <div className="text-justify">{point}</div>
            </li>
          ))}

          {isMobile && (
            <button className="text-[15px] text-orange-100 mt-2 underline">
              {showAll ? "Read Less" : "Read More"}
            </button>
          )}
        </ul>
      </div>
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
      <div className="flex flex-col">
        <motion.h2
          variants={textVariant()}
          className="text-2xl md:text-5xl font-bold bg-purple-700 p-2 ml-6 inline-block rounded text-white sectionHeading mb-5 md:mb-20 mt-6 w-fit"
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
      </div>
    </Section>
  );
};
