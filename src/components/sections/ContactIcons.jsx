import callIcon from "../../assets/icons/call.svg";
import emailIcon from "../../assets/icons/email.svg";
import whatsAppIcon from "../../assets/icons/whatsapp.svg";
import linkedInIcon from "../../assets/icons/linkedin.svg";

export const ContactIcons = (props) => {
  const { isMobile } = props;

  let iconScaling = isMobile ? "51%" : "65%";

  return (
    <div className="flex flex-row mt-4">
      <a href="tel:+12135619960">
        <img
          alt="Phone"
          src={callIcon}
          className="object-contain"
          style={{
            width: iconScaling,
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
            width: iconScaling,
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
            width: iconScaling,
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
            width: iconScaling,
            height: "auto",
          }}
        />
      </a>
    </div>
  );
};
