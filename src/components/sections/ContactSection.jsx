import { Section } from "./Section";
import { motion, AnimatePresence } from "framer-motion";

import callIcon from "../../assets/icons/call.svg";
import emailIcon from "../../assets/icons/email.svg";
import whatsAppIcon from "../../assets/icons/whatsapp.svg";
import linkedInIcon from "../../assets/icons/linkedin.svg";

export const ContactSection = (props) => {
  const { section, isMobile } = props;

  return (
    <Section addClasses="contact-section">
      <h2 className="text-3xl md:text-5xl font-bold bg-purple-700 p-2 inline-block rounded text-white sectionHeading mt-4">
        Contact me
      </h2>
      {section == 5 && (
        <AnimatePresence>
          <motion.div
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 3 }}
          >
            <form
              name="contact"
              method="POST"
              className="mt-8 p-3 md:p-8 rounded-md bg-white bg-opacity-50 w-96 max-w-full h-fit"
            >
              <input type="hidden" name="form-name" value="contact" />
              <label
                htmlFor="name"
                className="font-medium text-white block mb-1"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="block w-full rounded-md border-0 text-black shadow-sm ring-1 ring-inset ring-purple-300 placeholder:text-purple-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 p-2"
              />
              <label
                htmlFor="email"
                className="font-medium text-white block mb-1 mt-4 md:mt-8"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="block w-full rounded-md border-0 text-black shadow-sm ring-1 ring-inset ring-purple-300 placeholder:text-purple-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 p-2"
              />
              <label
                htmlFor="email"
                className="font-medium text-white block mb-1 mt-4 md:mt-8"
              >
                Message
              </label>
              <textarea
                name="message"
                id="message"
                className="h-15 md:h-20 block w-full rounded-md border-0 text-black shadow-sm ring-1 ring-inset ring-purple-300 placeholder:text-purple-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 p-2"
              />
              <button
                type="submit"
                className="bg-purple-600 text-white py-2 md:py-2 px-4 md:px-8 rounded-lg font-bold text-lg mt-6 md:mt-10 "
              >
                Submit
              </button>
            </form>

            <div className="flex flex-row mt-8 mx-auto">
              <a href="tel:+12135619960">
                <img
                  alt="Phone"
                  src={callIcon}
                  className="object-contain"
                  style={{
                    width: isMobile ? "55%" : "65%",
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
                    width: isMobile ? "55%" : "65%",
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
                    width: isMobile ? "55%" : "65%",
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
                    width: isMobile ? "55%" : "65%",
                    height: "auto",
                  }}
                />
              </a>
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </Section>
  );
};
