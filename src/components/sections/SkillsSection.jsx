import { Section } from "./Section";
import { motion } from "framer-motion";
import "./CommonStyle.css";

const skills = [
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
];
const languages = [
  {
    title: "🇺🇸 English",
    level: 100,
  },
  {
    title: "🇮🇳 Hindi",
    level: 90,
  },
];

export const SkillsSection = (props) => {
  const { isMobile = false } = props;
  const numSkillsInRow = isMobile ? 4 : 3;

  return (
    <Section
      addClasses="skills-section"
      className={`${isMobile ? "h-[60vh]" : ""}`}
    >
      <h2 className="text-3xl md:text-5xl font-bold bg-purple-700 p-2 rounded text-white sectionHeading w-fit">
        Skills
      </h2>
      <motion.div
        className={`w-full ${isMobile ? "" : "md:w-[45%]"} mt-5 md:mt-10`}
        whileInView={"visible"}
        // style={{ border: "1px solid red" }}
      >
        <h4
          className={`text-lg md:text-xl font-bold bg-purple-700 p-2 rounded text-white text-center w-fit mx-auto`}
        >
          Backend Technologies
        </h4>

        <div
          className="my-auto"
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              className="skill"
              style={{
                flexBasis: `calc(100% / ${numSkillsInRow})`,
                // flex: `1 1 0`,
                flexGrow: "1",
                flexShrink: "1",
                width: "0",
                padding: isMobile ? "0.1rem" : "1rem",
                marginBottom: isMobile ? "0.1rem" : "1rem",
                // border: "1px solid #fff",
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

{
  /* <div className="skills-section ">
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                className="skill"
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
                <img alt="HTML" src={skill.icon} />
                <h5>{skill.title}</h5>
              </motion.div>
            ))}
          </div> */
}

{
  /* <div>
            <h2 className="text-3xl md:text-5xl font-bold mt-10 text-white">
              Languages
            </h2>
            <div className="mt-8 space-y-4">
              {languages.map((lng, index) => (
                <div className="w-full md:w-64" key={index}>
                  <motion.h3
                    className="text-lg md:text-xl font-bold text-gray-100"
                    initial={{
                      opacity: 0,
                    }}
                    variants={{
                      visible: {
                        opacity: 1,
                        transition: {
                          duration: 1,
                          delay: 2 + index * 0.2,
                        },
                      },
                    }}
                  >
                    {lng.title}
                  </motion.h3>
                  <div className="h-2 w-full bg-gray-200 rounded-full mt-2">
                    <motion.div
                      className="h-full bg-indigo-500 rounded-full "
                      style={{ width: `${lng.level}%` }}
                      initial={{
                        scaleX: 0,
                        originX: 0,
                      }}
                      variants={{
                        visible: {
                          scaleX: 1,
                          transition: {
                            duration: 1,
                            delay: 2 + index * 0.2,
                          },
                        },
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div> */
}
