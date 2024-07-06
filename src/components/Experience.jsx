import { useScroll } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { animate, useMotionValue } from "framer-motion";
import { motion } from "framer-motion-3d";
import { useEffect, useRef, useState } from "react";
import { framerMotionConfig } from "../config";
import { Avatar } from "./Avatar";
import { Office } from "./Office";
import { Projects } from "./sections/Projects";
import { Brain } from "./Brain";

export const Experience = (props) => {
  const { menuOpened, isMobile } = props;
  const { viewport } = useThree();
  const data = useScroll();

  const responsiveRatio = viewport.width / 12;
  const officeScaleRatio = Math.max(0.5, Math.min(0.9 * responsiveRatio, 0.9));

  const [section, setSection] = useState(0);

  const cameraPositionX = useMotionValue(0);
  const cameraLookAtX = useMotionValue(0);

  useEffect(() => {
    animate(cameraPositionX, menuOpened ? -5 : 0, {
      ...framerMotionConfig,
    });
    animate(cameraLookAtX, menuOpened ? 5 : 0, {
      ...framerMotionConfig,
    });
  }, [menuOpened]);

  const characterContainerAboutRef = useRef();

  const [characterAnimation, setCharacterAnimation] = useState("Typing");
  useEffect(() => {
    setCharacterAnimation("Falling");
    setTimeout(() => {
      setCharacterAnimation(
        section === 0 ? "Typing" : section === 4 ? "Pointing" : "Standing"
      );
    }, 600);
  }, [section]);

  const characterGroup = useRef();

  useFrame((state) => {
    let curSection = Math.floor(data.scroll.current * data.pages);

    if (curSection > 5) {
      curSection = 5;
    }

    if (curSection !== section) {
      setSection(curSection);
    }

    if (state.camera != undefined) {
      state.camera.position.x = cameraPositionX.get();
      state.camera.lookAt(cameraLookAtX.get(), 0, 0);
    }

    // const position = new THREE.Vector3();
    if (section === 0) {
      characterContainerAboutRef.current.getWorldPosition(
        characterGroup.current.position
      );
    }
  });

  return (
    <>
      {/* AVATAR */}
      <motion.group
        ref={characterGroup}
        rotation={[-3.141592653589792, 1.2053981633974492, 3.141592653589793]}
        animate={"" + section}
        transition={{
          duration: 0.55,
        }}
        variants={{
          0: {
            x: 0,
            y: -1,
            z: 0,
            scale: 1.3 * officeScaleRatio,
            rotateX: 0,
            rotateY: Math.PI / 2 + 0.45,
            rotateZ: 0,
          },
          1: {
            x: -10,
          },
          2: {
            x: -10,
          },
          3: {
            x: -10,
          },
          4: {
            x: isMobile ? -1.6 : -5.5 * officeScaleRatio,
            y: isMobile ? -viewport.height * 4.5 : -viewport.height * 4 - 1,
            z: 0,
            rotateX: 0,
            rotateY: Math.PI / 2,
            rotateZ: 0,
            scale: isMobile
              ? Math.min(1.45, 2.5 * officeScaleRatio)
              : Math.min(1.5, 4 * officeScaleRatio),
          },
          5: {
            x: 0.24,
            y: isMobile ? -viewport.height * 4.75 : -viewport.height * 4.79,
            z: 8.5,
            rotateX: 0,
            rotateY: -Math.PI / 4,
            rotateZ: 0,
            scale: Math.min(0.7, 1 * officeScaleRatio),
          },
        }}
      >
        <Avatar animation={characterAnimation} />
      </motion.group>

      <ambientLight intensity={1} />

      {/* OFFICE */}
      {section == 0 && (
        <motion.group
          position={[
            isMobile ? -0.25 : 1.5 * officeScaleRatio,
            isMobile ? -viewport.height / 6 : 2,
            3,
          ]}
          scale={officeScaleRatio}
          rotation-y={-Math.PI / 4}
          animate={{
            y: isMobile ? -viewport.height / 6 : 0,
          }}
          transition={{
            duration: 0.8,
          }}
        >
          <Office section={section} />
          <group
            ref={characterContainerAboutRef}
            name="CharacterSpot"
            position={[0.4, 0.06, -0.15]}
          ></group>
        </motion.group>
      )}

      {/* SKILLS */}
      {section == 1 && (
        <motion.group
          // Commented out to prevent Avatar from repositioning in Skills section
          // position={[isMobile ? 1.5 : 5 * officeScaleRatio, 0, 0]}
          scale={(isMobile ? 17 : 15) * officeScaleRatio}
          animate={{
            x: section === 1 ? (isMobile ? 1.5 : 5 * officeScaleRatio) : 0,
            z: section === 1 ? 0 : -10,
            y: isMobile ? -(5 / 4) * viewport.height : -viewport.height,
          }}
          rotation={[-Math.PI / 8, -Math.PI / 16, Math.PI / 16]}
        >
          <Brain />

          <directionalLight position={[-5, 3, 5]} intensity={0.4} />
        </motion.group>
      )}

      {/* PROJECTS */}
      {section == 4 && (
        <group>
          <Projects
            section={section}
            officeScaleRatio={officeScaleRatio}
            isMobile={isMobile}
          />
          <directionalLight position={[-2, 0, 10]} intensity={1} />
        </group>
      )}
    </>
  );
};
