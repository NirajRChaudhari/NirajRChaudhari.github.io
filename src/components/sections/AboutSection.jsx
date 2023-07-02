import { Section } from "./Section";
import { motion, AnimatePresence } from "framer-motion";
import { ProfileKeywords } from "./ProfileKeywords";
import "./CommonStyle.css";

export const AboutSection = (props) => {
  const { section, setSection } = props;
  return (
    <Section mobileTop addClasses="about-section">
      {/* <h4 className="text-md font-bold bg-red-600 p-2 rounded text-white sectionHeading w-fit mx-auto">
        Website is still under development. Projects not updated yet.
      </h4> */}
      <h1 className="text-4xl md:text-6xl font-bold leading-snug mt-8 mb-6 md:mt-16 text-white">
        Hi, I'm
        <br />
        Niraj
      </h1>

      <AnimatePresence>
        {section == 0 && (
          <motion.div
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 3 }}
          >
            <ProfileKeywords />

            <motion.button
              onClick={() => setSection(5)}
              className={`bg-purple-500 text-white px-3 md:px-8 py-2 md:py-4
      rounded-lg font-bold text-lg mt-16`}
              initial={{
                opacity: 0,
                y: 25,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 1,
                delay: 2,
              }}
            >
              Contact me
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
};
