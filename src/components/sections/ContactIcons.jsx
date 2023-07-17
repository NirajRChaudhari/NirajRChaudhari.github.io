import callIcon from "../../assets/icons/call.svg";
import emailIcon from "../../assets/icons/email.svg";
import whatsAppIcon from "../../assets/icons/whatsapp.svg";
import linkedInIcon from "../../assets/icons/linkedin.svg";
import { motion } from "framer-motion";

export const ContactIcons = (props) => {
  const { isMobile, injectClasses = "" } = props;

  let iconScaling = isMobile ? "50%" : "65%";

  const vibrateVariants = {
    initial: {
      x: 0,
    },
    vibrate: {
      x: [-2, 2, -2, 2, 0],
      transition: {
        duration: 0.4,
      },
    },
  };

  return (
    <div className={`flex flex-row mt-4 w-fit ${injectClasses}`}>
      <a href="tel:+12135619960">
        <motion.img
          alt="Phone"
          src={callIcon}
          className="object-contain"
          style={{
            width: iconScaling,
            height: "auto",
          }}
          whileHover="vibrate"
          variants={vibrateVariants}
        />
      </a>

      <a
        href="mailto:nirajram@usc.edu"
        target="_blank"
        rel="noopener noreferrer"
      >
        <motion.img
          alt="Email"
          src={emailIcon}
          className="object-contain"
          style={{
            width: iconScaling,
            height: "auto",
          }}
          whileHover="vibrate"
          variants={vibrateVariants}
        />
      </a>

      <a
        href="https://www.linkedin.com/in/niraj-chaudhari/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <motion.img
          alt="LinkedIn"
          src={linkedInIcon}
          className="object-contain"
          style={{
            width: iconScaling,
            height: "auto",
          }}
          whileHover="vibrate"
          variants={vibrateVariants}
        />
      </a>

      <a
        href="https://api.whatsapp.com/send?phone=2135619960"
        target="_blank"
        rel="noopener noreferrer"
      >
        <motion.img
          alt="WhatsApp"
          src={whatsAppIcon}
          className="object-contain"
          style={{
            width: iconScaling,
            height: "auto",
          }}
          whileHover="vibrate"
          variants={vibrateVariants}
        />
      </a>
    </div>
  );
};
