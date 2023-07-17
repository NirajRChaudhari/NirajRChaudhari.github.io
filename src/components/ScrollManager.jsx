import { useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";

export const ScrollManager = (props) => {
  const { section, onSectionChange } = props;

  const data = useScroll();
  const lastScroll = useRef(0);
  const isAnimating = useRef(false);
  const prevSection = useRef(section);

  data.fill.classList.add("top-0");
  data.fill.classList.add("absolute");

  useEffect(() => {
    // Important below code to avoid auto jumps among section
    //Does not apply to interaction between section 2 and 3
    // if (
    //   !(
    //     (prevSection.current === 2 && section === 3) ||
    //     (prevSection.current === 3 && section === 2)
    //   )
    // ) {
    gsap.to(data.el, {
      duration: 1,
      scrollTop: section * data.el.clientHeight,
      onStart: () => {
        isAnimating.current = true;
      },
      onComplete: () => {
        isAnimating.current = false;
      },
    });
    // }
    prevSection.current = section;
  }, [section]);

  useFrame(() => {
    if (isAnimating.current) {
      lastScroll.current = data.scroll.current;
      return;
    }

    const curSection = Math.floor(data.scroll.current * data.pages);

    // Adjust below 0.015 to adjust scroll sensitivity
    if (data.scroll.current > lastScroll.current) {
      if (
        curSection < 5 &&
        data.scroll.current > curSection / (data.pages - 1) + 0.015
      ) {
        const nextSection = curSection + 1;
        // console.log(`section ${nextSection}`);
        onSectionChange(nextSection);
      }
    } else if (data.scroll.current < lastScroll.current) {
      if (
        curSection > 0 &&
        data.scroll.current < curSection / (data.pages - 1) - 0.015
      ) {
        const prevSection = curSection - 1;
        // console.log(`section ${prevSection}`);
        onSectionChange(prevSection);
      }
    }

    lastScroll.current = data.scroll.current;
  });

  return null;
};
