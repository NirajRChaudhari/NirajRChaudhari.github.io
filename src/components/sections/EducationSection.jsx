import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import usc from "../../assets/logo/usc.png";
import puneuni from "../../assets/logo/puneuni.png";
import "react-vertical-timeline-component/style.min.css";
import { motion } from "framer-motion";
import { Section } from "./Section";

const educations = [
  {
    degree: "Master's in Computer Science",
    universityName: "University of Southern California",
    icon: usc,
    iconBg: "#FFFFFF",
    date: "Aug 2022 - Apr 2024",
    gpa: "GPA :  3.9 / 4",
  },
  {
    degree: "Bachelor's in Computer Engineering",
    universityName: "University of Pune",
    icon: puneuni,
    iconBg: "#FFFFFF",
    date: "Jun 2016 - Jun 2020",
    gpa: "GPA :  9.4 / 10",
  },
];

const textVariant = (delay) => {
  return {
    hidden: {
      y: -50,
      opacity: 0,
    },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        duration: 1.25,
        delay: delay,
      },
    },
  };
};

const EducationCard = ({ education }) => {
  return (
    <VerticalTimelineElement
      contentStyle={{
        background: "#663399",
        color: "#fff",
      }}
      contentArrowStyle={{ borderRight: "7px solid  #232631" }}
      date={education.date}
      iconStyle={{ background: education.iconBg }}
      icon={
        <div className="flex justify-center items-center w-full h-full">
          <img
            src={education.icon}
            alt={education.company_name}
            className="w-[80%] h-[80%] object-contain"
          />
        </div>
      }
    >
      <div>
        <h3 className="text-white text-[15px] md:text-[24px] font-bold">
          {education.degree}
        </h3>
        <p
          className="text-secondary text-[12px] md:text-[16px] font-semibold"
          style={{ margin: 0 }}
        >
          {education.universityName}
        </p>
        <p
          className="text-secondary text-[16px] font-semibold"
          style={{ margin: 0 }}
        >
          {education.gpa}
        </p>
      </div>
    </VerticalTimelineElement>
  );
};

export const EducationSection = () => {
  return (
    <Section fullWidth={true} addClasses="education-section">
      <motion.h2
        variants={textVariant()}
        className="text-3xl md:text-5xl font-bold bg-purple-700 p-2 ml-6 inline-block rounded text-white sectionHeading mb-5 md:mb-20"
      >
        Education
      </motion.h2>

      <VerticalTimeline>
        {educations.map((education, index) => (
          <EducationCard key={`education-${index}`} education={education} />
        ))}
      </VerticalTimeline>

      <map name="gehirn">
        {/* <!-- Design --> */}
        <area
          shape="poly"
          coords="86,56,109,35,126,34,143,22,166,18,179,10,203,7,214,3,232,5,246,0,266,6,285,0,365,20,382,25,400,41,414,54,416,63,403,59,392,58,379,50,355,72,317,65,303,45,274,51,258,80,245,96,240,121,244,141,249,162,225,212,226,180,198,174,179,184,150,203,144,190,146,167,154,137,156,98,167,89,156,70,140,66,124,54,119,55,109,46"
          title="Photoshop"
          alt="ps"
        />
        <area
          shape="poly"
          coords="111,262,120,250,123,235,152,205,202,174,227,180,225,205,248,163,276,139,289,151,300,141,324,152,355,151,336,172,323,198,301,195,279,200,273,219,289,239,291,245,300,248,322,268,302,278,276,275,234,292,218,303,191,319,155,303,134,301,119,287"
          title="Illustrator"
          alt="ai"
        />
        <area
          shape="poly"
          coords="250,161,246,151,246,140,242,105,249,84,259,79,275,51,305,46,318,64,354,71,375,54,392,55,398,65,397,79,403,86,404,60,432,77,460,104,459,121,469,124,491,171,490,184,500,193,497,225,487,202,474,187,462,184,465,163,442,123,420,118,409,104,370,129,354,157,350,149,322,153,299,142,290,152,274,142"
          title="InDesign"
          alt="ind"
        />
        <area
          shape="poly"
          coords="404,248,413,231,394,221,408,159,420,153,432,141,443,160,464,169,463,183,480,188,497,223,469,260,434,245,424,249"
          title="Flash"
          alt="fla"
        />
        <area
          shape="poly"
          coords="322,268,303,251,293,246,291,238,274,224,282,203,304,210,324,230,395,221,415,234,403,246,391,243,377,249,366,259,351,261"
          title="Fireworks"
          alt="fw"
        />
        <area
          shape="poly"
          coords="284,200,303,195,327,195,332,179,351,159,355,174,374,183,406,174,396,224,370,223,320,229"
          title="Premiere Pro"
          alt="pp"
        />
        <area
          shape="poly"
          coords="349,162,372,128,411,102,420,119,448,123,465,164,464,172,456,165,443,162,441,148,430,140,406,160,395,179,376,184,354,176"
          title="After Effects"
          alt="ae"
        />
        {/* <!-- Coding --> */}
        <area
          shape="poly"
          coords="121,52,140,63,158,72,168,90,157,97,153,142,141,180,151,204,121,239,112,228,130,209,126,200,93,185,96,167,82,165,72,144,53,132,41,130,45,114,60,104,74,104,68,90,77,76,98,68"
          title="(X)HTML"
          alt="ht"
        />
        <area
          shape="poly"
          coords="122,238,115,230,109,230,131,208,127,198,110,192,95,182,93,166,82,165,74,142,55,128,40,131,38,140,52,152,35,151,28,168,44,190,43,201,63,229,83,230,94,226,100,245,120,250"
          title="CSS"
          alt="cs"
        />
        <area
          shape="poly"
          coords="118,251,97,241,92,228,73,230,60,225,56,213,42,205,42,191,27,169,14,163,10,156,10,151,16,129,8,121,4,132,5,147,0,175,12,185,11,196,37,239,52,247,82,263,113,259"
          title="JavaScript"
          alt="jas"
        />
        <area
          shape="poly"
          coords="30,171,14,164,9,152,16,131,17,119,23,108,26,102,37,98,49,85,54,74,110,44,116,54,96,69,75,78,70,94,74,104,60,102,44,118,44,128,38,137,53,151,36,151,28,159"
          title="PHP"
          alt="php"
        />
        <area
          shape="poly"
          coords="18,129,9,123,10,115,24,95,35,78,59,54,70,53,80,43,91,44,84,58,58,73,49,78,52,88,46,87,38,99,24,104,28,120"
          title="ActionScript"
          alt="actsc"
        />
        {/* <!-- Spiele --> */}
        <area
          shape="poly"
          coords="272,276,274,286,291,318,302,322,316,313,325,314,331,301,345,294,375,279,423,266,442,261,452,258,450,252,433,244,424,249,407,246,387,242,377,250,364,259,352,261,337,268,321,267,300,279"
          title="Super Nintendo"
          alt="snes"
        />
        <area
          shape="poly"
          coords="325,314,330,303,345,288,379,277,453,254,455,277,440,314,424,312,412,311,364,334,333,328"
          title="Wii"
          alt="wii"
        />
        <area
          shape="poly"
          coords="440,315,421,310,411,312,362,333,334,327,323,314,315,318,322,331,356,355,401,343,414,343"
          title="Nintendo DS"
          alt="nds"
        />
        <area
          shape="poly"
          coords="314,312,314,322,349,354,378,350,398,345,381,359,350,364,326,349,304,325,299,312"
          title="PlayStation 2"
          alt="playst"
        />
        <area
          shape="poly"
          coords="287,304,272,310,286,321,295,336,314,351,343,361,313,338,300,323,304,310"
          title="Other"
          alt="sonst"
        />
      </map>
    </Section>
  );
};
