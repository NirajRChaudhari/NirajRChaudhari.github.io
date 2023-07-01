import React, { useState, useEffect } from "react";
import { Section } from "./Section";
import { motion } from "framer-motion";
import { useAtom } from "jotai";
import { CURRENT_SKILL_ATOM } from "../Brain";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import androidIcon from "../../../public/icons/android.svg";
import angularJsIcon from "../../../public/icons/angularjs.svg";
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

const skills = [
  {
    title: "Languages",
    technologies: [
      {
        title: "C",
        icon: cIcon,
      },
      {
        title: "Java",
        icon: javaIcon,
      },
      {
        title: "Python",
        icon: pythonIcon,
      },
      {
        title: " C++",
        icon: cPlusIcon,
      },
      {
        title: "JavaScript",
        icon: javaScriptIcon,
      },
      {
        title: "TypeScript",
        icon: typescriptIcon,
      },
    ],
  },
  {
    title: "Backend Frameworks",
    technologies: [
      {
        title: "Express",
        icon: expressIcon,
      },
      {
        title: "Spring Boot",
        icon: springIcon,
      },
      {
        title: "Node.js",
        icon: nodejsIcon,
      },
      {
        title: "Django",
        icon: djangoIcon,
      },
      {
        title: "Android",
        icon: androidIcon,
      },
    ],
  },
  {
    title: "Frontend Technologies",
    technologies: [
      {
        title: "HTML",
        icon: htmlIcon,
      },
      {
        title: "React",
        icon: reactIcon,
      },
      {
        title: "CSS",
        icon: cssIcon,
      },
      {
        title: "Three.js",
        icon: threejsIcon,
      },
      {
        title: "jQuery",
        icon: jqueryIcon,
      },
      {
        title: "Angular",
        icon: angularJsIcon,
      },
    ],
  },
  {
    title: "Databases",
    technologies: [
      {
        title: "Redis",
        icon: redisIcon,
      },
      {
        title: "MySQL",
        icon: mysqlIcon,
      },
      {
        title: "MongoDB",
        icon: mongodbIcon,
      },
      {
        title: "Firebase",
        icon: firebaseIcon,
      },
      {
        title: "Postgres",
        icon: postgresqlIcon,
      },
    ],
  },
  {
    title: "Tools & Technologies",
    technologies: [
      {
        title: "Unity",
        icon: unityIcon,
      },
      {
        title: "Google Cloud",
        icon: googlecloudIcon,
      },
      {
        title: "Docker",
        icon: dockerIcon,
      },
      {
        title: "Jenkins",
        icon: jenkinsIcon,
      },
      {
        title: "Git",
        icon: gitIcon,
      },
      {
        title: "OpenCV",
        icon: opencvIcon,
      },
    ],
  },
];

export const SkillsSection = (props) => {
  const { section, isMobile = false } = props;
  const numSkillsInRow = isMobile ? 3 : 3;
  const [currentSkillAtom, setCurrentSkillAtom] = useAtom(CURRENT_SKILL_ATOM);
  const [currentSkill, setCurrentSkill] = useState(skills[0]);

  const handleCarouselChange = (index) => {
    setCurrentSkillAtom(index);
    setCurrentSkill(skills[index]);
  };

  console.log("isMobile " + isMobile);
  return (
    <Section
      addClasses="skills-section"
      className={`${isMobile ? "h-[60vh]" : ""}`}
    >
      $
      {section === 1 && (
        <>
          <h2 className="text-2xl md:text-5xl font-bold bg-purple-700 p-2 rounded text-white sectionHeading w-fit mt-4">
            What's in my Mind ?
          </h2>
          <div
            className={`${isMobile ? "" : "my-auto flex flex-col"}`}
            style={
              isMobile
                ? {}
                : {
                    height: "80%",
                    justifyContent: "center",
                  }
            }
          >
            <Carousel
              showThumbs={false}
              showStatus={false}
              stopOnHover={false}
              showIndicators={!isMobile}
              infiniteLoop
              autoPlay
              interval={4000}
              className={`skill-content w-full  ${
                isMobile ? "" : "md:w-[45%]"
              } mt-5 md:mt-10`}
              onChange={handleCarouselChange}
              onClickItem={handleCarouselChange}
              onClickThumb={handleCarouselChange}
            >
              {skills.map((currentSkill, index) => (
                <motion.div key={index + "" + currentSkill.title}>
                  <h4 className="text-lg md:text-xl font-bold bg-purple-700 p-2 rounded text-white text-center w-fit mx-auto">
                    {currentSkill.title}
                  </h4>

                  <div
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
                          // border: "1px solid white",
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
                        <span className="text-purple-50 font-normal text-base md:font-bold text-center mt-0 md:mt-2">
                          {technology.title}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </Carousel>
          </div>
        </>
      )}
    </Section>
  );
};
