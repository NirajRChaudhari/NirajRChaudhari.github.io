import React, { useState, useEffect } from "react";
import { Section } from "./Section";
import { motion } from "framer-motion";
import { useAtom } from "jotai";
import { currentSkillAtom } from "../Brain";

const skills = [
  {
    index: 0,
    title: "Backend Technologies",
    technologies: [
      {
        title: "JavaScript",
        level: 90,
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
      },
      {
        title: "Java",
        level: 100,
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
      },
      {
        title: "Python",
        level: 100,
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
      },
      {
        title: "C++",
        level: 90,
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
      },
    ],
  },
  {
    index: 1,
    title: "Frontend Technologies",
    technologies: [
      {
        title: "React",
        level: 80,
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
      },
      {
        title: "CSS",
        level: 85,
        icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original.svg",
      },
    ],
  },
  {
    index: 2,
    title: "Frameworks",
    technologies: [
      {
        title: "TypeScript",
        level: 90,
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
      },
      {
        title: "HTML",
        level: 55,
        icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original.svg",
      },
    ],
  },
];

export const SkillsSection = (props) => {
  const { isMobile = false } = props;
  const numSkillsInRow = isMobile ? 4 : 3;
  const [currentSkill, setCurrentSkill] = useAtom(currentSkillAtom);
  const [currentSkills, setCurrentSkills] = useState(skills[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentSkill + 1) % skills.length;
      setCurrentSkill(nextIndex);
      setCurrentSkills(skills[nextIndex]);
    }, 4000);

    return () => {
      clearInterval(interval);
    };
  }, [currentSkill, setCurrentSkill]);

  return (
    <Section
      addClasses="skills-section"
      className={`${isMobile ? "h-[60vh]" : ""}`}
    >
      <h2 className="text-3xl md:text-5xl font-bold bg-purple-700 p-2 rounded text-white sectionHeading w-fit">
        Skills
      </h2>
      <motion.div
        className={`skill-content w-full ${
          isMobile ? "" : "md:w-[45%]"
        } mt-5 md:mt-10`}
        whileInView="visible"
      >
        <h4 className="text-lg md:text-xl font-bold bg-purple-700 p-2 rounded text-white text-center w-fit mx-auto">
          {currentSkills.title}
        </h4>

        <div
          className="my-auto"
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {currentSkills.technologies.map((skill, index) => (
            <motion.div
              key={index}
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
              }}
              initial={{
                opacity: 0,
              }}
              variants={{
                visible: {
                  opacity: 1,
                  transition: {
                    duration: 1,
                    delay: 1 + index * 0.2,
                  },
                },
              }}
            >
              <img
                alt={skill.title}
                src={skill.icon}
                className="w-full h-auto object-contain"
                style={{
                  width: "100%",
                  height: "auto",
                }}
              />
              <span className=" text-white font-medium text-base md:font-bold text-center mt-0 md:mt-2">
                {skill.title}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </Section>
  );
};

// export const SkillsSection = (props) => {
//   const { isMobile = false } = props;
//   const numSkillsInRow = isMobile ? 4 : 3;

//   const [currentSkill, setCurrentSkill] = useAtom(currentSkillAtom);

//   return (
//     <Section
//       addClasses="skills-section"
//       className={`${isMobile ? "h-[60vh]" : ""}`}
//     >
//       <h2 className="text-3xl md:text-5xl font-bold bg-purple-700 p-2 rounded text-white sectionHeading w-fit">
//         Skills
//       </h2>
//       <motion.div
//         className={`skill-content w-full ${isMobile ? "" : "md:w-[45%]"} mt-5 md:mt-10`}
//         whileInView={"visible"}
//         // style={{ border: "1px solid red" }}
//       >
//         <h4
//           className={`text-lg md:text-xl font-bold bg-purple-700 p-2 rounded text-white text-center w-fit mx-auto`}
//         >
//           {skills[0].title}
//         </h4>

//         <div
//           className="my-auto"
//           style={{
//             display: "flex",
//             flexWrap: "wrap",
//             justifyContent: "center",
//           }}
//         >
//           {skills[0].technologies.map((skill, index) => (
//             <motion.div
//               key={index}
//               className="skill"
//               style={{
//                 flexBasis: `calc(100% / ${numSkillsInRow})`,
//                 // flex: `1 1 0`,
//                 flexGrow: "1",
//                 flexShrink: "1",
//                 width: "0",
//                 padding: isMobile ? "0.1rem" : "1rem",
//                 marginBottom: isMobile ? "0.1rem" : "1rem",
//                 // border: "1px solid #fff",
//                 display: "flex",
//                 flexDirection: "column",
//                 alignItems: "center",
//               }}
//               initial={{
//                 opacity: 0,
//               }}
//               variants={{
//                 visible: {
//                   opacity: 1,
//                   transition: {
//                     duration: 1,
//                     delay: 1 + index * 0.2,
//                   },
//                 },
//               }}
//             >
//               <img
//                 alt={skill.title}
//                 src={skill.icon}
//                 className="w-full h-auto object-contain"
//                 style={{
//                   width: "100%",
//                   height: "auto",
//                 }}
//               />
//               <span className=" text-white font-medium text-base md:font-bold text-center mt-0 md:mt-2">
//                 {skill.title}
//               </span>
//             </motion.div>
//           ))}
//         </div>
//       </motion.div>
//     </Section>
//   );
// };
