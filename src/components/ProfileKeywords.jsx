import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const profileKeywords = [
  "Team Player",
  "Software Engineer",
  "Android Developer",
  "Web Developer",
];

export const ProfileKeywords = ({ scrollIndicatorHidden, ...rest }) => {
  const [disciplineIndex, setDisciplineIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDisciplineIndex(
        (prevIndex) => (prevIndex + 1) % profileKeywords.length
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <AnimatePresence mode="wait">
        <motion.h2
          key={disciplineIndex}
          initial={{ opacity: 0, x: -100, height: "auto" }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          transition={{
            duration: 0.5,
            height: { type: "spring", stiffness: 300, damping: 20 },
          }}
          className="text-3xl md:text-5xl font-bold text-white"
        >
          <span className="bg-purple-500 px-1 py-0 italic">
            {profileKeywords[disciplineIndex]}
          </span>
        </motion.h2>
      </AnimatePresence>
    </div>
  );
};
