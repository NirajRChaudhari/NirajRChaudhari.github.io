import callIcon from "../../assets/icons/call.svg";
import emailIcon from "../../assets/icons/email.svg";
import whatsAppIcon from "../../assets/icons/whatsapp.svg";
import linkedInIcon from "../../assets/icons/linkedin.svg";
import { motion } from "framer-motion";

export const ContactIcons = (props) => {
  const {
    isMobile,
    setSection,
    injectClasses = "",
    isContactFormSection = false,
  } = props;

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
    <div className="w-fit">
      <div className={`flex flex-row mt-4 w-fit ${injectClasses}`}>
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
        {!isContactFormSection && isMobile && (
          <svg
            className="arrows"
            style={{
              width: "25px",
              height: "35px",
              marginTop: "5px",
              cursor: "pointer",
            }}
            onClick={() => setSection(1)}
          >
            <path className="a1" d="M0 0 L12.5 15 L25 0"></path>
            <path className="a2" d="M0 10 L12.5 25 L25 10"></path>
            <path className="a3" d="M0 20 L12.5 35 L25 20"></path>
          </svg>
        )}
      </div>
      {!isContactFormSection && !isMobile && (
        <svg
          className="arrows"
          style={{
            width: "40px",
            height: "48px",
            margin: "auto",
            marginTop: "40px",
            cursor: "pointer",
          }}
          onClick={() => setSection(1)}
        >
          <path className="a1" d="M0 0 L20 24 L40 0"></path>
          <path className="a2" d="M0 14 L20 38 L40 14"></path>
          <path className="a3" d="M0 28 L20 48 L40 28"></path>
        </svg>
      )}
    </div>
  );
};
