import { motion } from "framer-motion";

export const Section = (props) => {
  const {
    children,
    mobileTop,
    sectionHeight = 1,
    fullWidth = false,
    addClasses = "",
    justifyContent = "justify-center",
  } = props;

  return (
    <motion.section
      className={`
        ${addClasses}
        
        ${
          sectionHeight === 1
            ? "h-screen"
            : "h-[" + sectionHeight * 100 + "vh] justify-start"
        }

        ${fullWidth ? "p-2" : "p-8"}

        ${mobileTop ? "justify-start md:justify-center" : justifyContent}

        w-screen max-w-screen-2xl mx-auto
        flex-grow-0
        overflow-scroll
      `}
      style={{ border: "2px solid red", overflow: "scroll" }}
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
