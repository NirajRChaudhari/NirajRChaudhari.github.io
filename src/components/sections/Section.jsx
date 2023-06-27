import { motion } from "framer-motion";

export const Section = (props) => {
  const { children, mobileTop, sectionHeight = 1 } = props;

  return (
    <motion.section
      className={`
        h-screen
        ${sectionHeight == 3 ? "h-[300vh]" : ""}
       
        w-screen p-8 max-w-screen-2xl mx-auto
        flex flex-col items-start
        ${
          sectionHeight != 1
            ? "justify-start"
            : mobileTop
            ? "justify-start md:justify-center"
            : "justify-center"
        }
      `}
      style={{ border: "2px solid red" }}
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
