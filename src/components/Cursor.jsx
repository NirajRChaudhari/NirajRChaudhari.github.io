import { useEffect, useRef, useState } from "react";

const CURSOR_SPEED = 0.08;

export const Cursor = () => {
  const cursorOutline = useRef();
  const pointer = useRef({ x: -10, y: -10 });
  const outline = useRef({ x: 0, y: 0 });
  const frame = useRef();
  const [hoverButton, setHoverButton] = useState(false);

  useEffect(() => {
    const onMouseMove = (event) => {
      pointer.current.x = event.clientX;
      pointer.current.y = event.clientY;
    };

    const animate = () => {
      const outlineElement = cursorOutline.current;

      if (outlineElement) {
        outline.current.x +=
          (pointer.current.x - outline.current.x) * CURSOR_SPEED;
        outline.current.y +=
          (pointer.current.y - outline.current.y) * CURSOR_SPEED;

        outlineElement.style.left = `${outline.current.x}px`;
        outlineElement.style.top = `${outline.current.y}px`;
      }

      frame.current = requestAnimationFrame(animate);
    };

    document.addEventListener("mousemove", onMouseMove);
    frame.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(frame.current);
    };
  }, []);

  useEffect(() => {
    const onMouseOver = (event) => {
      const target = event.target;

      if (!(target instanceof Element)) return;

      setHoverButton(Boolean(target.closest("button, input, textarea")));
    };

    document.addEventListener("mouseover", onMouseOver);

    return () => {
      document.removeEventListener("mouseover", onMouseOver);
    };
  }, []);

  return (
    <>
      <div
        className={`invisible md:visible  z-50 fixed -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none transition-transform
        ${
          hoverButton
            ? "bg-transparent border-2 border-purple-900 w-5 h-5"
            : "bg-purple-500 w-3 h-3"
        }`}
        ref={cursorOutline}
      ></div>
    </>
  );
};
