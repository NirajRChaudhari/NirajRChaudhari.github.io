import { useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";

export const ScrollManager = (props) => {
  const { section, onSectionChange } = props;

  const data = useScroll();
  const lastScroll = useRef(0);
  const isAnimating = useRef(false);

  data.fill.classList.add("top-0");
  data.fill.classList.add("absolute");

  useEffect(() => {
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
  }, [section]);

  useFrame(() => {
    if (isAnimating.current) {
      lastScroll.current = data.scroll.current;
      return;
    }

    const curSection = Math.floor(data.scroll.current * data.pages);

    //Adjust below 0.02 to adjust scroll sensitivity
    if (data.scroll.current > lastScroll.current) {
      if (
        curSection < 3 &&
        data.scroll.current > curSection / (data.pages - 1) + 0.02
      ) {
        const nextSection = curSection + 1;
        console.log(`section ${nextSection}`);
        onSectionChange(nextSection);
      }
    } else if (data.scroll.current < lastScroll.current) {
      if (
        curSection > 0 &&
        data.scroll.current < curSection / (data.pages - 1) - 0.02
      ) {
        const prevSection = curSection - 1;
        console.log(`section ${prevSection}`);
        onSectionChange(prevSection);
      }
    }

    lastScroll.current = data.scroll.current;
  });

  return null;
};
