import { Sphere, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export const Background = () => {
  // Refs for material and color
  const material = useRef();
  const color = useRef({
    color: "#585858",
  });

  // Scroll data
  const data = useScroll();

  // Timeline ref for GSAP animations
  const tl = useRef();

  // useFrame callback to update material color based on scroll
  useFrame(() => {
    if (tl.current !== undefined) {
      tl.current.progress(data.scroll.current);
    }
    material.current.color = new THREE.Color(color.current.color);
  });

  // useEffect to create GSAP timeline for color transitions
  useEffect(() => {
    tl.current = gsap.timeline();
    tl.current.to(color.current, {
      color: "#585858",
    });
    tl.current.to(color.current, {
      color: "#414141",
    });
    tl.current.to(color.current, {
      color: "#111111",
    });
  }, []);

  return (
    <group>
      <Sphere scale={[30, 30, 30]}>
        <meshBasicMaterial
          ref={material}
          side={THREE.BackSide}
          toneMapped={false}
        />
      </Sphere>
    </group>
  );
};
