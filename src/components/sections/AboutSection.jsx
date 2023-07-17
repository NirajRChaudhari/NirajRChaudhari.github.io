import { Section } from "./Section";
import { motion, AnimatePresence } from "framer-motion";
import { ProfileKeywords } from "./ProfileKeywords";

import callIcon from "../../assets/icons/call.svg";
import emailIcon from "../../assets/icons/email.svg";
import whatsAppIcon from "../../assets/icons/whatsapp.svg";
import linkedInIcon from "../../assets/icons/linkedin.svg";
import "./CommonStyle.css";

export const AboutSection = (props) => {
  const { section, setSection, isMobile } = props;

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
                className={`bg-purple-500 text-white px-2 md:px-4 py-1 md:py-2
      rounded-lg font-bold text-lg mt-6 md:mt-16`}
              >
                Contact me
              </button>

              <div className="flex flex-row mt-4">
                <a href="tel:+12135619960">
                  <img
                    alt="Phone"
                    src={callIcon}
                    className="object-contain"
                    style={{
                      width: isMobile ? "50%" : "65%",
                      height: "auto",
                    }}
                  />
                </a>

                <a
                  href="mailto:nirajram@usc.edu"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    alt="Email"
                    src={emailIcon}
                    className="object-contain"
                    style={{
                      width: isMobile ? "50%" : "65%",
                      height: "auto",
                    }}
                  />
                </a>

                <a
                  href="https://api.whatsapp.com/send?phone=2135619960"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    alt="WhatsApp"
                    src={whatsAppIcon}
                    className="object-contain"
                    style={{
                      width: isMobile ? "50%" : "65%",
                      height: "auto",
                    }}
                  />
                </a>

                <a
                  href="https://www.linkedin.com/in/niraj-chaudhari/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    alt="LinkedIn"
                    src={linkedInIcon}
                    className="object-contain"
                    style={{
                      width: isMobile ? "50%" : "65%",
                      height: "auto",
                    }}
                  />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
};
