import React, { useState, useEffect } from "react";
import { Section } from "./Section";
import { motion } from "framer-motion";
import { useAtom } from "jotai";
import { CURRENT_SKILL_ATOM } from "../Brain";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import anacondaIcon from "../../../public/icons/anaconda.svg";
import androidIcon from "../../../public/icons/android.svg";
import angularJsIcon from "../../../public/icons/angularjs.svg";
import bootstrapIcon from "../../../public/icons/bootstrap.svg";
import cIcon from "../../../public/icons/c.svg";
import cPlusIcon from "../../../public/icons/cplusplus.svg";
import cssIcon from "../../../public/icons/css3.svg";
import djangoIcon from "../../../public/icons/django.svg";
import dockerIcon from "../../../public/icons/docker.svg";
import expressIcon from "../../../public/icons/express.svg";
import firebaseIcon from "../../../public/icons/firebase.svg";
import gitIcon from "../../../public/icons/git.svg";
import googlecloudIcon from "../../../public/icons/googlecloud.svg";
import htmlIcon from "../../../public/icons/html5.svg";
import javaIcon from "../../../public/icons/java.svg";
import javaScriptIcon from "../../../public/icons/javascript.svg";
import jenkinsIcon from "../../../public/icons/jenkins.svg";
import jqueryIcon from "../../../public/icons/jquery.svg";
import kubernetesIcon from "../../../public/icons/kubernetes.svg";
import mongodbIcon from "../../../public/icons/mongodb.svg";
import mysqlIcon from "../../../public/icons/mysql.svg";
import nodejsIcon from "../../../public/icons/nodejs.svg";
import opencvIcon from "../../../public/icons/opencv.svg";
import postgresqlIcon from "../../../public/icons/postgresql.svg";
import pythonIcon from "../../../public/icons/python.svg";
import reactIcon from "../../../public/icons/react.svg";
import redisIcon from "../../../public/icons/redis.svg";
import springIcon from "../../../public/icons/spring.svg";
import threejsIcon from "../../../public/icons/threejs.svg";
import typescriptIcon from "../../../public/icons/typescript.svg";
import unityIcon from "../../../public/icons/unity.svg";
import vscodeIcon from "../../../public/icons/vscode.svg";

const skills = [
  {
    title: "Languages",
    technologies: [
      {
        title: "Java",
        level: 90,
        icon: javaIcon,
      },
      {
        title: "Python",
        level: 90,
        icon: pythonIcon,
      },
      {
        title: "C",
        level: 90,
        icon: cIcon,
      },
      {
        title: "JavaScript",
        level: 90,
        icon: javaScriptIcon,
      },
      {
        title: " C++",
        level: 90,
        icon: cPlusIcon,
      },
      {
        title: "TypeScript",
        level: 90,
        icon: typescriptIcon,
      },
    ],
  },
  {
    title: "Backend Frameworks",
    technologies: [
      {
        title: "Spring Boot",
        level: 90,
        icon: springIcon,
      },
      {
        title: "Node.js",
        level: 100,
        icon: nodejsIcon,
      },
      {
        title: "Django",
        level: 100,
        icon: djangoIcon,
      },
      {
        title: "Express",
        level: 90,
        icon: expressIcon,
      },
    ],
  },
  {
    title: "Frontend Technologies",
    technologies: [
      {
        title: "HTML",
        level: 80,
        icon: htmlIcon,
      },
      {
        title: "React",
        level: 80,
        icon: reactIcon,
      },
      {
        title: "CSS",
        level: 85,
        icon: cssIcon,
      },
      {
        title: "Angular",
        level: 85,
        icon: angularJsIcon,
      },
    ],
  },
  {
    title: "Databases",
    technologies: [
      {
        title: "MySQL",
        level: 90,
        icon: mysqlIcon,
      },
      {
        title: "MongoDB",
        level: 55,
        icon: mongodbIcon,
      },
      {
        title: "Firebase",
        level: 55,
        icon: firebaseIcon,
      },
      {
        title: "Redis",
        level: 55,
        icon: redisIcon,
      },
      {
        title: "Postgres",
        level: 55,
        icon: postgresqlIcon,
      },
    ],
  },
];

export const SkillsSection = (props) => {
  const { isMobile = false } = props;
  const numSkillsInRow = isMobile ? 3 : 3;
  const [currentSkillAtom, setCurrentSkillAtom] = useAtom(CURRENT_SKILL_ATOM);
  const [currentSkill, setCurrentSkill] = useState(skills[0]);

  const handleCarouselChange = (index) => {
    setCurrentSkillAtom(index);
    setCurrentSkill(skills[index]);
  };

  const handlePrevious = () => {
    const previousIndex =
      (currentSkillAtom - 1 + skills.length) % skills.length;
    setCurrentSkillAtom(previousIndex);
    setCurrentSkill(skills[previousIndex]);
  };

  const handleNext = () => {
    const nextIndex = (currentSkillAtom + 1) % skills.length;
    setCurrentSkillAtom(nextIndex);
    setCurrentSkill(skills[nextIndex]);
  };

  return (
    <Section
      addClasses="skills-section"
      className={`${isMobile ? "h-[60vh]" : ""}`}
    >
      <h2 className="text-3xl md:text-5xl font-bold bg-purple-700 p-2 rounded text-white sectionHeading w-fit">
        Skills
      </h2>

      <Carousel
        showThumbs={true}
        showStatus={false}
        infiniteLoop
        autoPlay
        interval={4000}
        className={`skill-content w-full ${
          isMobile ? "" : "md:w-[45%]"
        } mt-5 md:mt-10`}
        onChange={handleCarouselChange}
        onClickItem={handleCarouselChange}
        onClickThumb={handleCarouselChange}
        renderArrowPrev={(onClickHandler, hasPrev) =>
          hasPrev && (
            <button
              onClick={handlePrevious}
              className="carousel-arrow-prev"
              title="Previous"
            >
              <span className="carousel-arrow-icon">Previous</span>
            </button>
          )
        }
        renderArrowNext={(onClickHandler, hasNext) =>
          hasNext && (
            <button
              onClick={handleNext}
              className="carousel-arrow-next"
              title="Next"
            >
              <span className="carousel-arrow-icon">Next</span>
            </button>
          )
        }
      >
        {skills.map((currentSkill, index) => (
          <motion.div key={index + "" + currentSkill.title}>
            <h4 className="text-lg md:text-xl font-bold bg-purple-700 p-2 rounded text-white text-center w-fit mx-auto">
              {currentSkill.title}
            </h4>

            <div
              className="my-auto"
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              {currentSkill.technologies.map((technology, index) => (
                <motion.div
                  key={index + "" + technology.title}
                  className="skill"
                  style={{
                    flexBasis: `calc(100% / ${numSkillsInRow})`,
                    flexGrow: "1",
                    flexShrink: "1",
                    width: "0",
                    padding: isMobile ? "0.1rem" : "1rem",
                    marginBottom: isMobile ? "0.1rem" : "1rem",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    border: "1px solid white",
                  }}
                >
                  <img
                    alt={technology.title}
                    src={technology.icon}
                    className="w-full h-auto object-contain"
                    style={{
                      width: "70%",
                      height: "auto",
                    }}
                  />
                  <span className=" text-purple-50 font-normal text-base md:font-bold text-center mt-0 md:mt-2">
                    {technology.title}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </Carousel>
    </Section>
  );
};
