import { Section } from "./Section";
import { motion, AnimatePresence } from "framer-motion";
import { ContactIcons } from "./ContactIcons";
import { ProfileKeywords } from "./ProfileKeywords";

import "./CommonStyle.css";

export const AboutSection = (props) => {
  const { section, setSection, isMobile } = props;

  return (
    <Section mobileTop addClasses="about-section">
      {/* <h4 className="text-md font-bold bg-red-600 p-2 rounded text-white sectionHeading w-fit mx-auto">
        Website is still under development. Projects not updated yet.
      </h4> */}
      <h1 className="text-4xl md:text-6xl font-bold leading-snug mt-4 md:mt-16 mb-6  text-white">
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

            <motion.div
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
              <button
                onClick={() => setSection(5)}
                className={`bg-purple-500 hover:bg-purple-800 text-white px-2 md:px-4 py-1 md:py-2
      rounded-lg font-bold text-lg mt-6 md:mt-16`}
              >
                Contact me
              </button>

              <ContactIcons
                isMobile={isMobile}
                setSection={setSection}
                isContactFormSection={false}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
};
