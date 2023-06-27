import { motion } from "framer-motion";

export const Section = (props) => {
  const { children, mobileTop, sectionHeight = 1, fullWidth = false } = props;

  return (
    <motion.section
      className={`
        h-screen
        w-screen max-w-screen-2xl mx-auto
        ${fullWidth ? "p-2" : "p-8"}
        flex flex-col items-start
        ${
          sectionHeight != 1
            ? "justify-start"
            : mobileTop
            ? "justify-start md:justify-center"
            : "justify-center"
        }
        overflow-scroll
      `}
      // style={{ border: "2px solid red" }}
      initial={{
        opacity: 0,
        y: 50,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: {
          duration: 1,
          delay: 0.6,
        },
      }}
    >
      {children}
    </motion.section>
  );
};

export const DoubleSection = (props) => {
  const { children, mobileTop, sectionHeight = 1, fullWidth = false } = props;

  return (
    <motion.section
      className={`
        h-[200vh]
        w-screen 
        ${fullWidth ? "p-2" : "p-8"}
        max-w-screen-2xl mx-auto
        flex flex-col items-start
        justify-start
        overflow-scroll
      `}
      // style={{ border: "2px solid red" }}
      initial={{
        opacity: 0,
        y: 50,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: {
          duration: 1,
          delay: 0.6,
        },
      }}
    >
      {children}
    </motion.section>
  );
};
